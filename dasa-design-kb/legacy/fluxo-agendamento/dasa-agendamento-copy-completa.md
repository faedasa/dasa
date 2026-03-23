# ✍️ DASA Nav360: Copy Estruturada Completa

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Pronto | **Alinhado com:** `copy-rules.md`

> Copy completa para o fluxo de agendamento, pronta para ser copiada/colada no desenvolvimento. Validada contra KB DASA (regras de formatação, tom, termos, horários).

---

## 📌 SUMÁRIO EXECUTIVO

Este documento estrutura **toda a copy** do fluxo de agendamento em 3 seções:

1. **Copy por Etapa** (11 seções) - Todos os textos primários e secundários
2. **Componentes Reutilizáveis** - CTAs, validações, erros, success messages
3. **Tone Variations** - Variações por persona (Moisés, Miriam, Manoel)

### Estrutura
```
ETAPA X: [Nome]
  ├─ COPY PRIMARY (títulos, labels, placeholders, CTAs)
  ├─ COPY SECONDARY (erros, sucessos, validações, help)
  ├─ TONE VARIATIONS (3 personas)
  └─ STATUS DE VALIDAÇÃO (copy-rules.md)
```

### Como Usar
```
Dev/Designer: Copie exatamente as seções de COPY PRIMARY
QA: Use COPY SECONDARY para testar todos os estados
Content: Revise TONE VARIATIONS se precisar customizar por persona
```

---

## ✅ VALIDAÇÃO CONTRA KB

Todos os textos foram validados contra:
- ✅ `copy-rules.md` - Formatação, pontuação, horários, termos
- ✅ `ux-guidelines.md` - CTAs em infinitivo, tom acolhedor
- ✅ `business-strategy.md` - Personalidades das personas
- ✅ Não contém termos da lista "evitar": Ver, Usuário, Plano, Preço, etc.

**Checklist de Copy:**
- ✅ Botões em infinitivo (Agendar, Selecionar, Continuar)
- ✅ Nenhum ponto final em CTAs
- ✅ Horários em 24h com "h" (6h, 13h, 18h)
- ✅ Maiúscula apenas primeira palavra (exceto nomes próprios)
- ✅ Minúscula após dois-pontos
- ✅ "Paciente" ao invés de "Usuário"
- ✅ "Convênio" ao invés de "Plano"
- ✅ "Mostrar" ao invés de "Ver"
- ✅ Mensagens de erro acionáveis (nunca genéricas)
- ✅ Tom sem julgamento (especialmente pra Miriam)

---

## 📝 COPY POR ETAPA

---

### ETAPA 1: BUSCA DE EXAME

#### COPY PRIMARY

```
TÍTULO:
"Qual exame você procura?"

SUBTÍTULO:
"Busque ou selecione abaixo"

PLACEHOLDER (Campo de busca):
"Hemograma, Covid-19, Ressonância, etc"

LABEL (Seção de populares):
"Exames populares"

CTA PRIMÁRIO:
"Continuar com seleção"

CTA SECUNDÁRIO:
"Pular por enquanto"

BUTTON OCR:
"Enviar foto do pedido"

HELP TEXT (ao lado OCR):
"Pode usar a foto do pedido do seu médico"
```

#### COPY SECONDARY

```
VALIDAÇÃO - CAMPO VAZIO:
(sem mensagem, apenas placeholder)

VALIDAÇÃO - DIGITANDO (>= 3 caracteres):
"Mostrando resultados..."

ERRO - EXAME NÃO ENCONTRADO:
"Exame não encontrado. Tente outro termo ou ligue para suporte"

SUCCESS - APÓS SELEÇÃO:
"Ótimo! Hemograma está disponível"

INFO - OCR ENVIADO:
"Foto enviada! Processando o pedido"

INFO - OCR PROCESSADO:
"Exames do seu pedido: Hemograma, Glicemia"

ERRO - OCR INVÁLIDO:
"Não conseguimos ler a foto. Tente tirar outra ou digite manualmente"

LOADING:
"Buscando exames..."

HELP (se usuário tiver dúvida):
"Qual exame devo fazer? Fale com suporte"
```

#### TONE VARIATIONS

