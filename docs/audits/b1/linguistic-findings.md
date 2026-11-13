# B1 — achados linguísticos verificados (Fase 12B)

> Severidades conforme o protocolo da auditoria. `INCERTO` = exige validação humana/nativa.
> Todo achado abaixo foi reverificado contra a fonte (linha lida) — falsos positivos de revisores estão em `exercise-findings.md §Rejeições` e no README.
> IDs canônicos de máquina em `data/findings.json`; cada título abaixo traz o seu (`B1-12B-…`). Os achados sistemáticos de exercício/vocabulário/progressão/produção estão nos outros arquivos; este cobre a vertente linguística.

## CRÍTICO

**B1-12B-C001 — b1-l32-e07 (cloze) — alomorfe -으로/-로 cobrado errado; forma correta penalizada**
- Arquivo: `src/content/curriculum/b1/lessons/module7.ts:54,67,78`
- Gabarito do cloze: prompt `계획이 아직 확정되지 않은 것___ 보여요.` com resposta `으로`; a forma correta após batchim ㄹ é `로` (`것으로`), exatamente como aparece no exemplo gramatical da própria lição (linha 67) e na explicação do item (linha 78).
- Problema: o item CORRETO ('로' digitado pelo aluno) é marcado errado; o item exige a forma agramatical. Mesmo tipo de erro do A1M3-001 (언니은) corrigido na 12A.
- Correção proposta: resposta do cloze → `로` (mantendo o prompt); confirmar que nada mais cobra `것으로`.
- Evidência: linhas 54/67/78 lidas; regra de alomorfia -(으)로 (após ㄹ, forma `로`).
- Confiança: ALTA. Impacto cruzado: lição l32; nenhum outro item B1 usa `것으로` (verificado por grep).

**B1-12B-C004 — b1-l24-g1/e06 (exemplo gramatical + MCQ cobrado) — `공사가 하는 통에` é agramatical**
- Arquivo: `src/content/curriculum/b1/lessons/module5.ts:154,165`
- Coreano: `공사가 하는 통에 길이 막혔어요.` — `-는 통에` seleciona ação/situação em curso realizada por um agente; `공사가 하다` não se sustenta sem objeto. Correto: `공사를 하는 통에` / `공사가 진행되는 통에` / `공사하는 통에`.
- Problema: a frase-modelo da gramática E a alternativa correta do MCQ cobrado ensinam e validam a agramaticalidade.
- Correção proposta: `공사를 하는 통에 길이 막혔어요.` nas duas ocorrências (a alternativa errada `공사가 끝났어요.` mantém-se).
- Evidência: duas linhas lidas; definição da própria lição (linha 141) descreve a restrição violada.
- Confiança: ALTA (veredito final: revisão nativa). Impacto cruzado: l24; o collocate `통에` não reaparece cobrado em outro gabarito (verificado).

**B1-12B-C003 — b1-c02-e19 (texto do reading) — `보고서를 줄이고 대신에` não é coreano bem formado**
- Arquivo: `src/content/curriculum/b1/checkpoints/b1-c02.ts:19`
- O padrão ensinado é `V-는/Adj-ㄴ 대신(에)` / `N 대신(에)`; `V-고 대신에` é aglutinação inválida. O reading e a explicação (que ainda desliza de `늘리기로 했어요` para `늘렸어요`, mudando aspecto) usam a forma errada.
- Correção proposta: texto → `팀은 보고서를 줄이는 대신에 발표를 늘리기로 했어요. 시간이 부족했기 때문이에요.`; explicação → `보고서를 줄이는 대신에 발표를 늘리기로 했어요.` (ou `…늘렸어요.` se o aspecto neutro for desejado — manter a mesma marca do texto é melhor).
- Evidência: linha lida diretamente; padrão visto na l08 (frases corretas com `비싼 대신에`).
- Confiança: ALTA (agramaticalidade clara). Impacto cruzado: c02 apenas.

**B1-12B-C002 — b1-c03-e07 (reading) — texto do item em português**
- Arquivo: `src/content/curriculum/b1/checkpoints/b1-c03.ts:18`
- O texto lido começa em português: `"A mudança reduziu o custo, mas aumentou o tempo de espera. 따라서 장단점을 함께 봐야 해요."` — um item de leitura B1 avaliado quase todo em língua errada; a explicação é a única sentença coreana.
- Correção proposta (escopo c03 = l01–l15 + anteriores): `이번 변화로 비용은 줄었지만 대기 시간은 늘었어요. 따라서 장단점을 함께 봐야 해요.`
- Evidência: linha lida; mesma classe do crítico da 12A (a2-c04-e06 em português).
- Confiança: ALTA. Impacto cruzado: c03.

## MAJOR

