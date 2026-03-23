# 🔧 DASA Nav360: Especificação Técnica + Implementação

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Pronto para Dev | **Prioridade:** 🔴 Alta

> Documentação técnica completa para implementação do fluxo de agendamento. Design tokens, componentes, comportamentos, edge cases e checklist de implementação.

---

## 📌 SUMÁRIO EXECUTIVO

### Seções
1. **Design Tokens** - Cores, tipografia, spacing, breakpoints
2. **Componentes** - Specs detalhadas de cada elemento
3. **Comportamentos** - Validação, loading, transições
4. **Checklist de Implementação** - 25+ items
5. **Edge Cases** - Menores de idade, sem disponibilidade, etc
6. **Integração** - Endpoints esperados, payloads

### Quem usa
- **Front-end Dev:** Sections 1-5 (tokens, componentes, comportamentos)
- **Back-end Dev:** Section 6 (integração, endpoints)
- **QA/Tester:** Section 5 (edge cases, checklist)

---

## 1️⃣ DESIGN TOKENS

### Cores Primárias (da KB DASA)

```css
/* Primary (Vermelho DASA) */
--color-primary: #EA4356;           /* Red-90 */
--color-primary-hover: #F55C6E;     /* Red-100 */
--color-primary-active: #D83145;    /* Red-80 */
--color-primary-light: #FDDDE1;     /* Red-150 */
--color-primary-lightest: #FEF1F2;  /* Red-160 */

/* Semantic - Success */
--color-success: #32A454;           /* Green-100 */
--color-success-light: #C8EED3;     /* Green-150 */
--color-success-lightest: #E8F8EC;  /* Green-160 */

/* Semantic - Warning */
--color-warning: #EB7005;           /* Yellow-100 */
--color-warning-light: #FEE1C8;     /* Yellow-150 */

/* Semantic - Error */
--color-error: #D83145;             /* Red-80 */
--color-error-light: #FEF1F2;       /* Red-160 */

/* Semantic - Info */
--color-info: #3F7BF2;              /* Blue-90 */
--color-info-light: #D9E5FC;        /* Blue-150 */

/* Neutral - Text */
--color-text-primary: #161616;      /* Strong */
--color-text-secondary: #4B4B4B;    /* Faded */
--color-text-tertiary: #919191;     /* Light faded */
--color-text-placeholder: #A1A1A1;  /* Placeholder */
--color-text-inverse: #FEFEFE;      /* On dark */

/* Neutral - Backgrounds */
--color-bg-white: #FFFFFF;
--color-bg-light: #F5F5F5;          /* Neutral-10 */
--color-bg-lighter: #E6E6E6;        /* Neutral-20 */
--color-bg-dark: #161616;           /* Neutral-inverse-00 */

/* Neutral - Borders */
--color-border-default: #E6E6E6;
--color-border-light: #F5F5F5;
```

### Tipografia

```css
/* Font Family */
--font-family: 'Dasa Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--font-size-10: 10px;
--font-size-12: 12px;   /* Caption/Help text */
--font-size-13: 13px;   /* Small body */
--font-size-14: 14px;   /* Regular body/Labels */
--font-size-16: 16px;   /* Body/Buttons */
--font-size-18: 18px;   /* Large body/Subtitle */
--font-size-20: 20px;   /* Small heading */
--font-size-24: 24px;   /* Heading */
--font-size-32: 32px;   /* Large heading (prices) */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.25;    /* Headings */
--line-height-normal: 1.5;    /* Body text */
--line-height-loose: 1.8;     /* Large spacing */

/* Typographic Scale */
--text-h1: 32px / 700 / 1.25;      /* Large heading */
--text-h2: 24px / 700 / 1.25;      /* Heading */
--text-h3: 20px / 600 / 1.25;      /* Small heading */
--text-h4: 18px / 600 / 1.5;       /* Subheading */
--text-body-lg: 18px / 400 / 1.5;  /* Large body */
--text-body: 16px / 400 / 1.5;     /* Regular body */
--text-body-sm: 14px / 400 / 1.5;  /* Small body */
--text-caption: 12px / 400 / 1.5;  /* Caption */
--text-label: 14px / 500 / 1.5;    /* Form label */
```

### Spacing

