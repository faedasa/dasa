---
name: playground-state-panel
description: "Injeta o painel flutuante de estados em protótipos HTML do playground. Obrigatório em toda geração de HTML em docs/playground/. Suporta primeiro render e atualizações iterativas (adicionar/remover/atualizar módulos e estados)."
version: "1.0"
language: pt-BR
allowed-tools: [Read, Edit]
tags: [playground, estados, prototipo, interatividade, html]
---

# Skill: playground-state-panel

Injeta e mantém o painel flutuante de estados em protótipos HTML do playground Dasa.

> **Regra inviolável:** o painel de estados é parte estrutural de todo protótipo em `docs/playground/`. Nunca o omita na geração. Nunca o remova em atualizações — a menos que o usuário use linguagem explícita e direta referindo-se ao painel especificamente (ex: "remova o painel de estados"). Ambiguidade não autoriza remoção.

---

## Metadata

| Campo | Detalhe |
|---|---|
| **Quando usar** | Toda vez que um HTML é gerado em `docs/playground/` — automático. Também quando usuário pede "adicione um estado X", "novo módulo Y", "mude o padrão do módulo Z". |
| **Quando NÃO usar** | O protótipo ainda não existe → crie-o primeiro, depois invoque esta skill. Arquivo não é um HTML em `docs/playground/` → não se aplica. |
| **Inputs necessários** | Caminho do arquivo `.html` em `docs/playground/`. Para Modo B: descrição do que adicionar/alterar/remover. |
| **Output esperado** | Protótipo com painel funcional: botão toggle fixo no bottom-right, drawer com grupos de estados por módulo, JS injetado. |
| **Chains to** | `playground-sync-tokens` — obrigatório ao final do **Modo A** (primeiro render). Garante que o `:root` sempre parte com os tokens reais do DS Dasa, nunca com hardcodes. Modo B (atualização iterativa) não obriga o CHAIN — tokens não mudam entre updates de estados. |
| **Suggests** | `quality-gate` — após sync de tokens, para validar código. `kb-commit` — após validação, para commitar o protótipo. |
| **Rejects to** | — |

---

## Dois modos de operação

### Modo A — Primeiro render

Acionado quando o painel ainda não existe no arquivo (ausência de `.state-panel` no HTML).

### Modo B — Atualização iterativa

Acionado quando o painel já existe e o usuário quer modificá-lo. Faz edits cirúrgicos — nunca regenera o arquivo inteiro.

---

## Modo A — Como executar

**Siga estes passos em ordem. Não pule etapas.**

### Passo 1 — Ler o protótipo

Leia o arquivo `.html` alvo. Identifique todos os containers com `id` que representam seções/módulos trocáveis (elementos cujo conteúdo varia por estado de usuário ou dados).

### Passo 1.5 — Descobrir páginas do playground

Liste todos os arquivos `.html` no mesmo diretório do protótipo (geralmente `docs/playground/`). Para cada arquivo encontrado, extraia o `<title>` e derive um label curto (ex: `Nav 360 — Variação 2 · Atalhos Contextuais` → `Var 2 · Atalhos`). Esses itens comporão a tab "Páginas" do painel.

### Passo 2 — Mapear módulos e estados

Para cada módulo identificado:

1. Defina um `module-id` em `kebab-case` (ex: `proxima-data`, `resultados`, `historico`)
2. Defina 2–5 estados semânticos — use os padrões abaixo como referência:
   - Dados presentes → `populated`, `with-results`, `confirmed`, etc.
   - Carregando → `loading`
   - Sem dados → `empty`
   - Erro / ação necessária → `error`, `critical`, `with-pending`
   - Estado especial → nomeie conforme o domínio (ex: `urgent`, `no-appointment`)
3. O **primeiro estado da lista é sempre o default** — será marcado com `is-active` e renderizado no `DOMContentLoaded`

### Passo 3 — Injetar o CSS canônico

Cole o bloco abaixo imediatamente antes de `</style>`, sem alterar estilos existentes.

Se o protótipo não tiver `--primary` definido no `:root`, adicione `--primary: #0037FF;` junto.

