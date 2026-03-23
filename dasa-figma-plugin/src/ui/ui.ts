/**
 * Dasa Design Quality Checklist - UI Layer
 * 
 * Desenvolvido por Cosme Faé para Dasa
 * Email: c_fae.ext@dasa.com.br
 */

interface ComponentSuggestion {
  frameNodeId: string;
  frameName: string;
  matchType: 'detached' | 'structural' | 'name';
  score: number;
  componentId?: string;
  componentKey?: string;
  componentName: string;
  reason: string;
}

interface AuditResult {
  meta: { agent: string; version: string; scope: string; timestamp: string; kbVersion: string; notes: string[] };
  score: { overall: number; byCategory: Array<{ category: string; score: number; weight: number }> };
  findings: Finding[];
  quickFixPlan: Array<{ priority: number; action: string; nodes: string[]; params: Record<string, unknown>; expectedImpact: string; risk: string }>;
  copySuggestions: Array<{ nodeId: string; original: string; suggestions: string[]; rationale: string; ruleId: string | null }>;
  componentSuggestions: ComponentSuggestion[];
  handoffHints: string[];
}
interface Finding {
  id: string; ruleId: string; checklistItemId: string | null; severity: string;
  confidence: number; nodes: string[]; evidence: string[];
  whyItMatters: string; recommendation: string;
  quickFix: { possible: boolean; action: string | null; params: Record<string, unknown> };
  manualSteps: string[];
}

// --- State ---
let currentResult: AuditResult | null = null;
let activeFilter: string | null = null;
let currentFinding: Finding | null = null;
let currentMatchSuggestion: ComponentSuggestion | null = null;

// --- DOM refs ---
const $ = (id: string) => document.getElementById(id)!;
const auditBtn = $('audit-btn') as HTMLButtonElement;
const progressContainer = $('progress-container');
const progressMsg = $('progress-msg');
const progressFill = $('progress-fill');
const emptyState = $('empty-state');
const resultsContainer = $('results-container');
const scoreOverall = $('score-overall');
const gaugeFill = $('gauge-fill');
const scoreSubtitle = $('score-subtitle');
const filtersEl = $('filters');
const findingsList = $('findings-list');
const copyList = $('copy-list');
const tokenMatchList = $('token-match-list');
const tabTokenBtn = $('tab-token-btn');
const matchList = $('match-list');
const tabMatchBtn = $('tab-match-btn');
const handoffList = $('handoff-list');
const popupOverlay = $('popup-overlay');
const popupTitle = $('popup-title');
const popupDescription = $('popup-description');
const popupClose = $('popup-close');
const popupReport = $('popup-report');
const popupResolve = $('popup-resolve');
const currentVisual = $('current-visual');
const futureVisual = $('future-visual');
const popupRenameSection = $('popup-rename-section');
const popupRenameInput = $('popup-rename-input') as HTMLInputElement;

// --- Messaging ---

let reqCounter = 0;
function nextId() { return `req-${++reqCounter}-${Date.now()}`; }

type Resolver = { resolve: (v: unknown) => void; reject: (e: Error) => void };
const pending = new Map<string, Resolver>();

function sendMessage(type: string, payload?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const requestId = nextId();
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error('Timeout')); }, 60000);
    pending.set(requestId, {
      resolve: (v: unknown) => { clearTimeout(timer); resolve(v); },
      reject: (e: Error) => { clearTimeout(timer); reject(e); },
    });
    parent.postMessage({ pluginMessage: { type, requestId, payload } }, '*');
  });
}

window.addEventListener('message', (event: MessageEvent) => {
  const msg = event.data && event.data.pluginMessage;
  if (!msg || !msg.type || !msg.requestId) return;
  const { type, requestId, payload } = msg;

  if (type === 'PROGRESS') {
    const p = payload && payload.progress;
    if (p) {
      progressMsg.textContent = p.message;
      progressFill.style.width = `${Math.round((p.current / p.total) * 100)}%`;
    }
    return;
  }

  const entry = pending.get(requestId);
  if (!entry) return;
  pending.delete(requestId);
  if (type === 'ERROR') {
    entry.reject(new Error((payload && payload.error) || 'Erro desconhecido'));
  } else {
    entry.resolve(payload);
  }
});

// --- Helpers ---
function esc(s: string): string {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

// --- Rule titles (pt-BR, copy-friendly) ---
const RULE_TITLES: Record<string, string> = {
  // Valores incorretos
  TOKEN_COLOR_01: 'Cor fora do Design System',
  TOKEN_TYPO_01: 'Fonte incorreta',
  TOKEN_TYPO_02: 'Tamanho de fonte incorreto',
  TOKEN_FONT_WEIGHT_01: 'Peso de fonte incorreto',
  TOKEN_LINE_HEIGHT_01: 'Entrelinha fora do padrão',
  TOKEN_RADIUS_01: 'Arredondamento incorreto',
  TOKEN_BORDER_WIDTH_01: 'Espessura de borda incorreta',
  TOKEN_OPACITY_01: 'Opacidade fora do padrão',
  TOKEN_SHADOW_01: 'Sombra fora do padrão',
  TOKEN_SPACING_01: 'Espaçamento incorreto',
  // Vínculo ausente
  TOKEN_COLOR_BIND_01: 'Cor sem variável vinculada',
  TOKEN_SPACING_BIND_01: 'Espaçamento sem variável vinculada',
  TOKEN_RADIUS_BIND_01: 'Arredondamento sem variável vinculada',
  TOKEN_TYPO_BIND_01: 'Tipografia sem text style',
  TOKEN_SHADOW_BIND_01: 'Sombra sem variável vinculada',
  // Copy
  COPY_TERM_01: 'Termo incorreto',
  COPY_TERM_02: 'Capitalização incorreta',
  COPY_TERM_03: 'Termo proibido',
  COPY_CTA_01: 'CTA fora do padrão',
  COPY_ERROR_01: 'Mensagem de erro com prefixo',
  // A11y
  A11Y_TOUCH_01: 'Área de toque pequena',
  A11Y_CONTRAST_01: 'Contraste insuficiente',
  A11Y_IMG_ALT_01: 'Imagem sem texto alternativo',
  // Components / UX
  COMP_NAMING_01: 'Layer com nome genérico',
  UX_AUTOLAYOUT_01: 'Frame sem Auto Layout',
};

// --- Events ---

auditBtn.addEventListener('click', async () => {
  auditBtn.disabled = true;
  progressContainer.style.display = 'block';
  resultsContainer.style.display = 'none';
  emptyState.style.display = 'none';

  try {
    const res = await sendMessage('AUDIT_SELECTION') as { result: AuditResult };
    currentResult = res.result;
    renderResults(currentResult);
  } catch (e) {
    alert(e instanceof Error ? e.message : 'Erro');
    progressContainer.style.display = 'none';
    emptyState.style.display = 'block';
  } finally {
    auditBtn.disabled = false;
  }
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const name = tab.getAttribute('data-tab')!;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    $(`tab-${name}`).classList.add('active');
  });
});

// Clique no card do finding abre o popup (lista usa delegação; currentResult é a fonte)
findingsList.addEventListener('click', (e) => {
  const card = (e.target as HTMLElement).closest('.finding');
  if (!card) return;
  const findingId = card.getAttribute('data-finding-id');
  const finding = currentResult?.findings.find(f => f.id === findingId);
  if (finding) showResolvePopup(finding);
});

// --- Gauge ---

// The SVG arc length for our semicircle (85 radius, 180°)
const GAUGE_ARC_LENGTH = 267; // π * 85 ≈ 267

