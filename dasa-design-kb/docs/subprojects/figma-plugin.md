---
title: Plugin Figma — Dasa Design Quality Checklist
tags: [subproject, figma]
updated: 2026-03-19
---

# Plugin Figma — Dasa Design Quality Checklist

**Repo:** [dasa-figma-plugin](https://github.com/design-dasa/dasa-figma-plugin)  
**Status:** ✅ Implementado

---

## O que é

Plugin Figma que audita designs contra o Design System Dasa. Valida tokens, copy, acessibilidade e uso de componentes, gerando um score e quick fixes automáticos.

## Relação com este repositório

O plugin consome `kb.json` do **próprio repositório `dasa-figma-plugin`** em runtime via:

```
https://raw.githubusercontent.com/design-dasa/dasa-figma-plugin/main/kb.json
```

Fallback: cache local (`figma.clientStorage`) → snapshot bundled na build.  
Para atualizar as regras do plugin, abra um PR no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin) editando `kb.json` diretamente naquele repo.

## O que o plugin valida

As regras ativas estão em `kb.json` no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin) (campos `rules`, `checklist`, `copy`). A estrutura de guidelines de componentes está em [`../specs/figma-mapping.md`](../specs/figma-mapping.md).
