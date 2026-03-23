---
title: Subprojetos e Features — Dasa
tags: [subproject]
updated: 2026-03-19
---

# Subprojetos e Features — Dasa

Documentação de produtos e features específicas do ecossistema Dasa. Cada subprojeto complementa as regras gerais do DS com decisões e padrões próprios do produto.

## Subprojetos Ativos

### [`nav360/`](nav360/)
Nav360 — Plataforma principal de agendamento de exames e serviços Dasa. Contém fluxos, OKRs, casos especiais e componentes específicos do produto.

**Status**: Ativo
**Tier**: Standard / Executivo

### [`cartao-dasa/`](cartao-dasa/)
Cartão Dasa +Saúde - assinatura de descontos em serviços de saúde da Dasa e parceiros (consultas, exames, vacinas, medicamentos).

**Status**: Ativo  
**Tipo**: Produto/Assinatura

### [`alta-diagnosticos/`](alta-diagnosticos/)
Alta Diagnósticos - marca premium da Dasa focada em excelência diagnóstica (High Tech + High Touch).

**Status**: Ativo  
**Tipo**: Marca/Segmento

### [`atendimento-domiciliar/`](atendimento-domiciliar/)
Atendimento Domiciliar — produto de coleta de exames, vacinas e infusões na casa ou escritório do paciente.

**Status**: 🚧 Em construção
**Tipo**: Produto/Serviço

### [`vacinas/`](vacinas/)
Vacinas — produto dedicado ao agendamento e gestão da vacinação Dasa, incluindo calendário vacinal e cartão de vacinação.

**Status**: 🚧 Em construção
**Tipo**: Produto/Serviço

### [`figma-plugin.md`](figma-plugin.md)
Plugin Figma "Design Quality Checklist" - validação automática de designs contra Design System e guidelines do projeto. Opera offline-first com KB embarcada.

**Status**: ✅ Implementado  
**Tipo**: Ferramenta/Plugin  
**Localização**: [`../figma-plugin/`](../figma-plugin/)

## Como Adicionar Novos Subprojetos

1. Criar pasta com nome do subprojeto (ex: `novo-produto/`)
2. Adicionar `README.md` com documentação do produto/feature
3. Atualizar este README com link e descrição
4. Se necessário, criar subpastas para recursos específicos
