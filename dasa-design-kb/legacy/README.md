# 📚 Knowledge Base - Projeto DASA (Agendamento Nav360)

> **Versão:** 2.0 | **Última atualização:** 2025-11-19 | **Mantido por:** Product Designer | **Status:** 🟢 Ativo

---

## 🎯 **Propósito da KB**

Base de conhecimento centralizada para o projeto **DASA - Redesenho de Agendamento Nav360**, um sprint de 3 meses focado em melhorar experiência, reduzir fricção e aumentar autonomia do paciente.

Esta KB serve como:
- **Reference Material** para decisões de design e product
- **Implementation Guide** para development e QA
- **Brand & Voice Repository** para copy e comunicação
- **Decision Framework** para trade-offs e priorização

---

## 📂 **Estrutura de Arquivos**

```
dasa/
├── README.md                                    # Este arquivo (índice + guia)
├── CHANGELOG.md                                 # Histórico de versões
├── TAGS.md                                      # Sistema de tags para navegação
│
├── 📋 ESTRATÉGIA E NEGÓCIO
│   ├── business-strategy.md                     # Missão, visão, valores, personas, OKRs
│   ├── projeto-agendamento-nav360.md            # Contexto do sprint, problemas, oportunidades
│
├── 🎨 DESIGN E UX
│   ├── ux-guidelines.md                         # Princípios de design, padrões, acessibilidade
│   ├── design-system.md                         # Cores, tipografia, componentes, tokens
│
├── 📱 FLUXOS (PRODUTO)
│   ├── fluxo-agendamento/                       # Documentação fluxo completo
│   │   └── fluxo-agendamento-otimizado-v2.md   # ⭐ 3 fluxos principais (v2.0 - ATIVO)
│   │                                            # → Para mim | Para outro | Para múltiplos
│   │
│   └── 🏠 dasa-homepage/                        # ⭐ HOME PAGE - Fase 0 (NOVO!)
│       ├── README.md                            # Índice e visão geral
│       ├── 01-estrutura-categorias.md           # Layout + 7 categorias + 23 cards
│       ├── 02-copy-cards-completa.md            # Copy validada (100% copy-rules.md)
│       ├── 03-por-que-dasa-hall-convencimento.md # 6 blocos persuasivos + dados
│       ├── componentes/
│       │   └── ocr-upload-copy-titulos.md       # 10 opções títulos bloco OCR
│       └── pesquisa-educacao/
│           └── educacao-paciente-mitos-verdades.md # Dados: mitos/verdades saúde
│
└── ✍️ COMUNICAÇÃO
    └── copy-rules.md                            # Tom, linguagem, regras de escrita
```

---

## ⚡ **Quickstart (5 min)**

### **Tenho uma tarefa. Por onde comço?**

| Tarefa | Leia Primeiro | Depois |
|--------|---------------|--------|
| **Revisar design** | `ux-guidelines.md` | `design-system.md` |
| **Escrever conteúdo** | `copy-rules.md` | `business-strategy.md` (personas) |
| **Implementar home page** | `dasa-homepage/README.md` | `dasa-homepage/01-estrutura-categorias.md` + `02-copy-cards-completa.md` |
| **Implementar bundles/upsell** | `dasa-homepage/05-bundles-pacotes-exames-vacinas.md` | `fluxo-agendamento-otimizado-v2.md` (etapa 7) |
| **Implementar fluxo** | `fluxo-agendamento-otimizado-v2.md` | `ux-guidelines.md` + `design-system.md` |
| **Entender problema** | `business-strategy.md` | `projeto-agendamento-nav360.md` |
| **Implementar código** | `ux-guidelines.md` (mobile-first) | `design-system.md` (tokens) |
| **Validar com persona feminina** | `dasa-homepage/06-persona-feminina-adaptacoes.md` | `fluxo-agendamento-otimizado-v2.md` (exemplos 6-8) |
| **Validar com usuário** | `business-strategy.md` (personas) | `fluxo-agendamento-otimizado-v2.md` |

---

## 🏷️ **Sistema de Tags**

Todos os documentos têm tags para fácil navegação. **Veja `TAGS.md` para lista completa.**

### **Tags Principais:**

