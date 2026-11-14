# Achados A0 (Hangul) — consolidação

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Lotes de origem: `a0-hangul`, `vocab-hangul`.

Baseline auditado: `3103ce3` (branch `audit/a0-a2-linguistic`). Este arquivo consolida; as fichas
completas de cada lote estão em `data/findings/*.md`, e o índice de todos os cursos em
`data/findings-index.md`.

Registros: **28** (CRÍTICO 2 · MAJOR 8 · MINOR 16 · INCERTO 2).
Grupos distintos (mesmo item/sveridade, quando dois revisores cobriram o lote): **25**
(CRÍTICO 2 · MAJOR 7 · MINOR 14 · INCERTO 2).

## Como ler a coluna **Verificação**

- `CONFIRMADO` — o orquestrador reproduziu o fato no repositório (leitura da fonte, analisador
  determinístico ou o motor real de correção em `src/lib/exercises`).
- `REJEITADO` — a alegação não se sustenta; o achado **não** entra nas propostas de correção.
- vazio — achado de revisor de lote, ainda não re-verificado individualmente (coberto pela
  revisão do lote; ver `coverage-ledger.md`).

## CRÍTICO (2)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A0-001 | a0-hangul | `h21-e02; rule:liaison/ex (음악 → 으막)` | explicação afirma que o batchim de 음 é ㄱ e que ele "passa" para 악 | alta | **CONFIRMADO** — re-leitura de `src/content/hangul/lessons/h21.ts:82` e `rules.ts:19` contra `src/content/hangul/syllables.ts:2737` (`applyLiaison` no probe). |
| V0-001 | vocab-hangul | `ko:음악 (frase/nota da ficha) + exemplo de lição h21-e02 (não está na ficha, mas é a origem da nota)` | gabarito de "ligação" de 음악 ensina "으막", forma que não existe; há MP3 gerado dela | alta | **REJEITADO** — '으막' é a transcrição padrão (온라인가나다 327196 escreve '옏 으막'); o erro real é só a prosa de A0-001. O MP3 mapeado está coerente. |

## MAJOR (7)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A0-002 | a0-hangul | `h18/intro (bloco "Sete sons no total")` | h18 declara "os 28 finais escritos" quando o inventário é 27 | alta | **CONFIRMADO** — inventário programático dos `newFinals` de h17–h20 soma 27; a própria planilha de sílabas usa 25 finais distintos. |
| A0-003 | a0-hangul | `h13-e02` | enunciado de h13-e02 pede "a sílaba com glide labial" mas o gabarito é 고 (sem glide) | alta | **CONFIRMADO** — `src/content/hangul/lessons/h13.ts:66-77`: `audioText: 고` + `correctOptionId: go` com enunciado que pede o glide (que só existe em 과). |
| A0-004 | a0-hangul | `h15/intro (bloco ㅢ), h15-e04 (X), word:주의 (NOTA)` | exemplo de ㅢ "[i] depois de consoante" usa 주의, que vem depois de vogal | alta | **CONFIRMADO** — `src/content/hangul/lessons/h15.ts:19` — ambiente descrito (após consoante) não existe em 주의. |
| A0-005 | a0-hangul | `h25-e04, c2-e05, c2-e10, c4-e05 (ㅙ/ㅞ/ㅚ → [we]); em grau menor: h15-e01, h15-e02, c2-e06, c2-e11 (의 vs 이)` | itens de escuta exigem distinguir por som realizções que o próprio módulo declara fundidas | alta (para a contradição); média (para quantos alunos reais erram) | **CONFIRMADO** — itens `audio-to-char` com alternativas homófonas; a própria lição declara a fusão [we]/[i]. |
| A0-006 | a0-hangul | `h05-e10` | distrator de h05-e10 usa ㅂ, ainda não ensinado na lição | alta | **CONFIRMADO** — distrator com jamo não ensinado no ponto do curso; lacuna do `validate.ts` confirmada por leitura do validador. |
| V0-002, V0-003 | vocab-hangul | `ko:나의` | nota de ko:나의 ensina a leitura [에] para uma palavra em que 의 é substantivo dependente ([의]) | alta (para a distinção 조사/의존명사); média (para a formulação exata da nota) | **REJEITADO** — 조사 '의' → [에] é permitido (온라인가나다: '우리의[우리의/우리에]'); a nota está certa. Se '나의' for lido como pronome+substantivo, a mesma nota continua coerente com h15. |
| V0-004 | vocab-hangul | `sent:전화:16, sent:꽃:13, sent:강아지:9, sent:의자:19, sent:공부:25, sent:시계:22, sent:차:24, sent:커피:1, sent:우유:18, sent:물:3, sent:책:7, sent:문:20, sent:눈:15, sent:서울:21, sent:옷:23 (sistêmico)` | as 25 frases do módulo cobram vocabulário fora do inventário de 133 e contrações/irregulares nunca ensinados em h01–h24 | alta (para a constatação); média (para a severidade — aceitável se nunca cobrado) | — |

