---
title: Nav360 — Plataforma de Agendamento Dasa
tags: [subproject, nav360]
updated: 2026-03-19
---

# Nav360 — Plataforma de Agendamento Dasa

> **Versão:** 1.0 | **Atualizado:** 2026-03-17 | **Tags:** #nav360 #agendamento #produto | **Status:** ✅ Estável

Contexto e diretrizes específicas do produto Nav360. Este documento complementa as regras gerais do DS Dasa com decisões, fluxos e padrões exclusivos desta plataforma.

**Regras gerais (aplicáveis a todos os produtos):** `docs/ux-guidelines.md`, `docs/design-system.md`, `docs/copy-rules.md`.

---

## Visão do Produto

Ser a plataforma de agendamento de exames e serviços de saúde mais intuitiva e eficiente do Brasil, reduzindo fricção e aumentando autonomia do paciente.

### Proposta de Valor
- **Agilidade:** Agendar exames em poucos minutos
- **Conveniência:** Mobile-first, disponível 24/7
- **Inteligência:** Personalização e sugestões relevantes
- **Autonomia:** Menos dependência de atendimento humano
- **Transparência:** Informações claras sobre regras, valores e disponibilidade

---

## Objetivos e Métricas

### OKRs de Referência

| Objetivo | KRs |
|----------|-----|
| Redesenhar o fluxo de agendamento | -30% etapas, +25% taxa de conclusão, -40% tempo médio |
| Reduzir contatos ao atendimento humano | -35% contatos ao suporte, +80% autoatendimento, +15pts NPS |
| Experiência mobile-first | 100% responsivo, touch targets ≥44px, carregamento <2s |

### Métricas Primárias (North Star)
- **Taxa de conversão (conclusão de agendamento):** Meta +25%
- **NPS do fluxo:** Meta +15 pontos
- **Redução de contatos ao suporte:** Meta -35%

### Métricas Secundárias
- Tempo médio para completar agendamento: Meta -40%
- Taxa de abandono por etapa: Meta -30%
- Uso de features (OCR, personalização): Monitorar adoção

---

## Fluxo de Agendamento

### Ordem das Etapas (Hipótese a validar)
1. O que você precisa? (exame/vacina)
2. Para quem? (você/terceiro)
3. Busca/seleção (com OCR opcional)
4. Tipo (urgência/rotina)
5. Forma de pagamento (convênio/particular)
6. Dados do convênio (se aplicável)
7. Onde? (unidade)
8. Quando? (data/horário)
9. Confirmar dados
10. Upsell (opcional, não bloqueante)
11. Confirmação

### Etapas Condicionais
- **Agendamento para terceiros:** Coletar dados da pessoa
- **Convênio:** Mostrar apenas se selecionado
- **Upsell:** Não deve bloquear conclusão

---

## OCR-First (Pedido Médico)

- Botão destacado: "Enviar foto do pedido"
- Upload de imagem otimizado
- Feedback de processamento
- Permitir editar resultados do OCR
- Fallback para digitação manual

---

## Busca de Exames

### Funcionalidades
- Autocomplete robusto
- Busca por sinônimos
- Correção de erro de digitação
- Resultados ordenados por relevância
- Mostrar exames mais comuns primeiro

### Estados
- **Vazio:** Sugerir exames populares
- **Digitando:** Mostrar sugestões em tempo real
- **Sem resultados:** Sugerir contato ou exames similares

### Seleção Múltipla
- Checkbox claros (min 44×44px)
- Indicador de quantos selecionados
- Ação de "Adicionar ao carrinho"
- Permitir remover itens

---

## Casos Especiais

### Agendamento para Terceiros
- Perguntar cedo no fluxo: "Para quem?"
- Coletar dados da outra pessoa
- Permitir adicionar múltiplas pessoas
- Revisar dados antes de confirmar

### Urgência vs Rotina

**Urgência:**
- Priorizar data/horário
- Mostrar disponibilidade imediata
- Simplificar escolhas

**Rotina:**
- Priorizar conveniência (unidade próxima)
- Mais flexibilidade de escolha
- Considerar preferências

### Convênio vs Particular

