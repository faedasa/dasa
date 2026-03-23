---
name: screen-contract
description: "Transforma qualquer input (frame Figma, screenshot, brief textual ou variação de brainstorm) em um contrato estrutural JSON antes de qualquer geração de código. Use quando receber 'gere o contrato', 'monte o screen contract', antes de implementar uma tela, ou quando invocada por implement-design no Step 5."
version: "1.0"
language: pt-BR
allowed-tools: [Read, mcp__*]
tags: [design-system, contrato, pre-geracao, consistencia, figma]
---

# Skill: screen-contract

Converte qualquer input de design (Figma, screenshot ou brief) em um contrato estrutural JSON que restringe e orienta a geração de código, impedindo drift visual e invenção de tokens ou componentes fora do DS Dasa.

> **Regra central:** Nunca gerar UI diretamente de uma imagem ou descrição sem produzir primeiro um contrato estrutural. O contrato é um checkpoint humano — o modelo apresenta, o usuário confirma, a geração prossegue.

## Quando usar

- Invocada por `implement-design` no Step 5 (CHAIN automático)
- "gere o screen contract para esse frame"
- "monte o contrato antes de implementar"
- "quero ver o contrato antes do código"
- Quando output de `nav360-brainstorm` é aprovado para implementação

### Quando NÃO usar

- Validação de código já gerado → use `quality-gate`
- Revisão de textos isolados → use `copy-review`
- Commit de mudanças → use `kb-commit`

## Arquivos de referência

- `docs/design-system.md` — tokens semânticos, componentes, spacing, tipografia
- `docs/specs/figma-mapping.md` — catálogo de componentes e Code Connect paths
- `docs/copy-rules.md` — regras de copy para validação de textos extraídos
- `tokens/alm-tokens.json` — valores reais dos tokens (referência, não editar)

---

## Como executar

**Siga os passos em ordem. Não pule etapas.**

### Passo 1 — Identificar o tipo de input

Determine a origem do input recebido:

| Tipo | Sinal | Ação no Passo 2 |
|---|---|---|
| **Figma URL** | URL com `node-id` ou seleção ativa no Figma Desktop | Usar MCP `get_design_context` + `get_screenshot` |
| **Screenshot** | Imagem colada pelo usuário | Analisar regiões visualmente |
| **Brief textual** | Descrição da tela/componente em texto | Inferir regiões a partir da descrição |
| **Variação de brainstorm** | Output de `nav360-brainstorm` com partial contract | Completar os campos faltantes (`code_connect`, `tokens_used`) |

Se o tipo for ambíguo, pergunte ao usuário antes de prosseguir.

---

### Passo 2 — Extrair regiões, hierarquia e tokens visuais reais

Divida a tela em regiões semânticas. O objetivo é uma descrição estrutural, não pixel-perfect.

**Para input Figma — chamar AMBAS as ferramentas em paralelo:**

```
get_design_context(fileKey, nodeId)   → hierarquia de nodes, código de referência, screenshot
get_variable_defs(fileKey, nodeId)    → valores reais das variáveis (hex, font-family, spacing)
```

`get_variable_defs` retorna um mapa `{nome_variavel: valor}`, por exemplo:
```json
{
  "black": "#1b1e26",
  "primary/default": "#0047BB",
  "shadow/03": "0px 4px 16px rgba(0,0,0,0.08)",
  "font/family/sans": "Plus Jakarta Sans"
}
```
Esses valores alimentam o campo `visual_tokens.extracted` no contrato. **Nunca assuma valores — use sempre os retornados por `get_variable_defs`.**

Use a hierarquia de `get_design_context` para identificar regiões de topo nível (frames filhos, grupos principais). Prefira nomes semânticos (`header`, `card-area`, `cta-area`) em vez de nomes de layer Figma literais.

**Para screenshot ou brief:**

Descreva as regiões de cima para baixo seguindo a estrutura visual:
- Topo: navegação, header, breadcrumb
- Meio: conteúdo principal (cards, listas, formulários)
- Base: CTAs, barra fixa, rodapé

**Output intermediário esperado:**

