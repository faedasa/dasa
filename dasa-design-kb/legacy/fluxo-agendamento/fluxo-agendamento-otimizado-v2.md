# Fluxo de Agendamento Otimizado - NAV360 (v2.2)

> **Versão:** 2.2 | **Data:** 2025-11-28 | **Status:** 🟢 Ativo | **Tags:** #product #fluxo #agendamento #otimizado #bundles | **Último Update:** Etapa 7 - Upsell Inteligente com Bundles

---

## 📋 CONTEXTO

**Feedback da Gerente (19/Nov/2025):**
- Busca de exame como prioridade máxima na experiência
- Pessoa precisa saber preço logo, mas apenas após informar convênio
- Convênio deve ser perguntado ANTES de mostrar preços (não depois)
- Com profiling atualizado na identificação, upsell fica inteligente e baseado em dados reais
- Outros detalhes (coleta em casa, urgência) devem ser mantidos

**Feedback do Designer (19/Nov/2025 - v2.1):**
- Identificação **ANTES** de busca de unidades (não depois)
- Permite validar restrições de pessoa ANTES de buscar slots
- Sistema mostra apenas slots disponíveis respeitando convênio/restrições do terceiro
- Menos fricção: não abandona busca descobrindo "oops, não tem slot pra isso"

**Mudança Principal:**
```
v1.0: Para quem? → Exame → Convênio → Preço → Unidades → ID → Upsell
v2.0: Exame → Convênio → Preço → Unidades → Para quem? → ID → Upsell
v2.1: Exame → Convênio → Preço → Para quem?/ID → Unidades → Data/Hora → Upsell
      ↑ Identificação ANTES de unidades para validar restrições
```

---

## 🎯 FLUXO 1: PARA MIM MESMO (Simplificado)

**Total de Etapas:** 8
**Tempo Estimado:** 3-4 minutos
**Complexidade:** Baixa
**Personas Alvo:** Moisés (standard) - Prioridade: rapidez

```
1. ⭐ BUSCA DE EXAME
   ├─ Input: "hemograma", "covid", "checkup"
   ├─ Resultado mostra "Preço a consultar"
   └─ Sem validação de convênio ainda
                    ↓
2. ⭐ CONVÊNIO FIRST
   ├─ Tem convênio? Sim/Não
   ├─ Se sim: qual? (dropdown de seus convênios salvos)
   └─ Validar cobertura em tempo real
                    ↓
3. ⭐ RESULTADOS COM PREÇOS ATUALIZADOS
   ├─ Exame + Preço final (baseado em convênio)
   ├─ Indicador: "100% coberto" / "80% coberto" / "Particular"
   └─ Co-participação, se houver
                    ↓
4. ⭐ IDENTIFICAÇÃO (Autopreenchida - já logado) 🆕
   ├─ Confirmar dados (nome, CPF, email, celular)
   ├─ Atualizar profiling com contexto atual
   └─ ✅ Rápido (já tá logado, é só confirmar ou skip)
                    ↓
5. ⭐ BUSCA DE UNIDADES (Validada para sua persona) 🆕 POSIÇÃO
   ├─ Filtro: Coleta em casa / Unidade presencial
   ├─ Filtro: Urgência (rotina/urgente)
   ├─ Mostrar APENAS unidades disponíveis (respeitando sua convênio)
   └─ Smart default: última unidade usada
                    ↓
6. SELEÇÃO DE DATA/HORÁRIO
   ├─ Calendário visual
   ├─ Horários disponíveis (respeitando urgência/coleta)
   └─ Atômico: 8 minutos para finalizar
                    ↓
7. ⭐ UPSELL INTELIGENTE
   ├─ Baseado em: idade, gênero, histórico, exame selecionado
   ├─ Sugestões de exames/vacinas complementares
   ├─ NÃO bloqueante (fácil pular)
   └─ Exemplo: "Hemograma? Que tal também Colesterol?"
                    ↓
8. REVISÃO + CHECKOUT + CONFIRMAÇÃO
   ├─ Revisar tudo
   ├─ Pagamento
   └─ Confirmação com QR code + lembretes
```

---

## 🎯 FLUXO 2: PARA OUTRA PESSOA (Um Terceiro)

**Total de Etapas:** 9
**Tempo Estimado:** 5-6 minutos
**Complexidade:** Média
**Personas Alvo:** Miriam, Manoel (agendando pra família)