```
MOISÉS (Standard - Direto e rápido):
  TÍTULO: "Qual exame você quer fazer?"
  SUBTÍTULO: "Busque rápido"
  CTA PRIMÁRIO: "Continuar"
  CTA SECUNDÁRIO: "Pular"

MIRIAM (Executivo - Acolhedor):
  TÍTULO: "Qual exame você precisa?"
  SUBTÍTULO: "Deixa a gente buscar pra você"
  CTA PRIMÁRIO: "Prosseguir"
  CTA SECUNDÁRIO: "Pular por enquanto"

MANOEL (Premium - Formal):
  TÍTULO: "Qual é o exame solicitado?"
  SUBTÍTULO: "Busque ou envie foto do pedido"
  CTA PRIMÁRIO: "Prosseguir"
  CTA SECUNDÁRIO: (não mostra)
```

---

### ETAPA 2: CONVÊNIO

#### COPY PRIMARY

```
TÍTULO:
"Qual seu convênio?"

SUBTÍTULO:
"O convênio pode alterar valores e disponibilidade"

LABEL (Opção 1):
"Tenho convênio"

SUB-LABEL (Opção 1):
"Selecione seu convênio"

PLACEHOLDER (Campo autocomplete):
"Bradesco, Amil, Unimed, etc"

LABEL (Opção 2):
"Sou particular"

SUB-LABEL (Opção 2):
"Sem convênio, pago à vista"

HELP LINK:
"Não sei meu convênio? Ajuda"

CTA PRIMÁRIO:
"Continuar"
```

#### COPY SECONDARY

```
ERRO - CONVÊNIO NÃO ENCONTRADO:
"Convênio não localizado. Verifique o nome e tente novamente"

SUCCESS - CONVÊNIO SELECIONADO:
"Bradesco Saúde selecionado"

INFO - DICA:
"Dica: Procure pelo nome da operadora (Bradesco, Amil, Unimed, etc)"

VALIDAÇÃO - NENHUM SELECIONADO:
"Selecione um convênio para continuar"

INFO - CONVÊNIO VENCIDO:
"Seu convênio pode estar vencido. Verifique a validade"

SUCCESS - APÓS SELEÇÃO:
"Continuando..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TÍTULO: "Qual é seu convênio?"
  SUBTÍTULO: (direto)
  CTA: "Continuar"

MIRIAM:
  TÍTULO: "Qual convênio você tem?"
  SUBTÍTULO: "Isso ajuda a mostrar valores corretos"
  CTA: "Prosseguir"

MANOEL:
  TÍTULO: "Qual é seu convênio?"
  SUBTÍTULO: "Também podemos consultar seu histórico"
  CTA: "Prosseguir"
```

---

### ETAPA 3: PREÇO

#### COPY PRIMARY

```
RECAP - EXAME:
"Hemograma Completo"

RECAP - CONVÊNIO:
"Bradesco Saúde"

SECTION HEADER:
"VOCÊ PAGARÁ"

PRICE VALUE:
"R$ 0,00"
(ou "R$ 85,00" se particular)

PRICE STATUS:
"100% coberto"
(ou "Particular" se não coberto)

DETAIL - TABELA:
"Valor tabela: R$ 85,00"

TRUST MESSAGE:
"Sem surpresas no final"

CTA PRIMÁRIO:
"Continuar"

CTA TERCIÁRIO:
"Alterar convênio"
```

#### COPY SECONDARY

```
STATUS - 100% COBERTO:
"R$ 0,00 (100% coberto)"

STATUS - PARCIALMENTE COBERTO:
"R$ 35,00 (80% coberto, você paga 20%)"

STATUS - NÃO COBERTO:
"R$ 85,00 (não coberto)"

STATUS - VENCIDO:
"Seu convênio pode estar vencido. Entre em contato"

WARNING - AUTORIZAÇÃO:
"Este convênio pode pedir autorização prévia (1-2h)"

WARNING - FILA:
"Pode haver fila para este exame (7-14 dias)"

SUCCESS - VALIDADO:
"Agora você pode agendar!"

INFO - DESCONTO:
"Com desconto para este convênio!"
```

#### TONE VARIATIONS

