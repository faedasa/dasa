---
title: UX — Padrões de Dashboard
tags: [research, ux]
updated: 2026-03-19
---

# UX — Padrões de Dashboard

> Referência de pesquisa sobre design de dashboards eficazes. Baseado no artigo NN/g "Dashboards: Making Charts and Graphs Easier to Understand".
>
> Fonte: [nngroup.com/articles/dashboards-preattentive/](https://www.nngroup.com/articles/dashboards-preattentive/)
> Atualizado: mar 2026 · dasa-design-kb · `docs/research/`

---

## Definição

**Dashboard** é uma coleção de visualizações de dados apresentada em uma única página, projetada para comunicar informação de relance, na qual o usuário pode agir rapidamente.

A metáfora vem do painel do carro: informação essencial absorvida de forma imediata, sem necessidade de pensar. Dashboards não são espaços de exploração complexa de dados — seu objetivo é a consumo rápido, com mínimo de interação e processamento cognitivo.

**Dashboards diferem de portais**: portais oferecem uma combinação de recursos, ferramentas e acesso a aplicações; dashboards focam em uma tarefa única — comunicar informação crítica.

---

## Dois tipos de dashboard

### Dashboard operacional

Suporta tomada de decisão sensível ao tempo com dados continuamente atualizados. O usuário precisa identificar desvios e agir imediatamente.

**Exemplos:** monitoramento de servidores, sinais vitais de paciente em cirurgia, central de atendimento ao cliente, tráfego aéreo.

**Princípio-chave:** qualquer desvio dos parâmetros normais deve ser visualmente imediato, sem necessidade de leitura.

### Dashboard analítico

Ajuda o usuário a identificar a necessidade de investigação, análise ou decisão futura. Atualizado com menos frequência; não exige ação imediata.

**Exemplos:** dashboard de vendas diário, métricas de produto, relatórios de NPS.

**Princípio-chave:** facilitar a identificação de tendências e anomalias ao longo do tempo, não emergências.

> **Aplicação a portais de paciente (ex: Nav360):** a home do paciente é um híbrido — tem elementos operacionais (Próxima Data, Resultados pendentes) e elementos analíticos (histórico, valores acumulados). A hierarquia visual deve refletir esse dual: urgência no quadrante primário, análise no quadrante secundário.

---

## Processamento pré-atencional

Certos atributos visuais são processados antes da atenção consciente ser engajada. O usuário "vê" o padrão antes de decidir olhar para ele.

**Atributos pré-atencionais eficazes:**
- **Comprimento** (length) — detectamos diferenças de comprimento com precisão quantitativa
- **Posição 2D** — localizamos posições no espaço com alta acuidade
- **Cor** — detectamos diferenças de cor, mas sem precisão quantitativa
- **Área** — detectamos diferenças, mas com baixa precisão comparativa
- **Ângulo** — detectamos, mas com imprecisão quantitativa

### Implicação direta para design de dashboards

Comprimento e posição 2D são os únicos atributos pré-atencionais que suportam comparação quantitativa precisa. Isso torna **barras e linhas** os formatos de gráfico mais eficazes.

---

## Gráficos recomendados

| Tipo | Atributo | Uso ideal |
|---|---|---|
| Gráfico de barras | Comprimento | Comparar valores entre categorias |
| Gráfico de linha | Posição 2D | Mostrar tendências e variações ao longo do tempo |
| Scatter plot | Posição 2D | Identificar correlações entre duas variáveis |

---

## Anti-padrões visuais

### Gráficos circulares e de área (evitar)

Gráficos de pizza, rosca (donut) e treemaps usam área e ângulo — atributos pré-atencionais com baixa precisão quantitativa. O usuário não consegue determinar rapidamente "quanto maior" uma fatia é em relação à outra.

- **Pizza e donut**: problemáticos na maioria dos casos. Úteis apenas para mostrar disparidades absolutamente dominantes (ex: uma fonte representa 90% da receita).
- **Donut**: ainda pior que pizza — o espaço vazio no centro reduz a área visual de cada segmento.
- **Treemap**: pode ser útil para visualizar hierarquias complexas em modo de exploração. Inadequado para dashboards de ação rápida.

### Gráficos em 3D (evitar sempre)

A perspectiva 3D distorce as proporções dos dados. O topo de uma barra 3D é difícil de alinhar com os valores do eixo; em gráficos de pizza 3D, as fatias frontais parecem maiores do que realmente são.

Mesmo o atributo de comprimento — o mais preciso em 2D — perde precisão em representações 3D.

### Gauges (medidores angulares)

Ocupam muito espaço para comunicar pouca informação. Dependem de ângulo para codificar valor — atributo com baixa precisão pré-atencional. Bullet charts lineares comunicam o mesmo dado com mais eficiência e menos espaço.

---

## Cor para categorias, não para quantidade

Cor é um atributo pré-atencional eficaz para **agrupamento categórico**, não para representar magnitude ou quantidade.

**Correto:** usar cor diferente para distinguir séries em um gráfico de linhas múltiplas.
**Incorreto:** usar gradiente de cor para indicar que um valor é "maior" ou "menor".

**Regra adicional:** cor nunca deve ser o único sinal de agrupamento, pois até 8% dos homens têm algum grau de daltonismo. Usar cor como reforço de shape, posição ou proximidade — não como sinal único.

---

## Princípios para dashboards de portais de paciente

Extraídos da combinação de NN/g com os benchmarks da KB (`docs/research/benchmarks.md`):

1. **Quadrante superior esquerdo = informação mais crítica**: onde o olho inicia o scan
2. **Separação urgência × consulta**: módulos de ação primária à esquerda/topo; módulos históricos à direita/base
3. **Cor como semântica funcional, não decoração**: verde/amarelo/vermelho comunicam estado, não estilo
4. **Densidade controlada por módulo**: cada módulo expõe o mínimo; expansão é sob demanda
5. **Progressive disclosure para listas**: exibir N itens recentes + ação explícita para volume total

---

## Referências relacionadas

- `docs/research/progressive-disclosure.md` — quando e como colapsar conteúdo sem penalizar o usuário
- `docs/research/benchmarks.md` — análise de produtos que implementam esses padrões com sucesso
- [NN/g — Visual Indicators and Differentiators](https://www.nngroup.com/articles/visual-indicators-differentiators/) — detalhamento de atributos pré-atencionais

---

*dasa-design-kb · `docs/research/` · Uso interno*
