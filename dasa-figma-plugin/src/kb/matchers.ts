import type { KBData, KBCopyGlossaryItem } from './types';
import { hexKey, normalizeHex6 } from '../shared/colorUtils';

/** Minimal view of a variable registry for token matching (avoids coupling to main). */
export interface VariableRegistryView {
  colorByHex: Map<string, { name: string; value: string }>;
  paintStylesByHex: Map<string, string>;
}

type RGB3 = [number, number, number];

function parseHex(hex: string): RGB3 {
  const h = normalizeHex6(hex).replace('#', '');
  if (h.length !== 6) return [0, 0, 0];
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

function colorDistanceRgb(a: RGB3, b: RGB3): number {
  const dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function closestInSorted(sorted: number[], target: number): number {
  let lo = 0, hi = sorted.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  if (lo === 0) return sorted[0];
  const prev = sorted[lo - 1];
  const curr = sorted[lo];
  return Math.abs(target - prev) <= Math.abs(target - curr) ? prev : curr;
}

const INFINITIVE_REGEX = /^(agendar|cancelar|finalizar|alterar|incluir|adicionar|remover|excluir|buscar|selecionar|escolher|confirmar|enviar|salvar|editar|atualizar|compartilhar|aceitar)/i;

export interface KBMatchers {
  isTokenColor: (hex: string, registry?: VariableRegistryView) => boolean;
  findClosestToken: (hex: string, registry?: VariableRegistryView) => { token: string; value: string; distance: number } | null;
  closestFontSize: (size: number) => number;
  closestFromSet: (valueSet: Set<number>, target: number) => number;
  isTokenLineHeight: (value: number) => boolean;
  closestLineHeight: (value: number) => number;
  isTokenOpacity: (value: number) => boolean;
  closestOpacity: (value: number) => number;
  isTokenShadowBlur: (radius: number) => boolean;
  closestShadowBlur: (radius: number) => number;
  findTermViolations: (text: string) => Array<{ term: string; suggestion: string; rule: KBCopyGlossaryItem }>;
  findForbiddenTerms: (text: string) => Array<{ pattern: string; replacement: string }>;
  validateCTA: (text: string) => { valid: boolean; issues: string[] };
  COLOR_TOKENS: Record<string, string>;
  TYPOGRAPHY_TOKENS: {
    fontFamily: string;
    fontWeights: Set<number>;
    fontSizes: Set<number>;
    textStyles: Record<string, { fontWeight: number; fontSize: number; lineHeight: number }>;
  };
  SPACING_VALUES: Set<number>;
  RADIUS_VALUES: Set<number>;
  LINE_HEIGHT_VALUES: Set<number>;
  BORDER_WIDTH_VALUES: Set<number>;
  OPACITY_VALUES: Set<number>;
  SHADOW_BLUR_VALUES: Set<number>;
  CAPITALIZATION_RULES: { properNouns: string[] };
}

export function createMatchers(data: KBData): KBMatchers {
  const t = data.tokens;
  const c = data.copy;

  const tokenEntries: { token: string; hex: string; rgb: RGB3 }[] = Object.entries(t.colors).map(
    ([token, hex]) => ({ token, hex, rgb: parseHex(hex) }),
  );
  const tokenHexSet = new Set(tokenEntries.map(e => hexKey(e.hex)));

  const spacingSet = new Set(t.spacing);
  const radiusSet = new Set(t.radius);
  const lineHeightSet = new Set(t.lineHeights);
  const borderWidthSet = new Set(t.borderWidths);
  const opacitySet = new Set(t.opacities);
  const shadowBlurSet = new Set(t.shadowBlurs);

  const spacingSorted = [...spacingSet].sort((a, b) => a - b);
  const radiusSorted = [...radiusSet].sort((a, b) => a - b);
  const fontSizesSorted = [...t.typography.fontSizes].sort((a, b) => a - b);

  const fontWeightsSet = new Set(t.typography.fontWeights);
  const fontSizesSet = new Set(t.typography.fontSizes);

  return {
    isTokenColor(hex: string, registry?: VariableRegistryView): boolean {
      const key = hexKey(hex);
      if (registry?.colorByHex.has(key)) return true;
      return tokenHexSet.has(key);
    },

    findClosestToken(hex: string, registry?: VariableRegistryView): { token: string; value: string; distance: number } | null {
      const key = hexKey(hex);
      const input = parseHex(hex);
      let closest: { token: string; value: string; distance: number } | null = null;
      let minDist = Infinity;

      if (registry) {
        const exactVar = registry.colorByHex.get(key);
        if (exactVar) return { token: exactVar.name, value: exactVar.value, distance: 0 };
        const exactStyle = registry.paintStylesByHex.get(key);
        if (exactStyle) return { token: exactStyle, value: '#' + key, distance: 0 };

        for (const [k, token] of registry.colorByHex) {
          const d = colorDistanceRgb(input, parseHex(k));
          if (d < minDist) { minDist = d; closest = { token: token.name, value: token.value, distance: d }; }
        }
        for (const [k, styleName] of registry.paintStylesByHex) {
          const d = colorDistanceRgb(input, parseHex(k));
          if (d < minDist) { minDist = d; closest = { token: styleName, value: '#' + k, distance: d }; }
        }
      }

      if (tokenHexSet.has(key)) {
        if (closest?.distance === 0) return closest;
        const entry = tokenEntries.find(e => hexKey(e.hex) === key)!;
        return { token: entry.token, value: entry.hex, distance: 0 };
      }

      for (const entry of tokenEntries) {
        const d = colorDistanceRgb(input, entry.rgb);
        if (d < minDist) { minDist = d; closest = { token: entry.token, value: entry.hex, distance: d }; }
      }
      return closest;
    },

    closestFontSize(size: number): number {
      return closestInSorted(fontSizesSorted, size);
    },

    closestFromSet(valueSet: Set<number>, target: number): number {
      const sorted = valueSet === spacingSet ? spacingSorted
        : valueSet === radiusSet ? radiusSorted
        : [...valueSet].sort((a, b) => a - b);
      let lo = 0, hi = sorted.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sorted[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      if (lo === 0) return sorted[0];
      const prev = sorted[lo - 1];
      const curr = sorted[lo];
      return Math.abs(target - prev) <= Math.abs(target - curr) ? prev : curr;
    },

    isTokenLineHeight(value: number): boolean {
      const ratio = value > 10 ? value / 100 : value;
      return [...lineHeightSet].some(lh => Math.abs(lh - ratio) < 0.01);
    },

    closestLineHeight(value: number): number {
      const ratio = value > 10 ? value / 100 : value;
      const sorted = [...lineHeightSet].sort((a, b) => a - b);
      let best = sorted[0];
      for (const lh of sorted) {
        if (Math.abs(lh - ratio) < Math.abs(best - ratio)) best = lh;
      }
      return best;
    },

    isTokenOpacity(value: number): boolean {
      return opacitySet.has(value) || [...opacitySet].some(o => Math.abs(o - value) < 0.01);
    },

    closestOpacity(value: number): number {
      let best = 1;
      for (const o of opacitySet) {
        if (Math.abs(o - value) < Math.abs(best - value)) best = o;
      }
      return best;
    },

    isTokenShadowBlur(radius: number): boolean {
      return shadowBlurSet.has(radius) || [...shadowBlurSet].some(s => Math.abs(s - radius) <= 2);
    },

    closestShadowBlur(radius: number): number {
      const sorted = [...shadowBlurSet].sort((a, b) => a - b);
      let best = sorted[0];
      for (const s of sorted) {
        if (Math.abs(s - radius) < Math.abs(best - radius)) best = s;
      }
      return best;
    },

    findTermViolations(text: string): Array<{ term: string; suggestion: string; rule: KBCopyGlossaryItem }> {
      const violations: Array<{ term: string; suggestion: string; rule: KBCopyGlossaryItem }> = [];
      for (const rule of c.glossary) {
        for (const avoid of rule.avoid) {
          const escapedAvoid = avoid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escapedAvoid}\\b`, 'gi');
          if (regex.test(text)) {
            violations.push({ term: avoid, suggestion: rule.use, rule });
          }
        }
      }
      return violations;
    },

    findForbiddenTerms(text: string): Array<{ pattern: string; replacement: string }> {
      const found: Array<{ pattern: string; replacement: string }> = [];
      let remaining = text;
      for (const term of c.forbiddenTerms) {
        if (term.pattern === 'Nav Dasa') continue;
        if (term.wordBoundary) {
          const escaped = term.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escaped}\\b`, 'g');
          if (regex.test(remaining)) {
            found.push({ pattern: term.pattern, replacement: term.replacement });
            remaining = remaining.replace(regex, '');
          }
        } else {
          if (remaining.includes(term.pattern)) {
            found.push({ pattern: term.pattern, replacement: term.replacement });
            remaining = remaining.replace(term.pattern, '');
          }
        }
      }
      return found;
    },

    validateCTA(text: string): { valid: boolean; issues: string[] } {
      const issues: string[] = [];
      const words = text.trim().split(/\s+/);
      if (words.length < c.ctaRules.length.min || words.length > c.ctaRules.length.max) {
        issues.push(`CTA deve ter ${c.ctaRules.length.min}-${c.ctaRules.length.max} palavras, encontrado: ${words.length}`);
      }
      if (text.endsWith('.')) {
        issues.push('CTA não deve terminar com ponto');
      }
      if (!INFINITIVE_REGEX.test(text)) {
        issues.push('CTA deve começar com verbo no infinitivo');
      }
      if (c.ctaRules.forbidden.some(f => text.trim() === f)) {
        issues.push(`Evitar CTA genérico "${text.trim()}"`);
      }
      return { valid: issues.length === 0, issues };
    },

    COLOR_TOKENS: t.colors,
    TYPOGRAPHY_TOKENS: {
      fontFamily: t.typography.fontFamily,
      fontWeights: fontWeightsSet,
      fontSizes: fontSizesSet,
      textStyles: t.typography.textStyles,
    },
    SPACING_VALUES: spacingSet,
    RADIUS_VALUES: radiusSet,
    LINE_HEIGHT_VALUES: lineHeightSet,
    BORDER_WIDTH_VALUES: borderWidthSet,
    OPACITY_VALUES: opacitySet,
    SHADOW_BLUR_VALUES: shadowBlurSet,
    CAPITALIZATION_RULES: c.capitalization,
  };
}
