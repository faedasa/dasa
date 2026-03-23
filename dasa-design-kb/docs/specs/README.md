---
title: Especificações Técnicas — Design System Dasa
tags: [specs]
updated: 2026-03-19
---

# Especificações Técnicas — Design System Dasa

Contratos de conhecimento para os agentes de IA que trabalham com produtos Dasa.

## Arquivos

| Arquivo | Consumidor | O que define |
|---|---|---|
| [`figma-mapping.md`](figma-mapping.md) | `quality-gate` skill, agentes de code gen | Regras de uso de componentes (quando usar, quando não usar, obrigações visuais) |
| [`code-generation.md`](code-generation.md) | Agente de Code generation (futuro) | Stack canônica, estrutura de spec por tela, decisões arquiteturais |

## Sobre regras de validação

As regras de qualidade (checklist de tokens, copy, UX, acessibilidade, componentes) vivem em `kb.json` nos campos `rules` e `checklist`. São consumidas diretamente pelo plugin Figma e pela `quality-gate` skill.

> O `kb.json` referenciado acima vive no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin), não neste repositório. Para atualizar regras ou checklist do plugin, abra um PR naquele repo.
