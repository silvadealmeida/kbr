# A1 — plano de vocabulário e prática contextual

## 1. Uma fonte canônica

O A1 reutilizará `VocabEntry` e `VocabSentence` em `src/content/vocabulary`; não haverá registro, página, cartão ou scheduler paralelo. A primeira origem curricular de uma identidade vive em `VocabEntry.course`/`lesson`; reusos posteriores são declarados pelo blueprint da lição e não criam outro item.

Estado do aluno continua em `Progress.cards["v:<vocabId>"]`, com o Leitner existente. Salvar é sempre ação explícita; encontrar uma palavra numa lição não presume que ela foi salva, revisada ou dominada.

## 2. Meta editorial

- 480–560 identidades canônicas ao fim do A1, normalmente 10–14 novas por lição; `a1-l36`–`a1-l40` priorizam consolidação.
- Pelo menos 60% das introduções pertencem a listas de alta frequência/alta utilidade verificadas durante a autoria; frequência nunca substitui adequação ao objetivo comunicativo.
- Auditoria dos 133 itens Hangul antes de cada módulo: meta inicial de reusar 70–100 quando forma e sentido coincidirem. Eles entram como conteúdo da lição mesmo se o aluno nunca os salvou.
- Cada lição revisita ao menos 6 identidades anteriores; checkpoint não introduz vocabulário obrigatório.
- A faixa é decisão KBR, não conversão dos 735 itens do nível 1 coreano nem requisito CEFR.

## 3. Introduzir, revisitar, consolidar

### Introdução

Uma identidade nova só entra quando:

1. é necessária ao objetivo comunicativo;
2. tem forma de dicionário, glosa pt-BR e classe quando aplicável;
3. possui ao menos uma frase contextual original da lição de origem;
4. frase, tradução completa, dica, alvo, áudio e status de revisão cumprem `VocabSentence`;
5. a gramática da frase já foi ensinada ou é o foco explícito da lição;
6. o alvo ocorre uma vez e a lacuna tem uma resposta conservadora não ambígua.

### Reencontro

- primeiro reencontro obrigatório em uma das duas lições seguintes;
- segundo reencontro em outro cenário dentro do módulo ou checkpoint;
- terceiro reencontro após um intervalo de pelo menos um módulo quando a palavra for central;
- reuso produtivo só depois de recepção e prática guiada, salvo fórmula essencial;
- itens errados continuam usando a agenda pessoal do Leitner; o mapa curricular não altera `due`.

### Consolidação

Cada item deve alcançar pelo menos dois contextos originais ao longo do A1: um de introdução e um de transferência. Itens polissêmicos, funcionais ou de alta confusão podem ter 3–4. A meta é cobertura útil, não preencher uma cota com frases artificiais. Se não houver segundo contexto natural no A1, o item é retirado, fundido a outro objetivo ou marcado para A2.

## 4. Identidade, repetição e homógrafos

- mesma forma + mesmo sentido lexical = mesmo `VocabEntry.id`, independentemente de quantas lições a usam;
- flexão, partícula ou registro não geram outra identidade quando são realização do mesmo lexema;
- sentidos claramente diferentes podem receber identidade semântica qualificada no próprio contrato, `ko:<forma>#<sentido-estável>`, com campo `sense`; as duas identidades compartilham `ko`/`target`, mas têm cartões `v:` separados;
- a qualificação só é criada antes da publicação do item e nunca é renomeada depois;
- IDs legados amplos, como homógrafos já combinados na 9A-V, permanecem imutáveis. O A1 usa `contextMeaning` para desambiguar; dividi-los exigiria plano explícito de migração de cartões e está fora da 9A;
- não se cria uma variante aceita que seja outra identidade canônica; variantes são poucas, registradas e linguisticamente equivalentes no contexto.

Essa extensão preserva todos os IDs atuais e o formato `Progress` v1; ela amplia o ID do conteúdo, não o estado persistido.

## 5. Contrato por lição futura

Cada dataset de lição A1 deverá declarar:

- `newVocabularyIds`: primeiras aparições canônicas;
- `reusedVocabularyIds`: identidades existentes praticadas novamente;
- `contextSentenceIds`: frases usadas na lição;
- para cada frase: `vocabId`, coreano completo, tradução pt-BR completa, `target`, `contextMeaning`, variantes conservadoras, texto de áudio (= frase coreana) e `ReviewMeta`;
- estado linguístico `in-review` até falante nativo/revisor identificado;
- ausência de romanização permanente.

