import { ScannedNode, Finding, Rule } from '../shared/types';
import { normalizeHex6, hexKey } from '../shared/colorUtils';
import { meetsWCAGAAFromHex } from './contrastUtils';
import { TOUCH_TARGET_MIN } from '../shared/constants';
import type { VariableRegistry } from './variablesRegistry';
import { toVariableRegistryView } from './variablesRegistry';
import type { KBMatchers, VariableRegistryView } from '../kb/matchers';
import type { KBData } from '../kb/types';

const NO_FIX = { possible: false, action: null, params: {} } as const;

// ─── REGRA PRIMÁRIA: Sempre associar à variável mais próxima disponível ─────
// Quando o DS está conectado (variáveis no documento), o plugin deve oferecer
// vínculo à variável mais próxima — nunca apenas "selecionar no Figma".
// Fallbacks abaixo garantem quick fix quando há variáveis do tipo no registry.

function colorDistanceHex(a: string, b: string): number {
  const ah = hexKey(normalizeHex6(a));
  const bh = hexKey(normalizeHex6(b));
  if (ah.length !== 6 || bh.length !== 6) return Infinity;
  const ar = parseInt(ah.slice(0, 2), 16), ag = parseInt(ah.slice(2, 4), 16), ab = parseInt(ah.slice(4, 6), 16);
  const br = parseInt(bh.slice(0, 2), 16), bg = parseInt(bh.slice(2, 4), 16), bb = parseInt(bh.slice(4, 6), 16);
  return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2);
}

/** Variável de cor mais próxima no documento (sempre que houver variáveis). */
function findClosestColorVariableInRegistry(hex: string, registry: VariableRegistry): { id: string; value: string; name: string } | null {
  if (!registry.colorByHex.size) return null;
  let best: { id: string; value: string; name: string; distance: number } | null = null;
  for (const token of registry.colorByHex.values()) {
    const d = colorDistanceHex(hex, token.value);
    if (best === null || d < best.distance) best = { id: token.id, value: token.value, name: token.name, distance: d };
  }
  return best ? { id: best.id, value: best.value, name: best.name } : null;
}

/** Variável de spacing mais próxima (valor numérico). */
function findClosestSpacingVariableInRegistry(value: number, registry: VariableRegistry): { id: string; value: number; name: string } | null {
  const sources = [
    ...Array.from(registry.spacingByValue.entries()).map(([v, t]) => ({ value: v, id: t.id, name: t.name })),
    ...Array.from(registry.floatByValue.entries()).map(([v, t]) => ({ value: v, id: t.id, name: t.name })),
  ];
  if (sources.length === 0) return null;
  let best = sources[0];
  for (const s of sources) {
    if (Math.abs(s.value - value) < Math.abs(best.value - value)) best = s;
  }
  return { id: best.id, value: best.value, name: best.name };
}

/** Variável de radius mais próxima (valor numérico). */
function findClosestRadiusVariableInRegistry(value: number, registry: VariableRegistry): { id: string; value: number; name: string } | null {
  const sources = [
    ...Array.from(registry.radiusByValue.entries()).map(([v, t]) => ({ value: v, id: t.id, name: t.name })),
    ...Array.from(registry.floatByValue.entries()).map(([v, t]) => ({ value: v, id: t.id, name: t.name })),
  ];
  if (sources.length === 0) return null;
  let best = sources[0];
  for (const s of sources) {
    if (Math.abs(s.value - value) < Math.abs(best.value - value)) best = s;
  }
  return { id: best.id, value: best.value, name: best.name };
}

// ─── Registry lookup helpers ─────────────────────────────────────────────────

function colorVariableId(hex: string, registry: VariableRegistry | undefined, matchers: KBMatchers): string | null {
  if (!registry) return null;
  const key = hexKey(normalizeHex6(hex));
  const byHex = registry.colorByHex.get(key)?.id ?? null;
  if (byHex) return byHex;
  const closest = matchers.findClosestToken(hex, undefined);
  if (closest && closest.distance < 2 && registry.colorByTokenName) {
    return registry.colorByTokenName.get(closest.token) ?? null;
  }
  return null;
}

function colorVariableName(hex: string, registry: VariableRegistry | undefined, matchers: KBMatchers): string | null {
  if (!registry) return null;
  const key = hexKey(normalizeHex6(hex));
  const byHex = registry.colorByHex.get(key)?.name ?? null;
  if (byHex) return byHex;
  const closest = matchers.findClosestToken(hex, undefined);
  if (closest && closest.distance < 2 && registry.colorByTokenName) {
    const id = registry.colorByTokenName.get(closest.token);
    return id ? (registry.colorVariables.get(id)?.name ?? null) : null;
  }
  return null;
}

function spacingVariableId(value: number, registry?: VariableRegistry): string | null {
  if (!registry) return null;
  return registry.spacingByValue.get(value)?.id ?? registry.floatByValue.get(value)?.id ?? null;
}

function spacingVariableName(value: number, registry?: VariableRegistry): string | null {
  if (!registry) return null;
  return registry.spacingByValue.get(value)?.name ?? registry.floatByValue.get(value)?.name ?? null;
}

function radiusVariableId(value: number, registry?: VariableRegistry): string | null {
  if (!registry) return null;
  return registry.radiusByValue.get(value)?.id ?? registry.floatByValue.get(value)?.id ?? null;
}

function radiusVariableName(value: number, registry?: VariableRegistry): string | null {
  if (!registry) return null;
  return registry.radiusByValue.get(value)?.name ?? registry.floatByValue.get(value)?.name ?? null;
}

function validSpacingSet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<number> {
  if (!registry) return matchers.SPACING_VALUES;
  const merged = new Set<number>();
  for (const v of registry.spacingByValue.keys()) merged.add(v);
  for (const v of registry.floatByValue.keys()) { if (v > 0) merged.add(v); }
  return merged.size > 0 ? merged : matchers.SPACING_VALUES;
}

function validRadiusSet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<number> {
  if (!registry) return matchers.RADIUS_VALUES;
  const merged = new Set<number>();
  for (const v of registry.radiusByValue.keys()) merged.add(v);
  for (const v of registry.floatByValue.keys()) { if (v >= 0) merged.add(v); }
  return merged.size > 0 ? merged : matchers.RADIUS_VALUES;
}

function validFontFamilySet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<string> {
  if (registry && registry.validFontFamilies.size > 0) return registry.validFontFamilies;
  return new Set([matchers.TYPOGRAPHY_TOKENS.fontFamily.toLowerCase()]);
}

function validFontSizeSet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<number> {
  if (registry && registry.validFontSizes.size > 0) return registry.validFontSizes;
  return matchers.TYPOGRAPHY_TOKENS.fontSizes;
}

function validFontWeightSet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<number> {
  if (registry && registry.validFontWeights.size > 0) return registry.validFontWeights;
  return matchers.TYPOGRAPHY_TOKENS.fontWeights;
}

function validLineHeightSet(registry: VariableRegistry | undefined, matchers: KBMatchers): Set<number> {
  if (registry && registry.validLineHeights.size > 0) return registry.validLineHeights;
  return matchers.LINE_HEIGHT_VALUES;
}

function findMatchingTextStyleId(
  fontFamily: string,
  fontSize: number,
  fontWeight: number,
  registry: VariableRegistry,
): string | null {
  let best: { styleId: string; score: number } | null = null;
  for (const [styleId, style] of registry.textStyles) {
    if (style.fontSize !== fontSize) continue;
    const familyMatch =
      style.fontFamily.toLowerCase().includes(fontFamily.toLowerCase()) ||
      fontFamily.toLowerCase().includes(style.fontFamily.toLowerCase());
    if (!familyMatch) continue;
    const score = style.fontWeight === fontWeight ? 2 : 1;
    if (!best || score > best.score) best = { styleId, score };
  }
  return best?.styleId ?? null;
}

const GENERIC_LAYER_NAMES = new Set([
  'frame', 'group', 'rectangle', 'ellipse', 'line', 'polygon', 'star',
  'vector', 'copy', 'untitled', 'component', 'instance',
]);

