# 📱 Fluxo de Agendamento Nav360 - Documentação Completa

**Versão:** 1.0 | **Data:** 2025-11-27 | **Status:** ✅ Pronto para Implementação

> Documentação completa e pronta para implementação do fluxo de agendamento de exames DASA Nav360. Inclui wireframes, copy integrada, design tokens e checklist de implementação.

---

## 📂 Estrutura da Pasta

```
fluxo-agendamento/
├── README.md                                    # Este arquivo (índice)
├── CHANGELOG.md                                 # Histórico de versões
├── v1.0/                                        # Pasta de versão
│   ├── dasa-agendamento-wireframes-copy.md     # Wireframes + copy integrada
│   ├── dasa-agendamento-copy-completa.md       # Copy estruturada
│   └── dasa-agendamento-spec-tecnica.md        # Specs técnicas + checklist
└── [futuras versões]
```

---

## 📋 Documentos (v1.0)

### 1. **dasa-agendamento-wireframes-copy.md** (2,150 linhas)
**Wireframes ASCII + Copy Integrados**

```
Contém:
  ✅ 11 etapas de agendamento (Busca → Confirmação)
  ✅ Wireframe ASCII de cada tela (mobile-first 375px)
  ✅ Copy primária/secundária integrada (inline)
  ✅ Estados documentados (loading, error, success, etc)
  ✅ Tone variations por persona (Moisés, Miriam, Manoel)
  ✅ Specs técnicas inline (touch targets, spacing, etc)
  ✅ Padrões reutilizáveis (botões, inputs, alerts)

Quem usa:
  → Designer/Product para layout visual
  → Dev Front-end para estrutura HTML
  → QA para testar copy em diferentes estados

Navegação:
  → [Visão Geral](#visão-geral-3-fluxos)
  → [Etapa 1-11](#etapa-1-busca-de-exame)
  → [Componentes Reutilizáveis](#-padrões-reutilizáveis)
```

### 2. **dasa-agendamento-copy-completa.md** (1,100 linhas)
**Copy Estruturada + Componentes Reutilizáveis**

```
Contém:
  ✅ Copy por etapa (11 seções)
  ✅ Copy primary (títulos, labels, CTAs, placeholders)
  ✅ Copy secondary (erros, sucessos, validações, help)
  ✅ Tone variations (Moisés, Miriam, Manoel)
  ✅ Componentes reutilizáveis (botões, validações, alerts)
  ✅ 100% validada contra copy-rules.md

Quem usa:
  → Dev para copiar/colar texto exato no código
  → Content/QA para validar copy em todos os estados
  → Product para revisar tone das mensagens

Formato:
  → Pronto para copiar/colar
  → Não precisa reformatação
  → Segue exatamente copy-rules.md DASA
```

### 3. **dasa-agendamento-spec-tecnica.md** (900 linhas)
**Design Tokens + Implementação + Checklist**

```
Contém:
  ✅ Design tokens (cores, tipografia, spacing, breakpoints)
  ✅ Componentes detalhados (inputs, buttons, cards, etc)
  ✅ Comportamentos (validação, loading, transições)
  ✅ Checklist de implementação (25+ items)
  ✅ Edge cases documentados
  ✅ Integração backend esperada

Quem usa:
  → Dev Front-end para tokens CSS/Tailwind
  → Dev Back-end para endpoints esperados
  → QA para checklist de testes

Seções:
  1. Design Tokens (cores, tipografia, spacing)
  2. Componentes (specs cada um)
  3. Comportamentos (validação, loading, etc)
  4. Checklist (25+ items)
  5. Edge cases (menores, sem disponibilidade, etc)
  6. Integração Backend
```

---

## 🎯 Como Usar Esta Documentação

### Para Dev Front-end
1. Leia **wireframes-copy.md** para layout e estrutura
2. Copie copy exata de **copy-completa.md**
3. Use tokens de **spec-tecnica.md** pra CSS/Tailwind
4. Siga checklist da **spec-tecnica.md**

### Para Dev Back-end
1. Veja integração esperada em **spec-tecnica.md** (Seção 6)
2. Implemente endpoints documentados
3. Valide data models
4. Use edge cases para lógica de validação

### Para Designer/Product
1. Revise wireframes em **wireframes-copy.md**
2. Valide tone das variations em **copy-completa.md**
3. Aprove antes de dev começar

### Para QA/Tester
1. Use **copy-completa.md** (COPY SECONDARY) para testar estados
2. Siga **spec-tecnica.md** checklist
3. Teste edge cases documentados
4. Valide em múltiplos devices

---

## 📊 Cobertura da Documentação

### Fluxos
- ✅ Fluxo 1: Para Mim (8 etapas)
- ✅ Fluxo 2: Para Outro (9 etapas)
- ✅ Fluxo 3: Para Múltiplos (11 etapas)

