# Currículo de Hangul — Fase 3A

**Status:** especificação pedagógica concluída; conteúdo ainda não implementado.
**Escopo:** arquitetura curricular, sequência de ensino, exemplos e critérios de domínio do módulo Hangul.
**Público:** agentes de código que implementarão a Fase 3B e revisores humanos de coreano.
**Versão:** 1.0 (novembro de 2026).

Este documento não substitui `docs/research.md`, `docs/architecture.md` nem `docs/roadmap.md`. Ele transforma a pesquisa já registrada em uma sequência implementável. Todo o conteúdo coreano abaixo é original, criado para o KBR; não foi copiado de cursos, livros, aplicativos ou bancos de exercícios.

---

## 1. Objetivo do módulo

Ao final da Fase 3, a pessoa deve conseguir:

1. Reconhecer e produzir os 19 consonantes e as 21 vogais do Hangul moderno.
2. Entender que letras não são lidas em fila, mas agrupadas em blocos silábicos.
3. Montar e decompor sílabas com e sem batchim.
4. Ler em voz alta palavras coreanas comuns sem romanização.
5. Reconhecer os sete sons representativos de batchim e as principais regras de ligação, nasalização e aspiração.
6. Ler frases curtas de um repertório controlado, com apoio de áudio quando disponível.
7. Manter uma rotina de revisão espaçada com cartões de jamo, sílaba e palavra.

O módulo ensina **leitura e reconhecimento**. Não certifica pronúncia nativa, não avalia fala por reconhecimento automático e não substitui um professor. Produção oral é praticada com automonitoria e áudio modelo.

### 1.1 Fora de escopo

- Vocabulário sistemático, gramática, diálogos e números.
- Escrita à mão com avaliação de traço. A ordem de traços é praticada como familiarização; a avaliação é por sequência de toques, não por desenho livre.
- Reconhecimento de fala, correção de pronúncia por microfone ou pontuação de sotaque.
- Transcrição fonética obrigatória pelo aluno.
- Romanização como muleta permanente.
- Conteúdo de nível intermediário ou TOPIK.

---

## 2. Pesquisa, benchmark e decisão de design

A tabela separa o que tem suporte de pesquisa do que é escolha do KBR. Nenhuma escolha abaixo foi validada por especialista em ensino de coreano; a revisão humana está pendente (ver §12).

| Afirmação | Origem | Como o currículo usa |
|---|---|---|
| Recuperar informação da memória produz retenção melhor do que reler. | Roediger & Karpicke (2006), pesquisa experimental com estudantes universitários. | Cada lição termina com recuperação ativa; nenhuma lição é só exposição. |
| Distribuir a prática no tempo produz retenção melhor do que concentrar tudo em uma sessão. | Cepeda et al. (2006), meta-análise. | Revisão espaçada entra desde a primeira lição; checkpoints reativam conteúdo antigo. |
| Intercalar tipos de problema tem efeito moderado e depende do material. | Dunlosky et al. (2013), revisão de eficácia de técnicas de estudo. | Prática mistura reconhecimento, escuta, montagem e leitura, mas só depois de cada formato ter sido ensinado isoladamente. |
| Cursos de coreano organizam o Hangul em poucas semanas e depois avançam para uso comunicativo. | Benchmark: currículo de 6 níveis do King Sejong Institute (KSI). | O KBR concentra o alfabeto em 25 micro-lições e não o dilui em um curso inteiro. |
| O sistema de escrita coreano foi projetado para representar sons com letras compostas a partir de poucos traços. | Fonte primária: National Institute of Korean Language (NIKL), princípios do Hunminjeongeum. | A sequência ensina primeiro as formas básicas e depois as derivações, em vez de alfabeto fora de ordem. |
| Repetição espaçada com cartões é um método consolidado de estudo. | Manual do Anki; literatura de SRS. | O KBR reutiliza o agendador Leitner já existente, sem prometer eficácia clínica. |
| Um ciclo de exposição passiva seguido de produção ativa ajuda a consolidar padrões. | Inspiração no método Assimil; não é evidência forte nem foi testado no KBR. | As lições têm uma fase de contato e outra de produção; isso é decisão de design, não achado científico. |

### 2.1 Decisões de design (hipóteses, não fatos)

Estas escolhas precisam de teste com usuários reais:

- Micro-lições de 5–8 minutos reduzem abandono em comparação com lições de 20 minutos.
- Ensinar batchim depois de todas as vogais reduz carga cognitiva.
- Adiar regras de sandhi para a última unidade evita que a pessoa decore exceções antes de ler o básico.
- Uma única romanização temporária, removida até `h16`, acelera as primeiras semanas sem criar dependência.
- Cartões de sílaba inteira (`가`) e de palavra (`고기`) além de jamo isolado melhoram a leitura.
- Checkpoints a cada 5–6 lições detectam lacunas antes de avançar.

### 2.2 O que o currículo evita por falta de evidência

- Prometer “método científico” ou “pronúncia perfeita”.
- Afirmar que um número fixo de repetições garante domínio.
- Usar “aprendizagem significativa”, “multissensorial” ou “gamificação” como se fossem achados consolidados.
- Tratar TTS como professor de pronúncia.
- Declarar conteúdo revisado sem revisor identificado.

---

## 3. Princípios pedagógicos operacionais

1. **Uma novidade por vez.** Cada lição introduz no máximo 5 letras novas, ou 1 família de regras. Quando precisa de mais, divide.
2. **Contraste antes de isolamento.** Depois de apresentar dois sons, a prática pede escolha entre eles. Letra isolada sem contraste vira desenho.
3. **Leitura desde a primeira lição.** `h02` já forma sílabas e palavras com ㅇ + vogais; não há fase de “decorar o alfabeto”.
4. **Áudio antes de texto quando o objetivo é som.** Em exercícios de escuta, o botão de áudio é o enunciado principal; o texto coreano fica oculto até a resposta.
5. **Sem romanização após `h15`.** Até lá, ela aparece como apoio discreto e nunca como resposta correta. A partir de `h16`, o enunciado usa IPA descritivo, áudio ou instrução em pt-BR, não RR.
6. **Feedback que explica.** Erro de som recebe explicação articulatória curta; erro de forma recebe decomposição em jamo.
7. **Recuperação cumulativa.** Todo checkpoint e toda lição ímpar incluem 2–4 itens de lições anteriores.
8. **Prática distribuída.** O SRS agenda jamo, sílaba e palavra em cartões separados; não se revisa só o que apareceu na lição do dia.
9. **Domínio observável.** “Concluído” significa acertar os itens-alvo sem dica, não apenas abrir a lição.
10. **Erro produtivo.** Distratores exploram erros previsíveis de brasileiros (ver `pronunciation-ptbr.md`), não aleatoriedade.

---

## 4. Estrutura geral

**25 micro-lições + 4 checkpoints, organizados em 7 unidades.**

| Unidade | Tema | Lições | Checkpoint | Novos jamo | Foco |
|---|---|---|---|---|---|
| U1 | O alfabeto que se explicava | `h01` | — | 0 | história, princípio, bloco silábico |
| U2 | Primeiras vogais | `h02`–`h03` | — | 6 vogais + ㅇ | ㅏㅓㅗㅜㅡㅣ, sílaba CV |
| U3 | Consoantes básicas | `h04`–`h08` | — | 14 consoantes | ㄱㄴㄷㄹㅁㅂㅅㅈㅋㅌㅍㅊㅎ |
| U4 | Consoantes tensas | `h09`–`h10` | `c1` | 5 tensas | ㄲㄸㅃㅆㅉ e contraste de 3 vias |
| U5 | Todas as vogais | `h11`–`h15` | `c2` | 15 vogais | iotizadas, ㅐㅔ, ditongos, ㅢ |
| U6 | Sílabas e batchim | `h16`–`h20` | `c3` | 0 letras; 16 finais simples + 11 duplos | batchim, som representativo |
| U7 | Ler em contexto | `h21`–`h25` | `c4` | 0 letras; 3 regras | ligação, nasalização, aspiração, leitura |

### 4.1 Carga semanal sugerida

O app não impõe calendário. A recomendação padrão é **1 lição por dia útil**, com revisão SRS nos outros dias, totalizando 5–6 semanas. A pessoa pode fazer 2 lições em um dia; o app não deve liberar a próxima sem concluir a anterior.

### 4.2 Contagem de jamo

- **19 consoantes iniciais:** ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ.
- **21 vogais:** ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ.
- **28 possibilidades de coda:** ausência de batchim + 16 finais simples + 11 duplos (ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ). As grafias consonantais somam 27. Os 16 simples são ㄱ ㄲ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅆ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ.
- **Cobertura:** todas as 19 iniciais até `h10`; todas as 21 vogais até `h15`; todos os 16 finais simples até `h19`; todos os 11 duplos em `h20`.

### 4.3 Convenções dos IDs

- Lição: `h01` … `h25`, sempre dois dígitos.
- Checkpoint: `c1` … `c4`.
- Exercício: `h07-e03` (lição + sequência), checkpoint `c2-e11`.
- Cartão SRS: `h:jamo:c:ㄱ`, `h:jamo:v:ㅏ`, `h:syl:가`, `h:word:고기`, `h:rule:liaison`.
- Prefixos de conteúdo: `jamo-`, `syl-`, `word-`, `rule-`, `lesson-`.

### 4.4 Estados de conteúdo

Todo item pedagógico carrega `reviewStatus`:

- `draft`: escrito, sem checagem interna.
- `in-review`: passou por checagem automática e aguarda falante nativo/professor. **Estado inicial de tudo nesta fase.**
- `reviewed`: revisado por humano identificado, com data. Nenhum item deve chegar aqui sem registro.

Nenhum texto deste documento deve ser exibido como “revisado” enquanto o status for `in-review`.

---

## 5. Progressão e regras de liberação

1. A lição `h01` é aberta por padrão.
2. A lição seguinte libera quando a anterior atinge **80% de acertos nos itens-alvo** e conclui todos os itens obrigatórios.
3. Checkpoints liberam quando todas as lições da unidade estão concluídas.
4. Checkpoint exige **80%** para avançar. Abaixo disso, o app recomenda revisar as lições indicadas pelo diagnóstico, mas não bloqueia para sempre: permite nova tentativa após a revisão.
5. Itens errados entram na fila SRS com caixa 1, independentemente do acerto geral.
6. Uma lição pode ser refeita; o progresso guarda o maior score, não o último.
7. O app não usa streak como bloqueio. Streak é motivação, não pré-requisito.

### 5.1 Critério de “lição concluída”

