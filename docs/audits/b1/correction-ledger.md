# B1 — ledger de correção (Fases 12C e 12D)

**Status:** correções aplicadas localmente na branch `audit/b1-phase-12b` (sem push, sem deploy). A 12B foi somente leitura; este ledger registra o que foi verificado, corrigido, rejeitado ou adiado. Nenhum conteúdo foi marcado como revisado por falante nativo.

> **Atualização 12D (2026-11-13):** os 14 INCERTOS (`U001`–`U014`) foram fechados editorialmente com `EDITORIALLY_RESOLVED_AI`. O registro completo, com antes/depois, racional, teste e áudio por achado, está em [`final-editorial-decisions.md`](final-editorial-decisions.md). A seção 12C abaixo foi preservada como histórico; o estado atual dos 14 é o da tabela 12D.

## Como ler

- **Status:** `CORRIGIDO` (código/conteúdo alterado + teste), `REJEITADO` (alegação não se sustenta na fonte), `ADIADO` (dívida documentada, sem alteração), `NÃO APLICÁVEL` (fora do escopo desta fase).
- **Evidência:** trecho/fonte lida nesta fase, não apenas o relatório da 12B.
- **Teste:** suíte que trava a correção. `tests/content/b1-corrections.test.ts` é a suíte nova da 12C; `tests/content/assessment-fairness.test.ts` cobre a fairness sistêmica de A1/A2/B1.
- **Áudio:** o B1 não tem corpus MP3 estático. Todo texto B1 corrigido continua no TTS do navegador; nenhum MP3 foi gerado, apagado ou redistribuído.

## CRÍTICO

| ID | Severidade | Conteúdo original | Correção proposta / aplicada | Evidência | Mudança real | Teste | Status | Áudio |
|---|---|---|---|---|---|---|---|---|
| B1-12B-C001 | CRÍTICO | `b1-l32-e07`: cloze `계획이 아직 확정되지 않은 것___ 보여요.` com resposta `으로` | A 12B propôs trocar para `로`; **rejeitado**: `것` termina em batchim ㅅ, então a forma é `것으로` (`으로`), não `것로` | Regra `-(으)로`: `으로` depois de consoante exceto ㄹ; `로` depois de vogal ou ㄹ. O próprio exemplo da lição usa `것으로`; `것` ≠ `거` | Nenhuma. A resposta `으로` permanece; o teste documenta a rejeição | `b1-corrections.test.ts` › “b1-l32-e07 mantém 으로” | **REJEITADO** | Nenhum (TTS) |
| B1-12B-C002 | CRÍTICO | `b1-c03-e07`: texto de leitura em português (`A mudança reduziu o custo…`) | Texto coreano: `이번 변화로 비용은 줄었지만 대기 시간은 늘었어요. 따라서 장단점을 함께 봐야 해요.` | Linha lida; objetivo do item é leitura em coreano | `src/content/curriculum/b1/checkpoints/b1-c03.ts:18` | `b1-corrections.test.ts` › “b1-c03-e07 volta a avaliar leitura em coreano” | **CORRIGIDO** | Nenhum (TTS) |
| B1-12B-C003 | CRÍTICO | `b1-c02-e19` (ID do relatório; o item real é `b1-c02-e08`): `보고서를 줄이고 대신에 발표를…` | `보고서를 줄이는 대신에 발표를 늘리기로 했어요.`; explicação idem | Padrão ensinado na l08: `V-는/Adj-(으)ㄴ 대신(에)`; `-고 대신에` é aglutinação inválida | `b1-c02.ts:19` (texto + explicação); ID estável `b1-c02-e08` | `b1-corrections.test.ts` › “b1-c02-e08 usa 줄이는 대신에” | **CORRIGIDO** | Nenhum (TTS) |
| B1-12B-C004 | CRÍTICO | `b1-l24`: `공사가 하는 통에 길이 막혔어요.` em modelo gramatical e MCQ correto | `공사를 하는 통에 길이 막혔어요.` nas duas ocorrências; distratora `공사가 끝났어요.` preservada | `-는 통에` seleciona ação em curso; `공사를 하다` é a colocação correta | `module5.ts:154,165` | `b1-corrections.test.ts` › “b1-l24 corrige 공사를 하는 통에” | **CORRIGIDO** | Nenhum (TTS) |

