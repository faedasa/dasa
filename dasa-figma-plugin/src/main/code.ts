/**
 * Dasa Design Quality Checklist - Figma Plugin
 * 
 * Desenvolvido por Cosme Faé para Dasa
 * Email: c_fae.ext@dasa.com.br
 * 
 * Plugin de auditoria de qualidade de design que verifica conformidade
 * com o Design System da Dasa e fornece quick fixes automáticos.
 */

import { scanSelection, ScanProgress } from './scanner';
import { evaluateRules } from './rulesEngine';
import { buildVariableRegistry } from './variablesRegistry';
import { checkCopy } from './copyChecker';
import { generateQuickFixPlan, applyQuickFix, applyCopyFix } from './quickFix';
import { matchComponents } from './componentMatcher';
import { AuditResult, Finding, CategoryScore, ScannedNode, QuickFixAction } from '../shared/types';
import { UiToMainMessage, MainToUiMessage, isValidMessage } from '../shared/messageTypes';
import { loadKB } from '../kb/loader';
import { createMatchers } from '../kb/matchers';
import { CATEGORY, CATEGORY_WEIGHTS, SEVERITY_SCORES, Category } from '../shared/constants';

// Figma provides __html__ from manifest "ui" field at runtime
declare const __html__: string;

figma.showUI(__html__, { width: 460, height: 700, themeColors: true });

let currentResult: AuditResult | null = null;

figma.ui.onmessage = async (msg: unknown) => {
  if (!isValidMessage(msg)) {
    console.error('Invalid message:', msg);
    return;
  }

  const message = msg as UiToMainMessage;

  try {
    switch (message.type) {
      case 'AUDIT_SELECTION':
        await handleAudit(message.requestId);
        break;
      case 'APPLY_QUICK_FIX':
        await handleQuickFix(message.requestId, message.payload && message.payload.fixId);
        break;
      case 'APPLY_COPY_FIX':
        await handleCopyFix(message.requestId, message.payload && message.payload.nodeId, message.payload && message.payload.newText);
        break;
      case 'APPLY_ALL_SAFE_FIXES':
        await handleAllSafeFixes(message.requestId);
        break;
      case 'APPLY_FOCUS_NODES':
        handleFocusNodes(message.requestId, message.payload?.nodeIds);
        break;
      case 'FOCUS_COMPONENT':
        handleFocusComponent(message.requestId, message.payload?.nodeIds?.[0]);
        break;
      case 'GET_NODE_PREVIEW':
        await handleGetNodePreview(message.requestId, message.payload?.nodeIds?.[0], message.payload?.componentKey);
        break;
      case 'SWAP_WITH_COMPONENT':
        await handleSwapWithComponent(
          message.requestId,
          message.payload?.nodeIds?.[0],
          message.payload?.componentId,
          message.payload?.componentKey,
        );
        break;
      case 'EXPORT_REPORT':
        handleExport(message.requestId);
        break;
      case 'CANCEL':
        figma.closePlugin();
        break;
    }
  } catch (error) {
    sendError(message.requestId, error instanceof Error ? error.message : 'Erro desconhecido');
  }
};