- Todos os exercícios obrigatórios respondidos.
- Pelo menos 80% de acerto no conjunto-alvo (jamo/sílabas/regras novos).
- Nenhum erro não corrigido nos itens de contraste recém-ensinados. Se errar um par mínimo, o item reaparece uma vez na mesma sessão.

---

## 6. Lições

A seguir, cada lição traz objetivo, pré-requisito, conteúdo novo, exemplos, pronúncia/armadilhas, prática e critério de conclusão. Os exemplos usam **somente jamo já ensinados** naquela lição, salvo indicação explícita de “item de escuta com áudio” (que pode conter som ainda não lido). Nomes de letras não contam como leitura.

> **Nota sobre exemplos:** palavras como `히터` e `웨이터` são empréstimos e existem para praticar sons; não entram no vocabulário avaliado. Palavras raras em `h20` existem só para cobrir finais duplos e devem ser marcadas como “item de sistema”, não como vocabulário.

---

## 7. Unidade 1 — O alfabeto que se explicava

### `h01` — Um alfabeto desenhado a partir da boca

**Objetivo:** entender que o Hangul é um sistema de escrita com princípio de construção, que letras se agrupam em blocos e que a leitura segue blocos, não uma fila de letras.

**Pré-requisitos:** nenhum.

**Conteúdo novo:** nenhum jamo avaliado. Conceitos: bloco silábico, posição inicial/medial/final, direção de leitura, diferença entre letra e sílaba, origem histórica (Hunminjeongeum, 1443–1446).

**Exemplos visuais:** `한글` (2 blocos), `서울` (2 blocos), `사람` (2 blocos). O aluno não precisa lê-los; deve contar blocos e identificar que cada bloco é uma sílaba.

**Pronúncia e armadilhas:**
- Hangul não é “alfabeto silábico” como o japonês; é alfabeto com blocos silábicos.
- O bloco não é lido da esquerda para a direita como uma palavra latina: a ordem interna depende do formato (C+V, C+V+C, C+V+V).
- Coreano moderno se escreve com espaços entre palavras; a unidade visual é o bloco, não a palavra.

**Prática (6 itens):**
1. Contar blocos em `한글`, `한국어`, `사랑`.
2. Verdadeiro/falso: “cada bloco coreano equivale a uma sílaba”.
3. Verdadeiro/falso: “o Hangul foi criado para ser difícil de aprender”.
4. Associar imagem de bloco à posição inicial/medial/final (sem nomear jamo).
5. Ordenar uma linha do tempo curta: antes do Hangul → criação → uso moderno.
6. Escolher a afirmação correta sobre o princípio de desenho das letras.

**Critério de conclusão:** 5/6, com acerto obrigatório no item 1 e no item 2.

**Nota de conteúdo:** a história é apresentada em 3–4 frases, sem detalhes dinásticos que não serão usados. Não afirmar que o Hangul “é o alfabeto mais científico do mundo”; explicar o princípio e deixar a avaliação para o leitor.

---

## 8. Unidade 2 — Primeiras vogais

### `h02` — ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo

**Objetivo:** ler e produzir sílabas com as quatro vogais mais comuns e entender o ㅇ inicial como marcador de lugar sem som.

**Pré-requisitos:** `h01`.

**Conteúdo novo:** ㅏ, ㅓ, ㅗ, ㅜ, ㅇ (inicial).

**Exemplos:** 아, 어, 오, 우, 아우.

**Pronúncia e armadilhas:**
- ㅏ = [a], próximo do “a” de “casa”.
- ㅓ = [ʌ] ~ [ə]; **não** é o “ó” de “avó”. A boca fica mais aberta e a língua recuada; não arredonde os lábios.
- ㅗ = [o], com lábios arredondados, como “ô” de “avô”.
- ㅜ = [u], como “u” de “uva”, mas sem prolongar.
- ㅇ inicial não tem som. Ele existe para que a sílaba tenha a forma C+V. Em `아`, lê-se só [a].
- Evitar inserir um “g” ou “h” antes da vogal: `아` não é “ga” nem “ha”.

**Prática (10 itens):**
1. Ouvir `아` e escolher entre `아/어`.
2. Ouvir `오` e escolher entre `오/우`.
3. Ver `어` e escolher o áudio correto (2 opções).
4. Ver `우` e escolher o áudio correto.
5. Montar `아` com ㅇ + ㅏ.
6. Montar `오` com ㅇ + ㅗ.
7. Contraste ㅏ/ㅓ com pares `아/어`.
8. Contraste ㅗ/ㅜ com pares `오/우`.
9. Ler `아우` (2 sílabas) escolhendo a decomposição correta.
10. Ditar (por áudio) uma das quatro sílabas.

**Critério de conclusão:** 8/10; se errar ㅓ ou ㅜ, repetir o item de contraste uma vez.

---

### `h03` — ㅡ ㅣ e as seis vogais básicas

**Objetivo:** completar o conjunto de vogais simples e ler as primeiras palavras reais.

**Pré-requisitos:** `h02`.

**Conteúdo novo:** ㅡ, ㅣ.

**Exemplos:** 이, 아이, 오이, 으.

**Pronúncia e armadilhas:**
- ㅡ = [ɯ], vogal central-alta não arredondada. Não é “u”; para brasileiros, é o som entre “i” e “u” com lábios esticados. Não arredonde os lábios.
- ㅣ = [i], como “i” de “ilha”.
- `이` pode significar “este” ou “dente”; contexto resolve. Não ensinar vocabulário agora, só leitura.
- `아이` = criança; `오이` = pepino. São palavras reais e curtas, adequadas para a primeira leitura.
- Evitar transformar ㅡ em “u” por interferência do português; o par ㅡ/ㅜ é um dos erros mais persistentes.

**Prática (10 itens):**
1. Ouvir e distinguir ㅡ/ㅜ.
2. Ouvir e distinguir ㅓ/ㅗ.
3. Ler `이` e escolher a decomposição.
4. Ler `아이` e contar sílabas.
5. Montar `으` com ㅇ + ㅡ.
6. Montar `이` com ㅇ + ㅣ.
7. Associar `오이` ao áudio.
8. Associar `아이` ao áudio.
9. Completar a sequência de vogais ㅏ ㅓ ㅗ ㅜ __ __.
10. Revisão: escolher a sílaba correta para o áudio entre as seis vogais.

**Critério de conclusão:** 8/10, com pelo menos 1 acerto em ㅡ e 1 em ㅣ.

---

## 9. Unidade 3 — Consoantes básicas

A ordem não segue o alfabeto coreano tradicional (ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ). Ela agrupa consoantes por **lugar e modo de articulação** e introduz primeiro as que formam palavras úteis com as vogais já conhecidas.

### `h04` — ㄱ e ㄴ

**Objetivo:** ler sílabas e palavras com ㄱ e ㄴ nas posições inicial e medial.

**Pré-requisitos:** `h02`–`h03`.

**Conteúdo novo:** ㄱ, ㄴ.

**Exemplos:** 나, 너, 고기, 가구.

**Pronúncia e armadilhas:**
- ㄱ inicial é uma oclusiva velar surda, levemente aspirada em início de palavra; entre vogais sonoriza para [ɡ]. `가구` tem [k] no primeiro ㄱ e [ɡ] no segundo.
- ㄴ é [n], como “n” de “nada”. Não nasalize a vogal seguinte.
- ㄱ não é o “g” forte do português “gato” em todas as posições; no início, é mais leve.
- Evitar inserir vogal entre consoante e vogal: `나` é [na], não “na-a”.

**Prática (10 itens):**
1. Distinguir `나/너` por áudio.
2. Distinguir `고/구` por áudio.
3. Ler `고기` e escolher a decomposição em blocos.
4. Ler `가구` e identificar as sílabas.
5. Montar `나` (ㄴ + ㅏ).
6. Montar `고` (ㄱ + ㅗ).
7. Completar `가__` com a sílaba que forma “móveis”.
8. Associar `너` ao significado “você”.
9. Associar `나` ao significado “eu”.
10. Revisão de vogais com ㄱ/ㄴ.

**Critério de conclusão:** 8/10.

---

### `h05` — ㄷ ㄹ ㅁ

**Objetivo:** ler palavras com ㄷ, ㄹ e ㅁ; introduzir o ㄹ de início de sílaba como tepe.

**Pré-requisitos:** `h04`.

**Conteúdo novo:** ㄷ, ㄹ, ㅁ.

**Exemplos:** 다리, 머리, 나라, 어머니, 도로.

**Pronúncia e armadilhas:**
- ㄷ inicial [t], entre vogais [d]. Antes de ㅣ, **não** vira “dj” como no português “dia”. `디` é [ti]/[di], não “dji”.
- ㄹ inicial é um tepe [ɾ], semelhante ao “r” de “caro” em português brasileiro, mas mais leve. Não é o “rr” de “carro” nem o “l” de “lua”.
- ㅁ é [m], como “m” de “mão”.
- `어머니` tem três sílabas e um ㄹ? Não: 어-머-니. O ㄹ aparece em `다리`, `나라`, `도로`.
- Cuidado com a vogal epentética: `다리` tem duas sílabas, não “da-ri” com vogal extra.

**Prática (10 itens):**
1. Ouvir `다리` e escolher entre `다리/달리` (a segunda não existe como palavra comum; usar como distrator de forma).
2. Distinguir `머/모` por áudio.
3. Distinguir `라/나` por áudio.
4. Ler `나라` e escolher a tradução “país”.
5. Ler `어머니` e contar sílabas.
6. Montar `머` (ㅁ + ㅓ).
7. Montar `도` (ㄷ + ㅗ).
8. Completar `다__` para formar “ponte/perna”.
9. Associar `머리` a “cabeça”.
10. Revisão cumulativa com ㄱ/ㄴ/ㄷ/ㄹ/ㅁ.

**Critério de conclusão:** 8/10, com acerto em pelo menos um item de ㄹ.

---

### `h06` — ㅂ ㅅ ㅈ

**Objetivo:** ler palavras com ㅂ, ㅅ e ㅈ e corrigir as três interferências mais fortes do português.

**Pré-requisitos:** `h05`.

**Conteúdo novo:** ㅂ, ㅅ, ㅈ.

**Exemplos:** 바다, 사자, 지도, 부모, 아버지, 주소.

