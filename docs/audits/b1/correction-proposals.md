# B1 — propostas de correção ordenadas (Fase 12B → execução 12C/12D)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


> **Atualização 12D (2026-11-13):** os 14 INCERTOS (`U001`–`U014`) foram fechados editorialmente com `EDITORIALLY_RESOLVED_AI`; o dono decidiu não exigir uma fase separada de revisão humana/nativa para este backlog. As decisões finais, o antes/depois e os testes estão em [`final-editorial-decisions.md`](final-editorial-decisions.md). Resumo: `U001`, `U003`, `U009` e `U012` preservam formas válidas com esclarecimento; `U005` foi rejeitado como uso válido; `U002`, `U004`, `U006`, `U008` e `U013` receberam correções pontuais; `U007`, `U010`, `U011` e `U014` receberam esclarecimento contextual/metalinguístico. Nenhum item foi marcado como revisado por nativo.

> **Atualização 12C (2026-11-13):** este documento deixou de ser somente proposta. O ledger de execução, com evidência, teste e impacto de áudio por achado, está em [`correction-ledger.md`](correction-ledger.md). Resumo: **3 dos 4 CRÍTICO corrigidos**; o C001 foi **rejeitado** porque `것` tem batchim ㅅ e `것으로` é a forma correta (a 12B propunha `것로`, agramatical). Todos os MAJOR de conteúdo local, fairness, progressão por micro-ensino e higiene de dados foram tratados; M022 foi **congelado** como dívida de 65 referências (heurística de flexão), sem deletar IDs. Minors executados e adiados estão listados no ledger. Nada foi marcado como revisado por nativo.

**Texto original da 12B preservado abaixo.** Texto exato por achado canônico (`data/findings.json`). Ordem = prioridade recomendada: primeiro o que corrige nota errada; depois o que erra na tela; depois política; por último cosmética.

## Nível 1 — gabarito/avaliação errados (CRÍTICO)

| # | ID | Arquivo:linha | De | Para |
|---|---|---|---|---|
| 1 | C001 | `lessons/module7.ts:78` (cloze e07) + intro:54 + exemplo:67 | resposta `으로` → produz `것으로` | resposta `로`; textos: `확정되지 않은 것으로 보여요` |
| 2 | C002 | `checkpoints/b1-c03.ts:18` | `"A mudança reduziu o custo, mas aumentou o tempo de espera. 따라서 장단점을 함께 봐야 해요."` | `"이번 변화로 비용은 줄었지만 대기 시간은 늘었어요. 따라서 장단점을 함께 봐야 해요."` (explicação: substring novo) |
| 3 | C003 | `checkpoints/b1-c02.ts:19` | `팀은 보고서를 줄이고 대신에 발표를 늘리기로 했어요. …` | `팀은 보고서를 줄이는 대신에 발표를 늘리기로 했어요. …` (explicação idem, manter `늘리기로 했어요`) |
| 4 | C004 | `lessons/module5.ts:154,165` | `공사가 하는 통에 길이 막혔어요.` | `공사를 하는 통에 길이 막혔어요.` (2×) |

## Nível 2 — conteúdo MAJOR com substituição local única

| # | ID | Local | Correção |
|---|---|---|---|
| 5 | M001 | `vocabulary/b1-m04.ts:16` | `두 분으로` → `2분으로` |
| 6 | M002 | `checkpoints/b1-c01.ts:22,31` | texto → `갑작스러운 이사 때문에 계획이 엉망이 되었어요. 결국 한 달 만에 이사하고 말았어요.`; pergunta "Como terminou a história?"; cloze `이사하고 ___` → `말았어요` |
| 7 | M003 | `lessons/module2.ts:73` | `끝내도록 할게요` (3ª pessoa) → `끝내도록 할 거예요` / `…끝내기로 했어요` |
| 8 | M004 | `module2.ts:110,141,154,159; module3.ts:155` | rótulos: l08 `동사 + -는 대신(에) / 형용사 + -(으)ㄴ 대신(에) / 명사 + 대신(에)`; l09 `-(으)ㄴ/는 한` + intro com "adjetivo"; l14 `동사/형용사 + -다고 해도 / 명사 + -(이)라고 해도` |
| 9 | M005 | `vocabulary/b1-m08.ts:23` | frase → `수신 확인 메일을 보내 주세요.` / "Envie um e-mail de confirmação de recebimento."; manter id `ko:수신` |
| 10 | M006 | `vocabulary/b1-m02.ts:43`, `b1-m06.ts:17` | `양쪽이 끝내 타협했어요.`; `구조가 빨리 이루어져서 큰 피해는 없었어요.` (glosas ajustadas; ids preservados) |
| 11 | M007 | `vocabulary/b1-m03.ts:30` | `pos` → `advérbio`; frase → `시간이 절약될 뿐만 아니라 비용도 줄어요.` / "Não só se economiza tempo, como os custos também caem." |
| 12 | M015b | `lessons/module4.ts:167` vs cartão `b1-m04.ts:39` | unificar: `반복 연습으로 숙달할 수 있어요.` (alinha ao cartão) — ou decisão inversa documentada |
| 13 | M017 | `module4.ts:122` | enunciado → `Complete o motivo com -기에:` (ou aceitar `아서` com explicação) |
| 14 | M018 | `checkpoints/b1-c03.ts:24` | pergunta → `Qual frase marca a opinião com -다고 생각해요?`; opções: `이 변화가 긍정적이라고 생각해요.` / `지난해에 비해 이용자가 늘었어요.` / `통계는 2024년의 것이다.` |
| 15 | M019 | `b1-c02.ts:32`, `b1-c08.ts:45` | remover `다음 달에 이사할 예정이에요.` de ambas as `acceptedAnswers` |
| 16 | M020 | `b1-c05.ts:16` | variante aceita → `우리는 규칙을 지켜야 할 의무가 있어요.` |
| 17 | M023 | `module7.ts:74,206`, `b1-c01.ts:36` | remover os 3 `acceptedAnswers` redundantes (ou trocar por variante real, ex. `…내용입니다.`) |
| 18 | M024 | `vocabulary/b1-m02.ts:44`, `b1-m03.ts:24` | `비까지 왔고, 더욱이 바람까지 불었어요.` / "Choveu e, além disso, ainda ventou." |