## MAJOR

| ID | Severidade | Conteúdo original | Correção aplicada | Evidência | Mudança real | Teste | Status | Áudio |
|---|---|---|---|---|---|---|---|---|
| M001 | MAJOR | `ko:발언`: `발언 시간을 두 분으로 제한해요.` (“dois minutos”) | `발언 시간을 2분으로 제한해요.` | `두 분` é classificador honorífico de pessoas; minutos pedem numeral | `src/content/vocabulary/b1-m04.ts:16` | `b1-corrections.test.ts` › vocabulário | **CORRIGIDO** | TTS (cartão sem MP3 B1) |
| M002 | MAJOR | `-고 말다` com resultado positivo (`적응하고 말았어요.`) | `결국 한 달 만에 이사하고 말았어요.`; pergunta e cloze alinhados | Definição da l05: desfecho indesejado/inesperado | `b1-c01.ts:22,31` | `b1-corrections.test.ts` › “b1-c01 reescreve -고 말다…” | **CORRIGIDO** | TTS |
| M003 | MAJOR | `b1-l07-e04`: narração em 3ª pessoa com `할게요` | `끝내기로 했어요.` na leitura | `-(으)ㄹ게요` é decisão do falante; narração pede outra forma | `module2.ts:73` | Conteúdo B1 + revisão manual; coberto pela suíte B1 | **CORRIGIDO** | TTS |
| M004 | MAJOR | Rótulos de alomorfe: `-는 대신`, `-는 한`, `-라고 해도` | `V-는 / Adj-(으)ㄴ 대신`, `V-는 / Adj-(으)ㄴ 한`, `V/Adj-다고 해도 / N-(이)라고 해도`; intro de l09 e l08 ajustadas | Exemplos das próprias lições | `module2.ts:105,110,141,154`; `module3.ts:155` | `b1-corrections.test.ts` (progressão/gramática) + validação B1 | **CORRIGIDO** | TTS |
| M005 | MAJOR | `ko:수신`: glosa “recebimento” mas frase só com `수신자` | `수신 확인 메일을 보내 주세요.` / “Envie um e-mail de confirmação de recebimento.”; ID preservado | Alvo canônico precisa ocorrer sozinho | `b1-m08.ts:23` | `b1-corrections.test.ts` › vocabulário | **CORRIGIDO** | TTS |
| M006 | MAJOR | `ko:타협`/`ko:구조`: frases só com compostos (`타협점`, `구조대`) | `양쪽이 끝내 타협했어요.` / `구조가 빨리 이루어져서 큰 피해는 없었어요.` | Alvo canônico dentro de palavra maior | `b1-m02.ts:44`, `b1-m06.ts:17` | `b1-corrections.test.ts` › vocabulário | **CORRIGIDO** | TTS |
| M007 | MAJOR | `ko:뿐만 아니라`: `pos: interjeição`; frase sem hospedeiro; pt prometia “tempo” | `pos: advérbio`; `시간이 절약될 뿐만 아니라 비용도 줄어요.` / “Não só se economiza tempo…” | Pares `게다가/또한` usam `advérbio`; frase autossuficiente | `b1-m03.ts:30` | `b1-corrections.test.ts` › vocabulário/pos | **CORRIGIDO** | TTS |
| M008 | MAJOR | `최우선` (l37) e `분담` (l37) cobrados em c02/c04 | `지금은 안전이 우선순위예요.` (l08); `회의 후에 업무 배분을 다시 정했어요.` (l16) | Léxico ensinado antes do checkpoint | `b1-c02.ts:17,35`; `b1-c04.ts:17,30` | `b1-corrections.test.ts` + validadores B1 | **CORRIGIDO** | TTS |
| M009 | MAJOR | Léxico futuro em c03/c06/l37 (`정책`, `기준`, `문자`, `견적`, `업체`, `최악`, `이용자`) | c03-e05 → `이 방법은 효율을…`; c03-e06 → `자료가 결과를 보여 줘요.`; c06-e06 → `연락해 주세요.`; l37-e03 → `수리가 얼마인지 확인할 거예요.`; l37-e04 → `회사에…`; l33-e03 → `가장 나쁘다는…` | Substituição por repertório já ensinado; nomes futuros preservados apenas como input quando não avaliados | `b1-c03.ts:16,17`; `b1-c06.ts:17`; `module8.ts:72,74`; `module7.ts:116` | `b1-corrections.test.ts` + `analyze-lexicon-origin` | **CORRIGIDO (parcial documentado)** | TTS |
| M010 | MAJOR | `-(으)ㄴ다면` em c01-e05/e24 | `시간을 되돌릴 수 있었으면 좋겠어요.` (forma ensinada) | l04 ensina `-았/었으면 좋겠다`; hipótese presente não tinha bloco | `b1-c01.ts:16,35` | `b1-corrections.test.ts` › progressão | **CORRIGIDO** | TTS |
| M011 | MAJOR | `-라고 하다`/`-(으)ㄹ 거라고 생각하다` sem bloco | Nota explícita em l11 (futuro) e l38 (`-아/어 달라고 하다` + `-기 바랍니다`) | Diálogo l11/l38 já usava as formas | `module3.ts:22`; `module8.ts:111` | `b1-corrections.test.ts` › gramática | **CORRIGIDO (micro-ensino)** | TTS |
| M012 | MAJOR | `-(으)ㄹ 때` cobrado em l23-e03 sem bloco B1 | Nota explícita em l23-g2 com forma e exemplo | 28 ocorrências B1; l23 é o núcleo | `module5.ts:111` | `b1-corrections.test.ts` › gramática | **CORRIGIDO (micro-ensino)** | TTS |
| M013 | MAJOR | `-마다` cobrado em l22/c05 sem ensino | Nota explícita em l22-g2 (`집마다 방식이 달라요.`) | l22 já usava `집마다` como input | `module5.ts:67` | `b1-corrections.test.ts` › gramática | **CORRIGIDO (micro-ensino)** | TTS |
| M014 | MAJOR | `-(으)ㄹ게요` cobrado em l07/l17 sem ensino | Nota em l07-g2 (`정리할게요`, `끝내도록 할게요`) | Diálogo l07 já usava `할게요` | `module2.ts:67` | `b1-corrections.test.ts` › gramática | **CORRIGIDO (micro-ensino)** | TTS |
| M015 | MAJOR | `-를 통해` em l19-e08 contra o cartão `숙달`; `-기 바랍니다` em l28/l38 | l19-e08 → `반복 연습으로 숙달할 수 있어요.`; notas de registro formal em l28/l38 | Cartão b1-m04.ts:39; diálogo/e-mail modelo | `module4.ts:167`; `module6.ts:111`; `module8.ts:111` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M016 | MAJOR | `-뿐` restritivo em l17-e08 | `오늘은 안건이 세 가지예요.` | Padrão de contagem ensinado em A1 | `module4.ts:79` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M017 | MAJOR | l18-e07: “Complete o motivo” aceitava só `기에` | “Complete o motivo com a forma de causa ensinada” (sem vazar a resposta) | `높아서` também é coreano válido; o alvo precisa ser nomeado sem entregar o gabarito | `module4.ts:122` | `analyze-structure` (0 `cloze-answer-leaked`) + B1 | **CORRIGIDO** | TTS |
| M018 | MAJOR | c03-e13: três opções todas “opinião pessoal” | Pergunta por `-다고 생각해요` e opções contrastantes | Unicidade do gabarito | `b1-c03.ts:24` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M019 | MAJOR | c02/c08 aceitavam `다음 달에 이사할 예정이에요.` para plano aberto | Variante removida dos dois itens | l06 distingue `-ㄹ까 하다` de `-ㄹ 예정이다` | `b1-c02.ts:32`; `b1-c08.ts:45` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M020 | MAJOR | c05-e05 aceitava `지킬 의무가 있어요` | Variante removida; só `-아/어야 할 의무가` aceito | Construto medido na l25 | `b1-c05.ts:36` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M021 | MAJOR | 125/381 digitados exigiam pontuação final; 131/132 listen sem “frase completa”; 12 pediam fragmento | Builder B1 aplica `terminalPunctuationVariants`; `listen` ganha instrução comum; 12 prompts reescritos | Padrão A2/12A; auditoria 12B | `b1/lessons/shared.ts`; 12 prompts em módulos/checkpoints | `assessment-fairness.test.ts` (A1/A2/B1); `analyze-typed-normalization` = 0; `analyze-listen-prompts` = 0 | **CORRIGIDO** | TTS |
| M022 | MAJOR | 65/164 `reusedIds` sem superfície | Não deletado em massa: dívida congelada no baseline, como A1/A2; heurística é conservadora com flexão | `findUnusedReusedRefs`; 65 refs verificadas como suspeitas, muitas por conjugação (`말하다`→`말했어요`) | `tests/fixtures/reused-ids-baseline.json` (297 → 362); `reuse-audit.test.ts` inclui B1 | `reuse-audit.test.ts` | **CONGELADO / ADIADO** | Nenhum |
| M023 | MAJOR | 3 `acceptedAnswers` redundantes (l32-e05, l35-e05, c01-e25) | Arrays removidos; B1 passa a validar redundância | `validateExerciseSpec` com `checkRedundantAccepted: true` | `module7.ts:74,206`; `b1-c01.ts:36`; `b1/validate-content.ts` | `shared-validators` = 0 issues; suíte B1 | **CORRIGIDO** | TTS |
| M024 | MAJOR | `ko:더욱이`: pt truncado e registro misto | `비까지 왔고, 더욱이 바람까지 불었어요.` / “Choveu e, além disso, ainda ventou.” | Correção de colocação/registro | `b1-m03.ts:24` | `b1-corrections.test.ts` | **CORRIGIDO** | TTS |
| M025 | MAJOR | l13 produção: `확대하자는 제안` (forma `-자` não ensinada) | `동네 서비스 확대 방안에 대한 제안을 써 보세요.` | Elimina cobrança prematura sem perder o objetivo | `module3.ts:129` | `b1-corrections.test.ts` › progressão | **CORRIGIDO** | Nenhum |

