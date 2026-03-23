# Changelog

Todas as mudanças relevantes neste repositório são documentadas aqui.

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Escopo: mudanças em `docs/` e `tokens/` deste repositório. O versionamento semver do `kb.json` é gerenciado no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin).

> **Atualização automática:** a skill `kb-commit` atualiza este arquivo como etapa obrigatória do fluxo de publicação. Não edite manualmente.

---

## [docs] 2026-03-19 (run 2)

### Added
- `CONTRIBUTING.md`: seção “Nova skill no Cursor…” com checklist SKILLS.md / README / llms.txt e comando `zsh …/audit-refs.sh` para validação `SKILL-SYNC-*`

### Changed
- Skill **ref-linker** (instalação local em `~/.cursor/skills/ref-linker`): `audit-refs.sh` agora verifica sync de `.cursor/skills/*/SKILL.md` com `README.md`, `SKILLS.md` e `llms.txt`; passos da auditoria ampliados para [1/6]–[6/6]

---

## [docs] 2026-03-19

### Fixed
- `README.md`: tabela de skills alinhada às 8 skills reais e a `SKILLS.md`; removida referência incorreta a skill "audit"
- `README.md`: linha de `docs/subprojects/` atualizada com subprojetos listados no índice

### Added
- `llms.txt`: entradas para `nav360-brainstorm`, `playground-state-panel` e `playground-sync-tokens` (skills que já existiam em `.cursor/skills/` mas não estavam indexadas)

---

## [ref-linker] 2026-03-19 (run 2)

### Added
- `llms.txt`: entrada adicionada para `docs/specs/README.md` — Índice das especificações técnicas (ausente do índice anterior)
- `llms.txt`: entrada adicionada para `docs/subprojects/README.md` — Índice dos subprojetos ativos (ausente do índice anterior)

---

## [ref-linker] 2026-03-19

### Added
- `llms.txt`: seção `## Agentes de IA` com entrada para `AGENTS.md`
- `llms.txt`: seção `## Research` com 5 entradas (`benchmarks.md`, `airbnb-dls.md`, `progressive-disclosure.md`, `ux-dashboard-patterns.md`, `accessibility-touch-targets.md`)
- `llms.txt`: entrada para `docs/subprojects/nav360/benchmarks-applied.md`
- `llms.txt`: entrada para `docs/subprojects/figma-plugin.md`
- `llms.txt`: entrada para `docs/NEXT-FEATURES.md` (seção Optional)

### Tagged
- `docs/research/airbnb-dls.md`: frontmatter injetado (`tags: [research, design-system]`)
- `docs/research/progressive-disclosure.md`: frontmatter injetado (`tags: [research, ux]`)
- `docs/research/benchmarks.md`: frontmatter injetado (`tags: [research, ux, benchmarks]`)
- `docs/research/accessibility-touch-targets.md`: frontmatter injetado (`tags: [research, accessibility]`)
- `docs/research/ux-dashboard-patterns.md`: frontmatter injetado (`tags: [research, ux]`)
- `docs/business-strategy.md`: frontmatter injetado (`tags: [strategy]`)
- `docs/specs/figma-mapping.md`: frontmatter injetado (`tags: [specs, figma, design-system]`)
- `docs/specs/figma-mcp.md`: frontmatter injetado (`tags: [specs, figma]`)
- `docs/specs/README.md`: frontmatter injetado (`tags: [specs]`)
- `docs/specs/code-generation.md`: frontmatter injetado (`tags: [specs, code-generation]`)
- `docs/ux-guidelines.md`: frontmatter injetado (`tags: [ux]`)
- `docs/design-system.md`: frontmatter injetado (`tags: [design-system]`)
- `docs/copy-rules.md`: frontmatter injetado (`tags: [copy]`)
- `docs/subprojects/nav360/README.md`: frontmatter injetado (`tags: [subproject, nav360]`)
- `docs/subprojects/nav360/benchmarks-applied.md`: frontmatter injetado (`tags: [subproject, nav360, benchmarks]`)
- `docs/subprojects/atendimento-domiciliar/README.md`: frontmatter injetado (`tags: [subproject, atendimento-domiciliar]`)
- `docs/subprojects/alta-diagnosticos/README.md`: frontmatter injetado (`tags: [subproject, alta-diagnosticos]`)
- `docs/subprojects/README.md`: frontmatter injetado (`tags: [subproject]`)
- `docs/subprojects/cartao-dasa/README.md`: frontmatter injetado (`tags: [subproject, cartao-dasa]`)
- `docs/subprojects/vacinas/README.md`: frontmatter injetado (`tags: [subproject, vacinas]`)
- `docs/subprojects/figma-plugin.md`: frontmatter injetado (`tags: [subproject, figma]`)
- `docs/NEXT-FEATURES.md`: frontmatter injetado (`tags: [roadmap]`)

