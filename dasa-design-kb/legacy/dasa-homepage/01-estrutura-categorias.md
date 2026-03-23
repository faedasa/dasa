# 🏠 HOME PAGE DASA - Estrutura de Categorias & Cards (Netflix-style)

> **Versão:** 1.0 | **Data:** 2025-11-28 | **Tags:** #homepage #discovery #comercial #mvp | **Status:** 📐 Estrutura

---

## 📱 VISÃO GERAL DA HOME PAGE

### Layout Hierárquico (Mobile 375px)

```
┌─────────────────────────────────────┐
│                                     │
│  🏥 DASA LOGO                      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ✨ HERO SECTION                    │
│  "Cuide da sua saúde em             │
│   3 cliques. Rápido, seguro,        │
│   confiável."                       │
│                                     │
│  [🔍 Buscar exame ou vacina]        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ⭐ SEÇÃO 1: CHECK-UP & ROTINA      │
│  < [Card] [Card] [Card] >           │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  ❤️ SEÇÃO 2: SAÚDE DO CORAÇÃO       │
│  < [Card] [Card] [Card] >           │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  ⚡ SEÇÃO 3: DIAGNÓSTICO RÁPIDO     │
│  < [Card] [Card] >                  │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  💊 SEÇÃO 4: VITAMINAS & MINERAIS   │
│  < [Card] [Card] [Card] >           │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  💉 SEÇÃO 5: VACINAS - PROTEJA-SE   │
│  < [Card] [Card] [Card] >           │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  👩 SEÇÃO 6: PARA A MULHER          │
│  < [Card] [Card] [Card] >           │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│  👨 SEÇÃO 7: PARA HOMENS            │
│  < [Card] [Card] >                  │
│    (scroll horizontal)              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  📞 FOOTER COM CONTATO              │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎴 ESPECIFICAÇÃO DO CARD (Vertical Compact)

### Dimensões & Layout

```
┌────────────────────────────┐
│  CARD: 250px W × 180px H   │
│                            │
│  ┌──────────────────────┐  │
│  │   🩸 ÍCONE EMOJI    │  │ ← 20px (top)
│  │      32px size      │  │
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │
│  │  Hemograma Completo │  │ ← 80px (mid)
│  │  Exame de sangue    │  │   Font: 16px, Bold
│  │  completo           │  │   Max 2 linhas
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │
│  │ Monitore sua saúde  │  │ ← 60px (bottom)
│  │ com análise         │  │   Font: 14px, Regular
│  │ completa            │  │   Max 2-3 linhas
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │
│  │   Agendar exame     │  │ ← CTA Button
│  │   (44×44px min)     │  │   Infinitivo, primary
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘

PADDING: 16px horizontal, 12px vertical
BORDER RADIUS: 12px (card), 8px (button)
BACKGROUND: #FFFFFF (neutral-light-pure)
BORDER: 1px solid #E6E6E6 (neutral-20)
```

### Estados do Card

**Default (Normal):**
- Background: Branco #FFFFFF
- Sombra: leve (1px blur)
- Texto: #161616 (strong) + #4B4B4B (faded)

**Hover (Desktop):**
- Elevação: sombra mais pronunciada
- Cor primária borda: #EA4356 (red-90)
- Escala: 102% (transform)

**Pressed (Mobile):**
- Feedback visual (opacity 0.8)
- Transition: 150ms ease-out

---

## 📑 7 CATEGORIAS - ESTRUTURA DETALHADA

### **CATEGORIA 1: CHECK-UP & ROTINA**
*Ícone: 🩸*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | Hemograma Completo | Monitore sua saúde com análise completa de sangue | Benefício |
| 2 | Glicemia | Controle o risco de diabetes com teste rápido | Benefício + Ação |
| 3 | Colesterol Total | Avalie sua saúde cardiovascular | Benefício |
| 4 | TSH (Tireoide) | Descubra se sua tireoide está em equilíbrio | Benefício + Curiosidade |

**Scroll Indicator:** Bolinhas (4 cards visíveis)

---

### **CATEGORIA 2: SAÚDE DO CORAÇÃO**
*Ícone: ❤️*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | Colesterol (Painel) | Seu coração merece atenção especial | Benefício |
| 2 | Ácido Úrico | Previna problemas de saúde futuros | Urgência |
| 3 | Troponina | Avalie sua saúde cardíaca agora | Urgência |

**Scroll Indicator:** Bolinhas (3 cards)

---

### **CATEGORIA 3: DIAGNÓSTICO RÁPIDO**
*Ícone: ⚡*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | COVID + Gripe + RSV | Resultado em 15 minutos | Urgência |
| 2 | Teste COVID | Saiba em poucos minutos | Urgência |

**Scroll Indicator:** Bolinhas (2 cards)

---

### **CATEGORIA 4: VITAMINAS & MINERAIS**
*Ícone: 💊*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | Vitamina D | Essencial para seus ossos e imunidade | Benefício |
| 2 | Vitamina B12 | Energia e vitalidade no seu dia a dia | Benefício |
| 3 | Ferro | Previna anemia com teste simples | Benefício + Prevenção |
| 4 | Ferritina | Monitore sua reserva de ferro | Benefício |

**Scroll Indicator:** Bolinhas (4 cards)

---

### **CATEGORIA 5: VACINAS - PROTEJA-SE**
*Ícone: 💉*

| Card | Vacina | Copy Persuasiva | Tom |
|------|--------|-----------------|-----|
| 1 | Vacina Gripe | Proteja você e sua família contra a gripe | Benefício + Urgência |
| 2 | Vacina COVID-19 | Mantenha sua imunidade atualizada | Benefício |
| 3 | Vacina HPV | Previna câncer com a vacina mais eficaz | Benefício + Prevenção |
| 4 | Vacina Meningite | Proteja-se contra a meningite agora | Urgência |
| 5 | Vacina Dengue | Defenda-se contra a dengue | Urgência + Benefício |

**Scroll Indicator:** Bolinhas (5 cards)

---

### **CATEGORIA 6: PARA A MULHER**
*Ícone: 👩*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | Papa Nicolau | Detecte alterações com teste simples | Benefício + Prevenção |
| 2 | Ultrassom Pélvico | Conheça sua saúde ginecológica em detalhes | Benefício |
| 3 | Mamografia | Cuide da sua saúde mamária | Benefício + Prevenção |

**Scroll Indicator:** Bolinhas (3 cards)

---

### **CATEGORIA 7: PARA HOMENS**
*Ícone: 👨*

| Card | Exame | Copy Persuasiva | Tom |
|------|-------|-----------------|-----|
| 1 | PSA (Próstata) | Faça seu checkup de próstata anualmente | Benefício + Rotina |
| 2 | Ultrassom Prostático | Avalie sua saúde urológica em detalhes | Benefício |

**Scroll Indicator:** Bolinhas (2 cards)

---

## 🎨 DESIGN TOKENS APLICADOS

### Cores Semânticas

```css
/* Primary */
--primary: #EA4356                    /* Red-90 - Botões, CTAs */
--primary-hover: #F55C6E              /* Red-100 - Hover states */
--primary-light: #FDDDE1              /* Red-150 - Backgrounds sutis */

/* Backgrounds */
--bg-page: #FFFFFF                    /* Branco puro */
--bg-section: #F5F5F5                 /* Cinza muito claro (opcional) */
--bg-card: #FFFFFF                    /* Branco puro */

/* Borders */
--border-light: #E6E6E6               /* Neutral-20 */

/* Text */
--text-primary: #161616               /* Typeface-strong */
--text-secondary: #4B4B4B             /* Typeface-faded */
```

### Tipografia

```css
/* HERO SECTION */
Font: Dasa Sans Bold (700)
Size: 32px (heading)
Line-height: 1.25 (40px)
Color: #161616 (typeface-strong)

/* SECTION TITLES */
Font: Dasa Sans Bold (700)
Size: 20px
Line-height: 1.25 (25px)
Color: #161616 (typeface-strong)
Margin-bottom: 12px