**Convênio:**
- Validar cobertura em tempo real
- Explicar regras claramente
- Não bloquear se indisponível (oferecer particular)

**Particular:**
- Fluxo otimizado (menos etapas)
- Mostrar valores claramente
- Pagamento integrado

---

## Upselling (Baixo Atrito)

### Princípios
- **Não bloqueante:** Nunca impedir conclusão
- **Relevante:** Baseado no contexto
- **Opcional:** Fácil de pular
- **Valor claro:** Explicar benefício

### Momento Ideal
- Após seleção de exames
- Antes da confirmação final
- Não no meio do fluxo crítico

### Apresentação
```
Sugestão

Pacientes que fazem Hemograma também fazem:
□ Vitamina D - R$ 45,00
□ TSH - R$ 38,00

[Adicionar ao agendamento] [Continuar sem adicionar]
```

---

## Componentes Específicos do Produto

### Card de Exame
```
[Ícone/Imagem]

Título do Exame
Descrição breve do exame

Duração: 15min
Jejum: 8h
Preparo necessário

R$ 85,00
[Agendar exame]
```

### Seletor de Data/Horário
- Calendário visual
- Destacar dias disponíveis
- Agrupar horários (manhã, tarde, noite)
- Indicar lotação (poucas vagas)

### Resumo de Agendamento
- Todos os dados em um card
- Permitir editar cada seção
- Botão primário: "Confirmar agendamento"

### Exemplo de Confirmação de Sucesso
```
✓ Exame agendado com sucesso!

Hemograma completo + Glicemia
Laboratório Delboni Sumaré
Sexta, 8 de julho às 9h

[Ver agendamento] [Voltar ao início]
```

---

## Restrições e Considerações

### Técnicas
- Integrações com sistemas legados
- Validação de convênio em tempo real
- Disponibilidade de agenda por unidade
- Regras de preparo por exame
- **Coparticipação indisponível:** Não existe endpoint para consultar valores de coparticipação em nenhum momento da experiência — não exibir dados estimados, fictícios ou placeholder de coparticipação na UI do paciente.

### Regulatórias
- LGPD (proteção de dados)
- Regulação de saúde (ANVISA, etc.)
- Regras de convênios e ANS

### Negócio
- **Não expor ao paciente:** Limitações técnicas devem ser invisíveis
- **Registrar requisitos futuros:** O que não for resolvido agora
- **Balancear:** Inovação vs viabilidade técnica

---

## Próximas Evoluções

### Curto Prazo (3–6 meses)
- Lançar novo fluxo mobile
- Monitorar métricas e iterar
- Expandir OCR e personalização
- A/B tests de variações

### Médio Prazo (6–12 meses)
- IA/Bot completo
- Pagamento integrado
- Fluxo unificado exames + vacinas + consultas
- Programa de fidelidade

### Longo Prazo (12+ meses)
- Ecossistema completo de saúde
- Integração com wearables
- Preditibilidade (sugerir exames antes do pedido)

---

## Nav360 como piloto de padrão dashboard

O Nav360 é o primeiro produto Dasa com arquitetura de dashboard/portal de paciente logado. Enquanto não existe um segundo produto com esta arquitetura, o Nav360 serve como referência piloto para o padrão de dashboard Dasa.

**Implicação para as skills:** A skill `.cursor/skills/nav360-brainstorm/SKILL.md` mantém nome produto-específico até que:
1. As hipóteses documentadas em `docs/subprojects/nav360/benchmarks-applied.md` sejam validadas com usuários
2. Um segundo produto dashboard justifique generalizar o padrão

Quando ambas as condições forem verdadeiras, a skill será renomeada para `brainstorm-dashboards` e suas regras de Layer 1 serão promovidas de hipóteses para padrão.

---

## Referências

- `docs/business-strategy.md` — Personas e estratégia
- `docs/ux-guidelines.md` — Princípios gerais de UX
- `docs/copy-rules.md` — Tom de voz e linguagem
- `docs/design-system.md` — Tokens e decisões de design
- `legacy/projeto-agendamento-nav360.md` — Briefing do sprint de origem (Nov 2025)
- `legacy/fluxo-agendamento/` — Especificações técnicas e wireframes históricos
