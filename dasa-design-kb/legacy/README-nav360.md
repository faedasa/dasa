# DASA — Projeto Nav360

Versão **oficial e atual** da base de conhecimento do projeto Nav360/Dasa (sem versões históricas).

## Estrutura do Projeto

### Core (Raiz)
Documentos fundamentais do projeto:
- [`business-strategy.md`](business-strategy.md) — Objetivos, métricas e proposta de valor do fluxo de agendamento
- [`ux-guidelines.md`](ux-guidelines.md) — Princípios de design, acessibilidade e interações padrão
- [`copy-rules.md`](copy-rules.md) — Tom de voz, formatação de mensagens e frases-chave aprovadas
- [`design-system.md`](design-system.md) — Tokens, cores, tipografia e componentes reutilizáveis

### [`tokens/`](tokens/)
Export oficial do Design System (Figma / Tokens Studio): [`alm-tokens.json`](tokens/alm-tokens.json). Fonte de verdade para valores; design-system.md e o plugin Figma são derivados. Ver design-system.md (seção "Fonte dos tokens") e [`specs/figma-mapping.md`](specs/figma-mapping.md).

### [`specs/`](specs/)
Especificações técnicas e checklists:
- [`design-quality-checklist.md`](specs/design-quality-checklist.md) — Checklist de conformidade para agentes (Validation, Design transformation)
- [`figma-mapping.md`](specs/figma-mapping.md) — Mapeamento variáveis/componentes Figma ↔ design-system
- [`code-generation.md`](specs/code-generation.md) — Stack e estrutura de spec para o agente de Code generation (Figma → scaffold)

### [`subprojects/`](subprojects/)
Features e produtos específicos:
- [`cartao-dasa/`](subprojects/cartao-dasa/) — Cartão Dasa +Saúde (assinatura de descontos)
- [`alta-diagnosticos/`](subprojects/alta-diagnosticos/) — Marca premium Alta Diagnósticos (High Tech + High Touch)
- [`figma-plugin.md`](subprojects/figma-plugin.md) — Plugin Figma "Design Quality Checklist" (nível 5 do roadmap)

### [`figma-plugin/`](figma-plugin/)
Plugin Figma para validação automática de designs:
- Implementação completa do nível 5 do roadmap
- KB embarcada offline-first (~30-40 regras formais)
- Scanner, Rules Engine, Copy Checker e Quick Fixes
- Ver [`subprojects/figma-plugin.md`](subprojects/figma-plugin.md) para documentação detalhada

### [`mcp-figma/`](mcp-figma/)
Servidor MCP (Model Context Protocol) para integração Figma:
- Comunicação com API do Figma via MCP
- Tools customizadas: blueprint extraction, validação, mapeamento, detecção de templates
- Configuração para servidor oficial do Figma ou servidor customizado Dasa
- Ver [`mcp-figma/README.md`](mcp-figma/README.md) para documentação completa

### [`planning/`](planning/)
Planejamentos e roadmap:
- [`agentes-figma.md`](planning/agentes-figma.md) — Roadmap de integração agentes + Figma (níveis 4-6)

### [`legacy/`](legacy/)
Arquivos históricos e experimentais (referência apenas)

## Geração de Código (Agentes)

- **Stack canônica:** Web, mobile-first (375px); tokens em [`design-system.md`](design-system.md)
- **Specs técnicas:** Ver [`specs/code-generation.md`](specs/code-generation.md) para estrutura por tela/componente
- **Spec de referência detalhada:** [`legacy/fluxo-agendamento/dasa-agendamento-spec-tecnica.md`](legacy/fluxo-agendamento/dasa-agendamento-spec-tecnica.md)

## Como Usar

1. **Para design/implementação**: Consulte os arquivos core na raiz ([`business-strategy.md`](business-strategy.md), [`ux-guidelines.md`](ux-guidelines.md), [`copy-rules.md`](copy-rules.md), [`design-system.md`](design-system.md))
2. **Para validação técnica**: Veja [`specs/`](specs/) (checklists, mapeamentos, specs)
3. **Para validação automática no Figma**: Use o [`figma-plugin/`](figma-plugin/) — plugin pronto para uso
4. **Para integração MCP com Figma**: Configure o [`mcp-figma/`](mcp-figma/) — servidor MCP para comunicação com API do Figma
5. **Para features específicas**: Veja [`subprojects/`](subprojects/) (Cartão Dasa, Alta Diagnósticos, Plugin Figma)
6. **Para próximos passos**: Veja [`planning/`](planning/) (roadmap, pendências)
7. **Para contexto histórico**: Veja [`legacy/`](legacy/) (documentos antigos)

## Próximos Passos

Para roadmap de agentes + Figma (níveis 4-6), consulte [`planning/agentes-figma.md`](planning/agentes-figma.md).

**Status do Roadmap:**
- ✅ Nível 4: Biblioteca e templates oficiais no Figma
- ✅ Nível 5: Plugin Figma — **Implementado** ([`figma-plugin/`](figma-plugin/))
- 🔄 Nível 6: Backend + RAG

**Last updated**: 2026-02-13
