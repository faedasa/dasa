# Changelog

All notable changes to the Dasa Design Quality Checklist plugin will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Conventional Commits](https://www.conventionalcommits.org/).

---

## [Unreleased]

### Added

- **DS Match tab** — nova aba que detecta, para cada frame selecionado, componentes locais ou de biblioteca com estrutura similar. Algoritmo de matching em 3 camadas: `detachedInfo` (re-vínculo direto), fingerprint estrutural (childCount + childTypes + layoutMode + aspectRatio) e similaridade de nome (Levenshtein).
- **Token Match tab** — nova aba "Tokens" que lista todos os valores sem vínculo ao DS (`*_BIND_01` findings), agrupados por tipo (Cor, Espaçamento, Raio, Tipografia), com botão "Vincular" por card e "Vincular todos" em bulk.
- **Popup de comparação para DS Match** — ao clicar num card do DS Match, abre popup com screenshots reais do frame e do componente sugerido (via `exportAsync`), badge de tipo de match, score de confiança e botão "Associar".
- **Ação Associar** — substitui o frame por uma nova instância do componente do DS na mesma posição e parent. Suporta componentes locais (`createInstance`) e de biblioteca (`importComponentByKeyAsync`). Desfazível com Cmd+Z.
- **Preview de componentes de biblioteca** — `GET_NODE_PREVIEW` agora aceita `componentKey` para importar e exportar thumbnails de componentes de bibliotecas habilitadas no arquivo.
- **`src/main/componentMatcher.ts`** — motor de matching com scoring Jaccard-like para fingerprints estruturais.
- **`permissions: ["teamlibrary"]`** em `manifest.json` para suporte a componentes de biblioteca.

### Changed

- Plugin ampliado de 420px → 460px para acomodar 5 abas sem overflow.
- Abas com `white-space: nowrap`, `flex-shrink: 0` e `overflow-x: auto` para layout robusto.
- Removido `networkAccess` do `manifest.json` (KB compilado localmente via `bundled.ts`).
- `AuditResult` agora inclui campo `componentSuggestions: ComponentSuggestion[]`.
- `ScannedNode` agora inclui campo opcional `detachedFrom` com info de `detachedInfo` da Figma API.
- Novos tipos de mensagem UI↔Main: `GET_NODE_PREVIEW`, `SWAP_WITH_COMPONENT`, `NODE_PREVIEW`, `FOCUS_COMPONENT`.
