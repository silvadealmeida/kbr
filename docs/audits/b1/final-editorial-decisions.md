# B1 — decisões editoriais finais dos 14 INCERTOS (Fase 12D)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


**Status:** fechamento editorial por IA em 2026-11-13, na branch local `audit/b1-phase-12b` (sem push, sem deploy). O dono decidiu não exigir uma fase separada de revisão humana/nativa para encerrar este backlog. Isso **não** é aprovação nativa, nem certificação, nem `human-approved`.

**Escopo:** as 14 pendências `B1-12B-U001`–`U014` da auditoria 12B. Não houve nova auditoria linguística ampla, nem implementação de B2/C1/C2, nem reescrita de conteúdo não relacionado.

**Status canônico:** `EDITORIALLY_RESOLVED_AI` — decisão editorial registrada, implementação verificada e teste de regressão quando o comportamento mudou. O conteúdo do curso continua `in-review` no sentido geral; nenhum item foi promovido a `reviewed`.

## Resumo

| ID | Tema | Disposição final | Mudança de conteúdo | Teste |
|---|---|---|---|---|
| U001 | `-더라면` / `있더라면` | **KEEP + CLARIFY** | nota e exemplo de `-았/었더라면`; cloze mantém `더라면` | U001 |
| U002 | `비에 미끄러져서` | **CORRECT** | `빗길에 미끄러져서` + pt | U002 |
| U003 | `더 용기를` / `뭐를` | **KEEP** | variantes de ordem aceitas; `뭐를` preservado | U003 |
| U004 | `두 번밖에 없어요` | **CORRECT** | frequência explícita (`두 번밖에 안 오다`) + pt | U004 |
| U005 | registro da avó | **REJECTED — VALID USAGE** | nenhuma | U005 |
| U006 | `못 온다고 했어요` | **CORRECT (pt only)** | tradução para “não pode vir/ir”; coreano intacto | U006 |
| U007 | 반말 na l23 | **CLARIFY** | painel de registro antes da prática | U007 |
| U008 | `-ㅂ니다` isolado na l07 | **CORRECT** | `좋습니다` → `좋아요` | U008 |
| U009 | registro formal em leituras | **KEEP + CLARIFY** | notas de registro; `-ㅂ니다`/`-습니다` preservados | U009 |
| U010 | nota de `-자마자` | **CLARIFY** | regra específica reescrita | U010 |
| U011 | nota de pergunta relatada | **CLARIFY** | metalinguagem reescrita | U011 |
| U012 | `비싼 대신에` / N + 대신 | **KEEP + CLARIFY** | nota cobre verbo, adjetivo e substantivo; `에` opcional | U012 |
| U013 | `-기에` na l18 | **CORRECT (register)** | fala passa a `-니까`; `-기에` segue ensinado/testado | U013 |
| U014 | `대피했어요` | **CLARIFY** | enunciado ancora aviso de emergência | U014 |

**Arquivos de conteúdo tocados:** `src/content/curriculum/b1/lessons/module1.ts`, `module2.ts`, `module4.ts`, `module5.ts`, `module6.ts`, `module7.ts` e `src/content/vocabulary/b1-m01.ts`.

**Teste dedicado:** `tests/content/b1-editorial-decisions.test.ts` (17 testes). A suíte completa passou com **630 testes / 44 arquivos**.

## Critérios aplicados

1. Ler a frase coreana, a tradução, o diálogo/reading completo e a nota gramatical antes de editar.
2. Verificar se a 12C já havia resolvido o ponto; não fabricar mudança onde o texto já estava correto.
3. Aplicar a menor mudança que satisfizesse a decisão editorial.
4. Atualizar traduções e gabaritos dependentes.
5. Preservar IDs de lição, exercício, vocabulário e cartões Leitner; nenhum ID foi renomeado.
6. Não alterar `Progress` v1, CAS, schema, áudio restrito ou conteúdo de B2/C1/C2.
7. Registrar o impacto de áudio: o B1 não possui corpus MP3 estático; todo texto B1 alterado usa TTS coreano do navegador.

---

## U001 — `-더라면` / `있더라면` (b1-l04)