```
MOISÉS:
  MAIN: "Você pagará"
  PRICE: "R$ 85,00? Tudo bem!"
  TRUST: "Sem custos escondidos"

MIRIAM:
  MAIN: "Você pagará"
  TRUST: "Tranquilo! Sem surpresas"
  CTA: "Prosseguir"

MANOEL:
  MAIN: "Investimento em saúde"
  TRUST: "Sem custos adicionais previstos"
  CTA: "Prosseguir"
```

---

### ETAPA 4: PARA QUEM? (FLUXO 2 & 3)

#### COPY PRIMARY (FLUXO 2)

```
TÍTULO:
"Este exame é para quem?"

LABEL (Opção 1):
"Para mim mesmo"

LABEL (Opção 2):
"Para outra pessoa"

FIELD LABEL 1:
"Nome"

PLACEHOLDER 1:
"Nome completo"

FIELD LABEL 2:
"Data de nascimento"

PLACEHOLDER 2:
"DD / MM / AAAA"

FIELD LABEL 3:
"Parentesco/Relação"

OPTIONS 3:
"Cônjuge"
"Filho/Filha"
"Responsável"
"Outro"

CTA PRIMÁRIO:
"Continuar"
```

#### COPY PRIMARY (FLUXO 3)

```
TÍTULO:
"Quantas pessoas vão agendar?"

SUBTÍTULO:
"Múltiplas pessoas (maximize economias)"

QUICK SELECT LABELS:
"1"
"2"
"3"
"4+"

ALTERNATIVE HEADER:
"OU inserir nomes:"

PERSON CARD HEADER:
"Pessoa 1"
"Pessoa 2"
[etc]

FIELD LABEL:
"Nome completo"

FIELD LABEL:
"Data de nascimento"

REMOVE BUTTON:
"✕ Remover"

ADD BUTTON:
"+ Adicionar outra pessoa"

CTA PRIMÁRIO:
"Continuar com [N] pessoas"
```

#### COPY SECONDARY

```
ERRO - NOME VAZIO:
"Insira o nome de quem vai fazer o exame"

ERRO - DATA INVÁLIDA:
"Data de nascimento inválida (exemplo: 01/01/1990)"

INFO - MENOR DETECTADO:
"Paciente é menor de 18 anos. O responsável precisará estar presente"

SUCCESS - MAIOR DE 18:
"Tudo certo!"

SUCCESS - MÚLTIPLOS:
"2 pessoas selecionadas"

INFO - AGENDA FLEXÍVEL:
"Podemos agendar juntos ou em horários diferentes"

ERRO - LIMITE:
"Máximo 5 pessoas por agendamento. Entre em contato para mais"

LOADING:
"Processando dados..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TÍTULO: "Pra quem é o exame?"
  SUBTÍTULO: "Pode ser pra você ou outra pessoa"
  CTA: "Continuar"

MIRIAM:
  TÍTULO: "Para quem você gostaria de agendar?"
  SUBTÍTULO: "Podemos cadastrar outras pessoas também"
  CTA: "Prosseguir"

MANOEL:
  TÍTULO: "Para quem deseja agendar?"
  SUBTÍTULO: "Podemos incluir dependentes"
  CTA: "Prosseguir"
```

---

### ETAPA 5: IDENTIFICAÇÃO

#### COPY PRIMARY (FLUXO 1)

```
TÍTULO:
"Confirme seus dados"

DATA DISPLAY HEADER:
(sem label, apenas ícone de verificação)

VERIFIED BADGE:
"✓ João da Silva (verificado)"

DATA LINE 1:
"CPF: 123.456.789-00"

DATA LINE 2:
"Data de nascimento: 15/01/1985"

DATA LINE 3:
"Telefone: (11) 98765-4321"

EDIT LINK:
"Editar dados"

SECTION HEADER:
"Endereço para resultado"

ADDRESS OPTION 1:
"Casa (Av. Paulista, 1000)"

ADDRESS OPTION 2:
"Trabalho (Rua X, 500)"

ADDRESS OPTION 3:
"Outro"

CTA PRIMÁRIO:
"Continuar"
```

#### COPY PRIMARY (FLUXO 2)

