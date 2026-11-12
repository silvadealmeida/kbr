# Vocabulário — esquema de conteúdo

Tipos em `src/content/vocabulary/types.ts`. Conteúdo é dado puro (`content/` sem lógica).

## `VocabEntry`

| Campo | Regra |
|---|---|
| `id` | `ko:<forma de dicionário>`, único e **imutável** (é a chave do cartão do aluno: `v:<id>`). |
| `ko` | Hangul, sem espaços. Forma de dicionário; nada de formas com partícula ou conjugadas. |
| `pt` | Glosa em português; sentidos separados por `; `. Homógrafos (`눈`: olho; neve) são **um** item/cartão; o sentido da frase vem em `contextMeaning`. |
| `pos` | Opcional: substantivo, verbo, pronome, advérbio, interjeição, numeral. |
| `course`, `lesson` | Origem; `lesson` precisa existir no curso (validado). |
| `audioText` | Texto para a voz do navegador. |
| `notes`, `illustration` | Opcionais (nota de gramática/formalidade; referência futura). |
| `review` | `ReviewMeta` (`in-review` até revisão nativa). |

Romanização não é usada.

## `VocabSentence`

`vocabId`, `ko` (frase completa), `pt` (tradução natural da frase inteira), `target` (= `entry.ko`), `contextMeaning` (a dica "Palavra esperada"), `accepted?` (variantes lexicais **registradas**; vazio por padrão), `review`.

Regras validadas: o alvo ocorre **exatamente uma vez** e no **início de uma palavra** (sem lacuna em meio de palavra); tradução e dica não vazias; variantes não podem repetir o alvo nem coincidir com outro item do registro (lacuna ambígua).

## Vocabulário do Hangul (9A-V)

`src/content/vocabulary/hangul.ts` **deriva** os itens de `WORDS` (sem duplicar dados): 148 registros menos 15 excluídos — formas flexionadas/com partícula (`밥을`, `좋아요`, `입니다`…), `십만` e `곬` (tradução ainda a confirmar). Resultado: **133 itens**. Jamo, sílabas e exemplos fonéticos não são vocabulário. O corpus tem **25 frases originais** (`sentences.ts`), todas `in-review`; as demais palavras usam cartão simples.

## Como um curso A1–C2 fornece vocabulário

1. Exportar `VocabEntry[]` (e `VocabSentence[]`) do curso, com `course` igual ao id do curso e `lesson` apontando para uma lição real.
2. Acrescentar o array a `VOCAB_ENTRIES` (e as frases a `VOCAB_SENTENCES`) em `src/content/vocabulary/index.ts` e o curso a `COURSE_LESSON_IDS`.
3. Rodar `npm test`: a validação estrutural acusa ids duplicados, referências inválidas, alvo ausente/duplicado e variantes ambíguas.
4. Opcional: mostrar o resumo da lição com `vocabForLesson(course, lesson)` e o botão "Salvar as N palavras desta lição" (já existe em `/vocabulario` com o filtro de lição). Salvar é sempre ação do aluno.
5. Marcar `review.status: "in-review"` até revisão nativa. Não gerar áudio: a voz do sistema cobre.

## Validação

`validateVocabulary` / `assertVocabulary` e `tests/vocabulary.test.ts` são **estruturais**. Não provam naturalidade, gramática nem tradução; isso depende de falante nativo.
