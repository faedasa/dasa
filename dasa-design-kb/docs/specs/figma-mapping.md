---
title: Component Guidelines — Design System Dasa
tags: [specs, figma, design-system]
updated: 2026-03-19
---

# Component Guidelines — Design System Dasa

> **Versão:** 2.0 | **Atualizado:** 2026-03-09

Regras de **como usar** os componentes do DS Dasa — o *quando*, o *como* e o *não faça*.

**O que existe (estrutura, variantes, paths):** consulte o Figma via MCP. Com Code Connect ativo, o AI obtém os paths de importação diretamente — este documento complementa com as regras de uso que o Figma não documenta.

---

## Regra fundamental

> **Nunca recrie um componente que já existe na biblioteca.**
>
> Se o Figma MCP ou Code Connect indicar que um componente existe, importe-o. Criar variações ad-hoc é a principal causa de inconsistência visual e de acessibilidade.

---

## Botões

### Quando usar cada variante

| Variante | Quando usar | Quando NÃO usar |
|---|---|---|
| Primary | CTA principal da tela — uma por tela | Múltiplos CTAs no mesmo nível |
| Secondary | Ação alternativa, complementar ao Primary | Como único CTA da tela |
| Ghost/Text | Ações destrutivas ou de saída ("Cancelar", "Voltar") | Ações que avançam o fluxo |
| Icon-only | Espaço muito restrito com ícone universalmente reconhecido | Ações novas ou ambíguas |

### Regras obrigatórias

- **Position em mobile:** CTA Primary sticky na base da tela, não inline no conteúdo
- **Touch target:** `min-height: 44px` — sem exceção
- **Texto:** infinitivo + complemento, 2–3 palavras (ver `copy-rules.md` — CTAs proibidos: "Continuar", "Próximo", "Avançar")
- **Loading state:** substituir texto por spinner enquanto a ação processa; nunca desabilitar silenciosamente
- **Estados obrigatórios:** default, hover, pressed, loading, disabled

### O que nunca criar ad-hoc

- Botão com `border-radius` diferente do componente oficial
- Botão com altura menor que 44px
- Variações de cor fora da paleta semântica (`--primary`, `--error`, etc.)

---

## Cards

### Variantes e quando usar

| Variante | Conteúdo | Quando usar |
|---|---|---|
| Card/Exame | Título exame, jejum, duração, preço, CTA | Listagem de exames no fluxo de agendamento |
| Card/Unidade | Logo marca, endereço, distância, horário | Seleção de unidade/laboratório |
| Card/Pacote | Bundle de exames, preço composto, tag de desconto | Upsell de pacotes |
| Card/Resumo | Dados do agendamento confirmado | Tela de confirmação e histórico |

### Regras obrigatórias

- `border-radius: 60px` — identidade visual Dasa, não negociável
- `padding: 60px` — margem interna generosa, não reduza
- `box-shadow: Shadow/01` — apenas elevação base; nunca Shadow/03 ou /04 em cards de lista
- **Estado de loading:** usar skeleton screen com as mesmas dimensões do card preenchido
- **Estado vazio:** nunca esconder cards — mostrar estado `empty` com mensagem acionável

### Estrutura de conteúdo obrigatória (Card/Exame)

1. Título do exame (Heading/md)
2. Metadados (Body/sm): duração, jejum quando aplicável
3. Preço ou indicação de convênio
4. CTA ("Agendar exame")

Nunca omita o CTA do card — o usuário precisa conseguir agendar diretamente da listagem.

---

## Inputs e formulários

### Regras de label

- Label sempre visível acima do campo — nunca use placeholder como substituto de label
- Label não some no focus (evite o padrão "floating label" que esconde o label)
- Campos obrigatórios: marcar com asterisco ou texto "(obrigatório)" — não confiar apenas em cor

### Estados obrigatórios

Todos os inputs devem ter os 5 estados implementados:
1. **Default:** borda padrão, label visível
2. **Focus:** borda destacada com `--primary`, sem mudança de label
3. **Filled:** conteúdo preenchido
4. **Error:** borda `--error`, mensagem de erro abaixo (ver copy-rules.md — sem prefixo "Erro:")
5. **Disabled:** opacidade reduzida, cursor `not-allowed`

### Máscaras obrigatórias

| Campo | Máscara | Exemplo |
|---|---|---|
| CPF | `999.999.999-99` | 123.456.789-00 |
| Telefone | `(99) 9 9999-9999` | (11) 9 8765-4321 |
| CEP | `99999-999` | 01310-100 |
| Data | `DD/MM/AAAA` | 15/03/1985 |

Sem máscara o usuário não sabe o formato esperado — erro de usabilidade crítico.

### Validação: quando disparar

- **Inline (em tempo real):** apenas para formato/máscara (CPF, telefone)
- **On-blur:** completude e validade (campo obrigatório preenchido, email válido)
- **On-submit:** resumo de todos os campos com erro, com scroll para o primeiro erro

Nunca valide inline para campos de texto livre — interrompe o raciocínio do usuário.

---

## Navegação e header

### Regras de uso

