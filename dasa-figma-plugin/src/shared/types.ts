import { Severity, Category } from './constants';

export interface ColorData {
  hex: string;
  opacity?: number;
  nodeId: string;
  type: 'fill' | 'stroke' | 'effect' | 'gradient';
  variableId?: string | null;
}

export interface TypographyData {
  nodeId: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight?: number;
  letterSpacing?: number;
  textStyleId?: string;
}

export interface DimensionData {
  nodeId: string;
  width: number;
  height: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  gap?: number;
  cornerRadius?: number;
  strokeWeight?: number;
}

export interface ComponentData {
  nodeId: string;
  isInstance: boolean;
  componentKey?: string;
  componentName?: string;
  mainComponentName?: string;
}

export interface TextData {
  nodeId: string;
  content: string;
  charCount: number;
}

export interface LayoutData {
  nodeId: string;
  autoLayoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
}

export interface LayerData {
  nodeId: string;
  name: string;
  type: string;
  parentId?: string;
}

export interface EffectData {
  nodeId: string;
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  radius: number;
  offsetX: number;
  offsetY: number;
  color: string;
  opacity: number;
  variableId?: string | null;
}

export interface BoundVariablesData {
  fillVariableIds: (string | null)[];
  strokeVariableIds: (string | null)[];
  textStyleId?: string;
  effectVariableIds?: (string | null)[];
  cornerRadiusVariableIds?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  spacingVariableIds?: Partial<
    Record<'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft' | 'itemSpacing', string>
  >;
}

export interface ScannedNode {
  nodeId: string;
  type: string;
  name: string;
  colors: ColorData[];
  typography?: TypographyData;
  dimensions?: DimensionData;
  component?: ComponentData;
  text?: TextData;
  layout?: LayoutData;
  layer: LayerData;
  children: string[];
  boundVariables?: BoundVariablesData;
  effects?: EffectData[];
  /** Node-level opacity (0-1). Set when node has opacity !== 1. */
  opacity?: number;
  /** Plain-text description (e.g. for accessibility/alt text). */
  description?: string;
  /** True when node has at least one fill of type IMAGE. */
  hasImageFill?: boolean;
  /** Present when node was detached from a component. */
  detachedFrom?: { type: 'local'; componentId: string } | { type: 'library'; componentKey: string };
}

export interface Rule {
  ruleId: string;
  category: Category;
  checklistItemId?: string;
  severity: Severity;
  title: string;
  description: string;
  check: string;
  fix: string;
  weight?: number;
}

export interface Finding {
  id: string;
  ruleId: string;
  checklistItemId: string | null;
  severity: Severity;
  confidence: number;
  nodes: string[];
  evidence: string[];
  whyItMatters: string;
  recommendation: string;
  quickFix: {
    possible: boolean;
    action: string | null;
    params: Record<string, unknown>;
  };
  manualSteps: string[];
}

export interface QuickFixAction {
  priority: number;
  action: string;
  nodes: string[];
  params: Record<string, unknown>;
  expectedImpact: 'high' | 'medium' | 'low';
  risk: 'low' | 'medium' | 'high';
}

export interface CopySuggestion {
  nodeId: string;
  original: string;
  suggestions: string[];
  rationale: string;
  ruleId: string | null;
}

export interface CategoryScore {
  category: Category;
  score: number;
  weight: number;
}

export interface ComponentSuggestion {
  frameNodeId: string;
  frameName: string;
  matchType: 'detached' | 'structural' | 'name';
  score: number;
  componentId?: string;
  componentKey?: string;
  componentName: string;
  reason: string;
}

export interface AuditResult {
  meta: {
    agent: string;
    version: string;
    scope: 'selection' | 'frame' | 'page';
    timestamp: string;
    kbVersion: string;
    notes: string[];
  };
  score: {
    overall: number;
    byCategory: CategoryScore[];
  };
  findings: Finding[];
  quickFixPlan: QuickFixAction[];
  copySuggestions: CopySuggestion[];
  componentSuggestions: ComponentSuggestion[];
  handoffHints: string[];
}