```css
/* ─── Float state panel ──────────────────────────────────── */
.state-panel {
  position: fixed;
  z-index: 300;
  user-select: none;
  /* Tamanho = apenas o toggle — drawer usa position:absolute */
}
.state-panel.is-dragging * { pointer-events: none !important; }
.state-panel__drawer {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px); /* padrão: acima do toggle; JS inverte conforme quadrante */
  background: #0F0F0F;
  border-radius: 16px;
  padding: 16px;
  width: min(296px, calc(100vw - 24px));
  max-height: min(480px, calc(100dvh - 80px));
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.1) transparent;
  box-shadow: 0 8px 40px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.3);
  border: 1px solid rgba(255,255,255,.08);
  visibility: hidden;
  opacity: 0;
  transform: translateY(6px) scale(0.98);
  transform-origin: bottom right; /* atualizado por JS conforme quadrante */
  transition: opacity 200ms cubic-bezier(0.16,1,0.3,1),
              transform 200ms cubic-bezier(0.16,1,0.3,1),
              visibility 0ms 200ms;
}
.state-panel__drawer.is-open {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition: opacity 200ms cubic-bezier(0.16,1,0.3,1),
              transform 200ms cubic-bezier(0.16,1,0.3,1),
              visibility 0ms 0ms;
}
.state-panel__header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px;
  cursor: grab; /* área de drag quando drawer aberto */
  padding: 2px 0 6px;
  margin-top: -2px;
}
.state-panel.is-dragging .state-panel__header { cursor: grabbing; }
.state-panel__label {
  font-size: 10px; font-weight: 700;
  letter-spacing: 1.2px; text-transform: uppercase;
  color: rgba(255,255,255,.35);
  pointer-events: none;
}
.state-panel__close {
  width: 22px; height: 22px;
  background: rgba(255,255,255,.07);
  border: none; border-radius: 6px;
  color: rgba(255,255,255,.45);
  cursor: pointer;
  font-size: 14px; line-height: 22px; text-align: center;
  transition: background 120ms;
  pointer-events: auto;
}
.state-panel__close:hover { background: rgba(255,255,255,.13); }
/* ─── Tabs ──────────────────────────────────────────────── */
.panel-tabs {
  display: flex;
  background: rgba(255,255,255,.06);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
  margin-bottom: 14px;
}
.panel-tab {
  flex: 1; height: 28px;
  border: none; background: transparent;
  border-radius: 6px;
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,.4);
  cursor: pointer;
  transition: background 150ms, color 150ms;
  letter-spacing: .2px;
}
.panel-tab.is-active { background: rgba(255,255,255,.12); color: #fff; }
.panel-tab:hover:not(.is-active) { color: rgba(255,255,255,.65); }
/* ─── Page nav ──────────────────────────────────────────── */
.page-list { display: flex; flex-direction: column; gap: 2px; }
.page-item {
  display: flex; align-items: center; gap: 10px;
  height: 36px; padding: 0 10px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255,255,255,.55);
  font-size: 12px; font-weight: 500;
  transition: background 120ms, color 120ms;
}
.page-item:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.85); }
.page-item.is-current { background: rgba(0,55,255,.18); color: #fff; font-weight: 600; pointer-events: none; }
.page-item__dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,.18); flex-shrink: 0;
  transition: background 120ms, box-shadow 120ms;
}
.page-item.is-current .page-item__dot {
  background: var(--primary);
  box-shadow: 0 0 0 3px rgba(0,55,255,.28);
}
.page-item__label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.page-item__arrow { font-size: 11px; opacity: .3; }
.page-item.is-current .page-item__arrow { display: none; }
/* ─── States section ────────────────────────────────────── */
.panel-states {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.1) transparent;
}
.panel-states::-webkit-scrollbar { width: 3px; }
.panel-states::-webkit-scrollbar-track { background: transparent; }
.panel-states::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 99px; }
.panel-content[hidden] { display: none; }
.state-panel__module { margin-bottom: 12px; }
.state-panel__module:last-child { margin-bottom: 0; }
.state-panel__module-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 5px;
}
.state-panel__module-label {
  font-size: 10px; font-weight: 600;
  color: rgba(255,255,255,.3);
  letter-spacing: .5px; text-transform: uppercase;
}
.state-panel__active-badge {
  font-size: 9px; font-weight: 600;
  color: rgba(255,255,255,.35);
  background: rgba(255,255,255,.06);
  padding: 2px 6px; border-radius: 4px;
  letter-spacing: .2px; white-space: nowrap;
}
.state-btns { display: flex; flex-wrap: wrap; gap: 4px; }
.state-btn {
  height: 26px; padding: 0 9px;
  border-radius: 6px;
  font-size: 11px; font-weight: 600;
  border: 1.5px solid rgba(255,255,255,.1);
  background: transparent;
  color: rgba(255,255,255,.45);
  cursor: pointer;
  transition: all 120ms;
  white-space: nowrap;
}
.state-btn:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); border-color: rgba(255,255,255,.18); }
.state-btn.is-active { background: var(--primary); color: #fff; border-color: var(--primary); }
.state-panel__divider { height: 1px; background: rgba(255,255,255,.06); margin: 10px 0; }
.state-panel__toggle {
  min-height: 44px; padding: 0 16px;  /* 44px — WCAG 2.5.5 touch target */
  background: #0F0F0F;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 99px;
  color: rgba(255,255,255,.65);
  font-size: 12px; font-weight: 600;
  cursor: default; touch-action: none;
  display: flex; align-items: center; gap: 7px;
  box-shadow: 0 4px 16px rgba(0,0,0,.3);
  transition: background 120ms, color 120ms;
  letter-spacing: .3px;
  white-space: nowrap;
}
.state-panel__toggle:hover { background: #191919; color: #fff; }
.state-panel__toggle svg { width: 13px; height: 13px; opacity: .5; flex-shrink: 0; }
/* ─── Mobile: toggle compacto ───────────────────────────── */
@media (max-width: 600px) {
  .state-panel__toggle { padding: 0 14px; min-width: 44px; justify-content: center; }
  .state-panel__toggle-label { display: none; }
  .state-panel__toggle svg { opacity: .8; width: 15px; height: 15px; }
  .state-panel__drawer { width: min(280px, calc(100vw - 20px)); }
}
```

