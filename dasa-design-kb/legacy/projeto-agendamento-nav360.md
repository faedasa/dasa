# Projeto: Revisão e Evolução do Fluxo de Agendamento (Nav360)

> **Versão:** 1.0 | **Data:** 2025-11-15 | **Tags:** #product #agendamento #mvp #technical | **Status:** ✅ Estável

---

## 📋 Contexto do Sprint
- **Duração:** 3 meses
- **Foco:** Agendamento de exames
- **Plataforma:** 100% Mobile-first

---

## 🎯 Objetivo Geral

Redesenhar o fluxo de agendamento para torná-lo:
- ✅ Mais direto e inteligente
- ✅ Alinhado aos Jobs to Be Done do usuário
- ✅ Menos fricção
- ✅ Mais autonomia
- ✅ Menor dependência de atendimento humano

---

## 🧩 1. Revisão do Fluxo Atual

### Foco
- Reavaliar ordem das etapas com lógica natural
- Menor esforço cognitivo

### Métodos
- Aplicar card sorting ou técnica equivalente
- Eliminar etapas que transferem complexidade operacional para usuário

---

## 🔍 2. Embasamento de Pesquisa

### Fontes
- Usar dados existentes
- Hipóteses documentadas
- Análises e validações pontuais

### Objetivo
- Identificar fricções que geram contato humano
- Identificar dúvidas recorrentes

---

## 👥 3. Considerações de Uso

### Cenários Obrigatórios desde o Início

1. **Agendamento para terceiros**
   - Considerar diferenças em regras e navegação

2. **Múltiplas pessoas no mesmo fluxo**
   - Agendamento simultâneo

3. **Fluxo unificado**
   - Possível integração exames + vacinas

---

## 🧠 4. Experiência e Feedbacks

### Princípios
- ✅ Alinhar com identidade visual Nav360
- ✅ Feedback claro sobre regras e restrições durante jornada
- ✅ Estruturar baseado em Jobs to Be Done (não limitações internas)

### Anti-padrão
- ❌ Restrições técnicas não devem "vazar" para usuário

---

## 💡 5. Ideias e Oportunidades a Explorar

### Lista de Oportunidades

| Oportunidade | Descrição |
|--------------|-----------|
| **Personalização** | Experiência adaptada ao perfil do usuário |
| **Perguntas restritivas** | Momento ideal para perguntar restrições/requisitos |
| **Solicitação de convênio** | Quando e como coletar dados do convênio |
| **Upselling** | Exames/vacinas recomendados com baixo atrito |
| **IA/Bot** | Apoio ao agendamento (representar onde poderia existir) |
| **Pagamento integrado** | Checkout dentro do fluxo |
| **Busca robusta** | Melhoria na busca de exames/unidades |
| **Seleção múltipla** | Adicionar múltiplos itens de uma vez |
| **OCR-first** | Leitura automática de pedidos médicos |
| **Fluxo particular otimizado** | Experiência sem fricção para particulares |
| **Tipo de urgência** | Diferenciar urgência vs rotina |

### Tipos de Agendamento

**Urgência:**
- Data é essencial
- Priorizar disponibilidade imediata

**Rotina:**
- Conveniência de unidade mais próxima
- Preferências do usuário (horário, local)

---

## ⚙️ 6. Limitações e Alertas

### Regras
- ⚠️ Restrições técnicas de back-end NÃO devem "vazar" para usuário
- ⚠️ O que não for resolvido de imediato = registrar como requisito futuro
- ⚠️ Criar backlog de melhorias técnicas

---

## ❓ Perguntas que o Product Designer Deve Responder

### Fluxo e Navegação
1. Qual é a nova sequência ideal do fluxo e por quê?
2. O agendamento para terceiros muda apenas regras ou também navegação?
3. Fluxos de exames e vacinas devem ser integrados ou separados?

### Dados e Identificação
4. Em que momento o usuário deve se identificar?
5. Quando fornecer dados do convênio?

### Personalização e Valor
6. Quais pontos de personalização geram mais valor?
7. Como encaixar upselling com baixo atrito?

### Casos Específicos
8. Como resolver o caso particular sem fricção?
9. OCR-first substitui formulários ou entra como opção?
10. IA entra como automação total ou assistente dentro do fluxo?

### Validação e Regras
11. Quais regras precisam estar claras sem parecer impeditivo?
12. Como validar as escolhas de ordenação e etapas?

### Métricas
13. Como medir se o novo fluxo reduz abandono ou dúvidas?

---

## 📦 Entregáveis Esperados

### 1. Mapeamento
- [ ] Mapa do fluxo atual com dores e pontos críticos

