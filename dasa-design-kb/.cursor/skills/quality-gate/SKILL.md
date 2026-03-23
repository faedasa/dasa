---
name: quality-gate
description: "Valida código de UI gerado contra as regras do Design System Dasa — tokens hardcoded, touch targets, acessibilidade, copy inline e componentes recriados ad-hoc."
version: "1.0"
language: pt-BR
allowed-tools: [Read]
tags: [qualidade, design-system, código, acessibilidade, tokens]
---

# Skill: quality-gate

Valida código de UI gerado contra as regras do Design System Dasa.

> Diferente de `copy-review` (valida texto), esta skill valida **código** — tokens, acessibilidade, estrutura de componentes e copy inline.

## Quando usar

Acione esta skill quando:
- "valide o código gerado"
- "quality check"
- "está conforme o DS?"
- "revise esse componente"
- "pode conferir antes de eu commitar?"
- Após qualquer geração de código UI via `implement-design` ou manualmente

### Quando NÃO usar

- Revisão de texto isolado (sem código) → use `copy-review`
- Implementar um frame do Figma → use `implement-design`
- Commit de mudanças no KB → use `kb-commit`

## Arquivos de referência

- `docs/design-system.md` — tokens semânticos e componentes oficiais
- `docs/specs/figma-mapping.md` — mapeamento de componentes Figma para código
- `docs/copy-rules.md` — regras de copy e tom de voz

## Como executar

### Passo 0 — Verificação Code Connect (quando houver link do Figma)

Se o pedido incluir um link do Figma **antes de gerar qualquer código**, execute esta etapa primeiro:

1. Use o Figma MCP para acessar o frame/componente do link
2. Para cada componente encontrado no frame, verifique se há Code Connect ativo com path de import
3. Retorne a tabela de pré-build antes de gerar:

```
## Verificação Code Connect — pré-build

| Componente | Code Connect | Path de import |
|---|---|---|
| Button / Primary | ✅ | `@/components/ui/Button` |
| Input / Text | ⏳ não configurado | fallback: `figma-mapping.md` |
| Card / Exame | ✅ | `@/components/cards/CardExame` |
```

4. Só prossiga com a geração de código após confirmar quais paths usar
5. Na geração, importe apenas pelos paths confirmados — nunca recrie componentes que têm Code Connect ativo

> **Por que isso importa:** sem Code Connect verificado, o modelo tende a criar novos componentes do zero mesmo quando existem na biblioteca — causando inconsistência visual e duplicação desnecessária de código.

### Passo 1 — Carregar referências

Leia os seguintes arquivos:

```
@docs/design-system.md
@docs/specs/figma-mapping.md
@docs/copy-rules.md
```

### Passo 2 — Receber o código

Peça ao usuário o código a revisar se não foi fornecido. Pode ser:
- Um componente (`.tsx`, `.html`, `.css`)
- Um trecho de código
- Um arquivo completo

### Passo 3 — Analisar em 5 dimensões

#### 3a. Tokens hardcoded

Procure valores literais de:
- Cores: qualquer hex (`#000000`, `rgb(...)`, `hsl(...)`)
- Spacing: valores px avulsos que não usam `var(--size-*)` ou variáveis semânticas
- Radius: valores px sem referência a variável
- Font-size: valores px sem variável

Para cada ocorrência, identifique o token semântico correto consultando `design-system.md`.

**Exceções permitidas:** `0`, `100%`, `transparent`, `inherit`, `auto`, `1px` para borders finas.

#### 3b. Touch targets

Identifique todos os elementos interativos:
- `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`
- Elementos com `onClick`, `role="button"`, `role="link"`
- Ícones clicáveis

Para cada um, verifique se tem `min-height: 44px` (ou `height >= 44px`) e `min-width` adequado.

#### 3c. Acessibilidade

- **Imagens:** `<img>` tem `alt` descritivo? (não vazio, não "imagem", não o nome do arquivo)
- **Inputs:** há `<label>` visível associado (não apenas placeholder)?
- **Botões icon-only:** tem `aria-label`?
- **Formulários:** mensagens de erro têm `role="alert"` ou `aria-live`?
- **Contraste:** identifique combinações de cor suspeitas (texto claro em fundo claro)

#### 3d. Copy inline

Para cada string de texto no código, aplique as regras de `copy-rules.md`:
- **Capitalização:** apenas primeira palavra maiúscula?
- **CTAs:** identifique textos em botões/links → são infinitivo + complemento? 2–3 palavras? Sem ponto final?
- **Termos proibidos:** "Ver mais", "Continuar", "Próximo", "Avançar", "usuário", "DASA" em caps, "preço"
- **Glossário:** "paciente" (não "usuário"), "convênio" (não "plano"), "laboratório [marca]" (não apenas "unidade")

> **Copy profundo:** se o componente tiver muitas strings, se o usuário pedir revisão de copy detalhada, ou se houver dúvidas sobre tom de voz e glossário, acione a skill `copy-review` em complemento a esta análise:
> ```
> Use a copy-review skill para revisar os textos desse componente.
> ```

#### 3e. Integridade do playground (apenas arquivos em `docs/playground/`)

Se o arquivo validado estiver em `docs/playground/`, verifique adicionalmente:

