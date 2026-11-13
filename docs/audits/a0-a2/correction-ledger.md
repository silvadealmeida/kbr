# Ledger de correções — Fase 12A

**Baseline auditado:** `3103ce3` (ponta do A2 concluído)  
**Branch da auditoria:** `audit/a0-a2-linguistic` @ `f936f80`, worktree `/root/estudos/kbr-audit-a0a2`  
**HEAD corrigido:** preenchido no commit da fase 12A (código) e no commit de documentação.  
**Natureza:** correções verificadas de texto, validadores e contenção de áudio. **Nenhuma linha de B1 foi reescrita; nenhum `Progress` v1/CAS/SQL/Leitner foi alterado; nenhum MP3 foi apagado ou regenerado.**

## 1. Reconciliação dos 298 achados

| Medida | Valor | Observação |
|---|---:|---|
| Linhas de achado nos 25 lotes | **298** | 10 CRÍTICO · 84 MAJOR · 191 MINOR · 13 INCERTO |
| Linhas com ID repetido | **55** | 5 lotes A1 revisados em dobro (`a1-m01`…`a1-m05` e `-v2`) |
| IDs únicos | **243** | 8 CRÍTICO · 68 MAJOR · 156 MINOR · 11 INCERTO (maior severidade por ID) |
| Críticos após verificação | **6** | `A2M1-001`, `A1M3-001`, `A1M1-001`, `A1M5-001`, `A0-001`, `V2-001` |
| Críticos rejeitados | **1** | `V0-001` (`으막` é a transcrição correta) |
| Crítico rebaixado | **1** | `A1M1-002` (`a1-l03-e09`) → MAJOR, corrigido por esclarecer o enunciado |

A soma **6 + 84 + 191 + 13 = 294** não é um novo total: 6 é a contagem de críticos *verificados*; a contagem bruta de linhas críticas é 10 e fecha **10 + 84 + 191 + 13 = 298**. Os 55 IDs repetidos são proveniência de segundo revisor, não achados novos; alguns pares com o mesmo ID descrevem problemas diferentes, por isso o ledger usa `ID@lote` quando necessário. Não há achado sem categoria.

## 2. Críticos — disposição

| Finding ID | Problema original | Decisão | Arquivos alterados | Evidência | Testes | Áudio | Status |
|---|---|---|---|---|---|---|---|
| `A2M1-001` | `a2-l02-e01` com gabarito fora das opções; nenhuma alternativa podia acertar | Corrigido: `"Foi a uma fonte termal."` | `src/content/curriculum/a2/lessons/a2-l02.ts` | `checkAnswer` + opções; auditoria `structure-findings.json` | `tests/content/curriculum-corrections.test.ts`; validador `mcq-answer-not-in-options` | Nenhum (opção textual) | **CORRIGIDO** |
| `A1M3-001` | `a1-l11-e06`/`a1-c03-e13` com `은` fixo + `언니` → `언니은` | Corrigido: lacuna passa a `___는`; gabarito segue `언니` | `a1/lessons/a1-l11.ts`, `a1/checkpoints/a1-c03.ts` | `analyze-particles.cjs`; motor rejeitava `언니는` | `curriculum-corrections`; `cloze-particle` | Nenhum (cloze) | **CORRIGIDO** |
| `A1M5-001` | `g:a1-l25-appointment` ensinava `극장 앞에 만나요` | Corrigido: `극장 앞에서 만나요`; nota passa a `에서` para ponto de encontro | `a1/lessons/a1-l25.ts` | Contradição com `a1-l23` (`사거리에서 만나요`) | `curriculum-corrections` | **1 texto novo sem MP3** + 1 antigo órfão | **CORRIGIDO** |
| `A1M1-001` | `a1-l01-e03` ensinava que nome próprio não recebe `이에요` | Corrigido: “o som final decide”; exemplo `브라질이에요` | `a1/lessons/a1-l01.ts` | `a1-l01` gramática e `a1-l02` usam `브라질이에요` | `curriculum-corrections` | Nenhum (explicação) | **CORRIGIDO** |
| `A0-001` | `h21-e02` e `rule:liaison` diziam que o batchim de `음` é `ㄱ` | Corrigido: `ㅁ`; transcrição `으막` não mudou | `hangul/lessons/h21.ts`, `hangul/rules.ts` | `applyLiaison('음악') === '으막'`; nota de `word:음악` já dizia `ㅁ` | `curriculum-corrections` | Nenhum (prosa; MP3 de `음악`/`으막` intacto) | **CORRIGIDO** |
| `V2-001` | `ko:따라서` ancorado em `따르다 + -아/서` e traduzido como “Portanto” | Corrigido: frase com o conectivo `따라서`; ID do cartão preservado | `vocabulary/a2-m07.ts` | Leitura direta do registro; `contextMeaning` “portanto” | `curriculum-corrections`; `targetBoundaryIssue` | **1 texto novo sem MP3** + 1 antigo órfão | **CORRIGIDO** |
| `V0-001` | Revisor alegou que `으막` não existe | **Rejeitado**: é a transcrição padrão de `음악` | — | `applyLiaison`; 온라인가나다 327196 | `curriculum-audit` (Hangul) | Nenhum | **REJEITADO** |
| `A1M1-002` | `a1-l03-e09` com `은` e `이` defensáveis | Rebaixado a MAJOR e corrigido: enunciado pede “marcador de tópico” | `a1/lessons/a1-l03.ts` | A lição já dizia que as duas formas são compreensíveis | `curriculum-corrections` (implícito no fluxo) | Nenhum | **CORRIGIDO (MAJOR)** |
| `A2M2-003` | Revisor alegou que `잔 후에` não existe | **Rejeitado**: `자다 → 잔` é regular | — | Norma e conjugação | — | Nenhum | **REJEITADO** |
| `A2M3-001` | Premissa de que `삼 층` seria erro | **Premissa corrigida**; aceita também `삼층이에요` | `a2/lessons/a2-l13.ts` | 한글 맞춤법 제43항; 온라인가나다 336486 | `curriculum-corrections` | Nenhum (áudio segue `삼 층이에요`; a variante é textual) | **CORRIGIDO** |