`newVocabularyIds` e `reusedVocabularyIds` são referências; os objetos continuam somente no registro canônico. O validador estrutural deve rejeitar referência solta e item simultaneamente novo/reutilizado.

## 6. Fluxo contextual por lição

1. Frase coreana com uma lacuna no começo de palavra.
2. Dica pt-BR do sentido esperado.
3. Tradução completa opcional antes da resposta; abrir ajuda marca o resultado como assistido.
4. Resposta coreana digitada e validação exata após NFC.
5. Feedback com texto/ícone/cor.
6. Frase coreana e tradução completas sempre após responder.
7. Voz coreana do navegador para a frase.
8. Reagendamento no Leitner apenas se a palavra estiver salva; ajuda não avança a caixa.

A frase não deve exigir dedução enciclopédica, aceitar vários sinônimos naturais não cadastrados nem esconder partícula/flexão de forma enganosa. Para gramática recém-introduzida, a estrutura aparece antes em contexto compreensível e a lacuna continua lexical.

## 7. Metas de cobertura

Por lição:

- 10–14 identidades novas (6–10 nas cinco lições integradoras finais);
- 6–12 reusos explícitos;
- ao menos 1 frase por identidade nova na origem;
- 12–20 recuperações contextuais no percurso principal, equilibrando novos e reusados;
- nenhum item com mais de 3 tentativas obrigatórias na mesma sessão;
- checkpoint amostra 30–40% do vocabulário do módulo e itens cumulativos anteriores.

Por módulo:

- 55–70 introduções, exceto o módulo 8 (consolidação);
- 100% com contexto de origem;
- ≥70% com segundo contexto até o checkpoint;
- 100% dos itens centrais com segundo contexto até o fim do curso.

Metas são guardas editoriais, não licença para gerar frases de enchimento. Exceções justificadas entram em nota do módulo.

## 8. Validação e limites

Automação prova unicidade, formato, referências, presença de traduções/dicas, relação alvo/frase e estado de revisão. Revisão humana prova sentido, naturalidade, colocação, nível, tradução, registro e adequação cultural.

Pendências herdadas: relógio do dispositivo influencia remoção/salvamento concorrente; Supabase real não foi verificado; as 25 frases Hangul e os 133 itens legados continuam `in-review`; o painel de vocabulário dentro de uma lição real foi exercitado na 9B, mas tablet/desktop ainda dependem de inspeção visual e de teste em dispositivo físico.

## 9. Estado da 9B — `a1-l01`

- **Novos:** 11 identidades canônicas em `src/content/vocabulary/a1.ts` (`course: "ko-a1"`, `lesson: "a1-l01"`), dentro da faixa de 10–12 do blueprint.
- **Reusados:** 6 formas do Hangul (`감사합니다`, `네`, `사람`, `학생`, `한국`, `씨`), referenciadas sem nova `VocabEntry` e sem cartão pessoal duplicado.
- **Frases:** 11 `VocabSentence` originais, uma por item novo, com tradução completa, alvo canônico, dica de sentido e revisão `in-review`; o reuso usa a frase existente `sent:학생:5` quando adequada.
- **Integração:** `VOCAB_ENTRIES`/`VOCAB_SENTENCES` incluem o array A1; `/vocabulario` mostra “Coreano A1” e permite filtrar por `a1-l01`; a revisão contextual usa o mesmo `buildVocabQueue` e os mesmos cartões `Progress.cards["v:<id>"]`.
- **Opt-in:** nenhuma palavra é salva automaticamente. A conclusão da lição oferece salvar cada palavra ou todas as 17 da lição; salvar/remover não altera a nota da lição nem o progresso do curso.
- **Áudio:** voz coreana do navegador por clique, inclusive no vocabulário; nenhum MP3 novo. A revisão nativa continua pendente.
- **Validação:** o dataset e as frases passam por `validateA1LessonContent`/`validateVocabulary`; testes cobrem cobertura de cada item novo, IDs únicos, reuso do Hangul, frases e opt-in. A validação é estrutural, não prova naturalidade nem tradução.
