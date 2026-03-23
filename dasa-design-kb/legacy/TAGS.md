# 🏷️ TAGS - DASA Knowledge Base

> Sistema de tags para navegação e discovery rápido

---

## 📂 **Tags de Camada**

### `#strategy`
Documentos relacionados a estratégia, visão, negócio e personas.

**Documentos:**
- `business-strategy.md` - Missão, visão, valores, personas, OKRs

**Quando usar:** Preciso entender o "porquê" e "para quem"

---

### `#product`
Documentos relacionados a produto, fluxos, features e jornada do usuário.

**Documentos:**
- `projeto-agendamento-nav360.md` - Contexto do sprint, oportunidades
- `fluxo-agendamento-otimizado-v2.md` - 3 fluxos principais (ATIVO)

**Quando usar:** Preciso entender decisões de produto, fluxos, sequência

---

### `#design`
Documentos relacionados a UX, guidelines, acessibilidade e design system.

**Documentos:**
- `ux-guidelines.md` - Princípios, padrões, mobile-first, acessibilidade
- `design-system.md` - Tokens, cores, tipografia, componentes

**Quando usar:** Vou fazer layout, revisar design ou codificar componentes

---

### `#copy`
Documentos relacionados a tom de voz, linguagem, conteúdo e regras de escrita.

**Documentos:**
- `copy-rules.md` - Formatação, glossário, regras, estilo

**Quando usar:** Vou escrever copy, labels, mensagens ou validar tom

---

### `#technical`
Documentos relacionados a implementação técnica, validações e limites.

**Documentos:**
- `projeto-agendamento-nav360.md` - Limitações técnicas, alertas
- `design-system.md` - Tokens, componentes, implementação

**Quando usar:** Vou codificar ou entender restrições técnicas

---

## 🎯 **Tags de Contexto**

### `#agendamento`
Tudo relacionado ao fluxo de agendamento de exames.

**Documentos:**
- `fluxo-agendamento-otimizado-v2.md` - 3 fluxos (para mim, para outro, para múltiplos)
- `projeto-agendamento-nav360.md` - Contexto e oportunidades
- `ux-guidelines.md` - Padrões específicos para agendamento
- `business-strategy.md` - Personas e Jobs

**Quando usar:** Estou trabalhando no fluxo de agendamento

---

### `#personas`
Tudo relacionado aos perfis de usuários (personas).

**Documentos:**
- `business-strategy.md` - 3 Personas detalhadas:
  - 🎯 Moisés (34, Standard) - O Malabarista
  - 🎯 Miriam (28, Executivo) - Profissional em Ascensão
  - 🎯 Manoel (62, Premium) - Executivo Resistente

**Quando usar:** Preciso validar se design/copy alinha com persona

---

### `#mobile-first`
Tudo relacionado a mobile, responsividade e otimização mobile.

**Documentos:**
- `ux-guidelines.md` - Mobile-First (375px, thumbzone, touch targets)
- `design-system.md` - Breakpoints, spacing móvel
- `fluxo-agendamento-otimizado-v2.md` - Tempos estimados

**Quando usar:** Vou otimizar para mobile ou validar responsividade

---

### `#acessibilidade`
Tudo relacionado a acessibilidade, inclusão, WCAG AA.

**Documentos:**
- `ux-guidelines.md` - WCAG AA, contraste, navegação teclado, screen readers
- `design-system.md` - Contraste, touch targets, tipografia

**Quando usar:** Vou validar acessibilidade ou implementar inclusão

---

### `#fluxo`
Tudo relacionado a fluxos de usuário, jornadas e ordem de etapas.

**Documentos:**
- `fluxo-agendamento-otimizado-v2.md` - 3 fluxos detalhados com etapas
- `projeto-agendamento-nav360.md` - Fluxo atual vs oportunidades
- `ux-guidelines.md` - Padrões de navegação

**Quando usar:** Estou implementando ou validando fluxo

---

## 🔄 **Tags de Fase**

### `#mvp`
Relevante para MVP (3 meses) - Escopo mínimo para lançamento.

**Documentos:**
- `projeto-agendamento-nav360.md` - Objetivos e scope MVP
- `fluxo-agendamento-otimizado-v2.md` - 3 fluxos (escopo MVP)
- `ux-guidelines.md` - Padrões MVP
- `business-strategy.md` - OKRs e KRs