```css
/* Base Unit: 4px */
--space-2: 2px;
--space-4: 4px;
--space-6: 6px;
--space-8: 8px;
--space-12: 12px;
--space-16: 16px;
--space-20: 20px;
--space-24: 24px;
--space-28: 28px;
--space-32: 32px;
--space-40: 40px;
--space-48: 48px;

/* Component Padding (Recommended) */
--padding-card: 16px;        /* Internal card padding */
--padding-input: 12px 16px;  /* Input padding */
--padding-button: 0 24px;    /* Button padding (height handled separately) */

/* Component Spacing */
--gap-small: 8px;            /* Between buttons, form fields */
--gap-medium: 12px;          /* Between sections */
--gap-large: 20px;           /* Between major sections */
--gap-xlarge: 32px;          /* Between full-width sections */

/* Breakpoints (Mobile-First) */
--breakpoint-xs: 320px;      /* iPhone SE */
--breakpoint-sm: 375px;      /* iPhone 11/12 - PRIMARY TARGET */
--breakpoint-md: 768px;      /* Tablet */
--breakpoint-lg: 1024px;     /* Desktop small */
--breakpoint-xl: 1440px;     /* Desktop large */
```

### Border Radius

```css
--radius-none: 0px;
--radius-xs: 4px;       /* Small elements */
--radius-sm: 8px;       /* Inputs, buttons, cards */
--radius-md: 12px;      /* Modal, larger cards */
--radius-lg: 16px;      /* Not common in this design */
--radius-pill: 100px;   /* Pill buttons */
```

### Shadows

```css
--shadow-none: none;
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-focus: 0 0 0 3px rgba(234, 67, 86, 0.1);  /* Focus indicator */
```

### Animations

```css
--duration-fast: 150ms;     /* Hover states */
--duration-normal: 300ms;   /* Standard transitions */
--duration-slow: 500ms;     /* Complex animations */

--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

---

## 2️⃣ COMPONENTES

### INPUT FIELD (Busca, CPF, Email, etc)

```yaml
Type: Input Text/Email/Tel/Number
Viewport: 375px mobile primary

DIMENSIONS:
  Height: 44px (touch target)
  Padding: 12px 16px
  Width: 100% (full width on mobile)