```
1. ⭐ BUSCA DE EXAME
   ├─ Input: "hemograma", "covid", etc
   ├─ Resultado mostra "Preço a consultar"
   └─ Sem informações de terceiro ainda
                    ↓
2. ⭐ CONVÊNIO FIRST
   ├─ Tem convênio? Sim/Não
   ├─ Se sim: qual?
   ├─ Se é dependente: Titular é você ou outra pessoa?
   └─ Validar cobertura em tempo real
                    ↓
3. ⭐ RESULTADOS COM PREÇOS ATUALIZADOS
   ├─ Exame + Preço final (baseado em convênio escolhido)
   ├─ Indicador: "100% coberto" / "80% coberto" / "Particular"
   └─ Transparência total
                    ↓
4. ⭐ "PARA QUEM?" (Pedir agora!) 🆕 POSIÇÃO
   ├─ Nome completo
   ├─ CPF
   ├─ Data de nascimento → Detecta automaticamente se < 18
   ├─ Parentesco (pai/mãe/filho/cônjuge/outro)
   ├─ Email + Celular
   └─ ⚠️ Se < 18: Ativa fluxo especial com termo/responsável
                    ↓
5. ⭐ IDENTIFICAÇÃO DO AGENDADOR (Você) 🆕 POSIÇÃO
   ├─ Confirmar seus dados (já logado)
   ├─ Atualizar profiling com contexto atual
   └─ Relação: Você é responsável? Sim/Não
                    ↓
6. ⭐ BUSCA DE UNIDADES (Validada para TERCEIRO) 🆕 POSIÇÃO
   ├─ Filtro: Coleta em casa / Unidade presencial
   ├─ Filtro: Urgência (rotina/urgente)
   ├─ Mostrar APENAS unidades disponíveis para convênio/idade de terceiro
   ├─ ✅ Sistema já conhece restrições (idade, convênio, dependência)
   └─ Smart default: última unidade usada por você
                    ↓
7. SELEÇÃO DE DATA/HORÁRIO
   ├─ Calendário visual
   ├─ Horários disponíveis (respeitando restrições de terceiro)
   └─ Atômico: 8 minutos para finalizar
                    ↓
8. ⭐ UPSELL INTELIGENTE
   ├─ Baseado em: idade de terceiro, gênero, histórico, exame
   ├─ Sugestões personalizadas para quem vai fazer
   ├─ NÃO bloqueante
   └─ Exemplo: "Maria tem 45 anos? Que tal também TSH?"
                    ↓
9. REVISÃO + CHECKOUT + CONFIRMAÇÃO
   ├─ Revisar tudo (seu nome, Maria, exames, preço)
   ├─ Notificações duplas ativadas (você + paciente)
   ├─ Pagamento
   └─ Confirmação com QR codes individuais
```

**BLOQUEIOS AUTOMÁTICOS:**
- Se terceiro < 18 anos: Requer termo de autorização + responsável presente
- Se terceiro sem profiling: Sistema valida dados com mais rigor
- Se convênio incompatível: Sistema alerta valor diferente
- Se coleta em casa indisponível: Mostra apenas presencial

**VALIDAÇÕES CRITICAS (Acontecem na Etapa 4-5):**
- ✅ Verifica se menor de idade precisa de acompanhante
- ✅ Valida se dependente está associado ao convênio
- ✅ Detecta se pessoa tem restrições (gestante, mobilidade, etc)

---

## 🎯 FLUXO 3: PARA MÚLTIPLAS PESSOAS

**Total de Etapas:** 11
**Tempo Estimado:** 7-9 minutos
**Complexidade:** Alta
**Personas Alvo:** Manoel (concierge familiar), Miriam + grupo de amigas