### Passo 4 — Injetar o HTML do painel

Cole o bloco abaixo imediatamente antes de `</body>`.

- Preencha `<div class="page-list">` com os arquivos descobertos no Passo 1.5, usando o `href` relativo de cada arquivo
- Na tab Estados, substitua os comentários pelos módulos mapeados no Passo 2 — separe módulos com `.state-panel__divider`
- O botão do estado default recebe `is-active` e o `.state-panel__active-badge` recebe o mesmo label

```html
<!-- ─── Float State Panel ────────────────────────────────── -->
<div class="state-panel" id="statePanel">
  <div class="state-panel__drawer" id="statePanelDrawer">
    <div class="state-panel__header">
      <span class="state-panel__label">Playground Dasa</span>
      <button class="state-panel__close" onclick="togglePanel()" aria-label="Fechar painel">✕</button>
    </div>

    <div class="panel-tabs" role="tablist">
      <button class="panel-tab is-active" role="tab" aria-selected="true"
              onclick="switchTab('pages')" id="tab-pages-btn">Páginas</button>
      <button class="panel-tab" role="tab" aria-selected="false"
              onclick="switchTab('states')" id="tab-states-btn">Estados</button>
    </div>

    <!-- Tab: Páginas -->
    <div class="panel-content" id="tab-pages" role="tabpanel">
      <div class="page-list">
        <!-- Um .page-item por arquivo .html em docs/playground/ -->
        <a class="page-item" href="[nome-do-arquivo.html]">
          <span class="page-item__dot"></span>
          <span class="page-item__label">[Label curto]</span>
          <span class="page-item__arrow">↗</span>
        </a>
        <!-- repita para cada arquivo -->
      </div>
    </div>

    <!-- Tab: Estados -->
    <div class="panel-content panel-states" id="tab-states" role="tabpanel" hidden>

      <!-- Módulo: [Nome legível] -->
      <div class="state-panel__module">
        <div class="state-panel__module-header">
          <div class="state-panel__module-label">[Nome legível]</div>
          <span class="state-panel__active-badge" id="badge-[module-id]">[Label do estado default]</span>
        </div>
        <div class="state-btns" id="btns-[module-id]">
          <button class="state-btn is-active" onclick="setState('[module-id]','[default-state]',this)">[Label default]</button>
          <button class="state-btn" onclick="setState('[module-id]','[state-2]',this)">[Label 2]</button>
          <!-- adicione mais conforme Passo 2 -->
        </div>
      </div>

      <div class="state-panel__divider"></div>

      <!-- Repita o bloco .state-panel__module para cada módulo -->

    </div>
  </div>

  <button class="state-panel__toggle" aria-label="Alternar painel de estados" id="statePanelToggle">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
    </svg>
    <span class="state-panel__toggle-label">Playground · Estados</span>
  </button>
</div>
```