## MINOR — executados nesta fase

| ID | Correção | Status |
|---|---|---|
| N001 | `introduce a objeção` → `introduz a objeção` | **CORRIGIDO** |
| N002 | `processe conforme o regulamento` → `trate conforme o regulamento` | **CORRIGIDO** |
| N003 | `trade-off(s)` → `contrapartida(s)` (blueprint, l18, c02/c08) | **CORRIGIDO** |
| N004 | `roteiro indoor` → `roteiro em ambiente fechado` (5×) | **CORRIGIDO** |
| N005 | Variante de l10-e09 com mudança de pessoa corrigida | **CORRIGIDO** |
| N006 | Splices `, por outro lado` → `; por outro lado,` | **CORRIGIDO** |
| N007 | l02-e05 aceita `비가 오기 시작했어요` | **CORRIGIDO** |
| N008 | `Perdi-me` → `Eu me perdi` | **CORRIGIDO** |
| N012 | Gênero de Jimin alinhado (`Ele gosta…`) | **CORRIGIDO** |
| N013 | `eco emocional` → `impressão duradoura` | **CORRIGIDO** |
| N016 | Glosas de `우선`/`차라리` ajustadas para advérbio | **CORRIGIDO** |
| N017 | Glosa de `예정` ajustada | **CORRIGIDO** |
| N022 | Variante “famílias” removida para `가구` | **CORRIGIDO** |
| N023 | Glosa de `접근성` restrita a “facilidade de acesso” | **CORRIGIDO** |