## 3. Defeitos sistêmicos — disposição

| Finding ID(s) | Problema | Decisão | Evidência/teste | Status |
|---|---|---|---|---|
| `A2M2-001`, `CL-03` | 126 itens digitados do A2 exigiam pontuação final exata | Variantes explícitas geradas no builder A2 (`terminalPunctuationVariants`); motor e B1 intactos | `tests/content/assessment-fairness.test.ts` | **CORRIGIDO** |
| `A1M1-004`, `A1M2-003`, `A1M3-003`, `A1M5-003`, `A1M6-001`, `CL-04` | 65 itens de `listen` pediam fragmento e cobravam frase inteira | Enunciados passaram a pedir “a frase completa que contém …”; 188 ocorrências A1/A2 alinhadas (a medição da auditoria era conservadora) | `assessment-fairness.test.ts` | **CORRIGIDO** |
| `A1M8-008`, `A1M4-011`, `V0-012`, `CL-07` | `reusedIds` sem ocorrência no texto da lição | Medição conservadora: **297** referências (A1 195 + A2 102); o número 76 do relatório não se reproduziu. Dívida congelada em `tests/fixtures/reused-ids-baseline.json`; novas referências falham | `tests/content/reuse-audit.test.ts` | **CONTIDO** (dívida documentada; sem remoção em massa) |
| `V1-003`, `CL-07`/`CL-08` | Alvos contextuais dentro de palavra maior (`감기약`, `해외여행`, `분실물`) | 3 frases reescritas (`감기가 심해요`, `해외에 가고 싶어요`, `분실 신고를 했어요`); validador `targetBoundaryIssue` cobre A1/A2 | `tests/content/curriculum-validators.test.ts`; `curriculum-corrections` | **CORRIGIDO** |
| 9 `acceptedAnswers` redundantes | Forma idêntica à resposta após normalização | 6 do A1/A2 removidas; 3 do B1 preservadas (B1 não reescrito) | `validateExerciseSpec` com `checkRedundantAccepted` | **CORRIGIDO A1/A2; B1 DEFERIDO** |
| `A1M1-001`/duplicata lição→lição | `a1-l01-e08` = `a1-l02-e10` | `a1-l02-e10` virou “Eu sou coreano.” / `저는 한국 사람이에요.` | `curriculum-corrections` (duplicata some) | **CORRIGIDO** |
| `A1M2-002`, `A2M7-001`, `A2M7-002`, `A2M3-001`, `A1M8-003`, `A2M6-003` | Variantes válidas rejeitadas | Aceitas: `보아요`, `계셔요`, `뵀어요`, `삼층이에요`, `은`, `면`, `는 것이` | `curriculum-corrections` | **CORRIGIDO** |

## 4. Progressão pedagógica

| Marco | Ocorrências tratadas | Decisão | Status |
|---|---|---|---|
| `-았/어야 했어요` | `a2-l04` diálogo, exemplo e cloze | Trocado por `-아/어서`/`-지 못했어요` já ensinados; a forma continua explicada em `a2-l09` | **CORRIGIDO** |
| `-(으)ㄹ 때` | `a2-l19`, `a2-c04`, `a2-l26`, `a2-c06`, `a2-l32`, `a2-l34`, `a2-l37` | Trocado por `-(으)면` já ensinado | **CORRIGIDO** |
| `-라고 하다` | `a2-l16`, `a2-l19`, `a2-l22`, `a2-l32`, `a2-c04`, `a2-c07`, `a2-l04` (`-자고`), `a2-l15` (`-다면서`) | Falas reportadas viraram citações diretas visíveis ou foram reescritas; nenhum item avaliado exige produzir o padrão | **CORRIGIDO** |
| `-면서` | `a2-l24`, `a2-l39` | Removido do input antes do ensino; bloco próprio adicionado em `a2-l40` (lição de consolidação), onde já era avaliado | **CORRIGIDO** |

## 5. O que não foi feito (deliberadamente)

- **B1 linguístico:** não auditado, não reescrito. O validador compartilhado roda no B1 sem a checagem de `acceptedAnswers` redundantes; a suíte B1 e a E2E B1 passaram.
- **Native review:** nenhum coreano foi marcado como `reviewed` ou “aprovado por falante nativo”. Tudo segue `in-review`.
- **`pos` sem “adjetivo”:** mudança de schema compartilhada com B1; fora desta fase (`V1-001`/`CL-09`).
- **`ko:안`/`ko:일`:** homógrafos sem colisão de ID; criar `sense` mudaria IDs/cartões. Registrado como risco, sem correção.
- **Grande parte dos 84 MAJOR/191 MINOR:** não corrigida em massa; a lista continua em `correction-proposals.md` para revisão nativa/editorial.
- **Áudio:** nenhum MP3 regenerado; a licença do encoder continua não esclarecida.

## 6. Validação final

- `npm run typecheck` — limpo.
- `npm test` — **598 testes / 45 arquivos**.
- `npm run build` — verde; `[audio-guard] OK` em prebuild/postbuild.
- `npm run e2e` — **646 testes: 619 executados + 27 skips** (Chromium 375/390/768/1280 + WebKit 390; axe claro/escuro).
- B1: `tests/content/b1-curriculum.test.ts` e `e2e/b1.spec.ts` verdes; conteúdo B1 sem diff linguístico.
