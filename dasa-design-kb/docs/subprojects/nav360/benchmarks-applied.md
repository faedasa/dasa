---
title: Benchmarks Aplicados — Nav 360 Home Desktop
tags: [subproject, nav360, benchmarks]
updated: 2026-03-19
---

# Benchmarks Aplicados — Nav 360 Home Desktop

> Camada de aplicação produto-específica para o Nav 360. Documenta por que cada benchmark do `docs/research/benchmarks.md` foi selecionado e quais decisões de produto foram tomadas a partir dele.
>
> Para a análise produto-agnóstica de cada benchmark (padrões observáveis, links), consulte: `docs/research/benchmarks.md`
>
> Atualizado: mar 2026 · Contexto: redesign da home screen desktop (breakpoint primário 1280px+)

---

## Epic MyChart Web

### Por que é referência para o Nav 360

MyChart é o padrão de mercado de portais de paciente em desktop. A separação entre urgência operacional e consulta histórica é diretamente aplicável à hierarquia de módulos do Nav 360 — Próxima Data (ação imediata) à esquerda, Valores e Histórico (consulta) à direita. A lógica de accordion para resultados antigos foi adotada literalmente no protótipo.

**Decisão adotada:** Grid 60/40 — módulos de ação à esquerda, módulos de consulta à direita.

---

## Salesforce Health Cloud

### Por que é referência para o Nav 360

Salesforce Health Cloud demonstra que um dashboard de alta densidade pode ser navegável sem ser confuso. A separação de CTAs por contexto de módulo (em vez de CTA único global para todas as ações) foi aplicada no protótipo Nav 360: cada card tem seu próprio link de ação secundária, enquanto o CTA primário da tela inteira é único (Confirmar presença).

**Decisão adotada:** Cada card tem seu próprio link/botão secundário contextual; CTA primário global é único e dominante.

---

## One Medical (Amazon Health)

### Por que é referência para o Nav 360

One Medical é a referência mais próxima do que o Nav 360 quer ser: um portal de paciente que parece humano, não hospitalar. O padrão de home contextual (CTA muda conforme estado) foi adotado na arquitetura de informação do Nav 360 — quando não há data agendada, o CTA primário muda de "Confirmar presença" para "Agendar consulta".

**Decisão adotada:** Módulo 6 (Sugestão contextual) muda conforme perfil e histórico do paciente. Card hero muda de estado com base na existência ou ausência de agendamento ativo.

---

## Zocdoc

### Por que é referência para o Nav 360

O modelo de confirmação de presença do Zocdoc inspira diretamente a decisão de CTA primário do Nav 360. A ação "Confirmar presença" como botão dominante no card hero azul segue o mesmo padrão: alta visibilidade, feedback imediato, baixo atrito. O Zocdoc também demonstra que um único CTA dominante gera mais conversão do que uma tela com múltiplas ações equivalentes.

**Decisão adotada:** "Confirmar presença" como `btn-primary` da tela, posicionado no card hero com contraste máximo.

---

## Stripe Dashboard

### Por que é referência para o Nav 360

O módulo de Valores do Nav 360 usa o padrão Stripe: KPIs em cards no topo (coparticipação estimada, próximo vencimento), seguidos de barra de progresso (franquia utilizada) e CTA para detalhamento. A decisão de posicionar Valores na coluna direita — zona de leitura secundária em dashboard scan — também segue a lógica Stripe de separar "o que monitoro" (direita) de "o que faço agora" (esquerda).

**Decisão adotada:** Módulo 4 (Valores) na coluna direita com coparticipação em destaque no topo do módulo.

---

## Linear

### Por que é referência para o Nav 360

O padrão de progressive disclosure do Linear foi aplicado ao módulo de Resultados disponíveis: exibe os três mais recentes por padrão; itens mais antigos requerem ação explícita ("Mostrar todos"). Isso evita que a home se torne uma lista paginada. O tratamento de densidade — sem bordas pesadas, separação por espaçamento — também é aplicado nas listas de resultados e histórico do protótipo Nav 360.

**Decisão adotada:** Resultados disponíveis: 3 recentes visíveis + "Mostrar todos" como ação explícita. Separação de itens por espaçamento, sem bordas horizontais pesadas.

---