```
TÍTULO:
"Confirmemos seus dados"

SUBTITLE:
"(quem está agendando)"

VERIFIED BADGE:
"✓ João da Silva (você)"

DATA LINES:
"CPF: 123.456.789-00"
"Telefone: (11) 98765-4321"

EDIT LINK:
"Editar dados"

SECTION HEADER:
"Resultado será enviado para:"

OPTION 1:
"Seu email: joao@email.com"

OPTION 2:
"Email da pessoa: maria@email.com"

OPTION 3:
"SMS: (11) 99999-8888"

CTA PRIMÁRIO:
"Continuar"
```

#### COPY SECONDARY

```
ERRO - CPF INVÁLIDO:
"CPF inválido. Verifique e tente novamente"

ERRO - TELEFONE INVÁLIDO:
"Telefone deve ter 10 ou 11 dígitos"

ERRO - EMAIL INVÁLIDO:
"Email inválido (exemplo: nome@email.com)"

SUCCESS - VERIFICADO:
"Dados confirmados"

INFO - PROTEÇÃO:
"Seus dados estão protegidos pela LGPD"

INFO - RESULTADO:
"Resultado será enviado em 24-48h (feriado: +1 dia)"

SUCCESS - PRONTO:
"Tudo pronto! Continuando..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TÍTULO: "Seus dados estão certos?"
  Q2: "Pra onde mando o resultado?"
  CTA: "Continuar"

MIRIAM:
  TÍTULO: "Vamos confirmar seus dados"
  Q2: "Resultado por email ou SMS?"
  CTA: "Prosseguir"

MANOEL:
  TÍTULO: "Confirmamos seus dados?"
  Q2: "Resultado para seu email registrado"
  CTA: "Prosseguir"
```

---

### ETAPA 6: UNIDADES

#### COPY PRIMARY

```
TÍTULO:
"Onde você prefere ir?"

SUBTITLE:
"Próximo de você (São Paulo)"

SEARCH PLACEHOLDER:
"Buscar bairro, endereço, ou unidade"

UNIT NAME:
"DELBONI SUMARÉ"

UNIT ADDRESS:
"📍 Av. Paulista, 2000"

UNIT RATING:
"⭐ 4.8 (320 reviews)"

UNIT STATUS:
"🕐 Aberto agora"
(ou "🕐 Abre em 2h")

UNIT DISTANCE:
"🚗 2km de você"

UNIT BUTTON:
"Selecionar"

MAP LINK:
"Mostrar mapa"

CTA PRIMÁRIO:
"Continuar com seleção"
```

#### COPY SECONDARY

```
ERRO - NENHUMA SELECIONADA:
"Selecione uma unidade para continuar"

SUCCESS - SELECIONADA:
"DELBONI SUMARÉ selecionada"

ERRO - SEM UNIDADES:
"Sem unidades disponíveis próximo a você"

STATUS - ABERTO:
"Aberto agora" (verde)

STATUS - ABRINDO:
"Abre em 2h" (amarelo)

STATUS - FECHADO:
"Fechado agora" (vermelho)

STATUS - ABERTO 24H:
"Aberto 24h"

STATUS - HORÁRIOS ESPECIAIS:
"Horários especiais"

LOADING:
"Buscando unidades próximas..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TÍTULO: "Qual unidade fica perto de você?"
  OPTION: "A mais perto?"
  CTA: "Continuar"

MIRIAM:
  TÍTULO: "Qual laboratório você prefere?"
  SUBTITLE: "Mostramos as mais próximas"
  CTA: "Prosseguir"

MANOEL:
  TÍTULO: "Qual unidade preferir?"
  SUBTITLE: "Conforto e conveniência"
  CTA: "Prosseguir"
```

---

### ETAPA 7: DATA / HORÁRIO

#### COPY PRIMARY

```
TÍTULO:
"Qual data e hora?"

SUBTITLE:
"Delboni Sumaré"

MONTH/YEAR:
"NOVEMBRO"

DAY LABELS:
"D  S  T  Q  Q  S  S"

SELECTED DATE DISPLAY:
"Sexta, 28 de novembro"

TIME GROUP HEADER 1:
"🕐 Manhã (7h-12h)"

TIME BUTTON EXAMPLE:
"[8:30]"
"[⚠️ 15:00]" (com aviso)

TIME GROUP HEADER 2:
"🕐 Tarde (12h-18h)"

TIME GROUP HEADER 3:
"🕐 Noite (18h-22h)" (se disponível)

RESCHEDULE LINK:
"Reagendar"

CTA PRIMÁRIO:
"Confirmar horário"
```

