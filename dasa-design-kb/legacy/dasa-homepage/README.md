# 🏠 HOME PAGE DASA - Base de Conhecimento

> **Versão:** 1.0 | **Data:** 2025-11-28 | **Tags:** #homepage #discovery #fase0 #mvp | **Status:** ✅ Completa

---

## 🎯 Propósito desta Pasta

Documentação completa da home page de descoberta da Nav360, fase 0 do redesenho de agendamento. Contém:

- ✅ **Estrutura visual:** 7 categorias, 23 cards Netflix-style
- ✅ **Copy validada:** 100% conformidade com `copy-rules.md`
- ✅ **Design tokens:** Cores, tipografia, spacing aplicados
- ✅ **Specs técnicas:** Mobile-first, responsividade, animações
- ✅ **Pronto para:** Wireframes → Protótipo → Implementação

---

## 📂 Estrutura de Arquivos

```
dasa-homepage/
├── README.md                                          # Visão geral e índice (ESTE ARQUIVO)
│
├── 📋 CONTEÚDO PRINCIPAL
│   ├── 01-estrutura-categorias.md                     # Layout + 7 categorias + 23 cards
│   ├── 02-copy-cards-completa.md                      # Copy validada (100% copy-rules.md)
│   ├── 03-por-que-dasa-hall-convencimento.md          # 6 blocos persuasivos + dados quantitativos
│   ├── 05-bundles-pacotes-exames-vacinas.md           # ✨ 8 bundles temáticos + upselling
│   └── 06-persona-feminina-adaptacoes.md              # ⭐ NOVO: Persona feminina (Miriam) + 4 secundárias, bundles femininos, vacinas
│
├── 🎨 COMPONENTES (Blocos específicos)
│   └── componentes/
│       └── ocr-upload-copy-titulos.md                 # 10 opções títulos bloco "Enviar foto pedido"
│
└── 📚 PESQUISA E EDUCAÇÃO
    └── pesquisa-educacao/
        └── educacao-paciente-mitos-verdades.md        # Dados: mitos/verdades exames, vacinas, check-up
```

---

## 📄 Conteúdo da Pasta

### **01-estrutura-categorias.md**
**Tudo sobre arquitetura visual da home page**

**Contém:**
- Layout hierárquico (hero + 7 seções)
- Especificação detalhada dos cards (250x180px)
- 7 categorias mapeadas (Check-up, Coração, Diagnóstico Rápido, Vitaminas, Vacinas, Mulher, Homens)
- Design tokens aplicados (cores, tipografia, spacing, animações)
- Responsividade (375px mobile → 1440px desktop)
- User journey (entrada → exploração → ação)
- Checklist de implementação (UX, mobile, copy, design, performance)

**Usar quando:**
- Vou fazer o wireframe
- Preciso de especificações técnicas
- Quero entender o layout
- Estou fazendo code review

---

### **02-copy-cards-completa.md**
**Copy completa e validada para os 23 cards**

**Contém:**
- 23 cards mapeados com Título + Copy Persuasiva + CTA
- 7 Categorias com tom específico:
  1. Check-up & Rotina (4 cards) - Equilibrado
  2. Saúde do Coração (3 cards) - Protetor
  3. Diagnóstico Rápido (2 cards) - Ágil
  4. Vitaminas & Minerais (4 cards) - Bem-estar
  5. Vacinas (5 cards) - Proteção
  6. Para a Mulher (3 cards) - Cuidado
  7. Para Homens (2 cards) - Responsabilidade
- Tom MISTO explicado (benefício + urgência)
- Validação contra `copy-rules.md` (infinitivo, pessoa, sem ponto)
- Correções documentadas (Ultrassom Pélvico: "Veja" → "Conheça")
- Componentes reutilizáveis (verbos, qualificadores)

**Usar quando:**
- Vou implementar os cards
- Preciso de copy para design
- Quero entender tom de voz
- Estou fazendo review de linguagem

---

### **03-por-que-dasa-hall-convencimento.md**
**Hall de convencimento: por que escolher DASA?**

**Contém:**
- 6 blocos persuasivos (Liderança, Qualidade, Inovação, Proximidade, Integração, Humanização)
- Dados quantitativos (23M pacientes/ano, 900+ labs, 99.8% acurácia, NPS +70)
- Alinhamento com missão e valores DASA
- Copy validada contra copy-rules.md
- 3 opções de layout (Grid 2x3, Carrossel, Tabs)
- Ícones, cores, tipografia, spacing
- Métricas de sucesso esperadas
- Próximas decisões (layout, ordem, teste A/B)

