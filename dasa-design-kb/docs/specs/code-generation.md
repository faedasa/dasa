---
title: Spec para geração de código — Design System Dasa
tags: [specs, code-generation]
updated: 2026-03-20
---

# Spec para geração de código — Design System Dasa

> **Versão:** 1.2 | **Uso:** Contrato para o agente de **Code generation** (Figma → scaffold compilável). Uma tela ou componente deve ser especificado nesta estrutura para o agente gerar código alinhado ao DS.

> **Atualização v1.2:** O "Screen Contract" automatiza e estende o template manual abaixo. Use a skill `screen-contract` para gerar o contrato a partir de frames Figma, screenshots ou briefs. O template manual permanece como referência e fallback quando a skill não for acionada.

Referências: `design-system.md`, `ux-guidelines.md`, `copy-rules.md`, `figma-mapping.md`. Spec técnica detalhada de referência: `legacy/fluxo-agendamento/dasa-agendamento-spec-tecnica.md`.

---

## Stack para geração (decisão canônica)

- **Plataforma alvo:** Web (mobile-first).
- **Stack de referência:** HTML/CSS com tokens em CSS variables; ou React + CSS modules / Tailwind usando tokens do `design-system.md`. (Flutter ou outro stack: documentar aqui quando definido.)
- **Design tokens:** Sempre referenciar `design-system.md` (cores, tipografia, spacing, radius). Não inventar valores.

---

## Screen Contract (automatizado via skill)

A forma preferida de produzir a spec de uma tela é acionar a skill `screen-contract`, que gera automaticamente o contrato JSON a partir do frame Figma, screenshot ou brief:

```
Use a screen-contract skill para montar o contrato estrutural desse frame.
```

A skill produz um objeto JSON com `screen_name`, `purpose`, `layout`, `components` (com Code Connect), `tokens_used`, `content`, `constraints` e `uncertainties` — e aguarda confirmação humana antes de liberar a geração de código.

O `screen-contract` é obrigatório no pipeline `implement-design` (Step 5) e é invocado automaticamente.

---

## Estrutura da spec manual (template de referência / fallback)

Use este template quando a skill `screen-contract` não for acionada, ou como referência para entender os campos do contrato JSON.

Para cada tela ou componente que o agente for gerar código, preencher:

### 1. Identificação

- **Nome da tela/componente:** (ex.: Card de exame, Resumo de agendamento)
- **Figma (frame/key):** (link ou identificador)
- **Breakpoint base:** 375px (mobile-first)

### 2. Tokens obrigatórios

- Cores: listar tokens usados (ex.: `--primary`, `--typeface-strong`, `--neutral-10`)
- Tipografia: estilos (ex.: Body/lg, Heading/md)
- Espaçamento: padding, gap (ex.: `--card-padding: 60px`)
- Radius / bordas: conforme `design-system.md`

### 3. Layout e estrutura

- Ordem dos blocos (header, conteúdo, CTA)
- Grid ou stack (vertical/horizontal)
- Estados: default, loading, empty, erro (quando aplicável)

### 4. Copy e acessibilidade

- Textos estáticos (se houver) seguindo `copy-rules.md`
- Labels, placeholders, mensagens de erro/validação
- Touch targets mínimos (44px), contraste WCAG AA

### 5. Comportamento (se aplicável)

- Validação (inline, on blur, on submit)
- Navegação (próximo, voltar)
- Dados dinâmicos (props/API)

---

## Exemplo resumido (Card de exame)

- **Tokens:** `--card-radius`, `--card-padding`, `--primary`, `--typeface-strong`, `--font-body`
- **Estrutura:** ícone/imagem, título, descrição, metadados (duração, jejum), preço, CTA "Agendar exame"
- **Estados:** default; opcional loading no CTA
- **Copy:** CTAs em infinitivo; "paciente", "convênio"; ver `copy-rules.md`

O agente de Code generation deve consumir esta spec + `design-system.md` (e opcionalmente o frame Figma via MCP) para gerar o scaffold.

---

## Decisões arquiteturais (learnings de referência)

Princípios consolidados para garantir code gen de alta assertividade:

- **Screen Contract como checkpoint obrigatório:** Nunca gerar UI diretamente de frame ou imagem sem produzir primeiro um contrato estrutural via `screen-contract`. O contrato é apresentado ao humano, confirmado, e só então a geração prossegue.
- **Templates como fundação:** Code gen confiável deve rodar **apenas sobre telas que usam templates oficiais** da biblioteca Figma. Telas "livres" aumentam risco de alucinação.
- **Não enviar Figma cru para a LLM:** Usar uma **estrutura intermediária (screen contract)** que filtre ruído e padronize nomes antes de passar para o modelo. O contrato é o blueprint — não o node JSON bruto.
- **Component concepts = figma-mapping:** O agente deve usar **apenas** os mapeamentos de `figma-mapping.md` para nomes e variantes de componentes — sem inventar nomes ou variantes. Isso está codificado no Step 3 da `screen-contract`.
- **Handoff em frame separado:** O frame enviado ao agente deve ser a tela limpa; anotações de handoff devem estar em um frame separado para não contaminar o contexto.
- **Code gerado = scaffold, revisão humana obrigatória:** O fluxo é iterativo, não single shot. O humano confirma o contrato antes da geração e revisa o resultado.
- **Validação pós-geração com Repair Mode:** `quality-gate` detecta divergências e oferece repair plan cirúrgico por bloco/região — não regenera tudo. Conversa com o insight de que dividir reduz erro (segmentação = maior assertividade).
- **Repair por bloco, não regeneração total:** Quando `quality-gate` reprovado, identificar a região do screen contract com issue, corrigir apenas aquele bloco, revalidar. Evitar regeneração completa.
