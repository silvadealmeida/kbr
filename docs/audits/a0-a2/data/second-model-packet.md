# Pacote de verificação por segundo modelo (PASS C — preparado, não executado)

**Status: nenhum segundo modelo foi usado.** A assinatura não tinha saldo para um
modelo pago de outra família, e os modelos gratuitos não são confiáveis para juízo de
coreano. Este arquivo existe para que essa verificação ocorra depois, sem retrabalho.

## Como usar

Rode cada caso contra **um modelo de outra família** (ex.: Gemini 4 / GPT-6.1 /
Kimi K3.1) com o prompt ao final. Peça JSON por caso. Compare com o veredicto do
orquestrador. Só promo­va um achado para "corrigir" quando os dois concordarem;
discordância vai para a fila de revisão nativa.

## Casos disputados de alto impacto

### D-1 · `a2-l02-e01` (CRÍTICO) — gabarito impossível
- Conteúdo: `options = ["Foi a uma fonte termal.", "Morou no exterior.", "Trabalhou em uma ONG."]`, `correctAnswer = "Foi uma fonte termal."`
- Verificação mecânica feita: com `normalize()` de `src/lib/exercises/index.ts`, nenhuma opção casa → o item nunca é corrigido como certo.
- Pergunta ao 2º modelo: isto é um bug de gabarito ou existe leitura em que "Foi uma fonte termal." é a opção?
- Orquestrador: **CONFIRMADO** (independente de idioma: é igualdade de string).

### D-2 · `a1-l11-e06` / `a1-c03-e13` (CRÍTICO) — `제 언니은 선생님이에요`
- Lacuna com `은` fixo + gabarito `언니`; a forma correta é `언니는`.
- Pergunta: `제 언니은 선생님이에요` é coreano aceitável em qualquer registro? `언니는` é a única forma?
- Orquestrador: **CONFIRMADO** por analisador de alomorfia + motor (`언니는` rejeitado hoje).

### D-3 · `음악 → 으막` (A0-001 CONFIRMADO × V0-001 REJEITADO)
- Disputa entre dois revisores: a prosa diz "o **ㄱ** final de 음 passa para 악" (letra errada), e um revisor alegou que a própria transcrição `으막` não existiria.
- Evidência normativa: 온라인가나다 327196 escreve `옛 음악 = [예드막]`, e em pausa `[옏 으막]`; `applyLiaison` do app produz `으막`.
- Pergunta: (a) `음악` realiza-se [ɯ.mak] com o ㅁ deslocado? (b) a notação hangul correta para a fala é `으막`? (c) qual frase descreve o processo sem errar a letra?
- Orquestrador: transcrição **correta**, prosa **errada** → `V0-001` rejeitado, `A0-001` confirmado.

### D-4 · `삼 층` × `삼층` (A2M3-001, premissa corrigida)
- Conteúdo usa `삼 층이에요`; o ditado rejeita `삼층이에요`.
- Evidência: 한글 맞춤법 제43항 (unidade/contador: separado por princípio; junto permitido em ordem/número arábico); 온라인가나다 336486.
- Pergunta: para "3º andar", quais grafias são padrão e quais devem ser aceitas num ditado?
- Orquestrador: conteúdo defensável; **falta a variante aceita**.

### D-5 · `계세요` × `계셔요` e `뵈었어요` × `뵀어요` (A2M7-001/002)
- Clozes aceitam só a primeira forma de cada par.
- Evidência: 온라인가나다 323080 (동어, mesma cortesia); 한글 맞춤법 제35항 붙임 2 (`뵈었어요 → 뵀어요`).
- Pergunta: as variantes são ambas padrão contemporâneo? Alguma soa arcaica/formal demais para A2?
- Orquestrador: **CONFIRMADO** (aceitar as duas).

### D-6 · `ko:따라서` com `규칙을 따라서 행동하세요` (V2-001, CRÍTICO)
- Alegação: nessa frase `따라서` é `따르다`+`-아/서` ("seguindo"), não o conectivo "portanto"; a tradução pt diz "Portanto, aja conforme as regras".
- Pergunta: a frase ilustra o advérbio `따라서`? Se não, reescreva a frase mantendo o alvo `따라서` exatamente uma vez, no início de palavra.
- Orquestrador: **CONFIRMADO** por leitura da fonte (`src/content/vocabulary/a2-m07.ts:27`).

### D-7 · `극장 앞에 만나요` (A1M5-001, CRÍTICO)
- `만나요` = ação; o curso ensina `에서` para local de ação em `a1-l23` (`사거리에서 만나요`) e usa `에서` em `a1-l40`, `a2-l25`.
- Pergunta: `극장 앞에 만나요` é agramatical, marcável, ou aceitável em fala casual? Qual a glosa pt natural?
- Orquestrador: **CONFIRMADO** como inconsistência interna; alta confiança em `에서` aqui.

### D-8 · Marcos cobrados sem ensino (CL-05)
- `-라고 하다`/`-(으)ㄴ다고 하다`/`자고 하다`; `-았/어야 했어요`; `-(으)ㄹ 때`; `-면서`.
- Pergunta: em qual ordem um curso A2 deveria apresentar cada um? Que reescrever (item) e que ensinar (bloco novo)?
- Orquestrador: ausência verificada nos blueprints (`grammar` de todas as 80 lições).

### D-9 · `다시 한번` × `다시 한 번` (A2M8-003)
- Evidência: unificação de 2015 do 국립국어원 (no formato `다시 한번`, ligado, independentemente de sentido).
- Pergunta: essa unificação segue valendo em 2026? Alguma exceção para `다시 한 번 더`?
- Orquestrador: grafia do app **correta**; achado rebaixado a nota.

### D-10 · Gênero e elipse (CL-11, A1M4-001/002)
- `친구` traduzido sempre como "amiga"; respostas corretas sem `저는` rejeitadas.
- Pergunta: quais pt-BR são neutros e naturais para cada frase citada? A elipse de `저는` é a escolha padrão do coreano nessa cena?
- Orquestrador: **CONFIRMADO** como problema de tradução/avaliação; correção em C-15/§5.

## Bloco de pronúncia (vai junto, mas é para nativo, não para modelo)

- A0-001..A0-005: letras na prosa do 연음; contagem de finais (27 vs 28); ambiente do ㅢ;
  aproximações nasais em pt (`ㅓ` "entre 'ó' e 'â'", `ㅗ` "como em avô"); itens de escuta
  com alternativas homófonas (`ㅙ/ㅞ/ㅚ`, `의/이`).
- Motivo do pacote separado: **nenhuma evidência auditiva existe** — o corpus MP3 é
  sintético e está bloqueado por licença (`docs/audio/license-audit.md`). Modelo não ouve;
  humano nativo sim.

## Prompt sugerido (copiar e colar por caso)

```text
Você é revisor de coreano para material didático de falantes de português do Brasil.
Somente leitura: não reescreva nada além das sugestões pedidas.

Para cada caso abaixo, responda em JSON:
{"id": "...", "veredito": "erro|variante_valida|ambiguo|indefinido_sem_nativo",
 "motivo": "...", "correcao_sugerida": "...", "confianca": 0.0-1.0}

Regras: (1) variante válida não é erro; (2) se a norma coreana decide, cite a norma
(한글 맞춤법/표준 발음법/온라인가나다); (3) se depender de naturalidade pragmática,
marque "indefinido_sem_nativo"; (4) nunca invente exemplo "autêntico".

<colar o caso D-n da tabela>
```
