# Correções propostas — ranqueadas por impacto

> **Atualização 12A (2026-11-13):** as correções verificadas foram aplicadas. O
> detalhe item a item, com arquivos, testes, impacto de áudio e status, está em
> [`correction-ledger.md`](correction-ledger.md). Este arquivo continua sendo a
> fila editorial dos itens não aplicados; as seções abaixo mantêm o texto original
> da auditoria read-only para proveniência.

| Proposta | Status na 12A |
|---|---|
| C-01 (gabarito `a2-l02-e01`) | **aplicada** |
| C-02/C-04 (validadores de gabarito e partícula) | **aplicadas** em `validate-exercises.ts` |
| C-03 (`언니은`) | **aplicada** |
| C-05 (pontuação A2) | **aplicada** por variantes no builder A2; motor intacto |
| C-06 (`극장 앞에서`) | **aplicada** |
| C-07 (regra de nome próprio) | **aplicada** |
| C-08 (`ko:따라서`) | **aplicada**, ID preservado |
| C-09 (`-는데`) | **não aplicada** (MAJOR; falta decisão editorial) |
| C-10 (`ㅁ` de `음`) | **aplicada** |
| C-11 (`h13-e02`) | **não aplicada** (MAJOR; áudio `고` precisa de decisão) |
| C-12 (`주의`) | **não aplicada** (MAJOR; revisão nativa) |
| C-13 (28→27 finais) | **não aplicada** (MAJOR; documental) |
| C-14 (variantes `계셔요` etc.) | **aplicada** para `계셔요`, `뵀어요`, `삼층이에요`, `은` |
| C-15 (elipse de tópico) | **não aplicada** (fila editorial; exige análise caso a caso) |
| C-16 (`listen` fragmento) | **aplicada** em 188 ocorrências A1/A2 |
| C-17 (marcos não ensinados) | **aplicada** por reescrita/ensino de `-면서`; detalhe no ledger |
| C-18/C-19/C-20 | **não aplicadas** (MAJOR; fila editorial) |
| N-01…N-04 | **documentadas**, sem mudança de schema |
| Rejeitados (`V0-001`, `V0-002`, `V1-002`, `A2M2-003`) | **seguem rejeitados** |

Fase original **read-only**: este arquivo é a lista de trabalho para uma fase de correção com
aprovação humana. Cada linha tem o ID do achado de
origem (`data/findings/*.md`), o arquivo-alvo e o critério de aceite.

Legenda de risco: **isolado** = uma string, sem mudar ID/CAS/SRS; **encadeado** =
precisa replicar em outros itens; **arquitetural** = mexe em motor/validador/schema,
discutir antes (o agente de B1 está trabalhando no mesmo tree principal).

## Prioridade 1 — impede o aluno de concluir uma lição corretamente

### C-01 · isolado · CRÍTICO `A2M1-001`
- Item: `a2-l02-e01` · arquivo `src/content/curriculum/a2/lessons/a2-l02.ts`
- Trocar `correctAnswer: "Foi uma fonte termal."` → `"Foi a uma fonte termal."`
- Aceite: `checkAnswer` retorna `correct: true` para a opção correspondente; um teste
  parametrizado (C-02) cobre os 180 `mcq` dos dois cursos.

### C-02 · arquitetural (validador) · `CL-01`
- Arquivos: `src/content/curriculum/a2/validate-content.ts`, `.../a1/validate-content.ts`
- Regra nova: para `mcq`, exigir `options.some(o => o === correctAnswer)`; para
  `reading` com `mode: "mcq"`, exigir `options.some(o => o.id === correctOptionId)`.
- Aceite: inverter de propósito o gabarito de um item de teste faz o validador falhar.
- Motivo: sem isso, a classe inteira de bug volta na próxima geração de conteúdo
  (B1 incluído).

### C-03 · encadeado · CRÍTICO `A1M3-001`
- Itens: `a1-l11-e06` (`src/content/curriculum/a1/lessons/a1-l11.ts:140`) e
  `a1-c03-e13` (`src/content/curriculum/a1/checkpoints/a1-c03.ts:154`)
- Enunciado atual: `… 제 ___은 선생님이에요.` com gabarito `언니` → imprime
  `제 언니은`, coreano agramatical. Correção: `제 ___는 선생님이에요.`
- Aceite: frase preenchida = `제 언니는 선생님이에요.`; a variante do exemplo da própria
  lição (`언니는`, linha 85 de `a1-l11.ts`) é o modelo.

### C-04 · arquitetural (validador) · `CL-02`
- Mesmos validadores de C-02, regra nova: reconstruir a frase do `cloze` com o gabarito
  e conferir alomorfia de caso na junção (은/는, 이/가, 을/를, 과/와) quando a resposta é
  substantivo conhecido do currículo.
- Implementação de referência já escrita nesta auditoria: `tools/analyze-particles.cjs`
  (2 erros encontrados em 1.635 exercícios; nenhum falso positivo nos 5.811 itens).

