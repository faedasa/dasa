# 📦 Bundles e Pacotes de Exames + Vacinas - DASA

> **Versão:** 1.0 | **Data:** 2025-11-28 | **Tags:** #product #strategy #bundles #upselling | **Status:** ✅ Aprovado

---

## 🎯 Objetivo do Documento

Definir estratégia de bundles/pacotes de exames e vacinas para a plataforma DASA Nav360, integrando:
- ✅ 8 bundles temáticos alinhados ao padrão de mercado
- ✅ Exames + vacinas complementares
- ✅ Segmentação por personas (Moisés, Miriam, Manoel)
- ✅ Integração com 23 cards da homepage
- ✅ Posicionamento na etapa 7 do fluxo de agendamento (UPSELL INTELIGENTE)

**Escopo:** Estratégia comercial + implementação no fluxo (não inclui specs de design/código)

---

## 📊 Seção 1: Conceito & Estratégia

### Por Que Bundles?

**Problema:** Pacientes compram exames individuais → compra desconexa, menor AOV, menor conveniência

**Solução:** Bundles pré-montados por objetivo de saúde → aumentar AOV, conversão, relevância

**Benefícios:**
- ✅ **Para o Paciente:** Economia (15-30% desconto), conveniência, menos decisões
- ✅ **Para a DASA:** Aumentar AOV (+15-20% estimado), conversão (upsell não-bloqueante), retenção
- ✅ **Para a Saúde:** Exames complementares = diagnóstico mais assertivo

### Padrão de Mercado (Benchmarks)

**Laboratórios Analisados:**
1. **Labi Exames:** 20 bundles temáticos (Check-up, Mulher, Homem, Gestante, etc.) → 15-25% desconto
2. **Laboratório a+:** 15 pacotes (inclui vacinas) → 20-30% desconto
3. **Ultralab:** 12 combos por idade/gênero → 18-28% desconto

**Padrão Identificado:**
- Média 12-20 bundles por plataforma
- Desconto de 15-30% (ponderado: ~22% em média)
- Vacinas sempre como itens complementares
- Segmentação por: idade, gênero, condição (gestante, diabético, etc)

### Integração Exames + Vacinas (Conforme KB DASA)

**Modelo Recomendado:**

```
Bundle = [Exames Base] + [Exames Específicos] + [Vacinas Opcionais]

Exemplo:
Check-up Geral =
  ├─ Base: Hemograma, Glicemia, Perfil Lipídico, TSH, Creatinina, Urina
  ├─ Específico: (por persona: Vitamina D, etc)
  └─ Opcional: Gripe (+R$ 0 com desconto bundle)
```

**Razão:** Flexibilidade de escolha + maior conversão (não força vacina se não quer)

### Segmentação por Persona

#### 🎯 Moisés (34, Standard) - O Malabarista
- **Job:** Agendar exames atrasados sem perder tempo/dinheiro
- **Bundle Alvo:** Check-up Geral (economia, rapidez)
- **Mensagem:** "Resuelve tudo em um só lugar por menos"
- **Vacina:** Gripe (prevenção contra falta tempo)

#### 🎯 Miriam (28, Executivo) - Profissional em Ascensão
- **Job:** Cuidar da saúde sem culpa, de forma integrada
- **Bundle Alvo:** Saúde da Mulher (ginecológico)
- **Mensagem:** "Acompanhamento completo + lembretes automáticos"
- **Vacina:** HPV (se aplicável), COVID (atualização)

#### 🎯 Manoel (62, Premium) - Executivo Resistente
- **Job:** Prevenir futuro sem mudar estilo de vida
- **Bundle Alvo:** Check-up Preventivo Completo (completo, consolidado)
- **Mensagem:** "Tudo num só dia, com equipe dedicada"
- **Vacina:** Gripe + COVID (prevenção age-appropriate)

---

## 📋 Seção 2: 8 Bundles Definidos

### 1️⃣ Check-up Geral/Básico (Base Universal)

**Faixa Etária:** 18+ (recomendado a partir de 20 anos)
**Desconto:** 25% vs compra individual
**Duração estimada:** 30-40 minutos

**Exames Inclusos:**
- Hemograma Completo (avalia inflamação, infecção, anemia)
- Glicemia de Jejum (diabetes screening)
- Perfil Lipídico (colesterol, triglicerídeos → saúde cardiovascular)
- TSH (função tireóide)
- Creatinina + Uréia (função renal)
- Exame de Urina (infecção, função renal)