## MINOR — adiados (sem alteração)

| ID | Motivo |
|---|---|
| N009 | Política de backshift pt-BR: U006 fixou a escolha natural em l03 (“não pode vir/ir”, com “não poderá” aceito); os demais casos (c01/c08) continuam aceitos e não foram reescritos |
| N014 | 6 explicações de leitura citam paráfrase; corrigir exige revisão item a item, sem impacto de correção |
| N018 | Documentar homógrafos intra-forma (`부상`, `대기`, `정전`…) é decisão de schema/revisão humana |
| N019 | `-다는 점에서` em input antes do bloco l15: dívida de input, não cobrança |
| N020 | `-기에는` em input antes do bloco l26: dívida de input, não cobrança |
| N021 | Nota de escopo do c02 sobre variante fora do escopo: cosmético |

## UNCERTAIN (14) — fechados editorialmente na 12D

**Histórico 12C:** `U001`–`U014` permaneceram intocados; nenhum foi tratado como aprovado, e a fila de revisão nativa continuava em `linguistic-findings.md` e `correction-proposals.md`. Em particular, `U001` (`-더라면`) e `U007` (registro da l23) não foram “corrigidos” por IA naquela fase.

**12D:** o dono decidiu não exigir uma fase separada de revisão humana/nativa para encerrar este backlog. As decisões finais foram aplicadas com o status `EDITORIALLY_RESOLVED_AI` (sem `native-reviewed`, `human-approved` ou `certified`). Detalhes completos em [`final-editorial-decisions.md`](final-editorial-decisions.md); o teste dedicado é `tests/content/b1-editorial-decisions.test.ts`.