**Pronúncia e armadilhas:**
- ㅂ inicial [p], entre vogais [b]. Não é o “b” explosivo do português em todas as posições.
- ㅅ é [s] ou [ɕ] diante de ㅣ/ㅑ/ㅕ/ㅛ/ㅠ; **nunca** [z] entre vogais. `사자` tem [s] nas duas sílabas, não “saza”.
- ㅈ é uma africada alveolo-palatal [tɕ] surda no início e [dʑ] entre vozes. **Não** é o “j” de “janela” [ʒ]. `지도` começa com um som próximo de “tch”, mas sem a oclusão forte do “tch” português.
- `아버지` = pai; `부모` = pais (em geral). Não confundir com `어머니`.
- Evitar “dj” para ㅈ antes de ㅣ: `지` não é “dji”.

**Prática (10 itens):**
1. Ouvir `바/파`? ㅍ ainda não ensinado; usar `바/마`.
2. Distinguir `사/자` por áudio.
3. Distinguir `지/치`? ㅊ ainda não ensinado; usar `지/시`.
4. Ler `바다` e escolher “mar”.
5. Ler `사자` e escolher “leão”.
6. Ler `지도` e escolher “mapa”.
7. Montar `부` (ㅂ + ㅜ).
8. Montar `지` (ㅈ + ㅣ).
9. Completar `아버__` para “pai”.
10. Revisão cumulativa de consoantes.

**Critério de conclusão:** 8/10, com acerto obrigatório no item 2 (ㅅ sem [z]) e no item 3 (ㅈ sem “j”).

---

### `h07` — ㅋ ㅌ ㅍ ㅊ

**Objetivo:** ler as quatro consoantes aspiradas e contrastá-las com as simples correspondentes.

**Pré-requisitos:** `h06`.

**Conteúdo novo:** ㅋ, ㅌ, ㅍ, ㅊ.

**Exemplos:** 코, 피, 차, 커피, 포도, 치마, 타조.

**Pronúncia e armadilhas:**
- As aspiradas têm uma explosão de ar forte: ㅋ [kʰ], ㅌ [tʰ], ㅍ [pʰ], ㅊ [tɕʰ].
- ㅊ **não** é o “ch” de “chave” [ʃ]. É uma africada: língua no céu da boca, soltura com ar. Aproximação para brasileiros: “tch” seco, sem a fricção longa.
- ㅋ/ㅌ/ㅍ não são apenas “versões mais fortes” de ㄱ/ㄷ/ㅂ; a aspiração é um traço distintivo. `코` (nariz) e `고` (nome de sílaba) são diferentes.
- Evitar aspirar demais a ponto de criar uma vogal extra: `코` é uma sílaba, [kʰo].
- `커피` é empréstimo; serve para praticar ㅋ e ㅍ.

**Prática (12 itens):**
1. Distinguir `고/코` por áudio.
2. Distinguir `다/타` por áudio.
3. Distinguir `바/파` por áudio.
4. Distinguir `자/차` por áudio.
5. Ler `코` e escolher “nariz”.
6. Ler `피` e escolher “sangue”.
7. Ler `차` e escolher “chá/carro” (contexto).
8. Ler `포도` e escolher “uva”.
9. Ler `치마` e escolher “saia”.
10. Montar `커` (ㅋ + ㅓ).
11. Montar `피` (ㅍ + ㅣ).
12. Revisão de aspiração com 4 pares.

**Critério de conclusão:** 9/12, com pelo menos 3 dos 4 pares de aspiração corretos.

---

### `h08` — ㅎ e revisão das 14 consoantes básicas

**Objetivo:** ler ㅎ e consolidar todas as consoantes simples antes das tensas.

**Pré-requisitos:** `h04`–`h07`.

**Conteúdo novo:** ㅎ.

**Exemplos:** 호수, 하마, 허리, 히터.

**Pronúncia e armadilhas:**
- ㅎ é [h] em início de sílaba, mais suave que o “rr” carioca e sem vibração. Entre vogais, pode ser [ɦ] ou cair; em `히터`, é [h].
- ㅎ **não** é o “r” de “rato” nem o “rr” de “carro”. Não há vibração da língua nem fricção uvular.
- `히터` é empréstimo de “heater”; `호수` = lago, `하마` = hipopótamo, `허리` = cintura.
- O ㅎ será retomado em `h23` (aspiração); aqui só se ensina o som básico.

**Prática (14 itens):**
1. Ouvir `하/아` e distinguir presença de ㅎ.
2. Ler `호수` e escolher “lago”.
3. Ler `하마` e escolher “hipopótamo”.
4. Ler `허리` e escolher “cintura”.
5. Montar `히` (ㅎ + ㅣ).
6. Completar a tabela das 14 consoantes simples.
7. Distinguir ㄱ/ㅋ.
8. Distinguir ㄷ/ㅌ.
9. Distinguir ㅂ/ㅍ.
10. Distinguir ㅈ/ㅊ.
11. Distinguir ㅅ/ㅆ? Ainda não; usar ㅅ/ㅈ.
12. Ler uma palavra nova com ㅎ e vogal já vista.
13. Revisão de ㄴ/ㅁ.
14. Revisão de ㄹ.

**Critério de conclusão:** 11/14. Quem errar ㅎ em mais de um item recebe uma explicação extra antes de seguir.

---

## 10. Unidade 4 — Consoantes tensas

### `h09` — ㄲ ㄸ ㅃ

**Objetivo:** produzir e reconhecer as tensas bilabial, alveolar e velar, contrastando com simples e aspiradas.

**Pré-requisitos:** `h04`–`h08`.

**Conteúdo novo:** ㄲ, ㄸ, ㅃ.

**Exemplos:** 까치, 또, 아빠, 꼬리, 뿌리, 따로.

**Pronúncia e armadilhas:**
- As tensas são produzidas com mais tensão muscular e sem soltura de ar. A glote fica fechada; a impressão é de som “seco” e mais agudo.
- ㄲ não é “k” dobrado nem “g” forte. `까` é diferente de `가` e de `카`.
- ㄸ não é “t” dobrado. `따` é diferente de `다` e de `타`.
- ㅃ não é “p” dobrado. `빠` é diferente de `바` e de `파`.
- Brasileiros tendem a transformar tensas em simples ou em aspiradas; o contraste de 3 vias precisa de prática auditiva antes de produção.
- `아빠` = papai; `또` = de novo; `까치` = pega (ave); `꼬리` = rabo; `뿌리` = raiz; `따로` = separadamente.

**Prática (12 itens):**
1. Distinguir `가/까` por áudio.
2. Distinguir `다/따` por áudio.
3. Distinguir `바/빠` por áudio.
4. Distinguir `까/카` por áudio.
5. Distinguir `따/타` por áudio.
6. Distinguir `빠/파` por áudio.
7. Ler `아빠` e escolher “papai”.
8. Ler `또` e escolher “de novo”.
9. Ler `꼬리` e escolher “rabo”.
10. Montar `까` (ㄲ + ㅏ).
11. Montar `뿌` (ㅃ + ㅜ).
12. Revisão de vogais com tensas.

**Critério de conclusão:** 9/12, com pelo menos 4 dos 6 contrastes corretos.

---

### `h10` — ㅆ ㅉ e o contraste de três vias

**Objetivo:** completar as cinco tensas e sistematizar o contraste simples/aspirada/tensa.

**Pré-requisitos:** `h09`.

**Conteúdo novo:** ㅆ, ㅉ.

**Exemplos:** 싸다, 짜다, 쓰다, 아저씨, 씨.

**Pronúncia e armadilhas:**
- ㅆ é [s͈], uma fricativa alveolar tensa. Não é [z] nem “ss” longo. `싸다` = ser barato; `쓰다` = escrever ou ser amargo.
- ㅉ é [t͈ɕ], africada tensa. Não é “dj” nem “tch” aspirado. `짜다` = ser salgado.
- `아저씨` = senhor; `씨` = semente ou sufixo de tratamento. O ㅆ final de `씨` é tenso, mas a sílaba é curta.
- O contraste de 3 vias é: simples (ㄱ) × aspirada (ㅋ) × tensa (ㄲ). O mesmo vale para ㄷ/ㅌ/ㄸ, ㅂ/ㅍ/ㅃ, ㅈ/ㅊ/ㅉ, ㅅ/ㅆ (sem aspirada).
- Não ensinar a regra de tensificação de consoantes finais aqui; ela aparece só como fenômeno de escuta em `h20`.

**Prática (14 itens):**
1. Distinguir `사/싸` por áudio.
2. Distinguir `자/짜` por áudio.
3. Distinguir `자/차/짜` por áudio.
4. Distinguir `가/카/까` por áudio.
5. Distinguir `다/타/따` por áudio.
6. Distinguir `바/파/빠` por áudio.
7. Ler `싸다` e escolher “barato”.
8. Ler `짜다` e escolher “salgado”.
9. Ler `쓰다` e escolher “escrever”.
10. Ler `아저씨` e escolher “senhor”.
11. Montar `싸` (ㅆ + ㅏ).
12. Montar `짜` (ㅉ + ㅏ).
13. Revisão de ㅆ em posição inicial.
14. Revisão cumulativa de todas as consoantes.

**Critério de conclusão:** 11/14, com pelo menos 1 acerto em cada um dos 5 contrastes de 3 vias.

---

### `c1` — Checkpoint 1: consoantes e primeiras vogais

**Escopo:** `h01`–`h10`. 6 vogais, 19 consoantes, sílabas CV sem batchim, leitura de palavras usuais.

**Formato:** 20 itens, 15–20 minutos.

| Bloco | Itens | O que avalia |
|---|---|---|
| Reconhecimento de jamo | 4 | ouvir/ver e identificar letra |
| Contraste de 3 vias | 4 | ㄱ/ㅋ/ㄲ, ㄷ/ㅌ/ㄸ, ㅂ/ㅍ/ㅃ, ㅈ/ㅊ/ㅉ |
| Leitura de palavra | 6 | palavra + escolha de significado ou áudio |
| Montagem de sílaba | 3 | compor com jamo dado |
| Compreensão de bloco | 3 | contar sílabas, identificar posição, ordem |

**Aprovação:** 16/20 (80%). Erros em contraste de 3 vias geram revisão obrigatória de `h09`–`h10`; erros de leitura geram cartões SRS dos jamo envolvidos.

**Observação:** o checkpoint não introduz conteúdo. Se a pessoa errar por falta de vocabulário, o item está mal construído; o alvo é leitura, não tradução decorada.

---

## 11. Unidade 5 — Todas as vogais

### `h11` — ㅑ ㅕ ㅛ ㅠ

**Objetivo:** ler as quatro vogais com glide palatal (som de “y”) e reconhecer que são vogais simples com um traço a mais, não ditongos independentes.

**Pré-requisitos:** `h02`–`h03`, `h04`–`h10`.

