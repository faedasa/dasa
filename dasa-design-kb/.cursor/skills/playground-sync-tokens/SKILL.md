---
name: playground-sync-tokens
description: "Sincroniza os tokens do Design System Dasa (Figma) com o bloco :root dos protótipos HTML em docs/playground/. Usa get_variable_defs via Figma Desktop MCP para buscar os valores reais e faz edits cirúrgicos — nunca regenera o protótipo."
version: "1.0"
language: pt-BR
allowed-tools: [Read, StrReplace, Glob]
tags: [playground, tokens, design-system, figma-mcp, css-variables]
---

# Skill: playground-sync-tokens

Sincroniza os CSS custom properties do `:root` nos protótipos HTML do playground com os valores reais do Design System Dasa no Figma, via Figma Desktop MCP.

> **Regra inviolável:** esta skill faz edits cirúrgicos no bloco `:root`. Nunca regenera o protótipo inteiro, nunca remove o painel de estados, nunca altera estilos fora do `:root`.

---

## Metadata

| Campo | Detalhe |
|---|---|
| **Quando usar** | "sincronize os tokens com o Figma", "atualize as cores do playground", "os tokens do playground estão desatualizados", "use os tokens do DS Dasa no protótipo" |
| **Quando NÃO usar** | Arquivo não está em `docs/playground/` → skill não se aplica. Figma MCP não disponível → informe e use fallback manual (ver seção Fallback). |
| **Inputs necessários** | Figma Desktop App aberto com Dev Mode ativo (`Shift+D`). File key do arquivo de DS da Dasa (ver `docs/specs/figma-mcp.md`). Caminho do arquivo HTML alvo — ou `todos` para aplicar em todos os arquivos do playground. |
| **Output esperado** | Bloco `:root` atualizado em cada HTML alvo com os valores reais dos tokens Dasa. Relatório de mudanças: tokens atualizados, tokens sem correspondência no Figma, tokens adicionados. |
| **Chains to** | — (terminal neste fluxo) |
| **Called by** | Acionada diretamente pelo usuário. |
| **Suggests** | `quality-gate` — após sincronização, para validar os tokens injetados. `kb-commit` — após validação, para commitar os protótipos atualizados. |
| **Rejects to** | — |
| **Arquivos de referência** | `docs/specs/figma-mapping.md`, `docs/specs/figma-mcp.md` |

---

## Pré-requisito: Figma Desktop MCP

Antes de qualquer passo, verifique se o Figma MCP está disponível chamando `get_variable_defs`.

- **Se disponível:** prossiga normalmente.
- **Se não disponível:** informe o usuário:

  > "O Figma Desktop App parece estar fechado ou sem Dev Mode ativo. Abra o Figma Desktop → pressione `Shift+D` → reinicie o Cursor se necessário. Consulte `docs/specs/figma-mcp.md` para troubleshooting completo.
  >
  > Quer usar o Fallback Manual enquanto isso? Posso atualizar os valores com base na tabela em `docs/specs/figma-mapping.md`."

---

## Tabela canônica de mapeamento

Esta tabela define quais variáveis Figma correspondem a quais CSS custom properties. É a fonte de verdade para o mapeamento durante a sincronização.

| CSS custom property | Coleção Figma (variável) | Uso semântico |
|---|---|---|
| `--primary` | `1 - Brand > Nav > Brand/Primary Shades/60` | Cor de ação principal, links, CTAs |
| `--primary-hover` | `1 - Brand > Nav > Brand/Primary Shades/50` | Hover state de elementos primários |
| `--success` | `_Base/_Common Tones/Green/100` | Confirmações, sucesso |
| `--warning` | `_Base/_Common Tones/Yellow/100` | Alertas, avisos |
| `--error` | `_Base/_Common Tones/Red/80` | Erros de validação |
| `--info` | `_Base/_Common Tones/Acqua ou Blue/90` | Informações contextuais |
| `--shadow-xs` | `Effects > Shadow/01` | Elevação base (cards de lista) |
| `--shadow-lg` | `Effects > Shadow/04` | Elevação alta (modais, drawers) |
| `--size-60` | `Sizes/size-60` | Padding de card, radius de card |

> **Nota:** valores vivos estão no Figma — esta tabela documenta a nomenclatura. O Figma MCP retorna os valores reais. Se o `figma-mapping.md` divergir desta tabela, o `figma-mapping.md` é a fonte primária.

---

## Workflow

**Siga os passos em ordem. Não pule etapas.**

### Passo 1 — Identificar o escopo

Determine quais arquivos atualizar:

- **Um arquivo específico:** usuário informou o path (ex: `docs/playground/nav360-home.html`)
- **Todos os arquivos:** usuário disse "todos" ou "todos os protótipos" → liste todos os `.html` em `docs/playground/` com Glob

### Passo 2 — Buscar os tokens no Figma