| ID | Decisão final | Status | Arquivos | Antes → depois | Racional (resumo) | Teste | Áudio |
|---|---|---|---|---|---|---|---|
| U001 | **KEEP + CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module1.ts` (l04 intro/g2/MCQ) | nota sem variante → nota com `-았/었더라면`; `알더라면` → `알았더라면`; `있더라면` e cloze `더라면` mantidos | condição contrafactual de estado/possibilidade; passado concluído pede `-았/었더라면` | U001 | TTS (exemplo gramatical) |
| U002 | **CORRECT** | `EDITORIALLY_RESOLVED_AI` | `b1-m01.ts` (`ko:넘어지다`) | `비에 미끄러져서` → `빗길에 미끄러져서`; pt “na rua molhada” | colocação padrão para escorregar na rua molhada | U002 | TTS (frase do cartão) |
| U003 | **KEEP** | `EDITORIALLY_RESOLVED_AI` | `module1.ts` (`b1-l04-e05`, d03) | aceita `용기를 더 냈으면`; `뭐를` preservado | ordem e `뭐를` são variantes válidas; sem normalização global | U003 | nenhum |
| U004 | **CORRECT** | `EDITORIALLY_RESOLVED_AI` | `module7.ts` (l32 d4/e03/e04/e08) | `두 번밖에 없다` → `두 번밖에 안 오다`; pt “duas vezes pela manhã” | `두 번` é frequência, não contagem de veículos | U004 | TTS (diálogo e 2 listens) |
| U005 | **REJECTED — VALID USAGE** | `EDITORIALLY_RESOLVED_AI` | `module5.ts` (l22) | sem mudança | avó pode usar 해라체 com neto; `-다고들 해요` é relato válido | U005 | nenhum |
| U006 | **CORRECT (pt only)** | `EDITORIALLY_RESOLVED_AI` | `module1.ts` (l03 d2/e01/e09) | “não poderá” → “não pode”; coreano intacto | relato coreano correto; pt escolhe forma natural para evento futuro | U006 | nenhum texto coreano |
| U007 | **CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module5.ts` (l23 intro) | 2 → 3 painéis; painel “Registro: 반말 entre amigos” | uso intencional entre amigos; faltava orientação de registro | U007 | nenhum (painel não é áudio) |
| U008 | **CORRECT** | `EDITORIALLY_RESOLVED_AI` | `module2.ts` (l07 d6) | `좋습니다` → `좋아요` | `-ㅂ니다` isolado sem propósito em diálogo 해요체 | U008 | TTS (diálogo) |
| U009 | **KEEP + CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module4.ts` (l17/l20 summaries e leituras) | `필요했습니다`/`낫습니다` preservados; notas de registro | registro escrito formal é válido em prosa de leitura | U009 | nenhum texto avaliado |
| U010 | **CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module1.ts` (`b1-l02-g2`) | “não aceita ordem” → restrição específica de `-자마자` | “ordem” era ambíguo; não generalizar para `-자`/conectores | U010 | nenhum |
| U011 | **CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module1.ts` (`b1-l03-g2`) | “verbos de movimento…” → final `-냐고`, entonação e pontuação | separa final gramatical, fala e escrita | U011 | nenhum |
| U012 | **KEEP + CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module2.ts` (`b1-l08-g1`) | nota só de adjetivo → V/Adj/N + `에` opcional | `비싼 대신에` é correta; faltava cobrir substantivo | U012 | nenhum |
| U013 | **CORRECT (register)** | `EDITORIALLY_RESOLVED_AI` | `module4.ts` (l18 d6/g2/intro) | `하기에` → `하니까` na fala; `-기에` mantido no ensino/cloze | `-기에` é válido, mas formal/escrito para colegas em conversa | U013 | TTS (diálogo) |
| U014 | **CLARIFY** | `EDITORIALLY_RESOLVED_AI` | `module6.ts` (`b1-l27-e08`; achado citava e09) | enunciado ganha “após o aviso de emergência” | evacuação precisa de cenário de perigo; gabarito intacto | U014 | nenhum (`audioText` igual) |