**Vacina Complementar (Opcional):**
- Influenza (Gripe) → 0 reais com desconto bundle | R$ 45 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 380
- Com bundle: ~R$ 285 (25% economia = R$ 95)
- + Vacina: +R$ 0 (inclusa no desconto)

**Personas Alvo:** Moisés (principal), Miriam (complemento)
**Momento:** Renovação anual de saúde

---

### 2️⃣ Saúde da Mulher (25+)

**Faixa Etária:** 25-50 anos
**Desconto:** 28% vs compra individual
**Duração estimada:** 45-60 minutos

**Exames Inclusos:**
- **Base:** Check-up Geral (6 exames acima)
- **Específico:**
  - Papanicolau (screening cervical, HPV)
  - Ultrassom Pélvico (ovário, útero, endométrio)
  - Vitamina D (importante para mulheres)

**Vacinas Complementares (Opcional):**
- HPV (se < 50 anos) → R$ 0 com desconto | R$ 180 separado
- Gripe → R$ 0 com desconto | R$ 45 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 520
- Com bundle: ~R$ 375 (28% economia = R$ 145)
- + Vacinas: +R$ 0 (ambas inclusas no desconto)

**Personas Alvo:** Miriam (principal), qualquer mulher 25+
**Momento:** Anual (recomendado), pós-menstruação

---

### 3️⃣ Saúde do Homem (40+)

**Faixa Etária:** 40-70 anos
**Desconto:** 26% vs compra individual
**Duração estimada:** 45-50 minutos

**Exames Inclusos:**
- **Base:** Check-up Geral (6 exames)
- **Específico:**
  - PSA Total + PSA Livre (screening prostático)
  - Ácido Úrico (gota, saúde urinária)
  - Vitamina D (importante em homens >40)

**Vacinas Complementares (Opcional):**
- COVID-19 (atualização anual) → R$ 0 com desconto | R$ 60 separado
- Gripe → R$ 0 com desconto | R$ 45 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 480
- Com bundle: ~R$ 355 (26% economia = R$ 125)
- + Vacinas: +R$ 0 (ambas inclusas no desconto)

**Personas Alvo:** Manoel (principal), qualquer homem 40+
**Momento:** Anual (recomendado), alinhado com histórico familiar

---

### 4️⃣ Check-up Preventivo Completo (50+)

**Faixa Etária:** 50+ anos
**Desconto:** 30% vs compra individual
**Duração estimada:** 60-90 minutos (consolidado em 2-3 visitas)

**Exames Inclusos:**
- **Base:** Check-up Geral (6 exames)
- **Gênero-Específico:**
  - Mulher: Mamografia (breast cancer screening) + Papanicolau
  - Homem: PSA Total + PSA Livre
- **Complementar:**
  - Vitamina D + Vitamina B12 (importante para idade)
  - Teste HIV (opcional, screening anual)
  - Teste Hepatite B/C (screening)

**Vacinas Complementares (Opcional):**
- Gripe → R$ 0 com desconto | R$ 45 separado
- COVID-19 (atualização) → R$ 0 com desconto | R$ 60 separado
- Pneumococo (se indicado) → R$ 0 com desconto | R$ 120 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 680
- Com bundle: ~R$ 475 (30% economia = R$ 205)
- + Vacinas: +R$ 0 (todas inclusas no desconto)

**Personas Alvo:** Manoel (premium), qualquer 50+
**Momento:** Anual, consolidado em dia único (concierge)

---

### 5️⃣ Check-up Jovem (18-30)

**Faixa Etária:** 18-30 anos
**Desconto:** 20% vs compra individual
**Duração estimada:** 25-35 minutos

**Exames Inclusos:**
- Hemograma (anemia, infecção)
- Glicemia (diabetes prevention awareness)
- Perfil Lipídico (colesterol baseline)
- Exame de Urina (infecção)
- Teste HIV (awareness, screening)

**Vacinas Complementares (Opcional):**
- COVID-19 (reforço ou dose atrasada) → R$ 0 com desconto | R$ 60 separado
- Gripe → R$ 0 com desconto | R$ 45 separado
- Hepatite A/B (se não vacinado) → R$ 0 com desconto | R$ 150 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 310
- Com bundle: ~R$ 248 (20% economia = R$ 62)
- + Vacinas: +R$ 0 (inclusas no desconto)