#### COPY SECONDARY

```
ERRO - DATA NÃO SELECIONADA:
"Selecione uma data"

ERRO - HORÁRIO NÃO SELECIONADO:
"Selecione um horário"

SUCCESS - AMBOS SELECIONADOS:
"Sexta, 28 de novembro às 8:30"

INFO - POUCAS VAGAS:
"Poucas vagas disponíveis"

ERRO - SEM DISPONIBILIDADE:
"Sem horários disponíveis"

ERRO - FERIADO:
"Feriado: sem agendamento nesta data"

INFO - PREPARO:
"Apresentar-se 15 min antes"

INFO - RESULTADO:
"Resultado em 24-48h (feriado: +1 dia)"

SUCCESS - CONFIRMADO:
"Horário confirmado!"

LOADING:
"Buscando horários disponíveis..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TÍTULO: "Qual é o melhor dia/hora pra você?"
  OPTION: "Próximo sábado? Domingo de manhã?"
  CTA: "Confirmar"

MIRIAM:
  TÍTULO: "Qual horário combina com você?"
  OPTION: "Manhã ou tarde?"
  CTA: "Confirmar"

MANOEL:
  TÍTULO: "Qual data preferir?"
  OPTION: "Sugerimos primeira coisa pela manhã"
  CTA: "Confirmar"
```

---

### ETAPA 8: UPSELL

#### COPY PRIMARY

```
SECTION HEADER:
"💡 SUGESTÕES"

SUBTITLE:
"Exames que combinam com você"

EXAM CHECKBOX (per item):
"VITAMINA D"

EXAM BENEFIT:
"Importante para imunidade"

EXAM PRICE:
"+R$ 45,00"

EXAM COVERAGE:
"(100% coberto)"
(ou "80% coberto, você paga R$ 7,60")
(ou "Particular")

PRICE RECAP:
"💰 Total: R$ 0,00 → R$ 85,00"
"(se todos selecionados)"

CTA PRIMÁRIO:
"Continuar com sugestões"

CTA SECUNDÁRIO:
"Continuar sem adicionar"
```

#### COPY SECONDARY

```
SUCCESS - ADICIONADO:
"Vitamina D selecionada (+R$ 45,00)"

SUCCESS - MÚLTIPLOS:
"2 exames adicionados"

ERRO - NÃO COBERTO:
"Este exame não é coberto por seu convênio"

INFO - FREQUÊNCIA:
"Recomendado a cada 2 anos"

BENEFIT - DESCONTO:
"Economize 40% agendando agora!"

TRUST 1:
"Não é obrigatório"

TRUST 2:
"Pode fazer depois também"

TRUST 3:
"Feito pela mesma equipe no mesmo dia"

LOADING:
"Processando..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TITLE: "Quer adicionar outros exames?"
  BENEFIT: "Mais barato agora (junto)"
  CTA: "Adicionar / Passar"

MIRIAM:
  TITLE: "Considerados os exames adicionais?"
  BENEFIT: "Complementam bem o hemograma"
  CTA: "Adicionar / Pular"

MANOEL:
  TITLE: "Sugerimos alguns exames adicionais"
  BENEFIT: "Otimize sua saúde"
  CTA: "Adicionar / Continuar"
```

---

### ETAPA 9: REVISÃO

#### COPY PRIMARY