- **Disposição:** KEEP + CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module1.ts` (intro de l04, `b1-l04-g2`, MCQ independente).
- **Antes:** a nota dizia apenas “condição que não aconteceu”; o exemplo de passado concluído era `그때 알더라면 다른 선택을 했을 거예요.`; o MCQ usava `알더라면 바꿨을 거예요.`
- **Depois:** a nota explicita que `-았/었더라면` marca um fato passado concluído (`알았더라면`, `있었더라면`) e que a forma sem `-았/었-` também ocorre em estado/possibilidade geral. O exemplo passou a `그때 알았더라면 다른 선택을 했을 거예요.` e o MCQ a `알았더라면 바꿨을 거예요.`
- **O que foi preservado:** `시간을 되돌릴 수 있더라면...` no intro, diálogo, exemplo, reading e cloze; o gabarito do cloze `b1-l04-e07` continua `더라면` (a lacuna é `있___`).
- **Racional:** `-더라면` é uma condicional contrafactual/retrospectiva. `있더라면` é aceitável para um estado ou possibilidade geral (“se fosse possível voltar o tempo”), e o contexto de arrependimento já está explícito na tradução. Para um fato passado concluído, o coreano padrão marca o passado antes de `-더라면`; por isso o exemplo e o MCQ foram ajustados, sem substituir todas as ocorrências mecanicamente.
- **Teste:** `b1-editorial-decisions.test.ts` › U001 (nota contém `-았/었더라면`; exemplo `알았더라면`; cloze aceita `더라면` e rejeita `었더라면`).
- **Áudio:** o exemplo gramatical mudou de `audioText`; B1 usa TTS, sem MP3. Nenhum asset foi gerado, apagado ou redistribuído.

## U002 — `비에 미끄러져서` (ko:넘어지다)

- **Disposição:** CORRECT.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/vocabulary/b1-m01.ts` (linha do cartão `ko:넘어지다`).
- **Antes:** `비에 미끄러져서 넘어졌어요.` / “Escorreguei na chuva e caí.”
- **Depois:** `빗길에 미끄러져서 넘어졌어요.` / “Escorreguei na rua molhada e caí.”
- **Racional:** `빗길에` é a colocação padrão para escorregar na rua molhada pela chuva; `비에` causal é compreensível, mas menos natural nesse contexto. O alvo do cartão (`넘어졌어요`) e o ID `ko:넘어지다` foram preservados.
- **Teste:** `b1-editorial-decisions.test.ts` › U002.
- **Áudio:** a frase contextual mudou de `audioText`; B1 usa TTS, sem MP3.

## U003 — `더 용기를 냈으면` / `뭐를` (b1-l04)

- **Disposição:** KEEP.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module1.ts` (`b1-l04-e05`, diálogo d03).
- **Antes:** o gabarito aceitava `그때 더 용기를 냈으면 좋겠어요.`; a ordem alternativa `용기를 더 냈으면` não era aceita. O diálogo usava `뭐를`.
- **Depois:** além do gabarito, `b1-l04-e05` aceita `용기를 더 냈으면 좋겠어요.` e `그때 용기를 더 냈으면 좋겠어요.`. `뭐를` foi mantido no diálogo.
- **Racional:** a posição de `더` e as formas `뭐를`/`뭘`/`무엇을` são variantes válidas com diferenças de ênfase e registro. A decisão preserva o padrão pedagógico mais claro sem criar uma regra global de normalização de sinônimos.
- **Teste:** `b1-editorial-decisions.test.ts` › U003.
- **Áudio:** nenhum texto coreano mudou; sem impacto.

## U004 — `버스가 두 번밖에 없어요` (b1-l32)

- **Disposição:** CORRECT.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module7.ts` (diálogo d4, listen e03, reading e04, listen e08).
- **Antes:** `버스가 아침에 두 번밖에 없다는 예가 나와요.` e `버스가 두 번밖에 없어서 학생들이 아침에 오래 기다려요.`; o pt dizia “há apenas dois ônibus”.
- **Depois:** `버스가 아침에 두 번밖에 안 온다는 예가 나와요.` e `버스가 아침에 두 번밖에 안 와서 학생들이 오래 기다려요.`; o pt passou a “passa apenas duas vezes pela manhã”.
- **Racional:** `두 번` é frequência, não contagem de veículos. `두 번밖에 없다` é ambíguo/awkward; `두 번밖에 안 오다` torna explícito que o ônibus passa só duas vezes. A manhã foi preservada porque é o contexto do texto e do transtorno dos alunos.
- **Teste:** `b1-editorial-decisions.test.ts` › U004.
- **Áudio:** três textos de `audioText` do B1 mudaram; TTS apenas, sem MP3.

## U005 — registro da avó (b1-l22)

