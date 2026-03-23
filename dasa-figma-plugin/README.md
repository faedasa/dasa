# Dasa Design Quality Checklist - Figma Plugin

Plugin de auditoria de qualidade de design que verifica conformidade com o Design System da Dasa e fornece quick fixes automáticos.

## Regra primária

**Sempre associar à variável mais próxima disponível.** Quando o DS está conectado ao documento, o plugin oferece vínculo automático à variável mais próxima (cor, spacing, radius). Detalhes em [RULES.md](./RULES.md).

## Autor

**Desenvolvido por Cosme Faé para Dasa**

- Email: c_fae.ext@dasa.com.br
- LinkedIn: [cosmefae](https://linkedin.com/in/cosmefae)

## Funcionalidades

- Auditoria automática de conformidade com Design System
- Verificação de tokens (cores, tipografia, espaçamentos, border radius)
- Análise de copy e terminologia
- Checagem de acessibilidade (contraste, touch targets)
- Quick fixes automáticos para correções seguras
- Score de qualidade por categoria
- Exportação de relatórios em JSON

## Desenvolvimento

### Requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Scripts

```bash
# Build (inclui sync do KB antes do esbuild)
npm run build

# Build com watch
npm run watch

# Typecheck
npm run typecheck

# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Tudo: testes + typecheck + build
npm run check
```

## Estrutura

```
figma-plugin/
├── kb.json                  # Knowledge Base — fonte da verdade (tokens, regras, copy)
├── scripts/
│   └── sync-kb.mjs          # Gera src/kb/bundled.ts a partir de kb.json
├── src/
│   ├── main/                # Código que roda no sandbox do Figma
│   │   ├── code.ts          # Entry point: carrega KB, orquestra auditoria
│   │   ├── scanner.ts       # Extração de dados de nodes Figma
│   │   ├── rulesEngine.ts   # Avaliação de regras com findings + quick fixes
│   │   ├── copyChecker.ts   # Verificação de copy (glossário, CTA, proibidos)
│   │   ├── quickFix.ts      # Aplicação de correções automáticas
│   │   ├── variablesRegistry.ts # Mapeamento de variáveis do documento Figma
│   │   └── contrastUtils.ts # Cálculo de contraste WCAG
│   ├── ui/                  # Interface do usuário
│   │   ├── ui.html          # HTML e CSS
│   │   └── ui.ts            # Lógica da UI (postMessage)
│   ├── shared/              # Tipos e constantes compartilhadas
│   └── kb/                  # Camada de Knowledge Base
│       ├── types.ts         # Interface KBData (schema do JSON)
│       ├── matchers.ts      # Lógica pura: createMatchers(KBData)
│       ├── loader.ts        # loadKB(): fetch → cache → bundled
│       └── bundled.ts       # Snapshot estático de kb.json (auto-gerado)
├── src/__tests__/
│   └── kb.test.ts           # Testes unitários (Vitest)
├── dist/                    # Arquivos compilados
├── manifest.json            # Manifest do plugin Figma
├── vitest.config.ts         # Configuração de testes
└── esbuild.config.mjs       # Configuração de build
```

## Arquitetura do KB

O KB (knowledge base) é separado em duas camadas:

**Dados (`kb.json`)** — JSON versionado que contém tokens do DS, regras, glossário de copy, checklist e padrões UX. Vive neste repositório e é a única fonte de verdade. Designers atualizam criando PRs diretamente aqui.

**Lógica (`src/kb/matchers.ts`)** — `createMatchers(data: KBData)` recebe o JSON e devolve todas as funções de validação (isTokenColor, findClosestToken, validateCTA, etc.) parametrizadas pelos dados.

**Loader (`src/kb/loader.ts`)** — `loadKB()` aplica a sequência:
1. Fetch em `raw.githubusercontent.com` (branch `main` deste repo)
2. Cache em `figma.clientStorage` (persiste entre sessões)
3. Fallback para o bundled embutido na build (funciona offline)

```
dasa-figma-plugin/kb.json  ← fonte de verdade (editada via PR)
       ↓ npm run build (sync-kb.mjs)
   bundled.ts (fallback offline)

       ↓ runtime (loader.ts)
raw.githubusercontent.com/.../dasa-figma-plugin/main/kb.json
       ↓ fallback
 clientStorage cache
       ↓ fallback
   bundled.ts (build-time)
       ↓
 createMatchers(KBData)
       ↓
 rulesEngine + copyChecker
```

Para atualizar o KB: edite `kb.json` neste repo e rode `npm run build` (o sync é automático). O plugin buscará a versão atualizada na próxima execução via fetch remoto.

## Testes

Os testes cobrem o KB (schema e lógica de validação) sem depender do Figma:

```bash
npm run test
```

Coberto: schema de `kb.json`, `isTokenColor`, `findClosestToken`, `closestFontSize`, `closestFromSet`, `validateCTA`, `findTermViolations`, `findForbiddenTerms`, `isTokenShadowBlur`, `isTokenLineHeight` e constantes.

Não coberto por testes automatizados: `rulesEngine`, `copyChecker`, `quickFix` e UI (dependem do Figma; validar manualmente via Development → Import plugin from manifest).

## Reportar Bugs

📧 [c_fae.ext@dasa.com.br](mailto:c_fae.ext@dasa.com.br?subject=Bug%20Report%20-%20Dasa%20DQC%20Plugin)

## Licença

© 2026 Dasa - Todos os direitos reservados

Uso interno exclusivo da Dasa.