async function handleAudit(requestId: string) {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    sendError(requestId, 'Selecione pelo menos um frame ou componente para auditar');
    return;
  }

  sendProgress(requestId, 0, 'Iniciando auditoria...');

  sendProgress(requestId, 5, 'Carregando knowledge base...');
  const kb = await loadKB();
  const matchers = createMatchers(kb);

  sendProgress(requestId, 8, 'Carregando variáveis e styles do arquivo...');
  const registry = await buildVariableRegistry(matchers);

  sendProgress(requestId, 10, 'Escaneando nodes...');
  const scannedNodes = scanSelection(selection, (p: ScanProgress) => {
    sendProgress(requestId, 10 + Math.floor((p.current / p.total) * 40), p.message);
  });

  sendProgress(requestId, 50, 'Avaliando regras...');
  const findings = evaluateRules(scannedNodes, registry, matchers, kb);

  sendProgress(requestId, 70, 'Verificando copy...');
  const copySuggestions = checkCopy(scannedNodes, matchers);

  // 4) Quick fix plan
  sendProgress(requestId, 85, 'Gerando plano de correções...');
  const quickFixPlan = generateQuickFixPlan(findings);

  sendProgress(requestId, 90, 'Verificando componentes do DS...');
  const componentSuggestions = matchComponents(selection);

  sendProgress(requestId, 95, 'Calculando scores...');
  const rulesMap = new Map(kb.rules.map(r => [r.ruleId, r]));
  const score = calculateScore(findings, rulesMap);
  const scope = selection.length === 1 && selection[0].type === 'FRAME' ? 'frame' : 'selection';
  const handoffHints = buildHandoffHints(scannedNodes, findings);

  currentResult = {
    meta: {
      agent: 'dasa-design-quality-checklist',
      version: '1.0.0',
      scope,
      timestamp: new Date().toISOString(),
      kbVersion: kb.version,
      notes: [],
    },
    score,
    findings,
    quickFixPlan,
    copySuggestions,
    componentSuggestions,
    handoffHints,
  };

  sendProgress(requestId, 100, 'Auditoria concluída!');

  figma.ui.postMessage({
    type: 'AUDIT_RESULT', requestId, payload: { result: currentResult },
  } as MainToUiMessage);
}

async function handleQuickFix(requestId: string, fixId?: string) {
  if (!currentResult || !fixId) {
    sendError(requestId, 'Nenhum resultado disponível ou fixId não fornecido');
    return;
  }

  // Find the finding by ID
  const finding = currentResult.findings.find(f => f.id === fixId);
  if (!finding) {
    sendError(requestId, 'Finding não encontrado');
    return;
  }

  // Check if quick fix is possible
  if (!finding.quickFix.possible || !finding.quickFix.action) {
    sendError(requestId, 'Quick fix não disponível para este problema');
    return;
  }

  // Quick fix aplicado em bulk: todos os nós do finding (agrupamento)
  const fix: QuickFixAction = {
    priority: 1,
    action: finding.quickFix.action,
    nodes: finding.nodes,
    params: finding.quickFix.params,
    expectedImpact: finding.severity === 'BLOCKER' || finding.severity === 'HIGH' ? 'high' : 'medium',
    risk: 'low',
  };

  const results = await applyQuickFix(fix);
  let ok = 0, fail = 0;
  for (const r of results) r.success ? ok++ : fail++;

  figma.ui.postMessage({
    type: 'QUICK_FIX_APPLIED', requestId,
    payload: { fixId, success: ok > 0, results },
  } as MainToUiMessage);

  figma.notify(ok > 0
    ? `${ok} correção(ões) aplicada(s)${fail > 0 ? `, ${fail} falha(s)` : ''}`
    : 'Falha ao aplicar correções');
}

async function handleCopyFix(requestId: string, nodeId?: string, newText?: string) {
  if (!nodeId || !newText) {
    sendError(requestId, 'nodeId e newText são obrigatórios');
    return;
  }

  try {
    await applyCopyFix(nodeId, newText);
    
    figma.ui.postMessage({
      type: 'QUICK_FIX_APPLIED', requestId,
      payload: { fixId: 'copy-fix', success: true },
    } as MainToUiMessage);

    figma.notify('Texto corrigido com sucesso');
  } catch (error) {
    sendError(requestId, error instanceof Error ? error.message : 'Erro ao aplicar correção de texto');
  }
}