// ─── UX Meta-variable vocabulary ────────────────────────────────────────────
// Text content roles
//   heading      — título principal, grande e em destaque
//   subheading   — subtítulo, hierarquia secundária
//   eyebrow      — categoria/tag curta acima do título (all-caps, pequeno)
//   body         — parágrafo longo de texto corrido
//   description  — texto descritivo médio (2–10 palavras)
//   label        — rótulo de campo / texto utilitário curto
//   caption      — legenda, texto auxiliar pequeníssimo
//   counter      — número isolado (ex: "12", "4.2k", "#42")
//   entry        — conteúdo preenchível pelo usuário (input content)
//   placeholder  — texto de hint em campo vazio
// Interactive / action
//   btn-*        — botão com ação (text CTA)
//   link-*       — link textual
//   input-field  — campo de formulário
//   search-field — campo de busca
//   dropdown     — seletor/dropdown trigger
//   toggle       — switch on/off
//   chip         — seletor compacto / filtro
// Composição / layout
//   heading-group  — bloco título + subtítulo
//   form-field     — label + input
//   form-group     — agrupamento de campos
//   nav-item       — item de navegação (ícone + label)
//   tab-item       — item de tab
//   list-item      — linha de lista
//   card-*         — card com conteúdo
//   media-card     — card com imagem
//   hero           — bloco full-width de destaque
//   section-*      — seção de página
//   modal-header   — cabeçalho de modal/dialog
//   toast          — notificação temporária
//   alert          — mensagem de feedback inline
//   empty-state    — estado sem conteúdo
//   avatar         — foto/ícone de usuário
//   thumbnail      — miniatura de imagem
//   icon-wrapper   — container de ícone isolado
//   badge          — indicador compacto com número/status
// ────────────────────────────────────────────────────────────────────────────

const BTN_WORDS = new Set([
  // pt-BR
  'confirmar', 'cancelar', 'salvar', 'fechar', 'enviar', 'acessar', 'entrar',
  'sair', 'voltar', 'criar', 'adicionar', 'editar', 'excluir', 'deletar',
  'continuar', 'próximo', 'proximo', 'anterior', 'ver', 'baixar', 'aplicar',
  'limpar', 'buscar', 'pesquisar', 'compartilhar', 'publicar', 'postar',
  'aprovar', 'rejeitar', 'assinar', 'contratar', 'comprar', 'pagar', 'agendar',
  // en
  'submit', 'send', 'download', 'upload', 'ok', 'yes', 'no', 'next', 'back',
  'save', 'delete', 'remove', 'edit', 'create', 'add', 'confirm', 'cancel',
  'sign in', 'log in', 'sign up', 'get started', 'learn more', 'see all',
  'view', 'apply', 'search', 'share', 'publish', 'buy', 'pay', 'schedule',
]);

const SEARCH_HINTS = new Set(['buscar', 'pesquisar', 'search', 'find', 'procurar']);
const PLACEHOLDER_PATTERNS = /^(digite|escreva|insira|informe|busque|ex:|e\.g\.|placeholder|type|enter|search)/i;
const COUNTER_PATTERN = /^[+\-]?\d+(\.\d+)?[km%]?$|^#\d+$|^\d+\s*(itens?|items?)/i;
const EYEBROW_PATTERN = /^[A-ZÀÁÂÃÉÊÍÓÔÕÚÇ\s]+$/;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 28);
}

function slug(text: string, maxLen = 20): string {
  return slugify(text).slice(0, maxLen);
}

function collectChildTexts(nodeId: string, nodeById: Map<string, ScannedNode>, depth = 0): string[] {
  if (depth > 3) return [];
  const node = nodeById.get(nodeId);
  if (!node) return [];
  const texts: string[] = [];
  if (node.text?.content) {
    const t = node.text.content.trim();
    if (t.length > 0 && t.length < 120) texts.push(t);
  }
  for (const id of node.children) texts.push(...collectChildTexts(id, nodeById, depth + 1));
  return texts;
}

// Classify the semantic role of a text string + optional typography signals
type TextRole =
  | 'heading' | 'subheading' | 'eyebrow' | 'body' | 'description'
  | 'label' | 'caption' | 'counter' | 'entry' | 'placeholder';

function classifyTextRole(text: string, typo?: { fontSize?: number; fontWeight?: number }): TextRole {
  const t = text.trim();
  const words = t.split(/\s+/);
  const wordCount = words.length;
  const charCount = t.length;
  const fontSize = typo?.fontSize ?? 14;
  const fontWeight = typo?.fontWeight ?? 400;
  const isHeavy = fontWeight >= 600;
  const isBig = fontSize >= 20;
  const isMedium = fontSize >= 16 && fontSize < 20;
  const isSmall = fontSize <= 12;

  if (COUNTER_PATTERN.test(t)) return 'counter';
  if (PLACEHOLDER_PATTERNS.test(t)) return 'placeholder';
  if (SEARCH_HINTS.has(t.toLowerCase())) return 'entry';
  if (EYEBROW_PATTERN.test(t) && wordCount <= 4 && charCount <= 30) return 'eyebrow';
  if ((isBig || (isHeavy && isMedium)) && wordCount <= 10) return 'heading';
  if (isHeavy && wordCount <= 8) return 'subheading';
  if ((isSmall || wordCount <= 3) && !isHeavy) return charCount <= 40 ? 'label' : 'caption';
  if (t.endsWith(':') || t.endsWith('*')) return 'label';
  if (wordCount >= 15 || charCount >= 100) return 'body';
  if (wordCount >= 6) return 'description';
  return 'caption';
}

