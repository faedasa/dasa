# Fluxos de Agendamento v2.1 - Visualização Executiva

Data: 2025-11-19 | Versão: 2.1 | Status: Pronto para Apresentação

---

## FLUXO 1: PARA MIM MESMO
(9 etapas - 3-4 minutos - Complexidade: Baixa)

⁕ 1. BUSCA DE EXAME
→ Hemograma, COVID, Checkup
→ Você digita ou seleciona
→ Resultado mostra "Preço a consultar"

⁕ 2. CONVÊNIO FIRST
→ Tem convênio? Sim/Não
→ Se sim: qual? (dropdown de convênios salvos)
→ Validar cobertura em tempo real

⁕ 3. PREÇOS ATUALIZADOS
→ Exame + Preço final (baseado em convênio)
→ Indicador: "100% coberto" / "80% coberto" / "Particular"
→ Co-participação, se houver

⁕ 4. IDENTIFICAÇÃO (Confirmar) - NOVO
→ Seus dados (já logado)
→ Sistema auto-preenche
→ Você confirma ou edita

⁕ 5. BUSCA DE UNIDADES - NOVO
→ VALIDADA para você
→ Sistema já sabe: convênio, idade, restrições
→ Filtro: Coleta em casa / Unidade presencial
→ Filtro: Urgência (rotina/urgente)
→ Mostra APENAS slots válidos
→ Smart default: última unidade usada

⁕ 6. DATA/HORÁRIO
→ Calendário visual
→ Horários disponíveis
→ Respeitando urgência/coleta

⁕ 7. UPSELL INTELIGENTE
→ Baseado em: idade, gênero, histórico, exame selecionado
→ Sugestões de exames/vacinas complementares
→ Não bloqueante (fácil pular)
→ Exemplo: "Hemograma? Que tal também Colesterol?"

⁕ 8. PAGAMENTO
→ Convênio ou Particular
→ Exibir valor final
→ Opções de pagamento (cartão, boleto, débito)
→ Confirmar dados de cobrança

⁕ 9. CONFIRMAÇÃO
→ Revisar tudo (exame, local, data/hora, preço)
→ Confirmação com QR code + lembretes
→ Opção de compartilhar agendamento

---

## FLUXO 2: PARA OUTRA PESSOA
(10 etapas - 5-6 minutos - Complexidade: Média)

⁕ 1. BUSCA DE EXAME
→ Hemograma, COVID, etc.
→ Resultado mostra "Preço a consultar"
→ Sem informações de terceiro ainda

⁕ 2. CONVÊNIO FIRST
→ Tem convênio? Sim/Não
→ Se sim: qual?
→ Se é dependente: Titular é você ou outra pessoa?
→ Validar cobertura em tempo real

⁕ 3. PREÇOS ATUALIZADOS
→ Exame + Preço final (baseado em convênio escolhido)
→ Indicador: "100% coberto" / "80% coberto" / "Particular"
→ Transparência total

⁕ 4. PARA QUEM? - NOVO
→ Nome completo
→ CPF
→ Data de nascimento (detecta automaticamente se < 18)
→ Identidade de gênero
→ Parentesco (pai/mãe/filho/cônjuge/outro)
→ Se < 18: Ativa fluxo especial com termo/responsável

⁕ 5. IDENTIFICAÇÃO DO AGENDADOR - NOVO
→ Confirmar seus dados (já logado)
→ Atualizar profiling com contexto atual
→ Relação: Você é responsável? Sim/Não

⁕ 6. BUSCA DE UNIDADES - NOVO
→ VALIDADA para terceiro
→ Sistema já sabe: dados da pessoa, convênio, restrições, idade
→ Filtro: Coleta em casa / Unidade presencial
→ Filtro: Urgência (rotina/urgente)
→ Mostra APENAS unidades compatíveis
→ Smart default: última unidade usada por você

⁕ 7. DATA/HORÁRIO
→ Calendário visual
→ Horários disponíveis
→ Respeitando restrições do terceiro

⁕ 8. UPSELL INTELIGENTE
→ Baseado em: idade de terceiro, gênero, histórico, exame
→ Sugestões personalizadas para quem vai fazer
→ Não bloqueante
→ Exemplo: "Maria tem 45 anos? Que tal também TSH?"

⁕ 9. PAGAMENTO
→ Convênio da terceira pessoa ou Particular
→ Exibir valor final e co-participação (se houver)
→ Opções de pagamento (cartão, boleto, débito)
→ Confirmar responsável pelo pagamento

⁕ 10. CONFIRMAÇÃO
→ Revisar tudo (seu nome, Maria, exames, preço)
→ Notificações duplas ativadas (você + paciente)
→ Confirmação com QR codes individuais
→ Enviar link de acesso para a terceira pessoa

---

## FLUXO 3: PARA MÚLTIPLAS PESSOAS
(10 etapas - 7-9 minutos - Complexidade: Alta)

