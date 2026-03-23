---
title: Próximas features — dasa-design-kb
tags: [roadmap]
updated: 2026-03-19
---

# Próximas features — dasa-design-kb

> Funcionalidades planejadas mas ainda não implementadas. Documentadas aqui para manter o roadmap visível e facilitar contribuições futuras.

---

## 1. Deploy de prototype (experimental build)

**Status:** planejado — protótipos ficam locais por ora

### O que é

Uma skill do Cursor que, com um único comando, faz:

1. Commit das mudanças da branch de playground
2. Cria um Pull Request draft no GitHub com template padronizado (link Figma, descrição, screenshots)
3. Retorna a URL do PR para compartilhar com engineers, PMs ou research

### Como ficaria

```
Prompt no Cursor: "deploy um experimental build do meu protótipo"

Resultado:
- ✅ Commit criado: feat(playground): [nome da feature]
- ✅ PR draft aberto: github.com/dasa/[produto]/pull/XXX
- ✅ Link para compartilhar: [URL do PR]
```

### Por que ainda não foi feito

- Ambiente de preview (CI/CD para branches de playground) não está configurado
- A URL do PR é acessível para o time interno, mas não para usuários externos (pesquisa, stakeholders fora do GitHub)

### Próximos passos para implementar

1. Configurar ambiente de preview automático por branch (Vercel Preview, Railway, ou similar) no repositório do produto em questão
2. Criar a skill `.cursor/skills/deploy-prototype/SKILL.md` com os passos: verificar branch, commitar, criar PR draft, retornar URL
3. Adicionar ao `PROTOTYPING.md` como fluxo padrão de compartilhamento

---

## 2. Sincronização código → Figma

**Status:** planejado — sem solução de mercado disponível ainda

### O problema

O Code Connect resolve Figma → código (o AI sabe o path de import de cada componente). Mas o caminho inverso — quando um padrão é aprovado em código e precisa ser documentado no Figma — ainda é 100% manual.

Fluxo atual (manual):

```
Protótipo aprovado em código
    ↓
Designer tira screenshots do comportamento
    ↓
Cola no Figma com anotações de interação (estados, timing, edge cases)
    ↓
Atualiza a documentação do componente no DS
```

### O que seria ideal

Uma ferramenta (ou skill) que, dado uma branch de playground aprovada:

1. Gera screenshots automáticos dos estados do componente
2. Cria ou atualiza o frame correspondente no Figma
3. Adiciona anotações de interação baseadas no código (timing de animação, estados, props)

### Por que ainda não existe

Figma tem API de escrita (pode criar frames via API), mas o fluxo completo de "código → documentação Figma com fidelidade" ainda não tem solução consolidada no mercado. É um gap reconhecido publicamente por designers em empresas de referência como Vercel e Linear.

---

## 3. Code Connect completo

**Status:** em progresso — configuração parcial  
**Referência:** `docs/specs/figma-mapping.md` (tabela de status por componente)

### O que falta

Conectar todos os componentes da biblioteca Figma com seus paths reais de import no repositório via Code Connect. Atualmente a tabela em `figma-mapping.md` lista os componentes com status ⏳ (em breve).

### Como contribuir

1. Configure o Code Connect para um componente seguindo a [documentação oficial do Figma](https://www.figma.com/developers/api#code-connect)
2. Teste no dev mode do Figma — o path de import deve aparecer no painel de código
3. Atualize a tabela em `docs/specs/figma-mapping.md`: mude ⏳ para ✅ e confirme o path real
4. Abra um PR com a atualização usando a skill `kb-commit`

---

## Como contribuir com este documento

Se você tiver uma ideia de feature para o KB ou pipeline de design-to-code:

1. Adicione uma seção neste arquivo com: **o que é**, **por que ainda não foi feito**, **próximos passos**
2. Use a skill `kb-commit` para abrir o PR
