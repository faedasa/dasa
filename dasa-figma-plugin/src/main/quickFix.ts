import { QuickFixAction, Finding } from '../shared/types';
import { hexToRgb } from './contrastUtils';

export interface QuickFixResult {
  success: boolean;
  nodeId: string;
  action: string;
  error?: string;
}

export async function applyQuickFix(fix: QuickFixAction): Promise<QuickFixResult[]> {
  const results: QuickFixResult[] = [];

  for (const nodeId of fix.nodes) {
    try {
      const node = figma.getNodeById(nodeId) as SceneNode | null;
      if (!node) {
        results.push({ success: false, nodeId, action: fix.action, error: 'Node não encontrado' });
        continue;
      }

      switch (fix.action) {
        case 'resizeNode':
          resizeNode(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'editText':
          await editText(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'renameLayer':
          renameLayer(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applyColor':
          await applyColor(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'bindSpacingVariable':
          await bindSpacingVariable(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'bindRadiusVariable':
          await bindRadiusVariable(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applyTextStyle':
          await applyTextStyle(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applySpacing':
          applySpacing(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applyAllMatchingSpacings':
          await applyAllMatchingSpacings(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applyRadius':
          await applyRadius(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        case 'applyFontSize':
          await applyFontSize(node, fix.params);
          results.push({ success: true, nodeId, action: fix.action });
          break;

        default:
          results.push({ success: false, nodeId, action: fix.action, error: `Ação não suportada: ${fix.action}` });
      }
    } catch (error) {
      results.push({
        success: false, nodeId, action: fix.action,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  return results;
}

function resizeNode(node: SceneNode, params: Record<string, unknown>): void {
  if (!('resize' in node)) throw new Error('Node não suporta resize');
  const minW = typeof params.minWidth === 'number' ? params.minWidth : node.width;
  const minH = typeof params.minHeight === 'number' ? params.minHeight : node.height;
  const newW = Math.max(node.width, minW);
  const newH = Math.max(node.height, minH);
  if (newW !== node.width || newH !== node.height) {
    node.resize(newW, newH);
  }
}

async function editText(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  if (node.type !== 'TEXT') throw new Error('Node não é um texto');
  const newText = typeof params.newText === 'string' ? params.newText : null;
  if (!newText) throw new Error('Texto não fornecido');

  const textNode = node as TextNode;

  // Handle mixed fonts: load all segments
  if (textNode.fontName === figma.mixed) {
    // Load fonts for each character range
    const len = textNode.characters.length;
    const fontsToLoad = new Set<string>();
    for (let i = 0; i < len; i++) {
      const fn = textNode.getRangeFontName(i, i + 1) as FontName;
      fontsToLoad.add(`${fn.family}::${fn.style}`);
    }
    for (const key of fontsToLoad) {
      const [family, style] = key.split('::');
      await figma.loadFontAsync({ family, style });
    }
  } else {
    await figma.loadFontAsync(textNode.fontName);
  }

  textNode.characters = newText;
}

function renameLayer(node: SceneNode, params: Record<string, unknown>): void {
  const newName = typeof params.newName === 'string' ? params.newName : null;
  if (!newName) throw new Error('Nome não fornecido');
  node.name = newName;
}

async function applyColor(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  const colorType = typeof params.colorType === 'string' ? params.colorType : 'fill';
  const variableId = typeof params.variableId === 'string' ? params.variableId : null;
  const newColorHex = typeof params.newColor === 'string' ? params.newColor : null;
  const opacity = typeof params.opacity === 'number' ? params.opacity : 1;

  // Prefer variable binding — creates a live link to the DS token
  if (variableId) {
    const variable = await figma.variables.getVariableByIdAsync(variableId);
    if (variable) {
      const basePaint: SolidPaint = { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity };
      const boundPaint = figma.variables.setBoundVariableForPaint(basePaint, 'color', variable);
      if (colorType === 'fill') {
        if (!('fills' in node)) throw new Error('Node não suporta fills');
        (node as GeometryMixin).fills = [boundPaint];
      } else if (colorType === 'stroke') {
        if (!('strokes' in node)) throw new Error('Node não suporta strokes');
        (node as GeometryMixin).strokes = [boundPaint];
        if ('strokeWeight' in node && (node as GeometryMixin).strokeWeight === 0) {
          (node as GeometryMixin).strokeWeight = 1;
        }
      }
      return;
    }
  }

  // Fallback: apply raw hex when no variable found in the file
  if (!newColorHex) throw new Error('Cor não fornecida');
  const hexMatch = newColorHex.match(/#[0-9A-Fa-f]{3,8}/i);
  const hex = hexMatch ? hexMatch[0] : newColorHex;
  const rgb255 = hexToRgb(hex);
  if (!rgb255) throw new Error(`Cor inválida: ${hex}`);
  const figmaColor: RGB = { r: rgb255.r / 255, g: rgb255.g / 255, b: rgb255.b / 255 };

  if (colorType === 'fill') {
    if (!('fills' in node)) throw new Error('Node não suporta fills');
    (node as GeometryMixin).fills = [{ type: 'SOLID', color: figmaColor, opacity }];
  } else if (colorType === 'stroke') {
    if (!('strokes' in node)) throw new Error('Node não suporta strokes');
    (node as GeometryMixin).strokes = [{ type: 'SOLID', color: figmaColor, opacity }];
    if ('strokeWeight' in node && (node as GeometryMixin).strokeWeight === 0) {
      (node as GeometryMixin).strokeWeight = 1;
    }
  } else {
    throw new Error(`Tipo de cor não suportado: ${colorType}`);
  }
}

async function bindSpacingVariable(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  const variableId = typeof params.variableId === 'string' ? params.variableId : null;
  const targetValue = typeof params.value === 'number' ? params.value : null;
  if (!variableId) throw new Error('variableId não fornecido');

  const variable = await figma.variables.getVariableByIdAsync(variableId);
  if (!variable) throw new Error('Variável não encontrada no arquivo');

  const n = node as FrameNode;
  const spacingProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing'] as const;

  for (const prop of spacingProps) {
    const currentVal = (n as unknown as Record<string, unknown>)[prop];
    if (typeof currentVal !== 'number') continue;
    if (targetValue !== null && currentVal !== targetValue) continue;
    if (currentVal <= 0) continue;
    try {
      n.setBoundVariable(prop, variable);
    } catch {
      // Property not supported on this node type — skip silently
    }
  }
}

async function bindRadiusVariable(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  const variableId = typeof params.variableId === 'string' ? params.variableId : null;
  if (!variableId) throw new Error('variableId não fornecido');

  const variable = await figma.variables.getVariableByIdAsync(variableId);
  if (!variable) throw new Error('Variável não encontrada no arquivo');

  const radiusProps = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'] as const;
  for (const prop of radiusProps) {
    try {
      (node as unknown as Record<string, unknown>);
      (node as FrameNode).setBoundVariable(prop, variable);
    } catch {
      // Property not supported on this node type — skip silently
    }
  }
}

async function applyTextStyle(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  if (node.type !== 'TEXT') throw new Error('Node não é texto');
  const styleId = typeof params.styleId === 'string' ? params.styleId : null;
  if (!styleId) throw new Error('styleId não fornecido');

  const textNode = node as TextNode;

  // Load fonts before applying style to avoid Figma sandbox errors
  if (textNode.fontName === figma.mixed) {
    const len = textNode.characters.length;
    const fontsToLoad = new Set<string>();
    for (let i = 0; i < len; i++) {
      const fn = textNode.getRangeFontName(i, i + 1) as FontName;
      fontsToLoad.add(`${fn.family}::${fn.style}`);
    }
    for (const key of fontsToLoad) {
      const [family, style] = key.split('::');
      await figma.loadFontAsync({ family, style });
    }
  } else {
    await figma.loadFontAsync(textNode.fontName);
  }

  textNode.textStyleId = styleId;
}

async function applyAllMatchingSpacings(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  const oldValue = typeof params.oldValue === 'number' ? params.oldValue : null;
  const newValue = typeof params.newValue === 'number' ? params.newValue : null;
  const variableId = typeof params.variableId === 'string' ? params.variableId : null;
  if (oldValue === null || newValue === null) throw new Error('Parâmetros de espaçamento inválidos');

  const n = node as FrameNode;
  const variable = variableId ? await figma.variables.getVariableByIdAsync(variableId) : null;
  const spacingProps = ['itemSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const;

  const nRecord = n as unknown as Record<string, unknown>;
  for (const prop of spacingProps) {
    if (nRecord[prop] !== oldValue) continue;
    nRecord[prop] = newValue;
    if (variable) {
      try { n.setBoundVariable(prop, variable); } catch { /* not supported on this node */ }
    }
  }
}

function applySpacing(node: SceneNode, params: Record<string, unknown>): void {
  const property = typeof params.property === 'string' ? params.property : null;
  const value = typeof params.value === 'number' ? params.value : null;
  if (!property || value === null) throw new Error('Parâmetros de espaçamento inválidos');

  const n = node as FrameNode;
  switch (property) {
    case 'itemSpacing': n.itemSpacing = value; break;
    case 'paddingTop': n.paddingTop = value; break;
    case 'paddingRight': n.paddingRight = value; break;
    case 'paddingBottom': n.paddingBottom = value; break;
    case 'paddingLeft': n.paddingLeft = value; break;
    default: throw new Error(`Propriedade de espaçamento não suportada: ${property}`);
  }
}

async function applyRadius(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  const value = typeof params.value === 'number' ? params.value : null;
  const variableId = typeof params.variableId === 'string' ? params.variableId : null;
  if (value === null) throw new Error('Valor de cornerRadius não fornecido');
  if (!('cornerRadius' in node)) throw new Error('Node não suporta cornerRadius');
  (node as RectangleNode).cornerRadius = value;

  if (variableId) {
    const variable = await figma.variables.getVariableByIdAsync(variableId);
    if (variable) {
      const radiusProps = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'] as const;
      for (const prop of radiusProps) {
        try { (node as FrameNode).setBoundVariable(prop, variable); } catch { /* skip */ }
      }
    }
  }
}

async function applyFontSize(node: SceneNode, params: Record<string, unknown>): Promise<void> {
  if (node.type !== 'TEXT') throw new Error('Node não é texto');
  const value = typeof params.value === 'number' ? params.value : null;
  const styleId = typeof params.styleId === 'string' ? params.styleId : null;
  if (value === null) throw new Error('Valor de fontSize não fornecido');

  const textNode = node as TextNode;
  if (textNode.fontName === figma.mixed) {
    const len = textNode.characters.length;
    const fontsToLoad = new Set<string>();
    for (let i = 0; i < len; i++) {
      const fn = textNode.getRangeFontName(i, i + 1) as FontName;
      fontsToLoad.add(`${fn.family}::${fn.style}`);
    }
    for (const key of fontsToLoad) {
      const [family, style] = key.split('::');
      await figma.loadFontAsync({ family, style });
    }
  } else {
    await figma.loadFontAsync(textNode.fontName);
  }

  textNode.fontSize = value;

  if (styleId) {
    try { textNode.textStyleId = styleId; } catch { /* style not available */ }
  }
}

export async function applyCopyFix(nodeId: string, newText: string): Promise<void> {
  const node = figma.getNodeById(nodeId) as SceneNode | null;
  if (!node) throw new Error('Node não encontrado');
  
  await editText(node, { newText });
}

export function generateQuickFixPlan(findings: Finding[]): QuickFixAction[] {
  const severityOrder: Record<string, number> = { BLOCKER: 0, HIGH: 1, MED: 2, LOW: 3, NEEDS_HUMAN: 4 };

  // Only fixable findings, sorted by severity
  const fixable = findings
    .filter(f => f.quickFix.possible && f.quickFix.action)
    .sort((a, b) => {
      const aOrder = severityOrder[a.severity] !== undefined && severityOrder[a.severity] !== null ? severityOrder[a.severity] : 4;
      const bOrder = severityOrder[b.severity] !== undefined && severityOrder[b.severity] !== null ? severityOrder[b.severity] : 4;
      return aOrder - bOrder;
    });

  return fixable.map((f, i) => ({
    priority: i + 1,
    action: f.quickFix.action!,
    nodes: f.nodes,
    params: f.quickFix.params,
    expectedImpact: f.severity === 'BLOCKER' || f.severity === 'HIGH' ? 'high' as const : 'medium' as const,
    risk: 'low' as const,
  }));
}