**B1-12B-M001 — vocabulário b1-l17 `ko:발언` — `두 분으로` ≠ "dois minutos"**
- Arquivo: `src/content/vocabulary/b1-m04.ts:16`
- `발언 시간을 두 분으로 제한해요.` traduzido como "…limitado a dois minutos". Minutos exigem numeral sino-coreano/algarismo: `2분(으로)` / `이 분(으로)`; `두 분` lê-se como classificador honorífico de pessoas ("dois senhores"). A frase-modelo do cartão é coreano não padrão/ambíguo para o sentido dado.
- Correção proposta: `발언 시간을 2분으로 제한해요.`
- Evidência: linha lida; ambiguidade de classifier é padrão conhecido; pt da linha confirma o sentido "minutos".
- Confiança: MÉDIA-ALTA (nativo para confirmar). Não quebra correção de item algum (cartão de vocabulário) — por isso MAJOR, não CRÍTICO.

**B1-12B-M007 — `ko:뿐만 아니라` (b1-m03) — rótulo de classe errado (pos 'interjeição')** — ver também o JSON: a frase-modelo autossuficiente e a pt divergente estão no mesmo achado.
- Arquivo: `src/content/vocabulary/b1-m03.ts:30`
- (a) `pos: "interjeição"` para um conectivo aditivo — única ocorrência desse rótulo em todo o B1, visivelmente errada; (b) a frase contextual começa com `뿐만 아니라` sem hospedeiro (`'뿐만 아니라 비용도 줄어요.'`), padrão que a gramática da l13 não ensina e que não é coreano autossuficiente; (c) a tradução pt promete "…mas também tempo" e o coreano não menciona tempo.
- Correção proposta: pos → `advérbio` (padrão dos pares `게다가/또한` na mesma lição); frase → `시간이 절약될 뿐만 아니라 비용도 줄어요.` / "Não só se economiza tempo, como os custos também caem."; contextMeaning coerente.
- Evidência: linha lida; cartões vizinhos conferidos.
- Confiança: ALTA. Impacto cruzado: prática de vocabulário/Leitner (IDs preservados; sem renomear).

**B1-12B-M004 — cartões gramaticais com rótulo de alomorfe errado (padrão -는/-(으)ㄴ)**
- `module3.ts:155` — forma declarada `동사/형용사 + -라고 해도`, mas o exemplo da linha é `유명하다고 해도` (verbos pedem `-다고 (는) 해도`; `-라고` é citação/imperativo/nome). O rótulo ensina uma regra que seus próprios exemplos violam (analogia direta do A1M1-001 corrigido na 12A).
- `module2.ts:141/154` — forma `-는 한` declarada como `동사/형용사`, mas adjetivos/있·없 pedem `-(으)ㄴ 한` (`좋은 한`, `있는 한` — os próprios exemplos); o cloze e02 (gabarito `은 한`) desmente o rótulo.
- `module2.ts:110` — `-는 대신(에)` com exemplos adjetivais `비싼/싼 대신에` sem declarar `-ㄴ 대신(에)`.
- Correção proposta: l14 → `동사/형용사 + -다고 (는) 해도 / 명사 + -(이)라고 해도`; l09 → título/forma `-(으)ㄴ/는 한`; l08 → incluir `형용사 + -(으)ㄴ 대신(에)`.
- Evidência: linhas lidas. Confiança: ALTA (l14/l09), MÉDIA (l08, questão de completude). Impacto cruzado: lições e suas rubricas de produção.

**B1-12B-M002 — b1-c01-e21/e31 — `-고 말다` cobrado com resultado POSITIVO contra a regra ensinada**
- `적응하고 말았어요.` ("acabou se adaptando") — a l05 ensina `-고 말다` como desfecho indesejado/inesperado-mau. O mesmo verbo `적응하다` é usado duas vezes no checkpoint (reading e cloze-gabarito).
- Alternativa: reescrever como desfecho indesejado coerente: `결국 한 달 만에 이사하고 말았어요.` (ecoando l05) — ou ampliar a definição na l05 (com sinal de revisão).
- Evidência: `module1.ts:125,138` (definição/ exemplos), `b1-c01.ts:22,31`.
- Confiança: MÉDIA (uso existe com "inesperado"; o curso não ensinou essa extensão — INCERTO de nativo). Impacto: c01, l05.

