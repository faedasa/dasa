---
title: Acessibilidade — Touch Targets
tags: [research, accessibility]
updated: 2026-03-19
---

# Acessibilidade — Touch Targets

> Referência de pesquisa sobre tamanho mínimo de alvos interativos. Baseado no WCAG 2.1 Success Criterion 2.5.5.
>
> Fonte: [w3.org/WAI/WCAG21/Understanding/target-size.html](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
> Atualizado: mar 2026 · dasa-design-kb · `docs/research/`

---

## Regra principal

**O tamanho do alvo para inputs de ponteiro deve ser de no mínimo 44 × 44 CSS pixels.**

Esta é a base do requisito de touch target no DS Dasa — regra inegociável para todos os componentes interativos.

> **Nota:** Esta regra é classificada como WCAG Level AAA. O DS Dasa a adota como requisito mínimo para todos os produtos, independentemente do nível de conformidade formal.

---

## Justificativa

Touch é um mecanismo de entrada com precisão inerentemente mais baixa do que mouse ou stylus. O dedo é maior do que o ponteiro do cursor e obstrui a visão do ponto exato de toque.

O problema é agravado por:
- Tremor de mão ou dificuldade motora fina
- Uso com uma mão só
- Condições de movimento (transporte público, andando)
- Uso com parte do dedo ou nó dos dedos
- Telas responsivas que acessam o mesmo produto em múltiplos dispositivos

Alvos pequenos geram erros de toque em alvo errado, erros de "duplo toque" acidental e frustração proporcional à consequência da ação.

**Quanto mais crítica ou irreversível a ação, mais importante o tamanho adequado do alvo.**

---

## Exceções (quando a regra não se aplica)

| Exceção | Condição | Exemplo |
|---|---|---|
| **Equivalente** | Existe outro alvo de ≥ 44px na mesma página que executa a mesma ação | Botão de fechar em dois lugares, um grande e um pequeno |
| **Inline** | O alvo está dentro de uma sentença ou bloco de texto | Links dentro de um parágrafo de texto corrido |
| **User Agent** | O tamanho é determinado pelo navegador, sem modificação do autor | Checkboxes e radio buttons nativos não customizados |
| **Essential** | Mudar o tamanho alteraria fundamentalmente a informação ou funcionalidade | Cursor de precisão em uma ferramenta de design vetorial |

> **Atenção para a exceção "inline":** aplica-se apenas a links dentro de fluxo de texto. Um botão de ação que aparece no final de um parágrafo, mas não faz parte da sentença, ainda precisa atender os 44px.

---

## Aplicação ao DS Dasa

### Componentes que sempre devem respeitar 44 × 44px

- Botões primários, secundários e terciários
- Checkboxes e radio buttons em formulários e seleção de exames
- Ícones de ação na navegação (sidebar, top nav)
- Itens de lista clicáveis (resultados, agendamentos, notificações)
- Inputs de formulário (a área de clique, não apenas o campo visível)
- Badges e chips interativos
- Controles de accordion (área clicável do header)

### Componentes com atenção especial

- **Ícones sem label**: se o ícone é a única área clicável, 44px é obrigatório. Esta regra reforça a decisão de labels sempre visíveis na sidebar do Nav360 — ícone sem label pequeno viola dois princípios ao mesmo tempo.
- **Tabelas densas**: ações por linha (expandir, editar) precisam de área de toque adequada mesmo em linhas compactas. Resolver via padding horizontal invisível.

---

## Relação com outros padrões de acessibilidade

### Material Design 3

O Material Design 3 do Google (`m3.material.io/foundations/accessible-design/overview`) adota touch targets de **48dp** como padrão de seus componentes, levemente acima do mínimo WCAG. O DS Dasa segue o mínimo WCAG de 44px, mas componentes nativos do Material adaptados devem preservar o padding interno desses componentes.

> **Nota histórica:** a URL original desta referência (`m3.material.io/develop/health`) retornou 404. A seção de acessibilidade do Material Design 3 foi reorganizada e pode ser encontrada em `m3.material.io/foundations/accessible-design/overview`.

### Apple Human Interface Guidelines

Apple recomenda touch targets de **44pt** para iOS — equivalente a 44px em displays @1x, mas adapta para densidades maiores. Em contextos mobile-first, o alvo físico em milímetros é o que importa; o valor em CSS pixels é uma aproximação para densidade @1x.

### Windows UWP

Microsoft recomenda um mínimo de **7,5mm** de tamanho físico para alvos touch, o que em densidade @1x de uma tela padrão equivale a aproximadamente 40-44px.

---

## Referências relacionadas

- `docs/research/benchmarks.md` — MyChart como referência de sidebar com labels sempre visíveis
- [WCAG 2.1 — C44: Using CSS to ensure targets are at least 44 by 44 CSS pixels](https://www.w3.org/WAI/WCAG21/Techniques/css/C44)
- [web.dev — Accessible tap targets](https://web.dev/accessible-tap-targets/)

---

*dasa-design-kb · `docs/research/` · Uso interno*
