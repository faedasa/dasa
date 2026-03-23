---
title: Benchmarks — Dashboard Denso / Portal de Paciente
tags: [research, ux, benchmarks]
updated: 2026-03-19
---

# Benchmarks — Dashboard Denso / Portal de Paciente

> Análise de padrões observáveis em produtos de referência para design de dashboards com alta densidade de informação e portais de paciente. Cada produto é documentado de forma produto-agnóstica; a aplicação a subprojects específicos da Dasa fica nos arquivos `benchmarks-applied.md` dentro de cada subproject.
>
> Atualizado: mar 2026 · dasa-design-kb · `docs/research/`

---

## Escopo de uso

**Consulte este documento quando o produto em questão for:**

- Área logada com múltiplos módulos independentes em uma única tela (dashboard home)
- Portal de paciente com KPIs, status clínico, histórico e ações em coexistência
- Produto SaaS com alta densidade de informação em desktop
- Futuras áreas logadas Dasa: histórico de saúde do paciente, portal do médico, área de plano

**Não consulte este documento para:**

- Fluxo de agendamento step-by-step (wizard/funnel — lógica de staged disclosure, não dashboard)
- Tela de busca e seleção de exames (lógica de search UX e product listing)
- Página de detalhe de um resultado ou exame individual (conteúdo linear, não multi-módulo)
- Onboarding de novos usuários (progressão guiada, sem densidade)
- Site institucional Dasa, landing pages ou páginas de marketing (sem área logada)
- Formulários de cadastro, checkout ou confirmação (contexto transacional, fluxo único)
- Notificações, comunicações push ou e-mail (microcopy e engajamento, não layout)
- Apps com navegação linear entre telas (sem densidade de painel)

---

## Critérios de seleção

Os benchmarks foram selecionados a partir de três eixos:

1. **Healthtech + portal de paciente** — produtos com jornada de navegação clínica e gestão de informações de saúde pessoal
2. **SaaS dashboard denso e bem resolvido** — produtos com alta densidade de informação em desktop sem sacrificar usabilidade
3. **Anti-padrão nacional** — referências do mercado brasileiro que evidenciam o gap de qualidade que portais de saúde devem superar

---

## 1. Epic MyChart Web

**Categoria:** Healthtech · Portal de paciente · EUA