## Impacto de áudio

- **B1:** nenhum MP3 existe para o B1; todos os `audioText` corrigidos usam a voz coreana do navegador. Não há MP3 órfão do B1.
- **Hangul/A1/A2:** nenhum `audioText` foi alterado nesta fase. O corpus de 2.907 MP3 foi preservado.
- **Flag local:** `NEXT_PUBLIC_KBR_STATIC_AUDIO=1` foi adicionado somente a `.env.local` (ignorado pelo Git) para o desenvolvedor ouvir o corpus no `npm run dev`. O padrão de produção continua opt-in; `.vercelignore`, a guarda de build e o kill switch não foram alterados.
- **Texto sintético:** o áudio continua sendo MeloTTS provisório, nunca “gravado”/“nativo”; a licença do encoder segue não esclarecida.

## Verificação

- `npm run typecheck` — limpo.
- `npm test` — 12C: 43 arquivos / **613 testes** (595 da base + 18 novos); 12D: 44 arquivos / **630 testes** (613 da base + 17 novos), todos passando.
- `npm run build` com `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` — verde e **`[audio-guard] OK`**: `public/audio/` fora do deploy, nenhum MP3 em `.next/`.
- `npm run e2e` — **619 executados + 27 skips intencionais** (646 no total), Chromium 375/390/768/1280 + WebKit 390.
- Auditoria: `analyze-typed-normalization` **0/381** exigindo pontuação exata; `analyze-listen-prompts` **0/132** fora do padrão; `analyze-structure` **0 achados**; `shared-validators` **0 issues**; `findUnusedReusedRefs` **65 congeladas** (297 A1/A2 + 65 B1 = 362 no baseline).
- 12D: `npx vitest run --config docs/audits/b1/tools/vitest.config.mts` — **2/2**; `analyze-structure` 40/8/615/238/80/160/**81** painéis/320+320/164; `analyze-vocabulary` 0 colisões, 0 homógrafos, 0 `idFormMismatch`, 0 `reusedButUntaught`; `analyze-progression` sem nova regressão de ordem; cartões e IDs preservados.