- **Disposição:** **REJECTED — VALID USAGE**.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module5.ts` (diálogo de l22).
- **Antes/depois:** nenhum texto alterado.
- **Racional:** uma avó pode usar `해라체` com um neto; `-다고들 해요` é uma expressão de relato/opinião difundida e não cria, por si só, uma transição incompatível de nível de fala. O diálogo mantém `그렇지`, `물론이지`, `좋겠구나` e `안 되지` como fala familiar válida. Não houve evidência de inconsistência real de relação ou contexto pragmático.
- **Teste:** `b1-editorial-decisions.test.ts` › U005 (presença de `한다고들 해요` e `좋겠구나`).
- **Áudio:** nenhum.

## U006 — `못 온다고 했어요` (b1-l03)

- **Disposição:** CORRECT (apenas português).
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module1.ts` (diálogo d2, MCQ e01, translate e09).
- **Antes:** “Ele disse que não poderá vir à reunião amanhã.” / “Que não poderá ir à reunião.”
- **Depois:** “Ele disse que não pode vir à reunião amanhã.” / “Que não pode ir à reunião.”; a variante “não poderá” continua aceita no translate.
- **O que foi preservado:** o coreano `못 온다고 했어요` e a leitura correspondente, sem forçar backshift.
- **Racional:** o coreano relatado é gramatical; a reunião é amanhã, e o português brasileiro usa naturalmente “não pode vir” para um compromisso futuro. A escolha mantém o contexto e não reescreve o coreano por causa do tempo do português.
- **Teste:** `b1-editorial-decisions.test.ts` › U006.
- **Áudio:** nenhum texto coreano mudou.

## U007 — diálogo em 반말 na l23

- **Disposição:** CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module5.ts` (intro de l23).
- **Antes:** dois painéis de intro; o diálogo e o listen e03 usavam 반말 (`좋겠어`, `할게`, `낫지`) sem nota de registro.
- **Depois:** foi adicionado o painel **“Registro: 반말 entre amigos”**: Sujin e Jimin são amigos próximos; o 반말 é natural entre iguais/íntimos; `좋겠어` é a forma informal de `좋겠어요`, e o `-요` marca cortesia; deve-se evitar 반말 com desconhecidos, colegas de trabalho, pessoas mais velhas e em situações formais. O diálogo e o gabarito avaliado não mudaram.
- **Racional:** o uso é intencional e realista; a lacuna era pedagógica, não linguística. A nota ensina o registro antes da cobrança de `좋겠어`.
- **Teste:** `b1-editorial-decisions.test.ts` › U007 (painel e gabarito do listen).
- **Áudio:** o painel tem exemplo `ko`, mas não é `audioText`; nenhum áudio mudou.

## U008 — `-ㅂ니다` isolado na l07

- **Disposição:** CORRECT.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module2.ts` (diálogo d6 de l07).
- **Antes:** `좋습니다. 목표를 이루기 위해 우리가 할 일이 분명해졌네요.`
- **Depois:** `좋아요. 목표를 이루기 위해 우리가 할 일이 분명해졌네요.`
- **Racional:** o diálogo é conversacional e usa 해요체; a fala isolada em `-ㅂ니다` não tinha propósito comunicativo explicado. A tradução “Ótimo.” não mudou.
- **Teste:** `b1-editorial-decisions.test.ts` › U008.
- **Áudio:** `audioText` do diálogo mudou; TTS apenas, sem MP3.

## U009 — registro formal em leituras (l17/l20)

- **Disposição:** KEEP + CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivos:** `src/content/curriculum/b1/lessons/module4.ts` (summary de l17 e l20; readings `b1-l17-e04` e `b1-l20-e10`).
- **Antes/depois:** `필요했습니다` e `낫습니다` foram preservados; foram acrescentadas notas de resumo explicando que textos de leitura podem usar o registro escrito formal (`-ㅂ니다`/`-습니다`) mesmo quando o diálogo usa 해요체.
- **Racional:** o registro formal é apropriado em prosa de relatório/ata e não é um erro por contraste com o diálogo. As notas evitam que uma futura revisão mecânica homogenize a leitura para 해요체.
- **Teste:** `b1-editorial-decisions.test.ts` › U009.
- **Áudio:** nenhum texto coreano avaliado mudou.

## U010 — nota de `-자마자` (l02-g2)