**Por Tipo:**
- `#strategy` - Estratégia, visão, negócio
- `#product` - Fluxos, features, product design
- `#design` - UX, guidelines, componentes
- `#copy` - Tom de voz, linguagem, conteúdo
- `#technical` - Implementação, código

**Por Contexto:**
- `#agendamento` - Tudo sobre agendamento de exames
- `#personas` - Perfis de usuários (Moisés, Miriam, Manoel, Personas Femininas)
- `#mobile-first` - Mobile, responsividade, touch targets
- `#acessibilidade` - WCAG, contraste, inclusão
- `#fluxo` - Fluxos de usuário, jornadas
- `#feminino` - Persona feminina, adapta ções por faixa etária, bundles femininos

**Por Fase:**
- `#mvp` - Escopo mínimo de 3 meses
- `#v2.0` - Versão atual (fluxo otimizado)
- `#futuro` - Roadmap pós-MVP

---

## 📚 **Documentos em Detalhe**

### **1. business-strategy.md** `#strategy #personas`
**O quê?** Missão, visão, valores Dasa + contexto do produto Nav360

**Contém:**
- Visão geral da Dasa (líder em medicina diagnóstica)
- Valores da empresa (Proximidade, Cliente no Centro, Inovação, etc)
- **3 Personas em Profundidade:**
  - 🎯 **Moisés** (34, Standard) - O Malabarista: descomplicar, flexibilidade
  - 🎯 **Miriam** (28, Executivo) - Profissional: automação, integração, lembretes
  - 🎯 **Manoel** (62, Premium) - Executivo: concierge, exclusividade, zero atrito
- OKRs e KRs para 3 meses
- Proposta de valor completa
- Métricas de sucesso

**Use quando:**
- Preciso entender nossos usuários
- Quero validar tom de mensagem
- Preciso saber qual persona é alvo
- Quero entender direção estratégica

---

### **2. projeto-agendamento-nav360.md** `#product #agendamento #mvp`
**O quê?** Contexto do sprint, briefing do projeto, oportunidades e perguntas-chave

**Contém:**
- Objetivo do sprint (3 meses, redesenho completo)
- Revisão do fluxo atual
- Pesquisa de embasamento
- Considerações de uso (terceiros, múltiplas pessoas, fluxo unificado)
- 10 oportunidades a explorar (OCR, IA, upselling, etc)
- Jobs to Be Done principais
- Limitações técnicas e alertas
- Checklist diário do designer

**Use quando:**
- Quero entender contexto completo do projeto
- Preciso explorar oportunidades
- Tenho dúvida sobre escopo
- Quero validar limitações técnicas

---

### **3. fluxo-agendamento-otimizado-v2.md** `#product #fluxo #agendamento ⭐ ATIVO`
**O quê?** **3 Fluxos principais do agendamento** (v2.0 - versão atual)

**Contém:**
- **Fluxo 1: Para Mim Mesmo** (8 etapas, 3-4 min)
  - Exame → Convênio → Preço → Unidades → Data/Hora → ID → Upsell → Confirmação
- **Fluxo 2: Para Outra Pessoa** (9 etapas, 5-6 min)
  - + Dados do terceiro, validações para menores de 18
- **Fluxo 3: Para Múltiplas Pessoas** (11 etapas, 7-9 min)
  - + Estratégia de agendamento, preços individualizados, pagamento flexível
- Changelog v1.0 → v2.0 (mudanças principais)
- Bloqueios automáticos e validações
- Comparação v1.0 vs v2.0

**Use quando:**
- Vou implementar fluxo de agendamento
- Preciso de wireframes/protótipo
- Quero entender ordem das etapas
- Preciso validar edge cases

**Mudança Principal v2.0:**
```
ANTES: Para quem? → Exame → Convênio → Preço → Unidades → ID → Upsell
DEPOIS: Exame → Convênio → Preço → Unidades → Para quem? → ID → Upsell
```

---

### **4. ux-guidelines.md** `#design #acessibilidade #mobile-first`
**O quê?** Princípios de design, padrões UX, mobile-first, acessibilidade WCAG AA

