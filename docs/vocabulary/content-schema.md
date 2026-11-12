# Vocabulário — esquema de conteúdo

Tipos em `src/content/vocabulary/types.ts`. Conteúdo é dado puro (`content/` sem lógica).

## `VocabEntry`

| Campo | Regra |
|---|---|
| `id` | `ko:<forma de dicionário>`; para sentidos homógrafos separados antes da publicação, `ko:<forma>#<sense>`. Único e **imutável** (é a chave do cartão: `v:<id>`). |
| `ko` | Hangul, sem espaços. Forma de dicionário; nada de formas com partícula ou conjugadas. |
| `pt` | Glosa em português; sentidos separados por `; `. Homógrafos (`눈`: olho; neve) são **um** item/cartão; o sentido da frase vem em `contextMeaning`. |
| `sense` | Opcional. Slug semântico estável (`eye`, `snow` etc.) quando sentidos novos precisam de cartões distintos. Se uma forma tem mais de uma entrada, todas precisam de `sense` único. |
| `pos` | Opcional: substantivo, verbo, pronome, advérbio, interjeição, numeral. |
| `course`, `lesson` | Origem; `lesson` precisa existir no curso (validado). |
| `audioText` | Texto para a voz do navegador. |
| `notes`, `illustration` | Opcionais (nota de gramática/formalidade; referência futura). |
| `review` | `ReviewMeta` (`in-review` até revisão nativa). |

Romanização não é usada.

Política de compatibilidade: IDs amplos já publicados (incluindo homógrafos combinados da 9A-V) não são divididos automaticamente, porque isso fragmentaria cartões existentes. Neles, `contextMeaning` continua desambiguando a frase. Conteúdo novo pode usar sentidos qualificados desde a primeira publicação; dividir um ID legado exige fase de migração explícita.

## `VocabSentence`

`vocabId`, `ko` (frase completa), `pt` (tradução natural da frase inteira), `target` (forma exata ocultada), `contextMeaning` (a dica "Palavra esperada"), `accepted?` (variantes lexicais **registradas**; vazio por padrão), `review`.

O `target` pode ser igual à forma de dicionário (`사과`) ou a forma polida usada no contexto (`일어나요`, `먹어요`); o cartão/identidade continua sendo `vocabId`. Regras validadas: o alvo ocorre **exatamente uma vez** e no **início de uma palavra** (sem lacuna em meio de palavra); tradução e dica não vazias; variantes não podem repetir o alvo nem coincidir com outro item do registro (lacuna ambígua).

## Vocabulário do Hangul (9A-V)

`src/content/vocabulary/hangul.ts` **deriva** os itens de `WORDS` (sem duplicar dados): 148 registros menos 15 excluídos — formas flexionadas/com partícula (`밥을`, `좋아요`, `입니다`…), `십만` e `곬` (tradução ainda a confirmar). Resultado: **133 itens**. Jamo, sílabas e exemplos fonéticos não são vocabulário. O corpus tem **25 frases originais** (`sentences.ts`), todas `in-review`; as demais palavras usam cartão simples.

## Curso A1 integrado

`src/content/vocabulary/a1.ts` fornece as 11 `VocabEntry` e 11 frases de `a1-l01`. `src/content/vocabulary/a1-course.ts` fornece 432 identidades e 432 frases de `a1-l02`–`a1-l40`, com origem `course: "ko-a1"` e a lição correta. `VOCAB_ENTRIES`/`VOCAB_SENTENCES` incluem os dois arrays. Totais atuais: **443 identidades A1**, **443 frases A1**, **468 frases no registro** (25 do Hangul + 443 do A1), **495 identidades distintas ensinadas** no A1 contando 52 reusos do Hangul. Todas as entradas A1 estão `in-review`.

## Curso A2 integrado

`src/content/vocabulary/a2-course.ts` fornece **400 identidades A2** e **400 frases** para `a2-l01`–`a2-l40`, com origem `course: "ko-a2"` e a lição correta. O A2 retoma 115 identidades distintas do A1/Hangul, totalizando 515 identidades ensinadas/retomadas. `COURSE_LESSON_IDS` inclui os 48 passos A2. `VOCAB_ENTRIES`/`VOCAB_SENTENCES` somam **868 frases** (25 do Hangul + 443 do A1 + 400 do A2). Todas as entradas A2 estão `in-review`.

Para um novo curso B1–C2:

1. Exportar `VocabEntry[]` e `VocabSentence[]` do curso, com `course` igual ao id do curso e `lesson` apontando para uma lição real.
2. Acrescentar os arrays a `VOCAB_ENTRIES`/`VOCAB_SENTENCES` em `src/content/vocabulary/index.ts` e registrar os IDs de lição em `COURSE_LESSON_IDS`.
3. Rodar `npm test`: a validação estrutural acusa IDs duplicados, referências inválidas, alvo ausente/duplicado, variantes ambíguas e origens incorretas.
4. Mostrar o resumo com `vocabForLesson(course, lesson)` ou uma lista explícita de IDs. `LessonVocabulary` oferece salvar/remover individual e “Salvar as N palavras”; salvar é sempre ação do aluno.
5. Manter `review.status: "in-review"` até revisão nativa. Não gerar áudio: a voz do sistema cobre.

## Validação

`validateVocabulary` / `assertVocabulary` e `tests/vocabulary.test.ts` são **estruturais**. Não provam naturalidade, gramática nem tradução; isso depende de falante nativo. `target` diferente da forma de dicionário é aceito para verbos/adjetivos, desde que a forma exista na frase e o cartão permaneça único.