## Nível 3 — decisao de arquitetura de conteúdo (progressão) — ESCOLHA DO DONO

Cada linha tem duas saídas (A=reinserar ensino, B=trocar cobrança). Recomendação marcada.

| # | ID | A | B (recomendada) |
|---|---|---|---|
| 19 | M012 `-(으)ㄹ 때` | bloco na l23 + glossário | **regravar l23-e03** (`약속을 바꾸면 미리 알려 줬으면 좋겠어.`) e parafrasear as demais ocorrências de input (l07–l38, c05, c08) |
| 20 | M013 `-마다` | micro-bloco na l22 | trocar c05-e13/e17/e28 + l22-e06 por `-에 따라` (l21) |
| 21 | M014 `-ㄹ게요` | nota curta na l07 | trocar gabaritos l07-e05/l17-e03 por `-ㄹ 거예요` |
| 22 | M011 `-라고 하다` | bloco antes da l38 + nota l11 | reescrever l11-e08 (evita `거라고`) |
| 23 | M010 `-ㄴ다면` | ensinar hipótese presente na l04 | trocar c01-e05/e24 por forma ensinada (`…있었더라면 좋았을 거예요` — condicionado a U001!) |
| 24 | M015a `-시기를 바랍니다` | nota de registro formal na l28 | trocar áudios de ditado l28-e03/l38-e03 por formas ensinadas (`…주시도록 요청합니다` / `…주시면 좋겠습니다`) |
| 25 | M016 `-뿐` | micro-bloco | trocar l17-e08 por `오늘은 안건이 세 가지예요.` |
| 26 | M025 `-자`/`-ㅁ/-므로/-ㄹ수록/-ㄹ지` | — | promptKo l13 → `동네 서비스 확대 방안에 대한 제안을 써 보세요.`; demais → ledger de dívida |
| 27 | M008/M009 léxico futuro | criar cartões `정책/기준/평가/접근성/문자/견적/업체/이용자/최우선/분담` **nas lições de origem** (sem tocar ids existentes) | trocar itens: c03-e05/e06 por frases do repertório l01–l15; c02/c04 por `우선순위`/`배분`; l37-e03 por `가격 제안` |

## Nível 4 — sistêmico (engine de conteúdo, sem tocar gabaritos)

| # | ID | Mudança |
|---|---|---|
| 28 | M021a | `lessons/shared.ts`: aplicar `terminalPunctuationVariants` (padrão A2/12A) nos builders translate/listen/cloze → libera os 125 itens de pontuação exata |
| 29 | M021b | padronizar enunciados listen → `Ouça e escreva a frase completa.` (131 itens; 12 fragmentos-mula reescritos primeiro) |
| 30 | M022 | incluir B1 no baseline congelado `findUnusedReusedRefs` (65 refs) e decidir por política: corrigir textos OU remover refs (sem renomear ids) |

## Nível 5 — MINOR em lote (copy-editing)

N001 (`introduce` → `introduz`), N002 (`processe` → `trate`), N003 (`trade-off(s)` → `contrapartida(s)`, 4×), N004 (`indoor` → `em ambiente fechado`, 5×), N005 (pessoa da variante), N006 (comma splices `por outro lado`, 6×), N007 (aspecto l02-e05), N008 (`Perdi-me` → `Eu me perdi`), N009 (política de backshift única), N012 (gênero 지민), N013/N016/N023 (glosas), N014 (6 citações de explanation → substring literal), N017 (glosa `예정`), N018 (doc de risco homógrafo), N019/N020 (dívida de input), N021 (nota de escopo c02), N022 (variante `가구`).

## Fila de revisão humana/nativa — encerrada editorialmente na 12D

U001 `-더라면` (l04) · U002 `비에 미끄러져서` · U003 `더 용기를`/`뭐를` · U004 `두 번밖에` · U005 registro da avó · U006 `못 온다고` · U007 반말 l23 · U008/U009 `-ㅂ니다` isolado · U010/U011 notas metalinguísticas ambíguas · U012 `대신` sem `-에` · U013 `-기에` em fala · U014 `대피` sem cenário. **Todos receberam disposição final na 12D** (ver `final-editorial-decisions.md`); não há mais fila aberta para estes 14. A revisão nativa do conteúdo geral de Hangul/A1/A2/B1 continua como risco separado, sem bloquear o fechamento deste backlog. Não há alegação de aprovação nativa.