**Personas Alvo:** Miriam (aplicável), qualquer jovem 18-30
**Momento:** Anual, awareness de saúde preventiva

---

### 6️⃣ Check-up para Diabético (Específico)

**Faixa Etária:** Qualquer idade (condição: diabético diagnosticado)
**Desconto:** 22% vs compra individual
**Duração estimada:** 40-50 minutos

**Exames Inclusos:**
- Hemoglobina Glicada (HbA1c) → controle glicêmico últimos 3 meses
- Glicemia de Jejum (daily control)
- Perfil Lipídico (risco cardiovascular)
- Função Renal (Creatinina, Uréia) → complicação renal
- Urina com Microalbuminúria (early kidney damage detection)
- TSH (importante em diabéticos)

**Vacinas Complementares (Opcional):**
- Gripe (essencial para diabéticos) → R$ 0 com desconto | R$ 45 separado
- Pneumococo (se não vacinado) → R$ 0 com desconto | R$ 120 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 420
- Com bundle: ~R$ 328 (22% economia = R$ 92)
- + Vacinas: +R$ 0 (inclusas no desconto)

**Personas Alvo:** Moisés (se diabético), qualquer diabético
**Momento:** A cada 3 meses (controle) ou conforme prescrição

---

### 7️⃣ Check-up Cardiovascular (Prevenção)

**Faixa Etária:** 35+ (risco) | 40+ (rotina)
**Desconto:** 24% vs compra individual
**Duração estimada:** 50-60 minutos

**Exames Inclusos:**
- Colesterol Fracionado (HDL, LDL, VLDL)
- Triglicerídeos (risco cardiovascular)
- Glicemia de Jejum (diabetes risk)
- Creatinina (função renal)
- Ácido Úrico (gota, risco CV)
- Homocisteína (novo marcador risco)
- ECG em Repouso (opcional, conforme médico)

**Vacinas Complementares (Opcional):**
- Gripe (importante para cardíacos) → R$ 0 com desconto | R$ 45 separado
- COVID-19 (atualização) → R$ 0 com desconto | R$ 60 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 480
- Com bundle: ~R$ 365 (24% economia = R$ 115)
- + Vacinas: +R$ 0 (inclusas no desconto)

**Personas Alvo:** Manoel (execução), qualquer com histórico familiar
**Momento:** Anual ou conforme prescrição

---

### 8️⃣ Gestante Bundle (Pré-natal)

**Faixa Etária:** Gestantes (qualquer trimestre)
**Desconto:** 20% vs compra individual
**Duração estimada:** 60-90 minutos (consolidável)

**Exames Inclusos:**
- Hemograma (anemia pregnancy, infecção)
- Tipagem Sanguínea + Rh (incompatibilidade)
- Teste HIV (obrigatório, screening)
- Teste Sífilis (treponema pallidum)
- Teste Hepatite A/B/C (screening)
- Glicemia de Jejum (diabetes gestacional)
- Exame de Urina (infecção, proteinúria)
- Ultrassom Obstétrico (conforme trimestre)

**Vacinas Complementares (Opcional):**
- Gripe (seguro em gestação) → R$ 0 com desconto | R$ 45 separado
- Tdap (atualização coqueluche) → R$ 0 com desconto | R$ 70 separado

**Preço Estimado:**
- Exames avulsos: ~R$ 580
- Com bundle: ~R$ 464 (20% economia = R$ 116)
- + Vacinas: +R$ 0 (inclusas no desconto)

**Personas Alvo:** Mulheres gestantes (Miriam, qualquer idade)
**Momento:** Conforme protocolo pré-natal (T1, T2, T3)

---

## 🔗 Seção 3: Integração com Homepage

### Mapeamento: 23 Cards → 8 Bundles

**Homepage tem 7 categorias:**
1. Exames Gerais (10 cards)
2. Saúde Cardiovascular (3 cards)
3. Saúde da Mulher (4 cards)
4. Saúde do Homem (2 cards)
5. Diabetes (2 cards)
6. Gestação (1 card)
7. Vacinas (1 card)

**Mapeamento para Bundles:**