**B1-12B-M010…M016 + M025 — cluster de GRAMÁTICA NÃO ENSINADA exigida em GABARITO/PRODUÇÃO (progressão)**
> Itens numerados abaixo ↔ IDs: (1) M014 · (2) M016 · (3) M015 · (4) M012 · (5) M015 · (6) M013 · (7) M011 · (8) M025 · (9) M010 · (10) nota lexical (sem item próprio).
Cada caso: forma nunca ensinada em bloco gramatical (A1/A2/B1) exigida como resposta de listen/cloze/translate ou em promptKo de produção. Itens:
1. `-(으)ㄹ게요` — cobrado: `l07-e05` (pt-ko, resposta E aceite), `l17-e03` (listen). Nunca ensinado (só `-(으)ㄹ 거예요`; `드릴게요` como chunk em A2-l13).
2. `뿐` (restritivo "só/apenas") — cobrado: `l17-e08` (listen). Ensina-se apenas `-는/-(으)ㄹ 뿐만 아니라` (l13).
3. `-(을) 통해` — cobrado: `l19-e08` (listen: `반복 연습을 통해 숙달할 수 있어요`); a PRÓPRIA linha lexical de `숙달` (b1-m04.ts:39) ensina `반복 연습으로…` → gabarito diverge do material da lição; input adicional em `l20-e10`.
4. `-(으)ㄹ 때` — cobrado em dictado: `l23-e03` (`약속을 바꿀 때는…`); forma REMOVIDA do ensino pelo pacote de correção da 12A e nunca ganha bloco em B1 (a2-l35 tem só 1 input de diálogo '식사할 때'). Censo medido do analisador corrigido: **28 ocorrências em B1** — l23:6, l27:4, l14:2, l25:2, c05:2, l07/l09/l12/l19/l20/l26/l28/l29/l35/l37/l38:1, c08:1 (o valor antigo "~8 textos" era subcontagem do bug de batchim — ver README §Notas de ferramenta).
5. `-(으)시기를 바랍니다` — cobrado em dictado: `l28-e03`, `l38-e03` (e aparece no e-mail-modelo `l38-e04`); nunca explicado como padrão (só em exemplos da própria lição de mensagem formal — defensável, mas não ensinado explicitamente).
6. `-마다` — cobrado: `l22-e06` (gabarito de MCQ), `c05-e13` (listen), `c05-e17` (cloze resposta `마다`), `c05-e28` (pt-ko); nunca ensinado.
7. `-라고`/`-(이)라고` (citação de fala/pedido) — cobrado: `l11-e08` (`갈 거라고`), `l38-e07` (`확인해 달라고 했어요`), e extensivamente como input (l19-e04, l23-e04, c02-e12); a l14 ensinou só a concessão `-라고 해도`, e a dívida `-라고 하다` removida do A2 na 12A nunca foi ensinada em B1.
8. `-자` propositivo — cobrado em promptKo de produção: `l13` (`동네 서비스를 확대하자는 제안을 써 보세요.`) e como explicação de `l13-e01`; nunca ensinado.
9. `-(으)ㄴ다면` (hipótese presente) — cobrado em ditado `c01-e05`/`c01-e24` e no diálogo `l04` (`있더라면` é outra discussão; ver INCERTO U001).
10. `-ㅂ시다` — frase lexical de `해결책` (b1-m02.ts:16 `함께 해결책을 찾아봅시다`) usa o encerramento exortativo nunca ensinado (baixo impacto: input de cartão).
- Correções propostas: (a) substituir pelos padrões ensinados (ex.: `l19-e08`→`반복 연습으로 숙달할 수 있어요`; `l17-e03`→`정리할 거예요`; `l17-e08`→`세 개예요`; `c05-e17`→cloze `-에 따라`…); ou (b) adicionar blocos de ensino (recomendado para `-라고 하다`, `-ㄹ 때` e `-마다`, que reaparecem muito como input). Decisão do dono na fase de correção.
- Evidência: grep dos títulos de gramática em `src/content/curriculum/{a1,a2,b1}/blueprint.ts` + leitura dos itens; `progression-findings.json` (markerFirstSeen).
- Confiança: ALTA na ausência de ensino; os vereditos "deve ser substituído" são editoriais.

**B1-12B-M008/M009 — cluster de LÉXICO NÃO REGISTRADO cobrado em gabarito (transcrição/produção)**
`최우선` (l37 só) cobrado em `c02-e06` e `c02-e24`; `분담` (l37 só) em `c04-e06/e19`; `문자` (SMS; forma existe só como "letra" no registro? sem cartão) em `c06-e06`; `견적` (0 cartões) em `l37-e03`; `최악` (0 cartões) em `l33-e03` e `l33-e04`; `정책`, `기준` (0 cartões) em `c03-e05`; `접근성` é cartão de l29 mas cobrado no ditado `c03-e05` (escopo até l15); `평가` idem (cartão l16 vs `c03-e05`).
- Problema: transcrição de palavras nunca vistas/registradas; o aluno não pode errar "por decência" — vira ditado cego. Mesma classe da dívida `answerNotTaught` documentada na 12A (20/69), agora medida para B1.
- Correções: (a) registrar cartões para as palavras-chave (sem renomear IDs existentes); (b) trocar os itens por frases com vocabulário ensinado; (c) ou reescopo dos checkpoints (decisão editorial).
- Evidência: `lexicon-origin-findings.json` (origens por grep de `["b1-lNN", "forma"`) + leitura das linhas citadas.
- Confiança: ALTA para os casos "0 cartões"; MÉDIA para `문자` (forma pode existir como palavra de Hangul — verificar: `문자` só aparece no repo em c06 e como "caractere" em hangul? grep mostrou ausência em vocabulário).