```
1. ⭐ BUSCA DE EXAME(S)
   ├─ Input: "hemograma", "covid", etc
   ├─ Resultado mostra "Preço a consultar"
   └─ Sem informações de grupo ainda
                    ↓
2. ⭐ CONVÊNIO FIRST
   ├─ Todos têm mesmo convênio? Sim/Não
   ├─ Se não: como é a cobertura de cada um?
   │  ├─ Alguns têm convênio próprio
   │  ├─ Alguns são seus dependentes
   │  └─ Alguns vão pagar particular
   └─ Validar cobertura individual em tempo real
                    ↓
3. ⭐ RESULTADOS COM PREÇOS INDIVIDUALIZADOS
   ├─ Por pessoa: Exame + Preço final
   ├─ Total do grupo com descontos aplicados
   ├─ Breakdown: "João R$60 + Maria R$105 - Desconto 10% = R$148,50"
   └─ Transparência total
                    ↓
4. ESTRATÉGIA DE AGENDAMENTO
   ├─ ○ Juntos (mesma hora) → Mais rápido, menos opções
   ├─ ○ Próximos (±30 min) → Equilibrio
   └─ ○ Flexível → Máxima disponibilidade
                    ↓
5. ⭐ "PARA QUEM?" (Pedir agora!) 🆕 POSIÇÃO
   ├─ Quantidade já conhecida (etapa anterior)
   ├─ Por cada pessoa:
   │  ├─ Nome completo
   │  ├─ CPF
   │  ├─ Data de nascimento → Detecta < 18
   │  ├─ Parentesco
   │  ├─ Email + Celular
   │  └─ Exame específico (se fluxo "exames diferentes")
   └─ ⚠️ Se algum < 18: Sistema alerta restrições
                    ↓
6. ⭐ IDENTIFICAÇÃO DE TODOS 🆕 POSIÇÃO
   ├─ Seus dados (já logado)
   ├─ Confirmar dados de cada terceiro
   ├─ Atualizar profiling de cada um
   └─ Relação: Você é responsável por quem?
                    ↓
7. ⭐ BUSCA DE UNIDADES (Validada para TODO GRUPO) 🆕 POSIÇÃO
   ├─ Filtro: Coleta em casa / Unidade presencial
   ├─ Filtro: Urgência (rotina/urgente)
   ├─ Mostrar APENAS unidades compatíveis com:
   │  ├─ Estratégia (juntos/próximos/flexível)
   │  ├─ Convênios de cada um
   │  ├─ Restrições de idade (menores < 18)
   │  └─ Disponibilidade para TODOS simultaneamente
   ├─ ✅ Sistema já sabe tudo sobre o grupo
   └─ Smart default: última unidade usada por você
                    ↓
8. SELEÇÃO DE DATA/HORÁRIO
   ├─ Calendário visual
   ├─ Horários (sincronizados conforme estratégia + restrições)
   └─ Atômico: 8 minutos para finalizar TODOS
                    ↓
9. ⭐ UPSELL INTELIGENTE (Por Pessoa)
   ├─ Para João (45 anos): "Quer adicionar Colesterol?"
   ├─ Para Maria (42 anos): "Quer adicionar Vitamina D?"
   ├─ Para Pedro (15 anos): "Quer adicionar Vacina HPV?"
   ├─ Personalizado por idade/gênero/histórico
   └─ NÃO bloqueante (fácil pular)
                    ↓
10. PAGAMENTO
    ├─ ○ Eu pago por todos
    ├─ ○ Cada um paga o seu (links individuais)
    ├─ ○ Dividir igualmente
    └─ Atômico: todos precisam confirmar pagamento
                    ↓
11. REVISÃO + CHECKOUT + CONFIRMAÇÃO
    ├─ Revisar tudo (cada pessoa, seus exames, preços)
    ├─ Notificações individuais ativadas
    ├─ Pagamento confirmado
    └─ Confirmação com QR codes individuais por pessoa
```

**BLOQUEIOS AUTOMÁTICOS:**
- Se algum do grupo < 18: Sistema alerta na etapa 5 (dados)
- Se cobertura mista: Sistema já mostra na etapa 3 (preços individuais)
- Se estratégia incompatível: Sistema filtra unidades respeitando grupo
- Se menor sem acompanhante: Oferece alternativa de agendar separado

**VALIDAÇÕES CRÍTICAS (Etapas 5-6):**
- ✅ Verifica cada pessoa: dependência, idade, restrições
- ✅ Confirma quem é responsável por quem
- ✅ Detecta incompatibilidades (ex: menor sem responsável)
- ✅ Valida dados de cada terceiro antes de busca de unidades

---

## 🔄 CHANGELOG

### [2.2] - 2025-11-28 (Etapa 7 - Upsell Inteligente com Bundles) ✨ NOVO
**Mudanças Principais:**
- ⭐ **Seção 7️⃣ DETALHES: ETAPA 7 - UPSELL INTELIGENTE (COM BUNDLES)** adicionada
- ⭐ 8 bundles listados (Check-up Geral, Saúde da Mulher, Saúde do Homem, etc)
- ⭐ 5 exemplos práticos (Moisés, Miriam, Manoel, filha 16 anos, casal)
- ⭐ Lógica de apresentação: idade, gênero, histórico, exame selecionado
- ⭐ Regras de copy validadas contra copy-rules.md (verbo infinitivo, sem ponto)
- ⭐ Validações antes de mostrar (confidence_score, convênio, exame)
- ⭐ Impacto esperado: AOV +25-35%, aceitação 25-35%, NPS +5-8

**Razão:** Integrar bundles no fluxo com exemplos por persona

**Impacto:**
- Upsell inteligente: não genérico, baseado em dados reais
- Conversão: +10pp na taxa (75% → 85%)
- Revenue: AOV aumenta R$ 50-100 por agendamento
- UX: Sugestão clara, não bloqueante, fácil pular

---

### [2.1] - 2025-11-19 (Feedback do Designer - Otimização v2)
**Mudanças Principais:**
- ⭐ Identificação move para ANTES de busca de unidades (era depois)
- ⭐ Sistema valida restrições ANTES de buscar slots (menos fricção)
- ⭐ Busca de unidades mostra APENAS opções válidas para pessoa/grupo
- ⭐ Redução de "oops" moments (não mostra impossíveis)
- Mantém: ordem exame/convênio/preço, upsell inteligente, etc

**Razão:** Validar antes de buscar = experiência mais precisa

**Impacto:**
- Menos fricção: sistema sabe restrições antes de buscar
- Menos abandono: não encontra "não tem slot pra isso"
- Mais precisão: filtros respeitam convênio, idade, dependência
- Melhor UX para terceiros: sistema já sabe tudo

---