---

## [Unreleased]

### Changed

- `.cursor/skills/kb-commit/SKILL.md`: **micro-commit** — após todo `git commit`, push obrigatório na mesma sequência; seção dedicada; passo 6 explícito; output esperado; pré-requisitos (`gh` só no fluxo com PR); override admin em **`main`**; tabela de erros e notas
- `CONTRIBUTING.md`: skill `kb-commit` com commit + push ao `origin`; seção **Administradores (sem Pull Request)**; tabela de triggers; caminho do script de auditoria `~/.cursor/skills/sync-references/scripts/audit-refs.sh`
- `.cursor/rules/admin-push.mdc` (raiz do monorepo `dasa`): branch **`main`**, push imediato após commit, monorepo, sem PR quando admin, CHANGELOG obrigatório
- `AGENTS.md`: regra sobre push direto em `main` alinhada ao fluxo admin e aos docs

- `llms.txt`, `README.md`, `.cursor/rules/dasa-kb.mdc`: inventário de skills sincronizado com **9 skills** — incluída `screen-contract` (já presente em `SKILLS.md` e em `.cursor/skills/`, mas ausente do índice para LLMs e das tabelas públicas); pipeline de produção na rule atualizado para refletir CHAIN `screen-contract` no Step 5 de `implement-design`
- `.cursor/skills/onboarding-101/SKILL.md`: passo 8 do checklist corrigido ("9 skills" em vez de "6")

### Added

- `docs/subprojects/nav360/` — subprojeto dedicado ao Nav360 (plataforma de agendamento), separando contexto do produto do KB transversal
- `docs/subprojects/atendimento-domiciliar/` — novo subprojeto para produto de coleta domiciliar (casa/escritório)
- `docs/subprojects/vacinas/` — novo subprojeto para produto de vacinação Dasa
- `SKILLS.md` — registro central de orquestração das 4 skills: mapa de fluxo completo, tabela de triggers por intenção, regras de encadeamento, boundaries e troubleshooting
- `.cursor/skills/implement-design/` — skill de pipeline completo Figma MCP → código produção (7 passos, valida Code Connect primeiro)
- `docs/specs/figma-mapping.md` — seção Code Connect com tabela de 16 componentes e regra de 4 passos para o AI verificar antes de gerar código
- `PROTOTYPING.md` — Code 101 para designers: Git em uma frase, 4 conceitos essenciais, tabela de skills que substituem comandos manuais, fluxo de playground local e gap design↔código
- `docs/NEXT-FEATURES.md` — roadmap de deploy de protótipos, sync código→Figma e Code Connect completo

### Added

- `llms.txt` — mapa estruturado do repositório no padrão llms.txt (Jeremy Howard/fast.ai) para indexação por modelos de linguagem via MCP e raw GitHub
- `AGENTS.md` — instruções para agentes de IA (Cursor, Copilot, Codex, Jules) com regras de operação, fluxo de contribuição e referência às skills

### Changed

- `README.md` — adicionado bloco colapsável "Para modelos de IA lendo este repositório" com checklist de orientação antes de qualquer ação
- `README.md` — narrativa reescrita com posicionamento de hub colaborativo AI-first: nova seção "Por que uma KB estruturada importa para IA", framing de "contexto ativo" na tabela de estrutura, e reforço da relação entre skills e KB