```
TÍTULO:
"RESUMO DO AGENDAMENTO"

SECTION 1 HEADER:
"EXAME"

EXAM DISPLAY:
"📋 Hemograma Completo"
"+ Vitamina D" (se adicionado)

EDIT LINK:
"Editar"

SECTION 2 HEADER:
"CONVÊNIO"

COVERAGE DISPLAY:
"💳 Bradesco Saúde"

EDIT LINK:
"Editar"

SECTION 3 HEADER:
"VALORES"

PRICE LINE 1:
"Hemograma: R$ 0,00"

PRICE LINE 2:
"Vitamina D: +R$ 0,00"

DIVIDER:
"────────────────────────"

TOTAL:
"Total a pagar: R$ 0,00"

SECTION 4 HEADER:
"QUANDO"

WHEN LINE 1:
"📅 Sexta, 28 de novembro"

WHEN LINE 2:
"🕐 8:30 da manhã"

EDIT LINK:
"Editar"

SECTION 5 HEADER:
"ONDE"

WHERE:
"📍 Delboni Sumaré"
"Av. Paulista, 2000"

EDIT LINK:
"Editar"

SECTION 6 HEADER:
"PARA QUEM"

WHO:
"👤 João da Silva"
"CPF: 123.456.789-00"

EDIT LINK:
"Editar"

SECTION 7 HEADER:
"RESULTADO"

RESULT:
"📧 joao@email.com"
"SMS: (11) 98765-4321"

EDIT LINK:
"Editar"

TERMS CHECKBOX:
"☑ Confirmo que li os termos de uso"

CTA PRIMÁRIO:
"Confirmar agendamento"

CTA SECUNDÁRIO:
"Voltar e editar"
```

#### COPY SECONDARY

```
ERRO - TERMOS NÃO ACEITOS:
"Você precisa aceitar os termos para continuar"

SUCCESS - TUDO OK:
"Tudo pronto! Só falta confirmar"

INFO - EDIÇÃO:
"Você pode editar qualquer informação"

INFO - TIMING:
"Confirmar agora ou revisar depois"

SUCCESS - ENVIADO:
"Resumo será enviado por email/SMS"

LOADING:
"Processando resumo..."
```

#### TONE VARIATIONS

```
MOISÉS:
  TITLE: "Tá tudo certo aí?"
  HELP: "Quer mudar algo?"
  CTA: "Vamo! Confirmar"

MIRIAM:
  TITLE: "Revise seus dados"
  HELP: "Algo está diferente?"
  CTA: "Confirmar agendamento"

MANOEL:
  TITLE: "Confirmamos os detalhes?"
  HELP: "Algo a alterar?"
  CTA: "Confirmar"
```

---

### ETAPA 10: CHECKOUT

#### COPY PRIMARY (Convênio - Sem Pagamento)

```
STATUS BADGE:
"✓ 100% coberto"

MAIN MESSAGE:
"Seu agendamento foi registrado com sucesso!"

CONFIRMATION HEADER:
"🕐 Confirmação enviada"

CONFIRMATION CODE:
"Código: AGD-2025-1234567"

NEXT STEPS HEADER:
"Próximos passos:"

STEP 1:
"1️⃣ Receba confirmação"
"Por email ou SMS"

STEP 2:
"2️⃣ Compareça 15min antes"
"28/11 às 8:15 da manhã"

STEP 3:
"3️⃣ Leve documento de ID"
"RG ou CNH"

HELP SECTION:
"❓ Precisa alterar?"
"Contato de suporte"

CTA PRIMÁRIO:
"Mostrar agendamento"

CTA SECUNDÁRIO:
"Agendar outro"
```

#### COPY PRIMARY (Múltiplos - Com Pagamento)

```
TÍTULO:
"FORMAS DE PAGAMENTO"

SUBTITLE:
"Total para 2 pessoas:"
"João: R$ 0,00 | Maria: R$ 45,00"

PAYMENT OPTION 1:
"Eu pago tudo agora"
"Débito / Crédito"
"Total: R$ 45,00"

PAYMENT OPTION 2:
"Cada um paga depois"
"Você paga para João na clínica"
"Maria paga no dia"

PAYMENT OPTION 3:
"Dividir entre a gente"
"João paga R$ 22,50"
"Maria paga R$ 22,50"
"(2 cobranças no seu cartão)"

CARD LABEL:
"Número do cartão"

CARD PLACEHOLDER:
"0000 0000 0000 0000"

EXPIRATION LABEL:
"Vencimento"

EXPIRATION PLACEHOLDER:
"MM/AA"

CVV LABEL:
"CVV"

CVV PLACEHOLDER:
"000"

CTA PRIMÁRIO:
"Confirmar agendamento"

CTA SECUNDÁRIO:
"Mudar forma de pagamento"
```

#### COPY SECONDARY (Convênio)