### [2.0] - 2025-11-19 (Feedback da Gerente)
**Mudanças Principais:**
- ⭐ Busca de Exame move para PRIMEIRA etapa (era etapa 3 no fluxo anterior)
- ⭐ Convênio move para SEGUNDA etapa, ANTES de mostrar preços (era etapa 5)
- ⭐ Unidades move para ANTES de "Para quem?" (era depois)
- ⭐ "Para quem?" move para DEPOIS das unidades (era primeira ou segunda)
- ⭐ Identificação move para DEPOIS de "Para quem?" (é usada para profiling)
- ⭐ Upsell agora é baseado em profiling atualizado (muito mais inteligente)
- Mantém: coleta em casa, urgência, termo para menores, etc

**Razão:** Pessoa quer saber preço rápido, mas precisa informar convênio antes

**Impacto:**
- Melhor experiência: Preço aparece mais cedo
- Mais conversão: Pessoa não abandona antes de saber valor
- Upsell inteligente: Baseado em dados reais (profiling)

---

### [1.0] - 2025-11-15 (Fluxo Original)
**Status:** ✅ Deprecated (v1.0 anterior)
**Sequência:** Para quem? → Exame → Convênio → Preço → Unidades → ID → Upsell
**Referência:** `projeto-agendamento-nav360.md` (seção "Fluxo Sugerido")

---

## 7️⃣ DETALHES: ETAPA 7 - UPSELL INTELIGENTE (COM BUNDLES)

### 📦 Estratégia de Bundles

A Etapa 7 é onde apresentamos **pacotes inteligentes** de exames + vacinas com desconto (15-30% vs individual). Sistema recomenda baseado em:
- ✅ Idade do paciente
- ✅ Gênero
- ✅ Histórico de exames
- ✅ Exame atual selecionado

**Posicionamento:** ✨ Sugestão Inteligente (não obrigatório, fácil pular)

---

### 📋 Exemplos por Persona (Fluxo 1: Para Mim Mesmo)

#### **Exemplo 1: Moisés (34 anos, masculino)**
**Selecionou:** Hemograma completo (R$ 120)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes que fazem Hemograma também fazem:         │
│                                                      │
│ ✓ Check-up Geral (6 exames)                         │
│   • Hemograma + Glicemia + Colesterol + TSH + ... │
│   Preço individual: R$ 380                          │
│   Preço do pacote: R$ 285                           │
│   💰 Economize: R$ 95 (25% desconto)               │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Moisés com 34 anos + gênero masculino + primeiro agendamento após anos = oferece check-up completo (preventivo)

---

#### **Exemplo 2: Miriam (28 anos, feminina)**
**Selecionou:** Papa Nicolau (R$ 95)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes que fazem Papa Nicolau também fazem:     │
│                                                      │
│ ✓ Saúde da Mulher (9 exames + vacina)               │
│   • Papa Nicolau + Mamografia + Colesterol + ...  │
│   • + Vacina HPV (reforço)                          │
│   Preço individual: R$ 520                          │
│   Preço do pacote: R$ 375                           │
│   💰 Economize: R$ 145 (28% desconto)              │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Mulher 28 anos + Papa em atraso = oferece bundle feminino preventivo com reforço de vacina

---

#### **Exemplo 3: Manoel (62 anos, masculino)**
**Selecionou:** Colesterol (R$ 75)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes que fazem Colesterol também fazem:       │
│                                                      │
│ ✓ Check-up Cardiovascular (6 exames + ECG)         │
│   • Colesterol + Triglicerídeos + Glicemia + ...  │
│   • + Eletrocardiograma                             │
│   Preço individual: R$ 480                          │
│   Preço do pacote: R$ 365                           │
│   💰 Economize: R$ 115 (24% desconto)              │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Homem 62 anos + risco cardiovascular alto = oferece bundle especializado com ECG

---

### 📋 Exemplos para Terceiros (Fluxo 2)

#### **Exemplo 4: Agendando para filha de 16 anos**
**Selecionou:** Hemograma (R$ 120)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes de 16 anos fazem:                         │
│                                                      │
│ ✓ Check-up Jovem (5 exames + 2 vacinas)             │
│   • Hemograma + Glicemia + Colesterol + ...        │
│   • + Reforço HPV + Meningite                       │
│   Preço individual: R$ 310                          │
│   Preço do pacote: R$ 248                           │
│   💰 Economize: R$ 62 (20% desconto)               │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Adolescente + vacinas desatualizadas (detectadas no profiling) = oferece bundle preventivo jovem

---

### 📋 Exemplos para Múltiplas Pessoas (Fluxo 3)