STYLING:
  Border: 1px solid --color-border-default (#E6E6E6)
  Border-radius: --radius-sm (8px)
  Background: --color-bg-white
  Font: --font-size-14 / --font-weight-regular / --color-text-primary

STATES:
  Default:
    Border: #E6E6E6
    Background: white
    Cursor: text

  Focus:
    Border: --color-primary (#EA4356)
    Shadow: --shadow-focus
    Background: white
    Outline: none (use border + shadow instead)

  Disabled:
    Border: #E6E6E6
    Background: --color-bg-light (#F5F5F5)
    Color: --color-text-tertiary (#919191)
    Cursor: not-allowed
    Opacity: 50%

  Error:
    Border: --color-error (#D83145)
    Border-width: 2px
    Background: white
    (+ error message below, 12px gap)

  Filled/Success:
    Border: --color-success (#32A454)
    Background: white

PLACEHOLDER:
  Color: --color-text-placeholder (#A1A1A1)
  Font: inherit
  Font-style: normal (not italic)

LABEL:
  Always above field
  Font: --font-size-14 / --font-weight-medium / --color-text-primary
  Margin-bottom: 8px
  Display: block
  Required indicator: * (red, optional)

VALIDATION:
  Position: Below field
  Gap: 4px
  Font: --font-size-12 / --color-error (error) OR --color-success (success)
  Icon: ❌ (error) OR ✓ (success) - optional

KEYBOARD:
  type="email" + inputmode="email" → shows email keyboard
  type="tel" + inputmode="tel" → shows phone keyboard
  type="text" + inputmode="numeric" → shows number keyboard
  Autocapitalize: words (for names)
  Autocorrect: off (for CPF, data fields)

RESPONSIVE:
  Mobile (375px): 100% width, full padding
  Tablet (768px): 100% width, full padding
  Desktop: Optional narrower width
```

### BUTTON PRIMÁRIO

```yaml
Type: Interactive Button
Viewport: All

DIMENSIONS:
  Height: 48px (touch target, includes padding)
  Padding: 0 24px
  Width: 100% (full width on mobile)
  Border-radius: --radius-sm (8px)

STYLING:
  Background: --color-primary (#EA4356)
  Color: --color-text-inverse (#FEFEFE)
  Border: none
  Font: --font-size-16 / --font-weight-semibold
  Cursor: pointer

STATES:
  Default:
    Background: #EA4356
    Box-shadow: none
    Transform: none

  Hover:
    Background: --color-primary-hover (#F55C6E)
    Box-shadow: none
    Transform: none (no scale)

  Active/Pressed:
    Background: --color-primary-active (#D83145)
    Box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)

  Focus:
    Outline: none
    Box-shadow: --shadow-focus (3px spread)
    Background: #EA4356

  Disabled:
    Background: #EA4356
    Opacity: 50%
    Cursor: not-allowed
    Pointer-events: none

SPACING:
  Between buttons: --gap-small (8px)
  Above button: --gap-medium (12px)
  Below button: --gap-medium (12px)

ANIMATION:
  Transition: background-color --duration-fast (150ms) --ease-in-out
  No scale/transform (keep it flat)

RESPONSIVE:
  Mobile: 100% width, full height 48px
  Tablet+: Can be narrower (optional)

TEXT:
  Always infinitive verb (Agendar, Continuar, Confirmar)
  Never ending with period
  2-3 words maximum
  Centered text
  No truncation (break into multiple buttons if needed)

LOADING STATE:
  Disabled appearance
  Show spinner inside (right-align, 16x16px)
  Text: "Processando..." (optional)
  Cursor: wait
```

### BUTTON SECUNDÁRIO

```yaml
Type: Interactive Button (Alternative)
Viewport: All

DIMENSIONS:
  Height: 48px
  Padding: 0 24px
  Width: 100% (full width on mobile)
  Border-radius: --radius-sm (8px)

STYLING:
  Background: transparent
  Border: 1px solid --color-primary (#EA4356)
  Color: --color-primary (#EA4356)
  Font: --font-size-16 / --font-weight-regular
  Cursor: pointer

STATES:
  Default:
    Background: transparent
    Border: 1px solid #EA4356
    Color: #EA4356

  Hover:
    Background: --color-primary-lightest (#FEF1F2)
    Border: 1px solid #EA4356

  Active:
    Background: --color-primary-light (#FDDDE1)
    Border: 1px solid #EA4356

  Focus:
    Outline: none
    Box-shadow: --shadow-focus

  Disabled:
    Border: 1px solid #EA4356
    Color: #EA4356
    Opacity: 50%
    Cursor: not-allowed

TEXT:
  Same as primary button
```

### BUTTON TERCIÁRIO

```yaml
Type: Link Button (Low Priority)
Viewport: All

DIMENSIONS:
  Height: auto
  Padding: 0
  No minimum size (but ensure clickable)

STYLING:
  Background: transparent
  Border: none
  Color: --color-primary (#EA4356)
  Font: --font-size-13 / --font-weight-regular
  Cursor: pointer

STATES:
  Default:
    Color: #EA4356
    Text-decoration: none

  Hover:
    Text-decoration: underline
    Color: --color-primary-hover (#F55C6E)

  Focus:
    Text-decoration: underline
    Outline: 2px solid #EA4356
    Outline-offset: 2px

SPACING:
  Line-height: 1.5 (for better click target)
  Padding: 8px 0 (invisible padding for touch target)

TEXT:
  Sentence case (not all caps)
  Action-oriented
```

### CHECKBOX / RADIO

```yaml
Type: Form Input (Selection)
Viewport: All

DIMENSIONS:
  Box size: 24x24px
  Touch target: 48x48px (include label padding)
  Label font: --font-size-14

STYLING:
  Border: 2px solid --color-border-default (#E6E6E6)
  Border-radius: --radius-xs (4px) - checkbox
  Border-radius: 50% - radio
  Background: white (unchecked)
  Background: --color-primary (#EA4356) (checked)

STATES:
  Unchecked:
    Border: 2px solid #E6E6E6
    Background: white

  Checked:
    Border: 2px solid --color-primary (#EA4356)
    Background: --color-primary (#EA4356)
    Checkmark: ✓ white 16px
    (or radio dot for radio button)

  Focus:
    Box-shadow: --shadow-focus
    Border: 2px solid #EA4356

  Disabled:
    Opacity: 50%
    Cursor: not-allowed
    Border: 2px solid #E6E6E6

  Hover (enabled):
    Border: 2px solid --color-primary-hover (#F55C6E)

LABEL:
  Always to the right of checkbox/radio
  Font: --font-size-14 / --font-weight-regular
  Color: --color-text-primary
  Clickable (click on label checks box)
  Cursor: pointer

SPACING:
  Gap between box and label: 12px
  Padding around whole item: 12px (for touch target)
  Gap between items: 12px (vertical)

GROUPS:
  Full width container
  1 item per line (mobile)
  Vertical alignment
```

### CARD

```yaml
Type: Container
Viewport: All

DIMENSIONS:
  Padding: 16px
  Border-radius: --radius-md (12px)
  Width: 100% (full width on mobile)
  Margin-bottom: 12px

STYLING:
  Background: --color-bg-white
  Border: 1px solid --color-border-default (#E6E6E6)
  Box-shadow: none (optional: --shadow-xs)

STATES:
  Default:
    Border: 1px solid #E6E6E6
    Background: white
    Box-shadow: none

  Hover:
    Box-shadow: --shadow-sm
    Border: 1px solid #E6E6E6
    (optional: slight lift)

  Selected:
    Border: 2px solid --color-primary (#EA4356)
    Background: --color-primary-lightest (#FEF1F2)
    Box-shadow: --shadow-xs

INTERNAL SPACING:
  Between elements: --gap-small (8px)
  Header to content: --gap-small (8px)
  Content to footer: --gap-small (8px)

RESPONSIVE:
  Mobile: 100% width, full padding
  Tablet+: Max-width optional
```

### MODAL / DIALOG

```yaml
Type: Overlay Container
Viewport: All

DIMENSIONS:
  Mobile: Full screen
  Desktop: Center, max-width 600px
  Padding: 24px (mobile), 32px (desktop)

STYLING:
  Background: --color-bg-white
  Border-radius: --radius-md (12px - top only on mobile)
  Box-shadow: --shadow-lg

OVERLAY:
  Background: rgba(0, 0, 0, 0.5)
  Backdrop-filter: blur(4px) - optional

HEADER:
  Close button: top-right, 40x40px
  Title: --font-size-18 / --font-weight-bold
  Subtitle: --font-size-14 / --color-text-secondary

FOOTER:
  CTA buttons (usually 2 buttons)
  Gap: --gap-small (8px)
  Sticky to bottom (on scroll)

CLOSE BEHAVIOR:
  ESC key closes modal
  Clicking outside closes (backdrop click)
  Close button (✕) top-right
  No content loss on close

ANIMATION:
  Enter: Fade in + slide up 300ms
  Exit: Fade out + slide down 200ms
```

### ALERT / MESSAGE

```yaml
Type: Notification Container
Viewport: All

DIMENSIONS:
  Padding: 12px 16px
  Border-radius: --radius-sm (8px)
  Width: 100%
  Margin-bottom: 12px

STYLING (by type):
  Error:
    Background: --color-error-light (#FEF1F2)
    Border-left: 3px solid --color-error (#D83145)
    Color: --color-error (#D83145)

  Success:
    Background: --color-success-lightest (#E8F8EC)
    Border-left: 3px solid --color-success (#32A454)
    Color: --color-success (#32A454)

  Warning:
    Background: --color-warning-light (#FEE1C8)
    Border-left: 3px solid --color-warning (#EB7005)
    Color: --color-warning (#EB7005)

  Info:
    Background: --color-info-light (#D9E5FC)
    Border-left: 3px solid --color-info (#3F7BF2)
    Color: --color-info (#3F7BF2)

LAYOUT:
  Icon (left): 20x20px
  Text (center): --font-size-13 / --font-weight-regular
  Close button (right): Optional, 24x24px
  Gap: --gap-small (8px)

ANIMATION:
  Enter: Slide in from top 300ms
  Dismiss: Fade out 200ms
  Auto-dismiss: 5s (optional, especially for success)

POSITIONING:
  Below form field (for validation)
  Top of page (for system messages)
  Bottom of screen (for toast notifications)
```

---

## 3️⃣ COMPORTAMENTOS

### VALIDAÇÃO DE FORMULÁRIO

#### Timing
```
Tipo: INLINE VALIDATION (while typing)

Campos obrigatórios:
- CPF: Valida conforme digita (format: 000.000.000-00)
- Email: Valida após 3 caracteres
- Telefone: Valida conforme digita (format: (00) 00000-0000)
- Data: Valida formato DD/MM/AAAA
- Nome: Valida quando sai do campo (on blur)

Exibição de erro:
- 12px font, --color-error, abaixo do field
- Desaparece quando usuário começa a digitar (limpar)
- Reaparecer se sair do campo com erro ainda presente
```

#### Máscaras de Input

```
CPF:
  Format: 000.000.000-00
  Validation: Digitos check
  Algoritmo: Validar com módulo 11

Email:
  Format: free text (apenas validar @)
  Validation: RFC 5322 simplified
  Regex: /.+@.+\..+/

Telefone:
  Format: (00) 00000-0000
  Validation: 10 ou 11 dígitos
  Brasil standard

Data:
  Format: DD / MM / AAAA
  Validation: Data válida (ex: 31/02 = erro)
  Placeholder: DD / MM / AAAA
```

### LOADING STATES

#### Skeleton Screen
```
Quando usar: Carregamentos > 500ms

Elementos:
- Shimmer animation (left to right)
- Placeholder boxes (shape of real content)
- Duration: 500ms-1500ms
- Loop: até conteúdo carregar

Implementação:
- Background: linear-gradient
- Animation: shimmer 1.5s infinite
- No content underneath

Exemplo:
┌─────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← shimmer animado
│                     │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────┘
```

#### Spinner
```
Quando usar: Carregamentos < 500ms ou ações rápidas

Elementos:
- Rotating circle (16x16px or 24x24px)
- Color: --color-primary (#EA4356)
- Duration: 1s rotation
- Always centered in container

Implementação:
- CSS animation: rotate 1s linear infinite
- OR SVG with transform
- OR GIF (last resort)

Posição:
- Inline (dentro de botão): direita do text, 8px gap
- Em campo: direita do input, 12px from edge
- Em overlay: center da tela
```

### TRANSIÇÕES

#### Básicas
```
Cor/Background: 150ms --ease-in-out
Border: 150ms --ease-in-out
Opacity: 200ms --ease-in-out
Transform: 300ms --ease-in-out (use com cuidado)
Layout: 300ms --ease-in-out (height, width changes)

Não usar:
- Scale transforms (pode parecer ruim em mobile)
- Blur effects (performance)
- Long durations (>300ms cansativo)
```

### INTERATIVIDADE

#### Touch Target Minima
```
Todos os elementos clicáveis: 48x48px (WCAG AA)

Excepções:
- Texto em body: pode ser menor, mas com padding
- Ícones: 44x44px mínimo
- Links inline: 44x44px touch area (invisible padding)

Espaçamento:
- Entre botões: --gap-small (8px)
- Entre campos: --gap-medium (12px)
- Não colocar elementos muito próximos
```

#### Focus Indicators
```
Método: Outline ou box-shadow (nunca remover!)

Padrão DASA:
- Box-shadow: 0 0 0 3px rgba(234, 67, 86, 0.1)
- Outline: none (use shadow)
- Visible contra todos backgrounds

Teste:
- Tab através de toda página
- Verificar visibility em light e dark

Espaço:
- 3px espaço entre elemento e focus ring
- Não cut off por container overflow
```

---

## 4️⃣ CHECKLIST DE IMPLEMENTAÇÃO

### Estrutura Geral
- [ ] Viewport mobile 375px é primária
- [ ] Responsividade testada em: 320px, 375px, 768px, 1024px
- [ ] Scroll vertical natural, sem horizontal
- [ ] Header sempre sticky com breadcrumb/titulo
- [ ] Footer com botões sticky (não ficar atrás de teclado)
- [ ] Safe area padding (iPhone notch, etc)

### Tipografia
- [ ] Font "Dasa Sans" carregada corretamente
- [ ] Fallbacks definidas
- [ ] Tamanhos de fonte corretos por elemento
- [ ] Line-height corretos (1.25 heading, 1.5 body)
- [ ] Peso de fonte corretos (400, 500, 600, 700)
- [ ] Nenhum texto em ALL_CAPS (exceto labels estratégicos)

### Cores
- [ ] Contraste 4.5:1 texto/fundo (WCAG AA)
- [ ] Cores primárias conforme tokens
- [ ] Estados visuais (hover, active, disabled) implementados
- [ ] Sem cor como único diferenciador (usar icons/labels também)
- [ ] Dark mode (futuro): preparar variáveis

### Componentes
- [ ] Todos os inputs 44px height
- [ ] Todos os buttons 48px height
- [ ] Touch targets 48x48px (com padding)
- [ ] Spacing entre elementos consistente (8, 12, 16px)
- [ ] Border radius 8px (inputs, buttons) ou 12px (cards)
- [ ] Shadows conforme tokens

### Validação
- [ ] Validação inline (enquanto digita)
- [ ] Mensagens de erro ao lado/abaixo do campo
- [ ] Mensagens de sucesso com checkmark
- [ ] Campo disabled quando necessário (não pode enviar duplo)
- [ ] Máscara de input funcionando (CPF, email, telefone, data)
- [ ] Erro desaparece quando usuário começa a corrigir

### Loading & Estados
- [ ] Skeleton screen para requests > 500ms
- [ ] Spinner para ações < 500ms
- [ ] Disabled state em button durante submit
- [ ] Animações suaves (300ms padrão)
- [ ] No layout shift durante loading
- [ ] Error boundaries implementadas

### Navegação
- [ ] Breadcrumb/progress visible ("2 de 8")
- [ ] Botão "Voltar" funciona (volta etapa anterior, mantém dados)
- [ ] ESC key fecha modals
- [ ] Links acessíveis (underline ou button-like)
- [ ] Tab order lógico (top to bottom)

### Acessibilidade (A11y)
- [ ] Todas labels associadas com inputs (for/id)
- [ ] ARIA labels em ícones apenas
- [ ] Semantic HTML (<button>, <input>, <label>)
- [ ] Keyboard navigation funciona (Tab, Enter, ESC)
- [ ] Focus indicators visíveis em todos elementos
- [ ] Screen reader testado (VoiceOver/NVDA)
- [ ] Contraste 4.5:1 validado (tudo)
- [ ] Sem auto-play de áudio/vídeo
- [ ] Tamanho texto redimensionável (zoom 200%)

### Copy & Conteúdo
- [ ] Todas copy exatamente como em dasa-agendamento-copy-completa.md
- [ ] Nenhum CTA com ponto final
- [ ] CTAs em infinitivo
- [ ] Horários em 24h com "h" (6h, 13h, 18h)
- [ ] Termos DASA corretos (paciente, não usuário; convênio, não plano)
- [ ] Sem termos da lista "evitar" (ver, preço, etc)

### Performance
- [ ] First contentful paint < 2s
- [ ] Imagens otimizadas (<100KB por tela)
- [ ] Bundle size razoável (< 500KB gzipped)
- [ ] Animations 60fps (use transform/opacity)
- [ ] Sem memory leaks (cleanup listeners)
- [ ] Sem layout thrashing (batch reads/writes)

### Segurança
- [ ] HTTPS sempre
- [ ] CSRF tokens em formulários
- [ ] XSS protection (sanitizar inputs)
- [ ] Senhas não logadas
- [ ] API tokens seguros (httpOnly cookies)
- [ ] Rate limiting em submit

### Testing
- [ ] Unit tests componentes principais (80% coverage)
- [ ] Integration tests fluxo completo
- [ ] E2E tests (Cypress/Playwright) - happy path
- [ ] Teste em browsers: Chrome, Firefox, Safari, Edge
- [ ] Teste em devices: iPhone, Android, iPad
- [ ] Teste com teclado apenas (sem mouse)
- [ ] Teste com screen reader

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)

### Deployment
- [ ] Staging environment testado
- [ ] Analytics integrado
- [ ] Error tracking (Sentry, etc)
- [ ] A/B testing preparado (se necessário)
- [ ] Rollback plan
- [ ] Monitoring de performance

---

## 5️⃣ EDGE CASES

### Validação: Menores de Idade

```
Trigger: Data de nascimento < 18 anos

Behavior:
1. Mostrar mensagem após input de data
   "Paciente é menor de 18 anos"
2. Pedir para confirmar responsável
   "Responsável será necessário na clínica"
3. Validação: Responsável DEVE estar presente
4. Armazenar flag na base de dados

Copy:
- "Este paciente é menor de idade. Um responsável precisará estar presente"
- "A clínica pode requerer documento de autorização"

Backend:
- Flag: is_minor = true
- Campo: responsible_name, responsible_cpf, responsible_phone
- Regra: sem agendamento sem responsável
```

### Sem Disponibilidade

```
Trigger: Nenhum horário disponível para seleção + unidade + data

Behavior:
1. Mostrar mensagem clara
2. Oferecer alternativas (próximos 7 dias)
3. Opção de contact suporte
4. Permitir ficar em fila/espera (optional)

Copy:
- "Sem horários disponíveis para [data] em [unidade]"
- "Próximos disponíveis: 30/11 (sábado), 01/12 (domingo)"
- "Deseja ser adicionado à fila de espera? Ligaremos quando tiver vaga"

Implementation:
- Desabilitar data se sem horários
- Mostrar "Sem vagas" em tooltip
- Escurecer data grayed out
- Sugerir próximas datas com availability
```

### Convênio Não Coberto

```
Trigger: Exame não coberto pelo convênio selecionado

Behavior:
1. Mostrar no screen de Preço
2. Status: "Não coberto"
3. Oferecer como Particular
4. Permitir trocar convênio
5. Permitir continuar como Particular

Copy:
- "Este exame não é coberto por Bradesco Saúde"
- "Valor particular: R$ 85,00"
- "Deseja trocar convênio ou agendar como particular?"

Implementation:
- Mostrar price warning card
- Botão "Alterar convênio" proeminente
- Botão primário: "Continuar como particular"
- Salvar escolha user (preferência)
```

### Convênio Vencido

```
Trigger: API retorna status "expired" para convênio

Behavior:
1. Notificar user
2. Oferecer particular
3. Sugerir contact convênio
4. Permitir continuar (é responsabilidade user)

Copy:
- "Seu convênio pode estar vencido"
- "Verifique a validade e renove se necessário"
- "Pode agendar como particular enquanto renova"

Implementation:
- Warning alert (amarelo)
- Info link para contato suporte/convênio
- Não bloquear (user escolhe)
- Log para analytics
```

### Múltiplas Pessoas sem Convênio Uniforme

```
Trigger: Fluxo 3, João tem Bradesco, Maria tem Amil

Behavior:
1. Permitir (sistema já suporta)
2. Mostrar preços individualizados
3. Oferecer diferentes opções de pagamento
4. Detalhar na revisão

Implementation:
- Preço card: "João (Bradesco): R$ 0,00 | Maria (Amil): R$ 45,00"
- Opções pagamento:
  a) Você paga tudo agora (1 transação)
  b) Cada um paga depois (cash na clínica)
  c) Dividir entre vocês (2 transações)
- Na revisão: mostrar convênio e preço por pessoa
```

### OCR Falha

```
Trigger: Foto enviada mas não consegue ler

Behavior:
1. Mostrar erro claro
2. Oferecer retry
3. Permitir fallback (digitação manual)
4. Não bloquear

Copy:
- "Não conseguimos ler a foto. Tirou bem focado?"
- "Tente tirar outra foto ou digite os exames manualmente"

Implementation:
- Botão: "Tentar novamente" (retry upload)
- Botão: "Digitar exames" (fallback)
- Log erro com imagem (interno)
- Não expor detalhes técnicos
```

### Usuário Deslogado Dentro do Fluxo

```
Trigger: Session timeout ou logout em meio ao agendamento

Behavior:
1. Detectar na próxima ação (API retorna 401)
2. Salvar estado parcial (local storage)
3. Redirecionar para login
4. Após login, restaurar estado
5. Continuar do ponto onde parou

Implementation:
- localStorage: { etapa: 3, exame: "hemograma", convenio: "bradesco" }
- Session check a cada ação
- Clear sensitive data (CPF, email)
- Restaurar somente data publicamente safe
```

### Teclado Ativo (Mobile)

```
Trigger: Input focused, teclado virtual aberto

Behavior:
1. Footer com botões não ficar atrás do teclado
2. Scroll automático para campo focado
3. Padding bottom adequado para safe area

Implementation:
- Bottom padding: var(--safe-area-inset-bottom) + 24px
- Scroll to focused: input.focus() → scrollIntoView()
- Test em real devices com teclado ativo
- Usar viewport-fit=cover com safe-area-inset
```

### Slow Network / Timeout

```
Trigger: Network < 3G, requisição > 10s

Behavior:
1. Mostrar timeout error
2. Permitir retry
3. Não perder dados
4. Dar opção de contact suporte

Copy:
- "Conexão lenta. Retentando..."
- "Conexão não conseguiu completar. Verifique internet e tente novamente"
- "Demorando? Contact suporte" (link)

Implementation:
- Timeout: 30s (bastante generoso)
- Retry automático: 1x após 2s
- Manual retry button sempre disponível
- Guardar draft no localStorage
- Show offline indicator se necessário
```

---

## 6️⃣ INTEGRAÇÃO (BACKEND)

### Endpoints Esperados

```
POST /api/v1/exams/search
  Input: { query: "hemograma", limit: 10 }
  Output: { exams: [{ id, name, description, price, coverage }] }
  Timeout: 5s

POST /api/v1/insurance/validate
  Input: { insurance_name: "bradesco", exam_id: 123 }
  Output: { coverage: "100%", price: 0, is_covered: true }
  Timeout: 3s

GET /api/v1/locations
  Input: { lat, lon, distance_km: 10 }
  Output: { locations: [{ id, name, address, distance, hours_open }] }
  Timeout: 5s

GET /api/v1/availability
  Input: { location_id: 1, exam_id: 123, date_start, date_end }
  Output: { availability: { "2025-11-28": ["7:30", "8:00", ...], ... } }
  Timeout: 5s

POST /api/v1/appointments
  Input: { exam_ids, insurance_id, location_id, datetime, patient_data, ... }
  Output: { appointment_id, confirmation_code, status }
  Timeout: 10s

POST /api/v1/appointments/{id}/confirm
  Input: { terms_accepted: true }
  Output: { status: "confirmed", code, ... }
  Timeout: 10s
```

### Data Models

```
EXAM:
  id: UUID
  name: "Hemograma Completo"
  description: "Análise completa das células sanguíneas"
  code: "HEM001"
  price_tabela: 85.00
  duration_min: 15
  prep_required: true
  prep_text: "Jejum de 8 horas"
  created_at: timestamp

INSURANCE:
  id: UUID
  name: "Bradesco Saúde"
  operator: "bradesco"
  status: "active" | "inactive" | "expired"
  user_insurance_id: reference to user insurance
  created_at: timestamp

LOCATION:
  id: UUID
  name: "Delboni Sumaré"
  address: "Av. Paulista, 2000, São Paulo, SP"
  lat: -23.5505
  lon: -46.6333
  hours_open: "7:00 - 22:00"
  hours_weekend: "8:00 - 16:00"
  phone: "(11) 3050-8000"
  created_at: timestamp

APPOINTMENT:
  id: UUID
  code: "AGD-2025-1234567"
  user_id: UUID
  patient_id: UUID (if different from user)
  exam_id: UUID
  location_id: UUID
  insurance_id: UUID (or null if particular)
  scheduled_datetime: timestamp
  status: "pending" | "confirmed" | "completed" | "cancelled"
  terms_accepted: boolean
  confirmation_sent_at: timestamp
  created_at: timestamp
  updated_at: timestamp
```

---

## 🎯 PRÓXIMAS ETAPAS

### Após Implementação
- [ ] User testing (5+ users)
- [ ] A/B test de copy variations (se relevante)
- [ ] Performance baseline (FCP, LCP, CLS)
- [ ] Acessibilidade audit completo
- [ ] Security audit

### Monitoramento
- [ ] Conversion rate por etapa
- [ ] Drop-off analysis
- [ ] Error rates por campo
- [ ] Performance metrics (RUM)
- [ ] User feedback

---

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Completo | **Implementação:** Pronto para Dev
