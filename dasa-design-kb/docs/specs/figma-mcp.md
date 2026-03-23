---
title: Figma MCP — Guia Operacional
tags: [specs, figma]
updated: 2026-03-19
---

# Figma MCP — Guia Operacional

> **Versão:** 1.0 | **Atualizado:** 2026-03-17

Como o Figma MCP está configurado neste projeto e como usá-lo no dia a dia.

---

## O servidor Figma MCP neste projeto

Este projeto usa o **Figma Desktop MCP Server** — um servidor local que roda dentro do próprio Figma Desktop App, sem OAuth, sem tráfego de design pela nuvem.

O servidor remoto oficial (`https://mcp.figma.com/mcp`) **não é o padrão adotado** — está disponível no ambiente mas não deve ser acionado no fluxo diário. Se ambos aparecerem como opções no Cursor, prefira sempre o servidor `Figma` (desktop).

A configuração já está presente globalmente e nenhuma instalação adicional é necessária:

```json
{
  "mcpServers": {
    "Figma": { "url": "http://127.0.0.1:3845/mcp" }
  }
}
```

### Requisito de seat Figma

O Desktop MCP Server requer **Dev seat ou Full seat** no plano Professional, Organization ou Enterprise do Figma. Seats do tipo Viewer, Collab ou contas no plano Starter **não têm acesso** ao Desktop MCP.

Verifique o seu seat em Figma → Settings → Plans antes de começar. Se não tiver acesso, contate o admin da organização.

### Skill implement-design bundlada no projeto

A skill `implement-design` está disponível diretamente neste repositório em `.cursor/skills/implement-design/` — **nenhum plugin adicional é necessário**. Ela funciona com o Desktop MCP e é ativada automaticamente pelo Cursor quando detecta uma URL do Figma ou pedido de implementação.

---

## Pré-requisito — antes de usar

O MCP server só fica disponível enquanto o Figma Desktop está aberto **e** com Dev Mode ativo:

1. Abra o **Figma Desktop App** (app nativo — não o browser)
2. Abra qualquer arquivo Figma Design
3. Ative o **Dev Mode** com `Shift+D` (ou pelo seletor de modo na barra superior)
4. Confirme: uma mensagem "MCP server enabled" aparece no painel inferior do Figma

Sem esses dois passos, as tools `get_design_context`, `get_screenshot` e as demais **não aparecem** no Cursor.

---

## Duas formas de passar contexto ao AI

### Opção A — Seleção direta (mais rápida)

Selecione o frame ou componente diretamente no Figma Desktop e peça ao Cursor:

```
Implemente minha seleção atual do Figma.
```

O MCP server lê automaticamente o que está selecionado — sem precisar copiar nenhum link.

### Opção B — Link (quando não está com o Figma em foco)

Copie o link do frame no Figma com `Cmd+L` e cole no chat do Cursor:

```
Implemente o design neste link: [url do Figma]
```

O AI extrai o `nodeId` da URL e chama as tools com esse identificador.

---

## Tools disponíveis e quando o AI usa cada uma

| Tool | Quando o AI chama | Para que serve |
|---|---|---|
| `get_design_context` | Sempre no início de uma implementação | Estrutura completa: layout, componentes, tokens, variantes |
| `get_screenshot` | Junto com `get_design_context` | Captura visual de referência — source of truth para validar paridade |
| `get_metadata` | Quando o frame é muito grande e o output fica truncado | Mapa esparso de nós; depois chama `get_design_context` por nó filho |
| `get_variable_defs` | Quando só precisa dos tokens, sem o layout | Variáveis de cor, spacing e tipografia usadas na seleção |
| `get_code_connect_map` | Quando Code Connect estiver configurado | Resolve nome do componente Figma → path de import no código |

> **Sobre `get_variable_defs`:** prefira essa tool quando a dúvida for sobre um token específico — é mais leve que `get_design_context` e retorna só as variáveis usadas na seleção. Útil para consultas pontuais do tipo "qual é o token de spacing desse card?".

---

## Fluxo completo: Figma → Código

```
1. Figma Desktop aberto + Dev Mode ativo (Shift+D)
      ↓
2. Selecionar frame no Figma OU copiar link (Cmd+L)
      ↓
3. Colar no Cursor — skill implement-design ativada automaticamente
      ↓
4. AI chama get_design_context + get_screenshot via MCP desktop
      ↓
5. Código gerado seguindo dasa-codegen.mdc (tokens, DS, copy)
      ↓
6. quality-gate skill para validar antes de entregar
```

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| Tools não aparecem no Cursor | Figma Desktop fechado ou sem Dev Mode | Abrir Figma Desktop → ativar Dev Mode (`Shift+D`) |
| Output de `get_design_context` truncado | Frame muito complexo ou com muitas camadas | Chamar `get_metadata` primeiro, depois `get_design_context` por nó filho |
| Assets não carregam no código gerado | URLs `localhost` sendo modificadas pelo AI | Usar as URLs `localhost` retornadas pelo MCP diretamente, sem alterar |
| AI usa servidor remoto em vez do desktop | Dois servidores ativos simultaneamente | Indicar no prompt: "use as tools do servidor Figma desktop" |
| MCP conecta mas não retorna dados do frame | Arquivo aberto no browser, não no Desktop | Fechar a aba do browser e abrir o arquivo no Figma Desktop App |