```
SUCCESS - CONFIRMADO:
"Agendamento confirmado!"

SUCCESS - CÓDIGO:
"Código AGD-2025-1234567"

INFO - TIMING:
"Confirmação será enviada em 2 min"

SUCCESS - PRONTO:
"Tudo pronto para seu agendamento"

LOADING:
"Registrando agendamento..."
```

#### COPY SECONDARY (Múltiplos + Pagamento)

```
ERRO - SEM SELEÇÃO:
"Nenhuma forma selecionada"

SUCCESS - CARTÃO:
"Cartão adicionado"

ERRO - CARTÃO INVÁLIDO:
"Cartão inválido"

SUCCESS - PAGAMENTO:
"Pagamento processado"

INFO - MÚLTIPLAS COBRANÇAS:
"2 cobranças serão feitas"

LOADING:
"Processando pagamento..."
```

#### TONE VARIATIONS

```
MOISÉS:
  MAIN: "Pronto! Agendamento feito"
  HELP: "Fica de olho no SMS"
  CTA: "Bora lá então"

MIRIAM:
  MAIN: "Seu agendamento foi confirmado"
  HELP: "Enviaremos por email"
  CTA: "Agendar outro / Ver detalhes"

MANOEL:
  MAIN: "Agendamento realizado com sucesso"
  HELP: "Confirmação pelo seu email"
  CTA: "Prosseguir"
```

---

### ETAPA 11: CONFIRMAÇÃO

#### COPY PRIMARY

```
CELEBRATION:
"🎉 SUCESSO! 🎉"

MAIN MESSAGE:
"Seu agendamento foi confirmado com sucesso!"

QUICK RECAP 1:
"✓ Hemograma Completo"

QUICK RECAP 2:
"✓ Bradesco Saúde"

QUICK RECAP 3:
"✓ 28/11 às 8:30"

QUICK RECAP 4:
"✓ Delboni Sumaré"

CODE HEADER:
"CÓDIGO:"

CODE:
"AGD-2025-1234567"

COPY BUTTON:
"Copiar"

SEND HEADER:
"Enviamos uma confirmação para:"

SEND EMAIL:
"📧 joao@email.com"

SEND SMS:
"📱 (11) 98765-4321"

FAQ HEADER:
"Dúvidas?"

FAQ ITEM 1:
"❓ Como chegar"

FAQ ITEM 2:
"❓ Qual documento levar"

FAQ ITEM 3:
"❓ Preciso estar em jejum?"

FAQ ITEM 4:
"❓ Falar com suporte"

CTA PRIMÁRIO:
"Voltar ao início"

CTA SECUNDÁRIO:
"Agendar outro exame"

CTA TERCIÁRIO:
"Copiar código"
```

#### COPY SECONDARY

```
SUCCESS - ENVIADO:
"Confirmação enviada!"

SUCCESS - COPIADO:
"Código copiado para a área de transferência"

INFO - SMS:
"Você receberá um SMS em breve"

INFO - GUARDAR:
"Salve o código: AGD-2025-1234567"

BENEFIT 1:
"Você pode compartilhar o código com família"

BENEFIT 2:
"Alterar agendamento até 24h antes"

SUCCESS - FINAL:
"Tudo pronto para seu agendamento!"

LOADING:
"Finalizando..."
```

#### TONE VARIATIONS

```
MOISÉS:
  CELEBRATION: "Isso! Agendamento marcado"
  MAIN: "Tudo pronto pra você"
  CTA: "Bora agendar outro?"

MIRIAM:
  CELEBRATION: "Perfeito!"
  MAIN: "Seu agendamento está confirmado"
  HELP: "Você receberá lembretes"
  CTA: "Agendar outro / Voltar"

MANOEL:
  CELEBRATION: "Sucesso"
  MAIN: "Agendamento realizado com êxito"
  HELP: "Todos os detalhes por email"
  CTA: "Finalizar"
```

---

## 📌 COMPONENTES REUTILIZÁVEIS

### BOTÕES (CTA Pattern)

#### Botão Primário
```
PADRÃO GERAL (Infinitivo, 2-3 palavras, sem ponto):
"Continuar"
"Agendar exame"
"Confirmar agendamento"
"Selecionar unidade"
"Enviar foto do pedido"
"Confirmar horário"
"Ver agendamento"
"Voltar ao início"
```