**Conteúdo novo:** ㅑ, ㅕ, ㅛ, ㅠ.

**Exemplos:** 야구, 여우, 요리, 유리, 우유, 여기.

**Pronúncia e armadilhas:**
- ㅑ [ja], ㅕ [jʌ], ㅛ [jo], ㅠ [ju]. O “y” é curto; não transformar em “ia”, “ie”, “io”, “iu” com duas sílabas.
- `야구` = beisebol; `여우` = raposa; `요리` = culinária; `유리` = vidro; `우유` = leite; `여기` = aqui.
- `우유` tem duas sílabas com ㅇ inicial mudo em ambas: [uju], não “u-yu” com pausa.
- Evitar transformar o ㄴ em “nh” antes de ㅑ/ㅕ: o ㄴ continua alveolar, ainda que levemente palatalizado. `녀` não vira “nhô”.

**Prática (12 itens):**
1. Distinguir `아/야` por áudio.
2. Distinguir `어/여` por áudio.
3. Distinguir `오/요` por áudio.
4. Distinguir `우/유` por áudio.
5. Ler `야구` e escolher “beisebol”.
6. Ler `여우` e escolher “raposa”.
7. Ler `요리` e escolher “culinária”.
8. Ler `유리` e escolher “vidro”.
9. Ler `우유` e escolher “leite”.
10. Montar `야` (ㅇ + ㅑ).
11. Montar `유` (ㅇ + ㅠ).
12. Revisão das vogais anteriores.

**Critério de conclusão:** 10/12.

---

### `h12` — ㅐ ㅔ ㅒ ㅖ

**Objetivo:** ler as vogais escritas com ㅐ/ㅔ e ㅒ/ㅖ, entender que a distinção oral está em fusão no coreano moderno e que a ortografia continua diferente.

**Pré-requisitos:** `h11`.

**Conteúdo novo:** ㅐ, ㅔ, ㅒ, ㅖ.

**Exemplos:** 개, 새, 네, 세수, 시계, 얘기, 예, 베개.

**Pronúncia e armadilhas:**
- ㅐ e ㅔ são hoje muito próximas em Seoul: [ɛ] ~ [e]. A distinção existe na escrita e em alguns falantes, mas não é confiável para avaliar pronúncia. **Ensinar a diferença gráfica, não exigir o contraste oral.**
- ㅒ e ㅖ são [jɛ] ~ [je]. Em muitos contextos, ㅖ após consoante soa [e] (ex.: `시계` [ɕiɡje] ~ [ɕiɡe]).
- `개` = cachorro; `새` = pássaro; `네` = sim/seu; `세수` = lavar o rosto; `시계` = relógio; `얘기` = conversa; `예` = sim; `베개` = travesseiro.
- Não ensinar “ㅐ = é aberto, ㅔ = ê fechado” como regra absoluta; é uma simplificação que não corresponde ao coreano atual.
- A ortografia é avaliada; a pronúncia distinta não.

**Prática (12 itens):**
1. Ver `개` e escolher o áudio.
2. Ver `네` e escolher o áudio.
3. Ouvir `새` e escolher entre `새/세`.
4. Ouvir `세수` e contar sílabas.
5. Completar `베__` para “travesseiro”.
6. Ler `시계` e escolher “relógio”.
7. Ler `얘기` e escolher “conversa”.
8. Distinguir ㅐ/ㅔ na escrita (não no som).
9. Distinguir ㅒ/ㅖ na escrita.
10. Montar `개` (ㄱ + ㅐ).
11. Montar `예` (ㅇ + ㅖ).
12. Revisão de ㅑ/ㅕ/ㅛ/ㅠ.

**Critério de conclusão:** 10/12. Erros de som em ㅐ/ㅔ não bloqueiam; erros de ortografia, sim.

---

### `h13` — ㅘ ㅝ ㅟ

**Objetivo:** ler os ditongos com glide labial e a vogal ㅟ, com atenção à diferença entre escrever e pronunciar.

**Pré-requisitos:** `h12`.

**Conteúdo novo:** ㅘ, ㅝ, ㅟ.

**Exemplos:** 사과, 과자, 귀, 쥐, 위, 화.

**Pronúncia e armadilhas:**
- ㅘ [wa], como “ua” de “quase” sem o “q”.
- ㅝ [wʌ], como “u” + ㅓ; não é “uô” nem “uo”.
- ㅟ [y] ~ [wi]. Em Seoul, muitos falantes dizem [wi]; a realização [y] (como “u” francês) existe, mas não deve ser exigida. Aceitar as duas.
- `사과` = maçã ou desculpa; `과자` = biscoito/salgadinho; `귀` = orelha; `쥐` = rato; `위` = acima/estômago; `화` = raiva.
- `귀` e `쥐` começam com consoante + ㅟ; não inserir “u” antes: não “gui”, mas [kwi] ~ [ky].
- Evitar transformar ㅘ em duas sílabas: `과` é uma sílaba, [kwa].

**Prática (12 itens):**
1. Distinguir `가/과` por áudio.
2. Distinguir `고/과` por áudio.
3. Distinguir `워/와` por áudio.
4. Ler `사과` e escolher “maçã”.
5. Ler `과자` e escolher “biscoito”.
6. Ler `귀` e escolher “orelha”.
7. Ler `쥐` e escolher “rato”.
8. Ler `위` e escolher “acima”.
9. Montar `과` (ㄱ + ㅘ).
10. Montar `워` (ㅇ + ㅝ).
11. Montar `귀` (ㄱ + ㅟ).
12. Revisão de ㅐ/ㅔ.

**Critério de conclusão:** 10/12.

---

### `h14` — ㅙ ㅞ ㅚ

**Objetivo:** ler as três grafias que convergiram para [we] na fala moderna e distinguir seus usos escritos.

**Pré-requisitos:** `h13`.

**Conteúdo novo:** ㅙ, ㅞ, ㅚ.

**Exemplos:** 왜, 돼지, 회사, 웨이터, 뇌, 쇠.

**Pronúncia e armadilhas:**
- ㅙ, ㅞ e ㅚ são frequentemente [we] em Seoul. A distinção histórica [wɛ], [we], [ø] não é exigível.
- `왜` = por que; `돼지` = porco; `회사` = empresa; `웨이터` = garçom; `뇌` = cérebro; `쇠` = ferro.
- `돼지` é escrita com ㅙ; `되` (verbo “tornar-se”) é diferente. Não corrigir ortografia por som.
- `회` em `회사` é uma sílaba, [hwe] ~ [hoe]; não separar em “ho-e”.
- A avaliação é de leitura e ortografia; não penalizar quem pronuncia ㅙ/ㅞ/ㅚ de forma idêntica.

**Prática (12 itens):**
1. Ver `왜` e escolher o áudio.
2. Ver `웨` e escolher o áudio.
3. Ver `외` e escolher o áudio.
4. Ler `돼지` e escolher “porco”.
5. Ler `회사` e escolher “empresa”.
6. Ler `뇌` e escolher “cérebro”.
7. Completar `__이터` para “garçom”.
8. Distinguir na escrita ㅙ/ㅞ/ㅚ.
9. Montar `왜` (ㅇ + ㅙ).
10. Montar `회` (ㅎ + ㅚ).
11. Revisão de ㅘ/ㅝ/ㅟ.
12. Revisão de ㅐ/ㅔ.

**Critério de conclusão:** 10/12, com acerto nos itens de escrita.

---

### `h15` — ㅢ e o inventário completo de vogais

**Objetivo:** ler ㅢ em seus contextos principais e fechar as 21 vogais.

**Pré-requisitos:** `h11`–`h14`.

**Conteúdo novo:** ㅢ.

**Exemplos:** 의사, 의자, 의미, 주의, 나의.

**Pronúncia e armadilhas:**
- ㅢ é [ɰi] no início de palavra (`의사`, `의자`), mas pode soar [i] depois de consoante e [e] como partícula possessiva (`나의` → [나에]).
- Em `주의`, a realização varia entre [ɰi] e [i]; não impor uma única forma.
- `의사` = médico; `의자` = cadeira; `의미` = significado; `주의` = atenção; `나의` = meu/minha.
- A partícula possessiva `의` é normalmente pronunciada [에] na fala; a escrita permanece `의`. Ensinar isso como **variação aceita**, não como erro.
- Este é o ponto de maior fragilidade fonética do currículo; todo item de ㅢ deve ser marcado para revisão nativa.

**Prática (14 itens):**
1. Ouvir `의사` e escolher a grafia.
2. Ouvir `의자` e escolher a grafia.
3. Ler `의미` e escolher “significado”.
4. Ler `주의` e escolher “atenção”.
5. Ler `나의` e escolher “meu/minha”.
6. Identificar ㅢ em uma lista de vogais.
7. Completar a tabela das 21 vogais.
8. Distinguir ㅢ/ㅣ por áudio (com tolerância).
9. Montar `의` (ㅇ + ㅢ).
10. Montar `희` (ㅎ + ㅢ) — sílaba comum em nomes.
11. Revisão de ㅚ/ㅙ/ㅞ.
12. Revisão de ㅘ/ㅝ/ㅟ.
13. Revisão de ㅐ/ㅔ/ㅒ/ㅖ.
14. Revisão de ㅑ/ㅕ/ㅛ/ㅠ.

**Critério de conclusão:** 11/14. Itens de ㅢ valem como acerto se a resposta corresponder a uma das realizações aceitas.

---

### `c2` — Checkpoint 2: inventário completo de vogais

**Escopo:** `h01`–`h15`. 19 consoantes, 21 vogais, sílabas CV sem batchim.

**Formato:** 24 itens, 20 minutos.

| Bloco | Itens | O que avalia |
|---|---|---|
| Identificação de vogal | 6 | ouvir/ver e escolher a vogal |
| Contraste de vogais | 6 | ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ, ㅚ/ㅙ/ㅞ, ㅢ/ㅣ |
| Leitura de palavra | 6 | palavra + significado/áudio |
| Montagem | 4 | compor sílaba com vogal composta |
| Ortografia | 2 | escolher a grafia correta |

**Aprovação:** 19/24 (80%). Erros em ㅢ, ㅚ/ㅙ/ㅞ e ㅐ/ㅔ não bloqueiam sozinhos, mas geram cartões de revisão. Erros de montagem bloqueiam a unidade 6 até nova prática.

**Nota:** a partir daqui **não há mais romanização** em enunciados, alternativas ou feedback. O áudio e a descrição articulatória substituem RR.

---

## 12. Unidade 6 — Sílabas e batchim

