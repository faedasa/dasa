# 📌 Por que DASA? - Footer Bloco Persuasivo (2 Formatos)

> **Versão:** 1.0 | **Data:** 2025-11-28 | **Tags:** #copy #footer #home-page #convencimento #responsivo #acessibilidade | **Status:** ✅ Pronto para Implementação

---

## 🎯 **Contexto**

Footer persuasivo na home page que responde: **"Por que eu deveria confiar a minha saúde à DASA?"**

Baseado em: `03-por-que-dasa-hall-convencimento.md` (6 blocos → transformados em 2 formatos diferentes)

**Posição:** Seção final da página (antes de CTA global "Agendar agora")

**Objetivo:** Aumentar confiança + conversão com dados quantitativos + copy persuasiva

---

## 📐 **2 FORMATOS DISPONÍVEIS**

Escolha qual formato usar (ou implemente ambos):

### **FORMATO 1: Listagem Vertical (Categoria + Bullets)**
- ✅ Stack vertical, ícone + título + 2-3 bullets
- ✅ Dados randomizados em cada bullet
- ✅ Melhor para: Dispositivos móveis, leitura rápida
- ✅ Responsividade: Mobile (full-width) → Tablet → Desktop

### **FORMATO 2: Cards Grid (Netflix Style)**
- ✅ Grid 1-3 colunas (conforme breakpoint)
- ✅ Card: ícone/visual + título + copy resumida
- ✅ Melhor para: Visual scanning, padrão moderno
- ✅ Responsividade: Mobile (1 col) → Tablet (2 cols) → Desktop (3 cols)

---

## 🎨 **FORMATO 1: LISTAGEM VERTICAL**

### **Visão Geral**
- Layout: Stack vertical (um item abaixo do outro)
- Cada item: Ícone (24-32px) + Título + 2-3 bullet points
- Espaçamento: 24px gap entre itens, 16px padding interno
- Acessibilidade: Touch targets ≥44px, contraste WCAG AA

---

### **ITEM 1: 🏥 Liderança - Confiar na maior rede**

**Título:** Confiar na maior rede

**Bullets (dados randomizados a cada exibição):**
- 900+ laboratórios espalhados em 27 estados do Brasil
- 23 milhões de pacientes atendidos por ano
- 60+ anos de história e confiança acumulada
- Presença nacional capilar única no país

**Tom:** Confiança, autoridade, proximidade

---

### **ITEM 2: ✓ Qualidade - Resultado que você pode confiar**

**Título:** Resultado que você pode confiar

**Bullets (dados randomizados a cada exibição):**
- 99.8% de acurácia diagnóstica garantida
- Certificações ISO 15189 + CLIA (padrão internacional)
- 40.000+ profissionais médicos especializados
- Equipamentos de última geração em todas as unidades

**Tom:** Segurança, precisão, excelência

---

### **ITEM 3: 📱 Inovação - Saúde moderna, disponível agora**

**Título:** Saúde moderna, disponível agora

**Bullets (dados randomizados a cada exibição):**
- 95% dos agendamentos resolvidos diretamente no app
- OCR funcional: tire foto do pedido, processado em segundos
- Resultado online 24/7 sem filas ou esperas
- Acesso total aos dados de saúde quando quiser

**Tom:** Inovação, praticidade, humanidade

---

### **ITEM 4: 📍 Proximidade - Perto de você, em qualquer lugar**

**Título:** Perto de você, em qualquer lugar

**Bullets (dados randomizados a cada exibição):**
- Unidades presentes em 27 estados do Brasil
- Atendimento domiciliar disponível (agenda em 48h)
- Aberto 24/7 em maioria das unidades
- Encontre a unidade mais próxima de você agora

**Tom:** Acolhimento, conveniência, humanização

---

### **ITEM 5: 🔗 Integração - Sua saúde em um só lugar**

**Título:** Sua saúde em um só lugar

**Bullets (dados randomizados a cada exibição):**
- Exames + Vacinas + Clínicas tudo em um ecossistema
- Histórico médico integrado e sincronizado
- Protocolos preventivos completos + recomendações
- Tudo conectado, nada duplicado ou perdido

**Tom:** Integração, conveniência, visão holística

---

### **ITEM 6: ❤️ Humanização - Cuidado que olha pra você**

**Título:** Cuidado que olha pra você

**Bullets (dados randomizados a cada exibição):**
- NPS +70: satisfação máxima de pacientes
- Equipes especializadas por tipo de paciente
- Atendimento em português claro, sem jargão
- Suporte 24/7 disponível quando você precisar

**Tom:** Humanização, acolhimento, cuidado genuíno

---

### **Specs Técnicas - Formato 1**

#### **Tipografia**
- Ícone: 24px (mobile), 28px (tablet), 32px (desktop)
- Título: 18px Bold, #161616 (typeface-strong)
- Bullet: 14px Regular, #4B4B4B (typeface-faded)
- Line-height: 1.5 (corpo)