### Passo 5 — Injetar o JavaScript

Se já existe um `<script>` no arquivo, adicione o código dentro dele. Caso contrário, crie `<script>` antes de `</body>` (após o bloco do painel).

```javascript
// ─── Templates por módulo ───────────────────────────────────
// Cada chave é um module-id. Cada valor é um objeto de funções que retornam HTML.
// O HTML de cada estado deve replicar o conteúdo real do módulo no protótipo.
const templates = {

  '[module-id]': {
    '[default-state]': () => `
      <!-- HTML completo do módulo neste estado -->
    `,
    '[state-2]': () => `
      <!-- HTML completo do módulo neste estado -->
    `,
    // adicione mais estados conforme mapeamento
  },

  // repita para cada módulo

};

// ─── Mapeamento module-id → id do elemento DOM ──────────────
const moduleMap = {
  '[module-id]': '[id-do-elemento-no-html]',
  // repita para cada módulo
};

// ─── Core: render, setState, togglePanel, switchTab ─────────
function render(module, stateKey) {
  const el = document.getElementById(moduleMap[module]);
  if (!el) return;
  const tpl = templates[module]?.[stateKey];
  if (!tpl) return;
  el.innerHTML = tpl();
}

function setState(module, stateKey, btn) {
  render(module, stateKey);
  const group = document.getElementById(`btns-${module}`);
  if (group) group.querySelectorAll('.state-btn').forEach(b => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');
  // atualiza badge inline do estado ativo
  const activeBadge = document.getElementById(`badge-${module}`);
  if (activeBadge && btn) activeBadge.textContent = btn.textContent.trim();
}

function switchTab(name) {
  document.querySelectorAll('.panel-tab').forEach(t =>
    t.classList.toggle('is-active', t.id === `tab-${name}-btn`)
  );
  document.querySelectorAll('.panel-content').forEach(c => {
    c.hidden = c.id !== `tab-${name}`;
  });
}

// ─── Painel arrastável (2D, clamp, persistência) ─────────────
const _spc = (function() {
  const STORAGE_KEY = 'dasa-playground-panel-pos';
  const DRAG_THRESHOLD = 5;
  const MARGIN = 12;

  const panel  = document.getElementById('statePanel');
  const toggle = document.getElementById('statePanelToggle');
  const drawer = document.getElementById('statePanelDrawer');
  const header = drawer && drawer.querySelector('.state-panel__header');
  if (!panel || !toggle || !drawer) return {};

  let dragging = false, didMove = false, activeId = null;
  let startX, startY, originLeft, originTop;

  function isOpen() { return drawer.classList.contains('is-open'); }

  function updateDrawerLayout(left, top) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const tw = toggle.offsetWidth  || 180;
    const th = toggle.offsetHeight || 44;
    const isBottom = top + th / 2 > vh / 2;
    const isRight  = left + tw / 2 > vw / 2;

    if (isBottom) { drawer.style.bottom = (th + 8) + 'px'; drawer.style.top    = ''; }
    else          { drawer.style.top    = (th + 8) + 'px'; drawer.style.bottom = ''; }
    if (isRight)  { drawer.style.right = '0'; drawer.style.left  = ''; }
    else          { drawer.style.left  = '0'; drawer.style.right = ''; }
    drawer.style.transformOrigin =
      `${isBottom ? 'bottom' : 'top'} ${isRight ? 'right' : 'left'}`;
  }

  function clampPos(left, top) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const pw = toggle.offsetWidth  || 180;
    const ph = toggle.offsetHeight || 44;
    return {
      left: Math.max(MARGIN, Math.min(vw - pw - MARGIN, left)),
      top:  Math.max(MARGIN, Math.min(vh - ph - MARGIN, top)),
    };
  }

  function setPos(left, top, save) {
    const c = clampPos(left, top);
    panel.style.left = c.left + 'px';
    panel.style.top  = c.top  + 'px';
    updateDrawerLayout(c.left, c.top);
    if (save) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch(e) {} }
  }

  function ensureDrawerInViewport() {
    if (!isOpen()) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const left = parseFloat(panel.style.left) || 0;
    const top  = parseFloat(panel.style.top)  || 0;
    const tw = toggle.offsetWidth  || 180, th = toggle.offsetHeight || 44;
    const dh = drawer.offsetHeight || 300,  dw = drawer.offsetWidth  || 296;
    const isBottom = top + th / 2 > vh / 2;
    const isRight  = left + tw / 2 > vw / 2;

    let nl = left, nt = top;
    if (isBottom) { if (top - th - 8 - dh < MARGIN) nt = MARGIN + dh + 8 + th; }
    else          { if (top + th + 8 + dh > vh - MARGIN) nt = vh - MARGIN - dh - 8 - th; }
    if (isRight)  { if (left + tw - dw < MARGIN) nl = MARGIN + dw - tw; }
    else          { if (left + dw > vw - MARGIN) nl = vw - MARGIN - dw; }

    if (nl !== left || nt !== top) {
      panel.style.transition = 'left 180ms ease, top 180ms ease';
      setPos(nl, nt, true);
      setTimeout(() => { panel.style.transition = ''; }, 200);
    }
  }

  function initPos() {
    let saved;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) {}
    if (saved && typeof saved.left === 'number') {
      setPos(saved.left, saved.top, false);
    } else {
      requestAnimationFrame(() => {
        const vw = window.innerWidth, vh = window.innerHeight;
        setPos(
          vw - (toggle.offsetWidth  || 180) - MARGIN - 4,
          vh - (toggle.offsetHeight || 44)  - MARGIN - 4,
          false
        );
      });
    }
  }

  function beginDrag(e) {
    dragging = false; didMove = false;
    startX = e.clientX; startY = e.clientY;
    originLeft = parseFloat(panel.style.left) || 0;
    originTop  = parseFloat(panel.style.top)  || 0;
    activeId   = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onMove(e) {
    if (activeId === null || e.pointerId !== activeId) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (!didMove && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      didMove = true; dragging = true;
      panel.classList.add('is-dragging');
      panel.style.transition = 'none';
    }
    if (dragging) setPos(originLeft + dx, originTop + dy, false);
  }

  function onUp(e) {
    if (activeId === null || e.pointerId !== activeId) return;
    const wasClick = !didMove;
    if (dragging) {
      setPos(parseFloat(panel.style.left) || 0, parseFloat(panel.style.top) || 0, true);
      panel.classList.remove('is-dragging');
      panel.style.transition = '';
      if (isOpen()) requestAnimationFrame(ensureDrawerInViewport);
    } else if (wasClick && !e.target.closest('.state-panel__header')) {
      togglePanel();
    }
    dragging = false; didMove = false; activeId = null;
  }

  function onCancel() {
    panel.classList.remove('is-dragging');
    panel.style.transition = '';
    dragging = false; didMove = false; activeId = null;
  }

  toggle.addEventListener('pointerdown', function(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    beginDrag(e);
  });
  if (header) {
    header.addEventListener('pointerdown', function(e) {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      if (e.target.closest('button')) return;
      beginDrag(e);
    });
  }
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup',   onUp);
  document.addEventListener('pointercancel', onCancel);
  window.addEventListener('resize', () => {
    setPos(parseFloat(panel.style.left) || 0, parseFloat(panel.style.top) || 0, true);
  });

  initPos();
  return { ensureDrawerInViewport };
})();

function togglePanel() {
  const drawer = document.getElementById('statePanelDrawer');
  if (!drawer) return;
  drawer.classList.toggle('is-open');
  if (drawer.classList.contains('is-open')) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (_spc && _spc.ensureDrawerInViewport) _spc.ensureDrawerInViewport();
    }));
  }
}

// ─── Init: renderiza estado default de cada módulo ──────────
document.addEventListener('DOMContentLoaded', () => {
  render('[module-id]', '[default-state]');
  // repita para cada módulo

  // marca página atual na lista de páginas dinamicamente
  document.querySelectorAll('.page-item[href]').forEach(item => {
    if (window.location.href.includes(item.getAttribute('href'))) {
      item.classList.add('is-current');
    }
  });
});
```