- **Disposição:** CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module1.ts` (`b1-l02-g2`).
- **Antes:** “É mais forte que -고 나서 e não aceita ordem na segunda parte.”
- **Depois:** “A oração seguinte descreve um fato já ocorrido; por isso não pode ser uma ordem, um pedido nem uma proposta. A restrição é específica de -자마자; não confunda com -자, que tem outros usos e regras próprias.”
- **Racional:** “ordem” era ambíguo entre sequência e imperativo. A nova redação nomeia a restrição sintática precisa e não a generaliza para todos os conectores temporais nem para `-자`.
- **Teste:** `b1-editorial-decisions.test.ts` › U010.
- **Áudio:** nenhum.

## U011 — pergunta relatada (l03-g2)

- **Disposição:** CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module1.ts` (`b1-l03-g2`).
- **Antes:** “Com verbos de movimento, a citação mantém a forma interrogativa sem o ponto de interrogação final.”
- **Depois:** “A forma relata uma pergunta com o final interrogativo -냐고. A pergunta citada não leva -요 nem ponto de interrogação... O ponto de interrogação pertence à escrita; a entonação pertence à fala. O que marca a pergunta é o final gramatical -냐고, não o sinal.”
- **Racional:** a restrição anterior não descrevia um fato gramatical. A nova redação separa final interrogativo, entonação e pontuação, sem mudar gabaritos.
- **Teste:** `b1-editorial-decisions.test.ts` › U011.
- **Áudio:** nenhum.

## U012 — `비싼 대신에` e N + 대신(에) (l08)

- **Disposição:** KEEP + CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module2.ts` (`b1-l08-g1`).
- **Antes:** a nota dizia “Com adjetivos, use -(으)ㄴ 대신(에): 비싼 대신에, 싼 대신에”, mas não explicava substantivo nem a opcionalidade de `에`.
- **Depois:** a nota cobre `V-는 대신(에)`, `Adj-(으)ㄴ 대신(에)` e `N 대신(에)`, com o exemplo `커피 대신에 차를 마셔요.` e a observação de que `비싼 대신` e `비싼 대신에` são igualmente corretas.
- **Racional:** `비싼 대신에` é gramatical; a omissão de `에` não é erro. A nota estava incompleta para substantivos, não errada.
- **Teste:** `b1-editorial-decisions.test.ts` › U012.
- **Áudio:** nenhum exemplo avaliado mudou.

## U013 — `-기에` na fala de colegas (l18)

- **Disposição:** CORRECT (registro).
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module4.ts` (diálogo d6 de l18; intro e nota de `-기에`).
- **Antes:** `...경력과 능력을 함께 생각해야 하기에 결정을 미룰 수밖에 없어요.`
- **Depois:** `...경력과 능력을 함께 생각해야 하니까 결정을 미룰 수밖에 없어요.`
- **O que foi preservado:** `-기에` continua na nota gramatical, nos exemplos e no cloze `b1-l18-e07` (resposta `기에`). A nota agora diz que `-기에` é mais objetivo/escrito e que, na conversa cotidiana, `-니까` e `-아/어서` são mais naturais.
- **Racional:** a relação é de colegas em conversa; `-기에` é válido, mas mais formal/escrito. `-니까` mantém a relação causal e soa natural na fala, sem remover o alvo gramatical da lição.
- **Teste:** `b1-editorial-decisions.test.ts` › U013.
- **Áudio:** `audioText` do diálogo mudou; TTS apenas, sem MP3.

## U014 — `대피했어요` (b1-l27)

- **Disposição:** CLARIFY.
- **Status:** `EDITORIALLY_RESOLVED_AI`.
- **Arquivo:** `src/content/curriculum/b1/lessons/module6.ts` (listen `b1-l27-e08`; o achado 12B citava `b1-l27-e09`, que é um translate).
- **Antes:** enunciado “Ouça e escreva a providência tomada.”
- **Depois:** enunciado “Ouça e escreva a providência tomada após o aviso de emergência.”
- **O que foi preservado:** `승객들은 안전하게 대피했어요.` e a tradução “Os passageiros evacuaram em segurança.”
- **Racional:** a frase é gramatical, mas a evacuação precisa de um cenário de perigo/emergência para o aprendiz. O enunciado ancora a situação sem mudar o alvo de escuta.
- **Teste:** `b1-editorial-decisions.test.ts` › U014.
- **Áudio:** apenas o enunciado mudou; `audioText` e gabarito permanecem.

---

## O que foi preservado de propósito

- `있더라면` em l04, porque a condição é uma possibilidade/estado contrafactual geral; `-았/었더라면` foi documentado para o passado concluído.
- `뭐를` em l04 e as variantes `뭘`/`무엇을` como formas válidas; nenhuma regra global de sinonímia foi criada.
- `비싼 대신에` e `비싼 대신` como formas igualmente corretas; `에` é opcional.
- `해라체` da avó em l22 e `-다고들 해요` como expressão de relato válida.
- `필요했습니다` e `낫습니다` nas leituras de l17/l20 como registro escrito formal.
- `-기에` no ensino e no cloze de l18; apenas a fala do diálogo foi ajustada para `-니까`.
- Todos os IDs de lição, exercício, vocabulário e cartões Leitner; nenhum `ko:` foi renomeado.