| Bundle | Cards Mapeados | Categoria(s) Origem |
|--------|----------------|---------------------|
| **Check-up Geral** | Hemograma, Glicemia, Colesterol, TSH, Creatinina, Urina | Exames Gerais |
| **Saúde da Mulher** | Papanicolau, Ultrassom Pélvico, Vitamina D, HPV Vaccine | Saúde da Mulher + Vacinas |
| **Saúde do Homem** | PSA, Ácido Úrico, Vitamina D, COVID Vaccine | Saúde do Homem + Vacinas |
| **Preventivo 50+** | Mamografia, PSA, Vitamina B12, Hepatite Test | Saúde Mulher + Homem + Exames |
| **Check-up Jovem** | Hemograma, Glicemia, Colesterol, Urina, HIV Test | Exames Gerais |
| **Diabético** | HbA1c, Glicemia, Perfil Lipídico, Creatinina, Urina | Diabetes + Exames Gerais |
| **Cardiovascular** | Colesterol Fracionado, Triglicerídeos, Glicemia, ECG | Saúde Cardiovascular + Exames |
| **Gestante** | Hemograma, Tipagem, Teste Infecciosas, USG Obstétrico | Gestação + Exames |

### Cross-Sell Inteligente (A→B Recommendations)

**Regra de Recomendação:**

```
SE paciente seleciona [Exame A]
ENTÃO sugerir bundle [B] com mensagem personalizada

Exemplos:

1. SE seleciona [Hemograma]
   ENTÃO sugerir [Check-up Geral]
   MSG: "Pacientes que fazem Hemograma também fazem exames de açúcar, colesterol e tireoide"

2. SE seleciona [Papanicolau]
   ENTÃO sugerir [Saúde da Mulher]
   MSG: "Proteja sua saúde: agora incluímos ultrassom e vitamina D"

3. SE seleciona [PSA]
   ENTÃO sugerir [Saúde do Homem]
   MSG: "Saúde completa: PSA + preventivo + vitamina D"

4. SE paciente idade >= 50
   ENTÃO sugerir [Preventivo 50+]
   MSG: "Aos 50+, faça check-up consolidado: economize 30%"

5. SE paciente está gestante
   ENTÃO sugerir [Gestante Bundle]
   MSG: "Saúde da mãe e bebê: testes + ultrassom em um pacote"
```

### Posicionamento na Jornada

**Fluxo Agendamento (3 Fluxos):**

1. **Fluxo "Para Mim Mesmo":**
   - Etapa 1: Seleciona exame/vacina individual
   - Etapa 7: **UPSELL → "Que tal um check-up completo?"**
   - Etapa 8: Opcionalmente, remover exame individual + trocar por bundle

2. **Fluxo "Para Outra Pessoa":**
   - Similar, mas com dados da pessoa + idade/gênero pré-validados
   - Sugestão automática de bundle adequado para faixa etária

3. **Fluxo "Múltiplas Pessoas":**
   - Cada pessoa recebe sugestão de bundle personalizado
   - Consolidar valor final = soma bundles + desconto global

**Mensagens de Upsell (Etapa 7):**

```
[Título]
Pacientes que fazem [EXAME] também fazem:

[Bundle Sugerido]
✓ [Exame 1]
✓ [Exame 2]
✓ [Exame 3]
+ Vacina [optional]

💰 Economize [R$ XXX] com este pacote

[CTA Primária: Agendar pacote]
[CTA Secundária: Continuar sem adicionar]
```

---

## 💼 Seção 4: Estratégia Comercial

### Preço e Desconto

**Estrutura de Preços:**

| Bundle | Exames Valor Individual | % Desconto | Preço Bundle | Economia |
|--------|------------------------|------------|--------------|----------|
| Check-up Geral | R$ 380 | 25% | R$ 285 | R$ 95 |
| Saúde da Mulher | R$ 520 | 28% | R$ 375 | R$ 145 |
| Saúde do Homem | R$ 480 | 26% | R$ 355 | R$ 125 |
| Preventivo 50+ | R$ 680 | 30% | R$ 475 | R$ 205 |
| Check-up Jovem | R$ 310 | 20% | R$ 248 | R$ 62 |
| Diabético | R$ 420 | 22% | R$ 328 | R$ 92 |
| Cardiovascular | R$ 480 | 24% | R$ 365 | R$ 115 |
| Gestante | R$ 580 | 20% | R$ 464 | R$ 116 |

**Desconto Médio:** 24% (alinhado com mercado: 22% a+, 25% Labi)

**Validação Necessária:** ⚠️ Apresentar estes preços para pricing team ANTES de implementação

### Comunicação e Copy

**Princípios (Seguindo copy-rules.md):**