### Passo 6 — CHAIN obrigatório: acionar `playground-sync-tokens`

Após concluir os Passos 1–5, acione imediatamente a skill `playground-sync-tokens`:

```
Use a playground-sync-tokens skill para sincronizar os tokens do DS Dasa neste protótipo.
```

> **Por quê é obrigatório:** o CSS inicial do protótipo usa `--primary: #0037FF` como valor de fallback. A `playground-sync-tokens` substitui todos os hardcodes pelos valores reais do Design System Dasa via Figma MCP — garantindo que o protótipo sempre reflita o estado atual do DS, não uma aproximação estática.
>
> **Se o Figma MCP não estiver disponível:** a `playground-sync-tokens` oferece fallback manual. O protótipo pode ser entregue mesmo sem o MCP, mas o CHAIN ainda deve ser acionado para que o usuário tome a decisão consciente.

---

## Modo B — Operações de atualização iterativa

Quando o painel já existe no arquivo, execute apenas a operação solicitada. Leia o arquivo primeiro, localize os blocos relevantes e faça edits cirúrgicos.

### Criar novo arquivo de playground

Quando um novo `.html` é criado em `docs/playground/`, execute estas etapas **obrigatoriamente**:

1. **No novo arquivo:** injete o state panel canônico completo via Modo A, usando `nav360-home.html` como referência de implementação. O arquivo nunca deve ser entregue com um state panel simplificado ou sem abas.
2. **Em todos os arquivos existentes:** adicione um `<a class="page-item" href="[novo-arquivo.html]">` no `<div class="page-list">` de cada arquivo já presente no diretório.
3. **No próprio novo arquivo:** inclua links para todos os arquivos já existentes na `<div class="page-list">` — o JS marca `is-current` dinamicamente, não hardcode.

