---
name: implement-design
description: Translates Figma designs into production-ready code with 1:1 visual fidelity. Use when implementing UI from Figma files, when user mentions "implement design", "generate code", "implement component", "build Figma design", provides Figma URLs, or asks to build components matching Figma specs. Requires Figma Desktop MCP server connection.
---

# Implement Design

> **Pré-requisito:** Figma Desktop App aberto com Dev Mode ativo (`Shift+D`).
> O MCP server roda localmente em `127.0.0.1:3845` — sem isso as tools não estão disponíveis.
> Guia completo: [`docs/specs/figma-mcp.md`](docs/specs/figma-mcp.md)

## Metadata

| Campo | Detalhe |
|---|---|
| **Quando usar** | "implemente esse frame", "converta o Figma em código", "gere o código desse componente", "use a implement-design skill", "build esse design", ao receber link Figma ou URL com `node-id` |
| **Quando NÃO usar** | Revisão de copy isolada → use `copy-review`. Validação de código já gerado → use `quality-gate`. Commit de mudanças no KB → use `kb-commit`. |
| **Inputs necessários** | Link Figma (URL com `node-id`) OU seleção ativa no Figma Desktop. Figma Desktop App aberto com Dev Mode ativo (`Shift+D`). |
| **Output esperado** | Screen contract confirmado + código production-ready usando CSS variables, componentes reutilizados do DS, checklist de paridade visual preenchido. |
| **Chama** | `screen-contract` — obrigatoriamente no Step 5 (CHAIN). `quality-gate` — obrigatoriamente ao final do Step 8 (CHAIN). |
| **Chamada por** | Acionada diretamente pelo usuário. Pipeline completo em [`SKILLS.md`](../../SKILLS.md). |
| **Arquivos de referência** | `docs/design-system.md`, `docs/specs/figma-mapping.md`, `docs/copy-rules.md`, `docs/specs/figma-mcp.md` |

---

## Overview

This skill provides a structured workflow for translating Figma designs into production-ready code with pixel-perfect accuracy. It ensures consistent integration with the Figma Desktop MCP server, proper use of design tokens, and 1:1 visual parity with designs.

## Prerequisites

- Figma Desktop MCP server must be connected and accessible
  - Before proceeding, verify the server is connected by checking if Figma MCP tools (e.g., `get_design_context`) are available in Cursor.
  - If the tools are not available: open the Figma Desktop App, activate Dev Mode (`Shift+D`), and restart Cursor if needed. See [`docs/specs/figma-mcp.md`](docs/specs/figma-mcp.md) for full troubleshooting.
- User must provide a Figma URL **or** have a frame selected in the Figma Desktop App
- Project should have an established design system or component library (preferred)

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Get Node ID

#### Option A: Selection-based (fastest — Desktop MCP only)

If the user has a frame or component selected in the Figma Desktop App, prompt directly:

```
Implement my current Figma selection.
```

The Desktop MCP reads the selection automatically — no URL needed.

#### Option B: Parse from Figma URL

When the user provides a Figma URL, extract the file key and node ID to pass as arguments to MCP tools.