Use `get_variable_defs` com o file key do arquivo de DS da Dasa:

```
get_variable_defs(fileKey=":fileKey")
```

- O file key está documentado em `docs/specs/figma-mcp.md`
- Se o usuário não informar e o arquivo de referência não tiver, pergunte: *"Qual é o file key do arquivo de DS no Figma? (aparece na URL: `figma.com/design/[FILE_KEY]/...`)"*

Do retorno, extraia os valores correspondentes às variáveis da tabela canônica acima. Para cada variável:
- Se encontrada → registre o valor atual (hex, shadow, rem, etc.)
- Se não encontrada → marque como `⚠️ sem correspondência` e mantenha o valor atual do arquivo

### Passo 3 — Ler o(s) arquivo(s) alvo

Leia cada HTML alvo. Localize o bloco `:root` — ele está dentro do `<style>` do `<head>`.

Identifique:
1. Quais das CSS custom properties da tabela canônica já existem no `:root`
2. Quais precisam ser adicionadas (existem no DS mas não no `:root` atual)
3. Quais estão com valores hardcoded diferentes dos valores reais do Figma

### Passo 4 — Editar cirurgicamente o `:root`

Para cada arquivo, faça um único `StrReplace` trocando o bloco `:root` inteiro por uma versão atualizada.

**Regras do edit:**
- Preserve todas as custom properties existentes no `:root` que não estejam na tabela canônica (ex: variáveis locais do protótipo)
- Adicione as novas propriedades no início do bloco, antes das variáveis locais
- Use um comentário de seção para separar tokens DS de variáveis locais:

```css
:root {
  /* ─── Design System Dasa — sincronizado via Figma MCP ──── */
  --primary: [valor do Figma];
  --primary-hover: [valor do Figma];
  --success: [valor do Figma];
  --warning: [valor do Figma];
  --error: [valor do Figma];
  --info: [valor do Figma];
  --shadow-xs: [valor do Figma];
  --shadow-lg: [valor do Figma];
  --size-60: [valor do Figma];

  /* ─── Variáveis locais do protótipo ────────────────────── */
  /* [preservar as variáveis locais existentes aqui] */
}
```

### Passo 5 — Relatório de sincronização

Após todos os edits, exiba o relatório:

```markdown
## Sync de Tokens — Relatório

**Fonte:** Figma DS (file key: [key]) via Figma Desktop MCP
**Data:** [YYYY-MM-DD]
**Arquivos atualizados:** [N]

### Tokens sincronizados

| Token | Valor anterior | Valor novo (Figma) | Status |
|---|---|---|---|
| `--primary` | `#0037FF` | `#[hex real]` | ✅ atualizado |
| `--primary-hover` | *(ausente)* | `#[hex real]` | ✅ adicionado |
| `--success` | *(ausente)* | `#[hex real]` | ✅ adicionado |
| ... | ... | ... | ... |

### Tokens sem correspondência no Figma

| Token | Valor mantido | Observação |
|---|---|---|
| `--[token]` | `[valor]` | ⚠️ Variável não encontrada — manter até resolver no DS |

### Variáveis locais preservadas

[lista das variáveis locais que não foram tocadas]
```

---

## Fallback Manual (Figma MCP indisponível)

Se o Figma MCP não estiver acessível, ofereça o fallback:

1. Leia `docs/specs/figma-mapping.md` — a tabela de mapeamento tem os valores de referência
2. Pergunte ao usuário quais valores atualizar ou se tem os hex codes em mãos
3. Aplique o mesmo processo de edit cirúrgico no `:root` com os valores informados
4. Sinalize claramente no relatório: `⚠️ Sincronização manual — valores não verificados via MCP`

---

## Output esperado

Após execução, verifique:

- [ ] O bloco `:root` de cada arquivo alvo contém a seção `/* Design System Dasa */`
- [ ] Todos os tokens da tabela canônica estão presentes com valores do Figma
- [ ] Nenhuma variável local foi removida
- [ ] O painel de estados (`.state-panel`) e todos os estilos do protótipo estão intactos
- [ ] O relatório lista claramente o que foi atualizado, adicionado e o que ficou sem correspondência

---

## Notas

- Esta skill não toca em nada fora do bloco `:root` — não altera HTML, JS, ou qualquer outro trecho de CSS
- `get_variable_defs` é mais leve que `get_design_context` — use-o sempre que o objetivo for apenas tokens, não layout
- Se o arquivo de DS da Dasa tiver coleções separadas (ex: `Brand`, `Base`, `Effects`, `Sizes`), pode ser necessário chamar `get_variable_defs` uma vez por coleção — o MCP retorna por escopo do node; use o node raiz do arquivo para cobrir todas as coleções
- Referência canônica de tokens e nomenclatura: `docs/specs/figma-mapping.md`
- Referência de configuração do Figma MCP: `docs/specs/figma-mcp.md`