/* CARD TITLE */
Font: Dasa Sans Semibold (600)
Size: 16px
Line-height: 1.25 (20px)
Color: #161616 (typeface-strong)
Max 2 linhas, truncate excess

/* CARD COPY (Persuasiva) */
Font: Dasa Sans Regular (400)
Size: 14px
Line-height: 1.5 (21px)
Color: #4B4B4B (typeface-faded)
Max 2-3 linhas

/* CTA BUTTON */
Font: Dasa Sans Semibold (600)
Size: 14px
Color: #FFFFFF (typeface-inverse-strong)
Text: "Agendar" ou "Agendar exame" (infinitivo)
```

### Spacing

```css
/* Card Internal */
--card-padding: 16px (horizontal), 12px (vertical)
--card-icon-size: 32px
--card-gap: 8px (entre sections)

/* Section */
--section-padding: 16px (horizontal)
--section-margin-bottom: 24px
--section-scroll-gap: 12px (entre cards no carousel)

/* Hero */
--hero-padding: 24px (horizontal), 32px (vertical)
--hero-margin-bottom: 24px
```

### Animações

```css
/* Scroll Carousel */
--duration: 300ms
--easing: cubic-bezier(0.4, 0.0, 0.2, 1) /* ease-in-out */

/* Card Hover */
--duration: 150ms
--easing: cubic-bezier(0.0, 0.0, 0.2, 1) /* ease-out */

/* Button Press */
--duration: 100ms
--easing: cubic-bezier(0.4, 0.0, 1, 1) /* ease-in */
```

---

## 📱 RESPONSIVIDADE

### Mobile (375px - PRIMARY)

```
Card: 250px × 180px
Visible cards per scroll: 1.2-1.5 (permite peek do próximo)
Scroll: Horizontal drag/swipe
Indicator: Bolinhas visuais (dots)
```

### Tablet (768px)

```
Card: 300px × 210px (proporcional)
Visible cards per scroll: 2.5-3
Scroll: Horizontal drag ou snap-to-grid
Indicator: Bolinhas + barra horizontal subtle
```

### Desktop (1024px+)

```
Card: 280px × 190px (menor que mobile, grid rígido)
Visible cards: 4-5 por linha
Scroll: Transformed para grid (sem horizontal scroll)
Layout: 4-5 column grid por seção
```

---

## 🎯 FLUXO DO USUÁRIO (User Journey)

### 1️⃣ **Entrada na Home**
```
HOME PAGE LOAD
↓
Hero Section (busca exame)
↓
Scroll para baixo vendo categorias
```

### 2️⃣ **Exploração (Discovery)**
```
Vê categoria "CHECK-UP & ROTINA"
↓
Visualiza cards (Hemograma, Glicemia, Colesterol, TSH)
↓
Faz scroll horizontal para ver mais cards
```

### 3️⃣ **Seleção & Ação**
```
Clica em "Agendar exame" (card de Hemograma)
↓
Transição para fluxo de agendamento (FASE 1)
↓
[Fluxo de agendamento começa aqui]
```

### 4️⃣ **Alternativa - Busca Direta**
```
Usa hero search (🔍 Buscar exame)
↓
Autocomplete com sugestões
↓
Seleciona exame
↓
Transição para agendamento
```

---

## ✅ CHECKLIST - IMPLEMENTAÇÃO

### UX & Accessibility
- [ ] Touch targets CTA ≥ 44x44px
- [ ] Contraste WCAG AA (4.5:1 mínimo)
- [ ] Labels alt para ícones emoji
- [ ] Scroll horizontal acessível (keyboard + touch)
- [ ] Focus states visíveis (teclado)
- [ ] Screen reader: section landmarks (`<section>`, ARIA labels)

### Mobile First
- [ ] Cards 250x180px validados
- [ ] Scroll horizontal smooth (GPU accelerated)
- [ ] Sem horizontal scroll de página (só dos carousels)
- [ ] Padding adequado em thumbzone
- [ ] Loading states (skeleton screens se API)

### Copy & Tone
- [ ] Todos CTAs em infinitivo ("Agendar exame")
- [ ] Sem pontos finais em botões
- [ ] Copy persuasiva validada contra `copy-rules.md`
- [ ] Tom MISTO balanceado (benefício + urgência)
- [ ] Nenhuma palavra da lista "evitar" (Ver, Usuário, Plano, etc)

### Design System
- [ ] Cores aplicadas corretamente (#EA4356, #32A454, etc)
- [ ] Tipografia Dasa Sans (weights corretos: 400, 600, 700)
- [ ] Spacing consistente (16px, 24px, 32px)
- [ ] Border radius 12px (cards), 8px (buttons)
- [ ] Sombras sutis (não heavy)

### Performance
- [ ] Image lazy loading (se houver icons externos)
- [ ] Carousel scroll smooth (60fps)
- [ ] Prefetch próximas seções
- [ ] Zero CLS (Cumulative Layout Shift)

---

## 🔗 INTEGRAÇÃO COM FLUXO DE AGENDAMENTO

Quando usuário clica "Agendar exame" em um card, ele é redirecionado para:

```
/agendamento?exame=hemograma&categoria=rotina&source=home
```

Parâmetros opcionais para otimizar fluxo:
- `exame`: Já preenchido (reduz fricção)
- `categoria`: Context para smart defaults
- `source`: Para analytics (saber que veio da home)

---

## 📊 ANALYTICS & TRACKING

Eventos a rastrear:

```javascript
// Card clicks
{
  event: "card_click",
  category: "rotina",
  service: "hemograma",
  source: "home_carousel"
}