### `h16` — Montar e ler sílabas C+V

**Objetivo:** consolidar a mecânica do bloco silábico, incluindo vogais compostas, e ler sílabas isoladas sem apoio de romanização.

**Pré-requisitos:** `c2`.

**Conteúdo novo:** nenhum jamo. Conceitos: posição inicial (초성), medial (중성), final (종성), ordem de composição, sílabas com vogal composta.

**Exemplos:** 가, 고, 과, 귀, 의, 와, 워, 외, 왜.

**Pronúncia e armadilhas:**
- A sílaba é sempre escrita em um bloco: consoante inicial + vogal; se houver batchim, ele entra embaixo.
- `과` é uma sílaba, não “go-a”. `귀` é uma sílaba, não “gu-i”.
- `의` é uma sílaba; a pronúncia varia conforme o contexto (ver `h15`).
- Não existe sílaba sem consoante inicial na escrita: o ㅇ ocupa o lugar quando não há som consonantal.
- A ordem de digitação/toque no construtor é: inicial → medial → final (se houver).

**Prática (12 itens):**
1. Montar `가` (ㄱ + ㅏ).
2. Montar `고` (ㄱ + ㅗ).
3. Montar `과` (ㄱ + ㅘ).
4. Montar `귀` (ㄱ + ㅟ).
5. Montar `의` (ㅇ + ㅢ).
6. Montar `와` (ㅇ + ㅘ).
7. Decompor `워` em ㅇ + ㅝ.
8. Decompor `외` em ㅇ + ㅚ.
9. Decompor `왜` em ㅇ + ㅙ.
10. Contar sílabas em `사과` (2).
11. Contar sílabas em `의사` (2).
12. Ler uma sílaba sorteada do inventário.

**Critério de conclusão:** 10/12, com acerto em pelo menos 3 montagens e 2 decomposições.

---

### `h17` — Batchim ㅇ, ㄴ, ㅁ

**Objetivo:** entender o batchim e ler os três finais nasais mais transparentes.

**Pré-requisitos:** `h16`.

**Conteúdo novo:** batchim ㅇ [ŋ], ㄴ [n], ㅁ [m].

**Exemplos:** 강, 안, 암, 눈, 문, 공, 엄마, 강아지, 고양이.

**Pronúncia e armadilhas:**
- Batchim é a consoante final do bloco, pronunciada sem vogal depois. Não é uma sílaba extra.
- ㅇ final = [ŋ], como “ng” de “sing” em inglês; não é [n] nem “g” separado. `강` = rio.
- ㄴ final = [n]; `안` = dentro; `눈` = olho/neve; `문` = porta.
- ㅁ final = [m]; `암` = câncer; `공` = bola.
- `엄마` = mamãe; `강아지` = cachorrinho; `고양이` = gato.
- Não inserir “i” depois do batchim: `강` não é “gang-i”. O batchim fecha a sílaba.
- Em `강아지`, o ㅇ final de `강` é seguido de vogal na sílaba seguinte; a ligação será ensinada em `h21`. Aqui, ler devagar, sem apagar o [ŋ].

**Prática (12 itens):**
1. Ouvir `강` e escolher entre `강/간`.
2. Ouvir `안` e escolher entre `안/앙`.
3. Ouvir `암` e escolher entre `암/안`.
4. Ler `눈` e escolher “olho/neve”.
5. Ler `문` e escolher “porta”.
6. Ler `공` e escolher “bola”.
7. Ler `엄마` e escolher “mamãe”.
8. Ler `강아지` e escolher “cachorrinho”.
9. Ler `고양이` e escolher “gato”.
10. Montar `강` (ㄱ + ㅏ + ㅇ).
11. Montar `문` (ㅁ + ㅜ + ㄴ).
12. Contar sílabas e identificar batchim em uma palavra.

**Critério de conclusão:** 10/12.

---

### `h18` — Batchim oclusivo e os sete sons representativos

**Objetivo:** ler batchim escrito com ㄱ/ㄷ/ㅂ e entender que várias letras finais compartilham o mesmo som representativo.

**Pré-requisitos:** `h17`.

**Conteúdo novo:** batchim ㄱ [k̚], ㄷ [t̚], ㅂ [p̚]; representação de ㄲ/ㅋ como [k̚], ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ como [t̚], ㅍ como [p̚]. Os sons desta lição, somados a [n], [m], [ŋ] de `h17` e a [l] de `h19`, formam os **sete sons finais**.

**Exemplos:** 국, 밥, 곧, 입, 책, 먹다, 잡다, 한국, 옷, 꽃, 앞, 밖, 부엌, 낮.

**Pronúncia e armadilhas:**
- Batchim oclusivo é **não solto** (unreleased): a boca fecha, mas não sai ar. Não dizer “guki”, “babi”, “ipe”.
- ㄱ, ㄲ, ㅋ no final → [k̚]. `국` [kuk̚], `밖` [pak̚], `부엌` [puʌk̚].
- ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ no final → [t̚]. `곧` [kot̚], `옷` [ot̚], `꽃` [k͈ot̚], `낮` [nat̚].
- ㅂ, ㅍ no final → [p̚]. `밥` [pap̚], `입` [ip̚], `앞` [ap̚].
- `한국` tem batchim ㄱ; `한국어` será lido com ligação em `h21`.
- `먹다` e `잡다` têm uma sílaba seguinte com ㄷ; a pronúncia real envolve tensificação, que **não** é avaliada nesta lição. Avaliar apenas o som do batchim.
- Não confundir batchim com a consoante inicial da sílaba seguinte.

**Prática (14 itens):**
1. Classificar o som final de `국`.
2. Classificar o som final de `밥`.
3. Classificar o som final de `곧`.
4. Classificar o som final de `옷`.
5. Classificar o som final de `꽃`.
6. Classificar o som final de `앞`.
7. Classificar o som final de `밖`.
8. Classificar o som final de `낮`.
9. Ouvir `국/구` e distinguir presença de batchim.
10. Ouvir `밥/바` e distinguir.
11. Ler `한국` e escolher “Coreia”.
12. Ler `책` e escolher “livro”.
13. Montar `국` (ㄱ + ㅜ + ㄱ).
14. Completar a tabela dos sons já vistos (ㅇ, ㄴ, ㅁ, ㄱ, ㄷ, ㅂ).

**Critério de conclusão:** 11/14, com acerto em pelo menos 5 dos 6 sons já vistos.

---

### `h19` — Batchim ㄹ

**Objetivo:** ler o batchim ㄹ como [l] e evitar a vocalização brasileira.

**Pré-requisitos:** `h18`.

**Conteúdo novo:** batchim ㄹ [l].

**Exemplos:** 말, 달, 물, 길, 서울, 한글.

**Pronúncia e armadilhas:**
- ㄹ final é [l], com a ponta da língua no alvéolo, sem soltar uma vogal. Não é o “l” final de “Brasil” [w].
- `말` = cavalo/palavra; `달` = lua/mês; `물` = água; `길` = caminho; `서울` = Seul; `한글` = Hangul.
- `서울` tem duas sílabas: 서 + 울. O ㄹ final é [l], não [w].
- `한글` tem batchim ㄴ na primeira sílaba e ㄹ na segunda; não trocar a ordem.
- Não inserir “i” depois do ㄹ: `말` não é “mari”. O ㄹ final é seco.
- O ㄹ inicial (tepe) e o final ([l]) são alofones do mesmo fonema; a diferença será sistematizada em `pronunciation-ptbr.md`.

**Prática (12 itens):**
1. Ouvir `말` e escolher entre `말/마`.
2. Ouvir `물` e escolher entre `물/무`.
3. Ler `달` e escolher “lua/mês”.
4. Ler `길` e escolher “caminho”.
5. Ler `서울` e escolher “Seul”.
6. Ler `한글` e escolher “Hangul”.
7. Montar `말` (ㅁ + ㅏ + ㄹ).
8. Montar `물` (ㅁ + ㅜ + ㄹ).
9. Contar sílabas em `서울`.
10. Identificar o batchim em `한글`.
11. Contrastar ㄹ final com ㄴ final por áudio.
12. Revisão dos batchim nasais.

**Critério de conclusão:** 10/12, com acerto obrigatório no item 1 ou 2.

---

### `h20` — Os 11 batchim duplos

**Objetivo:** reconhecer os 11 finais duplos, saber qual parte sobrevive em cada um e ler palavras que os contenham sem entrar nas regras de sandhi.

**Pré-requisitos:** `h19`.

**Conteúdo novo:** ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ.

**Exemplos:** 닭, 삶, 값, 없다, 많다, 앉다, 핥다, 싫다, 밟다, 젊다, 넓다, 곬, 읊다, 훑다.

**Tabela de referência (som final isolado):**

| Final duplo | Som final | Exemplo | Leitura de dicionário simplificada |
|---|---|---|---|
| ㄳ | [k̚] | 몫 | [mok̚] |
| ㄵ | [n] | 앉다 | [an-] + sílaba seguinte |
| ㄶ | [n] | 많다 | [man-] + sílaba seguinte |
| ㄺ | [k̚] | 닭 | [tak̚] |
| ㄻ | [m] | 삶 | [sam] |
| ㄼ | [l] | 넓다 | [nʌl-] + sílaba seguinte |
| ㄽ | [l] | 곬 | [kol] |
| ㄾ | [l] | 핥다 | [hal-] + sílaba seguinte |
| ㄿ | [p̚] | 읊다 | [ɯp̚-] + sílaba seguinte |
| ㅀ | [l] | 싫다 | [sil-] + sílaba seguinte |
| ㅄ | [p̚] | 없다 | [ʌp̚-] + sílaba seguinte |

**Exceções e armadilhas:**
- `값` tem final **ㅄ**, não ㄳ: o som é [p̚]. Não confundir a grafia.
- `밟다` é a exceção clássica: o final ㄼ soa [p̚], não [l]. `넓다` segue a regra geral e soa [l].
- `없다` tem ㅄ → [p̚]; a sílaba seguinte começa com ㄷ, e a pronúncia real tem tensificação. Avaliar só o final.
- `많다`, `앉다`, `핥다`, `싫다` envolvem aspiração ou tensificação na sílaba seguinte. **Não avaliar a palavra inteira**; avaliar o som final e a identificação da parte que sobrevive.
- `곬` é palavra rara; existe para cobrir ㄽ. Marcar como item de sistema.
- O batchim duplo não é pronunciado como duas consoantes. `닭` não é “dalk”; é [tak̚] com final [k̚].
- A escolha de qual parte sobrevive depende, em alguns casos, da sílaba seguinte. Nesta lição, ensinar o valor isolado; a variação contextual fica para leitura assistida.