**Usar quando:**
- Preciso convencer o usuário a confiar na DASA
- Quero dados quantitativos para suportar copy
- Estou planejando seção 2 da home page
- Preciso de números para apresentar ao chefe

---

### **05-bundles-pacotes-exames-vacinas.md** ✨ NOVO
**Estratégia de bundles temáticos + integração com upselling**

**Contém:**
- 8 bundles temáticos definidos (Check-up Geral, Saúde Mulher/Homem, Preventivo 50+, etc.)
- Segmentação por personas (Moisés, Miriam, Manoel) com copy específica
- Integração com 23 cards da homepage (mapeamento direto)
- Cross-sell logic (IF/THEN rules por profile, idade, histórico)
- Tabela: Valor agregado vs compra individual (desconto 20-30%)
- 5 Seção: Implementação no Fluxo (Etapa 7 - UPSELL INTELIGENTE)
  - 3 exemplos de mensagens personalizadas
  - 5 validações por bundle (age-gate, gender, history, confidence, vacinas)
  - Regras de negócio por bundle (jejum, duração, frequência recomendada)
- 6 Seção: Dados e Benefícios
  - Benefícios clínicos por bundle (detecção, frequência, importância)
  - Impacto no negócio (AOV +33%, taxa conversão +10 pp, NPS +5-8)
  - Estatísticas: projeção +R$ 6.000/dia com 100 agendamentos

**Usar quando:**
- Vou implementar upselling inteligente na etapa 7
- Preciso de copy para sugestões de bundles
- Quero entender desconto e value proposition
- Estou planejando strategy comercial de bundles
- Preciso validar regras de negócio

---

### **06-persona-feminina-adaptacoes.md** ⭐ NOVO
**Exploração completa da persona feminina (Miriam) + adaptações homepage, bundles, vacinas**

**Contém:**
- 5 Personas femininas detalhadas (Miriam 28F primária + 4 secundárias: 18-25, 35-50, 50+, Gestante)
- 4-5 Bundles femininos específicos (Essencial 18-35, Completa 35-50, Ativa 50+, Gestante)
  - Exames, vacinas, copy tone, duração, frequência, preços estimados
- Adaptação dos 23 cards da homepage (reposicionar copy + 3 novos cards femininos = 26 total)
  - Mapeamento de relevância por faixa etária e persona
  - Copy adaptada com foco feminino (sem culpa, acolhedor)
- Smart defaults & personalizações automáticas (age-gating por data nascimento)
  - Lembretes inteligentes (Papanicolau, Mamografia, Vitamina D, HPV, Hormônios)
  - Sugestões de bundles por faixa etária
- Implementação Etapa 7 (UPSELL INTELIGENTE) com 4 exemplos femininos
  - Miriam 28: Papanicolau → Check-up Essencial
  - 45F: Mamografia → Saúde Completa + Hormônios
  - 55F: Check-up → Bem-Estar Ativa 50+
  - Gestante: Hemograma → Gestante Completo
- Tabela: Vacinas femininas por faixa etária
  - HPV (prioridade <50 anos, estratégia catch-up até 45)
  - COVID, Gripe, Coqueluche (gestante), Pneumococo (65+), Zoster (50+)
  - Protocolo e copy específico por vacina

**Usar quando:**
- Vou implementar experiência feminina na homepage
- Preciso adaptar bundles para mulheres
- Quero entender Miriam persona em profundidade
- Estou planejando vacinas femininas
- Preciso de copy feminino acolhedor (sem culpa)
- Vou fazer personalização por gender + age

---

### **componentes/ocr-upload-copy-titulos.md**
**Opções de títulos para bloco OCR**

**Contém:**
- 10 títulos ranqueados (TIER 1 recomendado, TIER 2 alternativas, TIER 3 criativo)
- Análise por contexto (mobile, desktop, hesitante)
- Validação contra copy-rules.md
- Copy secundária (A/B/C/D)
- Recomendações por persona
- Comparativo visual

**Usar quando:**
- Preciso definir título bloco "Enviar foto do pedido"
- Quero entender diferenças entre opções
- Estou fazendo A/B test de títulos
- Preciso de análise de cada opção

---

### **pesquisa-educacao/educacao-paciente-mitos-verdades.md**
**Dados quantitativos: mitos e verdades sobre saúde**

**Contém:**
- Mitos sobre exames de sangue (jejum, água, álcool)
- Mitos sobre vacinas (hesitação, desinformação)
- Dados sobre check-up preventivo (idades, cobertura)
- Atendimento domiciliar (perfis, qualidade)
- TOP 10 coisas que pacientes deveriam saber
- 15+ fontes (Sabin, Butantan, Ministério Saúde, etc.)
- 3 opções de aplicação (cards, blog, pop-up)