### 2. Proposta de Solução
- [ ] Proposta de novo fluxo (user flow ou service blueprint)
- [ ] Jornada segmentada por perfil/uso (titular vs terceiro)

### 3. Design
- [ ] Wireframes ou protótipo navegável (alta ou média fidelidade)

### 4. Validação
- [ ] Validação com usuários ou stakeholders (pesquisa leve ou teste rápido)

### 5. Conteúdo
- [ ] Recomendações de conteúdo e linguagem para feedbacks e regras

### 6. Documentação Técnica
- [ ] Backlog de melhorias técnicas ou dependências futuras
- [ ] Checklist de impactos em dev e integração (pagamento, dados, busca)

### 7. Métricas
- [ ] Critérios de sucesso + métricas esperadas
  - Redução de abandono
  - Queda em contatos humanos
  - Outras KPIs

### 8. Handoff
- [ ] Documentação final (design specs + fluxos + expectativas de implementação)

---

## 🎨 Considerações de Design

### Mobile-First
- ✅ Todo design deve priorizar mobile
- ✅ Touch targets adequados (min 44x44px)
- ✅ Thumbzone-friendly
- ✅ Scroll vertical natural
- ✅ Formulários otimizados para mobile

### Jobs to Be Done (JTBD)

**Principais jobs:**
1. "Preciso agendar um exame de forma rápida"
2. "Quero agendar perto de casa/trabalho"
3. "Preciso agendar para minha família"
4. "Tenho convênio e quero usar"
5. "Preciso de um exame urgente"
6. "Quero ver resultados anteriores enquanto agendo"

### Redução de Fricção

**Pontos críticos a eliminar:**
- ❌ Etapas desnecessárias
- ❌ Informações muito cedo no fluxo
- ❌ Formulários longos
- ❌ Regras não explicadas
- ❌ Falta de feedback em tempo real
- ❌ Impossibilidade de editar após avançar

**Soluções:**
- ✅ Progressive disclosure
- ✅ Smart defaults
- ✅ Autocomplete e sugestões
- ✅ Validação inline
- ✅ Breadcrumbs claros
- ✅ Possibilidade de voltar/editar

---

## 📊 Métricas de Sucesso

### Primárias
- Taxa de conclusão do agendamento
- Redução de abandono por etapa
- Tempo médio para completar agendamento

### Secundárias
- Redução de contatos ao atendimento
- NPS do fluxo de agendamento
- Taxa de erro em preenchimento
- Uso de features (OCR, IA, etc)

### Métricas Técnicas
- Performance (tempo de carregamento)
- Taxa de erro de sistema
- Disponibilidade do serviço

---

## 🔄 Fluxo Sugerido (Hipótese Inicial)

### Ordem Proposta
1. **O que você precisa?** (exame/vacina)
2. **Para quem?** (você/terceiro)
3. **Busca/seleção de itens** (com OCR opcional)
4. **Tipo de atendimento** (urgência/rotina)
5. **Forma de pagamento** (convênio/particular)
6. **Dados do convênio** (se aplicável)
7. **Onde?** (unidade - baseado em preferência/urgência)
8. **Quando?** (data/horário disponível)
9. **Confirmar dados** (revisão)
10. **Upsell** (opcional, não bloqueante)
11. **Confirmação** (resumo + próximos passos)

> ⚠️ Esta ordem deve ser validada com pesquisa e dados

---

## 🚀 Quick Wins

Melhorias de impacto rápido:

1. **Autocomplete de exames** - reduz erro de digitação
2. **Lembrar última unidade** - conveniência
3. **OCR de pedido** - elimina digitação
4. **Smart defaults** - pré-selecionar opções comuns
5. **Feedback inline** - validação em tempo real
6. **Breadcrumbs visuais** - orientação no fluxo

---

## 📚 Referências Rápidas

### Arquivos Relacionados
- `copy-rules.md` - Regras de linguagem e tom
- `ux-guidelines.md` - Princípios de UX
- `design-system.md` - Componentes e tokens

### Comandos Úteis
- `/design-review` - Revisar design com guidelines
- `/figma-to-code` - Gerar código do Figma

---

## ✅ Checklist Diário

Ao trabalhar no projeto, verificar:

- [ ] Está otimizado para mobile?
- [ ] Segue as regras de copy da Dasa?
- [ ] Reduz fricção do fluxo atual?
- [ ] Considera cenário de terceiros?
- [ ] Dá feedback claro ao usuário?
- [ ] Não expõe limitações técnicas?
- [ ] Está alinhado com Jobs to Be Done?
- [ ] Usa componentes do design system?
- [ ] Métricas de sucesso estão claras?
- [ ] Validação com usuários planejada?