**Prática (14 itens):**
1. Identificar o som final de `닭`.
2. Identificar o som final de `삶`.
3. Identificar o som final de `값`.
4. Identificar o som final de `없다`.
5. Identificar o som final de `많다`.
6. Identificar o som final de `앉다`.
7. Identificar o som final de `핥다`.
8. Identificar o som final de `싫다`.
9. Identificar o som final de `밟다` (exceção).
10. Identificar o som final de `젊다`.
11. Identificar o som final de `넓다`.
12. Identificar o som final de `읊다`.
13. Completar a tabela dos 11 finais duplos.
14. Revisão dos 7 sons representativos.

**Critério de conclusão:** 11/14, com acerto em `밟다` e em pelo menos 8 dos 11 finais.

**Nota de escopo:** esta lição é a mais densa do módulo. Se a pessoa errar mais de 4 itens, o app deve dividir a revisão em duas sessões (ㄳ–ㄻ e ㄼ–ㅄ) em vez de repetir tudo.

---

### `c3` — Checkpoint 3: sílabas e batchim

**Escopo:** `h16`–`h20`. As 27 grafias consonantais de batchim, a coda vazia, montagem e leitura de sílabas CVC.

**Formato:** 24 itens, 20 minutos.

| Bloco | Itens | O que avalia |
|---|---|---|
| Som final | 8 | identificar [k̚], [n], [t̚], [l], [m], [p̚], [ŋ] |
| Batchim duplo | 6 | qual parte sobrevive |
| Leitura de palavra | 6 | palavra com batchim + significado/áudio |
| Montagem | 3 | C+V+C |
| Contagem e decomposição | 1 | sílabas e posição do batchim |

**Aprovação:** 19/24 (80%). Erros em batchim duplo geram revisão de `h20`; erros de som representativo geram revisão de `h18`.

**Nota:** não incluir palavras cuja pronúncia dependa de regras de `h21`–`h23` sem áudio. O checkpoint avalia o valor isolado do batchim, não sandhi.

---

## 13. Unidade 7 — Ler em contexto

A última unidade ensina **três fenômenos de fronteira** e depois usa tudo em leitura. A ordem é deliberada: ligação (transparente), nasalização (assimilação), aspiração (fusão). Tensificação e lateralização ficam para uma fase futura; aparecem apenas como aviso auditivo quando inevitáveis.

### `h21` — Ligação (연음)

**Objetivo:** entender que um batchim seguido de sílaba com ㅇ inicial passa a ser pronunciado como início dessa sílaba.

**Pré-requisitos:** `c3`.

**Conteúdo novo:** regra de ligação.

**Exemplos:** 한국어, 음악, 밥을, 옷을, 꽃이, 좋아요, 읽어요, 앉아요.

**Pronúncia e armadilhas:**
- `한국어` → 한구거 [hanɡuɡʌ]. O ㄱ final de 국 passa para o lugar do ㅇ de 어.
- `음악` → 으막 [ɯmak̚]. O ㄱ final de 음 passa para 악.
- `밥을` → 바블 [pabɯl]; `옷을` → 오슬 [osɯl]; `꽃이` → 꼬치 [k͈otɕʰi].
- `좋아요` → 조아요 [tɕoajo]: o ㅎ final cai antes de vogal.
- `읽어요` → 일거요 [ilɡʌjo]: em final duplo ㄺ, o ㄹ passa para a sílaba seguinte.
- `앉아요` → 안자요 [andʑajo]: em ㄵ, o ㄴ passa; o ㅈ permanece como inicial.
- A escrita **não muda**. Ligação é pronúncia, não ortografia.
- **Nota de revisão:** `읽어요` e `앉아요` foram corrigidos para `일거요` e `안자요`; a forma escrita permanece `읽어요`/`앉아요`. A implementação registra a correção nas notas de h21.
- Batchim ㅇ não se move: `강아지` continua [kaŋadʑi], com [ŋ] no fim da primeira sílaba.
- Não aplicar ligação quando a sílaba seguinte já tem consoante inicial: `한국말` não vira “한구말”; o ㄱ encontra ㅁ e haverá nasalização em `h22`.

**Prática (14 itens):**
1. Pronunciar/identificar `한국어` com ligação.
2. `음악`.
3. `밥을`.
4. `옷을`.
5. `꽃이`.
6. `좋아요` (queda do ㅎ).
7. `읽어요` (ㄺ).
8. `앉아요` (ㄵ).
9. Escolher a forma com ligação correta entre duas.
10. Identificar que a escrita não muda.
11. Caso negativo: `강아지` (ㅇ não se move).
12. Caso negativo: `한국말` (não há ligação).
13. Revisão de batchim.
14. Leitura de uma frase curta com ligação.

**Critério de conclusão:** 11/14, com acerto em pelo menos 5 dos 8 exemplos.

---

### `h22` — Nasalização

**Objetivo:** reconhecer a assimilação de ㄱ/ㄷ/ㅂ para ㅇ/ㄴ/ㅁ antes de ㄴ ou ㅁ.

**Pré-requisitos:** `h21`.

**Conteúdo novo:** regra de nasalização.

**Exemplos:** 한국말, 입니다, 학년, 국물, 십만, 먹는다, 잡는.

**Pronúncia e armadilhas:**
- ㄱ → ㅇ antes de ㄴ/ㅁ: `한국말` → 한궁말 [hanɡuŋmal]; `학년` → 항년 [haŋnjʌn]; `국물` → 궁물 [kuŋmul].
- ㄷ → ㄴ antes de ㄴ/ㅁ: `받는다` → 반는다 [pannɯnda]; `있는` → 인는 [innɯn].
- ㅂ → ㅁ antes de ㄴ/ㅁ: `입니다` → 임니다 [imnida]; `십만` → 심만 [simman]; `잡는` → 잠는 [tɕamnɯn].
- `먹는다` → 멍는다 [mʌŋnɯnda].
- A nasalização é obrigatória na fala natural, mas a escrita permanece igual.
- Não nasalizar antes de vogal: `입이` não é “임이”; a ligação de `h21` se aplica primeiro.
- Não ensinar nasalização de ㄹ → ㄴ nesta fase; é outro fenômeno.

**Prática (14 itens):**
1. `한국말` — identificar [ŋ].
2. `입니다` — identificar [m].
3. `학년` — identificar [ŋ].
4. `국물` — identificar [ŋ].
5. `십만` — identificar [m].
6. `먹는다` — identificar [ŋ].
7. `잡는` — identificar [m].
8. `받는다` — identificar [n].
9. Escolher a pronúncia correta de `입니다`.
10. Escolher a pronúncia correta de `한국말`.
11. Caso negativo: `입이` (ligação, não nasalização).
12. Completar a regra ㄱ/ㄷ/ㅂ → __/__/__ antes de ㄴ/ㅁ.
13. Revisão de ligação.
14. Leitura de uma frase com nasalização.

**Critério de conclusão:** 11/14, com acerto nos itens 9 e 10.

---

### `h23` — Aspiração

**Objetivo:** reconhecer a fusão de ㄱ/ㄷ/ㅂ/ㅈ com ㅎ, produzindo ㅋ/ㅌ/ㅍ/ㅊ.

**Pré-requisitos:** `h22`.

**Conteúdo novo:** regra de aspiração.

**Exemplos:** 좋다, 축하, 입학, 백화점, 국화.

**Pronúncia e armadilhas:**
- `좋다` → 조타 [tɕotʰa]: ㅎ + ㄷ → ㅌ.
- `축하` → 추카 [tɕʰukʰa]: ㄱ + ㅎ → ㅋ.
- `입학` → 이팍 [ipʰak̚]: ㅂ + ㅎ → ㅍ.
- `백화점` → 배콰점 [pɛkʰwadʑʌm]: ㄱ + ㅎ → ㅋ.
- `국화` → 구콰 [kukʰwa]: ㄱ + ㅎ → ㅋ.
- A aspiração pode ocorrer com ㅎ antes ou depois da consoante final.
- ㅎ depois de ㄴ/ㅁ/ㅇ frequentemente cai ou enfraquece (`전화` ~ [tɕʌnwa]); isso é variação e não será cobrado agora.
- Não confundir aspiração com tensificação: o resultado é uma consoante aspirada, não tensa.
- A escrita não muda.

**Prática (14 itens):**
1. `좋다` — identificar [tʰ].
2. `축하` — identificar [kʰ].
3. `입학` — identificar [pʰ].
4. `백화점` — identificar [kʰ].
5. `국화` — identificar [kʰ].
6. Completar a regra ㄱ+ㅎ → __.
7. Completar a regra ㄷ+ㅎ → __.
8. Completar a regra ㅂ+ㅎ → __.
9. Completar a regra ㅈ+ㅎ → __.
10. Escolher a pronúncia correta de `좋다`.
11. Escolher a pronúncia correta de `축하`.
12. Caso negativo: `전화` (ㅎ fraco após ㄴ).
13. Revisão de nasalização.
14. Leitura de uma frase com aspiração.

**Critério de conclusão:** 11/14, com acerto nos itens 6–9.

---

### `h24` — Oficina de leitura

**Objetivo:** integrar tudo em palavras e frases curtas, com foco em fluência, agrupamento e automonitoria.

**Pré-requisitos:** `h23`.

**Conteúdo novo:** nenhum. Prática de leitura com áudio.

**Exemplos (palavras):** 한글, 한국어, 서울, 사람, 사랑, 마음, 꽃, 밥, 물, 눈, 안녕, 감사.

**Frases curtas:**
- 안녕하세요? (cumprimento)
- 감사합니다. (agradecimento; contém nasalização ㅂ + ㄴ)
- 한국어를 공부해요. (frase de apresentação; contém ligação 를 → 를? `한국어를` [한구거를], `공부해요` [공부해요])
- 저는 학생입니다. (apresentação; contém 입니다 → 임니다)

**Pronúncia e armadilhas:**
- Ler em grupos de sentido, não palavra por palavra.
- `한국어` e `한국어를` exigem ligação; `감사합니다` e `입니다` exigem nasalização.
- `안녕하세요` tem ㅎ entre vogais; não transformar em “rr”.
- `꽃` tem batchim ㅊ → [t̚]; `밥` tem ㅂ → [p̚]; `물` tem ㄹ → [l].
- `눈` pode ser “olho” ou “neve”; o contexto da frase resolve.
- Não avaliar velocidade. Avaliar precisão e capacidade de corrigir a si mesmo.