```
Regiões identificadas:
1. header — navegação com botão voltar e título
2. card-area — card de resumo com dados do agendamento
3. info-area — alerta de instruções de preparo
4. cta-area — botão primário fixo na base

Tokens extraídos (get_variable_defs):
- font-family: Plus Jakarta Sans
- --primary: #0047BB
- --black: #1b1e26
- --shadow-03: 0px 4px 16px rgba(0,0,0,0.08)
```

---

### Passo 2b — Analisar arquivo alvo (quando fornecido)

Se um arquivo alvo foi especificado (ex: playground HTML existente, componente React):

1. **Ler o arquivo** com a ferramenta `Read`
2. **Extrair todas as CSS custom properties** definidas no `:root` ou em seletores globais
3. **Comparar** cada propriedade CSS contra os valores de `get_variable_defs`
4. **Produzir a lista de discrepâncias** → campo `visual_delta` no contrato

**Regras de comparação:**

| Situação | Ação |
|---|---|
| Valor CSS diferente do valor Figma | Registrar em `visual_delta` com `action: "corrigir"` |
| Propriedade CSS não existe no arquivo, mas Figma define | Registrar em `visual_delta` com `action: "adicionar"` |
| Font-family diferente do Figma | Registrar em `visual_delta` com `action: "import + atualizar var"` |
| Valor CSS igual ao Figma | Não registrar (sem delta) |

**Se nenhum arquivo alvo for fornecido:** pular este passo e deixar `visual_delta: []` no contrato.

---

### Passo 2c — Extrair anatomia de componentes

A partir do código de referência retornado por `get_design_context`, documente a estrutura interna dos componentes principais — não apenas o tipo, mas a hierarquia visual real.

**Regra:** descreva o que você vê na estrutura do código/node, não o que imagina. Use o formato:

```
[nome-componente]: [camada-externa { camada-interna-1 + camada-interna-2 }] + [outra-camada]
```

**Exemplo extraído de um card de exame:**
```
exam-card: header-azul { badge-data + chip-status + nome-exame + local } / body-branco { grid-2x2[jejum·duracao·preparo·resultado] + chip-cobertura + [btn-primary + btn-ghost] }
```

Registrar em `component_anatomy` no contrato. Se o componente for simples (sem hierarquia relevante), omitir da anatomia.

---

### Passo 3 — Mapear componentes do DS

Para cada região, identifique o componente correspondente no DS Dasa.

Leia `docs/specs/figma-mapping.md` para consultar o catálogo de componentes oficiais.

**Se o input for Figma, verifique Code Connect:**

```
get_code_connect_map(fileKey, nodeId)
```

Para cada componente:
- Se Code Connect retornar path → registrar em `code_connect`
- Se não retornar → registrar `null` e anotar que deve ser implementado conforme `figma-mapping.md`

**Regra:** Se um componente existente cobre o caso de uso, nunca criar ad-hoc. Registrar como componente existente com variante mais próxima.

---

### Passo 4 — Vincular tokens

Para cada região e componente, liste os tokens do DS Dasa que serão usados.

Consulte `docs/design-system.md` e a coleção `4 - Numbers` de `tokens/alm-tokens.json` para naming correto.

**Categorias obrigatórias:**

| Categoria | Tokens semânticos (preferir) | Tokens de paleta (evitar) |
|---|---|---|
| Cores | `--primary`, `--success`, `--error`, `--warning`, `--info` | `--dasa-03`, `--red-80` |
| Spacing | `--size-60`, `--size-24`, `--size-16` | valores `px` avulsos |
| Tipografia | `Heading/md`, `Body/lg` | tamanhos px literais |
| Radius | `--card-radius` (60px), `--button-radius` | valores px avulsos |
| Sombras | `--shadow-xs`, `--shadow-lg` | `box-shadow` custom |

**Regra:** Qualquer valor visual que não tenha token correspondente no DS deve aparecer em `uncertainties`, não em `tokens_used`.

---

### Passo 5 — Extrair conteúdo e estados

**Textos:** Extraia os textos visíveis (labels, CTAs, mensagens). Para cada CTA, aplique validação básica contra `docs/copy-rules.md`:
- Está em infinitivo + complemento?
- Tem 2–3 palavras?
- Sem ponto final?
- Sem termos proibidos ("Ver mais", "Continuar", "usuário")?

**Estados:** Identifique os estados que a tela/componente precisa suportar. Padrão mínimo: `default`. Adicionar quando aplicável: `loading`, `empty`, `error`, `success`.