> **Regra de consistência:** a tab "Páginas" de qualquer arquivo deve sempre listar **todos** os arquivos `.html` do diretório. Um arquivo ausente da lista quebra a navegação do playground.

### Adicionar uma página ao painel

Adicione um `<a class="page-item" href="[arquivo.html]">` no `<div class="page-list">` de **todos** os arquivos do playground (o `is-current` é aplicado dinamicamente pelo JS — não hardcode).

### Adicionar um estado a um módulo existente

1. Adicione `templates.[module-id].[new-state] = () => \`...\`` no objeto `templates`
2. Adicione `<button class="state-btn" onclick="setState('[module-id]','[new-state]',this)">[Label]</button>` no grupo `#btns-[module-id]`

### Adicionar um módulo novo

1. Adicione a entrada em `templates` com todos os seus estados
2. Adicione a entrada em `moduleMap`
3. Adicione o bloco `.state-panel__module` + `.state-panel__divider` no drawer
4. Adicione `render('[module-id]', '[default-state]')` no `DOMContentLoaded`

### Mudar o estado default de um módulo

1. No `DOMContentLoaded`, troque o `stateKey` passado para `render()`
2. No HTML do drawer, mova `is-active` para o botão do novo estado default

### Remover um estado de um módulo

Confirme com o usuário qual estado e módulo específico antes de prosseguir.