- `docs/business-strategy.md` v2.0 — reestruturada para escopo multi-produto: portfólio (Nav360 / Alta / Cartão Dasa), personas transversais simplificadas; seções de OKR e sprint do Nav360 movidas para `docs/subprojects/nav360/`
- `docs/ux-guidelines.md` v2.0 — generalizada de fluxo de agendamento para princípios UX transversais; seções de casos específicos do agendamento removidas; formulários e navegação desacopladas do contexto Nav360
- `docs/subprojects/README.md` — adicionadas entradas de `nav360/`, `atendimento-domiciliar/` e `vacinas/`; descrições expandidas
- `docs/design-system.md`, `docs/specs/*.md`, `docs/subprojects/alta-diagnosticos/README.md`, `docs/subprojects/figma-plugin.md` — renomeações de "Dasa/Nav360" → "Dasa" em títulos, referências e copy
- `.cursor/rules/dasa-codegen.mdc` — escopo generalizado de Nav360 para produtos Dasa; regra de copy "paciente" flexibilizada por contexto do produto
- `.cursor/skills/kb-commit/SKILL.md` — fluxo de branch melhorado (sync main antes de criar); scope de commit com exemplo; override de admin documentado com aviso break-glass
- `.cursor/skills/quality-gate/SKILL.md` — título atualizado de "Dasa/Nav360" para "Dasa"
- `.cursor/skills/implement-design/SKILL.md` — adicionado bloco Metadata (quando usar/não usar, inputs, outputs, encadeamento) + seção "Próximo passo obrigatório" que aciona `quality-gate` ao final do passo 7
- `.cursor/skills/quality-gate/SKILL.md` — adicionado bloco Metadata + nota de escalação para `copy-review` quando copy inline exige revisão profunda
- `.cursor/skills/copy-review/SKILL.md` — adicionado bloco Metadata com escopo, inputs/outputs e referência a `docs/copy-rules.md`
- `.cursor/skills/kb-commit/SKILL.md` — adicionado bloco Metadata + seção "Override de administrador" documentando o comportamento do `admin-push.mdc`
- `.cursor/rules/dasa-codegen.mdc` — adicionada seção "Skills para usar em cada situação" com tabela situação→skill e pipeline `implement-design → quality-gate → copy-review`
- `.cursor/rules/dasa-kb.mdc` — expandida seção "Skills disponíveis" com tabela completa, diagrama de orquestração e link para `SKILLS.md`
- `PROTOTYPING.md` — pipeline atualizado para incluir `copy-review` como etapa condicional; tabela de skills reformatada; referência ao `SKILLS.md` adicionada
- `CONTRIBUTING.md` — adicionada seção "Via skill (recomendado)" com tabela de operações em linguagem natural; passo de atualização do CHANGELOG explicitado; `node 18+` removido dos pré-requisitos; numeração de passos corrigida
- `.cursor/rules/dasa-kb.mdc` — removido glob `kb.json`; seção "Como este KB é consumido" atualizada para refletir que `kb.json` vive no `dasa-figma-plugin`; instruções de `validate.mjs` removidas
- `.cursor/rules/dasa-codegen.mdc` — regra de componentes reescrita de passiva para ativa: verificar Code Connect antes de gerar código
- `.cursor/skills/quality-gate/SKILL.md` — Passo 0 de verificação Code Connect adicionado; referência à skill `figma-to-code` atualizada para `implement-design`
- `PROTOTYPING.md` — skill `figma-to-code` renomeada para `implement-design`; referências externas removidas; glob do `dasa-kb.mdc` e seção "Contribuindo com o KB" corrigidos
- `docs/NEXT-FEATURES.md` — referências externas removidas
- `docs/subprojects/figma-plugin.md` — URL do `kb.json` corrigida para `dasa-figma-plugin/main/kb.json`; fluxo de atualização redirecionado para PR no repo do plugin
- `CHANGELOG.md` — cabeçalho de escopo atualizado: versionamento semver do `kb.json` é responsabilidade do `dasa-figma-plugin`
- `README.md` — skill `implement-design` adicionada à tabela de skills; atribuição de criação adicionada

### Removed

- `kb.json` — migrado para `dasa-figma-plugin` como fonte de verdade das regras de auditoria, checklist e glossário estruturado
- `scripts/validate.mjs` — validação passa a ser responsabilidade do repo do plugin
- `resources/` — decks de metodologia removidos (não pertencem à KB de Design System)
- `schema/kb.schema.json` — órfão removido (não era usado pelo `validate.mjs` nem referenciado pelo `kb.json`)
- `docs/playground/` do histórico git — expurgado via `git-filter-repo` (continha PII/dados de saúde — LGPD Art. 11)

---

## [1.0.0] — 2026-03-17

### Added

- `docs/playground/` — nova pasta para protótipos e experimentos de experiência UX↔código, com `README.md` descrevendo o propósito
- `docs/playground/resumo-agendamento.html` — protótipo da tela de resumo/confirmação do agendamento (movido de `docs/specs/`)
- `CHANGELOG.md` — versionamento do KB no padrão Keep a Changelog

### Changed

- `docs/subprojects/figma-plugin.md` — simplificado de 152 para ~25 linhas; agora é um bridge doc focado na relação com `kb.json` e link para o repo `dasa-figma-plugin`, onde a documentação técnica/arquitetural reside
- `docs/specs/code-generation.md` — versão bumpeada para 1.1; adicionada seção "Decisões arquiteturais" com learnings consolidados (blueprint intermediário, LLM-as-judge, templates como fundação, handoff em frame separado)
- `docs/specs/README.md` — reescrito para refletir os dois arquivos ativos (`figma-mapping.md`, `code-generation.md`) e explicar que as regras de validação vivem em `kb.json`
- `README.md` — adicionada skill `quality-gate` na tabela de skills; `docs/planning/` substituído por `docs/playground/` na tabela de estrutura

### Removed

- `docs/planning/` — pasta deletada; conteúdo arquitetural preservado em `docs/specs/code-generation.md`
- `docs/specs/design-quality-checklist.md` — arquivo sem consumidor ativo; regras de validação vivem em `kb.json` (campos `rules` e `checklist`)
- `docs/specs/selecao-unidade.html` — protótipo removido
