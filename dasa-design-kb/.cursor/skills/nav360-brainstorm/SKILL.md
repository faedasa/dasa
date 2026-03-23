---
name: nav360-brainstorm
description: "Brainstorming de soluções de UI/UX para módulos e telas do Nav360 (dashboard/portal de paciente). Gera variações fundamentadas em benchmarks, regras de produto e hipóteses rastreáveis."
version: "1.0"
language: pt-BR
allowed-tools: [Read]
tags: [nav360, ux, brainstorm, design, dashboard]
---

# Nav360 Brainstorm

Gera 2–3 variações de solução UX/UI para um problema do Nav360, cada uma rastreada a benchmark, regra de produto e status de validação.

Antes de gerar variações: verificar escopo → carregar contexto base + arquivos condicionais → identificar as regras da Layer 1 aplicáveis e listá-las no output.

## Quando usar

Acione esta skill para:
- Módulos da home logada (Próxima Data, Resultados, Valores, Histórico, Pendências, Sugestão contextual)
- Estrutura da sidebar e navegação lateral
- Hierarquia visual entre módulos
- Comportamento de CTA primário e secundário
- Progressive disclosure em listas (resultados, agendamentos)
- Home contextual (estado do paciente sem agendamento vs com agendamento)

### Quando NÃO usar

- Fluxo de agendamento step-by-step → use contexto de wizard
- Busca/seleção de exames → lógica de product listing
- Implementação de código → use `implement-design`
- Validação de código gerado → use `quality-gate`
- Revisão de textos → use `copy-review`

## Regras Nav360

Aplicar como filtro em toda variação proposta:

1. **Uma ação primária dominante por tela** — nunca ações de igual hierarquia visual concorrendo entre si *(Zocdoc)*
2. **Hierarquia clínica: urgência à esquerda (60%), consulta à direita (40%)** — grid assimétrico por propósito *(MyChart)*
3. **Labels sempre visíveis na sidebar** — ícone sem legenda viola acessibilidade e aumenta carga cognitiva *(MyChart + WCAG 2.5.5)*
4. **Progressive disclosure: N itens recentes + ação explícita para volume total, máx 2 níveis** — nunca lista paginada na home *(Linear + NN/g)*
5. **Status badges com semântica funcional** — cor comunica estado operacional, nunca é decorativa *(MyChart + NN/g)*
6. **Home como orientação, não como trabalho** — o paciente localiza o que precisa fazer e vai *(Notion)*
7. **CTAs contextuais por módulo, nunca globais** — cada card tem seu próprio CTA secundário; CTA primário da tela é único *(Salesforce Health Cloud)*
8. **Home contextual: CTA muda com estado do paciente** — sem data agendada, CTA primário muda para "Agendar consulta" *(One Medical)*
9. **Módulos com estrutura fixa e conteúdo variável** — título, status e CTA são obrigatórios; estrutura não muda *(Airbnb DLS)*
10. **Anti-padrões a evitar:** modais para detalhe, terminologia clínica sem adaptação, ícones sem label, hierarquia visual plana entre urgente e histórico *(iClinic/DrConsulta)*

## Arquivos de referência

**Sempre carregar:**
- `docs/subprojects/nav360/README.md`
- `docs/subprojects/nav360/benchmarks-applied.md`

**Carregar condicionalmente:**

| Arquivo | Carregar quando |
|---------|-----------------|
| `docs/research/benchmarks.md` | análise profunda de benchmark solicitada |
| `docs/research/ux-dashboard-patterns.md` | layout, visualização ou hierarquia visual |
| `docs/research/progressive-disclosure.md` | colapso, expansão ou quantidade de itens exibidos |
| `docs/research/accessibility-touch-targets.md` | acessibilidade, touch targets ou interatividade |
| `docs/research/airbnb-dls.md` | arquitetura de design system ou motion |

## Como executar

### Passo 1 — Verificar escopo

Confirme que o módulo ou problema se enquadra na seção "Quando usar". Se não se enquadrar, sinalize a skill correta e encerre.

### Passo 2 — Carregar contexto

Leia os arquivos obrigatórios e os condicionais pertinentes ao problema em questão.

### Passo 3 — Identificar regras aplicáveis

Da lista "Regras Nav360" abaixo, selecione as que se aplicam ao módulo/problema e liste-as no output.

### Passo 4 — Gerar variações