✅ **Infinitivo em botões:**
- "Agendar pacote"
- "Adicionar check-up"
- "Economizar com bundle"

✅ **Pessoa/Paciente (nunca "usuário"):**
- "Para você e sua família"
- "Pacientes que fazem X também fazem Y"
- "Cuide da saúde do seu corpo"

✅ **Sem ponto final em CTAs:**
- "Agendar pacote" ✅
- "Agendar pacote." ❌

✅ **Ênfase em benefício:**
- Saúde: "Diagnóstico mais assertivo"
- Economia: "Economize R$ 95"
- Conveniência: "Resolva tudo em um lugar"

**Exemplos de Copy Validados:**

```
PARA MOISÉS (economista):
Headline: "Cuide da saúde por menos"
Body: "Hemograma + Glicemia + Colesterol + mais. Economize R$ 95"
CTA: "Agendar check-up"

PARA MIRIAM (automatizadora):
Headline: "Saúde integrada, sem culpa"
Body: "Tudo alinhado com sua rotina. + lembretes automáticos"
CTA: "Agendar saúde da mulher"

PARA MANOEL (executor):
Headline: "Prevenção completa em um dia"
Body: "Consolidado em uma única visita com equipe dedicada"
CTA: "Agendar preventivo completo"
```

### Timing: Etapa 7 (UPSELL INTELIGENTE)

**Onde aparece no fluxo:**

```
Fluxo Agendamento v2.0:

Etapa 1: O que você precisa?
   → Seleciona [Hemograma]

Etapa 2-6: Convênio, preço, unidade, data/hora, dados pessoais

ETAPA 7: 🎯 UPSELL INTELIGENTE
   → Mostra: "Pacientes que fazem Hemograma também fazem..."
   → Sugere: [Check-up Geral Bundle]
   → Opções: [Agendar pacote] [Continuar com Hemograma]

Etapa 8: Confirmar dados
   → Resumo com total (pacote + desconto)

Etapa 9: Confirmação
   → Sucesso com próximos passos
```

**Características da Etapa 7:**

- ✅ **Não-bloqueante:** Paciente sempre consegue continuar
- ✅ **Contextual:** Recomendação baseada no que selecionou
- ✅ **Valor claro:** Mostra economia em destaque
- ✅ **Mobile-first:** Toque fácil em 44px+ buttons
- ✅ **Sugestão viva:** Se idade >= 50, sugere Preventivo

### Segmentação

**Por Persona:**
- Moisés → Check-up Geral (rapidez + economia)
- Miriam → Saúde da Mulher (integrado + automação)
- Manoel → Preventivo 50+ (completo + consolidado)

**Por Idade:**
- 18-30 → Check-up Jovem
- 25-50 (F) → Saúde da Mulher
- 40-70 (M) → Saúde do Homem
- 50+ → Preventivo 50+

**Por Condição:**
- Diabético → Check-up Diabético
- Risco cardiovascular → Cardiovascular
- Gestante → Gestante Bundle

**Por Histórico:**
- Já fez exames individuais → Sugerir bundle equivalente na próxima compra
- Nunca fez preventivo → Sugerir Check-up Geral como primeiro passo

---

## 📍 Seção 5: Implementação no Fluxo

### Integração com Etapa 7 (UPSELL INTELIGENTE)

**Posicionamento:** Após seleção de exames, antes de confirmar agendamento (não bloqueante)

**Fluxo:**
```
Etapa 6: Confirmar dados do convênio
    ↓
Etapa 7: [💡 UPSELL INTELIGENTE - Bundles/Vacinas Opcionais]
    ↓
Etapa 8: Confirmar agendamento (CTA Primária: "Agendar Exames")
```

### Exemplos de Mensagens de Upsell (Não-Bloqueante)

#### Exemplo 1: Paciente com Hemograma (Persona: Moisés)

**Contexto:** Paciente agendou "Hemograma Completo"
**Persona:** Standard (34, entrepreneur)
**Mensagem:**

```
💡 Sugestão Inteligente

Pacientes que fazem Hemograma também fazem Check-up Geral
Ganhe 25% de desconto e resolva tudo de uma vez

Check-up Geral:
✅ Hemograma Completo (já selecionado)
✅ Glicemia de Jejum
✅ Perfil Lipídico
✅ TSH
✅ Creatinina + Uréia
✅ Exame de Urina
💉 Vacina Gripe (opcional - +R$ 0)

De R$ 380 → R$ 285 (Você economiza R$ 95)
⏱️ Duração total: 35-40 min
🍽️ Jejum: 8h recomendado

[Adicionar Check-up Geral] [Continuar sem adicionar]
```

