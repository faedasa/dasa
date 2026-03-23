import { ComponentSuggestion } from '../shared/types';

interface ComponentFingerprint {
  id: string;
  key: string;
  name: string;
  childCount: number;
  childTypesSorted: string;
  hasAutoLayout: boolean;
  layoutMode: string;
  aspectRatio: number;
}

type DetachedInfoNode = SceneNode & {
  detachedInfo?: { type: 'local'; componentId: string } | { type: 'library'; componentKey: string };
};

export function matchComponents(selection: readonly SceneNode[]): ComponentSuggestion[] {
  const frameCandidates = collectFrameCandidates(selection);
  if (frameCandidates.length === 0) return [];

  const localComponents = (
    figma.root.findAllWithCriteria({ types: ['COMPONENT'] }) as ComponentNode[]
  ).filter(c => c.parent?.type !== 'COMPONENT_SET' || c.parent.parent != null);

  const suggestions: ComponentSuggestion[] = [];

  for (const node of frameCandidates) {
    const suggestion = matchNode(node, localComponents);
    if (suggestion) suggestions.push(suggestion);
  }

  return suggestions;
}

function collectFrameCandidates(nodes: readonly SceneNode[]): SceneNode[] {
  const candidates: SceneNode[] = [];
  for (const node of nodes) {
    if (node.type === 'FRAME' || node.type === 'GROUP') {
      candidates.push(node);
    }
  }
  return candidates;
}

function matchNode(node: SceneNode, localComponents: ComponentNode[]): ComponentSuggestion | null {
  // Layer 1: detachedInfo — highest confidence
  const detachedSuggestion = checkDetached(node, localComponents);
  if (detachedSuggestion) return detachedSuggestion;

  // Layer 2: structural fingerprint
  const structuralSuggestion = checkStructural(node, localComponents);
  if (structuralSuggestion) return structuralSuggestion;

  // Layer 3: name similarity fallback
  return checkName(node, localComponents);
}

function checkDetached(node: SceneNode, localComponents: ComponentNode[]): ComponentSuggestion | null {
  const casted = node as DetachedInfoNode;
  if (!casted.detachedInfo) return null;

  const info = casted.detachedInfo;

  if (info.type === 'local') {
    const comp = localComponents.find(c => c.id === info.componentId);
    const compName = comp?.name ?? 'Componente local';
    return {
      frameNodeId: node.id,
      frameName: node.name,
      matchType: 'detached',
      score: 100,
      componentId: info.componentId,
      componentName: compName,
      reason: `Frame foi desvinculado deste componente — pode ser re-associado`,
    };
  }

  if (info.type === 'library') {
    return {
      frameNodeId: node.id,
      frameName: node.name,
      matchType: 'detached',
      score: 95,
      componentKey: info.componentKey,
      componentName: 'Componente de biblioteca',
      reason: `Frame foi desvinculado de um componente de biblioteca (key: ${info.componentKey.slice(0, 8)}…)`,
    };
  }

  return null;
}

function checkStructural(node: SceneNode, localComponents: ComponentNode[]): ComponentSuggestion | null {
  if (localComponents.length === 0) return null;

  const frameFp = buildFingerprint(node);

  let bestScore = 0;
  let bestComp: ComponentNode | null = null;
  let bestFp: ComponentFingerprint | null = null;

  for (const comp of localComponents) {
    const compFp = buildFingerprint(comp as unknown as SceneNode);
    const score = calculateSimilarity(frameFp, compFp);
    if (score > bestScore) {
      bestScore = score;
      bestComp = comp;
      bestFp = compFp;
    }
  }

  if (!bestComp || !bestFp || bestScore < 50) return null;

  return {
    frameNodeId: node.id,
    frameName: node.name,
    matchType: 'structural',
    score: Math.round(bestScore),
    componentId: bestComp.id,
    componentKey: bestComp.key,
    componentName: bestComp.name,
    reason: buildStructuralReason(frameFp, bestFp, bestScore),
  };
}

