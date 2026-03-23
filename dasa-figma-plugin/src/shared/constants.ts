export const SEVERITY = {
  BLOCKER: 'BLOCKER',
  HIGH: 'HIGH',
  MED: 'MED',
  LOW: 'LOW',
  NEEDS_HUMAN: 'NEEDS_HUMAN',
} as const;

export type Severity = typeof SEVERITY[keyof typeof SEVERITY];

export const CATEGORY = {
  TOKENS: 'tokens',
  COPY: 'copy',
  UX: 'ux',
  A11Y: 'a11y',
  COMPONENTS: 'components',
} as const;

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

export const CATEGORY_WEIGHTS: Record<Category, number> = {
  tokens: 0.25,
  copy: 0.20,
  ux: 0.20,
  a11y: 0.20,
  components: 0.15,
};

export const SEVERITY_SCORES: Record<Severity, number> = {
  BLOCKER: 0,
  HIGH: 25,
  MED: 50,
  LOW: 75,
  NEEDS_HUMAN: 50,
};

export const TOUCH_TARGET_MIN = 44;
export const CONTRAST_RATIO_NORMAL = 4.5;
export const CONTRAST_RATIO_LARGE = 3.0;