- [ ] Bloco `<!-- ─── Float State Panel -->` existe e é filho direto do `<body>` (nunca dentro de `.shell`, `.sidebar`, `.main` ou outro container)
- [ ] A tab "Páginas" lista **todos** os arquivos `.html` presentes no diretório `docs/playground/`
- [ ] A função `switchTab` existe no `<script>` do arquivo
- [ ] A função `setState` atualiza o `state-panel__active-badge` além de marcar o botão `is-active`
- [ ] O drawer usa `visibility/opacity/transform` para animação (não `display: none/block`)

Se qualquer item falhar, sinalizar como `REPROVADO` e indicar a skill `playground-state-panel` para correção.

#### 3f. Componentes recriados ad-hoc

Identifique elementos que **parecem** ser componentes do DS mas foram criados do zero:
- Botões com estilos inline em vez de classes/componente
- Cards com `border-radius` e `box-shadow` customizados
- Inputs sem uso de componente oficial
- Modais ou overlays criados do zero

Para cada caso: sinalizar que deve ser substituído pelo componente oficial via Figma MCP/Code Connect.

### Passo 4 — Montar relatório

Retorne no formato abaixo. Use PT-BR.

```
## Quality Gate — [nome do componente/arquivo]

### Resumo
[Score geral: APROVADO / APROVADO COM RESSALVAS / REPROVADO]
[1 linha explicando o principal achado]

---

### Tokens hardcoded
| Linha | Valor encontrado | Token correto |
|---|---|---|
| L42 | `color: #0037FF` | `color: var(--primary)` |
| — | Nenhum encontrado | — |

### Touch targets
| Elemento | Status | Problema |
|---|---|---|
| `<button>Agendar</button>` | ❌ | Sem min-height definido |
| `<a>Ver detalhes</a>` | ✅ | — |

### Acessibilidade
| Item | Status | Problema | Sugestão |
|---|---|---|---|
| `<img src="logo.png">` | ❌ | alt vazio | `alt="Logo Dasa"` |
| `<input id="cpf">` | ✅ | — | — |

### Copy inline
| Texto | Dimensão | Problema | Sugestão |
|---|---|---|---|
| "Ver mais exames" | Termos proibidos | "Ver mais" proibido | "Mostrar exames" |
| "Agendar exame" | ✅ | — | — |

### Componentes recriados
| Elemento | Problema | Ação |
|---|---|---|
| Botão com estilos inline | Não usa componente oficial | Substituir por Button do DS via Figma MCP |
| — | Nenhum encontrado | — |

---

### Versão corrigida (se aplicável)
[Trecho corrigido, apenas se as mudanças forem simples o suficiente para sugerir inline]
```

Se não houver problemas: informe que o código está em conformidade com o DS Dasa.

### Passo 5 — Repair Mode (quando score ≠ APROVADO)

Se o score for `REPROVADO` ou `APROVADO COM RESSALVAS`, **não sugira regenerar tudo**. Opere por blocos:

#### 5a. Identificar regiões com problemas

Se um screen contract estiver disponível no contexto da sessão (gerado pela skill `screen-contract`), cruzar cada issue encontrado com a região do contrato:

```
Região: card-area
  Issue: token hardcoded — color: #0037FF (L42)
  Correção: color: var(--primary)
  Prioridade: CRÍTICO
```

Se não houver screen contract disponível, agrupar issues por tipo (tokens, a11y, copy, componentes).

#### 5b. Listar correções cirúrgicas

Para cada issue, fornecer a correção exata e mínima — nunca reescrever blocos inteiros sem necessidade:

```markdown
## Repair Plan — [nome do componente/arquivo]

### Correções obrigatórias (bloqueiam aprovação)
| # | Região | Linha | Problema | Correção exata |
|---|---|---|---|---|
| 1 | card-area | L42 | `color: #0037FF` | `color: var(--primary)` |
| 2 | cta-area | L87 | `<button>` sem `min-height` | Adicionar `min-height: 44px` |

### Correções recomendadas (não bloqueiam, mas devem ser feitas)
| # | Região | Linha | Problema | Correção exata |
|---|---|---|---|---|
| 3 | header | L15 | "Ver mais" proibido | Substituir por "Mostrar histórico" |
```

#### 5c. Oferecer aplicação automática

Após listar as correções, oferecer ao usuário:

```
Posso aplicar as correções obrigatórias diretamente no código.
Responda "aplicar" para que eu faça os edits cirúrgicos,
ou "revisar" se preferir aplicar manualmente.
```

Se o usuário responder "aplicar": fazer os edits ponto a ponto, sem tocar em blocos não listados no repair plan.

#### 5d. Revalidar após correções

Após aplicar as correções, rodar novamente apenas as dimensões que tinham issues (não refazer toda a análise). Emitir score final.

---

## Output esperado

Relatório tabular com score `APROVADO / APROVADO COM RESSALVAS / REPROVADO` em 5 dimensões + versão corrigida quando aplicável + Repair Plan quando score ≠ APROVADO.

## Notas

- Esta skill não executa código — analisa estaticamente.
- Para copy mais profundo, use a skill `copy-review` em conjunto.
- Dúvidas sobre qual token usar: consulte Figma via MCP ou `docs/design-system.md`.
- Se os docs foram atualizados recentemente, releia os arquivos antes de validar.
- Skill chamada por `implement-design` (ao final do Step 8); também acionada diretamente pelo usuário.
- Quando disponível, o screen contract da skill `screen-contract` enriquece o Repair Mode com localização de regiões — sempre verificar se está no contexto antes de iniciar o Repair Plan.
