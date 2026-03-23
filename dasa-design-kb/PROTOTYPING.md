# Prototyping Hub — Design Experience Dasa

> Como usar o pipeline de design-to-code com contexto Dasa.

Figma como ponto de partida, código como destino, KB como camada de regras e contexto.

---

## O pipeline

```
Figma (design)
    ↓  Figma MCP — extrai tokens, componentes, layout
    ↓  Code Connect (em breve) — resolve nome Figma → path de import
    ↓
[skill] implement-design
    ↓  KB (dasa-design-kb) — aplica regras de uso, copy, acessibilidade
    ↓
Código gerado
    ↓
[skill] quality-gate — valida tokens, touch targets, a11y, copy inline
    ↓  (se copy exige revisão profunda)
[skill] copy-review — valida glossário, CTAs, capitalização, termos proibidos
    ↓
Código aprovado → pronto para revisão humana
```

**Princípio:** Figma dá o *o quê* (estrutura, tokens). O KB dá o *como* e o *por quê* (regras de uso, copy, decisões). O AI conecta os dois.

> As skills se encadeiam automaticamente: `implement-design` aciona `quality-gate` ao final do passo 7; `quality-gate` aciona `copy-review` quando necessário. Ver [`SKILLS.md`](SKILLS.md) para o mapa completo.

---

## Fluxo básico: Figma → Código

### 1. Selecione o frame no Figma

Abra o Figma, selecione o frame ou componente que quer implementar. Copie o link (`Ctrl+L` / `Cmd+L`).

### 2. Acione a skill `implement-design` no Cursor

```
Use a implement-design skill para implementar [nome do componente/tela]
do projeto Dasa. Link: [cole o link do Figma]
```

A skill vai:

- Usar o Figma MCP para extrair tokens, nomes de componente e estrutura
- Consultar `docs/design-system.md` para decisões de uso
- Consultar `docs/specs/figma-mapping.md` para regras de componente
- Consultar `docs/copy-rules.md` para copy inline
- Gerar código que usa variáveis CSS (`var(--primary)`) em vez de valores hardcoded

### 3. Valide com `quality-gate`

Após a geração:

```
Use a quality-gate skill para revisar o código gerado acima
```

A skill vai conferir:

- Tokens sem hardcode
- Touch targets ≥ 44px
- Copy conforme regras Dasa
- Componentes não recriados ad-hoc

### 4. Itere

Se precisar ajustar: edite no código, volte ao Figma para checar paridade visual, ajuste. O ciclo é rápido — Figma para inspiração e documentação, código para prototipação real.

---

## Fluxo avançado: começar diretamente no código

Às vezes você tem clareza suficiente para pular o Figma e ir direto para o código — especialmente em interações complexas que são difíceis de prototipar visualmente.

```
Crie um componente [descrição] seguindo as regras do DS Dasa:
- Use apenas tokens via CSS variables
- Siga as regras de componente em @docs/specs/figma-mapping.md
- Aplique copy conforme @docs/copy-rules.md
- Mobile-first, breakpoint base 375px
```

Após gerar, rode o `quality-gate` normalmente.

---

## Skills disponíveis

| Skill | Quando usar | Como acionar |
|---|---|---|
| `implement-design` | Converter frame Figma em código | "Use a implement-design skill..." |
| `quality-gate` | Validar código gerado contra DS | "Use a quality-gate skill..." |
| `copy-review` | Revisar textos de interface | "Revise esse copy..." |
| `kb-commit` | Publicar mudanças no KB via PR | "Publica as mudanças do KB..." |

**Pipeline padrão:** `implement-design` → `quality-gate` → (se necessário) `copy-review`.

> Documentação completa de orquestração, tabela de triggers e troubleshooting em [`SKILLS.md`](SKILLS.md).


---

## Cursor rules ativas neste repositório


| Rule               | Ativa para                         | Função                                           |
| ------------------ | ---------------------------------- | ------------------------------------------------ |
| `dasa-kb.mdc`      | `*.md`, `docs/**`                  | Gestão do KB — regras de edição, validação, PR   |
| `dasa-codegen.mdc` | `*.tsx`, `*.ts`, `*.html`, `*.css` | Geração de código — instrui o AI a usar MCP + KB |


---

## O que vem a seguir: Code Connect

Quando a biblioteca oficial for publicada no Figma e o Code Connect for configurado:

- O AI vai **saber o path de import** de cada componente diretamente do Figma — sem precisar adivinhar ou recriar
- `figma-mapping.md` vai complementar o Code Connect com **regras de uso** (quando usar, estados obrigatórios) — as duas coisas convivem
- O pipeline fica mais preciso: "esse botão é `@/components/ui/Button`" em vez de "aparentemente é um botão, vou criar..."

**Enquanto isso:** o Figma MCP já entrega tokens e nomes de componente. Use-o — é a maioria do valor.

---

## Code 101 para designers

> Você não precisa ser dev para trabalhar com código. Estas são as únicas coisas que você precisa entender para prototipar no Cursor.

### Git em uma frase

Git é o version history do Figma — mas para código. Cada mudança que você salva ("commit") fica registrada, com autor e timestamp. Você pode voltar para qualquer versão anterior.

### Os 4 conceitos que importam

**Branch** — uma cópia isolada do código onde você experimenta sem afetar o restante do time. Pense como uma "página duplicada" no Figma onde você rabisca ideias.

**Pull** — pegar as últimas mudanças do repositório remoto para o seu computador. Faça sempre antes de começar a trabalhar, para não sobrescrever mudanças de outras pessoas.

