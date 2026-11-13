# C2 — plano de vocabulário

**Meta de planejamento:** 320 identidades lexicais novas (8 por lição × 40 lições), cada uma com forma de dicionário, classe gramatical, glosa em pt-BR, frase contextual coreana e tradução completa.

## 1. Critérios de seleção

- Léxico avançado-superior adequado a pragmática, estilo, retórica, literatura, síntese crítica e mediação.
- Palavras que aparecem naturalmente nos textos e exercícios da lição; não listas temáticas soltas.
- Formas de dicionário estáveis; verbos e adjetivos recebem `target` conjugado na frase, mas o cartão continua sendo a forma de dicionário.
- Uma identidade por forma coreana. Homógrafos só com `sense` estável e sentido distinto; o C2 evita depender disso.
- Nenhuma forma duplicada de Hangul, A1, A2, B1, B2, C1 ou C2; nenhum ID renomeado.
- Glosas em português brasileiro, não traduções literais do inglês.

## 2. Distribuição

| Módulo | Identidades | Foco |
|---|---:|---|
| 1 | 40 | pragmática, ironia, pressuposição, poder |
| 2 | 40 | voz, estilo, retórica, coloquialidade, jornalismo |
| 3 | 40 | premissa, analogia, reductio, concessão, apelo |
| 4 | 40 | idiomatismo, hanja, colocação, nuance, modalidade |
| 5 | 40 | métodos, viés, conflito, literatura acadêmica, ética |
| 6 | 40 | conto, focalização, símbolo, contexto, crítica |
| 7 | 40 | mediação, deliberação, poder, responsabilidade |
| 8 | 40 | projeto, artigo, defesa, edição, portfólio |
| **Total** | **320** | |

## 3. Reuso

Cada lição retoma ao menos duas identidades anteriores em contexto. O reuso não cria cartão novo: usa o mesmo `ko:<forma>` já registrado. A auditoria `tests/content/reuse-audit.test.ts` verifica que a forma aparece no texto da lição; referências sem ocorrência real são dívida e não devem crescer.

## 4. Formato

`VocabEntry` guarda `id`, `ko`, `pt`, `pos`, `course`, `lesson`, `audioText`, `notes?` e `review`. `VocabSentence` guarda `id`, `vocabId`, `ko`, `pt`, `target`, `contextMeaning`, `accepted?` e `review`.

O cartão SRS continua em `Progress.cards` com chave `v:<id>`. O C2 não cria agenda paralela, não altera o Leitner e não persiste produção aberta.

## 5. Áudio e revisão

O C2 usa o TTS do navegador; não há MP3 novo. A voz do sistema depende do aparelho. O áudio sintetizado do corpus existente não é ampliado por este curso.

Toda forma, glosa, frase e tradução permanece `in-review`. A validação estrutural não prova naturalidade, colocação, registro ou correção. A revisão por falante nativo segue pendente.

## 6. O que não é afirmado

- Que 320 palavras apresentadas equivalem a 320 palavras dominadas.
- Que a lista cobre todo o léxico C2.
- Que a glosa em pt-BR é a única tradução possível.
- Que a frase de exemplo esgota os sentidos da palavra.
- Que o léxico idiomático foi adquirido por ter sido reconhecido em um item.
