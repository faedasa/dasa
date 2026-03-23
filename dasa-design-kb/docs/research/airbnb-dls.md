---
title: Design Systems — Airbnb DLS: Referência Consolidada
tags: [research, design-system]
updated: 2026-03-19
---

# Design Systems — Airbnb DLS: Referência Consolidada

> Referência de pesquisa extraída de fontes públicas da Airbnb: artigos no Medium, palestras em conferências e repositórios abertos. Foco em princípios metodológicos de design system, não em catálogo visual.
>
> Fontes primárias: [medium.com/airbnb-design](https://medium.com/airbnb-design) · [medium.com/airbnb-engineering](https://medium.com/airbnb-engineering)
> Atualizado: mar 2026 · dasa-design-kb · `docs/research/`

---

## Escopo de uso

**Consulte este documento quando precisar de:**

- Princípios para avaliar decisões de arquitetura de design system (DS Dasa)
- Argumentação para cross-platform por arquitetura (desktop/mobile compartilhando estrutura)
- Definição de padrões de motion e micro-interações com justificativa de produto
- Acessibilidade como especificidade — não como compliance genérico
- Referência para adoção de design system como feature, não como obrigação

**Não consulte este documento para:**

- Escolhas visuais táticas (tokens, cores, tipografia, espaçamento) → consultar `docs/design-system.md`
- Decisões de componentes visuais específicos → consultar `docs/design-system.md`
- Regras de copy e linguagem → consultar `docs/copy-rules.md`

---

## Por que estudar o DLS da Airbnb

A Airbnb não possui um portal público de design system ao estilo do Material Design ou IBM Carbon. O que existe é conhecimento distribuído em artigos, palestras e código open source. Ainda assim, o DLS é uma das referências mais citadas da indústria — não pelo que documenta publicamente, mas pela qualidade das decisões que descreve.

O DLS serve como referência **metodológica**: como pensar um sistema de design que escala entre times, plataformas e contextos — não apenas como um catálogo de componentes.

---

## Os 4 Princípios do DLS

Fonte: [Building a Visual Language — Karri Saarinen, Airbnb Design (Medium, 2016)](https://medium.com/airbnb-design/building-a-visual-language-behind-the-scenes-of-our-airbnb-design-system-224748775e4e)

| Princípio | Definição original | Implicação prática |
|---|---|---|
| **Unified** | "Each piece is part of a greater whole and should contribute positively to the system at scale. There should be no isolated features or outliers." | Nenhum componente existe de forma isolada. Toda adição ao sistema deve ser pensada em relação ao todo — como ela afeta os outros componentes, como se comporta em escala. |
| **Universal** | "Airbnb is used around the world by a wide global community. Our products and visual language should be welcoming and accessible." | Acessibilidade não é feature opcional — é critério de existência do componente. WCAG AA como piso, não como teto. |
| **Iconic** | "We're focused when it comes to both design and functionality. Our work should speak boldly and clearly to this focus." | Foco e clareza acima de riqueza visual. Cada elemento precisa justificar sua presença. O que pode ser removido, deve ser. |
| **Conversational** | "Our use of motion breathes life into our products, and allows us to communicate with users in easily understood ways." | Motion não é decoração — é linguagem. Transições comunicam hierarquia, contexto e estado. |

---

## Decisões arquiteturais do DLS

### 1. Componentes como organismos, não átomos

A Airbnb rejeitou o Atomic Design como base do DLS. A razão é prática: átomos livres criam moléculas arbitrárias, que criam inconsistência na escala.

> "Instead of relying on individual atoms, we started considering our components as elements of a living organism. They have a function and personality, are defined by a set of properties, can co-exists with others and can evolve independently."

**O que isso significa:** cada componente tem um propósito declarado, elementos obrigatórios (título, texto, ícone, imagem) e elementos opcionais. Um componente mal usado é um componente mal definido — a falha está na especificação, não no usuário do sistema.

---

### 2. A linguagem como critério de qualidade

A analogia mais citada do DLS vem do urbanista Christopher Alexander, referenciado no artigo [The Way We Build (2016)](http://airbnb.design/the-way-we-build/):

> "When language is shared, the individual patterns in the language are profound. Nothing which is not simple and direct can survive the slow transmission from person to person."

**O que isso significa:** se um padrão não consegue ser comunicado de forma simples entre times, ele não é um bom padrão. Complexidade no sistema é sinal de falha de design, não de sofisticação.

As regras de hierarquia visual de qualquer produto devem ser comunicáveis em uma frase. Se exigem explicação longa, o padrão está mal definido.

---

### 3. Unificação como acelerador de velocidade

> "A unified design system is essential to building better and faster; better because a cohesive experience is more easily understood by our users, and faster because it gives us a common language to work with."

A Airbnb documentou ganhos concretos: com o DLS, o time conseguiu criar ~50 telas de protótipo em algumas horas. O design review deixou de discutir padding e escolha de cor para focar em conceito e experiência.

**Implicação:** a decisão de usar componentes do DS (e não criar ad-hoc) não é limitação criativa — é o que permite velocidade sem regressão de qualidade.

---

### 4. Cross-platform por design, não por acidente

O DLS é platform-agnostic por princípio: os mesmos componentes funcionam em iOS, Android e tablet. A distinção existe apenas onde as plataformas exigem (navegação nativa, iconografia de sistema, interações de contexto).

> "We look for design solutions that feel at home across platforms and follow conventions on important elements like navigation, system iconography, contextual actions, and interactions."

**Implicação:** versões desktop e mobile de um produto devem compartilhar os mesmos módulos e a mesma hierarquia de informação. A adaptação é de layout, não de arquitetura de informação.

---

## Motion como linguagem

### Lottie — ferramenta open source de animação

Fonte: [Introducing Lottie — Airbnb Tech Blog (Medium, 2017)](https://medium.com/airbnb-engineering/introducing-lottie-4ff4a0afac0e)

A Airbnb criou e open-sourceu o **Lottie** — biblioteca que renderiza animações do After Effects (exportadas via Bodymovin em JSON) nativamente em iOS, Android, React Native e Web, sem reescrever código de animação manualmente.

**Por que isso é relevante como princípio:** a decisão de criar o Lottie explicita a postura da Airbnb sobre motion — animação é de primeira classe, não afterthought. Se construir animações era caro demais, a solução foi criar uma ferramenta melhor, não remover as animações.

Micro-interações (feedback de confirmação, transição de estado de cards) devem ser especificadas no design — não deixadas para engenharia resolver. O princípio **Conversational** começa no arquivo de design.

---

### Motion Engineering at Scale

Fonte: [Motion Engineering at Scale — Cal Stephens, Airbnb Tech Blog (Medium, 2022)](https://medium.com/airbnb-engineering/motion-engineering-at-scale-5ffabfc878)

Em 2022, a Airbnb publicou como construiu um framework declarativo para transições em iOS — em vez de centenas de linhas de código imperativo por transição, o time define apenas os estados inicial e final de cada elemento.

> "Motion is a key part of what makes a digital experience both easy and delightful to use. Fluid transitions between states and screens are key for helping the user preserve context as they navigate throughout a feature."

**Princípio central:** transição é contexto. Quando o usuário navega entre telas, uma transição bem feita preserva o senso de "onde estou". Uma transição ausente força o usuário a reconstruir o contexto do zero.

---

## Acessibilidade como prática de design

### Co-design com usuários com deficiência

Fonte: [Designing for Access — Nanako Era et al., Airbnb Design (Medium, 2017)](https://medium.com/@nanako.era/designing-for-access-creating-new-features-for-guests-with-disabilities-d56b9f988a2c)

A Airbnb expandiu o filtro de acessibilidade de "cadeira de rodas" para um sistema de 21 categorias específicas (banheiro, quarto, entrada, piscina). A mudança veio de research etnográfico com hóspedes com deficiência — não de uma decisão top-down de compliance.

**Princípio central:** acessibilidade é especificidade. "Acessível" sem detalhe é inútil. Aplicado a qualquer produto: informações que o usuário precisa para tomar uma decisão devem ser específicas e visíveis, não enterradas em PDFs ou modais secundários.

---

### Acessibilidade em Android

Fonte: [Making Airbnb's Android App More Accessible — Julia Fu, Airbnb Tech Blog (Medium, 2023)](https://medium.com/airbnb-engineering/making-airbnbs-android-app-more-accessible-75618172be6)

Práticas documentadas publicamente:

- **Content descriptions** em todos os elementos interativos não-textuais
- **Agrupamento de conteúdo relacionado** para screen readers (um card = um elemento navegável, não 5 separados)
- **Suporte a font scale grande** sem quebrar layouts
- **Nomes de seção e página** para orientação com TalkBack/VoiceOver

Cada card interativo precisa ter um `aria-label` que descreva o contexto completo ao ser lido em voz alta — não apenas o label do botão isolado.

---

## Co-design com usuários

Fonte: [Co-designing with Hosts at Airbnb — Jenny Arden, Airbnb Design (Medium)](https://medium.com/airbnb-design/co-designing-with-hosts-e1f0d389f4ee)

A Airbnb documentou seu processo de co-design para o redesign do app mobile. A descoberta central: **comunicação em tempo real é o critério mais importante** para o sucesso de uma experiência de hospedagem — a ponto de virar critério de Superhost.

> "Timely communication is vital to successful Airbnb experiences."

**Princípio extraído:** descobertas de research que parecem óbvias após o fato só emergem ao observar o comportamento real dos usuários. Benchmark gera hipóteses — pesquisa etnográfica as valida ou refuta.

---

## Palestras públicas

### Building a Design System That Could Take on the World
**Karri Saarinen — Design Systems Conference, Helsinki 2018**

Abordagem cross-platform em escala. Como o DLS migrou de ferramenta interna para sistema usado por dezenas de times.

**Ponto central:** um design system que ninguém usa é um design system fracassado. A adoção é uma feature do sistema — precisa ser projetada com o mesmo cuidado que os componentes.

---

### Systematic Cross-Platform Design
**Karri Saarinen — Vimeo, 2018**
[vimeo.com/280588008](https://vimeo.com/280588008)

Como o DLS resolve o problema de criar experiências coerentes em iOS, Android e Web sem triplicar o trabalho.

**Ponto central:** "design once, adapt everywhere" — o mesmo componente tem variações de plataforma, não versões completamente diferentes. A diferença está na interação e na convenção de navegação, não na arquitetura de informação.

---

### The Future of Design Systems
**Hayley Hughes — Awwwards Conference San Francisco**
[awwwards.com](https://www.awwwards.com/talk-hayley-hughes-airbnb-the-future-of-design-systems.html)

> "Journey systems can transform the business to invest in human needs instead of product features."

**Ponto central:** sistemas de design não são bibliotecas de componentes — são estruturas de colaboração que alinham produto, design e engenharia em torno de jornadas do usuário, não de backlogs de features.

---

### Airbnb Design Talks Season One (YouTube)
[youtube.com/playlist — Airbnb Design Talks](https://www.youtube.com/playlist?list=PLTF1Lmf3-xEHD2vRALHCMmrilCnxg3LT8)

Série de palestras internas abertas ao público, cobrindo processo criativo, pesquisa de usuário e filosofia de produto.

---

## Recursos adicionais

| Recurso | Tipo | Link |
|---|---|---|
| Building a Visual Language | Artigo Medium | [medium.com/airbnb-design](https://medium.com/airbnb-design/building-a-visual-language-behind-the-scenes-of-our-airbnb-design-system-224748775e4e) |
| The Way We Build | Artigo Medium | [medium.com/airbnb-design](https://medium.com/airbnb-design/the-way-we-build-511b713c2c7b) |
| Motion Engineering at Scale | Artigo Tech Blog | [medium.com/airbnb-engineering](https://medium.com/airbnb-engineering/motion-engineering-at-scale-5ffabfc878) |
| Introducing Lottie | Artigo Tech Blog | [medium.com/airbnb-engineering](https://medium.com/airbnb-engineering/introducing-lottie-4ff4a0afac0e) |
| Designing for Access | Artigo Medium | [medium.com/@nanako.era](https://medium.com/@nanako.era/designing-for-access-creating-new-features-for-guests-with-disabilities-d56b9f988a2c) |
| Making Android More Accessible | Artigo Tech Blog | [medium.com/airbnb-engineering](https://medium.com/airbnb-engineering/making-airbnbs-android-app-more-accessible-75618172be6) |
| Co-designing with Hosts | Artigo Medium | [medium.com/airbnb-design](https://medium.com/airbnb-design/co-designing-with-hosts-e1f0d389f4ee) |
| DLS — Karri Saarinen (site pessoal) | Documentação | [karrisaarinen.com/dls](https://karrisaarinen.com/dls/) |
| Systematic Cross-Platform Design | Palestra | [vimeo.com/280588008](https://vimeo.com/280588008) |
| The Future of Design Systems | Palestra | [awwwards.com](https://www.awwwards.com/talk-hayley-hughes-airbnb-the-future-of-design-systems.html) |
| Airbnb Design Talks Season One | YouTube | [youtube.com](https://www.youtube.com/playlist?list=PLTF1Lmf3-xEHD2vRALHCMmrilCnxg3LT8) |
| Airbnb Design Principles | Referência | [principles.design](https://principles.design/examples/airbnb-design-principles) |
| Lottie (open source) | Repositório | [github.com/airbnb/lottie-web](https://github.com/airbnb/lottie-web) |

---

## Referências relacionadas

- `docs/research/benchmarks.md` — o Airbnb DLS está documentado como benchmark 8; este arquivo é o detalhamento completo
- `docs/research/accessibility-touch-targets.md` — complementa o princípio **Universal** com a regra técnica de 44px
- `docs/design-system.md` — para aplicação tática dos princípios em tokens e componentes do DS Dasa

---

*dasa-design-kb · `docs/research/` · Uso interno*
