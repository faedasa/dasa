---
title: UX — Progressive Disclosure
tags: [research, ux]
updated: 2026-03-19
---

# UX — Progressive Disclosure

> Referência de pesquisa sobre o padrão de progressive disclosure. Baseado no artigo NN/g "Progressive Disclosure".
>
> Fonte: [nngroup.com/articles/progressive-disclosure/](https://www.nngroup.com/articles/progressive-disclosure/)
> Atualizado: mar 2026 · dasa-design-kb · `docs/research/`

---

## Definição

**Progressive disclosure** é a estratégia de mostrar ao usuário apenas as opções e informações mais importantes inicialmente, revelando funcionalidades secundárias apenas quando solicitadas.

Resolve a tensão fundamental de qualquer produto com múltiplas funcionalidades:
- Usuários querem **simplicidade** — sem tempo para aprender um volume de features
- Usuários querem **poder** — opções para lidar com necessidades específicas

---

## Como funciona

1. **Display inicial**: exibe apenas as opções mais importantes e frequentes
2. **Display secundário**: funcionalidades avançadas ou raramente usadas ficam acessíveis via ação explícita do usuário (botão, link, accordion, painel lateral)

O simples fato de algo aparecer no display inicial comunica ao usuário que é importante. Isso ajuda usuários novatos a priorizar atenção e protege usuários avançados de ter que escanear itens que raramente precisam.

**Melhora 3 das 5 dimensões de usabilidade:** learnability, eficiência de uso, taxa de erro.

---

## Critérios de usabilidade

Para que progressive disclosure funcione, dois requisitos são inegociáveis:

### 1. Mecânica de progressão deve ser simples

A ação para revelar o conteúdo secundário precisa ser óbvia. Em web: link visualmente claro. Em aplicações: botão de "opções avançadas" em posição destacada.

### 2. O label da progressão deve definir expectativas claras

O texto do botão ou link precisa ter **information scent** — o usuário deve saber o que encontrará antes de clicar. "Mostrar todos" ou "Ver histórico completo" são melhores do que "Ver mais" ou "+12".

---

## Quantos níveis são suportáveis

**Máximo recomendado: 2 níveis.**

Designs com 3 ou mais níveis de disclosure geralmente têm baixa usabilidade — os usuários se perdem ao navegar entre níveis. Se a complexidade exige mais de 2 níveis, é sinal de que o produto precisa ser simplificado, não de que mais níveis devem ser adicionados.

Se múltiplos displays secundários forem necessários (cada controlado por um elemento diferente do display inicial), garantir que cada label seja completamente distinto para evitar ambiguidade.

---

## Progressive Disclosure × Staged Disclosure

São estratégias diferentes com lógicas distintas:

| Dimensão | Progressive Disclosure | Staged Disclosure |
|---|---|---|
| Display inicial | Features principais (por importância) | Features acessadas primeiro na sequência da tarefa |
| Display subsequente | Features secundárias (raramente usadas) | Features acessadas depois na sequência, mesmo que igualmente importantes |
| Usuário acessa o secundário? | Geralmente não — a maioria conclui no display inicial | Sim — o fluxo exige progressão |
| Navegação | Hierárquica: inicial → secundário → (retorno ao inicial) | Linear: passo a passo até conclusão |
| Benefício principal | Learnability — novatos focam no essencial | Simplicidade — cada passo tem propósito claro |

**Staged disclosure** é o padrão de wizards e fluxos de agendamento step-by-step. **Progressive disclosure** é o padrão de dashboards e portais com múltiplos módulos.

---

## Quando usar progressive disclosure em dashboards

**Use quando:**
- Um módulo tem mais itens do que cabem na tela sem comprometer o layout (ex: lista de resultados)
- Itens antigos/históricos têm relevância menor do que os recentes para a maioria dos casos de uso
- A expansão não muda o contexto — o usuário permanece na mesma tela

**Não use quando:**
- Todos os itens têm a mesma relevância e frequência de acesso
- O usuário precisa comparar itens do display inicial com itens do display secundário (nesse caso, exibir tudo junto)
- A ação de revelar cria ambiguidade sobre o que foi revelado

---

## Aplicações em portais de paciente

- **Lista de resultados de exames**: exibir os 3 mais recentes por padrão; "Mostrar todos" como ação explícita
- **Histórico de agendamentos**: exibir próxima data + 2 anteriores; accordion para histórico completo
- **Notificações**: exibir as 3 mais recentes; link para central de notificações
- **Detalhes de um resultado**: exibir resumo no card; drawer lateral ou página de detalhe para conteúdo completo

---

## Referências relacionadas

- `docs/research/ux-dashboard-patterns.md` — como progressive disclosure se integra com padrões de scan de dashboards
- `docs/research/benchmarks.md` — Linear e MyChart como exemplos de implementação eficaz

---

*dasa-design-kb · `docs/research/` · Uso interno*