**Prática (15 itens):**
1–6. Ler 6 palavras e escolher o áudio correspondente.
7–10. Associar 4 palavras ao significado.
11–13. Ler 3 frases com áudio e identificar uma palavra-chave.
14. Autogravar ou ler em voz alta e marcar “consigo/tenho dúvida” (sem avaliação automática).
15. Revisão de uma regra de cada tipo.

**Critério de conclusão:** 12/15. Itens de autopercepção não contam para o score. **No app:** o item 14 é autoavaliação sem nota, então a aprovação é 12 acertos nos 14 itens avaliados (86% exibido), preservando o critério documentado de 12/15.

---

### `h25` — Consolidação e domínio

**Objetivo:** rever cumulativamente todo o módulo, identificar lacunas e iniciar a fase de manutenção.

**Pré-requisitos:** `h24`.

**Conteúdo novo:** nenhum.

**Exemplos:** mistura de palavras de todas as lições, incluindo batchim duplo e regras.

**Pronúncia e armadilhas:**
- Esta lição não introduz som novo. Se aparecer dúvida, o app aponta a lição de origem.
- O foco é **reconhecer rápido** e **ler sem romanização**.
- Erros persistentes em um jamo específico geram um mini-plano de revisão de 3 dias.

**Prática (16 itens):**
1–4. Inventário: identificar jamo por áudio.
5–8. Montagem: compor sílabas com e sem batchim.
9–12. Leitura: palavras com batchim e regras.
13–15. Leitura de 3 frases curtas.
16. Autoavaliação: “o que ainda confundo?” com opções.

**Critério de conclusão:** 13/16. A lição pode ser refeita; o score guardado é o maior. **No app:** o item 16 é autoavaliação sem nota, então a aprovação é 13 acertos nos 15 itens avaliados (87% exibido), preservando o critério documentado de 13/16.

---

### `c4` — Checkpoint 4: leitura integrada

**Escopo:** todo o módulo.

**Formato:** 30 itens, 25–30 minutos. Pode ser dividido em duas sessões.

| Bloco | Itens | O que avalia |
|---|---|---|
| Inventário de jamo | 5 | 19 consoantes + 21 vogais |
| Montagem/decomposição | 5 | sílabas com batchim e vogal composta |
| Batchim | 6 | 7 sons representativos + duplos |
| Regras de fronteira | 6 | ligação, nasalização, aspiração |
| Leitura de palavra | 4 | precisão |
| Leitura de frase | 4 | sentido e fluência |

**Aprovação:** 24/30 (80%). Abaixo disso, o app gera um plano de revisão com as lições correspondentes e permite nova tentativa depois de concluir os cartões vencidos. **No app:** a tentativa atual roda em uma sessão de 30 minutos, sem retomada no meio; o diagnóstico e a lista de erros aparecem ao final.

**Certificado:** não emitir certificado de proficiência. Se o produto quiser um selo, usar “módulo Hangul concluído”, com a ressalva de que a pronúncia não foi avaliada por humano.

---

## 14. Grafo de pré-requisitos

O grafo é uma DAG (grafo dirigido acíclico). Cada lição só depende de lições anteriores; checkpoints dependem de toda a unidade.

| Nó | Depende de |
|---|---|
| `h01` | — |
| `h02` | `h01` |
| `h03` | `h02` |
| `h04` | `h03` |
| `h05` | `h04` |
| `h06` | `h05` |
| `h07` | `h06` |
| `h08` | `h07` |
| `h09` | `h08` |
| `h10` | `h09` |
| `c1` | `h10` |
| `h11` | `c1` |
| `h12` | `h11` |
| `h13` | `h12` |
| `h14` | `h13` |
| `h15` | `h14` |
| `c2` | `h15` |
| `h16` | `c2` |
| `h17` | `h16` |
| `h18` | `h17` |
| `h19` | `h18` |
| `h20` | `h19` |
| `c3` | `h20` |
| `h21` | `c3` |
| `h22` | `h21` |
| `h23` | `h22` |
| `h24` | `h23` |
| `h25` | `h24` |
| `c4` | `h25` |

**Invariantes:**
- Nenhuma aresta aponta para trás.
- Nenhum nó depende de conteúdo que ainda não foi ensinado.
- Todo jamo avaliado aparece em uma lição anterior ao primeiro exercício que o usa.
- Checkpoints não introduzem conteúdo.
- Se uma lição for dividida no futuro, os IDs existentes não podem ser reutilizados para outro conteúdo.

---

## 15. Matriz de cobertura

### 15.1 Consoantes (19)

| Jamo | Lição | Observação |
|---|---|---|
| ㄱ | `h04` | simples |
| ㄴ | `h04` | simples |
| ㄷ | `h05` | simples |
| ㄹ | `h05` | inicial; final em `h19` |
| ㅁ | `h05` | simples |
| ㅂ | `h06` | simples |
| ㅅ | `h06` | simples |
| ㅈ | `h06` | simples |
| ㅋ | `h07` | aspirada |
| ㅌ | `h07` | aspirada |
| ㅍ | `h07` | aspirada |
| ㅊ | `h07` | aspirada |
| ㅎ | `h08` | simples |
| ㄲ | `h09` | tensa |
| ㄸ | `h09` | tensa |
| ㅃ | `h09` | tensa |
| ㅆ | `h10` | tensa |
| ㅉ | `h10` | tensa |
| ㅇ | `h02` (inicial), `h17` (final) | dois valores |

### 15.2 Vogais (21)

| Jamo | Lição | Tipo |
|---|---|---|
| ㅏ | `h02` | simples |
| ㅓ | `h02` | simples |
| ㅗ | `h02` | simples |
| ㅜ | `h02` | simples |
| ㅡ | `h03` | simples |
| ㅣ | `h03` | simples |
| ㅑ | `h11` | iotizada |
| ㅕ | `h11` | iotizada |
| ㅛ | `h11` | iotizada |
| ㅠ | `h11` | iotizada |
| ㅐ | `h12` | simples |
| ㅔ | `h12` | simples |
| ㅒ | `h12` | iotizada |
| ㅖ | `h12` | iotizada |
| ㅘ | `h13` | ditongo |
| ㅝ | `h13` | ditongo |
| ㅟ | `h13` | ditongo/vogal |
| ㅙ | `h14` | ditongo |
| ㅞ | `h14` | ditongo |
| ㅚ | `h14` | ditongo/vogal |
| ㅢ | `h15` | ditongo |

### 15.3 Possibilidades de coda (27 batchim + vazio)

| Final | Lição | Som |
|---|---|---|
| (vazio) | `h16` | — |
| ㄱ | `h18` | [k̚] |
| ㄲ | `h18` | [k̚] |
| ㄴ | `h17` | [n] |
| ㄷ | `h18` | [t̚] |
| ㄹ | `h19` | [l] |
| ㅁ | `h17` | [m] |
| ㅂ | `h18` | [p̚] |
| ㅅ | `h18` | [t̚] |
| ㅆ | `h18` | [t̚] |
| ㅇ | `h17` | [ŋ] |
| ㅈ | `h18` | [t̚] |
| ㅊ | `h18` | [t̚] |
| ㅋ | `h18` | [k̚] |
| ㅌ | `h18` | [t̚] |
| ㅍ | `h18` | [p̚] |
| ㅎ | `h18` | [t̚] |
| ㄳ | `h20` | [k̚] |
| ㄵ | `h20` | [n] |
| ㄶ | `h20` | [n] |
| ㄺ | `h20` | [k̚] |
| ㄻ | `h20` | [m] |
| ㄼ | `h20` | [l] (exceto `밟다` → [p̚]) |
| ㄽ | `h20` | [l] |
| ㄾ | `h20` | [l] |
| ㄿ | `h20` | [p̚] |
| ㅀ | `h20` | [l] |
| ㅄ | `h20` | [p̚] |

---

## 16. Avaliação

### 16.1 Tipos

- **Formativa:** exercícios de lição, com feedback imediato e repetição do item erro.
- **Diagnóstica:** checkpoints, com mapa de erro por jamo/regra.
- **Somativa interna:** `c4`, usado para declarar “módulo concluído”, não proficiência.
- **Autopercepção:** itens de confiança e leitura em voz alta, sem correção automática.

### 16.2 Regras de pontuação

- Cada item vale 1 ponto; não há penalidade por erro.
- Itens de áudio e de texto têm o mesmo peso.
- A ordem das alternativas é embaralhada por sessão; a posição correta não pode ser previsível.
- O score de uma lição é `acertos / itens obrigatórios`. Itens de autoavaliação ficam fora do denominador.
- O progresso guarda o **maior** score da lição, não o último.
- Um checkpoint só é considerado concluído com 80%; abaixo disso, fica “em revisão” e pode ser repetido.
- Não mostrar “nota” em letras ou conceito; mostrar percentual e o que revisar.

### 16.3 Diagnóstico de erro

Cada exercício declara `skill` (jamo, sílaba, batchim, regra, leitura) e `tags` (ex.: `vowel:ㅓ`, `contrast:ㄱ-ㅋ-ㄲ`, `rule:nasalization`). O checkpoint agrega erros por tag e recomenda:

- 1–2 erros: revisar os cartões SRS correspondentes.
- 3–4 erros: refazer a lição de origem.
- 5+ erros: refazer a unidade ou conversar com o suporte (quando existir).

### 16.4 Banco de itens

- Mínimo para lançar: 10 itens por lição e 20 por checkpoint, com pelo menos 2 variantes por item crítico.
- Itens não podem ser copiados de outros cursos.
- Cada item tem `author`, `reviewStatus` e `source` (quando aplicável).
- Itens de áudio usam TTS ou gravação; se a qualidade for ruim, o item é marcado e não entra em avaliação.

---

## 17. Integração com revisão espaçada

O KBR já tem um agendador Leitner de 5 caixas (1, 2, 4, 8, 16 dias). O módulo Hangul usa esse agendador sem alterar o schema.

### 17.1 Cartões

| Tipo | Chave | Quando criar |
|---|---|---|
| Jamo | `h:jamo:c:ㄱ`, `h:jamo:v:ㅏ` | ao concluir a lição que introduz o jamo |
| Sílaba | `h:syl:가` | ao concluir `h16` ou antes, se a sílaba for exemplo |
| Palavra | `h:word:고기` | ao concluir a lição que usa a palavra |
| Regra | `h:rule:liaison` | ao concluir `h21`–`h23` |

