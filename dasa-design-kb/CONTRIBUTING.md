# Como contribuir com o dasa-design-kb

Guia para designers que querem atualizar tokens, regras de copy ou guidelines.

---

## Pré-requisitos

- [Git](https://git-scm.com/) instalado
- [Cursor](https://cursor.sh/) com acesso a este repositório

---

## Via skill (recomendado)

> Você não precisa saber Git para contribuir. A skill `kb-commit` no Cursor cuida de tudo — branch, diff, CHANGELOG, commit e PR — em linguagem natural.

### Como funciona na prática

1. Edite o arquivo que quiser em `docs/` ou `tokens/` diretamente no Cursor
2. Quando terminar, diga ao Cursor:

```
publica as mudanças / usa a skill kb-commit
```

A skill vai guiar você por cada etapa: mostra o diff, sugere a mensagem de commit, atualiza o CHANGELOG e abre o PR — tudo com confirmação antes de executar.

### Operações disponíveis via Cursor

| Operação | Como acionar |
|---|---|
| Publicar mudanças (commit + PR) | "publica as mudanças" / "usa a skill kb-commit" |
| Criar branch nova | "cria uma branch docs/minha-mudanca" |
| Trocar de branch | "muda para a branch main" |
| Pegar mudanças recentes | "faz um pull das mudanças mais recentes" |
| Revisar copy de interface | "revisa esse copy / usa a skill copy-review" |

Use os comandos manuais abaixo apenas se precisar de controle mais preciso ou quiser entender melhor o que está acontecendo.

### Nova skill no Cursor ou mudança no inventário de skills

Sempre que você **criar, renomear ou remover** uma pasta em `.cursor/skills/<nome>/` (com `SKILL.md`), trate como mudança de **fonte de verdade** do protocolo: atualize na mesma contribuição o **[`SKILLS.md`](./SKILLS.md)** (tabela “As N skills”, diagrama Mermaid e contratos), o **[`README.md`](./README.md)** (tabela “Skills disponíveis no Cursor”) e o **[`llms.txt`](./llms.txt)** (seção de skills com link para `.cursor/skills/<nome>/SKILL.md`). Assim humanos, agentes e o índice para LLMs permanecem alinhados. Para validar automaticamente que cada skill no disco está referenciada nesses três arquivos — além de links quebrados, `llms.txt` e frontmatter em `docs/` — rode o script da skill **ref-linker** no zsh: `zsh ~/.cursor/skills/ref-linker/scripts/audit-refs.sh "$(pwd)"` (a partir da raiz deste repositório). Issues aparecem como `SKILL-SYNC-LLMS`, `SKILL-SYNC-README` ou `SKILL-SYNC-SKILLS` no output.

---

## Via terminal (avançado)

### 1. Crie uma branch

```bash
git checkout -b feat/nome-da-mudanca
```

Exemplos de nomes:
- `feat/add-token-green-200`
- `fix/copy-cta-forbidden-list`
- `docs/update-ux-guidelines`

### 2. Faça as alterações

**Para atualizar regras do plugin Figma** (`kb.json` — tokens estruturados, regras de auditoria, copy):
- `kb.json` **não vive neste repositório** — ele vive no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin)
- Abra um PR diretamente naquele repo; a validação e o script `validate.mjs` rodam lá

**Para atualizar documentação** (`docs/`):
- Edite o `.md` correspondente
- Não precisa incrementar versão

**Para atualizar tokens** (`tokens/alm-tokens.json`):
- Exporte do Tokens Studio no Figma e substitua o arquivo
- Use commit `chore(tokens): sync alm-tokens.json com export do Figma`

### 3. Atualize o CHANGELOG.md

Adicione uma linha dentro de `## [Unreleased]` descrevendo o que mudou e por quê.

> **Se estiver usando a skill `kb-commit`**, este passo é feito automaticamente — a skill escreve a entrada com base no diff antes de commitar.

### 4. Commit

Siga o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(kb): adicionar token --green-200 ao palette
fix(copy): remover "Ver" da lista de termos proibidos
docs(ux): atualizar guideline de touch targets
```

### 5. Abra o Pull Request

```bash
gh pr create --title "feat(kb): ..." --body "Descreva o que mudou e por quê"
```

---

## Regras ao editar o `kb.json` (no dasa-figma-plugin)

> As regras abaixo se aplicam ao `kb.json` que vive no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin).

- **Nunca remova** um `ruleId` ou `checklistItemId` existente sem alinhar com a equipe — o plugin depende desses IDs
- **Versione sempre**: qualquer mudança em `tokens`, `rules` ou `copy` exige incremento de `version`
- **Schema**: o JSON deve passar em `node scripts/validate.mjs` (script no repo do plugin) antes do merge
- **PR obrigatório**: nenhum push direto para `main`

---

## Categorias e severidades das regras

| Severidade | Significado |
|---|---|
| `BLOCKER` | Impede entrega — precisa corrigir |
| `HIGH` | Impacto alto na qualidade/usabilidade |
| `MED` | Desvio significativo do DS |
| `LOW` | Ajuste fino / boas práticas |

Categorias disponíveis: `tokens`, `copy`, `a11y`, `ux`, `components`

---

## Dúvidas?

Fale com Cosme Faé — c_fae.ext@dasa.com.br