- Header fixo no topo com botão de voltar em todas as telas internas do fluxo
- Título da tela no header: curto, máximo 3 palavras, sem verbo
- Botão fechar (X): apenas em modais e bottom sheets, não em telas de fluxo linear
- Progress indicator: obrigatório em fluxos com múltiplas etapas (ex: agendamento)

---

## Modais e bottom sheets

### Quando usar modal vs. bottom sheet

| Situação | Componente |
|---|---|
| Confirmação destrutiva ("Cancelar agendamento?") | Modal centralizado |
| Seleção de opção em mobile (data, convênio, filtro) | Bottom sheet |
| Informação contextual rápida | Bottom sheet |
| Erro crítico que bloqueia o fluxo | Modal centralizado |

### Regras obrigatórias

- Bottom sheet: sempre com drag handle visível e possibilidade de fechar com swipe down
- Modal: sempre com overlay escuro (`--neutral-inverse-00` + opacity), fechar com Esc
- Nunca abrir modal sobre modal — use step dentro do mesmo modal se necessário

---

## Tokens de variáveis Figma → nome semântico

Esta tabela é para orientação de nomenclatura — os valores vivos estão no Figma.

| Coleção Figma | Token semântico | Uso |
|---|---|---|
| `1 - Brand > Nav > Brand/Primary Shades/60` | `--primary` | Cor de ação principal |
| `1 - Brand > Nav > Brand/Primary Shades/50` | `--primary-hover` | Hover state de elementos primários |
| `_Base/_Common Tones/Green/100` | `--success` | Confirmações, sucesso |
| `_Base/_Common Tones/Yellow/100` | `--warning` | Alertas, avisos |
| `_Base/_Common Tones/Red/80` | `--error` | Erros de validação |
| `_Base/_Common Tones/Acqua ou Blue/90` | `--info` | Informações contextuais |
| `Effects > Shadow/01` | `--shadow-xs` | Elevação base (cards de lista) |
| `Effects > Shadow/04` | `--shadow-lg` | Elevação alta (modais, drawers) |
| `Sizes/size-60` | `--size-60` | Padding de card, radius de card |

---

## Code Connect — paths de import

> **Como funciona:** no dev mode do Figma, cada componente com Code Connect ativo exibe o path de import diretamente no painel. O Figma MCP expõe essa informação para o AI do Cursor — que deve usar o path real em vez de criar o componente do zero.

### Como verificar se um componente tem Code Connect

1. Abra o Figma no dev mode (`Shift+D` ou pelo seletor de modo)
2. Selecione o componente
3. No painel direito, procure a seção **Code** — se houver Code Connect ativo, o path de import aparece ali
4. Copie o path e informe ao Cursor, ou envie o link do frame — o Figma MCP extrai automaticamente

### Tabela de componentes

> **Status atual:** Code Connect em configuração. Os paths abaixo serão preenchidos com os valores reais à medida que cada componente for conectado. Consulte sempre o Figma MCP como fonte primária — esta tabela é fallback para quando o MCP não estiver disponível.

| Componente Figma | Code Connect | Path de import |
|---|---|---|
| Button / Primary | ⏳ em breve | `@/components/ui/Button` |
| Button / Secondary | ⏳ em breve | `@/components/ui/Button` |
| Button / Ghost | ⏳ em breve | `@/components/ui/Button` |
| Card / Exame | ⏳ em breve | `@/components/cards/CardExame` |
| Card / Unidade | ⏳ em breve | `@/components/cards/CardUnidade` |
| Card / Pacote | ⏳ em breve | `@/components/cards/CardPacote` |
| Card / Resumo | ⏳ em breve | `@/components/cards/CardResumo` |
| Input / Text | ⏳ em breve | `@/components/forms/InputText` |
| Input / Search | ⏳ em breve | `@/components/forms/InputSearch` |
| Select / Dropdown | ⏳ em breve | `@/components/forms/Select` |
| Modal / Default | ⏳ em breve | `@/components/overlays/Modal` |
| Bottom Sheet | ⏳ em breve | `@/components/overlays/BottomSheet` |
| Progress / Steps | ⏳ em breve | `@/components/navigation/ProgressSteps` |
| Header / App | ⏳ em breve | `@/components/navigation/Header` |
| Badge / Status | ⏳ em breve | `@/components/feedback/Badge` |
| Skeleton / Card | ⏳ em breve | `@/components/feedback/Skeleton` |

### Regra para o AI (obrigatória)

Ao receber um link do Figma:

1. **Consulte o Figma MCP primeiro** — verifique quais componentes do frame têm Code Connect com path de import
2. **Se Code Connect retornar path:** importe diretamente — nunca crie o componente do zero
3. **Se Code Connect não estiver configurado ainda:** use a tabela acima como referência de nomenclatura e consulte `figma-mapping.md` para regras de uso
4. **Reporte sempre** quais componentes têm Code Connect ativo e quais não têm antes de gerar código

---

## Manutenção

- Atualizar quando novos componentes forem adicionados à biblioteca Figma
- Quando Code Connect for configurado para um componente: atualizar o status na tabela acima de ⏳ para ✅ e confirmar o path real
- Com Code Connect ativo: este documento documenta **regras de uso**, o Code Connect documenta os paths — são complementares
- Para exportar tokens atualizados do Figma: reexportar `alm-tokens.json` via Tokens Studio