async function handleAllSafeFixes(requestId: string) {
  if (!currentResult) { sendError(requestId, 'Nenhum resultado disponível'); return; }

  const safeFixes = currentResult.quickFixPlan.filter(f => f.risk === 'low');
  let applied = 0, failed = 0;

  for (const fix of safeFixes) {
    try {
      const res = await applyQuickFix(fix);
      applied += res.filter(r => r.success).length;
      failed += res.filter(r => !r.success).length;
    } catch { failed++; }
  }

  figma.ui.postMessage({
    type: 'QUICK_FIX_APPLIED', requestId,
    payload: { fixId: 'all-safe', success: applied > 0 },
  } as MainToUiMessage);

  figma.notify(`${applied} correção(ões) aplicada(s)${failed > 0 ? `, ${failed} falha(s)` : ''}`);
}

function handleFocusNodes(requestId: string, nodeIds?: string[]) {
  if (!nodeIds || nodeIds.length === 0) {
    sendError(requestId, 'Nenhum node informado');
    return;
  }
  const nodes: SceneNode[] = [];
  for (const id of nodeIds) {
    const node = figma.getNodeById(id);
    if (node && 'visible' in node) nodes.push(node as SceneNode);
  }
  if (nodes.length > 0) {
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.notify(nodes.length === 1 ? '1 elemento selecionado' : `${nodes.length} elementos selecionados`);
  }
  figma.ui.postMessage({
    type: 'QUICK_FIX_APPLIED', requestId,
    payload: { fixId: 'focus-nodes', success: nodes.length > 0 },
  } as MainToUiMessage);
}

async function handleGetNodePreview(requestId: string, nodeId?: string, componentKey?: string) {
  let exportTarget: (SceneNode & ExportMixin) | null = null;

  if (nodeId) {
    const found = figma.getNodeById(nodeId);
    if (found && 'exportAsync' in found) {
      exportTarget = found as SceneNode & ExportMixin;
    }
  } else if (componentKey) {
    try {
      const comp = await figma.importComponentByKeyAsync(componentKey);
      exportTarget = comp as unknown as SceneNode & ExportMixin;
    } catch {
      sendError(requestId, 'Componente de biblioteca não encontrado ou biblioteca não habilitada');
      return;
    }
  }

  if (!exportTarget) {
    sendError(requestId, 'Node não encontrado ou não exportável');
    return;
  }

  try {
    const bytes = await (exportTarget as ExportMixin).exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 1.5 },
    });
    const base64 = figma.base64Encode(bytes);
    figma.ui.postMessage({
      type: 'NODE_PREVIEW', requestId,
      payload: { nodeId: nodeId ?? componentKey, base64: `data:image/png;base64,${base64}` },
    } as MainToUiMessage);
  } catch (e) {
    sendError(requestId, e instanceof Error ? e.message : 'Erro ao exportar preview');
  }
}

async function handleSwapWithComponent(
  requestId: string,
  frameNodeId?: string,
  componentId?: string,
  componentKey?: string,
) {
  if (!frameNodeId) { sendError(requestId, 'frameNodeId não fornecido'); return; }

  const frameNode = figma.getNodeById(frameNodeId);
  if (!frameNode || frameNode.type !== 'FRAME') {
    sendError(requestId, 'Frame não encontrado'); return;
  }

  let compNode: ComponentNode | null = null;
  if (componentId) {
    const found = figma.getNodeById(componentId);
    if (found && found.type === 'COMPONENT') compNode = found as ComponentNode;
  } else if (componentKey) {
    try {
      compNode = await figma.importComponentByKeyAsync(componentKey);
    } catch {
      sendError(requestId, 'Componente de biblioteca não encontrado. Verifique se a biblioteca está habilitada.');
      return;
    }
  }

  if (!compNode) { sendError(requestId, 'Componente não encontrado'); return; }

  const frame = frameNode as FrameNode;
  const parent = frame.parent;
  if (!parent || !('insertChild' in parent)) {
    sendError(requestId, 'Frame sem parent válido'); return;
  }

  const instance = compNode.createInstance();
  instance.x = frame.x;
  instance.y = frame.y;

  const idx = (parent as ChildrenMixin).children.indexOf(frame);
  (parent as ChildrenMixin).insertChild(idx, instance);
  frame.remove();

  figma.currentPage.selection = [instance];
  figma.viewport.scrollAndZoomIntoView([instance]);
  figma.commitUndo();

  figma.ui.postMessage({
    type: 'QUICK_FIX_APPLIED', requestId,
    payload: { fixId: 'swap-component', success: true },
  } as MainToUiMessage);
  figma.notify(`Frame substituído por instância de "${compNode.name}"`);
}