#### Exemplo 2: Paciente com Papa (Persona: Miriam)

**Contexto:** Paciente agendou "Papanicolau"
**Persona:** Executivo (28, lawyer)
**Mensagem:**

```
💡 Sugestão Inteligente

Complemente seu cuidado com a Saúde da Mulher
Acompanhamento integral + 28% de desconto

Saúde da Mulher (Completo):
✅ Papanicolau (já selecionado)
✅ Check-up Geral (Hemograma, Glicemia, Lipídico, TSH, Rins, Urina)
✅ Ultrassom Pélvico
✅ Vitamina D
💉 Vacina HPV (se <50 anos, opcional)

De R$ 520 → R$ 375 (Você economiza R$ 145)
⏱️ Duração total: 50-60 min
📋 Lembretes automáticos para próximas revisões

[Adicionar Saúde da Mulher] [Continuar sem adicionar]
```

#### Exemplo 3: Paciente com PSA (Persona: Manoel)

**Contexto:** Paciente agendou "PSA Total e Livre"
**Persona:** Premium (62, director)
**Mensagem:**

```
💡 Sugestão Premium

Prevenção Cardiovascular + Saúde da Próstata
Protocolo executivo com 26% de desconto

Saúde do Homem (Executivo):
✅ PSA Total e Livre (já selecionado)
✅ Check-up Geral (Hemograma, Glicemia, Lipídico, TSH, Rins, Urina)
✅ Ácido Úrico (importante para hipertensão)
✅ Vitamina D
💉 Vacina COVID-19 (reforço - opcional)

De R$ 480 → R$ 355 (Você economiza R$ 125)
✨ Atendimento dedicado + Relatório executivo
🚀 Disponibilidade noturna e finais de semana

[Adicionar Saúde do Homem] [Continuar sem adicionar]
```

### Validações por Bundle

**Regra 1: Age-Gate**
```
IF paciente.idade < 18 THEN
  ocultar bundles: Saúde Mulher (< 25), Saúde Homem (< 40), Gestante (< 18)
  mostrar apenas: Check-up Jovem

IF paciente.idade >= 50 THEN
  sugerir primeiro: Check-up Preventivo Completo
  depois: Saúde Mulher/Homem
```

**Regra 2: Gender-Specific**
```
IF paciente.genero == "feminino" THEN
  sugerir bundles: Saúde Mulher, Gestante (se aplicável)
  ocultar: Saúde Homem

IF paciente.genero == "masculino" THEN
  sugerir bundles: Saúde Homem
  ocultar: Saúde Mulher, Gestante
```

**Regra 3: History-Based**
```
IF paciente.historico inclui "diagnóstico de diabetes" THEN
  sugerir primeiro: Check-up Diabético
  desabilitar: Gestante Bundle

IF paciente.historico inclui "colesterol alto" THEN
  sugerir primeiro: Check-up Cardiovascular
  incluir vacina: COVID-19 (recomendado)
```

**Regra 4: Confidência de Recomendação**
```
IF bundle_match_score >= 0.90 THEN
  mostrar com destaque ("Recomendado para você")

ELSE IF 0.70 <= bundle_match_score < 0.90 THEN
  mostrar normal ("Pacientes similares também fazem")

ELSE IF bundle_match_score < 0.70 THEN
  não mostrar este bundle (evitar spam)
```

**Regra 5: Vacinas Opcionais**
```
IF vacina.estatus == "fora de data" THEN
  incluir na sugestão com ênfase: "Sua vacina está vencida"

ELSE IF vacina.estatus == "proxima vencimento" (< 30 dias) THEN
  incluir na sugestão: "Aproveite para renovar"

ELSE IF vacina.estatus == "em dia" THEN
  oferecer como complemento: "Também recomendado"
```

### Regras de Negócio por Bundle

**Check-up Geral:**
- ✅ Bloqueio nenhum (universal)
- ✅ Desconto fixo: 25%
- ✅ Jejum: 8h recomendado
- ✅ Duração: 30-40 min
- ✅ Resultado: 5-7 dias úteis

