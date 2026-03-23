---
title: Design System — Decisões Dasa
tags: [design-system]
updated: 2026-03-19
---

# Design System — Decisões Dasa

> **Versão:** 2.0 | **Atualizado:** 2026-03-09 | **Status:** ✅ Estável

Este documento contém **decisões de design e critérios de uso** — o *porquê* e o *quando*, não o *o quê*.

**Fonte de verdade para valores (tokens, componentes, variantes):** Figma, via MCP ou [`tokens/alm-tokens.json`](../tokens/alm-tokens.json) para referência offline.

---

## Sistema de cores

### Decisão primária: azul, não vermelho

A cor primária da Dasa é **azul** (`--primary`, `Brand/Primary Shades/60` no Figma). O vermelho (`--red-*`) pertence à marca Delboni — nunca use como cor primária em produtos Dasa.

### Tokens semânticos vs. tokens de paleta

Prefira sempre **tokens semânticos** (`--primary`, `--success`, `--warning`, `--error`, `--info`) em vez de tokens de paleta (`--dasa-03`, `--red-80`). Use os tokens de paleta apenas quando não houver equivalente semântico (ex: brand moments, ilustrações).

| Situação | Token correto | Não usar |
|---|---|---|
| Botão principal, link, destaque | `--primary` | `--dasa-03` diretamente |
| Mensagem de confirmação | `--success` | `--green-100` |
| Alerta/aviso | `--warning` | `--yellow-100` |
| Erro de validação | `--error` | `--red-80` |
| Info/dica | `--info` | `--blue-90` |

### Quando usar tokens de marca (`--dasa-01` a `--dasa-06`)

Esses tokens carregam a identidade visual da Dasa. Use em:
- Headers e banners de marca
- Ilustrações e elementos decorativos
- Contextos de comunicação institucional

Evite em: estados de sistema (erro, sucesso), textos longos, backgrounds de formulário.

---

## Tipografia

### Fonte

Dasa Sans é a fonte exclusiva do sistema — Regular (400), Medium (500), Bold (700). Nunca substitua por fontes de sistema ou web genéricas.

### Critério de escolha: Heading vs. Body

- **Heading** (`Web/Heading/*`): line-height 125% — compactação intencional para títulos que precisam de densidade visual. Use para hierarquia, não para legibilidade de texto corrido.
- **Body** (`Web/Body/*`): line-height 150% — espaçamento otimizado para leitura. Use para parágrafos, descrições, labels longos.

Nunca aplique estilo Heading em texto corrido, nem Body em títulos de tela.

### Hierarquia em mobile

Mobile-first: parta do H5/H4 (20–24px) para títulos de tela. H1/H2 (48–40px) apenas para momentos de destaque editorial — não como padrão.

---

## Espaçamento

### Escala semântica

O sistema usa nomes semânticos para spacing (Quark → Giant), não valores numéricos soltos. A escala está em `alm-tokens.json` (coleção `4 - Numbers`). Use sempre a escala — nunca valores arbitrários.

### Referências de espaçamento

- **Cards:** padding 60px, gap interno 30px — esses valores reforçam a identidade de generosidade visual do DS Dasa.
- **Breakpoint base:** 375px. Todas as decisões de espaçamento começam aqui.

---

## Componentes — Decisões de design

### Touch targets: 44px mínimo

Todo elemento interativo (botão, link, campo, ícone clicável) deve ter `min-height: 44px` e `min-width: 44px`. Razão dupla:
1. **WCAG 2.1 AA** (critério 2.5.5)
2. **Thumbzone mobile**: polegares adultos têm precisão ~44px em vidro

Não negocie esse valor — ele não é estético, é acessibilidade.

### Border radius: identidade visual

- Cards: 60px — radius generoso é identidade visual do DS Dasa, não detalhe
- Botões: pill (radius máximo) para CTAs primários; 12px para elementos secundários
- Inputs: 12px — menor que card para hierarquia visual clara

### Sombras: elevação, não decoração

Use sombras para comunicar hierarquia de elevação, não para efeito visual:
- `Shadow/01` (mais suave): cards e elementos de base
- `Shadow/04` (mais forte): modais, drawers, elementos sobrepostos

Nunca empilhe sombras ou use fora da hierarquia.

### Botões

- CTA primário: sempre sticky na base da tela em mobile (não flutuante, não inline)
- Texto: infinitivo + complemento, 2–3 palavras (ver `copy-rules.md`)
- Estado de loading: substituir texto por spinner — nunca desabilitar sem feedback

### Formulários

- Labels sempre visíveis — nunca use placeholder como substituto de label
- Validação: inline (em tempo real para formato) + on-blur (para completude) + on-submit (resumo)
- Máscaras obrigatórias: CPF, telefone, CEP — sem elas o usuário não sabe o formato esperado

---

## Acessibilidade — baseline

| Critério | Valor | Norma |
|---|---|---|
| Contraste texto normal | ≥ 4.5:1 | WCAG AA |
| Contraste texto grande (18px+) | ≥ 3:1 | WCAG AA |
| Touch target mínimo | 44×44px | WCAG 2.5.5 |
| Navegação por teclado | todos os fluxos | WCAG 2.1 |
| Feedback de estado | visual + programático | WCAG 4.1.3 |

Dasa Sans tem boa legibilidade, mas confirme contraste sempre que usar tons claros sobre backgrounds.

---

## Grid e breakpoints

| Breakpoint | Contexto |
|---|---|
| 375px | **Base de decisão** — mobile padrão, todas as escolhas de layout partem daqui |
| 768px | Tablet — ajustes de colunas |
| 1024px | Desktop — layout expandido |
| 1440px | Desktop grande |

A maioria dos usuários Dasa está em mobile. Breakpoints maiores são progressivos, nunca o ponto de partida.

---

## Animações — critério de uso

- `duration-fast` (150ms): hover, toggles, mudanças de estado pequenas
- `duration-normal` (300ms): transições de tela, modais
- `duration-slow` (500ms): apenas animações editoriais/brand moments

Animações de loading: prefira **skeleton screens** para conteúdo que demora >200ms. Spinners apenas para ações discretas (botão de submit).

---

## Referências

- Valores de token: [`tokens/alm-tokens.json`](../tokens/alm-tokens.json) (fonte offline)
- Figma (fonte viva): variáveis via MCP
- Regras de copy: [`copy-rules.md`](copy-rules.md)
- Princípios de UX: [`ux-guidelines.md`](ux-guidelines.md)
- Guidelines de componentes: [`specs/figma-mapping.md`](specs/figma-mapping.md)