function inferNameSuggestion(node: ScannedNode, nodeById: Map<string, ScannedNode>): string {
  const dim = node.dimensions;
  const childNodes = node.children.map(id => nodeById.get(id)).filter(Boolean) as ScannedNode[];
  const allChildTypes = childNodes.map(n => n.type);
  const directTextNodes = childNodes.filter(n => n.type === 'TEXT');
  const allTexts = node.children.flatMap(id => collectChildTexts(id, nodeById));
  const firstText = allTexts[0] ?? '';
  const s = slug(firstText);

  const w = dim?.width ?? 0;
  const h = dim?.height ?? 0;
  const radius = dim?.cornerRadius ?? 0;
  const childCount = childNodes.length;
  const isHorizontal = node.layout?.autoLayoutMode === 'HORIZONTAL';
  const isVertical = node.layout?.autoLayoutMode === 'VERTICAL';

  const hasText = directTextNodes.length > 0;
  const hasInstance = allChildTypes.includes('INSTANCE');
  const hasRect = allChildTypes.includes('RECTANGLE');
  const hasEllipse = allChildTypes.includes('ELLIPSE');
  const hasVector = allChildTypes.includes('VECTOR');
  const isSmallIcon = hasInstance && childNodes.some(n => n.type === 'INSTANCE' && (n.dimensions?.width ?? 99) <= 32);
  const isImageLike = hasRect && childNodes.some(n => n.type === 'RECTANGLE' && n.children.length === 0);

  // 1. BUTTON — small action frame with CTA text or rounded border
  const isBtnHeight = h >= 28 && h <= 64;
  const isBtnWidth = w <= 360;
  const hasBtnText = BTN_WORDS.has(firstText.toLowerCase()) || BTN_WORDS.has(s.replace(/-/g, ' '));
  const hasBtnRadius = radius >= 4;
  if (isBtnHeight && isBtnWidth && (hasBtnText || (hasBtnRadius && directTextNodes.length === 1 && childCount <= 3))) {
    return s ? `btn-${s}` : 'btn';
  }

  // 2. SEARCH FIELD — input with search semantics
  if (SEARCH_HINTS.has(firstText.toLowerCase()) && h >= 36 && h <= 60 && w >= 150) {
    return 'search-field';
  }

  // 3. INPUT / FORM FIELD — label above + inner frame (input)
  if (isVertical && hasText && allChildTypes.includes('FRAME') && h >= 50 && h <= 120 && w >= 120) {
    return s ? `form-field-${s}` : 'form-field';
  }

  // 4. CHIP / TAG — very small, rounded, short text
  if (h >= 20 && h <= 36 && w >= 32 && w <= 140 && radius >= 8 && hasText && childCount <= 3) {
    return s ? `chip-${s}` : 'chip';
  }

  // 5. BADGE — tiny, mostly number
  if (h <= 24 && w <= 48 && childCount <= 1) {
    if (COUNTER_PATTERN.test(firstText)) return 'badge';
    return s ? `badge-${s}` : 'badge';
  }

  // 6. SINGLE TEXT WRAPPER — classify text role precisely
  if (directTextNodes.length === 1 && childCount === 1) {
    const tNode = directTextNodes[0];
    const role = classifyTextRole(firstText, tNode.typography ?? undefined);
    const shortS = slug(firstText, 18);
    switch (role) {
      case 'counter': return 'counter';
      case 'placeholder': return 'placeholder';
      case 'entry': return 'entry-content';
      case 'eyebrow': return shortS ? `eyebrow-${shortS}` : 'eyebrow';
      case 'heading': return shortS ? `heading-${shortS}` : 'heading';
      case 'subheading': return shortS ? `subheading-${shortS}` : 'subheading';
      case 'body': return shortS ? `body-${shortS}` : 'body-text';
      case 'description': return shortS ? `description-${shortS}` : 'description';
      case 'label': return shortS ? `label-${shortS}` : 'label';
      case 'caption': return shortS ? `caption-${shortS}` : 'caption';
    }
  }

  // 7. HEADING GROUP — vertical stack of 2+ text nodes (title + subtitle pattern)
  if (isVertical && allChildTypes.every(t => t === 'TEXT') && childCount >= 2) {
    return s ? `heading-group-${slug(firstText, 15)}` : 'heading-group';
  }

  // 8. AVATAR — circle/square with image or ellipse (profile picture)
  if (hasEllipse && childCount <= 2 && w <= 80 && h <= 80) return 'avatar';
  if (isImageLike && childCount <= 2 && w === h && w <= 80) return 'avatar';

  // 9. THUMBNAIL — small rectangular image block
  if (isImageLike && childCount <= 2 && w <= 160 && h <= 160) return 'thumbnail';

  // 10. ICON WRAPPER — tiny frame just holding an icon/vector
  if ((hasVector || isSmallIcon) && !hasText && childCount <= 2 && w <= 40 && h <= 40) {
    return 'icon-wrapper';
  }

  // 11. NAV ITEM — icon + label horizontally
  if (isHorizontal && isSmallIcon && hasText && childCount <= 3 && h <= 60) {
    return s ? `nav-item-${slug(firstText, 15)}` : 'nav-item';
  }

  // 12. TAB ITEM — similar to nav-item but typically inside a tab bar
  if (isHorizontal && hasText && childCount <= 3 && h <= 56 && w <= 120) {
    return s ? `tab-item-${slug(firstText, 15)}` : 'tab-item';
  }

  // 13. LIST ITEM — horizontal, multiple elements, consistent height
  if (isHorizontal && childCount >= 2 && h >= 40 && h <= 88) {
    return s ? `list-item-${slug(firstText, 15)}` : 'list-item';
  }

  // 14. TOAST / ALERT — small full-width feedback message
  if (hasText && w >= 280 && h >= 40 && h <= 100 && childCount <= 4) {
    const textLower = firstText.toLowerCase();
    if (/erro|error|falhou|failed|inválid|invalid/.test(textLower)) return 'alert-error';
    if (/sucesso|success|salvo|saved|concluído|done/.test(textLower)) return 'alert-success';
    if (/atenção|attention|aviso|warning/.test(textLower)) return 'alert-warning';
    return s ? `toast-${slug(firstText, 15)}` : 'toast';
  }

  // 15. EMPTY STATE — large frame with illustration + text
  if (hasText && childCount >= 2 && w >= 200 && h >= 150) {
    const textLower = firstText.toLowerCase();
    if (/vazio|empty|nenhum|não encontr|no results|nothing/.test(textLower)) return 'empty-state';
  }

  // 16. MEDIA CARD — image + text content
  if (isImageLike && hasText) {
    return s ? `card-${slug(firstText, 18)}` : 'media-card';
  }

  // 17. CARD — multi-child frame, medium size
  if (childCount >= 2 && w >= 120 && h >= 80 && s) {
    return `card-${slug(firstText, 18)}`;
  }

  // 18. HERO — large, wide, prominent
  if (w >= 600 && h >= 300) {
    return s ? `hero-${slug(firstText, 18)}` : 'hero';
  }

  // 19. SECTION — medium-to-large frame
  if (w >= 320 && h >= 200 && s) {
    return `section-${slug(firstText, 18)}`;
  }

  // Text slug fallback
  if (s) return s;

  // Pure structural fallbacks
  if (isImageLike && hasText) return 'media-item';
  if (hasText) return 'text-group';
  if (childCount === 0) return 'container';
  return `group-${node.type.toLowerCase()}`;
}

const INTERACTIVE_KEYWORDS = ['button', 'btn', 'input', 'link', 'checkbox', 'radio', 'toggle', 'switch', 'tab'];

function isInteractiveNode(node: ScannedNode): boolean {
  if (node.component?.isInstance || node.type === 'COMPONENT') return true;
  const n = node.name.toLowerCase();
  return INTERACTIVE_KEYWORDS.some(k => n.includes(k));
}

function hasTextStyleInRegistry(node: ScannedNode, registry?: VariableRegistry): boolean {
  const sid = node.typography?.textStyleId ?? node.boundVariables?.textStyleId;
  if (!sid || !registry) return false;
  const style = registry.textStyles.get(sid);
  if (!style) return false;
  // Only consider it a DS text style if it uses Dasa Sans — avoids suppressing
  // detection for text styles from unrelated libraries or custom local styles.
  return style.fontFamily.toLowerCase().includes('dasa');
}

function hasRadiusBound(node: ScannedNode): boolean {
  const cr = node.boundVariables?.cornerRadiusVariableIds;
  return !!(cr?.topLeft || cr?.topRight || cr?.bottomLeft || cr?.bottomRight);
}

type RuleContext = {
  nodes: ScannedNode[];
  registry?: VariableRegistry;
  registryView?: VariableRegistryView;
  nodeById: Map<string, ScannedNode>;
  matchers: KBMatchers;
  kbData: KBData;
  rulesMap: Map<string, Rule>;
};
type RuleHandler = (ctx: RuleContext) => Finding[];