function checkName(node: SceneNode, localComponents: ComponentNode[]): ComponentSuggestion | null {
  if (localComponents.length === 0) return null;

  const frameName = node.name.toLowerCase().replace(/[\s_-]+/g, '');
  let bestScore = 0;
  let bestComp: ComponentNode | null = null;

  for (const comp of localComponents) {
    const compName = comp.name.toLowerCase().replace(/[\s_-]+/g, '');
    const score = nameScore(frameName, compName);
    if (score > bestScore) {
      bestScore = score;
      bestComp = comp;
    }
  }

  if (!bestComp || bestScore < 60) return null;

  return {
    frameNodeId: node.id,
    frameName: node.name,
    matchType: 'name',
    score: Math.round(bestScore),
    componentId: bestComp.id,
    componentKey: bestComp.key,
    componentName: bestComp.name,
    reason: `Nome similar ao componente "${bestComp.name}"`,
  };
}

// --- Fingerprinting ---

function buildFingerprint(node: SceneNode): ComponentFingerprint {
  const children = 'children' in node ? (node as FrameNode).children : [];
  const childTypes = [...children].map(c => c.type).sort();
  const layoutMode = 'layoutMode' in node ? (node as FrameNode).layoutMode : 'NONE';
  const hasAutoLayout = layoutMode !== 'NONE';
  const w = 'width' in node ? (node as FrameNode).width : 1;
  const h = 'height' in node ? (node as FrameNode).height : 1;
  const key = 'key' in node ? (node as ComponentNode).key : '';

  return {
    id: node.id,
    key,
    name: node.name,
    childCount: children.length,
    childTypesSorted: childTypes.join(','),
    hasAutoLayout,
    layoutMode,
    aspectRatio: h > 0 ? Math.round((w / h) * 100) / 100 : 0,
  };
}

// --- Scoring ---

function calculateSimilarity(a: ComponentFingerprint, b: ComponentFingerprint): number {
  let score = 0;

  // Child count similarity — 30 pts
  if (a.childCount === b.childCount) {
    score += 30;
  } else {
    const diff = Math.abs(a.childCount - b.childCount);
    score += Math.max(0, 30 - diff * 6);
  }

  // Child types Jaccard similarity — 30 pts
  if (a.childTypesSorted || b.childTypesSorted) {
    const aTypes = a.childTypesSorted ? a.childTypesSorted.split(',') : [];
    const bTypes = b.childTypesSorted ? b.childTypesSorted.split(',') : [];
    const aSet = new Set(aTypes);
    const bSet = new Set(bTypes);
    const intersection = [...aSet].filter(t => bSet.has(t)).length;
    const union = new Set([...aSet, ...bSet]).size;
    if (union > 0) score += Math.round((intersection / union) * 30);
    else if (aTypes.length === 0 && bTypes.length === 0) score += 30;
  }

  // Layout mode match — 20 pts
  if (a.layoutMode === b.layoutMode) score += 20;

  // Aspect ratio similarity — 20 pts
  if (a.aspectRatio > 0 && b.aspectRatio > 0) {
    const ratioDiff = Math.abs(a.aspectRatio - b.aspectRatio) / Math.max(a.aspectRatio, b.aspectRatio);
    score += Math.round((1 - Math.min(1, ratioDiff * 2)) * 20);
  } else if (a.aspectRatio === 0 && b.aspectRatio === 0) {
    score += 20;
  }

  return score;
}

function buildStructuralReason(frame: ComponentFingerprint, comp: ComponentFingerprint, score: number): string {
  const parts: string[] = [];

  if (frame.childCount === comp.childCount) {
    parts.push(`${frame.childCount} filhos idênticos`);
  }
  if (frame.layoutMode === comp.layoutMode && frame.layoutMode !== 'NONE') {
    parts.push(`Auto Layout ${frame.layoutMode}`);
  }
  if (frame.childTypesSorted === comp.childTypesSorted && frame.childTypesSorted) {
    parts.push('tipos de layer iguais');
  }

  const detail = parts.length > 0 ? ` — ${parts.join(', ')}` : '';
  return `${score}% de similaridade estrutural${detail}`;
}

function nameScore(a: string, b: string): number {
  if (a === b) return 100;
  if (a.includes(b) || b.includes(a)) {
    const shorter = Math.min(a.length, b.length);
    const longer = Math.max(a.length, b.length);
    return Math.round((shorter / longer) * 90);
  }
  // Levenshtein-based — simplified for short strings
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 100;
  const dist = levenshtein(a, b);
  return Math.round(Math.max(0, (1 - dist / maxLen)) * 80);
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
