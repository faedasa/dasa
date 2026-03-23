# Regras do plugin — Dasa Design Quality Checklist

## Regra primária (crítica)

**Sempre associar à variável mais próxima disponível.**

Quando o Design System está conectado ao documento (variáveis ou biblioteca vinculada), o plugin deve:

1. **Oferecer vínculo automático** — Nunca apenas sugerir "ir ao elemento" ou passos manuais quando existir variável do tipo no documento. O CTA deve ser "Corrigir" / "Associar" aplicando a variável mais próxima.
2. **Fallback por proximidade** — Se não houver variável com valor exato (ex.: hex idêntico), usar a variável **mais próxima** (cor por distância RGB; spacing/radius por valor numérico) e aplicar + vincular em uma única ação.
3. **Prioridade** — Associar ao DS tem prioridade sobre qualquer ação passiva (ex.: "Selecionar no Figma"). "Selecionar no Figma" só deve aparecer quando não houver nenhuma variável utilizável do tipo no documento.

Implementação: `rulesEngine.ts` (helpers `findClosestColorVariableInRegistry`, `findClosestSpacingVariableInRegistry`, `findClosestRadiusVariableInRegistry` e uso nas regras TOKEN_*_BIND_01).

## Resolução sempre em bulk

Ao clicar em "Corrigir", a ação é aplicada a **todos os nós** do agrupamento daquele finding. Não há ação de "selecionar no canvas" — o plugin só oferece correção automática (ou indica "Sem correção automática" quando não há variável/quick fix disponível).

---

Demais regras e severidades estão em `kb.json` (campo `rules`). A lógica de avaliação fica em `src/main/rulesEngine.ts`.