**Quando usar:** Estou priorizando ou definindo escopo para MVP

---

### `#v2.0`
Versão atual do fluxo de agendamento (otimizado).

**Documentos:**
- `fluxo-agendamento-otimizado-v2.md` - v2.0 ATIVO
  - Mudança principal: Exame → Convênio → Preço (antes era Para quem? → Exame)

**Quando usar:** Estou implementando fluxo current (v2.0)

---

### `#futuro`
Roadmap pós-MVP, oportunidades futuras, nice-to-have.

**Documentos:**
- `projeto-agendamento-nav360.md` - Oportunidades a explorar:
  - OCR-first para pedidos médicos
  - IA/Bot para apoio
  - Upselling inteligente
  - Pagamento integrado
  - Fluxo unificado exames + vacinas

**Quando usar:** Estou planejando melhorias futuras

---

## 🔍 **Buscas Comuns por Tag**

### "Entender o projeto DASA"
```
#strategy + #agendamento
```
Leia: `business-strategy.md` + `projeto-agendamento-nav360.md`

### "Implementar fluxo de agendamento"
```
#product + #fluxo + #agendamento
```
Leia: `fluxo-agendamento-otimizado-v2.md` (em detalhes)

### "Revisar design"
```
#design + #mobile-first + #acessibilidade
```
Leia: `ux-guidelines.md` + `design-system.md`

### "Escrever copy"
```
#copy + #personas
```
Leia: `copy-rules.md` + `business-strategy.md` (personas)

### "Validar mobile"
```
#design + #mobile-first + #acessibilidade
```
Leia: `ux-guidelines.md` (Mobile-First section) + `design-system.md` (breakpoints)

### "Entender personas"
```
#strategy + #personas
```
Leia: `business-strategy.md` (Moisés, Miriam, Manoel)

### "Implementar código"
```
#technical + #design
```
Leia: `design-system.md` (tokens) + `ux-guidelines.md` (padrões)

### "Preparar para futuro"
```
#futuro + #product
```
Leia: `projeto-agendamento-nav360.md` (oportunidades)

---

## 📊 **Matrix: Tags vs Documentos**

| Documento | Strategy | Product | Design | Copy | Technical | Agendamento | Personas | Mobile | Acessibilidade | Fluxo | MVP | v2.0 | Futuro |
|-----------|----------|---------|--------|------|-----------|------------|----------|--------|----------------|-------|-----|------|--------|
| **business-strategy.md** | ✅ | | | | | | ✅ | | | | ✅ | | |
| **projeto-agendamento-nav360.md** | ✅ | ✅ | | | ✅ | ✅ | | | | ✅ | ✅ | | ✅ |
| **fluxo-agendamento-otimizado-v2.md** | | ✅ | | | | ✅ | | | | ✅ | ✅ | ✅ | |
| **ux-guidelines.md** | | | ✅ | | ✅ | | | ✅ | ✅ | ✅ | ✅ | | |
| **design-system.md** | | | ✅ | | ✅ | | | ✅ | ✅ | | | | |
| **copy-rules.md** | | | | ✅ | | | ✅ | | | | ✅ | | |

---

## 🎓 **Como Usar Esta Página**

### **Para Descobrir Conteúdo:**
1. Identifique a **tag principal** do que você precisa
2. Veja quais documentos têm essa tag
3. Clique no documento e aproveite

### **Para LLMs (Claude Code):**
Use tags assim:
```
"Procure documentos com tag #design + #mobile-first
para revisar este layout"

"Valide copy seguindo #copy + #personas
para garantir alinhamento"

"Implemente fluxo conforme #product + #fluxo
e valide contra #acessibilidade"
```

### **Para Manutenção:**
Quando adicionar documento novo:
1. Adicione 1-3 tags principais no header
2. Atualize esta página
3. Atualize CHANGELOG.md

---

## 📈 **Estatísticas**

- **Total documentos:** 6
- **Total tags:** 13
- **Tags por documento (média):** 2-3
- **Documentos multi-tag:** 3

---

**Mantido por:** Product Designer
**Última atualização:** 2025-11-19
**Sistema ativo:** Sim
