# Reexecução dos analisadores após a 12A (2026-11-13)

Os arquivos `particle-findings.json`, `structure-findings.json`, `listen-prompt-findings.json`, `typed-normalization.json`, `vocabulary-findings.json`, `progression-findings.json` e `engine-probe.json` versionados são a **evidência da baseline `3103ce3`** e foram restaurados depois desta reexecução. Os resultados abaixo são a fotografia do HEAD corrigido; não substituem os arquivos originais.

Comandos executados no `main` corrigido:

```bash
npx vitest run --config docs/audits/a0-a2/tools/vitest.config.mts
node docs/audits/a0-a2/tools/analyze-particles.cjs
node docs/audits/a0-a2/tools/analyze-structure.cjs
node docs/audits/a0-a2/tools/analyze-listen-prompts.cjs
node docs/audits/a0-a2/tools/analyze-typed-normalization.cjs
node docs/audits/a0-a2/tools/analyze-vocabulary.cjs
node docs/audits/a0-a2/tools/analyze-progression.cjs
```

## Resultado

| Analisador | Baseline | HEAD 12A | Leitura |
|---|---:|---:|---|
| `analyze-particles` (`wrong`) | 2 | **0** | `언니은` corrigido |
| `analyze-structure` (`findings`) | 2 | **0** | gabarito fora das opções corrigido |
| `analyze-listen-prompts` (`promptsPorFragmento`) | 65 | **0** | enunciados alinhados à frase completa |
| `analyze-typed-normalization` (`exigemPontuacaoIdentica`) | 126 | **0** | variantes de pontuação no A2 |
| `analyze-vocabulary` (`findings`) | 0 | **0** | sem colisão de ID; `surfaceOnlyInSentence` 48 → 51 (formas flexionadas legítimas) |
| `analyze-progression` (`markerOrder`) | 6 | **6** | ver nota abaixo |
| `analyze-progression` (`answerNotTaught`) | 19 | **20** | ver nota abaixo |
| `analyze-progression` (`unknownNoun`) | 86 | **69** | melhora parcial; não é prova de correção |

## O que os 6 avisos de progressão ainda significam

O detector é heurístico e continua vendo `라고` nas **citações diretas** introduzidas para substituir o discurso indireto avaliado (ex.: `민수는 “다음 주에 다시 만나요.”라고 말했어요`). Isso não é o padrão produtivo `-라고 하다` que a auditoria cobrava; é uma citação visível. Os demais avisos são marcadores usados como distratores antes da lição que os declara (`-지만`, `-(으)ㄹ 거예요`, `못/안`) e `-(으)면`/`-(으)로` em A1, que já estavam fora do escopo dos quatro marcos corrigidos. Ficam registrados para a revisão nativa/editorial.

`answerNotTaught` e `unknownNoun` continuam sendo dívida de vocabulário/derivação (ex.: `오천`, `먹은`, `면서`, `입니까`). A 12A não corrigiu esses 20/69 itens em massa; o detalhe está no `correction-ledger.md` §5.

## Limite

Nada aqui é revisão nativa. Os analisadores só provam que certas classes determinísticas deixaram de ocorrer; não provam naturalidade, registro, tradução ou adequação pedagógica.