- Criar no máximo **6 cartões novos por lição** para não inflar a fila.
- Checkpoints não criam cartões novos; apenas reagendam os existentes.
- Um cartão errado volta para a caixa 1.
- Cartões de jamo isolado podem ser suspensos quando o aluno domina a sílaba; isso é uma decisão de produto, não automática.

### 17.2 Sessão de revisão

- A sessão mistura tipos (jamo, sílaba, palavra, regra) para interleaving.
- Máximo de 20 cartões por sessão; se houver mais vencidos, mostrar “continuar depois”.
- Cada cartão tem uma tarefa, não apenas “lembrar”: ouvir e escolher, ler e escolher, montar.
- O botão “difícil” não existe no MVP; o grade é binário (`again`/`correct`), como no scheduler atual.
- O tempo gasto não é critério de domínio.

### 17.3 Relação com `Progress`

- `Progress.lessons["h07"] = { done, score }`.
- `Progress.cards["h:jamo:c:ㄱ"] = { box, due }`.
- `Progress.history` registra `exerciseId`, `correct`, `at`; o dashboard agrega por lição.
- Nenhuma migração de banco. O snapshot JSONB continua `v: 1`.

---

## 18. Fluxo do player de lição

1. **Retomada (30–60 s):** 1–2 cartões vencidos ou uma pergunta de revisão da lição anterior.
2. **Apresentação (1–2 min):** 2–4 telas curtas com o jamo/sílaba/regra, áudio e uma explicação de no máximo 2 frases.
3. **Prática guiada (2–3 min):** 3–5 itens com dica disponível; a dica reduz o score do item? **Não** no MVP, mas é registrada.
4. **Prática independente (2–3 min):** 4–6 itens sem dica.
5. **Recuperação final (1 min):** 2–3 itens dos mais errados ou dos jamo novos.
6. **Fechamento:** score, o que foi aprendido, próximos cartões, botão “próxima lição” (se liberada).

**Regras de UX:**
- O áudio não toca automaticamente; a pessoa toca no botão.
- O texto coreano de um item de escuta fica oculto até a resposta.
- Feedback aparece imediatamente, com a resposta correta e uma explicação curta.
- “Continuar” só aparece depois de responder; não há como pular sem registrar tentativa.
- Se a pessoa sair no meio, o estado da sessão é local e descartável; o progresso só é gravado ao concluir.
- Modo offline não é suportado; se a rede cair, a lição pausa e mantém a resposta local até reconectar.

---

## 19. QA de conteúdo

### 19.1 Verificações automáticas obrigatórias

1. **NFC:** todo texto coreano normalizado em NFC.
2. **Blocos válidos:** toda sílaba está entre U+AC00 e U+D7A3.
3. **Jamo compatíveis:** apenas jamo de compatibilidade (U+3131–U+318E); rejeitar jamo conjoining (U+1100–U+11FF) em conteúdo avaliado.
4. **Sem arcaico:** rejeitar o ponto arcaico U+318D e letras históricas fora do inventário moderno.
5. **Round-trip:** decompor e recompor cada sílaba deve retornar o mesmo caractere.
6. **DAG:** nenhum ciclo; toda dependência aponta para trás.
7. **Introdução única:** cada jamo é introduzido em exatamente uma lição (exceto ㅇ, que tem dois valores documentados).
8. **Exemplos controlados:** toda palavra de exemplo usa apenas jamo ensinados até a lição; exceções marcadas como `sound-only` e com áudio.
9. **Regras na ordem:** nenhum exercício de ligação antes de `h21`, nasalização antes de `h22`, aspiração antes de `h23`.
10. **Respostas determinísticas:** uma resposta correta e distratores que não sejam ambíguos.
11. **Sem romanização após `h15`:** nenhum campo de resposta ou alternativa pode conter RR.
12. **Áudio:** todo item de escuta tem `audioText` e um fallback textual para acessibilidade.
13. **Originalidade:** nenhum texto copiado; registrar autoria e fonte.
14. **Status:** todo item `in-review` até revisão humana registrada.
15. **Português:** ortografia pt-BR, aspas e travessões consistentes; coreano com espaçamento correto.

### 19.2 Verificações manuais

- Um falante nativo ou professor de coreano lê todos os exemplos em voz alta.
- Um brasileiro sem conhecimento de coreano testa a primeira lição e relata onde travou.
- Um brasileiro com conhecimento intermediário tenta “adivinhar” as respostas e confirma que os distratores não entregam.
- Teste em 375 px: botões de áudio e alternativas não podem competir por espaço.
- Teste de leitor de tela: o botão de áudio tem rótulo; a alternativa não depende só de cor.

### 19.3 Critérios de bloqueio de lançamento

- Qualquer erro de Hangul em conteúdo avaliado.
- Qualquer item com duas respostas defensáveis.
- Qualquer áudio que pronuncie o batchim com vogal epentética.
- Qualquer texto marcado `reviewed` sem revisor identificado.
- Qualquer exemplo com jamo não ensinado, salvo `sound-only`.
- Qualquer regra de sandhi fora da ordem.

---

## 20. Revisão especializada pendente

Nada neste documento foi validado por falante nativo ou professor. A revisão deve cobrir, no mínimo:

| Área | Por que revisar | Prioridade |
|---|---|---|
| IPA de todas as vogais e consoantes | risco de imprecisão e de contradição com o áudio | alta |
| ㅐ/ㅔ, ㅒ/ㅖ | fusão variável por falante e região | alta |
| ㅚ/ㅙ/ㅞ, ㅟ, ㅢ | realizações múltiplas; risco de ensinar forma estigmatizada | alta |
| ㄹ inicial e final | alofonia e interferência do português | alta |
| ㅎ e aspiração | enfraquecimento, queda e fusão | alta |
| Batchim duplo e exceções (`밟다`) | regras contextuais e exceções | alta |
| Nasalização e ligação | naturalidade dos exemplos e transcrições | alta |
| Empréstimos (`커피`, `히터`, `웨이터`) | pronúncia real no coreano | média |
| Traduções das palavras | polissemia (`눈`, `말`, `차`) | média |
| Afirmações históricas | datas, nomes e atribuição | média |
| Naturalidade das frases de `h24` | registro e frequência | média |
| Adequação ao público brasileiro | exemplos e explicações | média |

**Registro:** cada revisão deve gerar `reviewedBy`, `reviewedAt` e `notes` no item. Sem isso, o status continua `in-review`.

---

## 21. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Ensinar pronúncia errada com confiança | alto | marcar tudo `in-review`; TTS com apoio, não como verdade; revisão nativa |
| Romanização virar muleta | médio | remover após `h15`; nunca aceitar RR como resposta |
| Batchim duplo sobrecarregar | alto | dividir `h20` em duas sessões se necessário; avaliar som final, não a palavra inteira |
| TTS robótico ou com sotaque | médio | testar vozes; preferir gravação humana para itens avaliados |
| Exemplos com jamo não ensinados | médio | validação automática + `sound-only` |
| Falta de revisão humana atrasar o lançamento | alto | lançar como “em revisão”, sem prometer precisão nativa |
| Interferência do português (ㄷ/ㅌ antes de ㅣ, ㄹ final, ㅓ) | alto | exercícios de contraste dedicados e feedback específico |
| Conteúdo histórico virar afirmação absoluta | baixo | linguagem descritiva, sem superlativos |
| Excesso de cartões SRS | médio | limite de 6 novos por lição; sessão de 20 |

---

## 22. Handoff para a Fase 3B

A Fase 3B **não deve começar sem pedido explícito**. Quando começar, a ordem sugerida é:

1. Criar `src/content/hangul/` com tipos e dados estáticos das lições `h01`–`h10`.
2. Adicionar `checkAnswer` e os novos tipos de exercício em `src/lib/exercises`, preservando `check` e os testes atuais.
3. Adicionar `decomposeSyllable`, `isHangulText` e validação NFC em `src/lib/hangul`.
4. Implementar o player de lição e a tela `/hangul` (substituir o estado “Em desenvolvimento”).
5. Criar os cartões SRS ao concluir lições; reutilizar `lib/srs` e `Progress` v1.
6. Implementar checkpoints com diagnóstico por tag.
7. Adicionar testes de conteúdo (DAG, cobertura, round-trip, romanização, respostas).
8. Só depois criar `h11`–`h25` e áudios.
9. Revisar acessibilidade, mobile e estados vazios.
10. Rodar typecheck, testes, build e e2e.

**Critérios de aceite da 3B:**
- Nenhuma alteração em auth, sync, banco ou RLS.
- `Progress` v1 intacto; merge e sync continuam passando.
- Todos os 40 jamo e as 27 grafias de batchim (além da coda vazia) cobertos.
- Nenhum item com duas respostas corretas.
- Conteúdo marcado `in-review` e visível como tal.
- 375 px sem overflow; alvos ≥ 44 px.
- Testes de conteúdo verdes.

---

## 23. Referências

Fontes consultadas para princípios, história e benchmark. Nenhuma foi copiada literalmente para o conteúdo do app.

- National Institute of Korean Language (NIKL). *The Principles of Hunminjeongeum*.  
  https://www.korean.go.kr/eng_hangeul/principle/001.html  
  https://www.korean.go.kr/eng_hangeul/principle/002.html  
  https://www.korean.go.kr/eng_hangeul/principle/003.html
- National Institute of Korean Language. *Korean Orthography / Pronunciation Rules* (consulta de regras).  
  https://www.korean.go.kr/front/page/pageView.do?page_id=P000102&mn_id=95
- UNESCO. *Hunminjeongum Manuscript* (Memory of the World).  
  https://www.unesco.org/en/memory-world/hunminjeongum-manuscript
- King Sejong Institute. *Currículo de 6 níveis* (benchmark de sequência, não de conteúdo).  
  https://www.iksi.or.kr/lms/main/main.do
- Shin, J., Kiaer, J., & Cha, J. (2013). *The Sounds of Korean*. Cambridge University Press. (referência de fonética; não copiada)
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*, 17(3), 249–255.  
  https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*, 132(3), 354–380.  
  https://doi.org/10.1037/0033-2909.132.3.354
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving students’ learning with effective learning techniques. *Psychological Science in the Public Interest*, 14(1), 4–58.  
  https://doi.org/10.1177/1529100612453266
- Anki. *Getting Started* (referência de SRS).  
  https://docs.ankiweb.net/getting-started.html
- Assimil. *Método Assimil* (inspiração de ciclo passivo/ativo; não é base científica).  
  https://www.assimil.com/en/

**Nota:** as datas e atribuições históricas devem ser conferidas na revisão especializada. O texto do app não deve citar “pesquisa científica” sem link ou referência acessível.
