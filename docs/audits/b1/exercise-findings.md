# B1 — achados de desenho/avaliação de exercícios (Fase 12B)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Cobre fairness de itens, unicidade de gabarito, coerência enunciado×resposta e higiene de dados dos 615 itens. Severidades em `data/findings.json`; casos linguísticos puros estão em `linguistic-findings.md`.

## CRÍTICO

- **B1-12B-C001 — `b1-l32-e07`**: cloze `것___` + resposta `으로` gera **`것으로`** — após batchim ㄹ a forma é `로`; o aluno que digita a forma correta é marcado errado. O exemplo gramatical da própria lição (module7.ts:67) usa `것으로` corretamente, contradizendo o gabarito. Correção: resposta → `로`. (Mesma classe A1M3-001 da 12A.)
- **B1-12B-C002 — `b1-c03-e07`**: texto de reading quase todo em português (`"A mudança reduziu o custo, mas aumentou o tempo de espera. 따라서…"`) — o item avalia compreensão de português. Reescrita proposta em `correction-proposals.md`.

## MAJOR

### Fairness estrutural
- **B1-12B-M021 — pontuação exata (sistêmico)**: 125/381 itens digitados (32,8%) só aceitam a forma **com** pontuação final exata; o builder B1 (`lessons/shared.ts`) não aplica `terminalPunctuationVariants` (a 12A aplicou só no builder A2; `punctuation.ts`/engine não normaliza). Em 1 item a instrução agrava: `b1-l37-e08` aceita literalmente só as duas strings com/sem vírgula.
- **B1-12B-M021 — enunciado×unidade de resposta (sistêmico)**: 131/132 `listen` nunca dizem "escreva a frase completa" e **12** pedem explicitamente um constituinte ("escreva o pedido", "a condição") enquanto o gabarito é a frase inteira. A 12A alinhara 188 ocorrências em A1/A2; B1 herdou o padrão pré-12A.
- **B1-12B-M017 — `b1-l18-e07` (cloze)**: lacuna `높___` aceita só `기에`, mas `높아서` é coreano igualmente correto no enunciado dado ("Complete o motivo:") — enunciado não nomeia o alvo (contraste: clozes de l16/l17 nomeiam). Correção: nomear `-기에` no enunciado ou aceitar `아서`.
- **B1-12B-M018 — `b1-c03-e13` (mcq)**: "Qual frase expressa opinião pessoal?" com três opções que **todas** expressam opinião pessoal (só diferem em tempo). Gabarito não defensável. Correção: perguntar o que de fato distingue (marca `-다고 생각해요` ou tempo).
- **B1-12B-M019 — `b1-c02-e04`/`b1-c08-e17`**: prompt "Penso em mudar de casa…" (plano aberto) aceita `다음 달에 이사할 예정이에요.` — variante que a **própria l06** define como plano confirmado e cujo mcq irmão (c02-e13) cobra a distinção. Remover a variante dos dois itens.
- **B1-12B-M020 — `b1-c05-e05`**: aceita `지킬 의무가 있어요` para o alvo `-아/어야 할 의무가 있다` (l25) — coreano legítimo, mas dilui o construto medido. Restringir ao padrão ensinado.

### Higiene de dados
- **B1-12B-M022 — `reusedIds`**: 65/164 (39,6%) referências de retomada lexical sem ocorrência na superfície da lição (varredura conservadora `findUnusedReusedRefs`, mesma da 12A). Nunca medido para B1; a 12A congelou só A1/A2 (297).
- **B1-12B-M023 — `acceptedAnswers` redundantes**: exatamente 3 — `b1-l32-e05`, `b1-l35-e05`, `b1-c01-e25` (a dívida "3 do B1" da 12A, agora medida). `b1/validate-content.ts` roda com `checkRedundantAccepted:false`.

## MINOR (item-level)

- **N007** — `b1-l02-e05`: prompt "começou a chover" × gabarito `비가 왔어요` (desalinhamento aspectual defensível; variante `오기 시작했어요` não aceita).
- **N014** — 6 explanations de reading citam paráfrase/truncamento em vez de substring do texto (`l21-e04, l28-e10, l29-e10, l32-e04, l37-e04, l38-e10`): o aluno não localiza a "prova".
- **N022** — `b1-l21-e06` aceita "famílias" para `가구` (censitário: domicílios) — glosa larga em variante.
- **N005** — `b1-l10-e09`: aceita frase pt com deslize de pessoa ("eu precisava… não teve como").
- Confirmados OK por varredura: 132/132 `audioText == answer`; 0 gabaritos de mcq fora das opções; 0 lacunas vazias; distribuição de tipos nos checkpoints coerente com o blueprint (c01–c07 = 25 itens; c08 = 40).

## Rejeições (falsos positivos — não entraram no ledger)

1. **Alegações de revisores sem existência na fonte** (rejeitadas por grep): `두어 명` em l31; `stagioni` em b1-m05 (linha 12 é `ko:변화`); cloze `말___에` em "c05-e15"; `"O serviço é totalmente comunitário"`; `"como o que ocorreu no ano passado"`; `vocês→todos` em "l25-e04"; typo `encarregar`.
2. **Modelo de escopo errado**: um revisor tratou cada checkpoint como cobertura exclusiva do módulo correspondente (c05 = m05 apenas) e reportou ~30 "carga futura" espúrias — retriadas contra o blueprint cumulativo; as válidas viraram M008/M009/N021.
3. **Analisador de partículas**: os 5 hits automáticos são falsos positivos de segmentação (`적는`←적다, `나은`←낫다, `나이 든`, `국가+차`, `말___→이라고` inexistente) — 0 achados reais de partícula; coberto pelos críticos C001 e M004.
4. **Ferramenta de progressão (bug próprio, corrigido e documentado)**: a 1ª versão do `analyze-progression.cjs` perdia todas as formas com batchim em NFC (`할 때`, `좋은 대신`…) e contava "~8" ocorrências de `-(으)ㄹ 때`. Após correção com classes de sílabas geradas: **28** (M012). Nenhum achado entrou no ledger sem leitura da fonte; a correção só aumentou cobertura, não mudou vereditos.