function updateGauge(score: number) {
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const offset = GAUGE_ARC_LENGTH * (1 - pct);
  gaugeFill.setAttribute('stroke-dashoffset', String(offset));

  // Color based on score
  let color = '#D83145'; // bad (red)
  if (score >= 80) color = '#32A454'; // good (green)
  else if (score >= 50) color = '#EB7005'; // ok (orange)
  gaugeFill.setAttribute('stroke', color);
}

// --- Render ---

function renderResults(r: AuditResult) {
  progressContainer.style.display = 'none';
  resultsContainer.style.display = 'block';
  emptyState.style.display = 'none';

  // Score
  const s = r.score.overall;
  scoreOverall.textContent = String(s);

  // Gauge animation
  updateGauge(s);

  // Ocultar Acessibilidade; exibir só problemas que o plugin consegue resolver (quickFix.possible)
  const findingsForDisplay = r.findings.filter(
    f => !f.ruleId.startsWith('A11Y_') && f.quickFix.possible
  );

  // Subtitle
  const issueCount = findingsForDisplay.length;
  const componentCount = new Set(findingsForDisplay.flatMap(f => f.nodes)).size;

  if (issueCount === 0) {
    scoreSubtitle.textContent = 'Nenhum problema encontrado.';
  } else {
    scoreSubtitle.textContent = `${issueCount} problema${issueCount !== 1 ? 's' : ''} encontrado${issueCount !== 1 ? 's' : ''} em ${componentCount} componente${componentCount !== 1 ? 's' : ''}`;
  }

  // Filters
  activeFilter = null;
  const sevs = ['BLOCKER', 'HIGH', 'MED', 'LOW'];
  const sevLabels: Record<string, string> = {
    'BLOCKER': 'Crítico',
    'HIGH': 'Alto',
    'MED': 'Médio',
    'LOW': 'Baixo'
  };
  filtersEl.innerHTML = '';
  addChip('Todos', null);
  for (const sev of sevs) {
    const count = findingsForDisplay.filter(f => f.severity === sev).length;
    if (count > 0) addChip(`${sevLabels[sev]} (${count})`, sev);
  }

  renderFindings(findingsForDisplay);
  renderCopy(r.copySuggestions);

  const bindFindings = r.findings.filter(f => f.ruleId.endsWith('_BIND_01') && f.quickFix.possible);
  renderTokenMatch(bindFindings);
  tabTokenBtn.textContent = bindFindings.length > 0 ? `Tokens (${bindFindings.length})` : 'Tokens';

  renderMatch(r.componentSuggestions ?? []);
  renderHandoff(r.handoffHints);

  const matchCount = (r.componentSuggestions ?? []).length;
  tabMatchBtn.textContent = matchCount > 0 ? `DS Match (${matchCount})` : 'DS Match';
}

function addChip(label: string, value: string | null) {
  const el = document.createElement('span');
  el.className = `chip ${activeFilter === value ? 'active' : ''}`;
  el.textContent = label;
  el.addEventListener('click', () => {
    activeFilter = value;
    filtersEl.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    if (currentResult) {
      const list = currentResult.findings.filter(
        f => !f.ruleId.startsWith('A11Y_') && f.quickFix.possible
      );
      renderFindings(list);
    }
  });
  filtersEl.appendChild(el);
}

// --- Thumbnails visuais ---