**Commit** — salvar um snapshot das suas mudanças com uma mensagem descritiva. Diferente do "Salvar" normal — o commit fica no histórico permanentemente.

**Push / PR** — enviar suas mudanças para o repositório remoto e (opcionalmente) abrir um Pull Request para o time revisar ou usar o código.

### Comandos essenciais

```bash
git pull                              # pegar mudanças mais recentes
git checkout -b playground/minha-feature  # criar e entrar numa branch nova
git add .                             # marcar todas as mudanças para commit
git commit -m "feat(playground): descrição da mudança"
git push                              # enviar para o repositório remoto
```

### O que é localhost

Quando você roda o projeto localmente (`npm run dev` ou similar), o browser abre um endereço como `http://localhost:3000`. Esse link **só funciona no seu computador** — não dá para compartilhar com outras pessoas. Para compartilhar, é preciso fazer deploy (veja `docs/NEXT-FEATURES.md`).

### Skills do Cursor que substituem os comandos acima

> Na prática, você raramente precisa digitar esses comandos manualmente. O Cursor tem skills que fazem isso por você:


| Operação                | Como acionar no Cursor                             |
| ----------------------- | -------------------------------------------------- |
| Commitar mudanças       | "commita as mudanças" / "usa a skill kb-commit"    |
| Criar branch nova       | "cria uma branch playground/minha-feature"         |
| Trocar de branch        | "muda para a branch main" / "checkout na branch X" |
| Pegar mudanças recentes | "faz um pull das mudanças mais recentes"           |
| Abrir PR                | "abre um PR draft com essas mudanças"              |


Use os comandos manuais apenas se a skill não resolver ou para entender melhor o que está acontecendo.

---

## Playground local

> O playground é seu espaço seguro para prototipar. Nada que você faz aqui afeta produção.

### Como funciona

Protótipos ficam em `docs/playground/` — a pasta **existe no repositório** (mantida via `.gitkeep`), mas seu **conteúdo não é versionado** (entradas `docs/playground/*` e `!docs/playground/.gitkeep` no `.gitignore`). Cada designer mantém os seus protótipos localmente, sem conflitar com o trabalho de outros.

### Fluxo básico

```
1. Crie uma branch:  git checkout -b playground/minha-feature
   (ou peça ao Cursor: "cria uma branch playground/minha-feature")

2. Edite ou crie um arquivo em docs/playground/ no Cursor
   Exemplo de prompt: "cria um protótipo do componente de filtros seguindo o DS Dasa.
   Link do Figma: [cole o link]"

3. Visualize no browser (localhost)
   O Cursor vai indicar o comando para rodar o servidor de desenvolvimento

4. Itere: mude no Cursor, salve, veja no browser, ajuste no Figma se necessário

5. Para compartilhar: tire screenshots ou grave a tela (Loom, QuickTime, etc.)
   Deploy para URL compartilhável é uma próxima feature — veja docs/NEXT-FEATURES.md
```

### Dicas de prompts para o playground

```
"Cria um protótipo de [componente/tela] seguindo as regras do DS Dasa.
Link Figma: [link]. Use apenas componentes da biblioteca."

"Adiciona interação de [hover/click/scroll] nesse componente do playground."

"Ajusta o spacing do componente para ficar igual ao Figma — link: [link]."
```

---

## Gap design ↔ código (e como lidar hoje)

> Este é um problema real, reconhecido por designers de referência no mercado. Não existe solução automatizada ainda.

### O problema

Quando você prototipa algo no código e o time aprova o padrão, você tem duas fontes de verdade desalinhadas:

- **Figma:** ainda mostra a versão antiga (ou não tem o protótipo documentado)
- **Código:** tem o comportamento real aprovado, mas está numa branch de playground

Não existe ferramenta que sincronize automaticamente código → Figma. Figma → código (via Code Connect) funciona, mas o caminho inverso ainda é manual.

### Como o time lida hoje

Quando um protótipo de código é aprovado como padrão oficial:

1. **Documente no Figma manualmente:** tire screenshots do comportamento em código, cole no Figma, adicione anotações de interação (estados, timing, edge cases)
2. **Código é fonte de verdade de comportamento:** como a interação funciona, timing de animação, estados de loading
3. **Figma é fonte de verdade para outros designers:** especificação visual, tokens, como outros designers devem implementar o padrão

### O que está planejado

Uma solução mais elegante para esse gap está documentada em `docs/NEXT-FEATURES.md`.

---

## Contribuindo com o KB

Se você encontrar uma regra que não está documentada, um termo de copy novo ou uma decisão de design importante:

1. Edite o arquivo correspondente (`docs/copy-rules.md`, `docs/design-system.md`, `docs/ux-guidelines.md`)
2. Use a skill `kb-commit` para commitar e abrir PR

> Para atualizar regras do plugin Figma (checklist, glossário estruturado), edite o `kb.json` no [`dasa-figma-plugin`](https://github.com/design-dasa/dasa-figma-plugin).

Ver `CONTRIBUTING.md` para o guia completo.

---

## Referências rápidas

- Decisões de design: `[docs/design-system.md](docs/design-system.md)`
- Regras de uso de componentes: `[docs/specs/figma-mapping.md](docs/specs/figma-mapping.md)`
- Copy e tom de voz: `[docs/copy-rules.md](docs/copy-rules.md)`
- Princípios de UX: `[docs/ux-guidelines.md](docs/ux-guidelines.md)`
- Tokens (offline): `[tokens/alm-tokens.json](tokens/alm-tokens.json)`
- Contexto de negócio: `[docs/business-strategy.md](docs/business-strategy.md)`