Produza 2–3 variações de solução, cada uma rastreada a: benchmark específico, regra Nav360 e status de validação (validado / hipótese a validar).

## Output esperado

```markdown
## Brainstorm — [nome do módulo / problema]

**Contexto carregado:** [lista dos arquivos lidos nesta sessão]
**Regras aplicadas:** [regras relevantes da lista acima]

---

### Variação 1 — [nome descritivo]

[Descrição concreta: o que muda, como se comporta, o que o usuário vê]

**Benchmark:** [produto] — [padrão específico observado]
**Regra Nav360:** [regra que sustenta]
**Status:** [Validado pelo DS Dasa / Hipótese a validar]

---

### Variação 2 — [nome descritivo]

[Descrição concreta]

**Benchmark:** ...
**Regra Nav360:** ...
**Status:** ...

---

### Variação 3 — [nome descritivo] *(opcional)*

...

---

### Checklist de regras Nav360

- [ ] Uma ação primária dominante por tela
- [ ] Hierarquia clínica: urgência à esquerda, consulta à direita
- [ ] Labels sempre visíveis na sidebar
- [ ] Progressive disclosure (máx 2 níveis, ação explícita para volume total)
- [ ] Status badges com semântica funcional (cor = estado, não decoração)
- [ ] Home como orientação (não tentando executar tudo na mesma tela)
- [ ] CTAs contextuais por módulo, CTA primário único por tela
- [ ] Sem modais para detalhe — progressive disclosure inline ou drawer
- [ ] Estrutura de módulo fixa (título + status + CTA), conteúdo variável

---

### Hipóteses envolvidas

[Lista das hipóteses de benchmarks-applied.md que esta solução ativa]

- "Grid 60/40 funciona para o paciente Dasa" — ativada pela Variação 1
- "3 resultados recentes é o número certo" — ativada pelas Variações 1 e 2

Recomendação de próximo passo de validação: [A/B, usability test, heatmap]

---

### Screen Contract (parcial) — Variação [N] aprovada

> Preencher apenas quando uma variação for aprovada para implementação.
> Este contrato parcial será completado pela skill `screen-contract` ao iniciar `implement-design`.

```json
{
  "screen_name": "[nome da tela / módulo]",
  "purpose": "[o que o usuário faz aqui e qual o objetivo de negócio]",
  "source": {
    "type": "brainstorm",
    "ref": "nav360-brainstorm — Variação [N] — [nome descritivo]"
  },
  "layout": {
    "type": "[stacked|grid|sidebar]",
    "breakpoint_base": "375px",
    "regions": ["[região 1]", "[região 2]", "[região 3]"]
  },
  "components": [
    {
      "region": "[região]",
      "type": "[tipo do componente DS]",
      "variant": "[variante]",
      "role": "[para que serve nessa tela]",
      "code_connect": null
    }
  ],
  "constraints": [
    "[Regra Nav360 aplicada — ex: CTA primário único por tela]",
    "[Regra Nav360 aplicada — ex: progressive disclosure máx 2 níveis]",
    "Nenhuma cor fora dos tokens semânticos do DS",
    "Touch targets mínimo 44px"
  ]
}
```

> `code_connect` e `tokens_used` serão preenchidos pela skill `screen-contract` ao consultar o Figma MCP.
```

> Quando uma hipótese for validada por dados, atualizar `docs/subprojects/nav360/benchmarks-applied.md` e considerar promover a regra para o `quality-gate`.

---

## Notas

- Esta skill não gera código — gera direção de design fundamentada
- Cada variação deve ser testável: se não é possível definir como validá-la com usuários, a variação está mal formulada
- Quando uma hipótese for validada por dados ou testes, atualizar `docs/subprojects/nav360/benchmarks-applied.md` e considerar promover a regra para o `quality-gate`
- Referência metodológica: `docs/research/airbnb-dls.md` — princípio de co-design: benchmark gera hipóteses, pesquisa as valida
- **Decisão de naming (Mar 2026):** Esta skill se chama `nav360-brainstorm`, não `brainstorm-dashboards`, porque o Nav360 é o único produto dashboard Dasa em desenvolvimento ativo e suas regras de Layer 1 ainda são hipóteses não validadas com usuários. Quando hipóteses forem validadas e um segundo produto dashboard surgir, a skill será generalizada para `brainstorm-dashboards` com blocos de regras por produto.