const ruleHandlers: Record<string, RuleHandler> = {
  TOKEN_COLOR_01({ nodes, registry, registryView, matchers, rulesMap }) {
    type ColorGroup = { nodes: ScannedNode[]; closest: ReturnType<KBMatchers['findClosestToken']>; canFix: boolean; colorType: string; hex: string };
    const groups = new Map<string, ColorGroup>();

    for (const node of nodes) {
      for (const color of node.colors) {
        if (color.variableId) continue;
        if (matchers.isTokenColor(color.hex, registryView)) continue;
        const key = `${color.type}:${color.hex}`;
        if (!groups.has(key)) {
          const closest = matchers.findClosestToken(color.hex, registryView);
          const canApply = (color.type === 'fill' || color.type === 'stroke') && !!(closest && closest.distance < 50);
          groups.set(key, { nodes: [], closest, canFix: canApply, colorType: color.type, hex: color.hex });
        }
        groups.get(key)!.nodes.push(node);
      }
    }

    return Array.from(groups.entries()).map(([key, g]) => {
      const varName = g.closest ? colorVariableName(g.closest.value, registry, matchers) : null;
      const tokenDisplay = varName || g.closest?.token || null;
      return makeGroupedFinding(rulesMap, 'TOKEN_COLOR_01', key, g.nodes, {
        confidence: g.canFix ? 0.9 : 0.7,
        evidence: [
          `Cor ${g.colorType}: ${g.hex}`,
          tokenDisplay ? `Variável DS: ${tokenDisplay} (${g.closest!.value})` : 'Nenhum token próximo encontrado',
        ],
        whyItMatters: 'Cores fora do DS quebram consistência visual e dificultam manutenção',
        recommendation: tokenDisplay ? `Aplicar variável ${tokenDisplay} (${g.closest!.value})` : 'Revisar cor e adicionar ao DS se necessário',
        quickFix: g.canFix && (g.colorType === 'fill' || g.colorType === 'stroke')
          ? {
              possible: true,
              action: 'applyColor',
              params: {
                colorType: g.colorType,
                newColor: g.closest!.value,
                variableId: colorVariableId(g.closest!.value, registry, matchers) ?? undefined,
              },
            }
          : NO_FIX,
        manualSteps: [
          `Selecionar os ${g.nodes.length} node(s) com cor ${g.hex}`,
          tokenDisplay ? `Aplicar variável ${tokenDisplay}` : 'Aplicar token de cor apropriado',
        ],
      });
    });
  },

  TOKEN_TYPO_01({ nodes, registry, matchers, rulesMap }) {
    const validFamilies = validFontFamilySet(registry, matchers);
    const groups = new Map<string, ScannedNode[]>();
    for (const node of nodes) {
      if (!node.typography || node.typography.fontFamily === 'Unknown') continue;
      if (hasTextStyleInRegistry(node, registry)) continue;
      const familyLower = node.typography.fontFamily.toLowerCase();
      if ([...validFamilies].some(f => familyLower.includes(f) || f.includes(familyLower))) continue;
      const key = node.typography.fontFamily;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(node);
    }

    return Array.from(groups.entries()).map(([fontFamily, groupNodes]) =>
      makeGroupedFinding(rulesMap, 'TOKEN_TYPO_01', fontFamily, groupNodes, {
        confidence: 0.9,
        evidence: [`Font family: ${fontFamily}`],
        whyItMatters: 'Tipografia inconsistente quebra identidade visual',
        recommendation: 'Usar Dasa Sans',
        manualSteps: [`Selecionar os ${groupNodes.length} texto(s) com fonte ${fontFamily}`, 'Aplicar fonte Dasa Sans'],
      })
    );
  },

  TOKEN_TYPO_02({ nodes, registry, matchers, rulesMap }) {
    const validSizes = validFontSizeSet(registry, matchers);
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      if (!node.typography) continue;
      if (hasTextStyleInRegistry(node, registry)) continue;
      const { fontSize } = node.typography;
      if (validSizes.has(fontSize)) continue;
      if (!groups.has(fontSize)) groups.set(fontSize, []);
      groups.get(fontSize)!.push(node);
    }

    return Array.from(groups.entries()).map(([fontSize, groupNodes]) => {
      const closest = matchers.closestFromSet(validSizes, fontSize);
      const weight = groupNodes[0]?.typography?.fontWeight ?? 400;
      const family = groupNodes[0]?.typography?.fontFamily ?? '';
      const styleId = registry ? findMatchingTextStyleId(family, closest, weight, registry) : null;
      return makeGroupedFinding(rulesMap, 'TOKEN_TYPO_02', String(fontSize), groupNodes, {
        confidence: Math.abs(fontSize - closest) < 2 ? 0.8 : 0.6,
        evidence: [`Font size: ${fontSize}px`, `Valor DS mais próximo: ${closest}px`],
        whyItMatters: 'Tamanhos fora da escala quebram hierarquia tipográfica',
        recommendation: `Corrigir ${fontSize}px → ${closest}px`,
        quickFix: {
          possible: true,
          action: 'applyFontSize',
          params: { value: closest, ...(styleId ? { styleId } : {}) },
        },
        manualSteps: [`Selecionar os ${groupNodes.length} texto(s) com ${fontSize}px`, `Ajustar fontSize para ${closest}px`],
      });
    });
  },

  TOKEN_FONT_WEIGHT_01({ nodes, registry, matchers, rulesMap }) {
    const groups = new Map<number, ScannedNode[]>();
    const validWeights = validFontWeightSet(registry, matchers);
    for (const node of nodes) {
      if (!node.typography) continue;
      if (hasTextStyleInRegistry(node, registry)) continue;
      const w = node.typography.fontWeight;
      if (validWeights.has(w)) continue;
      if (!groups.has(w)) groups.set(w, []);
      groups.get(w)!.push(node);
    }
    const closestWeight = (w: number): number => {
      const arr = [...validWeights].sort((a, b) => a - b);
      let best = arr[0];
      for (const v of arr) {
        if (Math.abs(v - w) < Math.abs(best - w)) best = v;
      }
      return best;
    };
    return Array.from(groups.entries()).map(([w, groupNodes]) =>
      makeGroupedFinding(rulesMap, 'TOKEN_FONT_WEIGHT_01', String(w), groupNodes, {
        confidence: 0.9,
        evidence: [`Font weight: ${w}`, `Valor DS mais próximo: ${closestWeight(w)}`],
        whyItMatters: 'Pesos fora do DS quebram consistência tipográfica',
        recommendation: `Corrigir weight ${w} → ${closestWeight(w)}`,
        manualSteps: [`Selecionar os ${groupNodes.length} texto(s) com weight ${w}`, `Aplicar weight ${closestWeight(w)}`],
      })
    );
  },

  TOKEN_LINE_HEIGHT_01({ nodes, registry, matchers, rulesMap }) {
    const validLH = validLineHeightSet(registry, matchers);
    const isValidLH = (val: number): boolean => {
      const ratio = val > 10 ? val / 100 : val;
      return [...validLH].some(lh => Math.abs(lh - ratio) < 0.01);
    };
    const groups = new Map<string, ScannedNode[]>();
    for (const node of nodes) {
      if (!node.typography?.lineHeight) continue;
      if (hasTextStyleInRegistry(node, registry)) continue;
      const lh = node.typography.lineHeight;
      if (isValidLH(lh)) continue;
      const key = String(lh);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(node);
    }
    return Array.from(groups.entries()).map(([key, groupNodes]) => {
      const lhNum = parseFloat(key);
      const ratio = lhNum > 10 ? lhNum / 100 : lhNum;
      const sorted = [...validLH].sort((a, b) => a - b);
      let closest = sorted[0];
      for (const lh of sorted) { if (Math.abs(lh - ratio) < Math.abs(closest - ratio)) closest = lh; }
      const displayClosest = closest >= 1 ? `${Math.round(closest * 100)}%` : `${closest}`;
      return makeGroupedFinding(rulesMap, 'TOKEN_LINE_HEIGHT_01', key, groupNodes, {
        confidence: 0.8,
        evidence: [`Line height: ${key}`, `Valor DS mais próximo: ${displayClosest}`],
        whyItMatters: 'Entrelinha fora do DS quebra consistência tipográfica',
        recommendation: `Corrigir entrelinha para ${displayClosest}`,
        manualSteps: [`Selecionar os ${groupNodes.length} texto(s)`, `Aplicar line height ${displayClosest}`],
      });
    });
  },

  TOKEN_RADIUS_01({ nodes, registry, matchers, rulesMap }) {
    const validRadius = validRadiusSet(registry, matchers);
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      if (hasRadiusBound(node)) continue;
      const cr = node.dimensions?.cornerRadius;
      if (cr === undefined || cr <= 0 || validRadius.has(cr)) continue;
      if (!groups.has(cr)) groups.set(cr, []);
      groups.get(cr)!.push(node);
    }

    return Array.from(groups.entries()).map(([cr, groupNodes]) => {
      const closest = matchers.closestFromSet(validRadius, cr);
      const varId = radiusVariableId(closest, registry);
      const varName = radiusVariableName(closest, registry);
      const tokenDisplay = varName ? `${varName} (${closest}px)` : `${closest}px`;
      return makeGroupedFinding(rulesMap, 'TOKEN_RADIUS_01', String(cr), groupNodes, {
        confidence: 0.8,
        evidence: [`Corner radius: ${cr}px`, varName ? `Variável DS: ${varName} (${closest}px)` : `Valor DS mais próximo: ${closest}px`],
        whyItMatters: 'Border radius fora do DS quebra consistência visual',
        recommendation: `Corrigir radius ${cr}px → ${tokenDisplay}`,
        quickFix: {
          possible: true,
          action: 'applyRadius',
          params: { value: closest, ...(varId ? { variableId: varId } : {}) },
        },
        manualSteps: [`Selecionar os ${groupNodes.length} node(s) com radius ${cr}px`, `Aplicar ${tokenDisplay}`],
      });
    });
  },

  TOKEN_BORDER_WIDTH_01({ nodes, matchers, rulesMap }) {
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      const sw = node.dimensions?.strokeWeight;
      if (sw === undefined || sw < 0) continue;
      if (matchers.BORDER_WIDTH_VALUES.has(sw)) continue;
      if (!groups.has(sw)) groups.set(sw, []);
      groups.get(sw)!.push(node);
    }
    const closest = (v: number): number => {
      const arr = [...matchers.BORDER_WIDTH_VALUES].sort((a, b) => a - b);
      let best = arr[0];
      for (const x of arr) {
        if (Math.abs(x - v) < Math.abs(best - v)) best = x;
      }
      return best;
    };
    return Array.from(groups.entries()).map(([sw, groupNodes]) =>
      makeGroupedFinding(rulesMap, 'TOKEN_BORDER_WIDTH_01', String(sw), groupNodes, {
        confidence: 0.9,
        evidence: [`Espessura de borda: ${sw}px`, `Valor DS mais próximo: ${closest(sw)}px`],
        whyItMatters: 'Espessura de borda fora do DS quebra consistência',
        recommendation: `Corrigir borda ${sw}px → ${closest(sw)}px`,
        manualSteps: [`Selecionar os ${groupNodes.length} node(s)`, `Aplicar stroke ${closest(sw)}px`],
      })
    );
  },

  TOKEN_SHADOW_01({ nodes, matchers, rulesMap }) {
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      const effects = node.effects;
      if (!effects?.length) continue;
      for (const eff of effects) {
        if (eff.type !== 'DROP_SHADOW' && eff.type !== 'INNER_SHADOW') continue;
        if (matchers.isTokenShadowBlur(eff.radius)) continue;
        const r = eff.radius;
        if (!groups.has(r)) groups.set(r, []);
        if (!groups.get(r)!.includes(node)) groups.get(r)!.push(node);
      }
    }
    return Array.from(groups.entries()).map(([r, groupNodes]) =>
      makeGroupedFinding(rulesMap, 'TOKEN_SHADOW_01', String(r), groupNodes, {
        confidence: 0.8,
        evidence: [`Blur da sombra: ${r}px`, `Valor DS mais próximo: ${matchers.closestShadowBlur(r)}px`],
        whyItMatters: 'Sombras fora do DS quebram consistência de elevação',
        recommendation: `Corrigir blur ${r}px → ${matchers.closestShadowBlur(r)}px`,
        manualSteps: [`Selecionar os ${groupNodes.length} node(s)`, `Aplicar blur ${matchers.closestShadowBlur(r)}px`],
      })
    );
  },

  TOKEN_SHADOW_BIND_01({ nodes, matchers, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      const effects = node.effects;
      if (!effects?.length) continue;
      const unbound = effects.filter(eff =>
        (eff.type === 'DROP_SHADOW' || eff.type === 'INNER_SHADOW') && !eff.variableId && matchers.isTokenShadowBlur(eff.radius)
      );
      if (unbound.length === 0) continue;
      findings.push(makeFinding(rulesMap, 'TOKEN_SHADOW_BIND_01', node, {
        confidence: 0.85,
        evidence: [`${unbound.length} sombra(s) com valor DS mas sem variável`, 'Blur: ' + unbound.map(e => `${e.radius}px`).join(', ')],
        whyItMatters: 'Sombra hard-coded impede propagação de mudanças no DS',
        recommendation: 'Vincular à effect variable DS',
        manualSteps: [`Selecionar "${node.name}"`, 'Vincular ao effect style/variable DS no painel Effects'],
      }));
    }
    return findings;
  },

  TOKEN_SPACING_01({ nodes, registry, matchers, rulesMap }) {
    const validSpacing = validSpacingSet(registry, matchers);
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      const dim = node.dimensions;
      if (!dim) continue;
      const sp = node.boundVariables?.spacingVariableIds;
      const pairs: [string, number | undefined][] = [
        ['itemSpacing', dim.gap], ['paddingTop', dim.paddingTop], ['paddingRight', dim.paddingRight],
        ['paddingBottom', dim.paddingBottom], ['paddingLeft', dim.paddingLeft],
      ];
      const addedForNode = new Set<number>();
      for (const [bindKey, val] of pairs) {
        if (!val || val <= 0) continue;
        if (sp?.[bindKey as keyof typeof sp]) continue;
        if (validSpacing.has(val)) continue;
        if (addedForNode.has(val)) continue;
        addedForNode.add(val);
        if (!groups.has(val)) groups.set(val, []);
        groups.get(val)!.push(node);
      }
    }

    return Array.from(groups.entries()).map(([val, groupNodes]) => {
      const closest = matchers.closestFromSet(validSpacing, val);
      const varId = spacingVariableId(closest, registry);
      const varName = spacingVariableName(closest, registry);
      const tokenDisplay = varName ? `${varName} (${closest}px)` : `${closest}px`;
      return makeGroupedFinding(rulesMap, 'TOKEN_SPACING_01', String(val), groupNodes, {
        confidence: 0.7,
        evidence: [`Espaçamento: ${val}px`, varName ? `Variável DS: ${varName} (${closest}px)` : `Valor DS mais próximo: ${closest}px`],
        whyItMatters: 'Espaçamentos fora da escala comprometem ritmo visual',
        recommendation: `Corrigir ${val}px → ${tokenDisplay}`,
        quickFix: {
          possible: true,
          action: 'applyAllMatchingSpacings',
          params: { oldValue: val, newValue: closest, ...(varId ? { variableId: varId } : {}) },
        },
        manualSteps: [`Selecionar os ${groupNodes.length} node(s) com espaçamento ${val}px`, `Aplicar ${tokenDisplay}`],
      });
    });
  },

  A11Y_TOUCH_01({ nodes, rulesMap }) {
    const groups = new Map<string, ScannedNode[]>();
    for (const node of nodes) {
      if (!node.dimensions || !isInteractiveNode(node)) continue;
      const { width, height } = node.dimensions;
      if (width >= TOUCH_TARGET_MIN && height >= TOUCH_TARGET_MIN) continue;
      const key = `${width}x${height}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(node);
    }
    return Array.from(groups.entries()).map(([key, groupNodes]) => {
      const [w, h] = key.split('x').map(Number);
      return makeGroupedFinding(rulesMap, 'A11Y_TOUCH_01', key, groupNodes, {
        confidence: 0.95,
        evidence: [`Dimensões: ${w}x${h}px`, `Mínimo WCAG: ${TOUCH_TARGET_MIN}x${TOUCH_TARGET_MIN}px`],
        whyItMatters: 'Touch targets pequenos violam WCAG AA e dificultam uso em mobile',
        recommendation: `Aumentar para mínimo ${TOUCH_TARGET_MIN}x${TOUCH_TARGET_MIN}px`,
        quickFix: {
          possible: true,
          action: 'resizeNode',
          params: { minWidth: TOUCH_TARGET_MIN, minHeight: TOUCH_TARGET_MIN },
        },
        manualSteps: [
          `Selecionar os ${groupNodes.length} componente(s) com touch target ${w}x${h}px`,
          `Ajustar para mínimo ${TOUCH_TARGET_MIN}x${TOUCH_TARGET_MIN}px`,
        ],
      });
    });
  },

  A11Y_IMG_ALT_01({ nodes, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      if (!node.hasImageFill) continue;
      const desc = node.description?.trim();
      if (desc && desc.length > 0) continue;
      findings.push(makeFinding(rulesMap, 'A11Y_IMG_ALT_01', node, {
        confidence: 0.9,
        evidence: [`"${node.name}" tem fill de imagem`, 'Campo description vazio ou ausente'],
        whyItMatters: 'Imagens precisam de texto alternativo para leitores de tela (WCAG)',
        recommendation: 'Preencher a description do node com um texto alternativo descritivo',
        manualSteps: [`Selecionar "${node.name}"`, 'Abrir painel direito → seção Description (ou Design > Description)', 'Inserir texto alternativo descritivo'],
      }));
    }
    return findings;
  },

  A11Y_CONTRAST_01({ nodes, nodeById, rulesMap }) {
    type ContrastGroup = { nodes: ScannedNode[]; textHex: string; bgHex: string; check: NonNullable<ReturnType<typeof meetsWCAGAAFromHex>> };
    const groups = new Map<string, ContrastGroup>();
    for (const node of nodes) {
      if (!node.typography || node.colors.length === 0) continue;
      const textColor = node.colors.find(c => c.type === 'fill');
      if (!textColor) continue;

      const bgColor = findBackgroundColor(node, nodeById);
      const check = meetsWCAGAAFromHex(textColor.hex, bgColor, node.typography.fontSize);
      if (check && !check.meets) {
        const key = `${textColor.hex}:${bgColor}`;
        if (!groups.has(key)) {
          groups.set(key, { nodes: [], textHex: textColor.hex, bgHex: bgColor, check });
        }
        groups.get(key)!.nodes.push(node);
      }
    }
    return Array.from(groups.entries()).map(([key, g]) =>
      makeGroupedFinding(rulesMap, 'A11Y_CONTRAST_01', key, g.nodes, {
        confidence: 0.85,
        evidence: [
          `Texto: ${g.textHex}`, `Fundo: ${g.bgHex}`,
          `Contraste: ${g.check.ratio.toFixed(2)}:1`, `Requerido: ${g.check.required}:1 (${g.check.level})`,
        ],
        whyItMatters: 'Contraste insuficiente viola WCAG AA e dificulta leitura',
        recommendation: `Ajustar cores para atingir contraste mínimo ${g.check.required}:1`,
        manualSteps: [
          `Selecionar os ${g.nodes.length} texto(s) com essa combinação de cores`,
          'Ajustar cor do texto ou fundo',
        ],
      })
    );
  },

  COMP_NAMING_01({ nodes, nodeById, rulesMap }) {
    const groups = new Map<string, ScannedNode[]>();
    for (const node of nodes) {
      const base = node.name.toLowerCase().replace(/\s*\d+$/, '').trim();
      if (!GENERIC_LAYER_NAMES.has(base)) continue;
      if (!groups.has(base)) groups.set(base, []);
      groups.get(base)!.push(node);
    }
    return Array.from(groups.entries()).map(([base, groupNodes]) => {
      const suggestions = groupNodes
        .slice(0, 3)
        .map(n => `"${n.name}" → "${inferNameSuggestion(n, nodeById)}"`)
        .join('; ');
      return makeGroupedFinding(rulesMap, 'COMP_NAMING_01', base, groupNodes, {
        confidence: 0.95,
        evidence: [
          `${groupNodes.length} layer(s) com nome genérico "${base}"`,
          ...(suggestions ? [`Ex.: ${suggestions}`] : []),
        ],
        whyItMatters: 'Nomes genéricos dificultam handoff e manutenção',
        recommendation: 'Renomear cada layer para um nome descritivo',
        quickFix: NO_FIX,
        manualSteps: [
          `Selecionar os ${groupNodes.length} layer(s) com nome "${base}"`,
          'Renomear cada um para um nome descritivo (ex: btn-*, card-*, heading-*)',
        ],
      });
    });
  },

  UX_AUTOLAYOUT_01({ nodes, rulesMap }) {
    const groupNodes = nodes.filter(
      node => node.children.length > 0 && node.layout && node.layout.autoLayoutMode === 'NONE'
    );
    if (groupNodes.length === 0) return [];
    return [
      makeGroupedFinding(rulesMap, 'UX_AUTOLAYOUT_01', 'missing', groupNodes, {
        confidence: 0.6,
        evidence: [
          `${groupNodes.length} frame(s) com filhos sem auto layout`,
          `Ex.: ${groupNodes.slice(0, 3).map(n => `"${n.name}" (${n.children.length} filhos)`).join(', ')}${groupNodes.length > 3 ? ` +${groupNodes.length - 3}` : ''}`,
        ],
        whyItMatters: 'Sem auto layout, responsividade depende de constraints manuais',
        recommendation: 'Aplicar auto layout (VERTICAL ou HORIZONTAL)',
        manualSteps: [
          `Selecionar os ${groupNodes.length} frame(s) listados`,
          'Aplicar auto layout no Figma (Shift+A)',
        ],
      }),
    ];
  },

  // ─── COPY rules ──────────────────────────────────────────────────────────────

  COPY_TERM_01({ nodes, matchers, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      const content = node.text?.content?.trim();
      if (!content) continue;
      const violations = matchers.findTermViolations(content);
      for (const v of violations) {
        findings.push(makeFinding(rulesMap, 'COPY_TERM_01', node, {
          confidence: 0.9,
          evidence: [`Texto: "${content.slice(0, 60)}${content.length > 60 ? '…' : ''}"`, `Termo evitado: "${v.term}"`, `Usar: "${v.suggestion}"`],
          whyItMatters: 'Glossário garante consistência e tom de voz do DS',
          recommendation: `Substituir "${v.term}" por "${v.suggestion}"`,
          manualSteps: [`Selecionar texto em "${node.name}"`, `Substituir "${v.term}" por "${v.suggestion}"`],
        }));
      }
    }
    return findings;
  },

  COPY_TERM_02({ nodes, matchers, rulesMap }) {
    const findings: Finding[] = [];
    const properSet = new Set(matchers.CAPITALIZATION_RULES.properNouns.map(n => n.toLowerCase()));
    for (const node of nodes) {
      const content = node.text?.content?.trim();
      if (!content || content.length < 3) continue;
      const words = content.split(/\s+/);
      if (words.length < 2) continue;
      const wronglyCapitalized: string[] = [];
      for (let i = 1; i < words.length; i++) {
        const w = words[i];
        const firstLetter = w.charAt(0);
        if (firstLetter === firstLetter.toUpperCase() && firstLetter !== firstLetter.toLowerCase()) {
          const base = w.replace(/[^a-zA-ZÀ-ÿ]/g, '');
          if (base && !properSet.has(base.toLowerCase())) wronglyCapitalized.push(w);
        }
      }
      if (wronglyCapitalized.length > 0) {
        findings.push(makeFinding(rulesMap, 'COPY_TERM_02', node, {
          confidence: 0.8,
          evidence: [`Texto: "${content.slice(0, 50)}…"`, `Palavras com maiúscula indevida: ${wronglyCapitalized.join(', ')}`],
          whyItMatters: 'Títulos devem ter apenas primeira palavra e nomes próprios em maiúscula',
          recommendation: 'Usar maiúscula apenas na primeira palavra e em nomes próprios/marcas',
          manualSteps: [`Selecionar texto em "${node.name}"`, 'Ajustar capitalização conforme copy-rules'],
        }));
      }
    }
    return findings;
  },

  COPY_TERM_03({ nodes, matchers, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      const content = node.text?.content?.trim();
      if (!content) continue;
      const found = matchers.findForbiddenTerms(content);
      for (const f of found) {
        findings.push(makeFinding(rulesMap, 'COPY_TERM_03', node, {
          confidence: 0.95,
          evidence: [`Texto: "${content.slice(0, 60)}${content.length > 60 ? '…' : ''}"`, `Termo proibido: "${f.pattern}"`, `Substituir por: "${f.replacement || '(remover prefixo)'}"`],
          whyItMatters: 'Termos proibidos quebram tom de voz e acessibilidade',
          recommendation: f.replacement ? `Substituir "${f.pattern}" por "${f.replacement}"` : `Remover ou reescrever "${f.pattern}"`,
          manualSteps: [`Selecionar texto em "${node.name}"`, f.replacement ? `Substituir por "${f.replacement}"` : 'Remover prefixo e reescrever de forma empática'],
        }));
      }
    }
    return findings;
  },

  COPY_CTA_01({ nodes, matchers, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      const content = node.text?.content?.trim();
      if (!content) continue;
      const role = classifyTextRole(content, node.typography);
      const isLikelyCTA = role === 'heading' || BTN_WORDS.has(content.toLowerCase()) || (node.children.length <= 2 && content.split(/\s+/).length <= 4);
      if (!isLikelyCTA) continue;
      const { valid, issues } = matchers.validateCTA(content);
      if (!valid && issues.length > 0) {
        findings.push(makeFinding(rulesMap, 'COPY_CTA_01', node, {
          confidence: 0.85,
          evidence: [`CTA: "${content}"`, ...issues],
          whyItMatters: 'CTAs devem ser verbo no infinitivo, 2-3 palavras, sem ponto final',
          recommendation: issues[0] ?? 'Reformular CTA conforme copy-rules',
          manualSteps: [`Selecionar texto em "${node.name}"`, 'Ajustar para infinitivo, 2-3 palavras, sem ponto'],
        }));
      }
    }
    return findings;
  },

  COPY_ERROR_01({ nodes, rulesMap }) {
    const findings: Finding[] = [];
    for (const node of nodes) {
      const content = node.text?.content?.trim();
      if (!content) continue;
      if (content.startsWith('Erro:') || content.startsWith('Erro :')) {
        findings.push(makeFinding(rulesMap, 'COPY_ERROR_01', node, {
          confidence: 0.95,
          evidence: [`Texto: "${content.slice(0, 60)}…"`],
          whyItMatters: 'Mensagens de erro não devem usar prefixo "Erro:" — ser acionáveis e empáticas',
          recommendation: 'Remover prefixo e reescrever mensagem de forma clara e acionável',
          manualSteps: [`Selecionar texto em "${node.name}"`, 'Remover "Erro:" e reescrever de forma empática'],
        }));
      }
    }
    return findings;
  },

  // ─── TOKEN BINDING rules ────────────────────────────────────────────────────
  // Correct value but hard-coded: the variable/token system is bypassed.
  // These prevent 100% DS match. All are LOW severity (value is right, binding is missing).

  TOKEN_COLOR_BIND_01({ nodes, registry, registryView, matchers, rulesMap }) {
    if (!registry || registry.colorByHex.size === 0) return [];

    type CGroup = { nodes: ScannedNode[]; colorType: string; hex: string };
    const groups = new Map<string, CGroup>();

    for (const node of nodes) {
      for (const color of node.colors) {
        if (color.variableId) continue;
        if (!matchers.isTokenColor(color.hex, registryView)) continue;
        const key = `${color.type}:${color.hex}`;
        if (!groups.has(key)) groups.set(key, { nodes: [], colorType: color.type, hex: color.hex });
        groups.get(key)!.nodes.push(node);
      }
    }

    return Array.from(groups.entries()).map(([key, g]) => {
      let varId = colorVariableId(g.hex, registry, matchers);
      let varName = colorVariableName(g.hex, registry, matchers);
      let suggestedValue = g.hex;
      if (!varId && (g.colorType === 'fill' || g.colorType === 'stroke')) {
        const closest = findClosestColorVariableInRegistry(g.hex, registry);
        if (closest) {
          varId = closest.id;
          varName = closest.name;
          suggestedValue = closest.value;
        }
      }
      const canApply = !!(varId && (g.colorType === 'fill' || g.colorType === 'stroke'));
      return makeGroupedFinding(rulesMap, 'TOKEN_COLOR_BIND_01', key, g.nodes, {
        confidence: 0.95,
        evidence: [`Cor ${g.colorType}: ${g.hex}`, varName ? `Variável DS: ${varName} (${suggestedValue})` : 'Valor DS correto, sem variável no documento'],
        whyItMatters: 'Hard-code impede propagação automática de mudanças no DS',
        recommendation: varName ? `Associar à variável ${varName}` : `Vincular à variável DS no painel Fill`,
        quickFix: canApply
          ? { possible: true, action: 'applyColor', params: { colorType: g.colorType, variableId: varId, newColor: suggestedValue } }
          : NO_FIX,
        manualSteps: [
          `Selecionar os ${g.nodes.length} node(s) com cor ${g.hex}`,
          varName ? `Vincular à variável ${varName}` : 'Abrir painel Fill → vincular à variável DS',
        ],
      });
    });
  },

  TOKEN_SPACING_BIND_01({ nodes, registry, matchers, rulesMap }) {
    const validSpacing = validSpacingSet(registry, matchers);
    const groups = new Map<number, ScannedNode[]>();

    for (const node of nodes) {
      const dim = node.dimensions;
      if (!dim) continue;
      const sp = node.boundVariables?.spacingVariableIds;
      const pairs: [string, number | undefined][] = [
        ['itemSpacing', dim.gap], ['paddingTop', dim.paddingTop], ['paddingRight', dim.paddingRight],
        ['paddingBottom', dim.paddingBottom], ['paddingLeft', dim.paddingLeft],
      ];
      const addedForNode = new Set<number>();
      for (const [bindKey, val] of pairs) {
        if (!val || val <= 0) continue;
        if (sp?.[bindKey as keyof typeof sp]) continue;      // already bound → skip
        if (!validSpacing.has(val)) continue;                // wrong value → handled by TOKEN_SPACING_01
        if (addedForNode.has(val)) continue;
        addedForNode.add(val);
        if (!groups.has(val)) groups.set(val, []);
        groups.get(val)!.push(node);
      }
    }

    return Array.from(groups.entries()).map(([val, groupNodes]) => {
      let varId = spacingVariableId(val, registry);
      let varName = spacingVariableName(val, registry);
      let targetValue = val;
      if (!varId && registry) {
        const closest = findClosestSpacingVariableInRegistry(val, registry);
        if (closest) {
          varId = closest.id;
          varName = closest.name;
          targetValue = closest.value;
        }
      }
      const canBind = !!varId;
      const needApplyAndBind = canBind && targetValue !== val;
      return makeGroupedFinding(rulesMap, 'TOKEN_SPACING_BIND_01', String(val), groupNodes, {
        confidence: 0.9,
        evidence: [`Espaçamento: ${val}px`, varName ? `Variável DS: ${varName} (${targetValue}px)` : 'Valor DS correto, sem variável no documento'],
        whyItMatters: 'Spacing hard-coded impede propagação de mudanças no DS',
        recommendation: varName ? `Associar à variável ${varName}` : `Vincular à spacing variable DS`,
        quickFix: canBind
          ? needApplyAndBind
            ? { possible: true, action: 'applyAllMatchingSpacings', params: { oldValue: val, newValue: targetValue, variableId: varId } }
            : { possible: true, action: 'bindSpacingVariable', params: { value: val, variableId: varId } }
          : NO_FIX,
        manualSteps: [
          `Selecionar os ${groupNodes.length} node(s) com espaçamento ${val}px`,
          varName ? `Vincular à variável ${varName}` : 'Vincular à spacing variable DS',
        ],
      });
    });
  },

  TOKEN_RADIUS_BIND_01({ nodes, registry, matchers, rulesMap }) {
    const validRadius = validRadiusSet(registry, matchers);
    const groups = new Map<number, ScannedNode[]>();

    for (const node of nodes) {
      if (hasRadiusBound(node)) continue;                        // already bound → skip
      const cr = node.dimensions?.cornerRadius;
      if (cr === undefined || cr <= 0) continue;
      if (!validRadius.has(cr)) continue;                        // wrong value → handled by TOKEN_RADIUS_01
      if (!groups.has(cr)) groups.set(cr, []);
      groups.get(cr)!.push(node);
    }

    return Array.from(groups.entries()).map(([cr, groupNodes]) => {
      let varId = radiusVariableId(cr, registry);
      let varName = radiusVariableName(cr, registry);
      let targetValue = cr;
      if (!varId && registry) {
        const closest = findClosestRadiusVariableInRegistry(cr, registry);
        if (closest) {
          varId = closest.id;
          varName = closest.name;
          targetValue = closest.value;
        }
      }
      const canBind = !!varId;
      const needApplyAndBind = canBind && targetValue !== cr;
      return makeGroupedFinding(rulesMap, 'TOKEN_RADIUS_BIND_01', String(cr), groupNodes, {
        confidence: 0.9,
        evidence: [`Corner radius: ${cr}px`, varName ? `Variável DS: ${varName} (${targetValue}px)` : 'Valor DS correto, sem variável no documento'],
        whyItMatters: 'Radius hard-coded impede propagação de mudanças no DS',
        recommendation: varName ? `Associar à variável ${varName}` : `Vincular à radius variable DS`,
        quickFix: canBind
          ? needApplyAndBind
            ? { possible: true, action: 'applyRadius', params: { value: targetValue, variableId: varId } }
            : { possible: true, action: 'bindRadiusVariable', params: { variableId: varId } }
          : NO_FIX,
        manualSteps: [
          `Selecionar os ${groupNodes.length} node(s) com radius ${cr}px`,
          varName ? `Vincular à variável ${varName}` : 'Vincular à radius variable DS',
        ],
      });
    });
  },

  TOKEN_OPACITY_01({ nodes, matchers, rulesMap }) {
    const groups = new Map<number, ScannedNode[]>();
    for (const node of nodes) {
      if (node.opacity === undefined) continue;
      if (matchers.isTokenOpacity(node.opacity)) continue;
      const op = node.opacity;
      if (!groups.has(op)) groups.set(op, []);
      groups.get(op)!.push(node);
    }
    return Array.from(groups.entries()).map(([op, groupNodes]) => {
      const closest = matchers.closestOpacity(op);
      const pctCurrent = Math.round(op * 100);
      const pctClosest = Math.round(closest * 100);
      return makeGroupedFinding(rulesMap, 'TOKEN_OPACITY_01', String(op), groupNodes, {
        confidence: 0.7,
        evidence: [`Opacidade: ${pctCurrent}%`, `Valor DS mais próximo: ${pctClosest}%`],
        whyItMatters: 'Opacidade fora da escala do DS quebra consistência visual',
        recommendation: `Corrigir opacidade para ${pctClosest}%`,
        manualSteps: [`Selecionar os ${groupNodes.length} node(s) com opacidade ${pctCurrent}%`, `Ajustar para ${pctClosest}%`],
      });
    });
  },

  TOKEN_TYPO_BIND_01({ nodes, registry, matchers, rulesMap }) {
    if (!registry || registry.textStyles.size === 0) return [];

    const groups = new Map<string, ScannedNode[]>();

    const validFamilies = validFontFamilySet(registry, matchers);
    const validSizes = validFontSizeSet(registry, matchers);

    for (const node of nodes) {
      if (!node.typography) continue;
      if (hasTextStyleInRegistry(node, registry)) continue;
      const { fontFamily, fontSize } = node.typography;
      const familyLower = fontFamily.toLowerCase();
      if (![...validFamilies].some(f => familyLower.includes(f) || f.includes(familyLower))) continue;
      if (!validSizes.has(fontSize)) continue;
      const key = `${fontFamily}:${fontSize}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(node);
    }

    return Array.from(groups.entries()).map(([key, groupNodes]) => {
      const [fontFamily, fontSizeStr] = key.split(':');
      const fontSize = Number(fontSizeStr);
      // Use most common fontWeight in the group as the matching hint
      const fontWeight = groupNodes[0]?.typography?.fontWeight ?? 400;
      const styleId = findMatchingTextStyleId(fontFamily, fontSize, fontWeight, registry!);
      return makeGroupedFinding(rulesMap, 'TOKEN_TYPO_BIND_01', key, groupNodes, {
        confidence: 0.9,
        evidence: [`Dasa Sans ${fontSize}px`, 'Fonte e tamanho corretos, mas sem text style vinculado'],
        whyItMatters: 'Text styles garantem consistência global e facilitam atualização em massa',
        recommendation: `Aplicar text style DS para Dasa Sans ${fontSize}px`,
        quickFix: styleId
          ? { possible: true, action: 'applyTextStyle', params: { styleId } }
          : NO_FIX,
        manualSteps: [
          `Selecionar os ${groupNodes.length} texto(s) com Dasa Sans ${fontSize}px`,
          'No painel de texto, aplicar o text style DS (ex: Web/Body/md, Web/Heading/lg)',
        ],
      });
    });
  },
};

