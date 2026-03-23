# dasa-design-kb

Hub centralizado de documentação colaborativa do time de Produto & Experiência da Dasa.

Designers, gestores e qualquer pessoa da empresa podem contribuir e consultar projetos, serviços e iniciativas do time — tudo versionado, acessível e com histórico rastreável.

Além da colaboração humana, este repositório é estruturado primariamente como uma **base de conhecimento legível por IA**: cada documento segue um formato consistente que permite que modelos de linguagem (via Cursor, agentes ou qualquer integração LLM) operem com contexto real — não com suposições.

---

## O que a IA ganha com esta KB

Quando um agente de IA tem acesso a uma base de conhecimento bem organizada, ele deixa de adivinhar e passa a agir com fundamento. Isso muda o nível de qualidade de tudo que ele produz.

Os benefícios concretos de manter esta KB atualizada:

- **Geração de código alinhada ao Design System** — tokens, componentes e padrões de interação aplicados corretamente, sem alucinações de nome ou valor
- **Validação automática de qualidade** — as regras documentadas aqui alimentam o quality-gate, que audita o código gerado contra o DS real
- **Onboarding acelerado** — novos membros do time e novos agentes partem de uma fonte de verdade, não de memória oral ou tentativa e erro
- **Memória viva e versionada** — decisões de design, atualizações de guideline e princípios de produto são rastreáveis no tempo via CHANGELOG
- **Agentes autônomos com confiança** — as skills documentadas em [`SKILLS.md`](./SKILLS.md) (onboarding, ideação, playground, implementação, validação, persistência) atuam com grounding real nesta KB, não no escuro
- **Consistência entre projetos** — a KB responde "qual é o comportamento correto?" antes que cada designer ou agente precise reinventar a resposta
- **Contexto acessível de qualquer lugar** — disponível via MCP e `raw.githubusercontent.com` para qualquer ferramenta de IA, não apenas o Cursor

---

## O que tem aqui

Cada documento abaixo é contexto ativo — consultado por designers, gestores e agentes de IA em tempo real.

| Arquivo / Pasta | O que é |
|---|---|
| `docs/copy-rules.md` | Tom de voz, capitalização, terminologia, pontuação |
| `docs/ux-guidelines.md` | Princípios de design, acessibilidade, interações padrão |
| `docs/design-system.md` | Tokens oficiais, cores, tipografia, componentes |
| `docs/business-strategy.md` | Objetivos, métricas e proposta de valor do produto |
| `docs/specs/` | Mapeamentos de componentes e spec de code generation (contratos para agentes) |
| `docs/playground/` _(local, não versionado)_ | Protótipos e experimentos de UX ↔ código — cada designer mantém o seu localmente |
| `docs/subprojects/` | Produtos e features (Nav360, Cartão Dasa, Alta Diagnósticos, Atendimento Domiciliar, Vacinas, plugin Figma — ver [`docs/subprojects/README.md`](./docs/subprojects/README.md)) |
| `tokens/` | Export oficial do Design System via Tokens Studio — fonte de verdade dos valores |
| `legacy/` | Arquivos históricos e experimentais (referência apenas) |
| `CHANGELOG.md` | Histórico versionado de todas as mudanças no KB |

---

## Como contribuir

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para o guia completo.

Fluxo rápido:
1. Edite um arquivo em `docs/` ou `tokens/`
2. Use a skill `kb-commit` no Cursor para criar o commit e abrir o PR

---

## Skills disponíveis no Cursor

Há **9 skills** neste repositório (definições em [`.cursor/skills/`](./.cursor/skills/)). Elas estão enraizadas nesta KB — consultam docs, tokens e specs para decidir com fundamento.

**Orquestração, encadeamentos e vocabulário (`INVOKE`, `CHAIN`, etc.)** — fonte de verdade: [`SKILLS.md`](./SKILLS.md).

| Skill | Fase | Como acionar (exemplos) |
|---|---|---|
| `onboarding-101` | Onboarding | "onboarding", "101", "por onde começo", "como funciona o KB" |
| `nav360-brainstorm` | Ideação | problema de UX / módulo do Nav360 (dashboard, portal logado) |
| `screen-contract` | Pré-geração | "gere o contrato da tela", frame Figma ou brief antes do código |
| `implement-design` | Implementação | frame Figma, node-id, "implementa esse design" |
| `playground-state-panel` | Playground | HTML em `docs/playground/` + painel flutuante de estados |
| `playground-sync-tokens` | Playground | "sincronize os tokens", tokens do DS no `:root` do protótipo |
| `quality-gate` | Validação | "valide o código", "está conforme o DS?", quality check |
| `copy-review` | Validação | revisão de copy contra as regras Dasa |
| `kb-commit` | Persistência | publicar KB — commit, branch e PR |

---

## Relação com o Figma Plugin

Este repositório é a base de conhecimento **humana** do Design System Dasa — documentação, guidelines e tokens.

O [Figma Plugin Dasa](https://github.com/design-dasa/dasa-figma-plugin) mantém seu próprio `kb.json` como fonte de verdade para a lógica de auditoria automatizada (regras, checklist, glossário estruturado). Designers que precisam atualizar regras do plugin devem criar PRs naquele repositório.

---

<details>
<summary>Para modelos de IA lendo este repositório</summary>

Este repositório é estruturado para consumo direto por LLMs. Antes de agir:

- Leia [`llms.txt`](./llms.txt) na raiz — mapeia os arquivos mais importantes e seus propósitos
- Para geração de código, siga [`docs/specs/code-generation.md`](./docs/specs/code-generation.md)
- Para revisão de copy, siga [`docs/copy-rules.md`](./docs/copy-rules.md)
- Para instrução de agentes, leia [`AGENTS.md`](./AGENTS.md)
- Não edite `tokens/alm-tokens.json` sem instrução explícita — é export direto do Figma
- `legacy/` é somente leitura
- `kb.json` não vive aqui — vive em [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin)

</details>

---

Iniciativa criada por **Cosme Faé** — iniciada em março de 2026.

© 2026 Dasa — Uso interno