**Usar quando:**
- Preciso de dados quantitativos para hero text
- Quero fundamentar copy educativo
- Estou criando conteúdo sobre saúde
- Preciso de fontes para credibilidade

---

## 🔗 Estrutura Rápida

```
📱 HOME PAGE (Mobile 375px)
│
├── 🏥 Header (Sticky)
│   └── Logo Dasa
│
├── ✨ HERO SECTION
│   └── "Cuide da sua saúde em 3 cliques"
│       └── [🔍 Buscar exame ou vacina]
│
├── 🩸 CHECK-UP & ROTINA (4 cards, scroll horizontal)
│   ├── Hemograma Completo
│   ├── Glicemia
│   ├── Colesterol Total
│   └── TSH (Tireoide)
│
├── ❤️ SAÚDE DO CORAÇÃO (3 cards)
│   ├── Colesterol (Painel)
│   ├── Ácido Úrico
│   └── Troponina
│
├── ⚡ DIAGNÓSTICO RÁPIDO (2 cards)
│   ├── COVID + Gripe + RSV
│   └── Teste COVID
│
├── 💊 VITAMINAS & MINERAIS (4 cards)
│   ├── Vitamina D
│   ├── Vitamina B12
│   ├── Ferro
│   └── Ferritina
│
├── 💉 VACINAS - PROTEJA-SE (5 cards)
│   ├── Vacina Gripe
│   ├── Vacina COVID-19
│   ├── Vacina HPV
│   ├── Vacina Meningite
│   └── Vacina Dengue
│
├── 👩 PARA A MULHER (3 cards)
│   ├── Papa Nicolau
│   ├── Ultrassom Pélvico
│   └── Mamografia
│
├── 👨 PARA HOMENS (2 cards)
│   ├── PSA (Próstata)
│   └── Ultrassom Prostático
│
└── 📞 FOOTER
    └── Contato
```

---

## 📊 Dados Rápidos

| Aspecto | Valor |
|---------|-------|
| **Total de cards** | 23 |
| **Categorias** | 7 |
| **Card dimensions** | 250px × 180px (mobile) |
| **CTA padrão** | "Agendar exame" / "Agendar vacina" |
| **Tom** | MISTO (Benefício + Urgência) |
| **Primary color** | #EA4356 (Red-90) |
| **Responsive** | 375px (mobile) → 1440px (desktop) |
| **Status copy** | 100% validada contra copy-rules.md |

---

## 🎨 Design Tokens Principais

```css
/* Colors */
--primary: #EA4356          /* Vermelho DASA */
--text-primary: #161616     /* Typeface strong */
--text-secondary: #4B4B4B   /* Typeface faded */
--bg-card: #FFFFFF          /* Branco */
--border: #E6E6E6           /* Neutral-20 */

/* Typography */
--font: Dasa Sans
--h-section: 20px Bold
--card-title: 16px Semibold
--card-copy: 14px Regular

/* Spacing */
--card-padding: 16px (H) × 12px (V)
--section-margin: 24px
--carousel-gap: 12px

/* Animation */
--duration: 150ms-300ms
--easing: ease-in-out
```

---

## ✅ Checklist - Antes de Implementar

### Design & Layout
- [ ] Wireframes criados em 01-estrutura-categorias.md
- [ ] Cards 250x180px validados
- [ ] 7 seções mapeadas
- [ ] Responsividade definida (375px → 1440px)

### Copy
- [ ] 23 cards com copy completa (02-copy-cards-completa.md)
- [ ] Todos CTAs em infinitivo
- [ ] Tom MISTO validado
- [ ] 0 pontos finais em botões

### Validação
- [ ] Copy revisada contra copy-rules.md
- [ ] Cores DASA aplicadas
- [ ] Tipografia Dasa Sans confirmada
- [ ] Acessibilidade WCAG AA considerada

### Técnico
- [ ] Componentes identificados
- [ ] Analytics tracking planeado
- [ ] Deep links para agendamento definidos
- [ ] Performance considerada (lazy load, 60fps)

---

## 🚀 Próximos Passos

### CURTO PRAZO
1. **Wireframes (1-2 dias):**
   - Criar wireframes de alta fidelidade no Figma
   - Baseado em 01-estrutura-categorias.md
   - Mobile + tablet + desktop

2. **Protótipo (2-3 dias):**
   - Protótipo navegável
   - Links para fluxo de agendamento
   - Testar scroll horizontal dos cards

3. **Validação (1 dia):**
   - Review com product
   - Testes de usabilidade (5 usuários)
   - Ajustes finais