## Notion

### Por que é referência para o Nav 360

A filosofia da home como "ponto de orientação, não de trabalho" é a decisão mais importante na arquitetura do Nav 360. O paciente não vem à home para fazer tudo — vem para saber o que precisa fazer e ir direto para lá. Isso justifica a hierarquia: módulos de status (Próxima Data, Resultados, Pendências) à frente; módulos de consulta (Valores, Histórico) em posição secundária.

**Decisão adotada:** Hierarquia de módulos por urgência operacional. A home não tenta ser completa — é um ponto de partida.

---

## Airbnb Design Language System (DLS)

### Por que é referência para o Nav 360

O DLS da Airbnb não é referência visual — é referência metodológica. Os 4 princípios (**Unified, Universal, Iconic, Conversational**) funcionam como filtro de decisão: qualquer componente novo no Nav 360 pode ser avaliado contra eles.

- **Conversational** justifica a especificação de micro-interações no design (feedback de confirmação, transição de card para detalhe) em vez de deixá-las para engenharia resolver.
- **Universal** fundamenta a regra de labels sempre visíveis na sidebar — ícones sem legenda violam acessibilidade e aumentam carga cognitiva.

**Decisões adotadas:**
- Transição card → detalhe mantém referência visual do contexto (motion preserva orientação)
- Módulos com estrutura fixa e conteúdo variável por estado do paciente
- Labels sempre visíveis na sidebar — regra inegociável

---

## iClinic / Dr. Consulta — Anti-padrão nacional

### O que o Nav 360 deve evitar

| Problema identificado | Decisão do Nav 360 |
|---|---|
| Múltiplas ações primárias equivalentes | Uma ação primária dominante por tela ("Confirmar presença") |
| Terminologia técnica | Glossário obrigatório: "resultados disponíveis", "data", "valores" |
| Modais para detalhe | Progressive disclosure inline ou drawer lateral |
| Hierarquia visual plana | Gradação por cor, tamanho e posição (card hero × card secundário) |
| Ícones sem legenda | Labels sempre visíveis — regra inegociável do DS Dasa |

---

## Matriz de aplicação

| Benchmark | Padrão principal adotado | Onde no Nav 360 |
|---|---|---|
| Epic MyChart | Separação urgência × consulta | Grid 60/40: ações à esquerda, consulta à direita |
| Salesforce Health Cloud | CTA contextual por módulo | Cada card tem seu próprio link/botão secundário |
| One Medical | Home contextual (IA situacional) | Módulo 6: Sugestão contextual muda com perfil |
| Zocdoc | Confirmação como CTA dominante | "Confirmar presença" como btn-primary da tela |
| Stripe | KPIs financeiros + F-pattern | Módulo 4: Valores com coparticipação em destaque |
| Linear | Progressive disclosure inline | Resultados: 3 recentes + "Mostrar todos" |
| Notion | Home como orientação, não trabalho | Hierarquia de módulos por urgência operacional |
| Airbnb DLS | Motion preserva contexto cognitivo | Transição card → detalhe mantém referência visual |
| Airbnb DLS | Componentes com propósito declarado | Módulos com estrutura fixa e conteúdo variável |
| iClinic / DrConsulta | Anti-padrão de ações equivalentes | Regra: uma ação primária, hierarquia visual clara |

---

## Hipóteses a validar

As decisões documentadas neste arquivo são hipóteses de produto baseadas em benchmark, não verdades validadas. Seguindo o princípio de co-design da Airbnb (`docs/research/airbnb-dls.md`): benchmark gera hipóteses, pesquisa com usuários as valida.

| Hipótese | Base | Status |
|---|---|---|
| "Confirmar presença" é a ação mais importante da home | Padrão Zocdoc + ausência de dado contrário | Não validado |
| Grid 60/40 (ações esquerda, consulta direita) funciona para o paciente Dasa | Padrão MyChart + eye-tracking genérico | Não validado |
| 3 resultados recentes é o número certo antes do "Mostrar todos" | Padrão Linear + hipótese de relevância temporal | Não validado |
| Home contextual (CTA muda com estado) reduz atrito | Padrão One Medical | Não validado |

---

*dasa-design-kb · `docs/subprojects/nav360/` · Uso interno*
