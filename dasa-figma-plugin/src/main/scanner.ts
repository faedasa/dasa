import {
  ScannedNode,
  ColorData,
  TypographyData,
  DimensionData,
  ComponentData,
  TextData,
  LayoutData,
  LayerData,
  BoundVariablesData,
  EffectData,
} from '../shared/types';
import { rgbToHex } from '../shared/colorUtils';

export interface ScanProgress {
  current: number;
  total: number;
  message: string;
}

export type ProgressCallback = (progress: ScanProgress) => void;

export function scanSelection(
  selection: readonly SceneNode[],
  onProgress?: ProgressCallback,
): ScannedNode[] {
  const nodeMap = new Map<string, ScannedNode>();
  let processed = 0;
  const total = countNodes(selection);

  function processNode(node: SceneNode, parentId?: string): void {
    if (!node.visible) return;
    const nodeId = node.id;
    const colors: ColorData[] = extractColors(node, nodeId);
    const typography = extractTypography(node, nodeId);
    const text = extractText(node, nodeId);
    const dimensions = extractDimensions(node, nodeId);
    const component = extractComponent(node, nodeId);
    const layout = extractLayout(node);
    const boundVariables = extractBoundVariables(node);
    const effects = extractEffects(node, nodeId);

    const layer: LayerData = { nodeId, name: node.name, type: node.type, parentId };

    const children: string[] = [];
    if ('children' in node) {
      for (const child of node.children) {
        processNode(child, nodeId);
        children.push(child.id);
      }
    }

    const opacity = 'opacity' in node && typeof (node as { opacity: number }).opacity === 'number' && (node as { opacity: number }).opacity !== 1
      ? (node as { opacity: number }).opacity
      : undefined;

    const description = 'description' in node && typeof (node as { description: string }).description === 'string'
      ? (node as { description: string }).description
      : undefined;

    const hasImageFill = 'fills' in node && Array.isArray(node.fills) &&
      (node.fills as ReadonlyArray<{ type: string }>).some((f: { type: string }) => f.type === 'IMAGE');

    type DetachedInfo =
      | { type: 'local'; componentId: string }
      | { type: 'library'; componentKey: string };
    const nodeWithDetached = node as SceneNode & { detachedInfo?: DetachedInfo };
    const detachedFrom: DetachedInfo | undefined = nodeWithDetached.detachedInfo ?? undefined;

    if ('effects' in node && Array.isArray(node.effects)) {
      for (const e of node.effects as ReadonlyArray<{ type: string; color?: { r: number; g: number; b: number }; visible?: boolean }>) {
        if ((e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.color && e.visible !== false) {
          colors.push({
            hex: rgbToHex(e.color),
            opacity: 1,
            nodeId,
            type: 'effect',
            variableId: null,
          });
        }
      }
    }

    nodeMap.set(nodeId, {
      nodeId, type: node.type, name: node.name,
      colors, typography, dimensions, component, text, layout, layer, children,
      boundVariables,
      ...(effects && effects.length > 0 && { effects }),
      ...(opacity !== undefined && { opacity }),
      ...(description !== undefined && { description }),
      ...(hasImageFill && { hasImageFill: true }),
      ...(detachedFrom !== undefined && { detachedFrom }),
    });

    processed++;
    if (onProgress && processed % 10 === 0) {
      onProgress({ current: processed, total, message: `Processando ${processed}/${total} nodes...` });
    }
  }

  for (const node of selection) {
    processNode(node);
  }

  return Array.from(nodeMap.values());
}

function countNodes(nodes: readonly SceneNode[]): number {
  let count = 0;
  for (const node of nodes) {
    if (!node.visible) continue;
    count++;
    if ('children' in node) count += countNodes(node.children);
  }
  return count;
}

function extractColors(node: SceneNode, nodeId: string): ColorData[] {
  const colors: ColorData[] = [];

  if ('fills' in node && Array.isArray(node.fills)) {
    for (const fill of node.fills as ReadonlyArray<Paint & { boundVariables?: { color?: { id: string } }; gradientStops?: Array<{ color: { r: number; g: number; b: number }; position: number }> }>) {
      if (fill.type === 'SOLID') {
        colors.push({
          hex: rgbToHex(fill.color),
          opacity: fill.opacity ?? 1,
          nodeId,
          type: 'fill',
          variableId: fill.boundVariables?.color?.id ?? null,
        });
      }
      if ((fill.type === 'GRADIENT_LINEAR' || fill.type === 'GRADIENT_RADIAL' || fill.type === 'GRADIENT_ANGULAR' || fill.type === 'GRADIENT_DIAMOND') && fill.gradientStops) {
        for (const stop of fill.gradientStops) {
          colors.push({
            hex: rgbToHex(stop.color),
            opacity: 1,
            nodeId,
            type: 'gradient',
            variableId: null,
          });
        }
      }
    }
  }

  if ('strokes' in node && Array.isArray(node.strokes)) {
    for (const stroke of node.strokes as ReadonlyArray<Paint & { boundVariables?: { color?: { id: string } }; gradientStops?: Array<{ color: { r: number; g: number; b: number }; position: number }> }>) {
      if (stroke.type === 'SOLID') {
        colors.push({
          hex: rgbToHex(stroke.color),
          opacity: stroke.opacity ?? 1,
          nodeId,
          type: 'stroke',
          variableId: stroke.boundVariables?.color?.id ?? null,
        });
      }
      if ((stroke.type === 'GRADIENT_LINEAR' || stroke.type === 'GRADIENT_RADIAL' || stroke.type === 'GRADIENT_ANGULAR' || stroke.type === 'GRADIENT_DIAMOND') && stroke.gradientStops) {
        for (const stop of stroke.gradientStops) {
          colors.push({
            hex: rgbToHex(stop.color),
            opacity: 1,
            nodeId,
            type: 'gradient',
            variableId: null,
          });
        }
      }
    }
  }

  return colors;
}

function extractTypography(node: SceneNode, nodeId: string): TypographyData | undefined {
  if (node.type !== 'TEXT') return undefined;
  const t = node as TextNode;

  try {
    const fontName = t.fontName !== figma.mixed ? t.fontName : { family: 'Unknown', style: 'Regular' };
    const fontSize = typeof t.fontSize === 'number' ? t.fontSize : 14;
    const fontWeight = typeof t.fontWeight === 'number' ? t.fontWeight : 400;

    let lineHeight: number | undefined;
    if (typeof t.lineHeight === 'object' && t.lineHeight !== null && 'value' in t.lineHeight) {
      lineHeight = (t.lineHeight as { value: number }).value;
    }

    let letterSpacing: number | undefined;
    if (typeof t.letterSpacing === 'object' && t.letterSpacing !== null && 'value' in t.letterSpacing) {
      letterSpacing = (t.letterSpacing as { value: number }).value;
    }

    const textStyleId = typeof t.textStyleId === 'string' ? t.textStyleId : undefined;

    return { nodeId, fontFamily: fontName.family, fontSize, fontWeight, lineHeight, letterSpacing, textStyleId };
  } catch {
    return { nodeId, fontFamily: 'Unknown', fontSize: 14, fontWeight: 400 };
  }
}

function extractText(node: SceneNode, nodeId: string): TextData | undefined {
  if (node.type !== 'TEXT') return undefined;
  const content = (node as TextNode).characters;
  return { nodeId, content, charCount: content.length };
}

function extractDimensions(node: SceneNode, nodeId: string): DimensionData | undefined {
  if (!('width' in node) || !('height' in node)) return undefined;

  const dim: DimensionData = { nodeId, width: node.width, height: node.height };

  if ('paddingLeft' in node) {
    dim.paddingLeft = typeof node.paddingLeft === 'number' ? node.paddingLeft : undefined;
    dim.paddingRight = typeof node.paddingRight === 'number' ? node.paddingRight : undefined;
    dim.paddingTop = typeof node.paddingTop === 'number' ? node.paddingTop : undefined;
    dim.paddingBottom = typeof node.paddingBottom === 'number' ? node.paddingBottom : undefined;
  }

  if ('itemSpacing' in node) {
    dim.gap = typeof node.itemSpacing === 'number' ? node.itemSpacing : undefined;
  }

  if ('cornerRadius' in node) {
    dim.cornerRadius = typeof node.cornerRadius === 'number' ? node.cornerRadius : undefined;
  }

  if ('strokeWeight' in node) {
    const sw = (node as { strokeWeight: number }).strokeWeight;
    dim.strokeWeight = typeof sw === 'number' ? sw : undefined;
  }

  return dim;
}

function extractComponent(node: SceneNode, nodeId: string): ComponentData | undefined {
  if (node.type === 'INSTANCE') {
    const inst = node as InstanceNode;
    return {
      nodeId, isInstance: true,
      componentKey: inst.mainComponent?.key ?? undefined,
      componentName: inst.name,
      mainComponentName: inst.mainComponent?.name ?? undefined,
    };
  }
  if (node.type === 'COMPONENT') {
    return { nodeId, isInstance: false, componentName: node.name };
  }
  return undefined;
}

function extractLayout(node: SceneNode): LayoutData | undefined {
  if (!('layoutMode' in node)) return undefined;
  const mode = node.layoutMode;
  if (mode !== 'NONE' && mode !== 'HORIZONTAL' && mode !== 'VERTICAL') return undefined;
  return {
    nodeId: node.id,
    autoLayoutMode: mode,
    layoutWrap: node.layoutWrap,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
  };
}

type ShadowEffect = {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: { r: number; g: number; b: number; a?: number };
  offset: { x: number; y: number };
  radius: number;
  spread?: number;
  visible: boolean;
  boundVariables?: { [key: string]: { id: string } };
};

function extractEffects(node: SceneNode, nodeId: string): EffectData[] | undefined {
  if (!('effects' in node) || !Array.isArray(node.effects)) return undefined;
  const out: EffectData[] = [];
  for (const e of node.effects as ReadonlyArray<ShadowEffect>) {
    if (e.type !== 'DROP_SHADOW' && e.type !== 'INNER_SHADOW') continue;
    if (e.visible === false) continue;
    const color = e.color ? rgbToHex(e.color) : '#000000';
    const opacity = typeof e.color?.a === 'number' ? e.color.a : 1;
    const variableId = e.boundVariables?.effect?.id ?? null;
    out.push({
      nodeId,
      type: e.type,
      radius: e.radius ?? 0,
      offsetX: e.offset?.x ?? 0,
      offsetY: e.offset?.y ?? 0,
      color,
      opacity,
      variableId,
    });
  }
  return out.length ? out : undefined;
}

function extractBoundVariables(node: SceneNode): BoundVariablesData | undefined {
  const hasFills = 'fills' in node && Array.isArray(node.fills);
  const hasStrokes = 'strokes' in node && Array.isArray(node.strokes);

  const fillVariableIds: (string | null)[] = hasFills
    ? (node.fills as ReadonlyArray<Paint>).map((fill) =>
        fill?.type === 'SOLID' && fill.boundVariables?.color?.id ? fill.boundVariables.color.id : null,
      )
    : [];
  const strokeVariableIds: (string | null)[] = hasStrokes
    ? (node.strokes as ReadonlyArray<Paint>).map((stroke) =>
        stroke?.type === 'SOLID' && stroke.boundVariables?.color?.id ? stroke.boundVariables.color.id : null,
      )
    : [];

  const bv = ('boundVariables' in node && node.boundVariables) as {
    paddingTop?: { id: string };
    paddingRight?: { id: string };
    paddingBottom?: { id: string };
    paddingLeft?: { id: string };
    itemSpacing?: { id: string };
    topLeftRadius?: { id: string };
    topRightRadius?: { id: string };
    bottomLeftRadius?: { id: string };
    bottomRightRadius?: { id: string };
  } | undefined;

  let textStyleId: string | undefined;
  if (node.type === 'TEXT') {
    const tid = (node as TextNode).textStyleId;
    if (typeof tid === 'string') textStyleId = tid;
  }

  const spacingVariableIds: BoundVariablesData['spacingVariableIds'] = {};
  if (bv?.paddingTop?.id) spacingVariableIds.paddingTop = bv.paddingTop.id;
  if (bv?.paddingRight?.id) spacingVariableIds.paddingRight = bv.paddingRight.id;
  if (bv?.paddingBottom?.id) spacingVariableIds.paddingBottom = bv.paddingBottom.id;
  if (bv?.paddingLeft?.id) spacingVariableIds.paddingLeft = bv.paddingLeft.id;
  if (bv?.itemSpacing?.id) spacingVariableIds.itemSpacing = bv.itemSpacing.id;

  let cornerRadiusVariableIds: BoundVariablesData['cornerRadiusVariableIds'];
  if (
    bv?.topLeftRadius?.id ||
    bv?.topRightRadius?.id ||
    bv?.bottomLeftRadius?.id ||
    bv?.bottomRightRadius?.id
  ) {
    cornerRadiusVariableIds = {};
    if (bv.topLeftRadius?.id) cornerRadiusVariableIds.topLeft = bv.topLeftRadius.id;
    if (bv.topRightRadius?.id) cornerRadiusVariableIds.topRight = bv.topRightRadius.id;
    if (bv.bottomLeftRadius?.id) cornerRadiusVariableIds.bottomLeft = bv.bottomLeftRadius.id;
    if (bv.bottomRightRadius?.id) cornerRadiusVariableIds.bottomRight = bv.bottomRightRadius.id;
  }

  const hasAny =
    fillVariableIds.some(Boolean) ||
    strokeVariableIds.some(Boolean) ||
    textStyleId ||
    Object.keys(spacingVariableIds).length > 0 ||
    !!cornerRadiusVariableIds;

  if (!hasAny) return undefined;

  return {
    fillVariableIds,
    strokeVariableIds,
    ...(textStyleId && { textStyleId }),
    ...(cornerRadiusVariableIds && { cornerRadiusVariableIds }),
    ...(Object.keys(spacingVariableIds).length > 0 && { spacingVariableIds }),
  };
}