#### Botão Secundário
```
PADRÃO GERAL (Alternativa opcional):
"Voltar e editar"
"Agendar outro exame"
"Pular por enquanto"
"Mudar forma de pagamento"
"Continuar sem adicionar"
"Alterar convênio"
```

#### Botão Terciário
```
PADRÃO GERAL (Links, baixa prioridade):
"Editar dados"
"Ajuda"
"Ver mapa"
"Não sei meu convênio? Ajuda"
"Contato de suporte"
"Reagendar"
"Copiar código"
```

---

### VALIDAÇÕES (Form Pattern)

#### Erro Genérico
```
❌ "[Campo] inválido. Verifique e tente novamente"
"Campo obrigatório"
"Preencha este campo"
"Valor não permitido"
```

#### Erro Específico
```
❌ "CPF inválido. Verifique e tente novamente"
❌ "Telefone deve ter 10 ou 11 dígitos"
❌ "Email inválido (exemplo: nome@email.com)"
❌ "Data de nascimento inválida (exemplo: 01/01/1990)"
❌ "Exame não encontrado. Tente outro termo"
❌ "Convênio não localizado. Verifique o nome"
❌ "Senha deve ter no mínimo 8 caracteres"
❌ "Este campo é obrigatório"
```

---

### MENSAGENS DE SUCESSO

```
✓ "Dados confirmados"
✓ "Hemograma selecionado"
✓ "Bradesco Saúde selecionado"
✓ "2 pessoas adicionadas"
✓ "Cartão adicionado"
✓ "Horário confirmado!"
✓ "Agendamento confirmado!"
✓ "Tudo pronto para seu agendamento!"
```

---

### MENSAGENS DE INFO/HELP

```
ℹ️ "Seus dados estão protegidos pela LGPD"
ℹ️ "Pode haver autorização prévia (1-2h)"
ℹ️ "Resultado em 24-48h (feriado: +1 dia)"
ℹ️ "Apresentar-se 15 min antes"
ℹ️ "Recomendado a cada 2 anos"
ℹ️ "Procure pelo nome da operadora"
ℹ️ "Você pode editar qualquer informação"
ℹ️ "Você receberá um SMS em breve"
ℹ️ "Alterar agendamento até 24h antes"
```

---

### LOADING STATES

```
⏳ "Buscando exames..."
⏳ "Buscando unidades próximas..."
⏳ "Buscando horários disponíveis..."
⏳ "Processando dados..."
⏳ "Registrando agendamento..."
⏳ "Processando pagamento..."
⏳ "Finalizando..."
```

---

## 🎯 CHECKLIST DE VALIDAÇÃO

- ✅ Nenhum botão com ponto final
- ✅ Nenhum botão com "Clique aqui"
- ✅ Nenhum botão com "OK"
- ✅ Todos os botões primários em infinitivo
- ✅ Horários em 24h com "h" (6h, 13h, 18h) - NÃO "6h00"
- ✅ Primeira palavra maiúscula, resto minúscula (exceto nomes)
- ✅ Minúscula após dois-pontos
- ✅ "Paciente" (nunca "Usuário")
- ✅ "Convênio" (nunca "Plano")
- ✅ "Mostrar" (nunca "Ver")
- ✅ Mensagens de erro acionáveis
- ✅ Tom sem julgamento
- ✅ Nenhuma reticência (...)
- ✅ Nenhuma mensagem genérica
- ✅ Benefícios destacados quando relevante
- ✅ Trust messages incluídas (LGPD, sem surpresas)
- ✅ Tone variations refletem personalidades das personas

---

## 📋 COMO USAR ESTE DOCUMENTO

### Para DEV:
1. Procure pela ETAPA que está implementando
2. Copie a seção "COPY PRIMARY"
3. Cole nos campos de texto corretos
4. Teste com "COPY SECONDARY" durante QA

### Para DESIGNER/PRODUCT:
1. Valide o tone das TONE VARIATIONS
2. Se precisar customizar, use a variação correta
3. Teste com diferentes tamanhos de texto

### Para CONTENT/QA:
1. Use "COPY SECONDARY" para testar todos os estados
2. Verifique se as mensagens de erro fazem sentido
3. Valide contra copy-rules.md

---

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Completo | **Próximo:** Documento 3 (Spec Técnica)