### C-05 · encadeado · MAJOR `A2M2-001`, `A1M7-001`, `A2M8-002`, `CL-03`
- 126 itens de produção só aceitam a forma pontuada exata (todos em A2; 0 em A1).
- Opção A (segura, só conteúdo): completar `acceptedAnswers` com a forma sem ponto em
  cada um dos 126 itens.
- Opção B (motor): remover pontuação final em `normalize()`
  (`src/lib/exercises/index.ts:141`). Muda comportamento de A0/A1/A2 (e do B1 em
  construção) → **não fazer sem decisão registrada em `docs/architecture.md`**.
- Recomendação: A agora, B discutida depois com o dono do projeto.

## Prioridade 2 — coreano errado ensinado como correto

### C-06 · isolado · CRÍTICO `A1M5-001`
- `src/content/curriculum/a1/lessons/a1-l25.ts` `g:a1-l25-appointment`:
  `극장 앞에 만나요.` → `극장 앞에서 만나요.`; texto da nota: "Use 에 para o horário e
  **에서** para o ponto de encontro". Alinhar com `a1-l23` (`사거리에서 만나요`) e com
  `a1-l40` (`시장 입구에서 만나요`).
- Replicar em `a1-c05` e no bloco de introdução que repete a frase.

### C-07 · isolado · CRÍTICO `A1M1-001`
- `src/content/curriculum/a1/lessons/a1-l01.ts:269` (`a1-l01-e03`): apagar a frase
  "O nome próprio não recebe 이에요." e escrever "O som final decide: 아나 → 예요;
  names terminados em consoante recebem 이에요 (제 국적은 브라질이에요)."
- Motivo: a regra está contradita na própria lição (`:142`) e na seguinte (`a1-l02:54`).

### C-08 · encadeado · CRÍTICO `V2-001`
- `src/content/vocabulary/a2-m07.ts:27` — `ko:따라서`: frase-âncora atual é
  `규칙을 따라서 행동하세요.` (= "seguindo a regra"), não o conectivo "portanto".
  Substituir por frase em que `따라서` seja de fato conectivo, ex.:
  `요금이 많이 올랐어요. 따라서 다른 방법을 찾아야 해요.` + tradução coerente.
- O cartão `v:ko:따라서` mantém o mesmo ID (nada de renomear identidade).

### C-09 · encadeado · MAJOR `A2M1-002`
- `src/content/curriculum/a2/lessons/a2-l05.ts` — `저는 학생인데 이 책은 어려워요.`
  (bloco `g2`/intro "Cenário com -는데"): frase sem relação de fundo entre as oraçãoes.
  Substituir por algo como `이 책은 인기가 있는데 저는 안 좋아해요.` e replicar no painel.

### C-10 · encadeado · MAJOR `A0-001`
- `src/content/hangul/lessons/h21.ts:82` e `src/content/hangul/rules.ts:19`:
  "O **ㄱ** final de 음 passa para 악" → "O **ㅁ** final de 음 passa para 악". A
  transcrição `으막` está certa e não muda (conferir com `applyLiaison`); só a prosa
  identifica a letra errada, contradizendo `src/content/hangul/syllables.ts:2737`.

### C-11 · isolado · MAJOR `A0-003`
- `src/content/hangul/lessons/h13.ts` `h13-e02`: enunciado "escolha a sílaba com glide
  labial" com áudio `고` e gabarito `고`. Ou o enunciado vira "…sem glide labial", ou o
  item troca de áudio para `과`. Hoje, obedecer ao enunciado garante o erro.

### C-12 · isolado · MAJOR `A0-004`
- `src/content/hangul/lessons/h15.ts:19`, `h15-e04` e nota de `word:주의`
  (`syllables.ts:2232`): `주의` não vem "depois de consoante" (주 não tem 받침).
  Reescrever: "em sílaba não inicial, `의` pode soar [i]: 주의[주의/주이] — e depois de
  consoante é [i]: 희, 무늬". Manter `나의 → [나에]` (correto para a partícula).

### C-13 · encadeado · MAJOR `A0-002`
- `src/content/hangul/lessons/h18.ts:31`: "os 28 finais escritos" → **27** (16 홑받침 +
  11 겹받침; 28 é a contagem das letras do 훈민정음). Conferir se `h17`/`h19`/`h20` e
  `docs/pedagogy/hangul.md` repetem o número.

## Prioridade 3 — avaliação injusta (gabarito válido rejeitado)

### C-14 · encadeado · MAJOR `A2M7-001`, `A2M7-002`, `A1M8-003`, `A2M3-001`
- `a2-l33-e02`: aceitar `계셔요` (복수 표준어 ao lado de `계세요`).
- `a2-l33-e07`: aceitar `뵀어요` (contratação padrão de `뵈었어요`).
- `a1-l37-e01`: aceitar `은` além de `이` ("승강장은 어디예요?" é coreano válido).
- `a2-l13-e08`: aceitar `삼층이에요` ao lado de `삼 층이에요` (제43항: permitido como
  ordem/numeração).