**B1-12B-M015(parte b) — incoerência gabarito↔cartão na mesma lição (`숙달`)**
- `b1-m04.ts:39` ensina `반복 연습으로 숙달할 수 있어요`; `module4.ts:167` cobra em listen `반복 연습을 통해 숙달할 수 있어요`. Dois textos "oficiais" para a mesma frase-modelo da lição.
- Correção: unificar em `으로` (a forma ensinada no cartão) — ver item (3) do cluster.
- Confiança: ALTA.

## MINOR

- **B1-12B-N001…N004** pt-BR/typos e estrangeirismos de UI: `introduce a objeção` (`module5.ts:78`); `trade-offs` (`blueprint.ts:60`, `module4.ts:91,94`, `c02/c08 "Qual foi o trade-off?"`); `roteiro indoor` (`module2.ts` ×5, e01/e04/e08); `processe conforme o regulamento` (`module4.ts:22`). Correções sugeridas no JSON.
- **B1-12B-N006** pt: splice/registro — `, por outro lado` sem conjunção (`module3.ts:58,59,66,80,81`); "As pessoas da região costumam ir…" ok; `pousada`/`ruela` aceitáveis.
- **B1-12B-N007** pt aspect: `começou a chover` vs `비가 왔어요` (l02-e05) — defensível com `-자마자`; opcionalmente aceitar `비가 오기 시작했어요` ou reescrever o prompt.
- **B1-12B-N009** (+U006) backshift pt inconsistente entre lições: `disse que vem amanhã` (l03) vs `disse que estava ocupado` (l03 e03/exemplos, c01-e24) — política única a definir (ambas aceitáveis).
- **B1-12B-N012** gênero do personagem 지민 inconsistente nas traduções pt: `Ela gosta…` (`module5.ts:72`) vs `Andei ocupado…` (`module5.ts:102`) — alinhar ao glossário de personagens do curso.
- **B1-12B-N016** (+M001 glosas) glosas com categoria cruzada: `우선` (advérbio) com "prioridade"; `차라리` com "preferir"; `접근성` com "acessibilidade" (pt lê como PcD; a frase é "perto da estação") — ajustar glosas/contextMeanings.
- **B1-12B-N014** explicações de reading citando paráfrase em vez de substring do texto (6 itens listados em exercise-findings §explicações).
- **B1-12B-N022** `l21-e09` aceita "famílias" para `가구` (domicílios) — variante longínqua; manter ou restringir.

## INCERTO (14) — registro 12B, fechados na 12D

> **12D:** os 14 receberam disposição final `EDITORIALLY_RESOLVED_AI`; ver [`final-editorial-decisions.md`](final-editorial-decisions.md). A lista abaixo é o registro histórico da 12B e não deve ser reaberta sem nova evidência concreta de erro.

Conjunto canônico = `B1-12B-U001` … `U014` em `data/findings.json` (cada um com ko, problema, duas saídas e confiança explícita):

- **U001** `l04` — `-더라면` sobre possibilidade (`있더라면`); cloze-e07 cobra a forma. Se confirmado: escala para MAJOR.
- **U002** `b1-m01` — coligação `비에 미끄러져서` (vs `빗길에`).
- **U003** `l04` — `더 용기를 냈으면` (ordem) e `뭐를` (vs `뭘/무엇을`): estilo/fala.
- **U004** `l32` — `버스가 두 번밖에 없어요` (frequência vs contagem de veículos).
- **U005** `l22` — oscilação de registro da avó (해라 + `-다고들`).
- **U006** `l03` — `못 온다고 했어요` → futuro vs pretérito no relato.
- **U007** `l23` — diálogo/gabaritos integrais em 반말 sem nota de registro (e `좋겠어` cobrado em ditado).
- **U008** `l07` — fala isolada em `-ㅂ니다` dentro de diálogo 해요체.
- **U009** `l17-e10`/`l20-e10` — fechos `-ㅂ니다`/`-는 편이 낫습니다` em texto de leitura.
- **U010** `l02-g2` — nota "não aceita ordem na segunda parte" (metalinguagem ambígua).
- **U011** `l03-g2` — nota "forma interrogativa sem o ponto de interrogação final".
- **U012** `l08` — `비싼 대신에` sem `-에` e cobertura N + 대신.
- **U013** `l18-d06` — `-기에` em fala de colegas (registro escrito).
- **U014** `l27-e09` — `대피했어요` sem apoio situacional no diálogo.