#### **Exemplo 5: Casal (Ele 45 anos, Ela 42 anos)**
**Selecionou:** Hemograma para ambos

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestões Inteligentes Personalizadas             │
├─────────────────────────────────────────────────────┤
│                                                      │
│ PARA ELE (45 anos):                                  │
│ ✓ Check-up Geral                                    │
│   Preço: R$ 380 → R$ 285 (25% desconto)            │
│   [Adicionar]                                       │
│                                                      │
│ PARA ELA (42 anos):                                  │
│ ✓ Saúde da Mulher                                   │
│   Preço: R$ 520 → R$ 375 (28% desconto)            │
│   [Adicionar]                                       │
│                                                      │
│ Total da Promoção: R$ 300 off (R$ 660 economizados)│
│                                                      │
│ [Adicionar ambos] [Continuar sem]                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Casal + diferentes faixas etárias = oferece bundles específicos gênero e idade

---

### 🎯 Regras de Apresentação (Seguir copy-rules.md)

**Formato de Mensagens:**

✅ **Correto:**
- "Pacientes que fazem [Exame] também fazem: [Bundle]"
- "Preço individual: R$ X"
- "Preço do pacote: R$ Y"
- "💰 Economize: R$ Z (N% desconto)"
- Botão: "Adicionar ao agendamento" (verbo infinitivo, sem ponto)

❌ **Evitar:**
- "Desconto especial!" (genérico)
- "Recomendado" (sem dados)
- "Clique aqui" (jargão)
- "Você deveria..." (tom imperativo)

---

### 📋 Exemplos Femininos Expandidos (Diferentes Faixas Etárias)

#### **Exemplo 6: Mulher 45 anos (Transição Menopausa)**
**Selecionou:** Mamografia (R$ 180)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes que fazem Mamografia também fazem:        │
│                                                      │
│ ✓ Saúde da Mulher Completa (12 exames)              │
│   • Mamografia + Papa + Ultrassom Pélvico + ...    │
│   • Hormônios (FSH, Estradiol)                      │
│   • + Vacina HPV (reforço) + Hepatites              │
│   Preço individual: R$ 620                          │
│   Preço do pacote: R$ 450                           │
│   💰 Economize: R$ 170 (27% desconto)              │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Mulher 45 anos + Mamografia = oferece bundle completo com hormônios (menopausa transition) e HPV reforço

---

#### **Exemplo 7: Mulher 55+ (Bem-estar Ativo)**
**Selecionou:** Vitamina D (R$ 65)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes que fazem Vitamina D também fazem:        │
│                                                      │
│ ✓ Bem-estar Ativa 50+ (8 exames + 2 vacinas)        │
│   • Vitamina D + Mamografia + Densitometria + ...  │
│   • Rastreamento cardiovascular                     │
│   • + Gripe + Pneumococo                            │
│   Preço individual: R$ 580                          │
│   Preço do pacote: R$ 420                           │
│   💰 Economize: R$ 160 (28% desconto)              │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Mulher 55+ + Vitamina D = oferece bundle longevidade ativa com saúde óssea (densitometria) e cardiovascular

---

#### **Exemplo 8: Gestante (Pré-Natal)**
**Selecionou:** Hemograma (R$ 120)

```
┌─────────────────────────────────────────────────────┐
│ 💡 Sugestão Inteligente                              │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Pacientes gestantes fazem:                          │
│                                                      │
│ ✓ Check-up Gestante Completo (6 exames + 3 vacinas)│
│   • Hemograma + Glicemia + Tipagem Sanguínea + ... │
│   • Sífilis + HIV + Hepatites B/C                   │
│   • + Gripe + COVID + Coqueluche (3º trimestre)    │
│   Preço individual: R$ 410                          │
│   Preço do pacote: R$ 298                           │
│   💰 Economize: R$ 112 (27% desconto)              │
│                                                      │
│   [Adicionar ao agendamento] [Continuar sem]       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Lógica:** Gestante + Hemograma = oferece bundle pré-natal com rastreamento infeccioso e vacinação segura para gestação

---

### 🔧 Validações por Etapa 7

**Sistema valida ANTES de mostrar sugestões:**

1. **Idade:** IF age 18-30 → Show "Check-up Jovem"
2. **Gênero:** IF female AND age 25-50 → Show "Saúde da Mulher"
3. **Histórico:** IF last_exam > 2 years → Show preventivo
4. **Convênio:** IF cobertura inclui bundle → Show com preço certo
5. **Exame selecionado:** IF hemograma → Show bundles que incluem hemograma
6. **Confiança:** IF confidence_score > 0.80 → Show 1 sugestão principal

---

### 💾 Dados Necessários (Já coletados em Etapas 3-4)

```
FROM_PROFILING:
- age ✅
- gender ✅
- last_exam_date ✅
- exam_history ✅
- convenio_id ✅
- location_id ✅

