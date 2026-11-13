# B1 — achados de vocabulário (Fase 12B)

Escopo: 320 identidades `ko:` + 320 frases contextuais (`src/content/vocabulary/b1-m01…m08.ts`), 164 `reusedIds`, e a relação vocabulário×itens. IDs canônicos em `data/findings.json`; medições em `vocabulary-findings.json` e `lexicon-origin-findings.json`.

## Estado estrutural (medições limpas)

- **0 colisões** de identidade B1↔A1/A2; **0** homógrafos intercurso não resolvidos; 96 identidades distintas reusadas consistentemente com A1/A2; 320/320 frases com alvo presente na frase, exceto os 3 casos abaixo; IDs nunca renomeados nesta auditoria.
- `targetInsideWord` (alvo-prática dentro de palavra maior): 8 sinalizados pelo analisador → **3 reais** (M005/M006), 5 ruído de flexão legítima (`-된`, `-적인`, `-일`) registrados como falsos positivos em `exercise-findings.md §Rejeições(3)`.

## MAJOR

- **B1-12B-M001 — `ko:발언` (b1-m04.ts:16)**: frase-modelo `발언 시간을 두 분으로 제한해요.` para "dois minutos" — `두 분` lê-se como classificador honorífico de pessoas; minutos pedem `2분으로`/`이 분으로`. Correção: `발언 시간을 2분으로 제한해요.`
- **B1-12B-M005 — `ko:수신` (b1-m08.ts:23)**: a glosa diz "recebimento" mas a frase-modelo usa só `수신자` (destinatário) — o alvo canônico não ocorre sozinho; `contextMeaning` contradiz a frase. Proposta mantém a identidade (Opção A: frase com `수신` isolado; Opção B — renomear para `수신자` — rejeitada pela política "não renomear IDs").
- **B1-12B-M006 — `ko:타협`/`ko:구조`**: mesma classe corrigida 3× na 12A — a frase prática exibe apenas o composto (`타협점`, `구조대`), que é outro lexema. Frases alternativas prontas em `correction-proposals.md`.
- **B1-12B-M007 — `ko:뿐만 아니라` (b1-m03.ts:30)**: `pos: "interjeição"` — único rótulo desse tipo em todo o B1, para um conectivo aditivo (pares `게다가/또한` são `advérbio`). O schema atual não tem tipo "conectivo"; propor `advérbio` + nota e reabrir a dívida de schema V1-001 na fase B2. A frase-modelo começa sem hospedeiro (`'뿐만 아니라 비용도 줄어요.'`) e a pt promete "…mas também tempo" que o ko não tem — correção completa no JSON.
- **B1-12B-M008/M009 (com `progression-findings.md`)**: cartões usados antes do registro/origem — `최우선`/`분담` cobrados em c02/c04 vindo só em l37; palavras cobradas em ditado sem cartão algum (`정책`, `기준`, `문자`(SMS), `견적`, `업체`).
- **B1-12B-M024 — `ko:예외`/`ko:더욱이`**: frase de `더욱이` com pt truncado ("mais ainda, ventou") e registro misto no ko (`-고` coloquial + conectivo formal).

## MINOR

- **N013 — `ko:여운`**: segunda glosa "eco emocional" é coinagem.
- **N016 — `ko:우선`/`ko:차라리`**: glosas de advérbios misturam classes (`"primeiro; prioridade"`; `"preferir; antes"`).
- **N018 — homógrafos intra-forma** (`부상` 負傷/浮上, `대기` 待機/大氣, `정전` 停電/停戰, `비상` 非常/飛翔, `서명` 署名/聲明, `경계` 境界/警戒): hoje desambiguados pela frase; risco para revisão humana futura; **sem renomeação** (política 12A).
- **N022 — `b1-l21-e06`**: aceita "famílias" para `가구` (censitário: domicílios) — glosa larga em variante aceita.
- **N023 — `ko:접근성` (b1-m06.ts:35)**: glosa "acessibilidade" lê-se como PcD em pt-BR; o contexto é "perto da estação" (conveniência de acesso) — a mesma palavra na frase de `목적` (b1-m02.ts:14) propaga a leitura.

## Política aplicada

- Conteúdo é original do curso; **nenhum achado desta auditoria constitui aprovação nativa** — os 14 INCERTOS linguísticos foram fechados editorialmente na 12D (`final-editorial-decisions.md`); a revisão nativa do conteúdo geral continua como risco separado.
- Frases corrigidas não têm MP3 estático (áudio é opt-in; TTS cobre); nada foi regenerado nesta fase.