export function evaluateRules(
  scannedNodes: ScannedNode[],
  registry: VariableRegistry | undefined,
  matchers: KBMatchers,
  kbData: KBData,
): Finding[] {
  const nodeById = new Map(scannedNodes.map(n => [n.nodeId, n]));
  const rulesMap = new Map(kbData.rules.map(r => [r.ruleId, r as Rule]));
  const registryView = registry ? toVariableRegistryView(registry) : undefined;
  const ctx: RuleContext = {
    nodes: scannedNodes,
    registry,
    registryView,
    nodeById,
    matchers,
    kbData,
    rulesMap,
  };
  const findings: Finding[] = [];

  for (const rule of kbData.rules) {
    const handler = ruleHandlers[rule.ruleId];
    if (handler) findings.push(...handler(ctx));
  }

  return findings;
}

// --- helpers ---

function findBackgroundColor(node: ScannedNode, nodeById: Map<string, ScannedNode>): string {
  if (node.layer.parentId) {
    const parent = nodeById.get(node.layer.parentId);
    if (parent) {
      const bg = parent.colors.find(c => c.type === 'fill');
      if (bg) return bg.hex;
    }
  }
  return '#FFFFFF';
}

interface FindingOptions {
  confidence: number;
  evidence: string[];
  whyItMatters: string;
  recommendation: string;
  quickFix?: Finding['quickFix'];
  manualSteps: string[];
}