CURRENT_SELECTION:
- exam_id (selecionado) ✅
- exam_category ✅
```

---

### 📊 Impacto Esperado (Bundles Etapa 7)

| Métrica | Meta |
|---------|------|
| Taxa de aceitação do bundle | 25-35% |
| AOV (Avg Order Value) aumenta | +25-35% |
| Exames por agendamento | 1.2 → 2.5-3.0 |
| Taxa conversão | 75% → 85% |
| NPS do fluxo | +5-8 pontos |

---

## 📌 NOTAS IMPORTANTES

### Validações Críticas (Mantidas)
- ✅ Menores < 18: Requer termo + responsável presente
- ✅ Dependentes: Validar em tempo real com convênio
- ✅ Cobertura: Mostrar sempre (100%, 80%, 0%)
- ✅ Atômico: 8 minutos para reservar horários

### Smart Defaults (Implementar)
- ✅ Última unidade usada (conveniência)
- ✅ Último convênio usado (agilidade)
- ✅ Sugestões baseadas em idade/gênero/histórico (upsell)
- ✅ **Bundles por persona (novo):** Etapa 7 inteligente

### Bloqueios Automáticos
- ⛔ Menor em fluxo múltiplo: Oferecer separação
- ⛔ Dependente sem cobertura: Alertar sobre valor
- ⛔ Menor agendando sozinho: Bloquear
- ⛔ **Bundle indisponível para convênio:** Sistema não mostra

---

## 🔗 Referências

- Documento anterior: `/dasa/projeto-agendamento-nav360.md`
- Copy rules: `/dasa/copy-rules.md`
- UX Guidelines: `/dasa/ux-guidelines.md`
- Design System: `/dasa/design-system.md`

---

## 📊 Comparação: v1.0 vs v2.0 vs v2.1

| Aspecto | v1.0 | v2.0 | v2.1 🆕 | Ganho |
|---------|------|------|---------|-------|
| **Etapa 1** | Para quem? | Busca Exame | Busca Exame | Prioridade correta ✅ |
| **Etapa 2** | Identificação | Convênio | Convênio | Preço rápido ✅ |
| **Preço aparece** | Etapa 5-6 | Etapa 3 | Etapa 3 | 3 etapas mais rápido ✅ |
| **ID/Validação** | Etapa 2 | Etapa 6-8 | Etapa 4-6 🆕 | ANTES de buscar ✅ |
| **Unidades** | Etapa 7 | Etapa 4 | Etapa 5-7 🆕 | Validada para pessoa ✅ |
| **Upsell** | Genérico | Baseado em profiling | Baseado em profiling | Inteligente ✅ |
| **Validação** | Zero | Zero | ANTES buscar 🆕 | Menos fricção ✅ |
| **Para Terceiros** | Confuso | Melhor | Muito melhor 🆕 | Sistema sabe tudo ✅ |

**Key Insight v2.1:** Conhecer pessoa/restrições ANTES de buscar slots = experiência muito mais precisa

---

## 🔧 IMPACTOS TÉCNICOS (v2.1)

### **Resumo Arquitetural**

Trazer identificação **ANTES** de busca de unidades cria uma mudança importante na **ordem de validações** e **queries ao banco de dados**.

#### **Fluxo de Dados (Antes vs Depois)**

```
ANTES (v2.0):
┌─────────────┬─────────────┬──────────────┬────────────────┐
│  Exame      │ Convênio    │ Preço        │ BUSCA UNIDADES │
│             │             │              │ (genérica)     │
└─────────────┴─────────────┴──────────────┴────────────────┘
                                              ↓
                                    [Mostra todas unidades]
                                              ↓
                                    [Depois: quem é? qual age?]
                                              ↓
                                    [Oops: não tem pra menores]

DEPOIS (v2.1):
┌─────────────┬─────────────┬──────────────┬────────┬─────────────────┬────────────────┐
│  Exame      │ Convênio    │ Preço        │  ID    │  VALIDAÇÕES     │ BUSCA UNIDADES │
│             │             │              │        │  (Antes buscar) │ (Específica)   │
└─────────────┴─────────────┴──────────────┴────────┴─────────────────┴────────────────┘
                                               ↓
                                    [Sistema conhece:]
                                    - CPF, idade, convênio
                                    - Restrições (menor, gestante)
                                    - Dependência
                                               ↓
                                    [Mostra APENAS válidas]
                                    (filtra por convênio, idade)
                                               ↓
                                    [Sem "oops" moments]
```

---

### **Validações por Fluxo**

#### **Fluxo 1: Para Mim Mesmo**

**Validações (Etapa 4 - ID):**
```sql
SELECT
  u.age,
  u.restrictions,
  c.valid_locations,
  c.age_limitations