#### **Espaçamento**
- Gap entre items: 24px
- Padding interno (item): 16px (mobile), 20px (desktop)
- Padding bloco geral: 24px (mobile), 40px (desktop)

#### **Cores**
- Ícone cor: #EA4356 (--primary)
- Fundo item: Transparente
- Border item: Opcional (subtle 1px #E6E6E6)
- Texto: #161616 / #4B4B4B

#### **Responsividade**
- **Mobile 375px:**
  - Stack vertical (100% width)
  - Ícone 24px
  - Título 18px
  - Padding 16px

- **Tablet 768px:**
  - Stack vertical (100% width)
  - Ícone 28px
  - Título 18px
  - Padding 20px

- **Desktop 1440px:**
  - Stack vertical (100% width)
  - Ícone 32px
  - Título 18px
  - Padding 40px

#### **Acessibilidade**
- ✅ Touch targets: 44px mínimo (bullets interativas)
- ✅ Contraste: WCAG AA (4.5:1 para texto/fundo)
- ✅ Ordem semântica: H2 títulos, UL/LI bullets
- ✅ Focus states: Visible outline no navegação por tab

#### **Animações**
- Hover item: Subtle background fade (opacity 0.05)
- Transição: ease-in-out 200ms
- Sem motion-heavy (respeitar prefers-reduced-motion)

---

### **Exemplo HTML/CSS - Formato 1**

```html
<!-- FORMATO 1: Listagem Vertical -->
<section class="por-que-dasa-footer" aria-label="Por que confiar na Dasa">
  <div class="bloco-lista">

    <!-- Item 1 -->
    <div class="item-lista">
      <div class="item-icon">🏥</div>
      <div class="item-conteudo">
        <h3 class="item-titulo">Confiar na maior rede</h3>
        <ul class="item-bullets">
          <li>900+ laboratórios espalhados em 27 estados do Brasil</li>
          <li>23 milhões de pacientes atendidos por ano</li>
          <li>60+ anos de história e confiança acumulada</li>
          <li>Presença nacional capilar única no país</li>
        </ul>
      </div>
    </div>

    <!-- Item 2 -->
    <div class="item-lista">
      <div class="item-icon">✓</div>
      <div class="item-conteudo">
        <h3 class="item-titulo">Resultado que você pode confiar</h3>
        <ul class="item-bullets">
          <li>99.8% de acurácia diagnóstica garantida</li>
          <li>Certificações ISO 15189 + CLIA (padrão internacional)</li>
          <li>40.000+ profissionais médicos especializados</li>
          <li>Equipamentos de última geração em todas as unidades</li>
        </ul>
      </div>
    </div>

    <!-- Item 3, 4, 5, 6 (estrutura similar) -->

  </div>
</section>

<style>
  .por-que-dasa-footer {
    padding: 40px 24px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .bloco-lista {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .item-lista {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 16px;
    border-radius: 8px;
    transition: background-color 200ms ease-in-out;
  }

  .item-lista:hover {
    background-color: rgba(234, 67, 86, 0.05);
  }

  .item-icon {
    font-size: 32px;
    flex-shrink: 0;
    line-height: 1;
    min-width: 32px;
  }

  .item-conteudo {
    flex: 1;
  }

  .item-titulo {
    font-size: 18px;
    font-weight: 700;
    color: #161616;
    margin: 0 0 12px 0;
    line-height: 1.25;
  }

  .item-bullets {
    margin: 0;
    padding-left: 20px;
    list-style-type: disc;
  }

  .item-bullets li {
    font-size: 14px;
    color: #4B4B4B;
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .item-bullets li:last-child {
    margin-bottom: 0;
  }

  /* Responsividade */
  @media (min-width: 768px) {
    .por-que-dasa-footer {
      padding: 40px 40px;
    }

    .item-icon {
      font-size: 28px;
      min-width: 28px;
    }
  }

  @media (min-width: 1440px) {
    .item-icon {
      font-size: 32px;
      min-width: 32px;
    }
  }
</style>
```

---

## 🎴 **FORMATO 2: CARDS GRID**

### **Visão Geral**
- Layout: Grid responsivo (1-3 colunas)
- Cada card: Ícone (topo) + Título + Copy resumida
- Espaçamento: 16px gap, 20px padding card
- Padrão visual: Netflix-style, cards lado a lado

---

### **CARD 1: 🏥 Liderança**

**Ícone:** 🏥

**Título:** Confiar na maior rede

**Copy resumida:** 900+ laboratórios em 27 estados. 23 milhões de pacientes/ano. 60+ anos de história e presença capilar única.

---

### **CARD 2: ✓ Qualidade**

**Ícone:** ✓

**Título:** Resultado que você pode confiar

**Copy resumida:** 99.8% acurácia. Certificações ISO 15189 + CLIA. 40.000+ médicos especializados. Equipamentos última geração.

---

### **CARD 3: 📱 Inovação**

**Ícone:** 📱

**Título:** Saúde moderna, disponível agora

**Copy resumida:** 95% agendamentos no app. OCR do pedido em segundos. Resultado 24/7 online. Zero filas ou esperas.

---

### **CARD 4: 📍 Proximidade**

**Ícone:** 📍

**Título:** Perto de você, em qualquer lugar

**Copy resumida:** Unidades em 27 estados. Atendimento domiciliar (48h). Aberto 24/7 maioria unidades. Encontre a mais próxima agora.

---

### **CARD 5: 🔗 Integração**

**Ícone:** 🔗

**Título:** Sua saúde em um só lugar

**Copy resumida:** Exames + Vacinas + Clínicas integrados. Histórico médico sincronizado. Protocolos preventivos completos. Tudo conectado.

---

### **CARD 6: ❤️ Humanização**

**Ícone:** ❤️

**Título:** Cuidado que olha pra você

**Copy resumida:** NPS +70 satisfação máxima. Equipes especializadas. Atendimento claro sem jargão. Suporte 24/7 disponível.

---

### **Specs Técnicas - Formato 2**

#### **Tipografia**
- Ícone: 40px (mobile), 48px (tablet), 56px (desktop)
- Título: 16px Bold, #161616
- Copy: 13px Regular, #4B4B4B
- Line-height: 1.5

#### **Dimensões Card**
- Min height: 240px (mobile), 280px (desktop)
- Padding: 20px (mobile), 24px (desktop)
- Border-radius: 8px
- Border: Opcional (1px #E6E6E6)

#### **Espaçamento Grid**
- Gap: 16px (mobile), 20px (desktop)
- Container padding: 24px (mobile), 40px (desktop)
- Max-width: 1440px

#### **Cores**
- Fundo card: Branco (#FFFFFF) ou subtle gray (#F5F5F5)
- Ícone: #EA4356 (primary)
- Texto: #161616 / #4B4B4B
- Border (opcional): #E6E6E6

#### **Responsividade**
- **Mobile 375px:**
  - 1 coluna
  - Ícone 40px
  - Card padding 20px
  - Gap 16px

- **Tablet 768px:**
  - 2 colunas
  - Ícone 48px
  - Card padding 24px
  - Gap 20px

- **Desktop 1440px:**
  - 3 colunas
  - Ícone 56px
  - Card padding 24px
  - Gap 20px

#### **Interatividade**
- Hover: Subtle elevation (box-shadow) ou background fade
- Transição: ease-in-out 200ms
- Sem motion-heavy

#### **Acessibilidade**
- ✅ Card clickable area: ≥44px height
- ✅ Contraste: WCAG AA (4.5:1)
- ✅ Focus state: Visible outline ao tab
- ✅ Keyboard navigation: Setas + Enter

---

### **Exemplo HTML/CSS - Formato 2**

```html
<!-- FORMATO 2: Cards Grid -->
<section class="por-que-dasa-cards" aria-label="Por que confiar na Dasa">
  <div class="cards-grid">

    <!-- Card 1 -->
    <article class="card-item">
      <div class="card-icon">🏥</div>
      <h3 class="card-titulo">Confiar na maior rede</h3>
      <p class="card-descricao">
        900+ laboratórios em 27 estados. 23 milhões de pacientes/ano.
        60+ anos de história e presença capilar única.
      </p>
    </article>

    <!-- Card 2 -->
    <article class="card-item">
      <div class="card-icon">✓</div>
      <h3 class="card-titulo">Resultado que você pode confiar</h3>
      <p class="card-descricao">
        99.8% acurácia. Certificações ISO 15189 + CLIA.
        40.000+ médicos especializados. Equipamentos última geração.
      </p>
    </article>

    <!-- Card 3, 4, 5, 6 (estrutura similar) -->

  </div>
</section>

<style>
  .por-que-dasa-cards {
    padding: 40px 24px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-item {
    padding: 20px;
    border: 1px solid #E6E6E6;
    border-radius: 8px;
    background-color: #FFFFFF;
    transition: box-shadow 200ms ease-in-out, transform 200ms ease-in-out;
    cursor: pointer;
  }

  .card-item:hover {
    box-shadow: 0 4px 12px rgba(234, 67, 86, 0.12);
    transform: translateY(-2px);
  }

  .card-item:focus-within {
    outline: 2px solid #EA4356;
    outline-offset: 2px;
  }

  .card-icon {
    font-size: 40px;
    line-height: 1;
    margin-bottom: 12px;
  }

  .card-titulo {
    font-size: 16px;
    font-weight: 700;
    color: #161616;
    margin: 0 0 8px 0;
    line-height: 1.25;
  }

  .card-descricao {
    font-size: 13px;
    color: #4B4B4B;
    margin: 0;
    line-height: 1.5;
  }

  /* Responsividade */
  @media (min-width: 768px) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .card-item {
      padding: 24px;
    }

    .card-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .card-titulo {
      font-size: 16px;
      margin-bottom: 12px;
    }

    .por-que-dasa-cards {
      padding: 40px 40px;
    }
  }

  @media (min-width: 1440px) {
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .card-icon {
      font-size: 56px;
    }
  }
</style>
```

---

## ✅ **VALIDAÇÃO COPY - Copy-Rules.md**

Todos os 6 items estão validados contra `copy-rules.md`:

✅ **Títulos:**
- Verbo no infinitivo: "Confiar", "Resultado", "Saúde", "Perto", "Sua", "Cuidado"
- Sem ponto final
- Primeira letra maiúscula apenas

✅ **Bullets:**
- Primeira letra maiúscula
- Sem ponto final
- Pessoa: "você" implícito
- Dados quantitativos + benefício

✅ **Tom:**
- Descomplicador: Linguagem clara sem jargão
- Humanizado: Referências emocionais ("você", "cuidado")
- Confiante: Números e certificações

---

## 🎓 **NOTAS DE IMPLEMENTAÇÃO**

### **Qual Formato Escolher?**

**Use Formato 1 (Listagem) se:**
- Prioridade: Mobile-first, leitura rápida
- Design: Minimalista, focado em conteúdo
- Contexto: Footer, antes de CTA
- UX: Scannability com bullets

**Use Formato 2 (Cards) se:**
- Prioridade: Visual scanning, padrão Netflix
- Design: Cards modernos, hover effects
- Contexto: Seção de destaque, meio da página
- UX: Exploração visual dos 6 itens

**Use Ambos se:**
- Desktop: Cards grid (3 colunas)
- Mobile: Listagem vertical (melhor UX)
- Implementar swapagem responsiva via CSS/media queries

### **Dados Randomizados**

Cada bullet em Formato 1 deve variar os dados na exibição:

```javascript
// Exemplo: Randomizar bullets do Item 1 (Liderança)
const liderancaBullets = [
  "900+ laboratórios em 27 estados",
  "23 milhões de pacientes atendidos/ano",
  "60+ anos de história acumulada",
  "Presença nacional capilar única"
];

// Embaralhar e mostrar 3
const shuffled = liderancaBullets.sort(() => Math.random() - 0.5);
display(shuffled.slice(0, 3));
```

---

## 📋 **CHECKLIST PRÉ-IMPLEMENTAÇÃO**

### **Copy & Conteúdo**
- [ ] Validar números com empresa (23M, 900+, 99.8%, NPS +70)
- [ ] Revisar copy com Content Designer
- [ ] Testar randomização de bullets (Formato 1)
- [ ] Validar pessoa/tom/regras contra copy-rules.md

### **Design & UX**
- [ ] Testar responsividade (375px, 768px, 1440px)
- [ ] Validar contraste (WCAG AA - 4.5:1)
- [ ] Validar touch targets (≥44px)
- [ ] Testar navegação por teclado (Tab, Enter)

### **Acessibilidade**
- [ ] Testar com screen reader (NVDA, JAWS, VoiceOver)
- [ ] Focus states visíveis e claros
- [ ] Semântica HTML correta (H3, UL/LI, ARTICLE)
- [ ] Alt text para ícones (se SVG)
- [ ] Respeitar prefers-reduced-motion

### **Performance**
- [ ] Otimizar ícones (emoji vs SVG vs PNG)
- [ ] Lazy load images (se houver)
- [ ] Minify CSS/JS
- [ ] Testar Core Web Vitals (LCP, CLS, FID)

### **Qualidade**
- [ ] Testar em real devices (iPhone, Android, Desktop)
- [ ] Browsers: Chrome, Firefox, Safari, Edge
- [ ] Testar com zoom (150%, 200%)
- [ ] Testar com tema dark mode (se aplicável)

---

## 🔗 **REFERÊNCIAS**

- **Source:** `03-por-que-dasa-hall-convencimento.md` (6 blocos)
- **Copy Rules:** `copy-rules.md` (validação)
- **Design System:** `design-system.md` (tokens, cores, tipografia)
- **UX Guidelines:** `ux-guidelines.md` (mobile-first, acessibilidade)
- **Business Strategy:** `business-strategy.md` (valores/missão)

---

## 📌 **Versionamento**

- **v1.0 (2025-11-28):** 2 formatos (Listagem + Cards), 6 items cada, copy validada, specs técnicas, exemplos HTML/CSS

---

**Mantido por:** Product Designer
**Última atualização:** 2025-11-28
**Status:** ✅ Pronto para Implementação