1. Remova `templates.[module-id].[state]`
2. Remova o `<button>` correspondente no grupo `#btns-[module-id]`
3. Se era o estado default, defina um novo default (Passo "Mudar o estado default")

### Remover um módulo inteiro

Confirme com o usuário qual módulo específico antes de prosseguir.

1. Remova a entrada de `templates`
2. Remova a entrada de `moduleMap`
3. Remova o bloco `.state-panel__module` + seu `.state-panel__divider` no drawer
4. Remova a linha `render()` correspondente no `DOMContentLoaded`

---

## Output esperado

Após execução (Modo A ou B), verifique:

- [ ] Botão toggle visível com posição inicial canto inferior direito (via JS `initPos`)
- [ ] Drawer abre e fecha ao clicar (click sem arrastar) no botão toggle
- [ ] Arrastar o toggle (ou o header quando drawer aberto) reposiciona o painel — threshold 5px
- [ ] Drag funciona múltiplas vezes consecutivas sem travar (listeners no `document`)
- [ ] Posição persiste ao recarregar a página (`localStorage` key `dasa-playground-panel-pos`)
- [ ] Toggle confinado à viewport via `clampPos` baseado no tamanho do toggle (não do drawer)
- [ ] Drawer abre na direção correta (acima ou abaixo do toggle, JS `updateDrawerLayout`)
- [ ] Ao abrir o drawer, `ensureDrawerInViewport` ajusta posição se ele sair da tela
- [ ] Toggle tem `min-height: 44px` (WCAG 2.5.5 touch target)
- [ ] Drawer tem `width: min(296px, calc(100vw - 24px))` (responsivo mobile)
- [ ] No mobile (≤600px) o toggle mostra apenas o ícone, sem texto
- [ ] Abas "Páginas" e "Estados" presentes e funcionais (`switchTab` injetado no JS)
- [ ] Tab "Páginas" lista **todos** os `.html` do diretório — nenhum arquivo ausente
- [ ] Tab "Páginas" marca a página atual com `is-current` via JS (não hardcode)
- [ ] Cada módulo tem `state-panel__module-header` com label + `state-panel__active-badge`
- [ ] O badge de cada módulo atualiza ao trocar estado (verificar `setState` inclui `activeBadge.textContent`)
- [ ] O estado default de cada módulo está com `is-active` e já renderizado ao abrir a página
- [ ] Clicar em qualquer botão troca o conteúdo do módulo correspondente sem recarregar a página
- [ ] Nenhum estilo existente do protótipo foi alterado
- [ ] `--primary` está definido no `:root` (inserir `#0037FF` como fallback se ausente)
- [ ] Toggle tem `id="statePanelToggle"` (necessário para o drag JS)

## Preservação em refactors estruturais

Quando qualquer skill ou tarefa modificar a estrutura HTML de um arquivo de playground (ex: refactor de layout, troca de nav, reorganização de seções), o agente deve:

1. **Verificar** que o bloco `<!-- ─── Float State Panel -->` ainda existe **após** as edições
2. **Verificar** que a tab "Páginas" continua com todos os arquivos do diretório
3. **Nunca** incluir o bloco `.state-panel` em um `<aside>`, `.shell`, `.sidebar` ou outro container que possa ser removido — o painel deve ser filho direto do `<body>`

> A causa mais comum de perda silenciosa é um refactor que remove um container (`<aside>`) sem perceber que o state panel foi colocado dentro dele por engano em alguma iteração anterior. Sempre leia a estrutura completa antes de remover blocos.

---

## Notas

- O painel opera inteiramente no cliente — sem dependências externas, sem build step
- Templates são funções `() => string` para permitir interpolação dinâmica quando necessário
- O `moduleMap` desacopla o `module-id` do painel do `id` real do elemento DOM — útil quando o elemento DOM tem id longo ou diferente da nomenclatura semântica do painel
- Referência canônica de implementação completa: `docs/playground/nav360-home.html`