**Link:** [mychart.com](https://www.mychart.com) · [Epic.com — MyChart overview](https://www.epic.com/software/mychart)

### Padrões observáveis

- **Hierarquia clínica explícita**: a home separa visualmente "o que fazer agora" (upcoming appointments, pending actions) de "o que consultar" (test results, messages). Essa distinção é arquitetural — não estética, é cognitiva.
- **Cards modulares com densidade controlada**: cada módulo tem um único propósito declarado no título e expõe apenas o mínimo necessário. Expansão de detalhe ocorre in-place ou em drawer lateral, nunca em nova página.
- **Navegação lateral persistente com labels**: sidebar sempre visível em desktop. Ícones jamais aparecem sem legenda — padrão de acessibilidade e redução de carga cognitiva.
- **Status badges com semântica de cor**: resultados novos, pendências e confirmações usam cores funcionais consistentes (verde = concluído, amarelo = aguardando, vermelho = ação necessária). A cor não é decorativa.
- **Progressive disclosure por accordion**: histórico de resultados anteriores colapsa automaticamente; o paciente acessa volume completo quando solicita. Evita sobrecarga na leitura inicial.

---

## 2. Salesforce Health Cloud

**Categoria:** Healthtech · CRM clínico · Enterprise

**Link:** [salesforce.com/health](https://www.salesforce.com/solutions/industries/healthcare/health-cloud/) · [Demo pública — Trailhead](https://trailhead.salesforce.com/pt-BR/content/learn/modules/health_cloud_basics)

### Padrões observáveis

- **360° patient view**: layout de múltiplas colunas com timeline do paciente à direita e painel de ações à esquerda. Padrão de visão integrada que informa o conceito de "360" em portais de saúde.
- **Cards de ação contextual no topo de cada módulo**: cada card tem seu próprio CTA posicionado no canto superior direito do módulo — nunca CTAs globais que tentam resolver múltiplas necessidades. Reduz ambiguidade de qual ação pertence a qual contexto.
- **Timeline como eixo de leitura**: eventos clínicos passados e futuros são organizados em linha do tempo vertical no painel lateral. Ordem cronológica reversa, conteúdo mínimo por evento.
- **Sidebar com agrupamento funcional**: navegação lateral agrupa itens por domínio (clínico, administrativo, financeiro), não por frequência de acesso. O agrupamento semântico reduz busca cognitiva.

---

## 3. One Medical (Amazon Health)

**Categoria:** Healthtech · Portal de paciente · EUA

**Link:** [onemedical.com](https://www.onemedical.com) · [App Store preview](https://apps.apple.com/us/app/one-medical/id393841665)

### Padrões observáveis

- **Home contextual (não estática)**: a home se reconfigura com base no estado do paciente. Se não há consulta agendada, o CTA dominante é agendar. Se há resultado disponível, o resultado sobe na hierarquia. Não existe uma home fixa — existe uma home situacional.
- **Tom humano em contexto clínico**: copywriting em primeira pessoa, sem jargão técnico. "Seus resultados estão prontos" em vez de "Laudo disponível". Linguagem próxima reduz a distância emocional em contextos de saúde.
- **Cards de sugestão clínica não intrusivos**: sugestões baseadas em histórico e sazonalidade (vacina de gripe, check-up anual) aparecem em posição secundária — nunca bloqueiam o fluxo principal.
- **Notificações com badge de urgência**: diferenciação visual entre "informativo" e "ação necessária" dentro do mesmo sistema de notificações. Badges críticos apenas para itens que exigem resposta do paciente.

---

## 4. Zocdoc

**Categoria:** Healthtech · Agendamento + portal · EUA

**Link:** [zocdoc.com](https://www.zocdoc.com) · [Zocdoc — como funciona](https://www.zocdoc.com/about/howitworks)

### Padrões observáveis

- **Ação primária dominante na dobra**: a tela inicial tem uma única ação primária em destaque absoluto. Não há competição visual com ações secundárias.
- **Confirmação de presença como momento de engajamento**: o fluxo de appointment reminder usa cards de confirmação com alto contraste e CTA proeminente. Feedback visual imediato após a ação (check, mudança de cor).
- **Navegação simplificada em desktop**: top nav com poucos itens, sem sidebar — viável porque o produto tem menos domínios do que portais de saúde completos. Referência negativa para produtos com múltiplos domínios.
- **Filtros como ação secundária inline**: filtros e refinamentos aparecem dentro do contexto da lista, nunca em modal separado. Reduz o número de interações para completar uma tarefa.

---

## 5. Stripe Dashboard

**Categoria:** SaaS · Dashboard financeiro · Global

**Link:** [stripe.com/dashboard](https://stripe.com/dashboard) · [Stripe — Design system (artigo)](https://stripe.com/blog/payment-api-design)

### Padrões observáveis

- **F-pattern com KPIs no quadrante superior esquerdo**: os números mais importantes (volume, transações, tendência) ficam no canto superior esquerdo — exatamente onde o olho inicia o scan em desktop. Documentado em research de eye-tracking de dashboards.
- **Tabelas densas com hierarquia tipográfica**: listas de transações usam peso de fonte, tamanho e cor para comunicar hierarquia sem adicionar separadores visuais pesados. Linhas são separadas por espaçamento, não por bordas grossas.
- **Ações contextuais por linha, não globais**: cada item de lista tem suas próprias ações (expandir, reembolsar, copiar) acessíveis via hover ou menu de contexto. Ações globais ficam no topo da tela, separadas visualmente.
- **Filtros temporais persistentes**: período de análise é sempre visível e modificável sem recarregar a página. Estado do filtro ativo é comunicado no título do módulo.

---

## 6. Linear

**Categoria:** SaaS · Gestão de projetos · Global

**Link:** [linear.app](https://linear.app) · [Linear — método de produto (blog)](https://linear.app/method)

### Padrões observáveis

- **Progressive disclosure inline**: issues expandem em painel lateral sem mudar de rota ou abrir modal. O usuário mantém o contexto da lista enquanto lê o detalhe. Elimina o "onde estava eu?" ao retornar de uma ação.
- **Densidade de informação sem ansiedade visual**: dezenas de itens em tela sem sobrecarga. A receita: tipografia compacta, espaçamento consistente, ausência de bordas desnecessárias, uso de cor apenas para status.
- **Sidebar com estados de carregamento graciosos**: skeleton screens durante carregamento — nunca spinners globais que travam a interface inteira. Partes da tela que já carregaram ficam interativas enquanto outras ainda carregam.
- **Atalhos de teclado como primeira classe**: toda ação tem atalho, visível nos tooltips. Para um produto usado diariamente, o mouse é o caminho mais lento.

---

## 7. Notion

**Categoria:** SaaS · Gestão de conhecimento · Global

**Link:** [notion.so](https://www.notion.so) · [Notion — design principles (Figma Community)](https://www.figma.com/community/file/818983045400595874)

### Padrões observáveis

- **Home como ponto de orientação espacial, não de trabalho**: a homepage do Notion não é onde o usuário trabalha — é onde ele se localiza antes de ir para onde quer trabalhar. A home oferece os pontos de entrada mais relevantes, não tenta conter tudo.
- **Conteúdo recente como atalho cognitivo**: "Recentemente visitados" e "Favoritos" reduzem o custo de navegação para usuários frequentes. Exibir os itens mais recentes (não os mais importantes em sentido absoluto) reduz o tempo até o conteúdo relevante para a maioria dos casos de uso.
- **Sidebar como mapa do sistema**: a sidebar não é só navegação — é uma representação visual da estrutura do produto. Ver os itens da sidebar é entender o que o produto faz.

---

## 8. Airbnb Design Language System (DLS)

**Categoria:** Design system · Metodologia de produto · Global

**Links:** [Building a Visual Language (Medium)](https://medium.com/airbnb-design/building-a-visual-language-behind-the-scenes-of-our-airbnb-design-system-224748775e4e) · [DLS — Karri Saarinen](https://karrisaarinen.com/dls/)

### Padrões observáveis

- **Componentes com propósito declarado, não átomos livres**: a Airbnb rejeitou o Atomic Design. Componentes têm função, personalidade e elementos obrigatórios/opcionais fixos. Um componente mal usado é um componente mal definido — a falha está na especificação, não em quem usa.
- **Linguagem simples como critério de qualidade**: referenciando Christopher Alexander — *"nothing which is not simple and direct can survive the slow transmission from person to person"*. Se uma regra de design precisa de explicação longa, é uma regra ruim.
- **Motion como preservação de contexto cognitivo**: transições não são decoração — são a forma do produto comunicar "você está aqui, e agora vai para lá". Transição ausente força o usuário a reconstruir contexto do zero após cada navegação.
- **Acessibilidade como especificidade**: o filtro de acessibilidade da Airbnb passou de uma categoria genérica ("cadeira de rodas") para 21 categorias específicas. "Acessível" sem detalhe é inútil.
- **Adoção como feature do sistema**: um design system que ninguém usa é um design system fracassado. A adesão dos times precisa ser projetada com o mesmo cuidado que os componentes.

Os 4 princípios do DLS — **Unified, Universal, Iconic, Conversational** — funcionam como filtro de decisão para avaliação de qualquer componente novo.

> Referência completa: `docs/research/airbnb-dls.md`

---

## 9. iClinic / Dr. Consulta — Anti-padrão nacional

**Categoria:** Healthtech · Prontuário + agendamento · Brasil

**Link:** [iclinic.com.br](https://www.iclinic.com.br) · [DrConsulta — portal do paciente](https://www.drconsulta.com)

### Padrões problemáticos

- **Múltiplas ações primárias equivalentes**: a home tenta resolver agendamento, histórico, comunicação e pagamento com botões de igual hierarquia visual. O paciente não sabe onde olhar primeiro.
- **Terminologia clínica sem adaptação**: "laudo", "prontuário digital", "solicitação de exame" aparecem sem contextualização para o paciente leigo.
- **Modais para tudo**: detalhes de exame, confirmação de data, informações de preparo — todos em modal sobreposto. A navegação fica opaca; o paciente não sabe em que "página" está.
- **Hierarquia visual plana**: cards com o mesmo peso visual para conteúdo urgente (pendência com prazo) e conteúdo informativo (histórico de dois anos atrás). A urgência não é comunicada visualmente.
- **Labels de navegação abreviados**: ícones sem legenda em mobile, e alguns sem legenda em desktop. Obriga o paciente a explorar para entender o que cada seção faz.

---

## Referências de pesquisa relacionadas

- [NN/g — Dashboards: Making Charts and Graphs Easier to Understand](https://www.nngroup.com/articles/dashboards-preattentive/) — preattentive processing, F-pattern, anti-padrões visuais em dashboards → `docs/research/ux-dashboard-patterns.md`
- [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) — quando e como aplicar colapso de conteúdo → `docs/research/progressive-disclosure.md`
- [WCAG 2.1 — Success Criterion 2.5.5](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) — base do requisito de touch target ≥ 44px → `docs/research/accessibility-touch-targets.md`

---

*dasa-design-kb · `docs/research/` · Uso interno*