## MINOR (14)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A0-007 | a0-hangul | `h04/intro (가구), jamo ㄱ/ㄷ/ㅂ/ㅈ (IPA [k],[ɡ] / [t],[d] / [p],[b] / [tɕ],[dʑ])` | sonorização entre vogais é afirmada como categorical ([kaɡu], "sonoriza para [ɡ]/[b]") | média | — |
| A0-008 | a0-hangul | `h02/intro, h02-e02/e04/e08; jamo ㅗ, ㅓ` | aproximações de ㅗ/ㅓ com vogais NASAIS do português ("como em avô", "entre 'ó' e 'â'") | alta (para o risco), média (para a formulação exata da nota) | — |
| A0-009 | a0-hangul | `h10/intro, h10-e01 (X/fallback), jamo ㅆ` | ㅆ descrito como "curto ... sem alongar como 'ss'" | média | — |
| A0-010 | a0-hangul | `h21-e11` | explicação de h21-e11 nega que 강 tenha consoante final | alta | — |
| A0-011 | a0-hangul | `h21/intro; rule:liaison (texto da regra)` | prosa "a segunda parte costuma se mudar" (pt-BR truncado/ambíguo) | alta | — |
| A0-012 | a0-hangul | `h12-e02` | glosa de 내 como "eu (formal)" não corresponde ao uso padrão | média | — |
| A0-013 | a0-hangul | `h22/intro (bloco "O que fica fora")` | referência futura "Nasalização de ㄹ → ㄴ" nomeia/direciona mal a regra adiada | alta | — |
| A0-015 | a0-hangul | `c4-e04` | fallback de c4-e04 exibe a pseudo-sílaba 쮜 | média | — |
| A0-016 | a0-hangul | `h01/intro, h01-e05` | "promulgado entre 1443 e 1446" funde criação e promulgação | alta | — |
| V0-005 | vocab-hangul | `ko:핥다, ko:훑다` | nota de 핥다/훑다 promete "aspiração de 다" quando a forma de citação padrão é [할따]/[훌따] (tensificação) | alta | — |
| V0-006, V0-007, V0-008 | vocab-hangul | `ko:시계` | nota de ko:시계 condicional o abrandamento de ㅖ a um ambiente inexistente ("depois de consoante") | média-alta (o fenômeno é real; a formulação da condição é que está errada) | — |
| V0-009 | vocab-hangul | `ko:몫, ko:까치, ko:낮, ko:삶, ko:세수` | lote de glosas pouco naturais/imprecisas em pt-BR | alta (a/e), média (b/c/d) | — |
| V0-010 | vocab-hangul | `ko:뇌, ko:암, ko:몫, ko:삶, ko:읊다, ko:훑다, ko:핥다, ko:아우 (nota), ko:하마, ko:타조` | palavras raras abstratas mantidas como "vocabulário" só por cobertura de inventário (carga A0 assumida em nota, a confirmar na revisão nativa) | alta (para a constatação), baixa (para a ação) | — |
| V0-011 | vocab-hangul | `ko:나의, ko:감사합니다, ko:좋다, ko:젊다, ko:넓다 — `pos` vazio; ko:싸다/ko:짜다/ko:쓰다/ko:싫다/ko:많다/ko:없다 etc. rotuladas "verbo"` | cinco entradas sem `pos` (e verbos descritivos rotulados como "verbo" sem distinção) | alta | — |

## INCERTO (2)

| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |
|---|---|---|---|---|---|
| A0-014 | a0-hangul | `h14/intro (bloco "Ortografia importa")` | h14 apresenta [hoe] como realização aceita de ㅚ/회, mas proíbe "ho-e" | baixa | — |
| V0-012 | vocab-hangul | `ko:마음 (a1-l38), ko:차 (a1-l16, a1-l17), ko:감사합니다 e ko:한국 (a1-l01) — verificados direto nos arquivos-fonte; varredura do dump indica padrão amplo (~60 ocorrências de reusedIds de Hangul sem a ` | reusos declarados em `reusedIds` que nunca aparecem na própria lição (bookkeeping vs "retomadas em contexto") | baixa/média (falta a spec do campo) | — |