// Scroll interactions
{
  event: "carousel_scroll",
  category: "rotina",
  section_position: 1,
  cards_visible: 1.5
}

// Hero search
{
  event: "hero_search",
  query: "hemograma",
  source: "home"
}
```

---

## 🎨 EXEMPLO VISUAL - ESTRUTURA COMPLETA

```
┌─────────────────────────────────────────┐
│                                         │
│      🏥 LOGO DASA                       │ ← Header (sticky no mobile)
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ✨ HERO SECTION                        │
│                                         │
│  "Cuide da sua saúde em 3 cliques"     │
│  "Rápido, seguro, confiável"           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍 Buscar exame ou vacina...   │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  🩸 CHECK-UP & ROTINA                   │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ Hemogr.  │ │ Glicemia │ │Colesterol│
│  │ Monitore │ │ Controle │ │ Avalie   │
│  │ [Agendar]│ │[Agendar] │ │[Agendar] │
│  └──────────┘ └──────────┘ └──────────┘
│        ◉          ◯         ◯
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ❤️ SAÚDE DO CORAÇÃO                    │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │Colesterol│ │Ác. Úrico │ │Troponina │
│  │ Seu cor. │ │ Previna  │ │ Avalie   │
│  │ [Agendar]│ │[Agendar] │ │[Agendar] │
│  └──────────┘ └──────────┘ └──────────┘
│        ◉          ◯         ◯
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ... [outras 5 categorias similar] ...  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  📞 FOOTER                              │
│  Precisa de ajuda? Ligue: 0800...       │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚀 PRÓXIMOS PASSOS (Após Home)

1. **FASE 1: Fluxo de Agendamento** (11 etapas)
   - Wireframes detalhados
   - Copy completa por etapa
   - Specs técnicas de componentes

2. **FASE 2: Integração Home ↔ Agendamento**
   - Deep linking
   - Smart defaults (pré-preenchimento)
   - Analytics tracking

3. **FASE 3: Otimizações & Aprendizado**
   - A/B testing de copy
   - Personalização por persona
   - Upselling inteligente

---

## 📋 REFERÊNCIAS (KB DASA)

- `copy-rules.md` - Regras de copy (CRÍTICO)
- `design-system.md` - Tokens (cores, tipografia, spacing)
- `ux-guidelines.md` - Princípios UX, mobile-first, acessibilidade
- `business-strategy.md` - Personas (jobs, pain points)

---

**Status:** 📐 Estrutura pronta
**Próxima etapa:** Integração com copy completa
**Tempo estimado:** 3-4h de desenvolvimento (design + frontend)
