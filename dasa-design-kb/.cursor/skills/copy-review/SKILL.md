---
name: copy-review
description: "Revisa textos de interface contra as regras de copy do Design System Dasa — glossário, termos proibidos, CTAs, capitalização e mensagens de erro."
version: "1.0"
language: pt-BR
allowed-tools: [Read]
tags: [copy, design-system, revisão]
---

# Skill: copy-review

Revisa textos de interface contra as regras de copy do Design System Dasa.

## Quando usar

Acione esta skill quando:
- "revise esse copy"
- "cheque essa frase"
- "esse texto está correto?"
- "valide o copy da tela X"
- Qualquer revisão de texto de interface (labels, CTAs, mensagens de erro, títulos)

### Quando NÃO usar

- Revisão de código (tokens, acessibilidade, componentes) → use `quality-gate`
- Implementar frame do Figma → use `implement-design`
- Commit de mudanças no KB → use `kb-commit`

## Arquivos de referência

- `docs/copy-rules.md` — regras de copy e tom de voz

## Como executar

### Passo 1 — Carregar as regras de copy

Leia `docs/copy-rules.md`:

```
@docs/copy-rules.md
```

### Passo 2 — Receber o texto

Peça ao usuário o texto a revisar se não foi fornecido. Pode ser:
- Um único label/CTA
- Um bloco de copy (múltiplas strings)
- Uma tela inteira em formato texto

### Passo 3 — Revisar

Para cada string de texto, verifique:

#### 3a. Glossário

Consulte a seção "Palavras que Usamos (e Quais Evitamos)" em `copy-rules.md`. Se encontrar termos da coluna "Evitar", sinalize.

Exemplo:
- "Ver detalhes" → deve ser "Mostrar detalhes"
- "usuário" → deve ser "paciente"

#### 3b. Termos proibidos

Consulte a seção "Palavras que NÃO Usamos" em `copy-rules.md`. Verifique ocorrências exatas e variações de capitalização.

#### 3c. CTAs (botões, links de ação)

Identifique textos que são CTAs (verbos no infinitivo + complemento, geralmente em botões). Valide contra as regras da seção "Botões de Ação (CTA)" em `copy-rules.md`:
- Entre 2 e 3 palavras
- Sem ponto final
- CTAs proibidos: "Continuar", "Próximo", "Avançar"
- Formato: deve iniciar com verbo no infinitivo

#### 3d. Capitalização

Regra padrão: apenas a primeira palavra em maiúscula em labels e títulos, exceto nomes próprios (Dasa, Delboni, Alta, Nav, Covid, HIV, Aids, IST).

Sinalizar se:
- Palavra do meio está com maiúscula (ex: "Agendar Exame" → errado; "Agendar exame" → correto)
- Nome próprio não capitalizado (ex: "dasa" → "Dasa")

#### 3e. Mensagens de erro

Se o texto começa com "Erro:" → sinalizar. Mensagens de erro devem ser empáticas e acionáveis.

### Passo 4 — Montar relatório

Retorne no formato abaixo. Use PT-BR.

```
## Revisão de copy

### [Texto analisado]

| Dimensão | Status | Problema | Sugestão |
|---|---|---|---|
| Glossário | ✅ | — | — |
| Termos proibidos | ❌ | "Ver mais" encontrado | Usar "Mostrar detalhes" |
| CTA | ✅ | — | — |
| Capitalização | ❌ | "Agendar Exame" (E maiúsculo) | "Agendar exame" |
| Mensagem de erro | ✅ | — | — |

**Versão corrigida:** `Mostrar detalhes`
```

Se não houver problemas: diga que o copy está em conformidade com o DS Dasa.

## Output esperado

Tabela por dimensão (Glossário, Termos proibidos, CTA, Capitalização, Mensagens de erro) com status ✅/❌, problema e sugestão + versão corrigida do texto.

## Notas

- Esta revisão é baseada em `docs/copy-rules.md`. Se o arquivo foi atualizado recentemente, releia-o antes de revisar.
- Em caso de dúvida sobre intenção do texto, pergunte ao designer antes de sugerir correção.
- Skill terminal — não aciona outras. É chamada diretamente pelo usuário ou pelo `quality-gate` (dimensão 3d — copy inline profundo).
