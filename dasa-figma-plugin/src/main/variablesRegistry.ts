import { rgbToHex, hexKey, normalizeHex6 } from '../shared/colorUtils';
import type { KBMatchers, VariableRegistryView } from '../kb/matchers';

export interface LiveToken {
  id: string;
  name: string;
  value: string;
  collection: string;
}

export interface TextStyleEntry {
  id: string;
  name: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight?: number;
}

export interface VariableRegistry {
  colorVariables: Map<string, LiveToken>;
  colorByHex: Map<string, LiveToken>;
  /** Token name (e.g. "--neutral-light-pure") -> variable id, for binding when hex match is missed (float/alias). */
  colorByTokenName: Map<string, string>;
  paintStyles: Map<string, { id: string; name: string; hex: string }>;
  paintStylesByHex: Map<string, string>;
  textStyles: Map<string, TextStyleEntry>;
  spacingByValue: Map<number, LiveToken>;
  radiusByValue: Map<number, LiveToken>;
  floatByValue: Map<number, LiveToken>;
  validFontFamilies: Set<string>;
  validFontSizes: Set<number>;
  validFontWeights: Set<number>;
  validLineHeights: Set<number>;
}

const SPACING_HINTS = /spacing|padding|gap|space|margin|inset/i;
const RADIUS_HINTS = /radius|rounded|corner|border/i;

const FONT_WEIGHT_MAP: Record<string, number> = {
  thin: 100, hairline: 100, extralight: 200, ultralight: 200,
  light: 300, regular: 400, normal: 400, medium: 500,
  semibold: 600, demibold: 600, bold: 700, extrabold: 800,
  ultrabold: 800, black: 900, heavy: 900,
};

function parseFontWeight(style: string): number {
  return FONT_WEIGHT_MAP[style.toLowerCase().replace(/[\s-_]/g, '')] ?? 400;
}

function isRgbValue(raw: unknown): raw is { r: number; g: number; b: number } {
  return !!raw && typeof raw === 'object' && 'r' in raw;
}

