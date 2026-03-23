---
title: Guidelines de UX — Design Experience Dasa
tags: [ux]
updated: 2026-03-19
---

# Guidelines de UX — Design Experience Dasa

> **Versão:** 2.0 | **Atualizado:** 2026-03-17 | **Tags:** #design #acessibilidade #mobile-first | **Status:** ✅ Estável

---

## Princípios de Design

### 1. Clareza e Simplicidade
- Interfaces intuitivas e fáceis de entender
- Evitar complexidade desnecessária
- Hierarquia visual clara
- **Jobs to Be Done > Limitações técnicas**
- Não expor complexidade operacional para o paciente

### 2. Consistência
- Manter padrões em todos os fluxos e produtos
- Usar componentes do Design System
- Linguagem consistente (seguir `copy-rules.md`)
- Identidade visual do DS Dasa

### 3. Feedback ao Paciente
- Estados de loading visíveis
- Mensagens de erro claras e acionáveis
- Confirmações de ações importantes
- **Feedback sobre regras e restrições durante a jornada**
- Validação inline em tempo real

### 4. Acessibilidade
- Contraste adequado (WCAG AA mínimo — 4.5:1 para texto normal)
- Suporte a navegação por teclado
- Textos alternativos para imagens
- **Touch targets: mínimo 44×44px** (crítico para mobile)
- Uso de "mostrar" em vez de "ver" (evitar capacitismo)

### 5. Autonomia do Paciente
- Reduzir dependência de atendimento humano
- Fluxos diretos e inteligentes
- **Menos fricção = mais conversão**
- Progressive disclosure (revelar informação gradualmente)

---

## Mobile-First

### Prioridades
- **100% das decisões começam por mobile (375px)**
- Thumbzone-friendly (botões principais na parte inferior)
- Scroll vertical natural
- Uma ação principal por tela
- Teclado otimizado por tipo de campo

### Touch Targets

```css
--touch-min: 44px        /* Mínimo WCAG */
--touch-recommended: 48px /* Recomendado */
--touch-spacing: 8px     /* Espaçamento entre alvos */
```

### Thumbzone

Áreas mais acessíveis em mobile (segurar com uma mão):

```
┌─────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓ │ Difícil (topo)
│ ░░░░░░░░░░░ │ Fácil (centro)
│ ░░░░░░░░░░░ │ Fácil (centro)
│ ▓▓▓▓▓▓▓▓▓▓▓ │ Difícil (base extrema)
└─────────────┘
```

**Ações primárias:** Posicionar na zona "fácil" (centro-baixo)

### Teclado Mobile

Otimizar input types:

```html
<!-- Email -->
<input type="email" inputmode="email">

<!-- Telefone -->
<input type="tel" inputmode="tel">

<!-- Número (sem spinner) -->
<input type="text" inputmode="numeric">

<!-- CPF/Data -->
<input type="text" inputmode="numeric" pattern="[0-9]*">

<!-- Texto com capitalização -->
<input type="text" autocapitalize="words">
```

---

## Formulários