## Áudio e licença

- O B1 **não tem corpus MP3 estático**. Todos os `audioText` de B1 usam a voz coreana do navegador (TTS).
- Textos de B1 alterados nesta fase: l04 (exemplo gramatical), l07 (diálogo), l18 (diálogo), l32 (diálogo/dois listens) e o cartão `ko:넘어지다`. Não há MP3 a marcar como obsoleto no manifesto de áudio, porque não existe MP3 de B1.
- Nenhum MP3 foi gerado, apagado, movido ou redistribuído. `public/audio/` continua fora do deploy, a flag `NEXT_PUBLIC_KBR_STATIC_AUDIO` continua opt-in e a guarda de build não foi alterada.
- A licença do encoder `kykim/bert-kor-base` continua não esclarecida; nada aqui autoriza distribuição pública/comercial do áudio.

## Verificação

- `npm run typecheck` — limpo.
- `npm test` — **44 arquivos / 630 testes**, todos passando (613 da base + 17 novos da 12D).
- `npm run build` com áudio estático desligado — verde, `[audio-guard] OK`.
- `npm run e2e` — **619 executados + 27 skips intencionais** (646 no total), Chromium 375/390/768/1280 + WebKit 390.
- Auditoria B1 (`npx vitest run --config docs/audits/b1/tools/vitest.config.mts`) — 2/2.
- Estrutura: `analyze-structure` — **0 achados**; 40 lições, 8 checkpoints, 615 itens, 238 linhas de diálogo, 80 blocos de gramática, 160 exemplos, **81 painéis de intro** (um painel de registro novo na l23), 320+320 de vocabulário, 164 `reusedIds`.
- Fairness: `analyze-typed-normalization` — **0/381** exigindo pontuação final exata; `analyze-listen-prompts` — **0/132** fora do padrão de frase completa.
- Progressão: `analyze-progression` — 48 passos; **30 `answerNotTaught`** e **84 `unknownNoun`** (heurística conhecida, sem regressão em relação à 12C); **12 `markerOrder`** inalterados; `-뿐` restritivo sem ocorrência após a substituição da 12C.
- Vocabulário: **320 identidades / 320 frases**, 0 colisões, 0 homógrafos, 0 `idFormMismatch`, 0 `reusedButUntaught`; 5 `targetInsideWord` conhecidos (ruído de flexão), 3 `surfaceOnlyInSentence`, 15 `adjectiveSuspect` (triagem, não erro confirmado).
- Léxico: **5** cobranças com vocabulário de origem futura (dívida M008/M009 já documentada; nenhuma nova).
- Partículas: 5 falsos positivos de segmentação já documentados; nenhum novo.
- Áudio: guarda de build OK, 0 MP3 em `.next/`; nenhum asset restrito apagado.

## Dívidas não-U preservadas (não reabertas nesta fase)

- **M022 (12C):** 65/164 `reusedIds` sem superfície continuam congeladas no baseline; a heurística é conservadora com flexão e nenhum ID foi deletado.
- **M009 (12C, parcial documentado):** restam 5 cobranças com léxico de origem futura (`변화`, `합의`, `예방`, `여론`, `배상`), já registradas como dívida editorial; não são U001–U014.
- **N009:** U006 fixou a escolha natural em l03; os demais casos de backshift (c01/c08) continuam aceitos e não foram reescritos.
- **N014/N018/N019/N020/N021:** explicações de leitura por paráfrase, documentação de homógrafos, input antes do ensino e nota de escopo do c02 continuam como dívida documentada, sem impacto de correção.
- **Heurísticas de auditoria:** 30 `answerNotTaught`, 84 `unknownNoun`, 5 `targetInsideWord` (ruído de flexão), 3 `surfaceOnlyInSentence`, 15 `adjectiveSuspect` e 5 falsos positivos de partícula seguem como triagem conhecida; não há nova regressão de ordem gramatical.
- **Revisão nativa geral:** Hangul, A1, A2 e B1 continuam `in-review`; este fechamento é editorial e não substitui falante nativo.
- **Áudio:** o B1 continua em TTS; não há corpus MP3 de B1, e a licença do encoder segue não esclarecida.

## Limites e não alegações

- Isto é fechamento **editorial por IA**, não revisão nativa. Não use `native-reviewed`, `human-approved` ou `certified`.
- O conteúdo geral de Hangul/A1/A2/B1 continua `in-review`.
- Os 14 achados não devem ser reabertos sem nova evidência concreta de erro.
- B2/C1/C2 não foram iniciados.