export async function buildVariableRegistry(matchers: KBMatchers): Promise<VariableRegistry> {
  const colorVariables = new Map<string, LiveToken>();
  const colorByHex = new Map<string, LiveToken>();
  const colorByTokenName = new Map<string, string>();
  const paintStyles = new Map<string, { id: string; name: string; hex: string }>();
  const paintStylesByHex = new Map<string, string>();
  const textStyles = new Map<string, TextStyleEntry>();
  const spacingByValue = new Map<number, LiveToken>();
  const radiusByValue = new Map<number, LiveToken>();
  const floatByValue = new Map<number, LiveToken>();

  const [collections, colorVars, floatVars] = await Promise.all([
    figma.variables.getLocalVariableCollectionsAsync(),
    figma.variables.getLocalVariablesAsync('COLOR'),
    figma.variables.getLocalVariablesAsync('FLOAT'),
  ]);
  const collectionById = new Map(collections.map(c => [c.id, c]));

  for (const v of colorVars) {
    const collection = collectionById.get(v.variableCollectionId);
    if (!collection) continue;

    const raw = v.valuesByMode[collection.defaultModeId];

    // Resolve alias chain: follow VARIABLE_ALIAS references to get the final RGB
    let resolved = raw;
    const seen = new Set<string>();
    while (resolved && typeof resolved === 'object' && 'type' in resolved && (resolved as { type: string }).type === 'VARIABLE_ALIAS') {
      const aliasId = (resolved as { id: string }).id;
      if (seen.has(aliasId)) break;
      seen.add(aliasId);
      const aliasVar = await figma.variables.getVariableByIdAsync(aliasId);
      if (!aliasVar) break;
      const aliasCollection = collectionById.get(aliasVar.variableCollectionId);
      resolved = aliasVar.valuesByMode[aliasCollection?.defaultModeId ?? ''];
    }

    if (!isRgbValue(resolved)) continue;
    const hex = normalizeHex6(rgbToHex(resolved));
    const key = hexKey(hex);
    const token: LiveToken = { id: v.id, name: v.name, value: hex, collection: collection.name };
    colorVariables.set(v.id, token);
    if (!colorByHex.has(key)) colorByHex.set(key, token);
    const closest = matchers.findClosestToken(hex, undefined);
    if (closest && closest.distance < 2 && !colorByTokenName.has(closest.token)) {
      colorByTokenName.set(closest.token, v.id);
    }
  }

  for (const v of floatVars) {
    const collection = collectionById.get(v.variableCollectionId);
    if (!collection) continue;
    let raw = v.valuesByMode[collection.defaultModeId];
    // Resolve FLOAT alias chain (e.g. "spacing-24" → alias → 24)
    const seen = new Set<string>();
    while (raw != null && typeof raw === 'object' && 'type' in raw && (raw as { type: string }).type === 'VARIABLE_ALIAS') {
      const aliasId = (raw as { id: string }).id;
      if (seen.has(aliasId)) break;
      seen.add(aliasId);
      const aliasVar = await figma.variables.getVariableByIdAsync(aliasId);
      if (!aliasVar) break;
      const aliasColl = collectionById.get(aliasVar.variableCollectionId);
      raw = aliasVar.valuesByMode[aliasColl?.defaultModeId ?? ''];
    }
    if (typeof raw !== 'number') continue;
    const token: LiveToken = { id: v.id, name: v.name, value: String(raw), collection: collection.name };
    if (!floatByValue.has(raw)) floatByValue.set(raw, token);
    const nameLower = v.name.toLowerCase();
    if (SPACING_HINTS.test(nameLower) && !spacingByValue.has(raw)) spacingByValue.set(raw, token);
    if (RADIUS_HINTS.test(nameLower) && !radiusByValue.has(raw)) radiusByValue.set(raw, token);
  }

  const paints = figma.getLocalPaintStyles();
  for (const style of paints) {
    const firstPaint = style.paints[0];
    if (firstPaint?.type === 'SOLID') {
      const hex = rgbToHex(firstPaint.color);
      const key = hexKey(hex);
      paintStyles.set(style.id, { id: style.id, name: style.name, hex });
      if (!paintStylesByHex.has(key)) paintStylesByHex.set(key, style.name);
    }
  }

  const textStyleList = figma.getLocalTextStyles();
  for (const style of textStyleList) {
    const fontName = style.fontName;
    if (!fontName || typeof fontName !== 'object' || !('family' in fontName)) continue;
    let lineHeight: number | undefined;
    if (style.lineHeight && typeof style.lineHeight === 'object' && 'value' in style.lineHeight) {
      const lh = style.lineHeight as { value: number; unit: string };
      lineHeight = lh.unit === 'PERCENT' ? lh.value / 100 : lh.value;
    }
    textStyles.set(style.id, {
      id: style.id,
      name: style.name,
      fontSize: typeof style.fontSize === 'number' ? style.fontSize : 14,
      fontFamily: fontName.family,
      fontWeight: parseFontWeight(fontName.style),
      lineHeight,
    });
  }

  const validFontFamilies = new Set<string>();
  const validFontSizes = new Set<number>();
  const validFontWeights = new Set<number>();
  const validLineHeights = new Set<number>();
  for (const ts of textStyles.values()) {
    validFontFamilies.add(ts.fontFamily.toLowerCase());
    validFontSizes.add(ts.fontSize);
    validFontWeights.add(ts.fontWeight);
    if (ts.lineHeight !== undefined) validLineHeights.add(ts.lineHeight);
  }

  return {
    colorVariables, colorByHex, colorByTokenName, paintStyles, paintStylesByHex, textStyles,
    spacingByValue, radiusByValue, floatByValue,
    validFontFamilies, validFontSizes, validFontWeights, validLineHeights,
  };
}

export function toVariableRegistryView(registry: VariableRegistry): VariableRegistryView {
  const colorByHex = new Map<string, { name: string; value: string }>();
  for (const [k, v] of registry.colorByHex) colorByHex.set(k, { name: v.name, value: v.value });
  return { colorByHex, paintStylesByHex: registry.paintStylesByHex };
}
