import { ScannedNode, CopySuggestion } from '../shared/types';
import type { KBMatchers } from '../kb/matchers';

export function checkCopy(scannedNodes: ScannedNode[], matchers: KBMatchers): CopySuggestion[] {
  const suggestions: CopySuggestion[] = [];

  for (const node of scannedNodes) {
    if (!node.text || node.text.charCount === 0) continue;
    const text = node.text.content;

    const termViolations = matchers.findTermViolations(text);
    for (const v of termViolations) {
      const fixed = text.replace(new RegExp(`\\b${escapeRegex(v.term)}\\b`, 'gi'), v.suggestion);
      suggestions.push({
        nodeId: node.nodeId, original: text,
        suggestions: [fixed],
        rationale: v.rule.context || `Usar "${v.suggestion}" em vez de "${v.term}"`,
        ruleId: 'COPY_TERM_01',
      });
    }

    const forbidden = matchers.findForbiddenTerms(text);
    for (const f of forbidden) {
      // Skip if already caught by glossary
      if (termViolations.some(v => v.term.toLowerCase() === f.pattern.toLowerCase())) continue;

      const fixed = f.replacement
        ? text.replace(f.pattern, f.replacement)
        : text.replace(new RegExp(`^${escapeRegex(f.pattern)}\\s*`, 'i'), '').trim();
      suggestions.push({
        nodeId: node.nodeId, original: text,
        suggestions: [fixed],
        rationale: `Termo proibido "${f.pattern}" → "${f.replacement || '(remover)'}"`,
        ruleId: 'COPY_TERM_03',
      });
    }

    if (node.text.charCount < 50 && isLikelyCTA(node)) {
      const ctaCheck = matchers.validateCTA(text);
      if (!ctaCheck.valid) {
        suggestions.push({
          nodeId: node.nodeId, original: text,
          suggestions: generateCTASuggestions(text),
          rationale: `CTA fora do padrão: ${ctaCheck.issues.join(', ')}`,
          ruleId: 'COPY_CTA_01',
        });
      }
    }

    if (isLikelyTitle(node)) {
      const issues = checkCapitalization(text, matchers);
      if (issues.length > 0) {
        suggestions.push({
          nodeId: node.nodeId, original: text,
          suggestions: [fixCapitalization(text, matchers)],
          rationale: `Capitalização: ${issues.join(', ')}`,
          ruleId: 'COPY_TERM_02',
        });
      }
    }

    // 5) "Erro:" prefix
    if (/^erro:/i.test(text.trim())) {
      suggestions.push({
        nodeId: node.nodeId, original: text,
        suggestions: [text.replace(/^Erro:\s*/i, '').trim()],
        rationale: 'Remover prefixo "Erro:" — usar mensagem acionável e empática',
        ruleId: 'COPY_ERROR_01',
      });
    }
  }

  return suggestions;
}

function isLikelyCTA(node: ScannedNode): boolean {
  if (!node.text || node.text.charCount > 30) return false;
  const n = node.name.toLowerCase();
  // Check parent context from layer name — text nodes inside buttons
  return (
    n.includes('button') || n.includes('cta') || n.includes('btn') ||
    (node.layer.parentId !== undefined && node.component?.isInstance === true)
  );
}

function isLikelyTitle(node: ScannedNode): boolean {
  if (!node.typography) return false;
  return node.typography.fontSize >= 20 || node.typography.fontWeight >= 700;
}

function checkCapitalization(text: string, matchers: KBMatchers): string[] {
  const issues: string[] = [];
  const words = text.split(/\s+/);

  for (let i = 1; i < words.length; i++) {
    const w = words[i];
    if (w.length === 0) continue;
    if (w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase()) {
      if (!isProperNoun(w, matchers)) {
        issues.push(`"${w}" não deveria estar capitalizada`);
      }
    }
  }
  return issues;
}

function isProperNoun(word: string, matchers: KBMatchers): boolean {
  return matchers.CAPITALIZATION_RULES.properNouns.some(n => word.includes(n));
}

function fixCapitalization(text: string, matchers: KBMatchers): string {
  const words = text.split(/\s+/);
  return [words[0], ...words.slice(1).map(w =>
    isProperNoun(w, matchers) ? w : w.charAt(0).toLowerCase() + w.slice(1),
  )].join(' ');
}

function generateCTASuggestions(text: string): string[] {
  const clean = text.replace(/\.$/, '').trim();
  const suggestions = [clean];
  const words = clean.split(/\s+/);
  if (words.length > 3) suggestions.push(words.slice(0, 3).join(' '));
  return suggestions.slice(0, 3);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