**URL format:** `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

**Extract:**

- **File key:** `:fileKey` (the segment after `/design/`)
- **Node ID:** `1-2` (the value of the `node-id` query parameter)

**Example:**

- URL: `https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15`
- File key: `kL9xQn2VwM8pYrTb4ZcHjF`
- Node ID: `42-15`

### Step 2: Fetch Design Context

Run `get_design_context` with the extracted file key and node ID.

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

This provides the structured data including:

- Layout properties (Auto Layout, constraints, sizing)
- Typography specifications
- Color values and design tokens
- Component structure and variants
- Spacing and padding values

**If the response is too large or truncated:**

1. Run `get_metadata(fileKey=":fileKey", nodeId="1-2")` to get the high-level node map
2. Identify the specific child nodes needed from the metadata
3. Fetch individual child nodes with `get_design_context(fileKey=":fileKey", nodeId=":childNodeId")`

**For token-only queries** (when you only need color/spacing values, not the full layout):

```
get_variable_defs(fileKey=":fileKey", nodeId="1-2")
```

This is lighter than `get_design_context` and returns only the variables/styles used in the selection.

### Step 3: Capture Visual Reference

Run `get_screenshot` with the same file key and node ID for a visual reference.

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

This screenshot serves as the source of truth for visual validation. Keep it accessible throughout implementation.

### Step 4: Check Code Connect

Before generating any code, check if components have Code Connect mappings:

```
get_code_connect_map(fileKey=":fileKey", nodeId="1-2")
```

- **If a mapping exists:** use the `codeConnectSrc` path directly — never recreate a component that already exists
- **If no mapping:** consult [`docs/specs/figma-mapping.md`](docs/specs/figma-mapping.md) for component paths and usage rules

Report which components have Code Connect active and which don't before starting implementation.

### Step 5: Build Screen Contract

**Acione a skill `screen-contract` (CHAIN obrigatório) passando:**
- O resultado de `get_design_context` do Step 2
- O screenshot do Step 3
- O mapeamento de Code Connect do Step 4

```
Use a screen-contract skill para montar o contrato estrutural desse frame.
```

A skill `screen-contract` irá:
1. Mapear regiões e hierarquia da tela
2. Vincular cada região a componentes do DS Dasa
3. Listar todos os tokens que serão usados
4. Extrair textos e estados necessários
5. Registrar incertezas explicitamente
6. Apresentar o contrato JSON + resumo legível

**Aguarde a confirmação do usuário sobre o contrato antes de prosseguir.**

> O screen contract é a fonte de verdade para os Steps 6 e 7. Toda decisão de componente, token e layout deve referenciar o contrato — nunca o frame Figma diretamente.

### Step 6: Download Required Assets

Download any assets (images, icons, SVGs) returned by the Figma MCP server.

**IMPORTANT:** Follow these asset rules:

- If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly
- DO NOT import or add new icon packages — all assets should come from the Figma payload
- DO NOT use or create placeholders if a `localhost` source is provided
- Assets are served through the Figma MCP server's built-in assets endpoint

### Step 7: Translate to Project Conventions

Translate the Figma output into this project's framework, styles, and conventions, **usando o screen contract do Step 5 como restrição**.

**Key principles:**

- Tratar o screen contract como fonte de verdade — use apenas os componentes e tokens listados no contrato
- Treat the Figma MCP output (typically React + Tailwind) as a representation of design and behavior, not as final code style
- Replace Tailwind utility classes with CSS variables from the project's design tokens (`var(--primary)`, `var(--size-60)`)
- Reuse existing components (buttons, cards, inputs, overlays) instead of duplicating functionality — se o contrato listou `code_connect`, importar diretamente pelo path
- Use the project's color system, typography scale, and spacing tokens consistently — somente os tokens listados em `tokens_used` do contrato
- Respect existing routing, state management, and data-fetch patterns
- Se o contrato listou incertezas (`uncertainties`), resolva-as consultando o usuário antes de implementar a região afetada

### Step 8: Validate Against Figma + Contract

Before marking complete, validate the final UI against both the Figma screenshot and the screen contract.

**Checklist de paridade visual (Figma):**

- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font, size, weight, line height)
- [ ] Colors match exactly
- [ ] Interactive states work as designed (hover, active, disabled)
- [ ] Responsive behavior follows Figma constraints
- [ ] Assets render correctly
- [ ] Accessibility standards met (min 44px touch targets, visible labels, contrast ≥ 4.5:1)

**Checklist de conformidade com o contrato:**

- [ ] Todos os componentes listados no contract foram usados (sem substituições não declaradas)
- [ ] Nenhum componente novo foi criado sem estar no contrato
- [ ] Todos os tokens usados estão em `tokens_used` do contrato (sem valores hardcoded)
- [ ] Regiões do layout batem com `layout.regions` do contrato
- [ ] Estados implementados cobrem `content.states` do contrato
- [ ] Incertezas do contrato foram resolvidas e não resultaram em invenção de padrões

### Próximo passo obrigatório — acionar `quality-gate`

Após concluir os dois checklists acima, acione a skill `quality-gate` para análise estática independente do código gerado:

```
Use a quality-gate skill para revisar o código gerado acima.
```

A `quality-gate` fará uma segunda passagem cobrindo: tokens hardcoded, touch targets, acessibilidade, copy inline e componentes ad-hoc. É obrigatória antes de considerar a implementação pronta para revisão humana.

## Implementation Rules

### Component Organization

- Place UI components in the project's designated design system directory
- Follow the project's component naming conventions (see [`docs/specs/figma-mapping.md`](docs/specs/figma-mapping.md))
- Avoid inline styles unless truly necessary for dynamic values

### Design System Integration

- ALWAYS use components from the project's design system when possible
- Map Figma design tokens to project CSS variables — never hardcode color, spacing, or radius values
- When a matching component exists, extend it rather than creating a new one
- Document any new components added to the design system

### Code Quality

- Avoid hardcoded values — use CSS variables (`var(--primary)`, `var(--size-60)`)
- Keep components composable and reusable
- Mobile-first: start at 375px breakpoint
- CTA Primary: sticky at the bottom of the screen on mobile, not inline

## Common Issues and Solutions

### Issue: Figma output is truncated

**Cause:** The design is too complex or has too many nested layers.
**Solution:** Use `get_metadata` to get the node structure, then fetch specific nodes individually with `get_design_context`.

### Issue: Design doesn't match after implementation

**Cause:** Visual discrepancies between implemented code and the Figma design.
**Solution:** Compare side-by-side with the screenshot from Step 3. Check spacing, colors, and typography values in the design context data. Verifique também se os tokens e componentes usados são os que estão no screen contract do Step 5 — divergências frequentemente surgem de valores fora do contrato.

### Issue: Screen contract lista componente que não existe no código

**Cause:** O componente foi mapeado de `figma-mapping.md` mas ainda não foi implementado no projeto.
**Solution:** Registrar a lacuna, criar o componente mínimo seguindo o padrão do DS, documentar em `figma-mapping.md`, e sinalizar na revisão humana final.

### Issue: Assets not loading

**Cause:** The Figma MCP server's assets endpoint is not accessible or URLs are being modified.
**Solution:** Use the `localhost` URLs returned by the MCP directly without modification.

### Issue: Design token values differ from Figma

**Cause:** The project's design system tokens have different values than those specified in the Figma design.
**Solution:** Prefer project tokens for consistency but adjust spacing/sizing minimally to maintain visual fidelity.

### Issue: Tools not available in Cursor

**Cause:** Figma Desktop App is closed or Dev Mode is not active.
**Solution:** Open Figma Desktop App → activate Dev Mode (`Shift+D`) → restart Cursor if needed.
