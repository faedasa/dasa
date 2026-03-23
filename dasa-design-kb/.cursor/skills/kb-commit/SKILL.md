---
name: kb-commit
description: "Valida, commita e abre PR com mudanças no KB — fluxo git guiado para designers seguindo Conventional Commits e GitFlow."
version: "1.0"
language: pt-BR
allowed-tools: [Read, Shell]
tags: [git, github, commit, kb, pr]
---

# Skill: kb-commit

Valida, commita e abre PR com mudanças no KB — fluxo git guiado para designers.

## Quando usar

Acione esta skill quando:
- "publica as mudanças"
- "commit e PR do KB"
- "quero subir as alterações"
- "como faço push das mudanças?"
- Após qualquer edição em arquivos de `docs/` ou `tokens/`

### Quando NÃO usar

- Mudanças em `kb.json` → PR no repositório `dasa-figma-plugin`
- Código de UI → use `implement-design`
- Revisão de copy → use `copy-review`
- Validação de código → use `quality-gate`

## Pré-requisitos

- `git` instalado e repositório configurado
- `gh` (GitHub CLI) instalado para criar PRs automaticamente
- Branch diferente de `main` (crie uma branch se ainda não tiver)

> **Nota:** `kb.json` agora vive no repositório `dasa-figma-plugin`. Mudanças em regras, tokens estruturados ou glossário do plugin devem ser feitas por PR naquele repo.

## Arquivos de referência

- `CHANGELOG.md` — registro cronológico de mudanças
- `CONTRIBUTING.md` — convenções de contribuição e nomes de branch

## Como executar

### Passo 1 — Verificar status

Execute e mostre o resultado:

```bash
git status
git diff --stat
```

Se não houver mudanças, informe o designer e encerre a skill.

### Passo 2 — Verificar branch

```bash
git branch --show-current
```

Se o resultado for `main` ou `master`, sincronize e crie uma branch antes de continuar:

```bash
git checkout main
git pull origin main
git checkout -b docs/kb-update
```

Sugira um nome de branch baseado no domínio alterado. Use o padrão `<scope>/<descricao>`:
- `docs/update-copy-rules`
- `docs/update-ux-guidelines`
- `tokens/sync-alm-tokens`
- `skills/update-kb-commit`

Peça confirmação do nome antes de criar.

### Passo 3 — Revisar o diff

Mostre as mudanças para o designer revisar:

```bash
git diff HEAD
```

Pergunte: "Essas são as mudanças que você quer publicar?"

### Passo 4 — Atualizar CHANGELOG.md

Antes de commitar, atualize `CHANGELOG.md` com base no diff.

Adicione linhas dentro de `## [Unreleased]`:

```markdown
### Changed
- `docs/copy-rules.md` — descrição do que mudou e por quê

### Added
- `docs/novo-arquivo.md` — descrição da adição
```

Edite `CHANGELOG.md` com as linhas corretas antes de avançar.

### Passo 5 — Montar mensagem de commit

Siga o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope>): <descrição curta em PT-BR>
```

Onde `<scope>` é o domínio alterado (ex: `copy`, `ux`, `tokens`, `skills`).

Tipos:
- `docs` — atualização de documentação (arquivos em `docs/`)
- `feat` — novo arquivo de doc ou nova seção relevante
- `fix` — correção de informação incorreta
- `chore` — atualização de tokens via export do Tokens Studio

Exemplos:
- `docs(copy): atualizar glossário de termos — adicionar "laboratório"`
- `docs(ux): detalhar guideline de formulários mobile`
- `chore(tokens): sync alm-tokens.json com export do Figma`

Sugira uma mensagem baseada no diff e peça aprovação antes de commitar.

### Passo 6 — Commit e push

Revise o que será staged antes de confirmar:

```bash
git status
```

Se tudo estiver correto:

```bash
git add -A
git commit -m "<mensagem aprovada>"
git push -u origin HEAD
```

### Passo 7 — Abrir Pull Request

```bash
gh pr create \
  --base main \
  --title "<mesmo título do commit>" \
  --body "$(cat <<'EOF'
## O que mudou

<descreva as mudanças baseado no diff>

## Por quê

<motivo da mudança — peça ao designer se não souber>

## Checklist

- [ ] Mudanças revisadas no diff antes do commit
- [ ] CHANGELOG.md atualizado
- [ ] Nenhuma informação sensível ou incorreta incluída
EOF
)"
```

Após criar o PR, mostre a URL para o designer revisar e compartilhar com a equipe.

## Output esperado

Commit com mensagem Conventional Commits + PR aberto com template estruturado + URL do PR para revisão.

## Tratamento de erros

| Erro | O que fazer |
|---|---|
| Branch é `main` | Crie uma branch. Nunca commite direto em `main`. |
| `gh: command not found` | Instrua a instalar: `brew install gh && gh auth login` |
| Push rejeitado (upstream divergiu) | Execute `git pull --rebase` antes do push |

## Notas

- Esta skill não faz force push nem amend em commits já publicados.
- PRs sem aprovação de outro membro da equipe não devem ser mergeados em `main`.
- Para atualizar regras do plugin Figma (`kb.json`), use o repositório `dasa-figma-plugin`.
- Skill terminal — não aciona outras. É chamada diretamente pelo usuário após edições no KB.

---

## Override de administrador

> **Atenção: uso em situações de emergência apenas (break-glass).**
> Push direto em `main`/`master` viola o fluxo Git Flow mesmo para admins. Prefira sempre o fluxo padrão (branch → PR → revisão) — ele protege o histórico, é auditável e aciona o CHANGELOG corretamente.

O arquivo `admin-push.mdc` na raiz do monorepo (`/dasa/.cursor/rules/admin-push.mdc`) sobrescreve o comportamento desta skill para o usuário administrador do repositório.

**Quando o override está ativo:**
- Os passos 2 (criação de branch) e 7 (criação de PR) são **omitidos**
- O push é feito diretamente em `master`
- Os passos de validação e CHANGELOG continuam obrigatórios
- O commit fica sem revisão de par — risco de introduzir erros sem rastreabilidade

**Use somente se:** a branch principal estiver bloqueada por falha crítica não-corrigível via PR, ou por instrução explícita de um mantenedor sênior com justificativa documentada.