function handleFocusComponent(requestId: string, componentId?: string) {
  if (!componentId) {
    sendError(requestId, 'componentId não fornecido');
    return;
  }
  const node = figma.getNodeById(componentId);
  if (node && 'visible' in node) {
    const sceneNode = node as SceneNode;
    figma.currentPage.selection = [sceneNode];
    figma.viewport.scrollAndZoomIntoView([sceneNode]);
    figma.notify(`Componente "${node.name}" selecionado`);
    figma.ui.postMessage({
      type: 'QUICK_FIX_APPLIED', requestId,
      payload: { fixId: 'focus-component', success: true },
    } as MainToUiMessage);
  } else {
    sendError(requestId, 'Componente não encontrado no arquivo');
  }
}

function handleExport(requestId: string) {
  if (!currentResult) { sendError(requestId, 'Nenhum resultado disponível'); return; }
  figma.ui.postMessage({
    type: 'EXPORT_READY', requestId,
    payload: { reportJson: JSON.stringify(currentResult, null, 2) },
  } as MainToUiMessage);
}

// --- Score ---

function calculateScore(findings: Finding[], rulesMap: Map<string, { category: string }>): { overall: number; byCategory: CategoryScore[] } {
  const grouped = new Map<Category, Finding[]>();
  for (const cat of Object.values(CATEGORY) as Category[]) grouped.set(cat, []);

  for (const f of findings) {
    const rule = rulesMap.get(f.ruleId);
    if (rule) grouped.get(rule.category as Category)?.push(f);
  }

  const byCategory: CategoryScore[] = [];
  for (const [category, catFindings] of grouped) {
    const weight = CATEGORY_WEIGHTS[category];
    let score = 100;
    if (catFindings.length > 0) {
      let penalty = 0;
      for (const f of catFindings) penalty += (100 - SEVERITY_SCORES[f.severity]) * (f.confidence || 1);
      score = Math.max(0, Math.round(100 - penalty / catFindings.length));
    }
    byCategory.push({ category, score, weight });
  }

  const overall = Math.round(byCategory.reduce((s, c) => s + c.score * c.weight, 0));
  return { overall, byCategory };
}

// --- Handoff hints ---

function buildHandoffHints(nodes: ScannedNode[], findings: Finding[]): string[] {
  const hints: string[] = [];

  if (findings.some(f => f.ruleId.startsWith('COMP_'))) {
    hints.push('Use componentes oficiais do DS quando disponíveis');
  }
  if (findings.some(f => f.ruleId === 'A11Y_TOUCH_01')) {
    hints.push('Garanta touch targets mínimo de 44x44px para elementos interativos');
  }
  if (nodes.some(n => n.layout && n.layout.autoLayoutMode && n.layout.autoLayoutMode !== 'NONE')) {
    hints.push('Use auto layout com constraints apropriados para responsividade');
  }
  if (nodes.some(n => /^(frame|copy|untitled|group|rectangle)\s*\d*$/i.test(n.name))) {
    hints.push('Use nomes semânticos para layers (evite "Copy", "Untitled", "Frame")');
  }

  return hints;
}

// --- Messaging ---

function sendProgress(requestId: string, current: number, message: string) {
  figma.ui.postMessage({
    type: 'PROGRESS', requestId, payload: { progress: { current, total: 100, message } },
  } as MainToUiMessage);
}

function sendError(requestId: string, error: string) {
  figma.ui.postMessage({
    type: 'ERROR', requestId, payload: { error },
  } as MainToUiMessage);
}
