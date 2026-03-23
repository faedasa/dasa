/**
 * Schema for remote KB JSON. All data is JSON-serializable.
 * Used by loader (fetch + cache) and matchers (logic parametrized by this data).
 */

export interface KBTypographyTextStyle {
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
}

export interface KBTokens {
  colors: Record<string, string>;
  typography: {
    fontFamily: string;
    fontWeights: number[];
    fontSizes: number[];
    textStyles: Record<string, KBTypographyTextStyle>;
  };
  spacing: number[];
  radius: number[];
  lineHeights: number[];
  borderWidths: number[];
  opacities: number[];
  shadowBlurs: number[];
}

export interface KBCopyGlossaryItem {
  term: string;
  use: string;
  avoid: string[];
  context?: string;
}

export interface KBForbiddenTerm {
  pattern: string;
  replacement: string;
  wordBoundary: boolean;
}

export interface KBCopy {
  glossary: KBCopyGlossaryItem[];
  forbiddenTerms: KBForbiddenTerm[];
  ctaRules: {
    length: { min: number; max: number };
    noPeriod: boolean;
    examples: string[];
    forbidden: string[];
  };
  capitalization: { properNouns: string[] };
}

export interface KBRule {
  ruleId: string;
  category: string;
  checklistItemId?: string;
  severity: string;
  title: string;
  description: string;
  check: string;
  fix: string;
}

export interface KBChecklistItem {
  id: string;
  category: string;
  description: string;
  weight: number;
}

export interface KBUxPatterns {
  mobileBreakpoint: number;
  touchTargetMin: number;
}

export interface KBData {
  version: string;
  schemaVersion: number;
  tokens: KBTokens;
  copy: KBCopy;
  rules: KBRule[];
  checklist: KBChecklistItem[];
  uxPatterns: KBUxPatterns;
}