### Labels
- ✅ Sempre visíveis (não usar placeholder como label)
- ✅ Acima do campo
- ✅ Texto em `--typeface-strong` (#161616)
- ❌ Nunca ocultar após preenchimento

### Campos
- Altura mínima: 44px
- Padding: 12px 16px
- Border: 1px solid `--neutral-20` (#E6E6E6)
- Focus state: destacar com cor de marca
- Um campo por linha em mobile

### Validação
- **Inline:** Validar enquanto digita (email, CPF, telefone)
- **On blur:** Validar ao sair do campo
- **On submit:** Validar tudo antes de prosseguir
- Mensagens próximas ao campo
- Usar linguagem da `copy-rules.md`:
  - ✅ "CPF inválido. Verifique e tente novamente."
  - ❌ "Erro 404" ou "Campo obrigatório" sem contexto

### Campos Obrigatórios
- Indicar com asterisco (*) ou texto "(obrigatório)"
- Prefira pedir apenas o essencial
- Progressive disclosure para campos opcionais

### Máscaras de Input
```
CPF: 000.000.000-00
Telefone: (00) 00000-0000
Data: DD/MM/AAAA
CEP: 00000-000
```

### Autocomplete
- Usar atributos HTML5 autocomplete
- Smart defaults (pré-selecionar opções comuns)

---

## Call-to-Actions (CTAs)

### Hierarquia

```css
/* Primário - Ação principal */
background: var(--primary);
color: var(--typeface-inverse-strong);
height: 48px; /* Mobile */

/* Secundário - Ação alternativa */
background: transparent;
border: 1px solid var(--primary);
color: var(--primary);

/* Terciário - Ação opcional */
background: transparent;
color: var(--typeface-faded);
```

### Texto (seguir `copy-rules.md`)
- ✅ Verbo no infinitivo
- ✅ 2–3 palavras
- ✅ Específico e descritivo
- ❌ Nunca usar ponto final

### Posicionamento
- **Mobile:** Botão primário fixo na base (sticky)
- **Espaçamento:** Mínimo 8px entre botões
- **Ordem:** Primário sempre mais proeminente

---

## Navegação

### Regras gerais
- Header fixo no topo com botão de voltar em todas as telas internas
- Título da tela no header: curto, máximo 3 palavras, sem verbo
- Botão fechar (X): apenas em modais e bottom sheets, não em telas de fluxo linear
- Progress indicator: obrigatório em fluxos com múltiplas etapas

### Breadcrumbs
- Sempre visível no topo em fluxos lineares
- Indicar progresso (ex.: "2 de 5")
- Permitir voltar para etapa anterior
- Não perder dados ao voltar

---

## Estados e Feedback

### Loading States

#### Skeleton Screens
- Usar para carregamentos >200ms
- Manter estrutura visual
- Animar suavemente

#### Spinners
- Usar para ações rápidas (<200ms)
- Centralizado na tela ou componente
- Com texto descritivo quando apropriado

#### Progress Bars
- Para uploads (documentos, imagens)
- Mostrar percentual quando possível

### Mensagens de Erro

#### Princípios (seguir `copy-rules.md`)
- Clara e acionável
- Próxima ao contexto
- Tom empático
- Sugerir solução

#### Tipos
```
Validação: "CPF inválido. Verifique e tente novamente."
Sistema: "Não foi possível carregar. Tente novamente."
Indisponibilidade: "Este horário não está disponível. Escolha outro."
```

### Mensagens de Sucesso
- Breve e clara
- Confirmar o que foi feito
- Indicar próximos passos

---

## Personalização

### Smart Defaults
- Pré-selecionar com base em histórico
- Unidade mais próxima (geolocalização)
- Preferências salvas anteriormente

### Contexto do Paciente
- Mostrar histórico relevante
- Sugerir conteúdos complementares
- Lembrar preferências

---

## Acessibilidade (WCAG AA)

### Contraste
- Texto normal (16px): 4.5:1
- Texto grande (18px+): 3:1
- Usar ferramenta para validar:
  - `--typeface-strong` (#161616) sobre branco ✅
  - `--typeface-faded` (#4B4B4B) sobre branco ✅

### Navegação por Teclado
- Ordem lógica de tab
- Focus state visível
- Esc para fechar modals
- Enter para confirmar

### Screen Readers
- Landmarks semânticos (`<header>`, `<nav>`, `<main>`)
- ARIA labels quando necessário
- Textos alternativos descritivos
- Anunciar mudanças de estado

### Inclusão
- Usar "mostrar" em vez de "ver"
- Evitar "clique" (usar "selecione")
- Linguagem neutra (seguir `copy-rules.md`)

---

## Performance Percebida

### Otimizações
- Skeleton screens (carregamento)
- Animações suaves (300ms padrão)
- Feedback imediato (< 100ms)
- Lazy loading de imagens

### Animações
- 60fps (use transform e opacity)
- Duração: 150–500ms
- Easing: ease-in-out

---

## Testes e Validação

### Antes de Implementar
- Card sorting (ordenação de etapas)
- Teste de usabilidade (5 usuários)
- Validar com stakeholders

### Métricas para Monitorar
- Taxa de conclusão por etapa
- Tempo médio de conclusão
- Taxa de abandono
- Contatos ao suporte
- NPS do fluxo

---

## Referências

- `copy-rules.md` — Tom de voz e linguagem
- `design-system.md` — Tokens e componentes
- `business-strategy.md` — Personas e estratégia de negócio
- `docs/subprojects/nav360/README.md` — Padrões específicos do produto Nav360
- WCAG 2.1 AA — Acessibilidade