**Saúde da Mulher:**
- ✅ Somente para gênero feminino
- ✅ Idade mínima recomendada: 25 anos
- ✅ Desconto fixo: 28%
- ✅ Jejum: 8h recomendado (Hemograma)
- ✅ Não fazer durante menstruação (Papa)
- ✅ Duração: 50-60 min
- ⚠️ HPV: Somente se idade < 50 anos

**Saúde do Homem:**
- ✅ Somente para gênero masculino
- ✅ Idade mínima recomendada: 40 anos
- ✅ Desconto fixo: 26%
- ✅ Jejum: 8h recomendado (Hemograma)
- ✅ Duração: 45-55 min
- ⚠️ PSA: Sem relação sexual 48h antes

**Check-up Preventivo Completo (50+):**
- ✅ Idade mínima: 50 anos (bloqueio se < 50)
- ✅ Desconto fixo: 30% (maior desconto)
- ✅ Jejum: 8h obrigatório
- ✅ Duração: 70-90 min (agendamento duplo)
- ✅ Resultado: 10-14 dias úteis
- ✅ Recomendação: 2+ horas entre exames

**Check-up Jovem (18-30):**
- ✅ Idade mínima: 18 anos, máxima: 30 anos
- ✅ Desconto fixo: 20%
- ✅ Jejum: 8h recomendado
- ✅ Duração: 25-30 min (rápido)
- ✅ Inclui: Teste HIV (awareness)

**Check-up Diabético:**
- ✅ Requer: Diagnóstico prévio de diabetes (validar no cadastro)
- ✅ Bloqueio se: Sem confirmação de diabetes
- ✅ Desconto fixo: 22%
- ✅ Jejum: 12h obrigatório (antes HbA1c)
- ✅ Duração: 45-50 min
- ✅ Frequência: A cada 3 meses (recomendado)

**Check-up Cardiovascular:**
- ✅ Bloqueio se: Sem fator de risco (opcional)
- ✅ Recomendado se: Histórico familiar ou pressão alta
- ✅ Desconto fixo: 24%
- ✅ Jejum: 8h recomendado
- ✅ Duração: 50-60 min
- ⚠️ ECG: Requer interpretação médica (resultado em 7 dias)

**Gestante Bundle:**
- ✅ Somente se: Gênero feminino + estado gestacional confirmado
- ✅ Bloqueio rigoroso: Não mostrar se não gestante
- ✅ Desconto fixo: 20%
- ✅ Jejum: Sem jejum necessário
- ✅ Duração: 60-75 min (sem pressa)
- ✅ Recomendação: Trimestral (1o, 2o, 3o trimestre)
- ⚠️ USG obstétrico: Incluído, requer agendamento separado

---

## 💰 Seção 6: Dados e Benefícios

### Tabela: Valor Agregado vs Compra Individual

| Bundle | Exames Base | Preço Individual | Desconto % | Preço Bundle | Economia | Duração |
|--------|-------------|------------------|-----------|--------------|----------|---------|
| **Check-up Geral** | 6 | R$ 380 | 25% | R$ 285 | R$ 95 | 30-40 min |
| **Saúde Mulher** | 6 base + 4 específicos | R$ 520 | 28% | R$ 375 | R$ 145 | 50-60 min |
| **Saúde Homem** | 6 base + 4 específicos | R$ 480 | 26% | R$ 355 | R$ 125 | 45-55 min |
| **Preventivo 50+** | 6 base + 6 específicos | R$ 680 | 30% | R$ 475 | R$ 205 | 70-90 min |
| **Check-up Jovem** | 5 | R$ 310 | 20% | R$ 248 | R$ 62 | 25-30 min |
| **Diabético** | 7 | R$ 420 | 22% | R$ 328 | R$ 92 | 45-50 min |
| **Cardiovascular** | 6 + ECG | R$ 480 | 24% | R$ 365 | R$ 115 | 50-60 min |
| **Gestante** | 8 + USG | R$ 580 | 20% | R$ 464 | R$ 116 | 60-75 min |

**Média de desconto:** 24% | **Economia média:** R$ 118

### Benefícios Clínicos por Bundle

#### Check-up Geral
- **Objetivo:** Baseline de saúde para população geral
- **Detecção:** Anemia, inflamação, glicose alta, colesterol elevado, disfunção tireóide, problemas renais
- **Frequência recomendada:** Anual (adultos saudáveis)
- **Probabilidade de achados:** 35-40% têm alguma alteração