⁕ 1. BUSCA DE EXAME(S)
→ Hemograma, COVID, etc.
→ Resultado mostra "Preço a consultar"
→ Sem informações de grupo ainda

⁕ 2. CONVÊNIO FIRST
→ Todos têm mesmo convênio? Sim/Não
→ Se não: como é a cobertura de cada um?
→ Alguns têm convênio próprio
→ Alguns são seus dependentes
→ Alguns vão pagar particular
→ Validar cobertura individual em tempo real

⁕ 3. PREÇOS INDIVIDUALIZADOS
→ Por pessoa: Exame + Preço final
→ Total do grupo com descontos aplicados
→ Breakdown: "João R$60 + Maria R$105 - Desconto 10% = R$148,50"
→ Transparência total

⁕ 4. ESTRATÉGIA DE AGENDAMENTO - NOVO POSIÇÃO
→ Juntos (mesma hora) → Mais rápido, menos opções
→ Próximos (±30 min) → Equilíbrio
→ Flexível → Máxima disponibilidade

⁕ 5. PARA QUEM? - NOVO
→ Quantidade já conhecida
→ Por cada pessoa:
→ Nome completo
→ CPF
→ Data de nascimento (detecta < 18)
→ Identidade de gênero
→ Parentesco (pai/mãe/filho/cônjuge/outro)
→ Se algum < 18: Sistema alerta

⁕ 6. BUSCA DE UNIDADES - NOVO POSIÇÃO
→ VALIDADA para TODO GRUPO
→ Sistema já sabe:
→ Convênios de cada um (pode ser misto)
→ Idades (detecta menores)
→ Restrições de cada pessoa
→ Estratégia (juntos/próximos/flexível)
→ Filtro: Coleta em casa / Unidade presencial
→ Filtro: Urgência (rotina/urgente)
→ Mostra APENAS unidades compatíveis com TODOS
→ Smart default: última unidade usada por você

⁕ 7. DATA/HORÁRIO
→ Calendário visual
→ Horários sincronizados conforme estratégia
→ Respeita restrições de todos

⁕ 8. UPSELL INTELIGENTE (Por Pessoa)
→ Para João (45 anos): "Quer adicionar Colesterol?"
→ Para Maria (42 anos): "Quer adicionar Vitamina D?"
→ Para Pedro (15 anos): "Quer adicionar Vacina HPV?"
→ Personalizado por idade/gênero/histórico
→ Não bloqueante

⁕ 9. PAGAMENTO
→ Eu pago por todos
→ Cada um paga o seu (links individuais)
→ Dividir igualmente
→ Todos precisam confirmar pagamento

⁕ 10. CONFIRMAÇÃO
→ Revisar tudo (cada pessoa, seus exames, preços)
→ Notificações individuais ativadas
→ Pagamento confirmado
→ Confirmação com QR codes individuais por pessoa

---

## RESUMO DAS MUDANÇAS (NOVO em v2.1)

FLUXO 1: (9 etapas - antes 8)
→ Etapa 4: Identificação agora ANTES de unidades
→ Etapa 5: Busca de unidades validada para você
→ Etapa 8: PAGAMENTO como etapa separada (novo)
→ Etapa 9: CONFIRMAÇÃO apenas para revisar + QR code
→ Resultado: Sistema mostra apenas slots válidos, fluxo de pagamento explícito

FLUXO 2: (10 etapas - antes 9)
→ Etapa 4: Para Quem? reduzido (nome, CPF, nascimento, gênero, parentesco)
→ Etapa 5: Identificação do Agendador (separado)
→ Etapa 6: Busca de unidades validada para terceiro
→ Etapa 9: PAGAMENTO como etapa separada (novo)
→ Etapa 10: CONFIRMAÇÃO apenas para revisar + QR codes
→ Resultado: Sistema respeita convênio, idade, restrições, fluxo de pagamento explícito

FLUXO 3: (10 etapas - antes 11)
→ Etapa 4: Estratégia de agendamento (continua antes)
→ Etapa 5: Para Quem? reduzido (nome, CPF, nascimento, gênero, parentesco)
→ Etapa 6: Busca de unidades validada para TODO GRUPO
→ Etapa 9: PAGAMENTO com opções flexíveis (Eu pago / Cada um paga / Dividir)
→ Etapa 10: CONFIRMAÇÃO apenas para revisar
→ Resultado: Fluxo com 10 etapas (antes 11), mais direto, pagamento centralizado

---

## GANHO PRINCIPAL

Antes: Sistema mostrava todos os slots. Depois descobria incompatibilidades (menor de idade, sem cobertura, etc).

Depois: Sistema valida TUDO antes de buscar. Mostra APENAS slots que realmente funcionam.

Menos fricção. Melhor experiência.

---

Prepared for: Apresentação Executiva
Status: Pronto para Apresentação
Versão: 2.1
Data: 2025-11-19