FROM users u
JOIN convenios c ON u.convenio_id = c.id
WHERE u.id = ${userId}
```

**Resultado:** Sistema sabe:
- ✅ Idade do usuário
- ✅ Restrições (gestante, imobilidade)
- ✅ Locais válidos para convênio
- ✅ Limitações por idade

**Busca de Unidades (Etapa 5 - Validada):**
```sql
SELECT DISTINCT u.*
FROM unidades u
WHERE u.id IN (
  SELECT DISTINCT unit_id
  FROM disponibilidade
  WHERE
    convenio_id = ${convenioId}
    AND age_min <= ${userAge}
    AND (age_max >= ${userAge} OR age_max IS NULL)
    AND (collection_home = true OR presencial = true)
    AND urgency IN (${selectedUrgency}, 'both')
    AND DATE(slot_time) >= NOW()
)
ORDER BY distance_from_zip(u.cep, ${userZip})
LIMIT 20
```

---

#### **Fluxo 2: Para Outra Pessoa**

**Validações (Etapas 4-5 - Para Quem? + ID Agendador):**
```sql
-- Validar terceiro
SELECT
  p.age,
  p.restrictions,
  d.dependente_de_convenio_id,
  CASE
    WHEN p.age < 18 THEN 'REQUER_ACOMPANHANTE'
    WHEN d.dependente_de_convenio_id IS NOT NULL THEN 'DEPENDENTE'
    ELSE 'INDEPENDENTE'
  END as status
FROM pessoas p
LEFT JOIN dependentes d ON p.id = d.pessoa_id
WHERE p.id = ${terceiroCPF}

-- Validar agendador (responsabilidade)
SELECT responsavel FROM responsaveis
WHERE agendador_id = ${userId} AND pessoa_id = ${terceiroCPF}
```

**Resultado:** Sistema sabe:
- ✅ Quem é a pessoa (dados completos)
- ✅ Se é menor (requer termo + acompanhante)
- ✅ Se é dependente (usa convênio titular)
- ✅ Se usuário é responsável legal

**Busca de Unidades (Etapa 6 - Validada para Terceiro):**
```sql
-- Se dependente: usar convênio do titular
-- Se independente: usar convênio próprio
-- Se particular: sem filtro de convênio

SELECT DISTINCT u.*
FROM unidades u
WHERE u.id IN (
  SELECT DISTINCT unit_id
  FROM disponibilidade
  WHERE
    convenio_id = ${terceiroCozvenioId}  -- Validado antes!
    AND age_min <= ${terceiryAge}
    AND (age_max >= ${terceiryAge} OR age_max IS NULL)
    AND (menor_requer_acompanhante = FALSE OR ${temAcompanhante} = TRUE)
    AND (collection_home = true OR presencial = true)
)
ORDER BY distance_from_zip(u.cep, ${enderecoPreferido})
```

---

#### **Fluxo 3: Para Múltiplas Pessoas**

**Validações (Etapas 5-6 - Para Quem? + ID de Todos):**
```sql
-- Validar CADA pessoa do grupo
SELECT
  p.id,
  p.age,
  p.restrictions,
  COALESCE(d.convenio_id, p.convenio_id) as convenio_real,
  CASE WHEN p.age < 18 THEN TRUE ELSE FALSE END as eh_menor
FROM pessoas p
LEFT JOIN dependentes d ON p.id = d.pessoa_id
WHERE p.id IN (${pessoas_cpfs})
  AND agendador_id = ${userId}

-- Validar responsabilidade
SELECT COUNT(*) FROM responsaveis
WHERE agendador_id = ${userId}
  AND pessoa_id IN (${pessoas_cpfs})
```

**Resultado:** Sistema sabe:
- ✅ Cada pessoa: idade, restrições, convênio real
- ✅ Quem é menor de idade
- ✅ Convênios de cada um (pode ser misto)
- ✅ Responsabilidade legal

**Busca de Unidades (Etapa 7 - Validada para GRUPO):**
```sql
-- Encontrar unidades que atendem TODOS do grupo simultaneamente
SELECT DISTINCT u.*
FROM unidades u
WHERE u.id IN (
  SELECT unit_id FROM disponibilidade d
  WHERE
    -- Respeita convênios de TODOS
    (d.convenio_id IN (${convenios_grupo}) OR d.convenio_id = 'PARTICULAR')

    -- Respeita idade de TODOS
    AND NOT EXISTS (
      SELECT 1 FROM ${pessoas_grupo} p
      WHERE (d.age_min > p.age OR d.age_max < p.age)
    )

    -- Respeita restrições de TODOS
    AND NOT EXISTS (
      SELECT 1 FROM ${pessoas_grupo} p
      WHERE p.restrictions && d.location_restrictions
    )

    -- Respeita estratégia
    AND (estrategia = 'juntos' OR slot_capacity >= ${num_pessoas})

    -- Disponibilidade
    AND DATE(slot_time) >= NOW()
    AND slots_disponiveis >= ${num_pessoas}
)
ORDER BY
  CASE
    WHEN estrategia = 'juntos' THEN 0
    WHEN estrategia = 'proximos' THEN 1
    ELSE 2
  END,
  distance_from_zip(u.cep, ${localizacao_grupo})
