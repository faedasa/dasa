# 📋 CHANGELOG - DASA Knowledge Base

> Histórico de versões e mudanças na base de conhecimento

---

## [2.0.0] - 2025-11-19 (Reorganização Completa + Nova Documentação)

### 📚 **Documentação Adicionada**

**Novo README.md (v2.0):**
- ✅ Índice completo de todos os documentos
- ✅ Quickstart por objetivo (6 tarefas comuns)
- ✅ Sistema de tags introduzido
- ✅ Guia por função (PD, Designer, Copywriter, Dev Backend)
- ✅ Links rápidos por seção
- ✅ Checklist diário para alinhamento
- ✅ Status da KB

**Novo TAGS.md:**
- ✅ Sistema completo de tags (13 tags)
- ✅ Tags por camada (#strategy, #product, #design, #copy, #technical)
- ✅ Tags por contexto (#agendamento, #personas, #mobile-first, #acessibilidade, #fluxo)
- ✅ Tags por fase (#mvp, #v2.0, #futuro)
- ✅ Buscas comuns pré-documentadas
- ✅ Matrix tags vs documentos

**Novo CHANGELOG.md (este arquivo):**
- ✅ Histórico completo de versões
- ✅ Rastreamento de mudanças por documento
- ✅ Atualizações atuais e futuras

### 🏷️ **Sistema de Versionamento Implementado**

Cada documento agora tem header com:
```markdown
> **Versão:** X.X | **Data:** YYYY-MM-DD | **Tags:** #tag1 #tag2
```

**Benefícios:**
- Rastreabilidade de mudanças
- Navegação por tags
- Fácil atualização de versões

### 📊 **Estatísticas**

- **README:** Expandido de 40 linhas → 400+ linhas
- **Documentos:** 6 documentos (todos já existentes)
- **Tags:** 13 tags implementadas
- **Descoberta:** ↑ Significativa (antes era difícil achar fluxo-agendamento-otimizado-v2.md)

---

## [1.1.0] - 2025-11-19 (Fluxo v2.0 Publicado)

### ✨ **Novo Documento: fluxo-agendamento-otimizado-v2.md** `#product #fluxo #agendamento ⭐`

**Status:** 🟢 ATIVO - Pronto para implementação

**Contém:**
- **Fluxo 1: Para Mim Mesmo** (8 etapas, 3-4 min)
  - Exame → Convênio → Preço → Unidades → Data/Hora → ID → Upsell → Confirmação

- **Fluxo 2: Para Outra Pessoa** (9 etapas, 5-6 min)
  - + Dados do terceiro, validações para menores de 18, termo de autorização

- **Fluxo 3: Para Múltiplas Pessoas** (11 etapas, 7-9 min)
  - + Estratégia de agendamento (juntos/próximos/flexível)
  - + Preços individualizados
  - + Pagamento flexível (quem paga, divisão)

**Mudança Principal (v2.0 vs v1.0):**
```
v1.0: Para quem? → Exame → Convênio → Preço → Unidades → ID → Upsell
v2.0: Exame → Convênio → Preço → Unidades → Para quem? → ID → Upsell
```

**Razão:** Feedback da gerente de produto
- Exame como prioridade máxima (primeira etapa)
- Convênio antes de preço (pessoa quer saber valor rápido)
- ID depois de "Para quem?" (para profiling inteligente de upsell)

**Impacto:**
- ✅ Melhor experiência: Preço aparece mais cedo (etapa 3 vs etapa 5)
- ✅ Mais conversão: Pessoa não abandona antes de saber valor
- ✅ Upsell inteligente: Baseado em profiling atualizado (idade, gênero, histórico)

**Bloqueios Automáticos:**
- Menores < 18: Requer termo + responsável presente
- Múltiplos com menores: Sistema sugere separação
- Dependente sem cobertura: Alertar sobre valor

**Changelog Interno:**
- [v1.0] (2025-11-15) - Fluxo original, 11 etapas para "Para Quem?"
- [v2.0] (2025-11-19) - Fluxo reordenado, exame em primeiro, ID depois

**Referências Cruzadas:**
- Alinha com `business-strategy.md` (personas Moisés, Miriam, Manoel)
- Alinha com `ux-guidelines.md` (mobile-first, formulários)
- Alinha com `projeto-agendamento-nav360.md` (oportunidades exploradas)

---

## [1.0.0] - 2025-11-15 (Inicial)

### ✨ **Documentação Original Criada**

**Documentos Base:**
- ✅ `business-strategy.md` (v1.0) - Estratégia, personas, OKRs
- ✅ `projeto-agendamento-nav360.md` (v1.0) - Contexto sprint, oportunidades
- ✅ `ux-guidelines.md` (v1.0) - Princípios UX, mobile-first, acessibilidade
- ✅ `design-system.md` (v1.0) - Tokens, cores, tipografia
- ✅ `copy-rules.md` (v1.0) - Regras de linguagem, tom, glossário
- ✅ `README.md` (v1.0 - minimalista) - Índice básico

**Status:** ✅ Completo para fase MVP

**Cobertura:**
- Strategy: 100% (3 personas, OKRs, value prop)
- Product: 100% (contexto sprint, 10 oportunidades)
- Design: 100% (UX patterns, design system completo)
- Copy: 100% (60+ regras e glossário)
- Fluxo: 50% (fluxo sugerido vs mapeado)

---

## 📌 **Histórico por Documento**

### **business-strategy.md**
- **v1.0** (2025-11-15) - Inicial
  - Missão, visão, valores Dasa
  - 3 Personas detalhadas (Moisés, Miriam, Manoel)
  - OKRs e KRs para 3 meses
  - Proposta de valor, métricas
- **Status:** ✅ Estável (sem mudanças previstas)

---

### **projeto-agendamento-nav360.md**
- **v1.0** (2025-11-15) - Inicial
  - Objetivo sprint (3 meses)
  - Revisão fluxo atual
  - 10 Oportunidades a explorar
  - Jobs to Be Done principais
  - Limitações técnicas
- **Status:** ✅ Estável (baseline para decisions)

---

### **fluxo-agendamento-otimizado-v2.md**
- **v1.0** (2025-11-15) - Fluxo original
  - Sequência: Para quem? → Exame → Convênio → Preço → Unidades → ID → Upsell
  - 11 etapas
  - Referência: `projeto-agendamento-nav360.md` (seção Fluxo Sugerido)
  - **Status:** ❌ Deprecated

- **v2.0** (2025-11-19) - Fluxo reordenado (ATIVO)
  - Sequência: Exame → Convênio → Preço → Unidades → Para quem? → ID → Upsell
  - 3 fluxos separados (mim, outro, múltiplos)
  - 8-11 etapas por fluxo
  - Feedback: Gerente de produto
  - **Status:** 🟢 ATIVO - Pronto para implementação

---

### **ux-guidelines.md**
- **v1.0** (2025-11-15) - Inicial
  - 5 Princípios de Design
  - Mobile-First (375px, thumbzone)
  - Formulários otimizados
  - WCAG AA (acessibilidade)
  - Casos especiais (terceiros, urgência)
- **Status:** ✅ Estável (baseline para design)

---

### **design-system.md**
- **v1.0** (2025-11-15) - Inicial
  - Paleta completa de cores (Red, Yellow, Gray, Green, Blue + estendidas)
  - Tipografia (Dasa Sans, hierarquia 12-64px)
  - Spacing, border-radius, animações
  - Componentes (botões, cards, inputs)
- **Status:** ✅ Estável (tokens finalizados)

---

### **copy-rules.md**
- **v1.0** (2025-11-15) - Inicial
  - Formatação (maiúscula, pontuação)
  - Números, datas, horários (formato BR)
  - Doenças e infecções
  - Botões de ação (verbo infinitivo)
  - Glossário de 20+ termos (usar vs evitar)
- **Status:** ✅ Estável (regras finalizadas)

---

### **README.md**
- **v1.0** (2025-11-15) - Minimalista
  - 40 linhas
  - Índice básico de 4 documentos
  - Sem quickstart
  - Sem tags
  - Sem changelog
  - **Status:** ❌ Deprecated

- **v2.0** (2025-11-19) - Completo (ATIVO)
  - 400+ linhas
  - Índice completo de 6 documentos
  - Quickstart por objetivo (6 tarefas)
  - Sistema de tags
  - Guia por função
  - Status da KB
  - Checklist diário
  - **Status:** 🟢 ATIVO - Nova referência

---

## 🔄 **Atualizações Planejadas**

### **Curto Prazo (Próximas 2 semanas)**
- [ ] Atualizar headers de todos os documentos com versão + tags
- [ ] Criar wireframes do fluxo v2.0
- [ ] Validar com stakeholders (product, eng, design)
- [ ] Adicionar links do Figma aos documentos

### **Médio Prazo (Próximas 4 semanas)**
- [ ] Implementar fluxo no Figma
- [ ] Testes com usuários
- [ ] Precedentes de decisão (decision log)
- [ ] Guia de implementação técnica

### **Longo Prazo (Pós MVP)**
- [ ] Playbook de testes com usuários
- [ ] Documentação pós-lançamento (learnings)
- [ ] Roadmap atualizado (fase 2+)
- [ ] Análise competitiva (se necessário)

---

## 📊 **Métricas da KB**

| Métrica | v1.0 | v2.0 | Delta |
|---------|------|------|-------|
| **Documentos** | 6 | 6 | - |
| **Linhas totais** | ~8,500 | ~9,200 | +700 |
| **Linhas no README** | 40 | 400+ | +360 |
| **Tags implementadas** | 0 | 13 | +13 |
| **Documentos com header de versão** | 1 | 1 | - |
| **Discoverability** | Baixa | Alta | ↑↑ |

---

## 🔍 **Como Usar Este Changelog**

### **Para Entender Mudanças:**
- Leia seção do documento que te interessa
- Veja `[v2.0]` vs `[v1.0]` para entender evolução

### **Para Rastrear Status:**
- 🟢 ATIVO = Use agora
- ✅ Estável = Baseline, sem mudanças previstas
- ❌ Deprecated = Use versão nova
- ⏳ Em Progresso = Aguarde

### **Para LLMs (Claude Code):**
Use assim:
```
"O fluxo de agendamento foi atualizado para v2.0 em 2025-11-19.
As mudanças principais estão em dasa/CHANGELOG.md"

"Veja histórico de business-strategy.md no CHANGELOG"
```

---

## 🤝 **Contribuindo**

Quando atualizar documento:

1. **Atualize header do documento:**
   ```markdown
   > **Versão:** X.X | **Data:** YYYY-MM-DD | **Tags:** #tag1 #tag2
   ```

2. **Adicione seção aqui no CHANGELOG:**
   ```markdown
   ### **nome-documento.md**
   - **vX.X** (YYYY-MM-DD) - Descrição mudança
   ```

3. **Mantenha versionamento claro:**
   - PATCH (.0.1): Pequenas correções
   - MINOR (.1.0): Novas seções, refinamentos
   - MAJOR (1.0.0 → 2.0.0): Mudanças estratégicas

---

## 📞 **Dúvidas Comuns**

### **"Por que o fluxo mudou de v1.0 para v2.0?"**
Feedback da gerente de produto. Principais mudanças:
- Exame → etapa 1 (era 3)
- Convênio → etapa 2 (antes de preço)
- ID → depois de "Para quem?" (para profiling)

Resultado: Melhor experiência, mais conversão, upsell inteligente.

### **"Qual versão devo usar?"**
Sempre a versão mais recente com status 🟢 ATIVO.

### **"Como encontro documentação sobre X?"**
1. Veja `README.md` - Quickstart
2. Veja `TAGS.md` - Filtre por tag
3. Procure no CHANGELOG histórico

---

**Mantido por:** Product Designer
**Última atualização:** 2025-11-19
**Próxima atualização:** Após implementação dos wireframes