// Single-node finding (for rules where each node has a unique fix, e.g. COMP_NAMING_01)
function makeFinding(rulesMap: Map<string, Rule>, ruleId: string, node: ScannedNode, opts: FindingOptions): Finding {
  const rule = rulesMap.get(ruleId);
  return {
    id: `${ruleId}-${node.nodeId}`,
    ruleId,
    checklistItemId: rule?.checklistItemId ?? null,
    severity: rule?.severity ?? 'NEEDS_HUMAN',
    confidence: opts.confidence,
    nodes: [node.nodeId],
    evidence: [`Node: ${node.name}`, ...opts.evidence],
    whyItMatters: opts.whyItMatters,
    recommendation: opts.recommendation,
    quickFix: opts.quickFix ?? NO_FIX,
    manualSteps: opts.manualSteps,
  };
}

// Grouped finding: multiple nodes share the same problem value and the same fix
function makeGroupedFinding(rulesMap: Map<string, Rule>, ruleId: string, groupKey: string, groupNodes: ScannedNode[], opts: FindingOptions): Finding {
  const rule = rulesMap.get(ruleId);
  const count = groupNodes.length;
  const safeKey = groupKey.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40);
  const nodeNames = groupNodes.slice(0, 3).map(n => n.name).join(', ');
  const nodeLabel = count === 1
    ? groupNodes[0].name
    : `${count} componentes: ${nodeNames}${count > 3 ? ` +${count - 3}` : ''}`;

  return {
    id: `${ruleId}-${safeKey}`,
    ruleId,
    checklistItemId: rule?.checklistItemId ?? null,
    severity: rule?.severity ?? 'NEEDS_HUMAN',
    confidence: opts.confidence,
    nodes: groupNodes.map(n => n.nodeId),
    evidence: [`Node: ${nodeLabel}`, ...opts.evidence],
    whyItMatters: opts.whyItMatters,
    recommendation: opts.recommendation,
    quickFix: opts.quickFix ?? NO_FIX,
    manualSteps: opts.manualSteps,
  };
}

function truncate(s: string, max = 30): string {
  return s.length > max ? s.substring(0, max) + '...' : s;
}