**Contém:**
- 5 Princípios de Design (Clareza, Consistência, Feedback, Acessibilidade, Autonomia)
- **Mobile-First** (375px, thumbzone, touch targets 44x44px)
- Formulários otimizados para mobile
- Navegação (breadcrumbs, botões, ordem de etapas)
- Busca e seleção
- Estados e feedback (loading, erros, sucesso)
- Personalização e smart defaults
- Upselling de baixo atrito
- **Acessibilidade WCAG AA** (contraste 4.5:1, navegação teclado, screen readers)
- Casos especiais (terceiros, urgência, convênio vs particular)

**Use quando:**
- Vou fazer layout/wireframe
- Preciso validar acessibilidade
- Quero saber melhor UX pattern
- Estou fazendo review de design

---

### **5. design-system.md** `#design #technical`
**O quê?** Design tokens, paleta de cores, tipografia, componentes, spacing, animações

**Contém:**
- **Cores Semânticas:**
  - Primary: Vermelho (#EA4356 - Red-90)
  - Success: Verde (#32A454)
  - Warning: Amarelo/Laranja (#EB7005)
  - Error: Vermelho escuro (#D83145)
  - Info: Azul (#3F7BF2)
- **Paleta Completa:** Red, Yellow, Gray, Green, Blue + cores estendidas (Lime, Acqua, Purple, Pink)
- **Tipografia:**
  - Fonte: Dasa Sans (Regular, Medium, Semibold, Bold)
  - Hierarquia: H1 64px até Caption 12px
  - Line-height: 1.25 (headings) / 1.5 (body)
- **Border Radius:** 0px até pill/infinite
- **Spacing & Grid:** Breakpoints mobile-first (320px até 1440px)
- **Componentes:** Botões, Cards, Inputs, Forms
- **Animações:** Durações (150-500ms), Easing (ease-in-out)
- **Acessibilidade:** Contraste, Touch targets, Navegação

**Use quando:**
- Vou codificar/criar componentes
- Preciso de tokens CSS/Tailwind
- Quero saber cores/tipografia oficiais
- Estou validando contraste

---

### **6. copy-rules.md** `#copy #comunicação`
**O quê?** Tom de voz, regras de escrita, glossário de termos, linguagem

**Contém:**
- **Formatação:** Maiúscula, pontuação, estilo de fonte
- **Números e Datas:** Como escrever (formato brasileiro)
- **Doenças e Infecções:** HIV, Covid-19, IST, etc
- **Botões de Ação:** Verbo no infinitivo, 2-3 palavras, sem ponto
- **Abreviações e Siglas:** Quando usar, quando evitar
- **Glossário de Termos:** O que usamos vs o que evitamos
  - ✅ Usar: Convênio, Paciente, Laboratório, Mostrar
  - ❌ Evitar: Plano, Usuário, Unidade, Ver
- **Checklist Rápido:** Fazer vs Evitar

**Use quando:**
- Vou escrever copy (botões, labels, mensagens)
- Preciso validar tom
- Tenho dúvida sobre termo certo
- Estou fazendo review de conteúdo

---

## 🔍 **Como Navegar**

### **Opção 1: Por Objetivo**
Usa a tabela **Quickstart** acima.

### **Opção 2: Por Tag**
Veja `TAGS.md` para buscar por:
- `#strategy`, `#product`, `#design`, `#copy`, `#technical`
- `#agendamento`, `#personas`, `#mobile-first`, `#acessibilidade`
- `#mvp`, `#v2.0`, `#futuro`

### **Opção 3: Por Função**
**Product Designer:**
- `business-strategy.md` → `fluxo-agendamento-otimizado-v2.md` → `ux-guidelines.md`

**Designer/Front-end:**
- `ux-guidelines.md` → `design-system.md` → `fluxo-agendamento-otimizado-v2.md`

**Copywriter/Content:**
- `copy-rules.md` → `business-strategy.md` (personas) → `fluxo-agendamento-otimizado-v2.md`

**Desenvolvedor Back-end:**
- `fluxo-agendamento-otimizado-v2.md` (bloqueios, validações) → `projeto-agendamento-nav360.md` (limites técnicos)

---

## 📋 **Versionamento**

Cada documento tem header com:
```markdown
> **Versão:** X.X | **Data:** YYYY-MM-DD | **Tags:** #tag1 #tag2
```

**Histórico completo:** Veja `CHANGELOG.md`

**Mudanças Importantes:**
- **v2.0 (2025-11-19):** Fluxo de agendamento reordenado (Exame → Convênio → Preço)
- **v1.0 (2025-11-15):** Fluxo original baseado em pesquisa

---

## 🗂️ **Estrutura Futura (Sugestão)**

Para facilitar ainda mais, quando crescer:

```
dasa/
├── 1-strategy/
│   ├── business-strategy.md
│   └── personas.md (se separado)
├── 2-product/
│   ├── projeto-agendamento-nav360.md
│   └── fluxo-agendamento-otimizado-v2.md
├── 3-design/
│   ├── ux-guidelines.md
│   └── design-system.md
└── 4-copy/
    └── copy-rules.md
```

**Pros:**
- Mais organizado para projetos grandes
- Fácil navegar por layer

**Cons:**
- Hoje são poucos arquivos (talvez exagerado)

**Recomendação:** Implementar quando tiver 15+ documentos.

---

## 🔗 **Links Rápidos**

- **Personas:** `business-strategy.md` (linha 60-330)
- **OKRs:** `business-strategy.md` (linha 53-58)
- **3 Fluxos:** `fluxo-agendamento-otimizado-v2.md` (linha 25-220)
- **Mobile-First:** `ux-guidelines.md` (linha 58-95)
- **Design Tokens:** `design-system.md` (linha 1-150)
- **Copy Rules:** `copy-rules.md` (linha 15-80)

---

## ✅ **Checklist Diário**

Ao trabalhar no DASA, verificar:

- [ ] Está seguindo `ux-guidelines.md` (mobile-first, acessibilidade)?
- [ ] Usa componentes de `design-system.md`?
- [ ] Copy segue `copy-rules.md` (tom, regras, glossário)?
- [ ] Personagem/contexto alinha com uma das personas em `business-strategy.md`?
- [ ] Fluxo alinha com `fluxo-agendamento-otimizado-v2.md`?
- [ ] Validações de `projeto-agendamento-nav360.md` estão cobertas?

---

## 🤝 **Contribuindo**

Como time trabalhando no DASA:

1. **Novo aprendizado?** Adicione ao documento relevante
2. **Mudança de estratégia?** Atualize arquivo + CHANGELOG.md
3. **Novo documento?** Só se não existir similar (consolidar é melhor)
4. **Atualização?** Sempre atualize header com data e versão

---

## 📖 **Comandos Customizados**

Se configurados, use:
```
/design-review    - Analisa design considerando todas as guidelines
/figma-to-code    - Gera código do Figma seguindo nossos padrões
```

Execute `/help` para ver todos os comandos disponíveis.

---

## 📊 **Status da KB**

### ✅ Completo
- [x] Business Strategy (missão, visão, personas, OKRs)
- [x] Fluxo de Agendamento (v2.0 - 3 fluxos principais)
- [x] UX Guidelines (mobile-first, acessibilidade)
- [x] Design System (colors, typography, components)
- [x] Copy Rules (tom, glossário, regras)
- [x] README (este documento)
- [x] TAGS.md (sistema de navegação)
- [x] CHANGELOG.md (histórico)

### ⏳ Futuro (Nice-to-have)
- [ ] Componentes em Figma linkados
- [ ] Wireframes do fluxo
- [ ] Guia de implementação técnica (BE)
- [ ] Precedentes de decisão
- [ ] Playbook de testes com usuários

---

## 📞 **Quick Reference**

**Para LLMs (Claude Code):**

```
"Baseado em dasa/ux-guidelines.md, revise este design"
"Use tokens de dasa/design-system.md neste código"
"Valide copy seguindo dasa/copy-rules.md"
"Implemente fluxo conforme dasa/fluxo-agendamento-otimizado-v2.md"
```

---

## 🚀 **Próximos Passos**

1. ✅ Validar fluxo v2.0 com product e eng
2. 📱 Criar wireframes das 11 etapas
3. 🎨 Implementar no Figma
4. 👥 Testar com usuários
5. 🔄 Iterar baseado em feedback

---

**Mantido por:** Product Designer
**Última atualização:** 2025-11-19
**Próxima revisão:** Após implementação dos wireframes