### Personas
- ✅ Moisés (Standard - Direto/Rápido)
- ✅ Miriam (Executivo - Acolhedor)
- ✅ Manoel (Premium - Formal)

### Estados Documentados
- ✅ Default (vazio)
- ✅ Loading
- ✅ Error (com mensagens acionáveis)
- ✅ Success
- ✅ Disabled
- ✅ Focus (acessibilidade)

### Edge Cases
- ✅ Menores de 18 anos
- ✅ Convênio não coberto
- ✅ Convênio vencido
- ✅ Sem disponibilidade
- ✅ OCR falha
- ✅ Múltiplas pessoas com convênios diferentes
- ✅ Usuário deslogado mid-flow
- ✅ Slow network/timeout

---

## ✅ Validação & Qualidade

### Copy
- ✅ 100% alinhada com `copy-rules.md`
- ✅ Botões em infinitivo (nenhuma exceção)
- ✅ Horários em 24h com "h" (6h, 13h, 18h)
- ✅ Termos corretos (paciente, convênio, mostrar)
- ✅ Mensagens acionáveis
- ✅ Tom coerente por persona

### UX
- ✅ Mobile-first (375px primário)
- ✅ Touch targets 48x48px
- ✅ Contraste WCAG AA
- ✅ Estados claros
- ✅ Navegação óbvia

### Técnico
- ✅ Design tokens aplicados
- ✅ Componentes detalhados
- ✅ Comportamentos especificados
- ✅ Checklist de implementação
- ✅ Pronto para dev

---

## 🚀 Timeline de Implementação (Estimado)

```
Etapa 1: Setup (1-2 dias)
  - Dev lê documentação
  - Setup ambiente
  - Componentes básicos

Etapa 2: Fluxo Principal (5-7 dias)
  - Implementar 11 etapas
  - Validação inline
  - Loading states

Etapa 3: Integração Backend (3-5 dias)
  - APIs esperadas
  - Error handling
  - Edge cases

Etapa 4: Testes (3-5 dias)
  - Unit tests
  - E2E tests
  - QA testes

Etapa 5: Polish & Deploy (2-3 dias)
  - Performance
  - Acessibilidade
  - Deploy

TOTAL: ~14-25 dias (2-4 semanas)
```

---

## 🔄 Versionamento

### v1.0 (Atual - 2025-11-27)
- ✅ Documentação completa
- ✅ Validada contra KB DASA
- ✅ Pronta para implementação

### Próximas Versões (Planejadas)
- **v1.1** (1-2 semanas após start): Ajustes baseados em implementação
- **v1.2** (após MVP launch): Refinamentos pós-testes com usuários
- **v2.0** (futuro): Expansão para fluxos adicionais

**Para histórico completo, veja [CHANGELOG.md](./CHANGELOG.md)**

---

## 📚 Referências Internas (KB DASA)

Estes documentos foram criados baseado em:
- ✅ `business-strategy.md` - Personas e jobs to be done
- ✅ `copy-rules.md` - Regras de copy e tom
- ✅ `ux-guidelines.md` - Princípios de UX mobile-first
- ✅ `design-system.md` - Design tokens e componentes
- ✅ `projeto-agendamento-nav360.md` - Contexto do sprint

---

## 💬 Questões Frequentes

### P: Posso usar a copy de outro lugar?
**R:** Não. A copy foi validada contra `copy-rules.md` DASA. Use exatamente como em `copy-completa.md`.

### P: E se precisar customizar para web?
**R:** A documentação é mobile-first. Para web, adapte mas mantenha mesmos padrões.

### P: Como reportar problemas?
**R:** Se encontrar erros ou inconsistências, crie issue ou atualize o documento e atualize CHANGELOG.md com a versão.

### P: Quando fazer v1.1?
**R:** Após 1 semana de implementação, colete feedback do dev e faça ajustes. Inclua no CHANGELOG.

---

## 👥 Responsáveis

| Papel | Responsabilidade |
|-------|-----------------|
| **Dev Front-end** | Implementar wireframes + copy |
| **Dev Back-end** | APIs e lógica de validação |
| **Product/Designer** | Aprovar antes de dev começar |
| **QA** | Testar usando checklist |
| **Content** | Validar copy se customizar |
| **PM** | Coordenar timeline e feedback |

---

## 📞 Próximos Passos

1. ✅ **Review** - Product/Designer revisa documentação
2. ⏳ **Aprovação** - PM aprova para começar dev
3. ⏳ **Implementação** - Dev inicia usando documentação
4. ⏳ **Testes** - QA testa usando checklist
5. ⏳ **Feedback** - Coletar learnings pra v1.1
6. ⏳ **v1.1** - Atualizações baseadas em feedback

---

**Status:** ✅ Documentação Completa | **Pronta para:** Implementação | **Próxima:** Review & Aprovação

**Versão:** 1.0 | **Data:** 2025-11-27 | **Mantido em:** `fluxo-agendamento/`