### MÉDIO PRAZO
4. **Implementação (1 semana):**
   - Código frontend
   - Integração com APIs (se necessário)
   - QA completo

5. **Integração (2-3 dias):**
   - Conectar com fluxo de agendamento
   - Deep linking
   - Analytics tracking

---

## 🔗 Referências de KB DASA

Estes documentos complementam a home page:

- **copy-rules.md** - Regras de copy utilizadas ✅
- **design-system.md** - Design tokens aplicados ✅
- **ux-guidelines.md** - Princípios UX (mobile-first, touch targets, acessibilidade) ✅
- **business-strategy.md** - Personas (para futuras variações de copy) ✅
- **fluxo-agendamento-otimizado-v2.md** - Integração com fluxo de agendamento 🔗

---

## 📝 Como Usar Esta Pasta

### Para Product/Design:
1. Ler **01-estrutura-categorias.md** (visão geral layout)
2. Ler **02-copy-cards-completa.md** (copy + tom)
3. Criar wireframes seguindo especificações

### Para Frontend:
1. Ler **01-estrutura-categorias.md** (specs técnicas)
2. Aplicar design tokens de `design-system.md`
3. Implementar cards 250x180px, scroll horizontal
4. Validar com **02-copy-cards-completa.md**

### Para Copy/Content:
1. Ler **02-copy-cards-completa.md** (copy pronta)
2. Revisar contra `copy-rules.md` (já feito ✅)
3. Usar para briefing do designer

### Para QA:
1. Validar contra ambos os documentos
2. Testar responsividade (375px → 1440px)
3. Verificar CTAs e navegação

---

## 🎬 Exemplo: Card Hemograma

**Layout (01-estrutura-categorias.md):**
- Dimensions: 250px × 180px
- Icon: 🩸 (32px)
- Title: "Hemograma Completo" (16px Semibold)
- Copy: 14px Regular, max 2-3 lines
- Button: "Agendar exame" (44x44px min)

**Copy (02-copy-cards-completa.md):**
- Copy: "Monitore sua saúde com análise completa de sangue"
- Tom: Benefício (monitorar) + Urgência implícita (com)
- Validação: ✅ Infinitivo, ✅ Pessoal, ✅ Sem ponto

**Integração:**
- Link: `/agendamento?exame=hemograma&categoria=rotina&source=home`
- Analytics: `{event: "card_click", category: "rotina", service: "hemograma"}`

---

## 📊 Estatísticas

| Item | Valor |
|------|-------|
| **Documentos** | 2 (estrutura + copy) |
| **Cards detalhados** | 23 |
| **Linhas de documentação** | ~1,500 |
| **Palavras** | ~8,000 |
| **Validações** | 100% contra copy-rules.md |
| **Status** | ✅ Pronto para implementação |

---

## 🤔 FAQ

### P: Por que "Netflix-style"?
**R:** Cards horizontais em carousel, como recomendações de serviços. Mais visual que lista, otimizado para mobile scroll.

### P: Posso mudar a copy?
**R:** Sim, mas mantenha Tom MISTO (benefício + urgência) e valide contra `copy-rules.md`. Recomendo: "Conheça [benefício] [urgência]".

### P: E as cores de cada categoria?
**R:** Use: Vermelho (#EA4356) rotina, Amarelo (#EB7005) rápido, Verde (#32A454) vacinas, Azul (#3F7BF2) vitaminas. Veja `design-system.md`.

### P: Mobile vs Desktop é muito diferente?
**R:** Mobile é scroll horizontal em carousel. Desktop pode ser grid 4-5 colunas. Ver 01-estrutura-categorias.md seção Responsividade.

### P: Como linkar para agendamento?
**R:** `/agendamento?exame={exame}&categoria={categoria}&source=home`. Ver 01-estrutura-categorias.md seção Integração.

---

## 🔄 Versioning

- **v1.0 (2025-11-28):** Inicial
  - Estrutura completa (7 categorias, 23 cards)
  - Copy validada contra copy-rules.md
  - Design tokens aplicados
  - Pronto para wireframes

---

## 📞 Quick Links

- **Folder:** `/Users/cosmefae/.codex/knowledge/dasa/dasa-homepage/`
- **Arquivo 1:** `01-estrutura-categorias.md` (Layout + Specs)
- **Arquivo 2:** `02-copy-cards-completa.md` (Copy + Tom)
- **KB DASA:** `/Users/cosmefae/.codex/knowledge/dasa/README.md`

---

**Mantido por:** Product Designer
**Última atualização:** 2025-11-28
**Próxima review:** Após implementação dos wireframes
