# 🎯 DASA Nav360: Wireframes + Copy Integrados

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** 🟡 Em Produção | **Personas:** Moisés, Miriam, Manoel

> Experiência completa de agendamento com wireframes ASCII, copy integrada e specs técnicas inline. Mobile-first (375px), WCAG AA, pronto para implementação.

---

## 📌 SUMÁRIO EXECUTIVO

Este documento apresenta os **3 fluxos de agendamento** (Para Mim, Para Outro, Para Múltiplos) com:
- ✅ Wireframes ASCII por etapa (11 ao total)
- ✅ Copy integrada (títulos, labels, CTAs, validações, errors, success)
- ✅ States documentados (empty, loading, error, success)
- ✅ Anotações técnicas inline (touch targets, spacing, comportamentos)
- ✅ Tone variations (Moisés, Miriam, Manoel)

**Navegação:**
- [Visão Geral + Decision Trees](#visão-geral)
- [Etapa 1: Busca de Exame](#etapa-1-busca-de-exame)
- [Etapa 2: Convênio](#etapa-2-convênio)
- [Etapa 3: Preço](#etapa-3-preço)
- [Etapa 4: Para Quem?](#etapa-4-para-quem)
- [Etapa 5: Identificação](#etapa-5-identificação)
- [Etapa 6: Unidades](#etapa-6-unidades)
- [Etapa 7: Data/Horário](#etapa-7-datahora)
- [Etapa 8: Upsell](#etapa-8-upsell)
- [Etapa 9: Revisão](#etapa-9-revisão)
- [Etapa 10: Checkout](#etapa-10-checkout)
- [Etapa 11: Confirmação](#etapa-11-confirmação)

---

## 🎬 VISÃO GERAL: 3 FLUXOS {#visão-geral}

### Fluxo 1: Para Mim (8 etapas)
```
Busca → Convênio → Preço → ID → Unidades → Data/Hora → Upsell → Confirmação
Tempo estimado: 3-4 minutos
Persona alvo: Moisés (Standard) - rapidez + flexibilidade
```

### Fluxo 2: Para Outro (9 etapas)
```
Busca → Convênio → Preço → Para Quem? → ID (Agendador) → Unidades → Data/Hora → Upsell → Confirmação
Tempo estimado: 5-6 minutos
Personas alvo: Miriam (Executivo), Manoel (Premium)
```

### Fluxo 3: Para Múltiplos (11 etapas)
```
Busca → Convênio → Preço → Para Quem? → Estratégia → ID (Múltiplos) → Unidades → Data/Hora → Pagamento → Upsell → Confirmação
Tempo estimado: 7-9 minutos
Personas alvo: Manoel (delegação), Miriam + grupo
```

### Decision Tree
```
👤 INÍCIO: Quantas pessoas você vai agendar?

    ├─ Só eu
    │  └─→ FLUXO 1 (Para Mim - 8 etapas)
    │      Mais rápido, menos informações
    │
    ├─ Outra pessoa
    │  └─→ FLUXO 2 (Para Outro - 9 etapas)
    │      Coleta dados de terceiro
    │
    └─ Várias pessoas (2+)
       └─→ FLUXO 3 (Para Múltiplos - 11 etapas)
           Otimização grupal, multiplos pagamentos
```

---

## 📱 PADRÕES GLOBAIS (Todas as Etapas)

### Estrutura de Tela
```
┌─────────────────────────────────┐
│ 🔙 [Voltar]  Etapa 2 de 8   [?] │  ← Header (sempre)
├─────────────────────────────────┤
│                                 │
│  [CONTEÚDO PRINCIPAL]           │
│                                 │
│  (Título + Descrição            │
│   + Campos/Seleção              │
│   + Estados)                    │
│                                 │
├─────────────────────────────────┤
│                                 │
│  [Botão Primário]               │  ← Sticky na base (48px)
│  [Botão Secundário] (opcional)  │
│                                 │
└─────────────────────────────────┘

**Specs:**
- Viewport: 375px (mobile padrão)
- Header: 56px (nav + breadcrumb)
- Content: Scroll vertical
- Footer: Sticky com 8px padding (96px total com botões)
```

### Tipografia Padrão
```
TÍTULO DA ETAPA: 24px / Bold / #161616
DESCRIÇÃO/HELP:  14px / Regular / #4B4B4B
LABEL CAMPO:     14px / Medium / #161616 (sempre acima do field)
PLACEHOLDER:     14px / Regular / #A1A1A1 (informativo, nunca label)
CTA PRIMÁRIO:    16px / Semibold / #FEFEFE on #EA4356
CTA SECUNDÁRIO:  16px / Regular / #EA4356 on transparent
VALIDAÇÃO:       12px / Regular / #D83145 (erro) ou #32A454 (sucesso)
```

### Estados Padrão
```
VAZIO:    Placeholder + ícone/sugestão
LOADING:  Skeleton screen (shimmer animation)
ERROR:    Border vermelho (#D83145) + mensagem inline
SUCCESS:  Verde (#32A454) + checkmark
DISABLED: Opacidade 50% + cursor not-allowed
```

---

## ⭐ ETAPA 1: BUSCA DE EXAME

**Fluxo:** Todos os 3 (1ª etapa idêntica)
**Tempo:** 1 minuto
**Objetivo:** Paciente encontra o exame que precisa

### Wireframe

```
┌─────────────────────────────────┐
│ 🏠              Buscar   [?]     │
├─────────────────────────────────┤
│                                 │
│  Qual exame você procura?       │  ← Título 24px
│  Busque ou selecione abaixo     │  ← Help text 14px
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔍 Hemograma, Covid, etc...││  ← Input 44px height
│  └─────────────────────────────┘│     Validação: inline
│                                 │
│  💡 EXAMES POPULARES             │  ← Seção 14px
│  ☐ Hemograma Completo           │  ← Checkbox 48px
│  ☐ Covid-19 (Rápido)            │
│  ☐ Glicemia de Jejum            │
│  ☐ TSH + Vitamina D             │
│                                 │
│  📄 OCR (foto do pedido)         │  ← Button secundário
│  Enviar foto do pedido           │
│                                 │
├─────────────────────────────────┤
│ [Continuar com seleção]         │  ← Botão primário
│  Ou [Pular por enquanto]        │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "Qual exame você procura?"
SUBTÍTULO: "Busque ou selecione abaixo"
PLACEHOLDER: "Hemograma, Covid-19, Ressonância, etc"

LABEL CAMPO: [não tem, é um input de busca]

BOTÕES:
- Primário: "Continuar com seleção" (infinitivo + ação)
- Secundário: "Pular por enquanto" (raro, para expeditar)

OCR BUTTON: "Enviar foto do pedido"
```

#### Copy Secondary (Estados)

**Validação Inline (enquanto digita):**
```
❌ ERRO (0 caracteres): [vazio, apenas placeholder]
✓ SUCESSO (3+ caracteres): Mostra sugestões ("Hemograma", "Covid-19")
❌ ERRO (não encontrado): "Exame não encontrado"
✓ INFO (OCR ativado): "Foto enviada! Processando..."
```

**Mensagens de Erro:**
```
❌ "Exame não encontrado. Tente outro ou contate o suporte."
❌ "Aguarde... buscando exames" (loading)
✓ "Ótimo! Hemograma está disponível com seu convênio"
```

#### Tone Variations

**Moisés (Standard - Direto):**
```
"Qual exame você quer fazer?"
"Busque rápido"
"Continuar"
```

**Miriam (Executivo - Acolhedor):**
```
"Qual exame você precisa?"
"Deixa a gente buscar pra você"
"Prosseguir"
```

**Manoel (Premium - Sofisticado):**
```
"Qual é o exame solicitado?"
"Busque ou envie foto do pedido"
"Prosseguir"
```

### Specs Técnicas

```
INPUT FIELD:
- Altura: 44px
- Padding: 12px 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Font: 16px / Regular / #161616
- Placeholder: #A1A1A1
- Focus: Border #EA4356 + shadow 0 0 0 3px rgba(234,67,86,0.1)

CHECKBOX (Popular items):
- Altura: 48x48px (touch target)
- Spacing: 12px
- Label text: 14px / Regular
- Color: Unchecked #E6E6E6, Checked #EA4356

OCR BUTTON:
- Height: 44px
- Style: Secundário (transparent, border)
- Icon: 📄 + text

VALIDAÇÃO INLINE:
- Cor error: #D83145
- Cor success: #32A454
- Font: 12px / Regular
- Position: Abaixo do campo, 8px de gap

LOADING STATE:
- Skeleton screen (shimmer) por 0.5-1.5s
- Mostra "Buscando..." durante requisição
```

---

## 🎯 ETAPA 2: CONVÊNIO

**Fluxo:** Todos os 3 (2ª etapa idêntica)
**Tempo:** 1 minuto
**Objetivo:** Identificar como o exame será pago (convênio ou particular)

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 2 de 8     │
├─────────────────────────────────┤
│                                 │
│  Qual seu convênio?             │  ← Título 24px
│  O convênio pode alterar        │  ← Help 14px (importante!)
│  valores e disponibilidade      │
│                                 │
│  ☐ Tenho convênio               │  ← Radio button 48px
│    Selecione seu convênio       │
│    ┌─────────────────────────┐  │
│    │ Bradesco, Amil, Sul... │  │  ← Autocomplete field
│    │ • Bradesco Saúde       │  │
│    │ • Bradesco Seguros     │  │
│    │ • Amil Flex            │  │
│    │ • Amil Mais            │  │
│    └─────────────────────────┘  │
│                                 │
│  ☐ Sou particular               │  ← Radio button 48px
│    Sem convênio, pago à vista   │
│                                 │
│  ❓ Não sei meu convênio        │  ← Link "Ajuda"
│                                 │
├─────────────────────────────────┤
│ [Continuar]                     │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "Qual seu convênio?"
SUBTÍTULO: "O convênio pode alterar valores e disponibilidade"
           (IMPORTANTE: ser transparente sobre implicações)

LABELS:
- Option 1: "Tenho convênio"
- Sub-label: "Selecione seu convênio"
- Option 2: "Sou particular"
- Sub-label: "Sem convênio, pago à vista"

FIELD (Autocomplete):
- Placeholder: "Bradesco, Amil, Unimed, etc"
- Mostrar popularidade: "Bradesco Saúde", "Amil Flex", etc

HELP LINK: "Não sei meu convênio? Ajuda"

BOTÃO PRIMÁRIO: "Continuar"
```

#### Copy Secondary (Estados)

**Validação:**
```
❌ VAZIO: Placeholder mostrando exemplos
✓ SELECIONADO: Checkmark + nome do convênio destacado
❌ NÃO ENCONTRADO: "Convênio não encontrado. Tente novamente ou..."
```

**Mensagens:**
```
✓ "Bradesco Saúde selecionado. Continuando..."
❌ "Convênio não localizado. Verifique o nome e tente novamente."
ℹ️ "Dica: Procure pelo nome da operadora (Bradesco, Amil, etc)"
```

#### Tone Variations

**Moisés (Standard - Prático):**
```
"Qual é seu convênio?" (direto)
"Tenho convênio / Sou particular"
"Continuar"
```

**Miriam (Executivo - Orientada):**
```
"Qual convênio você tem?"
"Isso ajuda a mostrar valores corretos"
"Prosseguir"
```

**Manoel (Premium - Executivo):**
```
"Qual é seu convênio?"
"Também podemos consultar seu histórico"
"Prosseguir"
```

### Specs Técnicas

```
RADIO BUTTON (Section):
- Height: 64px (touch target + label)
- Padding: 16px
- Border: 1px solid #E6E6E6
- Border-radius: 12px
- Background: white (unchecked), #FEF1F2 (checked - red-160)

AUTOCOMPLETE FIELD:
- Altura: 44px
- Padding: 12px 16px
- Border: 1px solid #E6E6E6 (or #EA4356 on focus)
- Border-radius: 8px
- Dropdown: max 5 items visíveis (scroll se necessário)

DROPDOWN ITEMS:
- Height: 48px
- Padding: 12px 16px
- Highlight on hover: #FEF1F2
- Checkmark on selected: #EA4356

HELP LINK:
- Color: #EA4356
- Font: 14px / Regular
- Underline: on hover
- Opens modal or contact page

VALIDAÇÃO:
- Error color: #D83145
- Success color: #32A454
- Animation: Slide in from bottom 200ms ease-out
```

---

## 💰 ETAPA 3: PREÇO

**Fluxo:** Todos os 3 (3ª etapa idêntica)
**Tempo:** 30 segundos (informativo)
**Objetivo:** Mostrar valor do exame com base em convênio selecionado

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 3 de 8     │
├─────────────────────────────────┤
│                                 │
│  Hemograma Completo             │  ← Exame (recap)
│  Bradesco Saúde                 │  ← Convênio (recap)
│                                 │
│  ┌─────────────────────────────┐│
│  │ VOCÊ PAGARÁ                  ││  ← Headline 14px
│  │                              ││
│  │ R$ 0,00                      ││  ← Valor destaque 32px
│  │ 100% coberto                 ││  ← Status 14px green
│  │                              ││
│  │ Valor tabela: R$ 85,00       ││  ← Informativo 12px gray
│  └─────────────────────────────┘│
│                                 │
│  ✓ Sem surpresas no final       │  ← Trust builder
│                                 │
│  💡 Dica: Pode haver custos     │  ← Info (raro)
│  de deslocamento (taxiado)      │
│                                 │
├─────────────────────────────────┤
│ [Continuar]                     │
│ [Alterar convênio]              │  ← Botão terciário
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "Hemograma Completo" (recap do exame)
SUBTÍTULO: "Bradesco Saúde" (recap do convênio)

MAIN MESSAGE: "VOCÊ PAGARÁ"
PRICE: "R$ 0,00" (ou "R$ 85,00" se particular)
STATUS: "100% coberto" (green) ou "Particular" (gray)

DETAIL: "Valor tabela: R$ 85,00" (fine print, 12px)

TRUST MESSAGE: "✓ Sem surpresas no final"

OPTIONAL INFO: "Pode haver custos de deslocamento (táxi/Uber)"

BOTÕES:
- Primário: "Continuar"
- Terciário: "Alterar convênio" (permitir mudança)
```

#### Copy Secondary (Estados)

**Variações por situação:**
```
✓ 100% coberto: "R$ 0,00 / 100% coberto"
✓ Parcialmente: "R$ 35,00 / 80% coberto (você paga 20%)"
✓ Não coberto: "R$ 85,00 / Não coberto pelo seu convênio"
⚠️ Convênio vencido: "Seu convênio pode estar vencido"
```

**Warnings (se aplicável):**
```
⚠️ "Convênio pode pedir autorização prévia (1-2h)"
⚠️ "Este exame pode ter fila (7-14 dias)"
✓ "Agora você pode agendar!" (após validação)
```

#### Tone Variations

**Moisés (Standard - Transparência):**
```
"R$ 85,00? Tudo bem!"
"Sem custos escondidos"
"Continuar"
```

**Miriam (Executivo - Confiança):**
```
"Você pagará..."
"Tranquilo! Sem surpresas"
"Prosseguir"
```

**Manoel (Premium - Clareza):**
```
"Investimento em saúde"
"Sem custos adicionais previstos"
"Prosseguir"
```

### Specs Técnicas

```
PRICE CARD (Container):
- Background: #FEF1F2 (red-160 very subtle)
- Border: 1px solid #FDDDE1
- Border-radius: 12px
- Padding: 20px 16px

PRICE LABEL:
- Font: 14px / Medium / #4B4B4B
- Margin-bottom: 8px

PRICE VALUE:
- Font: 32px / Bold / #EA4356
- Line-height: 1.2

PRICE STATUS:
- Font: 14px / Regular / #32A454 (se coberto)
- Font: 14px / Regular / #D83145 (se não coberto)

DETAIL TEXT:
- Font: 12px / Regular / #4B4B4B
- Margin-top: 8px

TRUST BADGE:
- Font: 14px / Regular / #32A454
- Ícone: ✓ checkmark

INFO BOX:
- Background: #D9E5FC (blue-150)
- Border-left: 3px solid #3F7BF2
- Padding: 12px
- Font: 13px / Regular / #161616
- Border-radius: 4px

BUTTON TERCIÁRIO:
- Color: #EA4356
- Text-decoration: underline on hover
- Font: 14px / Regular
```

---

## 👥 ETAPA 4: PARA QUEM?

**Fluxo:**
- Fluxo 1 (Para Mim): NÃO APARECE
- Fluxo 2 (Para Outro): APARECE (etapa 4)
- Fluxo 3 (Para Múltiplos): APARECE (etapa 4)

**Tempo:** 1 minuto (Fluxo 2) ou 2-3 minutos (Fluxo 3)
**Objetivo:** Definir para quantas/quais pessoas agendar

### Wireframe (FLUXO 2: Para Outro)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 4 de 9     │
├─────────────────────────────────┤
│                                 │
│  Este exame é para quem?        │  ← Título
│                                 │
│  ☐ Para mim mesmo               │  ← Opção 1
│                                 │
│  ☐ Para outra pessoa            │  ← Opção 2 (default)
│    Nome                         │
│    ┌─────────────────────────┐  │
│    │ Nome completo           │  │  ← Campo 44px
│    └─────────────────────────┘  │
│                                 │
│    Data de nascimento           │  ← Label
│    ┌─────────────────────────┐  │
│    │ DD / MM / AAAA          │  │  ← Campo data 44px
│    └─────────────────────────┘  │
│                                 │
│    Parentesco/Relação           │  ← Label
│    ☐ Cônjuge                    │  ← Radio 48px
│    ☐ Filho/Filha               │
│    ☐ Responsável               │
│    ☐ Outro                     │
│                                 │
├─────────────────────────────────┤
│ [Continuar]                     │
└─────────────────────────────────┘
```

### Wireframe (FLUXO 3: Para Múltiplos)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 4 de 11    │
├─────────────────────────────────┤
│                                 │
│  Quantas pessoas vão agendar?   │  ← Título
│                                 │
│  Múltiplas pessoas              │  ← Info
│  (Maximize economias)           │
│                                 │
│  [1]  [2]  [3]  [4+]            │  ← Quick select 44px
│                                 │
│  OU inserir nomes:              │  ← Alternative
│                                 │
│  ┌─ Pessoa 1 ────────────────┐  │
│  │ [João da Silva            ]  │  ← Remove X
│  │ Data: 01/03/1975          │  │
│  └────────────────────────────┘  │
│                                 │
│  ┌─ Pessoa 2 ────────────────┐  │
│  │ [Maria Silva              ]  │  ← Remove X
│  │ Data: 15/07/1980          │  │
│  └────────────────────────────┘  │
│                                 │
│  [+ Adicionar outra pessoa]     │  ← Add button
│                                 │
├─────────────────────────────────┤
│ [Continuar com 2 pessoas]       │  ← Botão com count
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary (FLUXO 2)
```
TÍTULO: "Este exame é para quem?"
LABELS:
- "Para mim mesmo"
- "Para outra pessoa"

FIELDS (se outra pessoa):
- Label: "Nome"
- Placeholder: "Nome completo"
- Label: "Data de nascimento"
- Placeholder: "DD / MM / AAAA"
- Label: "Parentesco/Relação"
- Options: "Cônjuge", "Filho/Filha", "Responsável", "Outro"

BOTÃO: "Continuar"
```

#### Copy Primary (FLUXO 3)
```
TÍTULO: "Quantas pessoas vão agendar?"
SUBTITLE: "Múltiplas pessoas (Maximize economias)"

QUICK SELECT: "1", "2", "3", "4+"

ALTERNATIVE: "OU inserir nomes:"

FIELDS (por pessoa):
- "Pessoa 1", "Pessoa 2", etc (headers)
- Field: "Nome completo"
- Field: "Data de nascimento"
- Button: "✕ Remover" (se >1)

ADD BUTTON: "[+ Adicionar outra pessoa]"

BOTÃO PRIMÁRIO: "Continuar com [N] pessoas"
```

#### Copy Secondary (Estados)

**Validações (ambos fluxos):**
```
❌ Nome vazio: "Insira o nome de quem vai fazer o exame"
❌ Data inválida: "Data de nascimento inválida (ex: 01/01/1990)"
❌ Menor detectado: "Paciente é menor de 18 anos. Responsável será..."
✓ Maior de 18: "Tudo certo!"
```

**Mensagens especiais (Fluxo 3 - múltiplos):**
```
✓ "2 pessoas selecionadas"
ℹ️ "Podemos agendar juntos ou em horários diferentes"
❌ "Máximo 5 pessoas por agendamento. Entre em contato para mais."
```

#### Tone Variations

**Moisés:**
```
"Pra quem é o exame?" (informal)
"Pode ser pra você ou outra pessoa"
"Continuar" (rápido)
```

**Miriam:**
```
"Para quem você gostaria de agendar?"
"Podemos cadastrar outras pessoas também"
"Prosseguir"
```

**Manoel:**
```
"Para quem deseja agendar?" (formal)
"Podemos incluir dependentes"
"Prosseguir"
```

### Specs Técnicas

```
RADIO OPTION (Container):
- Height: 64px (touch target)
- Padding: 16px
- Border: 1px solid #E6E6E6
- Border-radius: 12px
- Spacing: 12px between

FIELD (Name, Date, etc):
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Focus: Border #EA4356 + shadow

DROPDOWN (Parentesco):
- Height: 44px
- Items: 48px each
- Max visible: 3 items (scroll if needed)

QUICK SELECT BUTTONS (1, 2, 3, 4+):
- Width: 60px
- Height: 44px
- Border: 2px
- Border-radius: 8px
- Selected: #EA4356 + white text
- Unselected: #E6E6E6 + gray text

PERSON CARD (Fluxo 3):
- Background: #F5F5F5
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Padding: 16px
- Margin-bottom: 12px
- Header: Bold 14px + "✕ Remover" link right

ADD BUTTON:
- Style: Secundário (transparent, border)
- Icon: + plus sign
- Height: 44px
```

---

## 🆔 ETAPA 5: IDENTIFICAÇÃO

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 4 (pula "Para Quem?")
- Fluxo 2 (Para Outro): Etapa 5 (confirmação agendador)
- Fluxo 3 (Para Múltiplos): Etapa 6 (dados de todos)

**Tempo:** 2-3 minutos
**Objetivo:** Confirmar/coletar dados de identificação

### Wireframe (FLUXO 1: Para Mim)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 4 de 8     │
├─────────────────────────────────┤
│                                 │
│  Confirme seus dados            │  ← Título
│                                 │
│  ✓ João da Silva (verificado)   │  ← Já logado (checkmark)
│                                 │
│  CPF:  123.456.789-00           │  ← Preenchido
│  Birthdate: 15/01/1985          │  ← Preenchido
│  Phone: (11) 98765-4321         │  ← Preenchido
│                                 │
│  [Editar dados] (link)          │  ← Permitir mudança
│                                 │
│  Endereço para resultado        │  ← Seção
│  ☐ Casa (Av. Paulista, 1000)    │  ← Preenchido
│  ☐ Trabalho (Rua X, 500)        │  ← Opção
│  ☐ Outro                        │  ← Opção
│                                 │
├─────────────────────────────────┤
│ [Continuar]                     │
└─────────────────────────────────┘
```

### Wireframe (FLUXO 2: Para Outro - Confirmar Agendador)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 5 de 9     │
├─────────────────────────────────┤
│                                 │
│  Confirmemos seus dados         │  ← Título (agendador)
│  (quem está agendando)          │
│                                 │
│  ✓ João da Silva (você)         │  ← Verificado
│  CPF: 123.456.789-00            │
│  Phone: (11) 98765-4321         │
│                                 │
│  [Editar dados] (link)          │
│                                 │
│  Resultado será enviado para:   │  ← Info
│  ☐ Seu email: joao@email.com    │
│  ☐ Email da pessoa: maria@...   │
│  ☐ SMS: (11) 99999-8888         │
│                                 │
├─────────────────────────────────┤
│ [Continuar]                     │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary (FLUXO 1)
```
TÍTULO: "Confirme seus dados"
SUBTITLE: (nenhum)

DATA DISPLAY:
- "✓ João da Silva (verificado)"
- "CPF: 123.456.789-00"
- "Birthdate: 15/01/1985" OR "Data de nascimento: 15/01/1985"
- "Phone: (11) 98765-4321"

EDIT LINK: "[Editar dados]" (abre modal/página)

ADDRESS SECTION: "Endereço para resultado"
- Options:
  - "Casa (Av. Paulista, 1000)"
  - "Trabalho (Rua X, 500)"
  - "Outro"

BOTÃO: "Continuar"
```

#### Copy Primary (FLUXO 2)
```
TÍTULO: "Confirmemos seus dados"
SUBTITLE: "(quem está agendando)"

DATA DISPLAY (igual Fluxo 1):
- "✓ João da Silva (você)"
- [CPF, Phone, etc]

RESULT DELIVERY SECTION: "Resultado será enviado para:"
- "Seu email: joao@email.com"
- "Email da pessoa: maria@..."
- "SMS: (11) 99999-8888"

BOTÃO: "Continuar"
```

#### Copy Secondary (Estados)

**Validações:**
```
✓ Dados verificados: "✓ Dados confirmados"
❌ CPF inválido: "CPF inválido. Verifique e tente novamente."
❌ Telefone inválido: "Telefone deve ter 10 ou 11 dígitos"
❌ Email inválido: "Email inválido (ex: nome@email.com)"
```

**Info messages:**
```
ℹ️ "Seus dados estão protegidos pela LGPD"
ℹ️ "Resultado será enviado em 24-48h"
✓ "Tudo pronto! Seguindo..."
```

#### Tone Variations

**Moisés:**
```
"Seus dados estão certos?"
"Pra onde mando o resultado?"
"Continuar"
```

**Miriam:**
```
"Vamos confirmar seus dados"
"Resultado por email ou SMS?"
"Prosseguir"
```

**Manoel:**
```
"Confirmamos seus dados?"
"Resultado para seu email registrado"
"Prosseguir"
```

### Specs Técnicas

```
DATA DISPLAY (Text):
- Font: 14px / Regular / #161616
- Line-height: 1.5
- Spacing: 8px between lines
- Checkmark: green #32A454 before name
- Editable: [Editar dados] link in gray #4B4B4B

EDIT LINK:
- Color: #EA4356
- Font: 14px / Regular
- Text-decoration: underline on hover

SECTION HEADER:
- Font: 14px / Medium / #161616
- Margin-top: 20px
- Margin-bottom: 12px

RADIO OPTIONS (Address):
- Height: 56px (touch target)
- Padding: 12px 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Selected: Background #FEF1F2, Border #EA4356

CONFIRMATION CHECK:
- ✓ icon: green #32A454
- Font size: 14px
```

---

## 📍 ETAPA 6: UNIDADES

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 5
- Fluxo 2 (Para Outro): Etapa 6
- Fluxo 3 (Para Múltiplos): Etapa 7

**Tempo:** 2 minutos
**Objetivo:** Escolher laboratório/unidade mais conveniente

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 5 de 8     │
├─────────────────────────────────┤
│                                 │
│  Onde você prefere ir?          │  ← Título
│  Próximo de você (São Paulo)    │  ← Help (localização)
│                                 │
│  🔍 [Buscar bairro/endereço]    │  ← Busca 44px
│                                 │
│  ┌─ DELBONI SUMARÉ ────────────┐│
│  │ 📍 Av. Paulista, 2000       ││  ← Card 80px
│  │ ⭐ 4.8 (320 reviews)        ││
│  │ 🕐 Aberto agora             ││
│  │ 🚗 2km de você              ││
│  │ ✓ [Selecionar]              ││
│  └────────────────────────────┘│
│                                 │
│  ┌─ DELBONI AV. BRASIL ────────┐│
│  │ 📍 Av. Brasil, 5000         ││  ← Card 80px
│  │ ⭐ 4.6 (210 reviews)        ││
│  │ 🕐 Abre em 2h               ││
│  │ 🚗 4km de você              ││
│  │ [Selecionar]                ││
│  └────────────────────────────┘│
│                                 │
│  📱 [Mostrar mapa]              │  ← Botão terciário
│                                 │
├─────────────────────────────────┤
│ [Continuar com seleção]         │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "Onde você prefere ir?"
SUBTITLE: "Próximo de você (São Paulo)" OR "Laboratório/Unidade"

SEARCH PLACEHOLDER: "Buscar bairro, endereço, ou unidade"

UNIT CARD (each):
- Header: "DELBONI SUMARÉ" (bold, uppercase)
- Address: "📍 Av. Paulista, 2000"
- Rating: "⭐ 4.8 (320 reviews)"
- Status: "🕐 Aberto agora" OR "🕐 Abre em 2h"
- Distance: "🚗 2km de você"
- Button: "[Selecionar]"

MAP LINK: "[Mostrar mapa]" (opens Google Maps)

BOTÃO PRIMÁRIO: "Continuar com seleção"
OR "Continuar" (if selected)
```

#### Copy Secondary (Estados)

**Validações:**
```
❌ Nenhuma selecionada: "Selecione uma unidade para continuar"
✓ Selecionada: "DELBONI SUMARÉ selecionada"
❌ Sem unidades: "Sem unidades disponíveis próximo a você"
ℹ️ Distância: "2km de você", "4km", "50km" (mostra distância real)
```

**Status messages:**
```
✓ "Aberto agora" (verde)
⚠️ "Abre em 2h" (amber)
❌ "Fechado agora" (red)
ℹ️ "Aberto 24h"
✓ "Horários especiais" (hover mostra)
```

#### Tone Variations

**Moisés:**
```
"Qual unidade fica perto de você?"
"A mais perto?" / "Qual prefere?"
"Continuar"
```

**Miriam:**
```
"Qual laboratório você prefere?"
"Mostramos as mais próximas"
"Prosseguir"
```

**Manoel:**
```
"Qual unidade preferir?"
"Conforto e conveniência"
"Prosseguir"
```

### Specs Técnicas

```
SEARCH FIELD:
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid #E6E6E6
- Focus: Border #EA4356 + blue shadow
- Icon: 🔍 magnifying glass

UNIT CARD:
- Height: 120px (content) + padding
- Padding: 16px
- Border: 1px solid #E6E6E6
- Border-radius: 12px
- Margin-bottom: 12px
- Background: white
- Hover: Box-shadow 0 4px 12px rgba(0,0,0,0.08)
- Selected: Border #EA4356 + background #FEF1F2

UNIT CARD FIELDS:
- Unit name: 14px / Bold / #161616
- Address: 13px / Regular / #4B4B4B + 📍 icon
- Rating: 13px / Regular / #4B4B4B + ⭐ icon
- Status: 13px / Regular / #32A454 (if open) or #D83145 (if closed)
- Distance: 13px / Regular / #4B4B4B + 🚗 icon

SELECT BUTTON:
- Height: 40px
- Style: Secundário (border #EA4356, text #EA4356)
- Position: Bottom right of card
- On selected: "✓ Selecionada" + filled background

MAP LINK:
- Color: #EA4356
- Font: 13px / Regular
- Underline: on hover
```

---

## 📅 ETAPA 7: DATA / HORÁRIO

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 6
- Fluxo 2 (Para Outro): Etapa 7
- Fluxo 3 (Para Múltiplos): Etapa 8

**Tempo:** 3-5 minutos
**Objetivo:** Escolher data e horário disponível

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 6 de 8     │
├─────────────────────────────────┤
│                                 │
│  Qual data e hora?              │  ← Título
│  Delboni Sumaré                 │  ← Unidade recap
│                                 │
│  NOVEMBRO                        │  ← Mês/ano
│  D  S  T  Q  Q  S  S            │  ← Dias semana
│     1  2  3  4  5  6            │
│  7  8  9 10 11 12 13            │
│ 14 15 16 17 18 19 20            │
│ 21 22[23]24 25 26 27            │  ← [23] = hoje destacado
│ 28 29 30                        │  ← X = sem disponibilidade
│                                 │
│  Sexta, 28 de novembro (seleção)│  ← Data selecionada
│                                 │
│  HORÁRIOS DISPONÍVEIS           │  ← Seção
│  🕐 Manhã (7h-12h)              │  ← Grupo
│     [7:30] [8:00] [8:30]        │  ← Botões 48px
│     [9:00] [9:30] [10:00]       │
│                                 │
│  🕐 Tarde (12h-18h)             │  ← Grupo
│     [13:30] [14:00] [14:30]     │
│     [⚠️ 15:00] [15:30]          │  ← 15:00 = poucas vagas
│                                 │
│  📝 [Reagendar]                 │  ← Botão terciário
│                                 │
├─────────────────────────────────┤
│ [Confirmar horário]             │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "Qual data e hora?"
SUBTITLE: "Delboni Sumaré"

MONTH/YEAR: "NOVEMBRO" (uppercase)

DAY LABELS: "D S T Q Q S S" (dias semana abreviados)

DAYS:
- Hoje: [23] highlighted with blue circle
- Sem disponibilidade: X (strikethrough or grayed)
- Selecionada: [28] highlighted with red circle

SELECTED DATE: "Sexta, 28 de novembro" OR "Selecionado: 28/11"

TIME GROUPS:
- "🕐 Manhã (7h-12h)"
- "🕐 Tarde (12h-18h)"
- "🕐 Noite (18h-22h)" (se disponível)

TIME BUTTONS:
- Regular: "[8:00]"
- Limited capacity: "[⚠️ 15:00]" (amarelo)
- Selected: "[8:30]" (filled background #EA4356)

RESCHEDULE LINK: "[Reagendar]" (change date/time after select)

BOTÃO PRIMÁRIO: "Confirmar horário"
```

#### Copy Secondary (Estados)

**Validações:**
```
❌ Nenhuma data selecionada: "Selecione uma data"
❌ Nenhum horário selecionado: "Selecione um horário"
✓ Ambos selecionados: "Sexta, 28 de novembro às 8:30"
⚠️ Poucas vagas: "⚠️ 15:00 (poucas vagas)"
❌ Sem disponibilidade: "Sem horários disponíveis"
```

**Info messages:**
```
ℹ️ "Apresentar-se 15 min antes"
ℹ️ "Resultado em 24-48h (feriado: +1 dia)"
✓ "Horário confirmado!"
⚠️ "Feriado: sem agendamento nesta data"
```

#### Tone Variations

**Moisés:**
```
"Qual é o melhor dia/hora pra você?"
"Próximo sábado? Domingo de manhã?"
"Confirmar"
```

**Miriam:**
```
"Qual horário combina com você?"
"Manhã ou tarde?"
"Confirmar"
```

**Manoel:**
```
"Qual data preferir?"
"Sugerimos primeira coisa pela manhã"
"Confirmar"
```

### Specs Técnicas

```
CALENDAR CONTAINER:
- Padding: 16px
- Background: white
- Border: 1px solid #E6E6E6
- Border-radius: 8px

MONTH/YEAR HEADER:
- Font: 14px / Medium / #161616
- Margin-bottom: 16px

DAY LABELS (DSTQQS):
- Font: 12px / Medium / #4B4B4B
- Spacing: equal columns (5.3% each)

DAY BUTTONS:
- Width/Height: equal (responsive grid)
- Touch target: min 44px
- Border: 1px solid #E6E6E6
- Border-radius: 4px
- Font: 14px / Regular / #161616
- Hover: Background #F5F5F5
- Disabled: Opacity 30%, cursor not-allowed
- Selected: Background #EA4356, Color white, Font Bold
- Today: Border #3F7BF2 2px

TIME BUTTONS:
- Height: 48px (touch target)
- Padding: 8px 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Font: 13px / Regular / #161616
- Spacing: 8px horizontal, 12px vertical
- Hover: Background #F5F5F5
- Selected: Background #EA4356, Color white
- Limited capacity: Border #EB7005, Background #FEE1C8
- Text: "8:30" OR "⚠️ 15:00" (warning icon)

TIME GROUP HEADER:
- Font: 13px / Medium / #4B4B4B
- Icon: 🕐 clock
- Margin-top: 16px (first), 12px (others)
- Margin-bottom: 8px

RESCHEDULE LINK:
- Color: #EA4356
- Font: 13px / Regular
- Text-decoration: underline on hover

SELECTED DATE DISPLAY:
- Font: 14px / Medium / #161616
- Background: #F5F5F5
- Padding: 8px 12px
- Border-radius: 4px
- Margin: 16px 0
```

---

## 💝 ETAPA 8: UPSELL

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 7
- Fluxo 2 (Para Outro): Etapa 8
- Fluxo 3 (Para Múltiplos): Etapa 9

**Tempo:** 1-2 minutos (opcional)
**Objetivo:** Sugerir exames complementares (não bloqueante)

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 7 de 8     │
├─────────────────────────────────┤
│                                 │
│  💡 SUGESTÕES                   │  ← Seção de upsell
│  Exames que combinam com você   │
│                                 │
│  ┌─────────────────────────────┐│
│  │ ☐ VITAMINA D                ││  ← Checkbox 48px
│  │   Importante p/ imunidade    ││
│  │   +R$ 45,00                 ││
│  │   (100% coberto)            ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ☐ TSH (Tireoide)            ││
│  │   Saúde da glândula         ││
│  │   +R$ 38,00                 ││
│  │   (80% coberto, você paga   ││
│  │    R$ 7,60)                 ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ☐ COLESTEROL (Perfil Lipí)  ││
│  │   Risco cardiovascular       ││
│  │   +R$ 52,00                 ││
│  │   (Particular)              ││
│  └─────────────────────────────┘│
│                                 │
│  💰 Total: R$ 0,00 → R$ 85,00   │  ← Mostrar diferença
│     (se todos selecionados)     │
│                                 │
├─────────────────────────────────┤
│ [Continuar com sugestões]       │
│  ou                             │
│ [Continuar sem adicionar]       │  ← Sempre permitir skip
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
SECTION HEADER: "💡 SUGESTÕES"
SUBTITLE: "Exames que combinam com você"

PER SUGGESTION (card):
- Checkbox + Exam name (bold)
- Short description (benefit)
- Price impact: "+R$ 45,00"
- Coverage: "(100% coberto)" OR "(80% coberto, você paga R$ 7,60)"

PRICE RECAP (if any selected):
- "💰 Total: R$ 0,00 → R$ 85,00"
- "(se todos selecionados)"

BUTTONS:
- Primário: "Continuar com sugestões"
- Secundário: "Continuar sem adicionar" (always visible!)
```

#### Copy Secondary (Estados)

**Messages:**
```
✓ "Vitamina D selecionada (+R$ 45,00)"
✓ "2 exames adicionados"
❌ "Este exame não é coberto por seu convênio"
ℹ️ "Recomendado a cada 2 anos"
✓ "Economize 40% agendando agora!"
```

**Trust messages:**
```
✓ "Não é obrigatório"
✓ "Pode fazer depois também"
ℹ️ "Feito pela mesma equipe no mesmo dia"
```

#### Tone Variations

**Moisés:**
```
"Quer adicionar outros exames?"
"Mais barato agora (junto)"
"Adicionar / Passar"
```

**Miriam:**
```
"Considerados os exames adicionais?"
"Complementam bem o hemograma"
"Adicionar / Pular"
```

**Manoel:**
```
"Sugerimos alguns exames adicionais"
"Otimize sua saúde"
"Adicionar / Continuar"
```

### Specs Técnicas

```
SECTION HEADER:
- Font: 14px / Medium / #161616
- Icon: 💡 bulb
- Margin-bottom: 8px

SUBTITLE:
- Font: 13px / Regular / #4B4B4B
- Margin-bottom: 16px

SUGGESTION CARD:
- Height: 100px+ (content based)
- Padding: 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Margin-bottom: 12px
- Background: white
- Checked: Background #FEF1F2, Border #EA4356

CHECKBOX:
- Size: 24x24px (touch target 48px with padding)
- Color: #EA4356 when checked
- Position: Left align

EXAM NAME:
- Font: 14px / Bold / #161616
- Margin-bottom: 4px

DESCRIPTION:
- Font: 13px / Regular / #4B4B4B
- Margin-bottom: 8px

PRICE:
- Font: 13px / Medium / #161616
- Color: #D83145 (red for additional cost)

COVERAGE:
- Font: 12px / Regular / #4B4B4B
- Margin-top: 4px

PRICE RECAP:
- Font: 14px / Medium / #161616
- Background: #F5F5F5
- Padding: 12px 16px
- Border-radius: 8px
- Margin: 16px 0

BUTTONS:
- Primário: "Continuar com sugestões" (height 48px)
- Secundário: "Continuar sem adicionar" (tertiary style)
- Spacing: 12px between
```

---

---

## ✅ ETAPA 9: REVISÃO

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 8
- Fluxo 2 (Para Outro): Etapa 9
- Fluxo 3 (Para Múltiplos): Etapa 10

**Tempo:** 1 minuto (review apenas)
**Objetivo:** Confirmar todos os dados antes de fechar o agendamento

### Wireframe

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 8 de 8     │
├─────────────────────────────────┤
│                                 │
│  RESUMO DO AGENDAMENTO          │  ← Título
│                                 │
│  EXAME                           │  ← Seção
│  📋 Hemograma Completo           │
│     + Vitamina D                 │  ← Se adicionado no upsell
│     [Editar]                     │  ← Permitir mudança
│                                 │
│  CONVÊNIO                        │  ← Seção
│  💳 Bradesco Saúde               │
│     [Editar]                     │
│                                 │
│  VALORES                         │  ← Seção
│  Hemograma:     R$ 0,00          │
│  Vitamina D:    +R$ 0,00         │
│  ────────────────────────        │
│  Total a pagar: R$ 0,00          │
│                                 │
│  QUANDO                          │  ← Seção
│  📅 Sexta, 28 de novembro        │
│  🕐 8:30 da manhã                │
│     [Editar]                     │
│                                 │
│  ONDE                            │  ← Seção
│  📍 Delboni Sumaré               │
│     Av. Paulista, 2000           │
│     [Editar]                     │
│                                 │
│  PARA QUEM                       │  ← Seção
│  👤 João da Silva                │
│     CPF: 123.456.789-00          │
│     [Editar]                     │
│                                 │
│  RESULTADO                       │  ← Seção
│  📧 joao@email.com               │
│     SMS: (11) 98765-4321         │
│     [Editar]                     │
│                                 │
│  ☑ Confirmo que li os          │  ← Checkbox 48px
│  termos de uso                  │
│                                 │
├─────────────────────────────────┤
│ [Confirmar agendamento]         │
│  ou                             │
│ [Voltar e editar]               │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
TÍTULO: "RESUMO DO AGENDAMENTO"
(ou "Revisão Final" ou "Confirme seus dados")

SECTION HEADERS (cada seção):
- "EXAME"
- "CONVÊNIO"
- "VALORES"
- "QUANDO"
- "ONDE"
- "PARA QUEM"
- "RESULTADO"

EXAM SECTION:
- "📋 Hemograma Completo"
- "+ Vitamina D" (se adicionado)
- "[Editar]" (link)

PRICE SECTION:
- "Hemograma: R$ 0,00"
- "Vitamina D: +R$ 0,00"
- "────────────────────────" (divider)
- "Total a pagar: R$ 0,00"

WHEN SECTION:
- "📅 Sexta, 28 de novembro"
- "🕐 8:30 da manhã"

WHERE SECTION:
- "📍 Delboni Sumaré"
- "Av. Paulista, 2000"

FOR WHOM SECTION:
- "👤 João da Silva"
- "CPF: 123.456.789-00"

RESULT SECTION:
- "📧 joao@email.com"
- "SMS: (11) 98765-4321"

TERMS CHECKBOX:
- "☑ Confirmo que li os termos de uso"
- Link: "termos de uso" (abre modal)

BOTÕES:
- Primário: "Confirmar agendamento"
- Secundário: "Voltar e editar"
```

#### Copy Secondary (Estados)

**Validações:**
```
❌ Termos não aceitos: "Você precisa aceitar os termos para continuar"
✓ Tudo certo: "Tudo pronto! Só falta confirmar"
```

**Info messages:**
```
ℹ️ "Você pode editar qualquer informação"
ℹ️ "Confirmar agora ou revisar depois"
✓ "Resumo será enviado por email/SMS"
```

#### Tone Variations

**Moisés:**
```
"Tá tudo certo aí?"
"Quer mudar algo?"
"Vamo! Confirmar"
```

**Miriam:**
```
"Revise seus dados"
"Algo está diferente?"
"Confirmar agendamento"
```

**Manoel:**
```
"Confirmamos os detalhes?"
"Algo a alterar?"
"Confirmar"
```

### Specs Técnicas

```
TITLE:
- Font: 18px / Bold / #161616
- Margin-bottom: 20px

SECTION HEADER:
- Font: 12px / Medium / #4B4B4B
- Text-transform: uppercase
- Margin-top: 16px
- Margin-bottom: 8px
- Opacity: 0.7

SECTION CONTENT:
- Font: 14px / Regular / #161616
- Line-height: 1.6
- Spacing: 4px between lines

EDIT LINK:
- Font: 13px / Regular / #EA4356
- Text-decoration: underline on hover
- Float: right or new line

DIVIDER:
- Color: #E6E6E6
- Margin: 8px 0
- Border: 1px dashed

TOTAL PRICE:
- Font: 16px / Bold / #161616
- Background: #F5F5F5
- Padding: 8px 12px
- Border-radius: 4px

CHECKBOX (Terms):
- Size: 24x24px
- Touch target: 48px (with padding)
- Color: #EA4356 when checked
- Label font: 13px / Regular / #161616

TERMS LINK:
- Color: #EA4356
- Text-decoration: underline
- Font: 13px / Regular

BUTTONS:
- Primary: 48px height, #EA4356
- Secondary: 48px height, transparent border
- Spacing: 12px between
```

---

## 💳 ETAPA 10: CHECKOUT

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 9
- Fluxo 2 (Para Outro): Etapa 9 (mesma)
- Fluxo 3 (Para Múltiplos): Etapa 11 (+ opções de pagamento)

**Tempo:** 2-3 minutos
**Objetivo:** Processar pagamento (se necessário) ou confirmar

### Wireframe (FLUXO 1/2: Convênio - Sem Pagamento)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 9 de 9     │
├─────────────────────────────────┤
│                                 │
│  ✓ 100% coberto                 │  ← Status verde
│                                 │
│  Seu agendamento foi            │  ← Mensagem principal
│  registrado com sucesso!        │
│                                 │
│  🕐 Confirmação enviada         │  ← Feedback
│  Código: AGD-2025-1234567       │
│                                 │
│  Próximos passos:               │  ← Info
│                                 │
│  1️⃣ Receba confirmação         │  ← Passo 1
│     Por email ou SMS            │
│                                 │
│  2️⃣ Compareça 15min antes      │  ← Passo 2
│     28/11 às 8:15 da manhã     │
│                                 │
│  3️⃣ Leve documento de ID       │  ← Passo 3
│     RG ou CNH                   │
│                                 │
│  ❓ Precisa alterar?            │  ← Help
│  Contato de suporte            │
│                                 │
├─────────────────────────────────┤
│ [Ver agendamento]               │
│  ou                             │
│ [Agendar outro]                 │  ← Fluxo alternativo
└─────────────────────────────────┘
```

### Wireframe (FLUXO 3: Múltiplos - Com Opções de Pagamento)

```
┌─────────────────────────────────┐
│ 🔙 Voltar      Etapa 11 de 11   │
├─────────────────────────────────┤
│                                 │
│  FORMAS DE PAGAMENTO            │  ← Título
│  Total para 2 pessoas:          │
│  João: R$ 0,00 | Maria: R$ 45   │
│                                 │
│  ☐ Eu pago tudo agora           │  ← Opção 1
│    Débito / Crédito             │
│    Total: R$ 45,00              │
│                                 │
│  ☐ Cada um paga depois          │  ← Opção 2
│    Você paga para João na       │
│    clínica                      │
│    Maria paga no dia            │
│                                 │
│  ☐ Dividir entre a gente        │  ← Opção 3
│    João paga R$ 22,50           │
│    Maria paga R$ 22,50          │
│    (2 cobranças no seu cartão)  │
│                                 │
│  📱 Débito/Crédito             │  ← Se opção 1
│    [Número do cartão]           │
│    [Vencimento] [CVV]           │
│                                 │
├─────────────────────────────────┤
│ [Confirmar agendamento]         │
│  ou                             │
│ [Mudar forma de pagamento]      │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary (Convênio - Sem Pagamento)

```
STATUS: "✓ 100% coberto"

MAIN MESSAGE: "Seu agendamento foi registrado com sucesso!"

CONFIRMATION: "🕐 Confirmação enviada"
             "Código: AGD-2025-1234567"

NEXT STEPS:
"1️⃣ Receba confirmação
    Por email ou SMS

2️⃣ Compareça 15min antes
    28/11 às 8:15 da manhã

3️⃣ Leve documento de ID
    RG ou CNH"

HELP SECTION: "❓ Precisa alterar? Contato de suporte"
(link to support)

BUTTONS:
- Primário: "Ver agendamento"
- Secundário: "Agendar outro"
```

#### Copy Primary (Múltiplos - Com Pagamento)

```
TITLE: "FORMAS DE PAGAMENTO"
SUBTITLE: "Total para 2 pessoas:"
          "João: R$ 0,00 | Maria: R$ 45,00"

PAYMENT OPTIONS (radios):
1. "Eu pago tudo agora"
   "Débito / Crédito"
   "Total: R$ 45,00"

2. "Cada um paga depois"
   "Você paga para João na clínica"
   "Maria paga no dia"

3. "Dividir entre a gente"
   "João paga R$ 22,50"
   "Maria paga R$ 22,50"
   "(2 cobranças no seu cartão)"

CARD FIELDS (if option 1):
- "Número do cartão" (input 16 digits)
- "Vencimento" (MM/AA) + "CVV" (3 digits)

BUTTONS:
- Primário: "Confirmar agendamento"
- Secundário: "Mudar forma de pagamento"
```

#### Copy Secondary (Estados)

**Convênio:**
```
✓ "Agendamento confirmado!"
✓ "Código AGD-2025-1234567"
ℹ️ "Confirmação será enviada em 2 min"
✓ "Tudo pronto para seu agendamento"
```

**Múltiplos + Pagamento:**
```
❌ "Nenhuma forma selecionada"
✓ "Cartão adicionado"
❌ "Cartão inválido"
✓ "Pagamento processado"
ℹ️ "2 cobranças serão feitas"
```

#### Tone Variations

**Moisés:**
```
"Pronto! Agendamento feito"
"Fica de olho no SMS"
"Bora lá então"
```

**Miriam:**
```
"Seu agendamento foi confirmado"
"Enviaremos por email"
"Agendar outro / Ver detalhes"
```

**Manoel:**
```
"Agendamento realizado com sucesso"
"Confirmação pelo seu email"
"Prosseguir"
```

### Specs Técnicas

```
STATUS MESSAGE:
- Font: 18px / Bold / #32A454 (if success)
- Icon: ✓ checkmark green
- Background: #E8F8EC (green-160)
- Padding: 12px 16px
- Border-radius: 8px
- Margin-bottom: 20px

MAIN MESSAGE:
- Font: 16px / Medium / #161616
- Margin-bottom: 12px

CONFIRMATION SECTION:
- Font: 14px / Regular / #4B4B4B
- Icon: 🕐 clock
- Code: 14px / Bold / #161616 (copy to clipboard)
- Margin: 16px 0

NEXT STEPS:
- Container: Border-left 3px #EA4356
- Padding: 16px
- Background: #FEF1F2
- Font: 13px / Regular / #161616
- Numbers: Emoji (1️⃣, 2️⃣, 3️⃣)
- Line-height: 1.8

PAYMENT OPTION (Radio):
- Height: 80px+ (content based)
- Padding: 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Margin-bottom: 12px
- Selected: Border #EA4356, Background #FEF1F2

CARD INPUT:
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid #E6E6E6
- Border-radius: 8px
- Focus: Border #EA4356
- Font: 16px (letter-spacing for card number)

CARD LAYOUT:
- Row 1: Number field (full width, 44px)
- Row 2: Expiration (50% left) + CVV (50% right), 44px
- Spacing: 12px between fields
```

---

## 🎉 ETAPA 11: CONFIRMAÇÃO

**Fluxo:**
- Fluxo 1 (Para Mim): Etapa 10
- Fluxo 2 (Para Outro): Etapa 10 (mesma)
- Fluxo 3 (Para Múltiplos): Etapa 12 (final)

**Tempo:** Instantânea (confirmação final)
**Objetivo:** Celebrar, confirmar e oferecer próximos passos

### Wireframe

```
┌─────────────────────────────────┐
│                                 │
│          🎉 SUCESSO! 🎉         │  ← Grande celebração
│                                 │
│      Seu agendamento foi        │
│    confirmado com sucesso!      │
│                                 │
│                                 │
│  ✓ Hemograma Completo          │  ← Quick recap
│  ✓ Bradesco Saúde              │
│  ✓ 28/11 às 8:30               │
│  ✓ Delboni Sumaré              │
│                                 │
│  CÓDIGO: AGD-2025-1234567       │  ← Código único (copiável)
│                                 │
│                                 │
│  Enviamos uma confirmação para: │  ← Info enviada
│  📧 joao@email.com              │
│  📱 (11) 98765-4321             │
│                                 │
│                                 │
│  Dúvidas?                       │  ← FAQ rápido
│  ❓ Como chegar                 │  ← Botão terciário
│  ❓ Qual documento levar        │
│  ❓ Preciso estar em jejum?     │
│  ❓ Falar com suporte           │
│                                 │
│                                 │
├─────────────────────────────────┤
│ [Voltar ao início]              │
│  ou                             │
│ [Agendar outro exame]           │
│  ou                             │
│ [Copiar código]                 │
└─────────────────────────────────┘
```

### Copy Integrada

#### Copy Primary
```
CELEBRATION:
"🎉 SUCESSO! 🎉"
"Seu agendamento foi confirmado com sucesso!"

QUICK RECAP (order):
"✓ Hemograma Completo"
"✓ Bradesco Saúde"
"✓ 28/11 às 8:30"
"✓ Delboni Sumaré"

CONFIRMATION CODE:
"CÓDIGO: AGD-2025-1234567"
"[Copiar]" (button to copy to clipboard)

SEND CONFIRMATION:
"Enviamos uma confirmação para:"
"📧 joao@email.com"
"📱 (11) 98765-4321"

FAQ SECTION:
"Dúvidas?"
"❓ Como chegar"
"❓ Qual documento levar"
"❓ Preciso estar em jejum?"
"❓ Falar com suporte"

BUTTONS:
- Primário: "Voltar ao início"
- Secundário: "Agendar outro exame"
- Terciário: "Copiar código"
```

#### Copy Secondary (Estados)

**Confirmations:**
```
✓ "Confirmação enviada!"
✓ "Código copiado para a área de transferência"
✓ "Você receberá um SMS em breve"
ℹ️ "Salve o código: AGD-2025-1234567"
```

**Helpful messages:**
```
ℹ️ "Você pode compartilhar o código com família"
ℹ️ "Alterar agendamento até 24h antes"
✓ "Tudo pronto para seu agendamento!"
```

#### Tone Variations

**Moisés:**
```
"Isso! Agendamento marcado"
"Tudo pronto pra você"
"Bora agendar outro?"
```

**Miriam:**
```
"Perfeito! Seu agendamento está confirmado"
"Você receberá lembretes"
"Agendar outro / Voltar"
```

**Manoel:**
```
"Agendamento realizado com êxito"
"Todos os detalhes por email"
"Finalizar"
```

### Specs Técnicas

```
CELEBRATION SECTION:
- Background: Linear gradient #FEF1F2 to white
- Text-align: center
- Padding: 40px 16px 32px

CELEBRATION TEXT:
- "🎉 SUCESSO! 🎉"
  Font: 32px / Bold / #EA4356
- Main message
  Font: 18px / Regular / #161616
  Margin-top: 16px

QUICK RECAP:
- Container: #F5F5F5 / Border-radius 8px / Padding 16px
- Items: Font 14px / Regular / #161616
- Checkmark: ✓ green #32A454
- Spacing: 8px between items
- Margin: 24px 0

CODE SECTION:
- Font: 14px / Regular / #4B4B4B (label)
- Code: 16px / Bold / #161616 (monospace)
- Background: #F5F5F5
- Padding: 16px
- Border-radius: 8px
- Copy button: Inline (right align)
- Font: 12px / Regular / #EA4356

CONFIRMATION SEND:
- Font: 13px / Regular / #4B4B4B (label)
- Channels: 14px / Regular / #161616
- Icons: 📧 📱
- Margin: 20px 0

FAQ SECTION:
- Header: "Dúvidas?" 14px / Medium / #161616
- Items: Font 13px / Regular / #EA4356 (links)
- All items as links/buttons
- Line-height: 1.8
- Margin: 20px 0

BUTTONS:
- Primary: 48px height
- Secondary: 48px height
- Tertiary: 48px height (copy button variant)
- Spacing: 12px between
- All buttons full-width
```

---

## 📌 PADRÕES REUTILIZÁVEIS

### Componentes Globais

#### Botão Primário
```
Height: 48px
Padding: 0 24px
Background: #EA4356
Color: #FEFEFE
Border: none
Border-radius: 8px
Font: 16px / Semibold
Touch target: 48x48px
Hover: Background #F55C6E
Active: Background #D83145
Disabled: Opacity 50%
Width: 100% (full-width mobile)
```

#### Botão Secundário
```
Height: 48px
Padding: 0 24px
Background: transparent
Border: 1px solid #EA4356
Color: #EA4356
Border-radius: 8px
Font: 16px / Regular
Touch target: 48x48px
Hover: Background #FEF1F2
```

#### Botão Terciário
```
Height: auto
Padding: 0
Background: transparent
Border: none
Color: #EA4356
Font: 13-14px / Regular
Text-decoration: underline on hover
No width constraint
```

#### Input Field
```
Height: 44px
Padding: 12px 16px
Border: 1px solid #E6E6E6
Border-radius: 8px
Font: 16px / Regular / #161616
Placeholder: #A1A1A1
Focus: Border #EA4356 + shadow
Focus shadow: 0 0 0 3px rgba(234,67,86,0.1)
```

#### Label
```
Font: 14px / Medium / #161616
Margin-bottom: 8px
Display: block
Always above field
Never as placeholder
```

#### Error Message
```
Font: 12px / Regular / #D83145
Margin-top: 4px
Margin-bottom: 12px
Icon: ❌ (optional)
Position: Below field
```

#### Success Message
```
Font: 12px / Regular / #32A454
Margin-top: 4px
Margin-bottom: 12px
Icon: ✓ (optional)
Position: Below field
```

---

## 🎯 PRÓXIMAS ETAPAS

Este documento contém as 11 etapas principais com:
- ✅ Wireframes ASCII (estrutura mobile)
- ✅ Copy integrada (títulos, labels, CTAs, mensagens)
- ✅ States documentados (empty, loading, error, success)
- ✅ Tone variations (Moisés, Miriam, Manoel)
- ✅ Specs técnicas (cores, tipografia, spacing, touch targets)

### Próximos documentos:
1. **`dasa-agendamento-copy-completa.md`** - Copy estruturada + Componentes reutilizáveis
2. **`dasa-agendamento-spec-tecnica.md`** - Design tokens + Checklist de implementação

**Status:** ✅ Documento 1 Completo

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Publicado

