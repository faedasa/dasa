/**
 * Testes da lógica do KB (matchers) e do schema.
 * Roda em Node; não depende da API do Figma.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import type { KBData } from '../kb/types';
import { createMatchers } from '../kb/matchers';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '../..');
const kbPath = join(root, 'kb.json');

function loadKB(): KBData {
  const raw = readFileSync(kbPath, 'utf8');
  return JSON.parse(raw) as KBData;
}

describe('KB schema and matchers', () => {
  const kb = loadKB();
  const m = createMatchers(kb);

  it('carrega kb.json com estrutura válida', () => {
    expect(kb.version).toBe('1.0.0');
    expect(kb.schemaVersion).toBe(1);
    expect(Object.keys(kb.tokens.colors).length).toBeGreaterThan(50);
    expect(kb.tokens.typography.fontFamily).toBe('Dasa Sans');
    expect(kb.copy.glossary.length).toBeGreaterThan(0);
    expect(kb.rules.length).toBeGreaterThan(20);
    expect(kb.checklist.length).toBeGreaterThan(0);
    expect(kb.uxPatterns.touchTargetMin).toBe(44);
  });

  it('isTokenColor reconhece tokens do DS', () => {
    expect(m.isTokenColor('#0037FF')).toBe(true);
    expect(m.isTokenColor('#1A2437')).toBe(true);
    expect(m.isTokenColor('#FFFFFF')).toBe(true);
  });

  it('isTokenColor rejeita cores fora do DS', () => {
    expect(m.isTokenColor('#000000')).toBe(false);
    expect(m.isTokenColor('#123456')).toBe(false);
  });

  it('findClosestToken retorna token exato quando existe', () => {
    const r = m.findClosestToken('#0037FF');
    expect(r).not.toBeNull();
    expect(r!.distance).toBe(0);
    expect(r!.value).toBe('#0037FF');
  });

  it('findClosestToken retorna sugestão próxima para cor inexistente', () => {
    const r = m.findClosestToken('#0022CC');
    expect(r).not.toBeNull();
    expect(r!.token).toBeDefined();
    expect(r!.value).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('closestFontSize retorna valor da escala', () => {
    expect(m.closestFontSize(14)).toBe(14);
    expect([12, 14]).toContain(m.closestFontSize(13));
    expect([16, 20]).toContain(m.closestFontSize(18));
  });

  it('closestFromSet (spacing) retorna valor da escala', () => {
    expect(m.closestFromSet(m.SPACING_VALUES, 16)).toBe(16);
    expect(m.closestFromSet(m.SPACING_VALUES, 10)).toBe(8);
  });

  it('validateCTA aceita CTA correto', () => {
    const r = m.validateCTA('Agendar exame');
    expect(r.valid).toBe(true);
    expect(r.issues).toHaveLength(0);
  });

  it('validateCTA rejeita CTA genérico proibido', () => {
    const r = m.validateCTA('Continuar');
    expect(r.valid).toBe(false);
    expect(r.issues.some(i => i.includes('genérico'))).toBe(true);
  });

  it('validateCTA rejeita CTA com ponto final', () => {
    const r = m.validateCTA('Agendar exame.');
    expect(r.valid).toBe(false);
    expect(r.issues.some(i => i.includes('ponto'))).toBe(true);
  });

  it('findTermViolations detecta termo evitado do glossário', () => {
    const r = m.findTermViolations('o usuário pode acessar');
    expect(r.length).toBeGreaterThan(0);
    expect(r.some(v => v.suggestion === 'paciente')).toBe(true);
  });

  it('findForbiddenTerms detecta e sugere substituição', () => {
    const r = m.findForbiddenTerms('Ver mais');
    expect(r.length).toBeGreaterThan(0);
    expect(r.some(f => f.replacement === 'Mostrar detalhes')).toBe(true);
  });

  it('CAPITALIZATION_RULES tem properNouns esperados', () => {
    expect(m.CAPITALIZATION_RULES.properNouns).toContain('Dasa');
    expect(m.CAPITALIZATION_RULES.properNouns).toContain('Delboni');
  });

  it('BORDER_WIDTH_VALUES e OPACITY_VALUES são sets corretos', () => {
    expect(m.BORDER_WIDTH_VALUES.has(1)).toBe(true);
    expect(m.BORDER_WIDTH_VALUES.has(8)).toBe(true);
    expect(m.OPACITY_VALUES.has(1)).toBe(true);
  });

  it('isTokenShadowBlur e closestShadowBlur', () => {
    expect(m.isTokenShadowBlur(8)).toBe(true);
    expect(m.isTokenShadowBlur(24)).toBe(true);
    expect(m.closestShadowBlur(20)).toBe(24);
  });

  it('isTokenLineHeight e closestLineHeight', () => {
    expect(m.isTokenLineHeight(1.25)).toBe(true);
    expect(m.isTokenLineHeight(1.5)).toBe(true);
    const closest = m.closestLineHeight(1.22);
    expect([1.2, 1.25]).toContain(closest);
  });
});
