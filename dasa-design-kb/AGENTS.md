# AGENTS.md

Instruções para agentes de IA (Cursor, GitHub Copilot, OpenAI Codex, Google Jules e similares) que operam neste repositório.

---

## O que é este repositório

`dasa-design-kb` é a base de conhecimento do time de Produto & Experiência da Dasa. Contém guidelines de UX, regras de copy, tokens do Design System, specs para geração de código e contexto de subprojetos.

**Não é um repositório de código de aplicação.** Não há `package.json` de app, servidor, nem testes automatizados de UI. É um repositório de documentação estruturada em Markdown.

---

## Antes de qualquer ação

1. Leia `llms.txt` na raiz — ele mapeia os arquivos mais importantes e seus propósitos
2. Para tarefas de código, consulte `docs/specs/code-generation.md` e `docs/specs/figma-mapping.md`
3. Para tarefas de copy, consulte `docs/copy-rules.md` antes de sugerir ou revisar qualquer texto
4. Verifique se existe uma skill adequada em `.cursor/skills/` — prefira acionar a skill a agir diretamente

---

## Regras de operação

### O que você pode fazer
- Editar arquivos em `docs/` e `tokens/`
- Criar novos arquivos de documentação em `docs/subprojects/` ou `docs/specs/`
- Atualizar `CHANGELOG.md` seguindo o formato Keep a Changelog
- Seguir o fluxo da skill `kb-commit` para publicar mudanças

### O que você NÃO deve fazer
- Modificar `tokens/alm-tokens.json` sem instrução explícita — é um export direto do Figma
- Editar ou criar arquivos em `legacy/` — é referência somente leitura
- Criar ou modificar `kb.json` neste repositório — ele vive em `dasa-figma-plugin`
- Fazer push direto em `master` — exceto quando o usuário confirmar que é admin

---

## Fluxo de contribuição esperado

```
edição em docs/ ou tokens/
  → atualizar CHANGELOG.md (seção [Unreleased])
  → commit com Conventional Commits: <tipo>(<scope>): <descrição em PT-BR>
  → push em branch → PR (ou push direto se admin confirmado)
```

Tipos de commit válidos: `docs`, `feat`, `fix`, `chore`
Scopes comuns: `copy`, `ux`, `tokens`, `specs`, `subprojects`, `skills`

---

## Skills disponíveis

| Skill | Arquivo | Quando usar |
|---|---|---|
| `implement-design` | `.cursor/skills/implement-design/SKILL.md` | Converter frame Figma em código |
| `quality-gate` | `.cursor/skills/quality-gate/SKILL.md` | Validar código gerado contra o DS |
| `copy-review` | `.cursor/skills/copy-review/SKILL.md` | Revisar textos de interface |
| `kb-commit` | `.cursor/skills/kb-commit/SKILL.md` | Publicar mudanças no KB |

Consulte `SKILLS.md` para o mapa completo de orquestração entre skills.

---

## Convenções de escrita

- Idioma: português brasileiro em toda documentação
- Tom: direto, sem jargão corporativo genérico
- Formato: Markdown com tabelas, separadores `---` e **negrito** para termos-chave
- Títulos: sentence case (apenas primeira letra maiúscula, exceto nomes próprios)

---

## Contato

Mantenedor: **Cosme Faé** — c_fae.ext@dasa.com.br