**Interações:** Note comportamentos explícitos (scroll, expansão, modal, navegação).

---

### Passo 6 — Registrar incertezas

Liste explicitamente qualquer ambiguidade detectada. **Nunca chute — registre em `uncertainties`.**

Exemplos de incertezas válidas:
- "Ícone do header: usar asset do Figma via MCP ou ícone da biblioteca do DS?"
- "Estado de erro do card: especificação não encontrada no frame — assumir padrão do DS?"
- "Spacing entre card e CTA: valor não identificado no node — usar `--size-24` por padrão?"

---

### Passo 7 — Montar e apresentar o contrato

Gere o objeto JSON do contrato e um resumo legível. **Aguarde confirmação do usuário antes de prosseguir para geração de código.**

---

## Template do Screen Contract

```json
{
  "screen_name": "Nome da tela ou componente",
  "purpose": "O que o usuário faz/vê nesta tela e qual é o objetivo de negócio",
  "source": {
    "type": "figma|screenshot|brief|brainstorm",
    "ref": "URL do Figma, nome do frame, ou descrição da origem"
  },
  "layout": {
    "type": "stacked|grid|sidebar|overlay",
    "breakpoint_base": "375px",
    "regions": ["header", "card-area", "cta-area"]
  },
  "visual_tokens": {
    "source": "get_variable_defs",
    "extracted": {
      "font-family": "Plus Jakarta Sans",
      "--primary": "#0047BB",
      "--black": "#1b1e26",
      "--shadow-03": "0px 4px 16px rgba(0,0,0,0.08)"
    }
  },
  "visual_delta": [
    {
      "target": "font-family",
      "current": "system-ui",
      "figma": "Plus Jakarta Sans",
      "action": "import via Google Fonts + atualizar var"
    },
    {
      "target": "--gray-10",
      "current": "#f5f5f5",
      "figma": "#1b1e26",
      "action": "corrigir valor da variável"
    }
  ],
  "component_anatomy": {
    "exam-card": "header-azul { badge-data + chip-status + nome-exame + local } / body-branco { grid-2x2[jejum·duracao·preparo·resultado] + chip-cobertura + [btn-primary + btn-ghost] }",
    "sticky-bar": "fixed-bottom { nome-exame + detalhes + cobertura } + { btn-primary + btn-ghost }"
  },
  "components": [
    {
      "region": "header",
      "type": "page_header",
      "variant": "with_back",
      "role": "navegação e título da tela",
      "code_connect": "@/components/ui/PageHeader"
    },
    {
      "region": "card-area",
      "type": "card",
      "variant": "default",
      "role": "resumo do agendamento",
      "code_connect": null
    },
    {
      "region": "cta-area",
      "type": "button",
      "variant": "primary",
      "role": "ação principal sticky na base",
      "code_connect": "@/components/ui/Button"
    }
  ],
  "tokens_used": {
    "colors": ["--primary", "--success"],
    "spacing": ["--size-60", "--size-24", "--size-16"],
    "typography": ["Heading/md", "Body/lg", "Body/sm"],
    "radius": ["--card-radius"],
    "shadows": ["--shadow-xs"]
  },
  "content": {
    "texts": [
      {"region": "header", "value": "Resumo do agendamento", "copy_ok": true},
      {"region": "cta-area", "value": "Confirmar agendamento", "copy_ok": true}
    ],
    "states": ["default", "loading", "error"],
    "interactions": ["scroll vertical", "botão CTA navega para próxima tela"]
  },
  "constraints": [
    "Aplicar todas as correções de visual_delta antes de qualquer novo estado ou componente",
    "Nenhuma cor fora dos tokens semânticos do DS",
    "Nenhuma sombra custom — usar apenas --shadow-xs ou --shadow-lg",
    "Reutilizar componentes existentes antes de criar novos",
    "CTA Primary sticky na base da tela (mobile-first, 375px)",
    "Touch targets mínimo 44px em todos os interativos",
    "Copy em PT-BR seguindo copy-rules.md"
  ],
  "uncertainties": [
    "Ícone do header: asset do Figma via MCP ou ícone da biblioteca DS?"
  ]
}
```

---

## Formato de output ao usuário

Apresente o contrato em dois blocos:

### Bloco 1 — Resumo legível

```markdown
## Screen Contract — [screen_name]

**Propósito:** [purpose]
**Fonte:** [source.type] — [source.ref]
**Layout:** [layout.type], base [breakpoint_base]

### Regiões e componentes
| Região | Componente | Variante | Code Connect |
|---|---|---|---|
| header | page_header | with_back | ✅ @/components/ui/PageHeader |
| card-area | card | default | ⏳ sem mapeamento |
| cta-area | button | primary | ✅ @/components/ui/Button |

### Anatomia de componentes (Figma)
- **exam-card:** header-azul { badge-data + chip-status + nome-exame + local } / body-branco { grid-2x2 + chip-cobertura + 2 botões }
- **sticky-bar:** fixed-bottom { nome-exame + detalhes + cobertura } + { btn-primary + btn-ghost }

### Tokens visuais extraídos (Figma)
- **font-family:** Plus Jakarta Sans
- **--primary:** #0047BB
- **--black:** #1b1e26
- **--shadow-03:** 0px 4px 16px rgba(0,0,0,0.08)

### Correções visuais obrigatórias (visual_delta)
| Propriedade | Atual no arquivo | Valor Figma | Ação |
|---|---|---|---|
| font-family | system-ui | Plus Jakarta Sans | import + atualizar var |
| --gray-10 | #f5f5f5 | #1b1e26 | corrigir valor |

> Se visual_delta estiver vazio, arquivo já está alinhado com os tokens Figma.

### Tokens vinculados
- **Cores:** --primary, --success
- **Spacing:** --size-60, --size-24, --size-16
- **Tipografia:** Heading/md, Body/lg
- **Radius:** --card-radius

### Estados necessários
default · loading · error

### ⚠️ Incertezas a resolver
1. Ícone do header: asset do Figma via MCP ou ícone da biblioteca DS?

---
**Aguardando confirmação para prosseguir com a geração de código.**
Responda "ok" para confirmar, ou ajuste o contrato antes de prosseguir.
```

### Bloco 2 — JSON do contrato

O JSON completo conforme o template acima, para uso pela geração de código.

---

## Regras de operação

### Prioridade de geração (regra crítica)

> **O gerador deve aplicar todas as correções de `visual_delta` antes de adicionar novos estados ou componentes. `visual_delta` é bloqueante.**

Ordem obrigatória:
1. Corrigir todos os itens de `visual_delta` (tokens CSS, font-family, shadow values)
2. Aplicar `component_anatomy` nas estruturas redesenhadas
3. Implementar novos estados e componentes funcionais

Se `visual_delta` estiver vazio, prosseguir diretamente para os itens funcionais.

### O que esta skill NUNCA faz
- Gerar código (→ responsabilidade do `implement-design` após confirmação)
- Inventar tokens que não existem em `docs/design-system.md` ou `tokens/alm-tokens.json`
- Criar componentes novos quando um existente cobre o caso
- Pular o checkpoint humano — sempre aguardar confirmação antes de sinalizar que o contrato está pronto
- Assumir valores de tokens sem consultar `get_variable_defs` quando um Figma URL está disponível

### O que fazer quando o input é ambíguo
- Registrar em `uncertainties` em vez de assumir
- Apresentar opções quando houver 2 caminhos válidos
- Perguntar ao usuário apenas o estritamente necessário para desbloquear o contrato

### Contrato parcial (vindo de brainstorm)
Quando o input for uma variação de `nav360-brainstorm` com partial contract embutido:
- Campos `screen_name`, `purpose`, `layout`, `components` (sem `code_connect`) e `constraints` já estarão preenchidos
- Pular Passos 1–2 e ir direto ao Passo 3 (verificar Code Connect para os componentes listados)
- Completar `tokens_used`, `content` e `uncertainties`

---

## Notas

- O screen contract é a fonte de verdade para a geração de código. O modelo gerador deve referenciar o contrato JSON, não o frame Figma diretamente, ao tomar decisões de componentes e tokens.
- Se o usuário alterar o contrato após confirmação, perguntar se deseja regenerar o JSON antes de prosseguir.
- Referência de spec manual equivalente: `docs/specs/code-generation.md` (seção "Estrutura da spec por tela/componente") — o contrato automatiza e estende esse template.