### C-15 · encadeado · MAJOR `A1M4-001`, `A1M4-002`, `A1M5-002`, `A1M6-001`, `A1M7-001`
- Itens `translate pt-ko` que só aceitam a frase com `저는`, rejeitando a elipse de
  tópico ensinada em `a1-l10`. Completar `acceptedAnswers` com a variante sem
  pronome; nos `ko-pt`, aceitar a resposta sem "Eu".

### C-16 · encadeado · MAJOR `A1M6-001` + medição `CL-04`
- 65 itens `listen` com enunciado de constituinte e gabarito de frase inteira.
- Padronizar: ou o enunciado diz "escreva a frase que você ouviu", ou o item aceita o
  fragmento pedido. Decidir uma política e aplicar nos 65 (20 em A1, 45 em A2).

## Prioridade 4 — progressão e currículo

### C-17 · encadeado · MAJOR `A2M4-001`, `A2M5-001`, `A2M6-002`, `A2M8-001`, `A2M1-003`, `A2M4-002`
- Marcos cobrados sem ensino: `-라고 하다`/`-(으)ㄴ다고 하다`/`자고 하다` (relato de
  fala), `-았/어야 했어요`, `-(으)ㄹ 때`, `-면서`.
- Duas saídas, ambas sem mexer em IDs: (a) reescrever os itens avaliados só com
  material já apresentado; (b) criar o bloco de gramática que declara o marco na lição
  em que ele passa a ser cobrado. Recomendação: (b) para `-라고 하다` e `-(으)ㄹ 때`
  (aparecem muito), (a) para os distratores isolados.

### C-18 · isolado · MAJOR `A2M1-004`
- Distratores de `a2-l01-e06`/`a2-l02-e06` com `-지만` e `-(으)ㄹ 거예요` (ensinados só
  em `a2-l04`/`a2-l06`). Reescrever os distratores com material visto.

### C-19 · isolado · MAJOR `A2M5-002`
- `a2-l23-e05`: o enunciado pede "coreano formal" mas `acceptedAnswers` aceita
  `고객 지원 경험이 있어요.` (해요체). Remover a variante ou mudar o enunciado.

### C-20 · isolado · MAJOR `A2M6-001`
- `a2-l30-g1`: FORM `-았/었고` e a regra "o passado vem antes de `-고`" contradizem os
  próprios exemplos (`바다를 보고 … 먹었어요`) e o cloze `e02`. Alinhar FORM, texto e
  exemplos em uma única descrição (sequência com um só tempo marcado no final).

## Prioridade 5 — tradução e pt-BR (MAJOR/MINOR de superfície)

- `A2M3-003`: `조금 시끄러워서` → "um pouco barulhento **demais**" (contradição interna
  em pt e acréscimo inexistente). Corrigir para "um pouco barulhento".
- `A1M8-001` / `V1-004`: polaridade invertida em perguntas (`돼지고기 없어요?` →
  "Você tem carne de porco?" deve ser "Não tem carne de porco?").
- `A1M8-002`: "Carne de porco não pode" como gloss de `돼지고기는 안 돼요` em cena de
  alergia → "Eu não como carne de porco / Não posso comer carne de porco".
- `A2M1-005`, `A2M1-008`, `CL-11`: gênero inventado em `친구`/`동생`; manter neutralidade
  ou fixar o gênero no coreano, não só no português.
- `A2M1-007`, `CL-05`: `-겠-` e `-네요` em input sem nenhum apoio de tradução/nota.

## Notas sem correção (documentar, não editar)

- **N-01** `V1-001`/`CL-09`: `VocabPos` não tem "adjetivo". É mudança de schema/registro
  compartilhada com B1 → decisão de arquitetura, não de conteúdo.
- **N-02** `V0-003`/`CL-07`: `ko:안` (Hangul, "dentro") e a negação `안` convivem sem
  segunda identidade. Nenhuma colisão hoje; risco em `reusedIds` futuros. Registrar no
  plano de vocabulário antes de qualquer novo reuso.
- **N-03** `A1M8-008`: `reusedIds` declara palavras que não ocorrem na lição
  (ex.: `계산서` em `a1-l36`). O validador não confere presença. Se a política for
  "reuso tem que aparecer", o conserto é no validador + limpeza, não no texto.
- **N-04** 108 entradas legadas do Hangul sem frase contextual → modo `flashcard`
  em `/vocabulario/revisao`. Decisão editorial pendente.

## Rejeitados — não corrigir nada

- `V0-001` (`으막` "não existe") — **errado**: é a forma padrão; ver `references.md`.
- `V0-002` (`나의 → [나에]`) — **errado**: 조사 `의` admite `[에]`.
- `V1-002` (`입어 보다` "deveria ser `입어보다`") — **errado**: o separado é o
  princípio; o junto é permitido.
- `A2M2-003` (distrator `잔 후에` "inexistente") — **errado**: `자다 → 잔` é regular.
  O revisor propôs `*잰 후에`, que não existe.
- `A1M1-002` (`a1-l03-e09`) — achado mantido, **severidade rebaixada** de CRÍTICO para
  MAJOR: o gabarito é defensável; o que falta é contexto único no enunciado.