#### Saúde da Mulher
- **Objetivo:** Rastreamento de patologias ginecológicas e saúde reprodutiva
- **Detecção:** Inflamação pélvica, miomas, cistos, HPV, deficiência vitamínica, fatores cardiovasculares
- **Frequência recomendada:** Anual (a partir de 25 anos)
- **Importância:** Prevenção de câncer de colo (Papa) + monitoramento de saúde integral
- **Dados:** Câncer de colo tem taxa de cura > 95% quando detectado cedo

#### Saúde do Homem
- **Objetivo:** Rastreamento de doenças da próstata e saúde cardiovascular
- **Detecção:** Hiperplasia prostática, câncer de próstata, colesterol alto, diabetes
- **Frequência recomendada:** Anual (a partir de 40 anos)
- **Importância:** 1 em 9 homens receberá diagnóstico de câncer de próstata
- **Dados:** Detecção precoce melhora prognóstico significativamente

#### Check-up Preventivo Completo (50+)
- **Objetivo:** Screening abrangente para idosos (prevenção de 5+ doenças)
- **Detecção:** Hipertensão, diabetes, dislipidemia, insuficiência renal, infecções (HIV, hepatite)
- **Frequência recomendada:** 6-12 meses (a partir de 50 anos)
- **Importância:** Maioria das mortes em >50 anos são preveníveis com detecção precoce
- **Dados:** 80% dos adultos 50+ têm ≥1 fator de risco cardiovascular

#### Check-up Jovem
- **Objetivo:** Estabelecer baseline e aumentar awareness de saúde
- **Detecção:** Problemas preexistentes antes dos 30 anos
- **Frequência recomendada:** A cada 2-3 anos (idade 18-30)
- **Importância:** Hábitos estabelecidos aos 25+ influenciam saúde por 60+ anos
- **Dados:** 25% dos jovens têm colesterol elevado (fator genético)

#### Check-up Diabético
- **Objetivo:** Monitoramento rigoroso de diabético (prevenção de complicações)
- **Detecção:** Controle glicêmico (HbA1c), função renal, neuropatia, nefropatia
- **Frequência recomendada:** A cada 3 meses (diabético em tratamento)
- **Importância:** Diabetes causa 90% dos casos de insuficiência renal e 50% das amputações
- **Dados:** Hemoglobina glicada (HbA1c) reflete controle dos últimos 3 meses

#### Check-up Cardiovascular
- **Objetivo:** Rastreamento de risco de infarto/AVC
- **Detecção:** Colesterol, triglicerídeos, homocisteína, glicose, função renal, ECG
- **Frequência recomendada:** Anual (fator de risco) ou a cada 2-3 anos (sem risco)
- **Importância:** Doença cardiovascular é a #1 causa de morte no Brasil
- **Dados:** 40% dos infartos ocorrem em pessoas <55 anos (maioria prevenível)

#### Gestante Bundle
- **Objetivo:** Acompanhamento trimestral da gravidez (saúde mãe + bebê)
- **Detecção:** Infecções, incompatibilidade Rh, complicações gestacionais, bem-estar fetal
- **Frequência recomendada:** 1º trim, 2º trim, 3º trim (3 verificações)
- **Importância:** Pré-natal reduz mortalidade materna em 90%
- **Dados:** Diabetes gestacional afeta 5-10% das grávidas; detecção precoce muda prognóstico

### Impacto de Bundles no Negócio

#### AOV (Average Order Value)

**Baseline (Sem Bundles):**
- AOV médio: R$ 180 por agendamento
- Exames por agendamento: 1,2

**Com Bundles (Projeção):**
- AOV esperado: R$ 220-250 (+25-35%)
- Exames por agendamento: 2,5-3,0
- Taxa de adoção esperada: 40-50%

**Impacto:** +33% AOV = +R$ 6.000/dia com 100 agendamentos

#### Taxa de Conversão

**Sem Upsell:**
- Taxa de abandono (etapa 6-7): 25%
- Taxa de conclusão: 75%

**Com Bundles (Etapa 7 Otimizada):**
- Taxa de abandono: 15% (-10 pp)
- Taxa de conclusão: 85% (+10 pp)

**Implicação:** +10-15% mais agendamentos completados

#### NPS e Satisfação

**Benefício Esperado:**
- Bundles → NPS +5-8 pontos
- Razão: Percepção de valor + conveniência
- Redução de "necessidade de complementar depois"

---