function buildThumb(f: Finding): string {
  const ruleId = f.ruleId;

  // TOKEN_COLOR: mostra swatch da cor problemática
  if (ruleId === 'TOKEN_COLOR_01') {
    const colorEvidence = f.evidence.find(e => /^(Node:|Cor )/.test(e) === false) || f.evidence.find(e => e.includes('#'));
    let hex = '#CCC';
    if (colorEvidence) {
      const m = colorEvidence.match(/#[0-9A-Fa-f]{3,8}/);
      if (m) hex = m[0];
    }
    return `<div class="finding-thumb-color">
      <div class="swatch-main" style="background:${esc(hex)}"></div>
      <span class="swatch-overlay">${esc(hex)}</span>
    </div>`;
  }

  // TOKEN_*_BIND: valor real atual (cor = swatch, spacing/radius = valor em px)
  if (ruleId.endsWith('_BIND_01')) {
    const valueEvidence = f.evidence.find(e => /^\s*Cor |Espaçamento:|Corner radius:|Dasa/.test(e));
    let valueStr = '';
    const hexMatch = valueEvidence?.match(/#[0-9A-Fa-f]{3,8}/);
    const pxMatch = valueEvidence?.match(/(\d+)px/);
    if (ruleId === 'TOKEN_COLOR_BIND_01' && hexMatch) {
      const hex = hexMatch[0];
      return `<div class="finding-thumb-color"><div class="swatch-main" style="background:${esc(hex)}"></div><span class="swatch-overlay">${esc(hex)}</span></div>`;
    }
    if ((ruleId === 'TOKEN_SPACING_BIND_01' || ruleId === 'TOKEN_RADIUS_BIND_01') && pxMatch) {
      valueStr = pxMatch[1] + 'px';
    } else if (ruleId === 'TOKEN_TYPO_BIND_01') {
      valueStr = 'Aa';
    }
    return `<div class="finding-thumb-typo" style="font-size:11px;font-weight:700;font-family:monospace;">${esc(valueStr || '—')}</div>`;
  }

  // TOKEN_TYPO / font weight / line height: valor real (px, weight ou %)
  if (ruleId.startsWith('TOKEN_TYPO') || ruleId === 'TOKEN_FONT_WEIGHT_01' || ruleId === 'TOKEN_LINE_HEIGHT_01') {
    const ev = f.evidence.find(e => e.startsWith('Font size:') || e.startsWith('Font weight:') || e.startsWith('Line height:'));
    let val = 'Aa';
    if (ev) {
      const px = ev.match(/(\d+)px/)?.[1];
      const num = ev.match(/(\d+)(?:\s|%|$)/)?.[1];
      if (ruleId === 'TOKEN_TYPO_02' && px) val = px + 'px';
      else if (ruleId === 'TOKEN_FONT_WEIGHT_01' && num) val = num;
      else if (ruleId === 'TOKEN_LINE_HEIGHT_01' && num) val = num + (ev.includes('%') ? '%' : '');
    }
    return `<div class="finding-thumb-typo" style="font-size:10px;font-weight:700;">${esc(val)}</div>`;
  }

  // TOKEN_OPACITY: quadrado semi-transparente
  if (ruleId === 'TOKEN_OPACITY_01') {
    return `<div class="finding-thumb-typo" style="background: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%); background-size: 8px 8px; background-position: 0 0, 4px 4px;"><span style="opacity:0.5;font-size:16px;">◼</span></div>`;
  }

  // TOKEN_BORDER_WIDTH: borda com espessura incorreta
  if (ruleId === 'TOKEN_BORDER_WIDTH_01') {
    return `<div class="finding-thumb-typo" style="border:3px dashed var(--warning);">—</div>`;
  }

  // TOKEN_RADIUS: valor atual em px
  if (ruleId === 'TOKEN_RADIUS_01') {
    const ev = f.evidence.find(e => e.startsWith('Corner radius:'));
    const px = ev?.match(/(\d+)px/)?.[1] ?? '?';
    return `<div class="finding-thumb-typo" style="border-radius:6px;border:2px solid var(--border);font-size:10px;font-weight:700;">${esc(px)}px</div>`;
  }

  // TOKEN_SPACING: valor atual em px + barras
  if (ruleId === 'TOKEN_SPACING_01') {
    const ev = f.evidence.find(e => e.startsWith('Espaçamento:'));
    const px = ev?.match(/(\d+)px/)?.[1] ?? '?';
    const w = Math.min(36, parseInt(px) || 20);
    return `<div class="finding-thumb-a11y">
      <div class="bar" style="width:16px"></div>
      <div class="bar" style="width:${w}px;background:var(--warning)"></div>
      <div class="bar" style="width:16px"></div>
      <span style="font-size:8px;font-weight:700;">${esc(px)}px</span>
    </div>`;
  }

  // A11Y_TOUCH: target pequeno
  if (ruleId === 'A11Y_TOUCH_01') {
    return `<div class="finding-thumb-ux">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke-dasharray="3 2"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </div>`;
  }

  // A11Y_CONTRAST: cores reais do finding (texto + fundo)
  if (ruleId === 'A11Y_CONTRAST_01') {
    const textEv = f.evidence.find(e => e.startsWith('Texto:'));
    const bgEv = f.evidence.find(e => e.startsWith('Fundo:'));
    const textHex = textEv?.match(/#[0-9A-Fa-f]{3,8}/)?.[0] ?? '#333';
    const bgHex = bgEv?.match(/#[0-9A-Fa-f]{3,8}/)?.[0] ?? '#999';
    return `<div class="finding-thumb-a11y" style="gap:2px;">
      <div class="bar" style="width:100%;height:12px;background:${esc(textHex)};border-radius:2px;"></div>
      <div class="bar" style="width:100%;height:12px;background:${esc(bgHex)};border-radius:2px;"></div>
    </div>`;
  }

  // A11Y_IMG_ALT: ícone de imagem sem alt
  if (ruleId === 'A11Y_IMG_ALT_01') {
    return `<div class="finding-thumb-ux">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8" cy="8" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    </div>`;
  }

  // COMP_NAMING: nome genérico real (frame, rectangle, etc.)
  if (ruleId === 'COMP_NAMING_01') {
    const genericEvidence = f.evidence.find(e => e.includes('genérico'));
    const currentName = genericEvidence?.match(/genérico "([^"]+)"/)?.[1] ?? 'frame';
    return `<div class="finding-thumb-comp" style="flex-direction:column;gap:3px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="16" height="16">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 3v18"/>
      </svg>
      <span style="font-size:7px;font-weight:700;color:var(--error);font-family:monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:44px;">${esc(currentName)}</span>
    </div>`;
  }

  // UX_AUTOLAYOUT: ícone layout
  if (ruleId === 'UX_AUTOLAYOUT_01') {
    return `<div class="finding-thumb-ux">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    </div>`;
  }

  // COPY rules: ícone texto
  if (ruleId.startsWith('COPY_')) {
    return `<div class="finding-thumb-typo" style="font-size:16px;">T</div>`;
  }

  // Fallback
  return `<div class="finding-thumb-comp">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  </div>`;
}

function getCategoryName(ruleId: string): string {
  if (ruleId.startsWith('TOKEN_')) return 'Tokens';
  if (ruleId.startsWith('COPY_')) return 'Texto';
  if (ruleId.startsWith('A11Y_')) return 'Acessibilidade';
  if (ruleId.startsWith('COMP_')) return 'Componentes';
  if (ruleId.startsWith('UX_')) return 'UX';
  return 'Outro';
}

function getPointsLost(severity: string): string {
  switch(severity) {
    case 'BLOCKER': return '-10 pontos';
    case 'HIGH': return '-7 pontos';
    case 'MED': return '-4 pontos';
    case 'LOW': return '-2 pontos';
    default: return '-0 pontos';
  }
}

// --- Category grouping ---
const CATEGORY_ORDER = ['Acessibilidade', 'Tokens', 'Texto', 'Componentes', 'UX', 'Outro'];

function getTokenSubGroup(ruleId: string): string {
  if (ruleId.endsWith('_BIND_01')) return 'Sem vínculo ao DS';
  return 'Valores incorretos';
}

// --- Render Findings ---

function renderFindings(findings: Finding[]) {
  const list = activeFilter ? findings.filter(f => f.severity === activeFilter) : findings;

  if (list.length === 0) {
    findingsList.innerHTML = findings.length === 0
      ? '<div class="empty">Nenhum problema encontrado.</div>'
      : '<div class="empty">Nenhum problema com este filtro.</div>';
    return;
  }

  const groups = new Map<string, Finding[]>();
  for (const f of list) {
    const cat = getCategoryName(f.ruleId);
    if (cat === 'Tokens') {
      const sub = getTokenSubGroup(f.ruleId);
      const key = `Tokens — ${sub}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(f);
    } else {
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat)!.push(f);
    }
  }

  const orderedKeys: string[] = [];
  for (const cat of CATEGORY_ORDER) {
    for (const key of groups.keys()) {
      if (key === cat || key.startsWith(cat + ' —')) {
        if (!orderedKeys.includes(key)) orderedKeys.push(key);
      }
    }
  }

  let html = '';
  for (const groupKey of orderedKeys) {
    const catFindings = groups.get(groupKey)!;
    html += `<div class="findings-group-header">${esc(groupKey)} <span class="findings-group-count">${catFindings.length}</span></div>`;

    for (const f of catFindings) {
      let componentName = 'Desconhecido';
      const nodeEvidence = f.evidence.find(e => e.startsWith('Node:'));
      if (nodeEvidence) componentName = nodeEvidence.replace('Node:', '').trim();

      const isMulti = f.nodes.length > 1;
      const sevClass = f.severity === 'MED' ? 'med' : f.severity === 'LOW' ? 'low' : '';
      const bulkBadge = isMulti
        ? `<span class="bulk-badge">${f.nodes.length}×</span>`
        : '';
      const hasFix = f.quickFix.possible;
      const resolveLabel = hasFix
        ? (isMulti ? `Corrigir ${f.nodes.length}` : 'Corrigir')
        : 'Sem correção automática';

      html += `
        <div class="finding" data-finding-id="${esc(f.id)}">
          <div class="finding-thumb">
            ${buildThumb(f)}
          </div>
          <div class="finding-body">
            <div class="finding-rule">${esc(RULE_TITLES[f.ruleId] || f.ruleId)} ${bulkBadge}</div>
            <div class="finding-category">${esc(componentName)}</div>
          </div>
          <span class="finding-points ${sevClass}">${getPointsLost(f.severity)}</span>
          ${hasFix
            ? `<button type="button" class="btn-resolve${isMulti ? ' bulk' : ''}" data-fix="${esc(f.id)}">${resolveLabel}</button>`
            : `<span class="finding-no-fix">${resolveLabel}</span>`
          }
        </div>
      `;
    }
  }

  findingsList.innerHTML = html;
}

// --- Render Copy ---

function renderCopy(suggestions: AuditResult['copySuggestions']) {
  if (suggestions.length === 0) {
    copyList.innerHTML = '<div class="empty">Nenhum problema de copy encontrado.</div>';
    return;
  }
  
  const uniqueNodes = new Set(suggestions.map(s => s.nodeId)).size;
  copyList.innerHTML = suggestions.map((s, idx) => `
    <div class="copy-card">
      <div class="copy-original">"${esc(s.original)}"</div>
      ${s.suggestions.map(sg => `<div class="copy-sug">${esc(sg)}</div>`).join('')}
      <div class="copy-rationale">${esc(s.rationale)}</div>
      <button class="btn-resolve" data-copy-fix="${esc(s.nodeId)}" data-suggestion="${esc(s.suggestions[0] || '')}">Resolver</button>
    </div>
  `).join('');

  // Event listeners para botões resolver de copy
  copyList.querySelectorAll('[data-copy-fix]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const b = btn as HTMLButtonElement;
      const nodeId = b.dataset.copyFix;
      const suggestion = b.dataset.suggestion;
      
      if (!nodeId || !suggestion) return;
      
      b.disabled = true;
      b.textContent = 'Aplicando...';
      
      try {
        await sendMessage('APPLY_COPY_FIX', { nodeId, newText: suggestion });
        const res = await sendMessage('AUDIT_SELECTION') as { result: AuditResult };
        currentResult = res.result;
        renderResults(currentResult);
      } catch (e) {
        alert(e instanceof Error ? e.message : 'Erro ao aplicar correção');
      } finally {
        b.disabled = false;
        b.textContent = 'Resolver';
      }
    });
  });
}

// --- Token Match helpers ---

const TOKEN_GROUP_LABELS: Record<string, string> = {
  TOKEN_COLOR_BIND_01: 'Cor',
  TOKEN_SPACING_BIND_01: 'Espaçamento',
  TOKEN_RADIUS_BIND_01: 'Raio',
  TOKEN_TYPO_BIND_01: 'Tipografia',
  TOKEN_SHADOW_BIND_01: 'Sombra',
};

function parseTokenCard(f: Finding): { current: string; variable: string; thumb: string } {
  const e0 = f.evidence[0] ?? '';
  const e1 = f.evidence[1] ?? '';

  // Current value
  let current = '';
  const hexMatch = e0.match(/#[0-9A-Fa-f]{3,8}/);
  const pxMatch = e0.match(/(\d+(?:\.\d+)?)px/);
  const typoMatch = e0.match(/(\d+)px/);
  if (hexMatch) current = hexMatch[0];
  else if (pxMatch) current = pxMatch[0];
  else current = e0.replace(/^[^:]+:\s*/, '').trim().slice(0, 20);

  // Variable name (strip value in parens)
  let variable = '';
  if (e1.startsWith('Variável DS:')) {
    variable = e1.replace('Variável DS:', '').replace(/\s*\(.*\)$/, '').trim();
  } else if (e1.includes('text style')) {
    variable = 'text style DS';
  }

  // Visual thumb
  let thumb = '';
  if (hexMatch) {
    thumb = `<div style="width:100%;height:100%;background:${esc(hexMatch[0])};"></div>`;
  } else if (f.ruleId === 'TOKEN_TYPO_BIND_01') {
    const size = typoMatch ? typoMatch[1] : '?';
    thumb = `<span style="font-size:${Math.min(16, Math.max(9, Number(size) * 0.5))}px;">Aa</span>`;
  } else if (f.ruleId === 'TOKEN_SPACING_BIND_01') {
    const px = pxMatch ? parseInt(pxMatch[1]) : 8;
    const w = Math.min(38, Math.max(8, px));
    thumb = `<div style="display:flex;align-items:center;gap:2px;">
      <div style="width:6px;height:3px;background:var(--border);border-radius:1px;"></div>
      <div style="width:${w}px;height:3px;background:var(--brand);border-radius:1px;"></div>
      <div style="width:6px;height:3px;background:var(--border);border-radius:1px;"></div>
    </div>`;
  } else if (f.ruleId === 'TOKEN_RADIUS_BIND_01') {
    const px = pxMatch ? pxMatch[0] : '?';
    thumb = `<span style="font-size:9px;font-weight:700;">${esc(px)}</span>`;
  } else {
    thumb = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>`;
  }

  return { current, variable, thumb };
}

// --- Render Token Match ---

function renderTokenMatch(findings: Finding[]) {
  if (findings.length === 0) {
    tokenMatchList.innerHTML = `
      <div class="token-match-empty">
        <div class="token-match-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <div class="token-match-empty-title">Tudo vinculado ao DS!</div>
        <p>Todos os tokens desta seleção já estão associados a variáveis do Design System.</p>
      </div>`;
    return;
  }

  // Group by rule
  const groups = new Map<string, Finding[]>();
  const ruleOrder = ['TOKEN_COLOR_BIND_01', 'TOKEN_SPACING_BIND_01', 'TOKEN_RADIUS_BIND_01', 'TOKEN_TYPO_BIND_01', 'TOKEN_SHADOW_BIND_01'];
  for (const rule of ruleOrder) groups.set(rule, []);
  for (const f of findings) {
    if (!groups.has(f.ruleId)) groups.set(f.ruleId, []);
    groups.get(f.ruleId)!.push(f);
  }

  let html = `
    <div class="token-match-header">
      <div>
        <div class="token-match-title">${findings.length} token${findings.length !== 1 ? 's' : ''} sem vínculo ao DS</div>
        <div class="token-match-subtitle">Clique em Vincular para associar cada valor à variável correta</div>
      </div>
      <button class="btn-vincular-todos" id="btn-vincular-todos">Vincular todos</button>
    </div>`;

  for (const [ruleId, ruleFindings] of groups) {
    if (ruleFindings.length === 0) continue;
    const groupLabel = TOKEN_GROUP_LABELS[ruleId] ?? ruleId;
    html += `<div class="token-group-label">${esc(groupLabel)} <span class="token-group-count">${ruleFindings.length}</span></div>`;

    for (const f of ruleFindings) {
      const { current, variable, thumb } = parseTokenCard(f);
      const nodeCount = f.nodes.length;
      const nodeLabel = nodeCount === 1 ? '1 layer' : `${nodeCount} layers`;

      html += `
        <div class="token-card" id="token-card-${esc(f.id)}" data-finding-id="${esc(f.id)}">
          <div class="token-card-thumb">${thumb}</div>
          <div class="token-card-body">
            <div class="token-card-row">
              <span class="token-card-current">${esc(current)}</span>
              ${variable ? `<span class="token-card-arrow">→</span><span class="token-card-variable" title="${esc(variable)}">${esc(variable)}</span>` : ''}
            </div>
            <div class="token-card-nodes">${esc(nodeLabel)}</div>
          </div>
          <button class="btn-vincular" data-finding-id="${esc(f.id)}">Vincular</button>
        </div>`;
    }
  }

  tokenMatchList.innerHTML = html;

  // Per-card "Vincular" buttons
  tokenMatchList.querySelectorAll('.btn-vincular').forEach(btn => {
    btn.addEventListener('click', async () => {
      const b = btn as HTMLButtonElement;
      const findingId = b.dataset.findingId!;
      b.disabled = true;
      b.textContent = '…';

      try {
        await sendMessage('APPLY_QUICK_FIX', { fixId: findingId });
        const card = document.getElementById(`token-card-${findingId}`);
        if (card) {
          card.classList.add('done');
          b.style.display = 'none';
          const body = card.querySelector('.token-card-body');
          if (body) {
            const done = document.createElement('div');
            done.className = 'token-card-done-label';
            done.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg> Vinculado`;
            body.appendChild(done);
          }
        }
        // Update badge
        const remaining = tokenMatchList.querySelectorAll('.token-card:not(.done)').length;
        tabTokenBtn.textContent = remaining > 0 ? `Tokens (${remaining})` : 'Tokens';
      } catch {
        b.disabled = false;
        b.textContent = 'Vincular';
      }
    });
  });

  // "Vincular todos" button
  const btnAll = document.getElementById('btn-vincular-todos') as HTMLButtonElement | null;
  if (btnAll) {
    btnAll.addEventListener('click', async () => {
      btnAll.disabled = true;
      btnAll.textContent = 'Aplicando…';

      for (const f of findings) {
        try {
          await sendMessage('APPLY_QUICK_FIX', { fixId: f.id });
          const card = document.getElementById(`token-card-${f.id}`);
          if (card) card.classList.add('done');
        } catch { /* keep going */ }
      }

      // Re-audit to refresh all tabs
      try {
        const res = await sendMessage('AUDIT_SELECTION') as { result: AuditResult };
        currentResult = res.result;
        renderResults(currentResult);
        // Jump back to token tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelector('[data-tab="token"]')?.classList.add('active');
        $('tab-token').classList.add('active');
      } catch {
        btnAll.disabled = false;
        btnAll.textContent = 'Vincular todos';
      }
    });
  }
}

// --- Render DS Match ---

function renderMatch(suggestions: ComponentSuggestion[]) {
  if (suggestions.length === 0) {
    matchList.innerHTML = `
      <div class="match-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <rect x="3" y="3" width="8" height="8" rx="1.5"/>
          <rect x="13" y="3" width="8" height="8" rx="1.5"/>
          <rect x="3" y="13" width="8" height="8" rx="1.5"/>
          <rect x="13" y="13" width="8" height="8" rx="1.5"/>
        </svg>
        <div class="match-empty-title">Nenhum componente sugerido</div>
        <p>Os frames selecionados não têm correspondência com componentes locais do arquivo.</p>
      </div>`;
    return;
  }

  matchList.innerHTML = suggestions.map((s, idx) => {
    const isDetached = s.matchType === 'detached';
    const badgeClass = s.matchType;
    const badgeLabel = s.matchType === 'detached' ? 'Desvinculado'
      : s.matchType === 'structural' ? 'Estrutural'
      : 'Nome';
    const scoreClass = s.score >= 80 ? 'high' : s.score >= 50 ? 'med' : '';

    return `
      <div class="match-card${isDetached ? ' is-detached' : ''}" data-match-idx="${idx}" style="cursor:pointer;">
        <div class="match-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <rect x="3" y="3" width="8" height="8" rx="1.5"/>
            <rect x="13" y="3" width="8" height="8" rx="1.5"/>
            <rect x="3" y="13" width="8" height="8" rx="1.5"/>
            <rect x="13" y="13" width="8" height="8" rx="1.5"/>
          </svg>
        </div>
        <div class="match-body">
          <div class="match-component-name">${esc(s.componentName)}</div>
          <div class="match-frame-name">Frame: ${esc(s.frameName)}</div>
          <div class="match-reason">${esc(s.reason)}</div>
          <div class="match-badges">
            <span class="match-badge ${badgeClass}">${badgeLabel}</span>
            <span class="match-score ${scoreClass}">${s.score}%</span>
          </div>
        </div>
        <div class="match-actions">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="16" height="16" style="color:var(--text-secondary);flex-shrink:0;">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    `;
  }).join('');

  // Click no card → abre popup de comparação
  matchList.querySelectorAll('.match-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt((card as HTMLElement).dataset.matchIdx ?? '0', 10);
      const s = suggestions[idx];
      if (s) showMatchPopup(s);
    });
  });
}

// --- Render Handoff ---

function renderHandoff(hints: string[]) {
  if (hints.length === 0) {
    handoffList.innerHTML = '<li class="empty">Nenhuma dica de handoff</li>';
    return;
  }
  handoffList.innerHTML = hints.map(h => `<li>${esc(h)}</li>`).join('');
}

// --- Popup Functions ---

function extractColorInfo(f: Finding): { current?: string; suggested?: string } | null {
  if (f.ruleId !== 'TOKEN_COLOR_01') return null;
  
  const colorEvidence = f.evidence.find(e => e.startsWith('Cor '));
  const varEvidence = f.evidence.find(e => e.startsWith('Variável DS:'));
  
  let current: string | undefined;
  let suggested: string | undefined;
  
  if (colorEvidence) {
    const m = colorEvidence.match(/#[0-9A-Fa-f]{3,8}/);
    if (m) current = m[0];
  }
  if (varEvidence) {
    const hexInParens = varEvidence.match(/#[0-9A-Fa-f]{3,8}/);
    if (hexInParens) suggested = hexInParens[0];
  }
  
  return current || suggested ? { current, suggested } : null;
}

function extractSpacingInfo(f: Finding): { current?: string; suggested?: string } | null {
  if (f.ruleId !== 'TOKEN_SPACING_01') return null;
  
  const spacingEvidence = f.evidence.find(e => e.startsWith('Espaçamento:'));
  const closestEvidence = f.evidence.find(e => e.includes('Valor DS mais próximo') || e.startsWith('Variável DS:'));
  
  let current: string | undefined;
  let suggested: string | undefined;
  
  if (spacingEvidence) {
    const m = spacingEvidence.match(/(\d+)px/);
    if (m) current = m[1] + 'px';
  }
  if (closestEvidence) {
    const m = closestEvidence.match(/(\d+)px/);
    if (m) suggested = m[1] + 'px';
  }
  
  return current || suggested ? { current, suggested } : null;
}

function extractTouchTargetInfo(f: Finding): { current?: string; suggested?: string } | null {
  if (f.ruleId !== 'A11Y_TOUCH_01') return null;
  
  const dimEvidence = f.evidence.find(e => e.startsWith('Dimensões:'));
  const minEvidence = f.evidence.find(e => e.includes('Mínimo WCAG:'));
  
  let current: string | undefined;
  let suggested: string | undefined;
  
  if (dimEvidence) {
    const match = dimEvidence.match(/(\d+)x(\d+)px/);
    if (match) current = `${match[1]}×${match[2]}px`;
  }
  
  if (minEvidence) {
    const match = minEvidence.match(/(\d+)x(\d+)px/);
    if (match) suggested = `${match[1]}×${match[2]}px`;
  }
  
  return current || suggested ? { current, suggested } : null;
}

function buildComparisonVisual(f: Finding): string {
  const ruleId = f.ruleId;
  
  // Cor fora do DS - mostrar swatches
  if (ruleId === 'TOKEN_COLOR_01') {
    const colorInfo = extractColorInfo(f);
    if (colorInfo && colorInfo.current) {
      const currentColor = colorInfo.current;
      
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 60px; height: 60px; border-radius: 8px; background: ${esc(currentColor)}; border: 2px solid var(--border);"></div>
            <span style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">${esc(currentColor)}</span>
          </div>
        </div>
      `;
    }
    return '<div class="comparison-visual-placeholder" style="font-size:11px;color:var(--text-secondary);">Cor</div>';
  }
  
  // Espaçamento - mostrar barras
  if (ruleId === 'TOKEN_SPACING_01') {
    const spacingInfo = extractSpacingInfo(f);
    if (spacingInfo) {
      const current = spacingInfo.current || '?';
      const suggested = spacingInfo.suggested || current;
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
          <div style="font-size: 12px; font-weight: 600; color: var(--text);">${esc(current)}</div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <div style="width: 32px; height: 4px; background: var(--border); border-radius: 2px;"></div>
            <div style="width: ${parseInt(current) || 20}px; height: 4px; background: var(--error); border-radius: 2px;"></div>
            <div style="width: 32px; height: 4px; background: var(--border); border-radius: 2px;"></div>
          </div>
        </div>
      `;
    }
    return '<div class="comparison-visual-placeholder" style="font-size:11px;color:var(--text-secondary);">px</div>';
  }
  
  // Touch target - mostrar dimensões
  if (ruleId === 'A11Y_TOUCH_01') {
    const touchInfo = extractTouchTargetInfo(f);
    if (touchInfo) {
      const current = touchInfo.current || '?';
      const suggested = touchInfo.suggested || '44×44px';
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
          <div style="font-size: 12px; font-weight: 600; color: var(--text);">${esc(current)}</div>
          <div style="width: 60px; height: 60px; border: 2px dashed var(--error); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--text-secondary);">
            ${esc(current)}
          </div>
        </div>
      `;
    }
    return '<div class="comparison-visual-placeholder" style="font-size:11px;color:var(--text-secondary);">44×44</div>';
  }
  
  // Tipografia
  if (ruleId.startsWith('TOKEN_TYPO')) {
    return '<div class="comparison-visual-placeholder" style="font-size: 32px;">Aa</div>';
  }
  
  // Radius: valor atual
  if (ruleId === 'TOKEN_RADIUS_01') {
    const ev = f.evidence.find(e => e.startsWith('Corner radius:'));
    const px = ev?.match(/(\d+)px/)?.[1] ?? '?';
    return `<div class="comparison-visual-placeholder" style="border-radius:8px;border:2px solid var(--border);font-size:12px;font-weight:700;">${esc(px)}px</div>`;
  }
  
  // BIND rules: mostrar valor correto com indicador "sem binding" e nome da variável
  if (ruleId.endsWith('_BIND_01')) {
    const valueEvidence = f.evidence.find(e => /px|#[0-9A-Fa-f]|Dasa/.test(e));
    const value = valueEvidence?.split(':').slice(1).join(':').trim() ?? '';
    const varEvidence = f.evidence.find(e => e.startsWith('Variável DS:'));
    const varName = varEvidence?.replace('Variável DS:', '').trim() ?? '';
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
        <div style="font-size:12px;font-weight:700;color:var(--text);background:var(--bg-secondary);padding:4px 10px;border-radius:4px;font-family:monospace;">${esc(value)}</div>
        ${varName ? `<div style="font-size:10px;color:var(--text-secondary);font-weight:500;">${esc(varName)}</div>` : ''}
        <div style="font-size:10px;color:var(--warning);font-weight:600;">hard-coded — sem vínculo</div>
      </div>`;
  }

  // Contraste: cores reais
  if (ruleId === 'A11Y_CONTRAST_01') {
    const textEv = f.evidence.find(e => e.startsWith('Texto:'));
    const bgEv = f.evidence.find(e => e.startsWith('Fundo:'));
    const textHex = textEv?.match(/#[0-9A-Fa-f]{3,8}/)?.[0] ?? '#333';
    const bgHex = bgEv?.match(/#[0-9A-Fa-f]{3,8}/)?.[0] ?? '#fff';
    const ratioEv = f.evidence.find(e => e.includes('Contraste:'));
    const ratio = ratioEv?.match(/(\d+\.?\d*):1/)?.[1] ?? '?';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
      <div style="display:flex;gap:6px;width:100%;justify-content:center;">
        <div style="width:40px;height:40px;border-radius:4px;background:${esc(textHex)};border:1px solid var(--border);" title="${esc(textHex)}"></div>
        <div style="width:40px;height:40px;border-radius:4px;background:${esc(bgHex)};border:1px solid var(--border);" title="${esc(bgHex)}"></div>
      </div>
      <span style="font-size:11px;font-weight:600;">${esc(ratio)}:1</span>
    </div>`;
  }

  // Copy: trecho do texto
  if (ruleId.startsWith('COPY_')) {
    const textEv = f.evidence.find(e => e.startsWith('Texto:'));
    const excerpt = textEv ? textEv.replace('Texto: ', '').slice(0, 24) + (textEv.length > 26 ? '…' : '') : '—';
    return `<div class="comparison-visual-placeholder" style="font-size:11px;padding:8px;text-align:center;line-height:1.4;">${esc(excerpt)}</div>`;
  }

  // Auto Layout
  if (ruleId === 'UX_AUTOLAYOUT_01') {
    return '<div class="comparison-visual-placeholder" style="font-size:11px;">Auto layout</div>';
  }

  // COMP_NAMING: exibe nome genérico atual
  if (ruleId === 'COMP_NAMING_01') {
    const genericEvidence = f.evidence.find(e => e.includes('genérico'));
    const currentName = genericEvidence?.match(/genérico "([^"]+)"/)?.[1] ?? 'frame';
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="1.5" stroke-linecap="round" width="24" height="24">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 3v18"/>
        </svg>
        <code style="font-size:12px;font-weight:700;color:var(--error);background:rgba(216,49,69,0.08);padding:2px 8px;border-radius:4px;">${esc(currentName)}</code>
        <span style="font-size:10px;color:var(--text-secondary);">nome genérico</span>
      </div>`;
  }

  if (ruleId.startsWith('COMP_')) {
    return '<div class="comparison-visual-placeholder" style="font-size:11px;">Layer</div>';
  }

  return '<div class="comparison-visual-placeholder" style="font-size:11px;">—</div>';
}

function buildFutureVisual(f: Finding): string {
  const ruleId = f.ruleId;
  
  // Cor fora do DS - mostrar cor sugerida com nome do token
  if (ruleId === 'TOKEN_COLOR_01') {
    const colorInfo = extractColorInfo(f);
    const suggestedColor = colorInfo?.suggested || colorInfo?.current || '#8B5CF6';
    const hexMatch = suggestedColor.match(/#[0-9A-Fa-f]{3,8}/);
    const hexColor = hexMatch ? hexMatch[0] : suggestedColor;
    const varEvidence = f.evidence.find(e => e.startsWith('Variável DS:'));
    const varName = varEvidence?.replace('Variável DS:', '').split('(')[0].trim() ?? '';
    
    return `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 48px; height: 48px; border-radius: 8px; background: ${esc(hexColor)}; border: 2px solid #8B5CF6;"></div>
          <div style="display:flex;flex-direction:column;gap:2px;">
            ${varName ? `<span style="font-size: 11px; color: #8B5CF6; font-weight: 600;">${esc(varName)}</span>` : ''}
            <span style="font-size: 10px; color: var(--text-secondary); font-weight: 500;">${esc(hexColor)}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  // Espaçamento - mostrar valor sugerido com nome da variável
  if (ruleId === 'TOKEN_SPACING_01') {
    const spacingInfo = extractSpacingInfo(f);
    if (spacingInfo && spacingInfo.suggested) {
      const suggested = spacingInfo.suggested;
      const varEvidence = f.evidence.find(e => e.startsWith('Variável DS:'));
      const varName = varEvidence?.replace('Variável DS:', '').split('(')[0].trim() ?? '';
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%;">
          ${varName ? `<div style="font-size: 10px; font-weight: 600; color: #8B5CF6;">${esc(varName)}</div>` : ''}
          <div style="font-size: 11px; font-weight: 600; color: #8B5CF6;">${esc(suggested)}</div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <div style="width: 32px; height: 4px; background: var(--border); border-radius: 2px;"></div>
            <div style="width: ${parseInt(suggested) || 32}px; height: 4px; background: #8B5CF6; border-radius: 2px;"></div>
            <div style="width: 32px; height: 4px; background: var(--border); border-radius: 2px;"></div>
          </div>
        </div>
      `;
    }
    return '<div class="comparison-visual-placeholder" style="width: 60px; height: 60px; font-size: 12px;">px</div>';
  }
  
  // Touch target - mostrar dimensão mínima
  if (ruleId === 'A11Y_TOUCH_01') {
    const touchInfo = extractTouchTargetInfo(f);
    if (touchInfo && touchInfo.suggested) {
      const suggested = touchInfo.suggested;
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%;">
          <div style="font-size: 11px; font-weight: 600; color: #8B5CF6;">${esc(suggested)}</div>
          <div style="width: 48px; height: 48px; border: 2px solid #8B5CF6; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #8B5CF6; background: rgba(139, 92, 246, 0.1);">
            ${esc(suggested)}
          </div>
        </div>
      `;
    }
    return '<div class="comparison-visual-placeholder" style="width: 60px; height: 60px; font-size: 12px;">44×44</div>';
  }
  
  // COMP_NAMING: exibe nome sugerido
  if (ruleId === 'COMP_NAMING_01') {
    const suggested = typeof f.quickFix.params.newName === 'string' ? f.quickFix.params.newName : 'nome-semantico';
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round" width="24" height="24">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 3v18"/>
        </svg>
        <code style="font-size:12px;font-weight:700;color:#8B5CF6;background:rgba(139,92,246,0.1);padding:2px 8px;border-radius:4px;">${esc(suggested)}</code>
        <span style="font-size:10px;color:var(--text-secondary);">após renomear</span>
      </div>`;
  }

  // BIND rules: mostrar "vinculado à variável DS" só quando há correção automática
  if (f.ruleId.endsWith('_BIND_01')) {
    const valueEvidence = f.evidence.find(e => /px|#[0-9A-Fa-f]|Dasa/.test(e));
    const value = valueEvidence?.split(':').slice(1).join(':').trim() ?? '';
    const varEvidence = f.evidence.find(e => e.startsWith('Variável DS:'));
    const varName = varEvidence?.replace('Variável DS:', '').trim() ?? '';
    const hasFix = f.quickFix.possible;
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
        <div style="font-size:12px;font-weight:700;color:var(--text);background:var(--bg-secondary);padding:4px 10px;border-radius:4px;font-family:monospace;">${esc(value)}</div>
        ${varName ? `<div style="font-size:10px;color:#8B5CF6;font-weight:600;">${esc(varName)}</div>` : ''}
        ${hasFix ? '<div style="font-size:10px;color:var(--success);font-weight:600;">vinculado à variável DS</div>' : '<div style="font-size:10px;color:var(--text-secondary);">Requer vínculo manual no painel</div>'}
      </div>`;
  }

  return '<div class="comparison-visual-placeholder" style="width: 60px; height: 60px; font-size: 12px;">—</div>';
}

function getPopupTitle(f: Finding): string {
  return RULE_TITLES[f.ruleId] || f.ruleId;
}

function getPopupDescriptionHtml(f: Finding): string {
  if (f.quickFix.possible) {
    const action = f.recommendation || 'Aplicar correção automática';
    const count = f.nodes.length;
    const scope = count > 1 ? `em ${count} componentes` : '';
    return `<p style="font-weight:600;color:var(--text);margin-bottom:8px;">O que será feito:</p><p>${esc(action)} ${scope}</p><p style="margin-top:10px;font-size:12px;color:var(--text-secondary);">${esc(f.whyItMatters)}</p>`;
  }
  const base = f.whyItMatters || 'Este problema afeta a consistência do design.';
  if (f.manualSteps.length > 0) {
    const steps = f.manualSteps.map(s => `<li>${esc(s)}</li>`).join('');
    return `<p>${esc(base)}</p><p style="margin-top:12px;font-size:12px;font-weight:600;color:var(--text);">Para corrigir:</p><ol style="padding-left:18px;margin-top:6px;font-size:12px;line-height:1.8;">${steps}</ol>`;
  }
  return esc(base);
}

function showResolvePopup(finding: Finding) {
  currentFinding = finding;
  
  // Preencher título
  popupTitle.textContent = getPopupTitle(finding);

  // Preencher descrição (com passos manuais quando não há quickFix)
  popupDescription.innerHTML = getPopupDescriptionHtml(finding);

  const resolveBtn = popupResolve as HTMLButtonElement;
  resolveBtn.disabled = false;
  if (!finding.quickFix.possible) {
    resolveBtn.textContent = 'Fechar';
    resolveBtn.className = 'btn-popup btn-popup-secondary';
  } else {
    const count = finding.nodes.length;
    resolveBtn.textContent = count > 1 ? `Corrigir ${count} em bulk` : 'Corrigir';
    resolveBtn.className = 'btn-popup btn-popup-primary';
  }

  // Mostrar/ocultar campo de rename
  if (finding.quickFix.action === 'renameLayer') {
    const suggested = typeof finding.quickFix.params.newName === 'string' ? finding.quickFix.params.newName : '';
    popupRenameInput.value = suggested;
    popupRenameInput.classList.remove('error');
    popupRenameSection.style.display = 'block';
    setTimeout(() => popupRenameInput.select(), 80);
  } else {
    popupRenameSection.style.display = 'none';
  }

  // Preencher visuais com detalhes específicos
  const currentVisualHTML = buildComparisonVisual(finding);
  const futureVisualHTML = buildFutureVisual(finding);
  
  currentVisual.innerHTML = currentVisualHTML;
  futureVisual.innerHTML = futureVisualHTML;
  
  // Mostrar popup
  popupOverlay.classList.add('active');
  
  // Prevenir scroll do body
  document.body.style.overflow = 'hidden';
}

const THUMB_PLACEHOLDER = `
  <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;gap:6px;flex-direction:column;">
    <div style="width:20px;height:20px;border:2px solid var(--border);border-top-color:var(--brand);border-radius:50%;animation:spin 0.7s linear infinite;"></div>
  </div>`;

function thumbImg(base64: string, label: string, sub: string): string {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;">
      <img src="${base64}" alt="${esc(label)}"
        style="max-width:100%;max-height:88px;border-radius:6px;border:1px solid var(--border);object-fit:contain;background:var(--bg-secondary);">
      <div style="font-size:11px;font-weight:600;color:var(--text);text-align:center;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(label)}</div>
      <div style="font-size:10px;color:var(--text-secondary);text-align:center;">${esc(sub)}</div>
    </div>`;
}

function showMatchPopup(s: ComponentSuggestion) {
  currentFinding = null;
  currentMatchSuggestion = s;

  popupTitle.textContent = s.componentName;
  popupRenameSection.style.display = 'none';

  // Placeholders enquanto as imagens carregam
  currentVisual.innerHTML = THUMB_PLACEHOLDER;
  futureVisual.innerHTML = THUMB_PLACEHOLDER;

  // Descrição
  const descMap: Record<string, string> = {
    detached: 'Este frame foi desvinculado do componente. Clique em "Associar" para substituí-lo por uma nova instância — a ação pode ser desfeita com Cmd+Z.',
    structural: 'Estrutura similar ao componente do DS. Clique em "Associar" para substituir o frame por uma instância — verifique a compatibilidade visual antes.',
    name: 'Nome similar ao componente do DS. Clique em "Associar" para substituir o frame por uma instância.',
  };
  popupDescription.innerHTML = `
    <p style="margin-bottom:8px;font-size:12px;">${esc(s.reason)}</p>
    <p style="font-size:12px;color:var(--text-secondary);">${esc(descMap[s.matchType] ?? '')}</p>`;

  // Botões
  const reportBtn = popupReport as HTMLButtonElement;
  reportBtn.textContent = 'Ver frame';
  reportBtn.className = 'btn-popup btn-popup-secondary';
  reportBtn.disabled = false;

  const resolveBtn = popupResolve as HTMLButtonElement;
  resolveBtn.disabled = false;
  const canAssociate = !!(s.componentId || s.componentKey);
  if (canAssociate) {
    resolveBtn.textContent = 'Associar';
    resolveBtn.className = 'btn-popup btn-popup-primary';
  } else {
    resolveBtn.textContent = 'Fechar';
    resolveBtn.className = 'btn-popup btn-popup-secondary';
  }

  popupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Buscar thumbnails em paralelo
  const badgeLabel = s.matchType === 'detached' ? 'Frame desvinculado' : s.matchType === 'structural' ? 'Estrutura similar' : 'Nome similar';
  const scoreLabel = `${s.score}% de correspondência`;

  sendMessage('GET_NODE_PREVIEW', { nodeIds: [s.frameNodeId] })
    .then(res => {
      if (!currentMatchSuggestion || currentMatchSuggestion.frameNodeId !== s.frameNodeId) return;
      const { base64 } = res as { base64: string };
      currentVisual.innerHTML = thumbImg(base64, s.frameName, badgeLabel);
    })
    .catch(() => {
      if (!currentMatchSuggestion || currentMatchSuggestion.frameNodeId !== s.frameNodeId) return;
      currentVisual.innerHTML = `<div style="font-size:12px;color:var(--text-secondary);text-align:center;">${esc(s.frameName)}<br><span style="font-size:10px;">${esc(badgeLabel)}</span></div>`;
    });

  const componentFallback = () => {
    if (!currentMatchSuggestion || currentMatchSuggestion.frameNodeId !== s.frameNodeId) return;
    futureVisual.innerHTML = `<div style="font-size:12px;color:var(--text-secondary);text-align:center;">${esc(s.componentName)}<br><span style="font-size:10px;">${esc(scoreLabel)}</span></div>`;
  };

  if (s.componentId) {
    // Componente local — exportar diretamente pelo ID
    sendMessage('GET_NODE_PREVIEW', { nodeIds: [s.componentId] })
      .then(res => {
        if (!currentMatchSuggestion || currentMatchSuggestion.frameNodeId !== s.frameNodeId) return;
        const { base64 } = res as { base64: string };
        futureVisual.innerHTML = thumbImg(base64, s.componentName, scoreLabel);
      })
      .catch(componentFallback);
  } else if (s.componentKey) {
    // Componente de biblioteca — importar pelo key para obter o thumbnail
    sendMessage('GET_NODE_PREVIEW', { componentKey: s.componentKey })
      .then(res => {
        if (!currentMatchSuggestion || currentMatchSuggestion.frameNodeId !== s.frameNodeId) return;
        const { base64 } = res as { base64: string };
        futureVisual.innerHTML = thumbImg(base64, s.componentName, scoreLabel);
      })
      .catch(componentFallback);
  } else {
    componentFallback();
  }
}

function hideResolvePopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = '';
  currentFinding = null;
  currentMatchSuggestion = null;
  popupRenameSection.style.display = 'none';
  popupRenameInput.value = '';
  popupRenameInput.classList.remove('error');
  // Restore report button text
  popupReport.textContent = 'Reportar bug';
}

// Atualiza o preview do nome futuro conforme o usuário digita
popupRenameInput.addEventListener('input', () => {
  if (!currentFinding || currentFinding.quickFix.action !== 'renameLayer') return;
  const typed = popupRenameInput.value.trim();
  if (!typed) return;
  const previewFinding = { ...currentFinding, quickFix: { ...currentFinding.quickFix, params: { ...currentFinding.quickFix.params, newName: typed } } };
  futureVisual.innerHTML = buildFutureVisual(previewFinding);
  popupRenameInput.classList.remove('error');
});

// Enter no input de rename aciona o Resolver
popupRenameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    (popupResolve as HTMLButtonElement).click();
  }
});

// Event listeners do popup
popupClose.addEventListener('click', () => {
  hideResolvePopup();
});

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    hideResolvePopup();
  }
});

popupReport.addEventListener('click', async () => {
  if (currentMatchSuggestion) {
    // No modo DS Match o botão esquerdo navega até o frame
    try {
      await sendMessage('APPLY_FOCUS_NODES', { nodeIds: [currentMatchSuggestion.frameNodeId] });
    } catch { /* silent */ }
    hideResolvePopup();
    return;
  }
  // Abrir email para reportar bug
  const subject = encodeURIComponent(`Bug Report - ${currentFinding ? getPopupTitle(currentFinding) : 'Dasa Adherence Score'}`);
  const body = encodeURIComponent(
    `Problema encontrado:\n\n` +
    `Finding ID: ${currentFinding?.id || 'N/A'}\n` +
    `Rule ID: ${currentFinding?.ruleId || 'N/A'}\n` +
    `Descrição: ${currentFinding ? (currentFinding.whyItMatters || currentFinding.recommendation || '') : 'N/A'}\n\n` +
    `Por favor, descreva o problema em detalhes:`
  );
  window.open(`mailto:c_fae.ext@dasa.com.br?subject=${subject}&body=${body}`, '_blank');
});

popupResolve.addEventListener('click', async () => {
  if (currentMatchSuggestion) {
    const s = currentMatchSuggestion;
    const canAssociate = !!(s.componentId || s.componentKey);

    if (!canAssociate) {
      hideResolvePopup();
      return;
    }

    const btn = popupResolve as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'Associando…';

    try {
      await sendMessage('SWAP_WITH_COMPONENT', {
        nodeIds: [s.frameNodeId],
        componentId: s.componentId,
        componentKey: s.componentKey,
      });
      hideResolvePopup();
      // Re-auditar para atualizar todos os contadores
      const res = await sendMessage('AUDIT_SELECTION') as { result: AuditResult };
      currentResult = res.result;
      renderResults(currentResult);
    } catch (e) {
      btn.disabled = false;
      btn.textContent = 'Associar';
      alert(e instanceof Error ? e.message : 'Erro ao associar componente');
    }
    return;
  }

  if (!currentFinding) return;

  if (!currentFinding.quickFix.possible) {
    hideResolvePopup();
    return;
  }

  // Para rename: valida e injeta o nome editado pelo usuário nos params
  if (currentFinding.quickFix.action === 'renameLayer') {
    const newName = popupRenameInput.value.trim();
    if (!newName) {
      popupRenameInput.classList.add('error');
      popupRenameInput.focus();
      return;
    }
    popupRenameInput.classList.remove('error');
    currentFinding.quickFix.params = { ...currentFinding.quickFix.params, newName };

    // Atualiza o visual futuro para refletir o nome que o usuário digitou
    futureVisual.innerHTML = buildFutureVisual(currentFinding);
  }

  const btn = popupResolve as HTMLButtonElement;
  btn.disabled = true;
  btn.textContent = 'Aplicando...';

  try {
    await sendMessage('APPLY_QUICK_FIX', { fixId: currentFinding.id });
    hideResolvePopup();

    const res = (await sendMessage('AUDIT_SELECTION')) as { result: AuditResult };
    currentResult = res.result;
    renderResults(currentResult);
  } catch (e) {
    alert(e instanceof Error ? e.message : 'Erro ao aplicar correção');
  } finally {
    btn.disabled = false;
    const count = currentFinding?.nodes.length ?? 1;
    btn.textContent = count > 1 ? `Corrigir ${count} em bulk` : 'Corrigir';
  }
});