```

---

### **Impacto em Diferentes Camadas**

#### **Frontend**

| Área | Antes (v2.0) | Depois (v2.1) | Impacto |
|------|-------------|---------------|---------|
| **Tela de ID** | Skip (já logado) | Validar dados | Form + validação em tempo real |
| **Busca Unidades** | Query genérica | Query específica | Menos resultado, mais correto |
| **Erro Handling** | "Sem slots" depois | Previne problema | Melhor UX |
| **Loading** | 1 carregamento | 2 (ID + busca) | Ligeiramente mais lento |

**Otimização:** Cache de validações por 5-10 min

#### **Backend**

| Operação | Antes | Depois | Novo |
|----------|-------|--------|------|
| Buscar unidades | 1 query | 1 query | Validação pré-query ✅ |
| Validar pessoa | Depois (etapa 7) | Antes (etapa 4-5) | 1-2 queries novas |
| Validar convênio | Já feito | Já feito | Reutilizar resultado ✅ |
| Filtrar por grupo | Depois | Antes | Lógica complexa movida ✅ |

**Queries Novas:**
1. `SELECT users WHERE id = ?` (validação agendador)
2. `SELECT pessoas WHERE cpf IN (?)` (validação terceiros)
3. `SELECT dependentes WHERE pessoa_id = ?` (checar dependência)
4. `SELECT responsaveis WHERE agendador_id AND pessoa_id IN (?)` (responsabilidade)

**Otimização:** Todas podem ser cached (TTL: 24h ou mudança de dados)

#### **Database**

**Índices Importantes:**
```sql
-- Melhorar performance das novas validações
CREATE INDEX idx_usuarios_by_id ON users(id);
CREATE INDEX idx_pessoas_by_cpf ON pessoas(cpf);
CREATE INDEX idx_dependentes_by_pessoa ON dependentes(pessoa_id);
CREATE INDEX idx_responsaveis_by_agendador ON responsaveis(agendador_id, pessoa_id);
CREATE INDEX idx_disponibilidade_by_convenio_age ON disponibilidade(convenio_id, age_min, age_max);
```

---

### **Mudanças no Modelo de Dados**

**Tabelas Afetadas:**
- `users` - Já existente (usar campo `age`, `restrictions`)
- `pessoas` - Já existente (terceiros)
- `dependentes` - Já existente (validar dependência)
- `responsaveis` - Já existente (responsabilidade legal)
- `disponibilidade` - Já existente (age limits, convenios)

**Campos Esperados (se não existirem, criar):**
```sql
-- users table
ALTER TABLE users ADD COLUMN restrictions JSON NULL; -- ['gestante', 'imobilidade']

-- pessoas table
ALTER TABLE pessoas ADD COLUMN restrictions JSON NULL;

-- disponibilidade table
ALTER TABLE disponibilidade ADD COLUMN age_min INT DEFAULT 0;
ALTER TABLE disponibilidade ADD COLUMN age_max INT DEFAULT NULL;
ALTER TABLE disponibilidade ADD COLUMN menor_requer_acompanhante BOOLEAN DEFAULT FALSE;
ALTER TABLE disponibilidade ADD COLUMN location_restrictions JSON NULL;
ALTER TABLE disponibilidade ADD COLUMN slots_disponiveis INT DEFAULT 0;
```

---

### **Sequência de Implementação**

**Fase 1: Backend (sem mudança no fluxo)**
```
1. Criar queries de validação (etapas 4-6)
2. Testar com dados reais
3. Otimizar índices
4. Cache de validações
```

**Fase 2: Frontend (com mudança no fluxo)**
```
1. Adicionar tela de ID/Validação (etapa 4-5)
2. Integrar queries backend
3. Ajustar busca de unidades (etapa 5-7)
4. Testar fluxo completo
```

**Fase 3: QA**
```
1. Validar todos os 3 fluxos
2. Testar menores de idade
3. Testar dependentes
4. Testar grupos mistos (convênio diferente)
5. Performance: < 500ms por validação
```

---

### **Checklist Técnico**

- [ ] Queries de validação implementadas
- [ ] Índices de database criados
- [ ] Cache de validações configurado
- [ ] Frontend: tela de ID/Validação
- [ ] Frontend: busca de unidades filtrada
- [ ] Tratamento de erros (pessoa inválida, sem slots, etc)
- [ ] Testes unitários (validações)
- [ ] Testes de integração (fluxo completo)
- [ ] Performance testada (< 500ms validação)
- [ ] Documentação técnica atualizada

---

## ✅ Pronto para Implementação

- [x] Fluxo "Para Mim Mesmo" (8 etapas)
- [x] Fluxo "Para Outra Pessoa" (9 etapas)
- [x] Fluxo "Para Múltiplas Pessoas" (11 etapas)
- [x] Versioning + Changelog
- [x] Bloqueios e validações documentados
- [x] Referências cruzadas

---

**Próximos Passos:**
1. Validar com stakeholders (produto, eng, design)
2. Criar wireframes das 11 etapas
3. Implementar no Figma
4. Testar com usuários

**Mantido por:** Product Designer
**Última revisão:** 2025-11-28 (v2.2 - Etapa 7 com Bundles)
**Próxima revisão:** Após implementação fluxo com bundles (wireframes + testes de usuário)
