# Design de exercícios — módulo Hangul

**Status:** especificação concluída; implementação pendente (Fase 3B).
**Objetivo:** definir os nove tipos de exercício do módulo Hangul, como são validados, como dão feedback e como se integram ao player e ao SRS.
**Compatibilidade:** os tipos existentes em `src/lib/exercises` (`mcq`, `cloze`, `build-syllable`, `listen`, `translate`) continuam válidos. Os novos tipos são aditivos; `check(spec, string)` continua funcionando para os antigos.

---

## 1. Princípios

1. **Uma tarefa por item.** O aluno não deve descobrir o que fazer enquanto lê o enunciado.
2. **Resposta verificável.** Todo item tem uma resposta canônica e uma regra de comparação determinística.
3. **Distrator com propósito.** Cada alternativa errada representa um erro previsível, não uma palavra aleatória.
4. **Feedback curto e acionável.** Uma frase explica o erro; no máximo duas.
5. **Áudio é enunciado, não decoração.** Em itens de escuta, o botão de áudio é o centro; o texto coreano fica oculto até a resposta.
6. **Sem reconhecimento de fala.** O MVP não avalia microfone. Produção oral é prática com autoavaliação.
7. **Sem dependência de arrastar.** Ordenar e montar usam toques/botões; arrastar é opcional e nunca o único caminho.
8. **Acessível por teclado e leitor de tela.** Toda interação tem equivalente textual.
9. **Mobile-first.** Alvos ≥ 44 px; nada essencial em hover; uma coluna em 375 px.
10. **Determinístico.** A mesma resposta produz o mesmo resultado, sem aleatoriedade na correção.

---

## 2. Visão geral dos nove tipos

| # | Tipo | ID técnico | O que avalia | Resposta |
|---|---|---|---|---|
| 1 | Reconhecimento | `recognition` | nome/classe/som aproximado de um jamo | escolha |
| 2 | Áudio → caractere | `audio-to-char` | percepção fonêmica + forma | escolha |
| 3 | Caractere → áudio | `char-to-audio` | leitura + associação som-forma | escolha de áudio |
| 4 | Ordenar jamo | `order-jamo` | posição inicial/medial/final | sequência |
| 5 | Montar sílaba | `build-syllable` | composição C+V(+C) | seleção |
| 6 | Par mínimo | `minimal-pair` | contraste fino | escolha |
| 7 | Leitura | `reading` | decodificação + sentido | escolha/autoavaliação |
| 8 | Ordem de traços | `stroke-order` | convenção de escrita | sequência de toques |
| 9 | Sessão SRS | `srs-session` | retenção distribuída | cartões compostos |

**Nota:** `srs-session` não é um `ExerciseSpec`; é um **compositor** de cartões que usa os outros tipos. Os oito primeiros são especificações de item.

---

## 3. Tipo 1 — `recognition`

### 3.1 Objetivo

Verificar conhecimento explícito: a pessoa sabe o nome, a classe ou o som aproximado de um jamo. É o tipo mais fácil e serve para aquecimento, não para avaliar leitura.

### 3.2 Quando usar

- Primeira exposição a um jamo.
- Revisão de jamo isolado.
- Diagnóstico rápido de confusão de nome/classe.

### 3.3 Especificação

```ts
type RecognitionExercise = ExerciseBase & {
  type: "recognition";
  jamo: string;                 // ex.: "ㅓ"
  prompt: string;               // "Qual é o nome deste jamo?"
  options: readonly {
    id: string;
    label: string;              // texto em pt-BR ou coreano
  }[];
  correctOptionId: string;
  skill: "jamo";
  tags: readonly string[];      // ex.: ["vowel:ㅓ"]
};
```

### 3.4 Validação

- Comparar `answer.optionId` com `correctOptionId`.
- Não comparar o texto da alternativa; o ID é estável.
- Se a opção correta não existir, o item é inválido e deve falhar na validação de conteúdo.

### 3.5 Distratores

- Nome de outro jamo visualmente parecido (`ㅓ` vs `ㅗ`).
- Classe errada (vogal vs consoante).
- Som aproximado errado (`ㅓ` como “ó”).
- Nunca usar “todas as anteriores” ou “nenhuma”.

### 3.6 Feedback

- Correto: “Isso. ㅓ é uma vogal simples; o som fica entre ‘ó’ e ‘a’, sem arredondar.”
- Errado: “Você escolheu ㅗ. ㅗ é arredondado; ㅓ não é. Ouça a diferença.”

### 3.7 Acessibilidade

- O jamo tem `aria-label` com nome e categoria.
- Não depender de forma visual apenas; oferecer descrição (“vogal com traço vertical e traço curto à esquerda”).
- Leitor de tela lê a pergunta e as opções.

### 3.8 Exemplo

```json
{
  "id": "h02-e01",
  "type": "recognition",
  "jamo": "ㅓ",
  "prompt": "Qual é o nome deste jamo?",
  "options": [
    { "id": "a", "label": "어" },
    { "id": "b", "label": "오" }
  ],
  "correctOptionId": "a",
  "skill": "jamo",
  "tags": ["vowel:ㅓ"]
}
```

---

## 4. Tipo 2 — `audio-to-char`

### 4.1 Objetivo

Ouvir um som e escolher a forma escrita correspondente. Avalia percepção e memória da forma.

### 4.2 Quando usar

- Depois de apresentar um jamo e seu áudio.
- Em contraste de vogais e consoantes.
- Em revisão SRS.

### 4.3 Especificação

```ts
type AudioToCharExercise = ExerciseBase & {
  type: "audio-to-char";
  audioText: string;            // texto que o TTS/gravação lê
  audioSrc?: string;            // arquivo gravado; se ausente, usa TTS
  options: readonly {
    id: string;
    jamo: string;               // forma exibida
  }[];
  correctOptionId: string;
  skill: "jamo" | "syllable" | "word";
  tags: readonly string[];
};
```

### 4.4 Validação

- Comparar `answer.optionId`.
- Não aceitar texto digitado; o item é de escolha.
- Se `audioSrc` falhar, usar TTS; se ambos falharem, mostrar fallback textual e não contar o item.

### 4.5 Distratores

- Par mínimo (`ㅓ/ㅗ`, `ㅡ/ㅜ`).
- Mesma série, modo diferente (`ㄱ/ㅋ/ㄲ`).
- Forma visualmente parecida (`ㄴ/ㄹ`).

### 4.6 Feedback

- “Você ouviu ㅓ. O ㅗ tem lábios arredondados; ouça de novo e compare.”
- Repetir o áudio automaticamente no feedback? **Não**; oferecer botão “ouvir de novo”.

### 4.7 Acessibilidade

- Botão de áudio com rótulo “Ouvir o som”.
- Transcrição disponível apenas para leitor de tela ou após a resposta.
- Não usar autoplay.

### 4.8 Exemplo

```json
{
  "id": "h02-e05",
  "type": "audio-to-char",
  "prompt": "Qual forma corresponde ao som?",
  "audioText": "어",
  "options": [
    { "id": "a", "jamo": "어" },
    { "id": "b", "jamo": "오" }
  ],
  "correctOptionId": "a",
  "skill": "jamo",
  "tags": ["vowel:ㅓ", "contrast:ㅓ-ㅗ"]
}
```

---

## 5. Tipo 3 — `char-to-audio`

### 5.1 Objetivo

Ver a forma e escolher o áudio correspondente. Avalia leitura e associação forma-som no sentido inverso.

### 5.2 Quando usar

- Depois de `audio-to-char`, para reforçar a associação nos dois sentidos.
- Em sílabas e palavras.
- Em revisão SRS.

### 5.3 Especificação

```ts
type CharToAudioExercise = ExerciseBase & {
  type: "char-to-audio";
  text: string;                 // forma exibida: jamo, sílaba ou palavra
  options: readonly {
    id: string;
    audioText: string;
    audioSrc?: string;
  }[];
  correctOptionId: string;
  skill: "jamo" | "syllable" | "word";
  tags: readonly string[];
};
```

### 5.4 Validação

- Comparar `answer.optionId`.
- Cada opção deve ter áudio distinto e verificável.
- Se dois áudios forem iguais, o item é inválido.

### 5.5 Distratores

- Áudio do par mínimo.
- Áudio com batchim errado.
- Áudio com vogal errada.

### 5.6 Feedback

- “A forma é `국`, com batchim ㄱ. O áudio que você escolheu é `구`, sem final.”
- Tocar o áudio correto e o escolhido, se possível.

### 5.7 Acessibilidade

- Cada opção é um botão “Ouvir opção 1”, “Ouvir opção 2”.
- O texto não pode ser a única pista; o áudio é o conteúdo.
- Para leitor de tela, anunciar “opção 1 de 3” ao focar.

### 5.8 Exemplo

```json
{
  "id": "h18-e09",
  "type": "char-to-audio",
  "prompt": "Qual áudio corresponde a esta sílaba?",
  "text": "국",
  "options": [
    { "id": "a", "audioText": "국" },
    { "id": "b", "audioText": "구" }
  ],
  "correctOptionId": "a",
  "skill": "syllable",
  "tags": ["batchim:ㄱ", "contrast:batchim"]
}
```

---

## 6. Tipo 4 — `order-jamo`

### 6.1 Objetivo

Ordenar os jamo de uma sílaba nas posições inicial, medial e final. Avalia a estrutura do bloco, não a pronúncia.

### 6.2 Quando usar

- `h16`, ao introduzir a mecânica do bloco.
- Correção de erro de posição (batchim no lugar errado).
- Revisão de sílabas com vogal composta.

### 6.3 Especificação

```ts
type OrderJamoExercise = ExerciseBase & {
  type: "order-jamo";
  target: string;               // sílaba alvo, ex.: "강"
  slots: readonly ("initial" | "medial" | "final")[];
  pool: readonly string[];      // jamo disponíveis, incluindo distratores
  correct: readonly string[];   // ordem correta, ex.: ["ㄱ","ㅏ","ㅇ"]
  skill: "syllable";
  tags: readonly string[];
};
```

### 6.4 Validação

- Comparar a sequência de `answer.jamo` com `correct`.
- Normalizar NFC e remover espaços.
- Não aceitar jamo fora do `pool`.
- Se `slots` não tiver `final`, a sequência tem 2 posições.
- A ordem é posicional (inicial → medial → final), não a ordem visual na tela.

### 6.5 Distratores

- Jamo que existe na sílaba, mas em posição errada.
- Jamo visualmente parecido.
- Batchim opcional que não pertence à sílaba.

### 6.6 Feedback

- “A ordem é ㄱ + ㅏ + ㅇ. O ㅇ está no final, não no início.”
- Mostrar o bloco montado após a resposta.

### 6.7 Acessibilidade

- Cada posição é um botão “Escolher inicial”, “Escolher medial”, “Escolher final”.
- Não exigir arrastar.
- Anunciar “posição 1 de 3” e o jamo selecionado.

### 6.8 Exemplo

```json
{
  "id": "h16-e01",
  "type": "order-jamo",
  "prompt": "Ordene os jamo para formar a sílaba 강.",
  "target": "강",
  "slots": ["initial", "medial", "final"],
  "pool": ["ㄱ", "ㅏ", "ㅇ", "ㄴ"],
  "correct": ["ㄱ", "ㅏ", "ㅇ"],
  "skill": "syllable",
  "tags": ["structure:CVC", "batchim:ㅇ"]
}
```

---

## 7. Tipo 5 — `build-syllable`

### 7.1 Objetivo

Compor uma sílaba a partir de um alvo (áudio, imagem ou palavra). Avalia a síntese de jamo, não a ordem de traços.

### 7.2 Quando usar

- `h02`–`h20`, em todas as lições que introduzem jamo.
- Revisão de vogais compostas.
- Checkpoints.

### 7.3 Especificação

```ts
type BuildSyllableExercise = ExerciseBase & {
  type: "build-syllable";
  initial: Initial;             // obrigatório, compatível com o tipo existente
  medial: Medial;
  final?: Final;

  // Campos opcionais para o player interativo:
  target?: string;              // sílaba alvo, ex.: "과"
  audioText?: string;           // se o alvo for apresentado por áudio
  initialOptions?: readonly Initial[];
  medialOptions?: readonly Medial[];
  finalOptions?: readonly Final[]; // inclui "" para "sem batchim"
  skill?: "syllable";
  tags?: readonly string[];
};
```

**Compatibilidade:** o tipo existente `build-syllable` usa `initial`, `medial`, `final` e resposta string. A Fase 3B deve manter esses campos obrigatórios e adicionar apenas os opcionais. O player usa as opções quando existirem; se não existirem, mostra seletores com o inventário completo. **Não** criar um segundo tipo com o mesmo `type`.

### 7.4 Validação

- Derivar `expected = composeSyllable(initial, medial, final ?? "")`.
- Se `target` existir, validar que `target === expected` (NFC). Se não, usar `expected`.
- Comparar a resposta do aluno posição a posição com `initial`/`medial`/`final`.
- Se o aluno montar uma sílaba válida mas diferente do alvo, o erro é de alvo, não de composição; explicar.

### 7.5 Distratores

- Vogal composta errada (`ㅘ` vs `ㅝ`).
- Batchim errado (`ㄴ` vs `ㅇ`).
- Inicial tensa vs simples.

### 7.6 Feedback

- “Você montou `고`. O alvo tem vogal ㅘ: `과`.”
- Mostrar decomposição e áudio.

### 7.7 Acessibilidade

- Três seletores nativos (`select`) ou grupos de botões.
- Não usar combobox customizado sem teclado.
- Anunciar a sílaba montada após cada mudança.

### 7.8 Exemplo

```json
{
  "id": "h13-e09",
  "type": "build-syllable",
  "prompt": "Monte a sílaba 과.",
  "initial": "ㄱ",
  "medial": "ㅘ",
  "final": "",
  "target": "과",
  "initialOptions": ["ㄱ", "ㅋ", "ㄲ"],
  "medialOptions": ["ㅘ", "ㅝ", "ㅏ"],
  "finalOptions": [""],
  "skill": "syllable",
  "tags": ["vowel:ㅘ"]
}
```

---

## 8. Tipo 6 — `minimal-pair`

### 6.1 Objetivo

Discriminar dois sons que diferem em um único traço. É o exercício mais importante para brasileiros, porque força a percepção antes da produção.

### 6.2 Quando usar

- Contraste ㅓ/ㅗ, ㅡ/ㅜ, ㅐ/ㅔ.
- Contraste ㄱ/ㅋ/ㄲ, ㄷ/ㅌ/ㄸ, ㅂ/ㅍ/ㅃ, ㅈ/ㅊ/ㅉ, ㅅ/ㅆ.
- Batchim ㄴ/ㅇ, ㄹ/ㄴ.
- Ligação vs ausência de ligação.

### 6.3 Especificação

```ts
type MinimalPairExercise = ExerciseBase & {
  type: "minimal-pair";
  presentation: "audio" | "text";
  response: "text" | "audio";
  audioText?: string;           // obrigatório se presentation = "audio"
  text?: string;                // obrigatório se presentation = "text"
  options: readonly {
    id: string;
    label: string;              // forma escrita
    audioText?: string;         // áudio da opção, se response = "audio"
  }[];
  correctOptionId: string;
  contrast: {
    feature: string;            // ex.: "aspiration"
    a: string;                  // ex.: "ㄱ"
    b: string;                  // ex.: "ㅋ"
  };
  skill: "contrast";
  tags: readonly string[];
};
```

### 6.4 Validação

- Comparar `answer.optionId`.
- Verificar que as duas opções diferem apenas no traço declarado (validação de conteúdo).
- Se `presentation = "audio"`, o áudio deve ser o único estímulo; o texto fica oculto.
- Se `response = "audio"`, cada opção precisa ter áudio distinto.

### 6.5 Distratores

- O par mínimo real, não uma palavra aleatória.
- Evitar pares que também diferem em vogal ou batchim.
- Para 3 vias, usar três opções, não duas.

### 6.6 Feedback

- “Você escolheu ㄱ, mas o áudio tem sopro: é ㅋ.”
- Tocar os dois áudios em sequência, com rótulos “primeiro” e “segundo”.
- Não dizer “você não ouve”; dizer “a diferença é o sopro”.

### 6.7 Acessibilidade

- Se `presentation = "audio"`, oferecer botão “repetir”.
- Se `response = "audio"`, cada opção é um botão rotulado.
- Para leitor de tela, não anunciar a resposta correta antes da interação.

### 6.8 Exemplo

```json
{
  "id": "h09-e01",
  "type": "minimal-pair",
  "prompt": "Qual sílaba você ouviu?",
  "presentation": "audio",
  "response": "text",
  "audioText": "까",
  "options": [
    { "id": "a", "label": "가" },
    { "id": "b", "label": "까" }
  ],
  "correctOptionId": "b",
  "contrast": { "feature": "tension", "a": "ㄱ", "b": "ㄲ" },
  "skill": "contrast",
  "tags": ["consonant:ㄱ", "consonant:ㄲ", "contrast:ㄱ-ㄲ"]
}
```

---

## 9. Tipo 7 — `reading`

### 7.1 Objetivo

Ler uma palavra ou frase e demonstrar compreensão. Pode ser múltipla escolha (objetivo) ou autoavaliação (subjetivo). **Não** usa reconhecimento de fala.

### 9.2 Quando usar

- `h24` e `h25`.
- Checkpoints.
- Revisão de palavras.
- Leitura de frases curtas.

### 9.3 Especificação

```ts
type ReadingExercise = ExerciseBase & {
  type: "reading";
  text: string;                 // palavra ou frase coreana
  mode: "mcq" | "self-check";
  question?: string;            // ex.: "O que significa?"
  options?: readonly {
    id: string;
    label: string;
  }[];
  correctOptionId?: string;     // obrigatório se mode = "mcq"
  audioText?: string;           // áudio de apoio
  skill: "reading";
  tags: readonly string[];
};
```

### 9.4 Validação

- `mode = "mcq"`: comparar `answer.optionId`.
- `mode = "self-check"`: não há resposta correta; registrar `confidence` e não contar no score.
- O texto deve estar em NFC e dentro do inventário ensinado.
- Se a frase contiver regra ainda não ensinada, o item é inválido ou marcado `sound-only`.

### 9.5 Distratores

- Tradução de outra palavra do mesmo campo semântico.
- Palavra visualmente parecida.
- Significado literal vs uso comum (ex.: `눈` = olho/neve).

### 9.6 Feedback

- “`눈` pode ser ‘olho’ ou ‘neve’. Nesta frase, o contexto é ‘neve’.”
- Para self-check: “Marque como ‘consigo ler’ only se você leu sem romanização.”

### 9.7 Acessibilidade

- O texto coreano tem `lang="ko"`.
- Áudio opcional, nunca obrigatório para responder.
- Para self-check, botões de confiança com rótulos claros.

### 9.8 Exemplo

```json
{
  "id": "h24-e07",
  "type": "reading",
  "prompt": "Leia a palavra e responda.",
  "text": "감사합니다",
  "mode": "mcq",
  "question": "O que significa?",
  "options": [
    { "id": "a", "label": "Obrigado(a)" },
    { "id": "b", "label": "Bom dia" }
  ],
  "correctOptionId": "a",
  "audioText": "감사합니다",
  "skill": "reading",
  "tags": ["word:감사", "rule:nasalization"]
}
```

---

## 10. Tipo 8 — `stroke-order`

### 10.1 Objetivo

Familiarizar com a ordem convencional dos traços. **Não** avalia caligrafia, pressão, proporção ou desenho livre. A resposta é uma sequência de toques em traços numerados.

### 10.2 Quando usar

- Opcional em `h01`–`h10`, como prática.
- Nunca como item de aprovação.
- Nunca em checkpoint.

### 10.3 Especificação

```ts
type StrokeOrderExercise = ExerciseBase & {
  type: "stroke-order";
  jamo: string;
  strokes: readonly {
    id: string;
    path: string;               // SVG path ou dado de desenho
    label: string;              // "traço 1", "traço 2"
  }[];
  correctOrder: readonly string[];
  mode: "tap-order";
  skill: "writing";
  tags: readonly string[];
};
```

### 10.4 Validação

- Comparar `answer.taps` com `correctOrder`.
- Cada traço só pode ser tocado uma vez.
- Se faltar traço, o item fica incompleto; não contar como acerto.
- A ordem é determinística; não aceitar ordens alternativas no MVP.
- Convenções de ordem variam por escola; o item deve declarar a convenção usada e ser marcado para revisão.

### 10.5 Distratores

- Não há alternativas; o erro é a ordem.
- O feedback mostra a sequência correta animada (respeitando `prefers-reduced-motion`).

### 10.6 Feedback

- “O traço horizontal vem antes do vertical neste jamo.”
- Mostrar a sequência com números, sem animação se o usuário preferir.

### 10.7 Acessibilidade

- Equivalente textual: “Toque nos traços na ordem 1, 2, 3”.
- Não exigir precisão de desenho.
- Se o usuário não puder tocar, oferecer lista de botões “traço 1”, “traço 2”.
- Não usar cor como única indicação de progresso.

### 10.8 Exemplo

```json
{
  "id": "h01-e06",
  "type": "stroke-order",
  "prompt": "Toque nos traços na ordem correta.",
  "jamo": "ㄷ",
  "strokes": [
    { "id": "s1", "path": "M10 10 H40", "label": "traço 1" },
    { "id": "s2", "path": "M10 10 V40 H40", "label": "traço 2" }
  ],
  "correctOrder": ["s1", "s2"],
  "mode": "tap-order",
  "skill": "writing",
  "tags": ["jamo:ㄷ", "stroke-order"]
}
```

**Pendência:** os caminhos SVG e a ordem exata de cada jamo precisam de revisão de um professor de coreano. Não publicar como “ordem oficial” sem fonte.

---

## 11. Tipo 9 — `srs-session`

### 11.1 Objetivo

Compor uma sessão de revisão espaçada com cartões vencidos, misturando tipos e conteúdos.

### 11.2 Especificação

```ts
type ReviewCard = {
  key: string;                  // ex.: "h:jamo:v:ㅓ"
  lessonId: string;
  skill: "jamo" | "syllable" | "word" | "rule" | "reading";
  tags: readonly string[];
  exercise: ExerciseSpec;       // um dos oito tipos acima
};

type ReviewSession = {
  cards: readonly ReviewCard[];
  maxCards: number;             // padrão 20
  newCards: number;             // máximo de cartões novos
};
```

### 11.3 Seleção

1. Buscar cartões vencidos em `Progress.cards` (`due <= now`).
2. Ordenar por `due` ascendente e embaralhar Empates.
3. Limitar a 20.
4. Se houver menos de 5, incluir cartões novos até 5, respeitando o limite de 6 novos por lição.
5. Intercalar tipos: não mostrar 5 jamo isolados seguidos; alternar jamo, sílaba, palavra, regra.

### 11.4 Validação e nota

- Cada cartão usa `checkAnswer`.
- `correct` → `leitner.review(state, "correct", now)`.
- `again` → `leitner.review(state, "again", now)`.
- O resultado da sessão é agregado, mas não altera `Progress.lessons`.
- Cartões errados voltam para a caixa 1 e podem reaparecer na mesma sessão se houver tempo; no MVP, no máximo uma reapresentação.

### 11.5 Feedback

- Igual ao tipo do cartão.
- No fim: “X de Y cartões”, “próxima revisão: data”.
- Não mostrar “você esqueceu” como julgamento; mostrar “este cartão volta amanhã”.

### 11.6 Acessibilidade

- Sessão pausável; progresso local descartável.
- Botão “sair” sempre visível.
- Não usar timer.

---

## 12. Modelo de resposta e correção

### 12.1 União de respostas

```ts
export type ExerciseAnswer =
  | { kind: "choice"; optionId: string }
  | { kind: "text"; value: string }
  | { kind: "jamo-order"; jamo: readonly string[] }
  | { kind: "syllable"; initial: string; medial: string; final?: string }
  | { kind: "tap-order"; taps: readonly string[] }
  | { kind: "self-check"; confidence: "low" | "medium" | "high" };
```

### 12.2 Resultado

```ts
export type CheckResult = {
  correct: boolean;
  expected: string;             // representação legível da resposta correta
  explanation?: string;
  errorTags?: readonly string[];
};
```

### 12.3 `checkAnswer`

```ts
export function checkAnswer(
  spec: ExerciseSpec,
  answer: ExerciseAnswer,
): CheckResult;
```

Regras:

- Normalizar texto com NFC, `trim`, colapsar espaços.
- Para coreano, não aplicar `toLowerCase` (não há maiúsculas), mas aplicar para pt-BR quando o campo for tradução.
- `choice`: comparar `optionId`.
- `text`: comparar com `answer` e `acceptedAnswers`, na ordem; usar a mesma normalização do `check` atual.
- `jamo-order`: comparar sequência exata.
- `syllable`: compor com `composeSyllable` e comparar com o alvo.
- `tap-order`: comparar sequência exata.
- `self-check`: sempre `correct: true`, mas `scored: false` (campo adicional) para não inflar o score.

### 12.4 Compatibilidade com `check`

O `check(spec, answer: string)` atual continua existindo como wrapper:

```ts
export function check(spec: ExerciseSpec, answer: string): CheckResult {
  return checkAnswer(spec, { kind: "text", value: answer });
}
```

- Para `mcq`, o wrapper compara o texto da opção? O comportamento atual compara `correctAnswer`. Manter.
- Para os novos tipos, `check` não é usado; o player chama `checkAnswer`.
- Nenhum teste existente pode quebrar.

### 12.5 Invariantes

- Um item tem exatamente uma resposta correta.
- `acceptedAnswers` só existe para variações ortográficas legítimas, nunca para erros.
- Um item com `mode: "self-check"` não entra no denominador do score.
- Um item de áudio sem áudio válido não é contado.
- Um item com duas opções corretas é rejeitado na validação de conteúdo.

---

## 13. Feedback

### 13.1 Estrutura

1. **Resultado:** “Correto” ou “Ainda não”.
2. **Resposta:** mostrar a forma correta.
3. **Explicação:** uma frase sobre o traço.
4. **Ação:** “Ouvir de novo”, “Tentar de novo” ou “Continuar”.

### 13.2 Exemplos

- **Correto:** “Isso: `국` tem batchim ㄱ. O som final é [k̚], sem vogal.”
- **Errado:** “Você escolheu `구`, que não tem batchim. `국` fecha a boca no final.”
- **Errado (contraste):** “O áudio tem sopro; é `ㅋ`, não `ㄱ`.”
- **Errado (vogal):** “`ㅓ` não é ‘ó’. Tente sem arredondar os lábios.”

### 13.3 O que evitar

- “Errado!” sozinho.
- “Você é ruim nisso.”
- “É fácil.”
- “A pronúncia correta é...” sem ressalva de variação.
- Texto longo; máximo 2 frases.

---

## 14. Pontuação e progressão

- Cada item vale 1 ponto.
- O score da lição é `acertos / itens obrigatórios`.
- A primeira tentativa conta para o score; repetir na mesma sessão não aumenta o score, mas pode liberar a próxima lição.
- Itens de autoavaliação e `stroke-order` não contam para aprovação.
- Lição: 80% para liberar a próxima.
- Checkpoint: 80% para concluir; abaixo, plano de revisão.
- O progresso guarda o maior score, não o último.
- Erros geram `errorTags` e cartões SRS.

---

## 15. Fluxo do player

| Etapa | Tempo | Conteúdo | Regra |
|---|---|---|---|
| Retomada | 30–60 s | 1–2 cartões vencidos | pulável? não; pode adiar |
| Apresentação | 1–2 min | 2–4 telas | áudio manual |
| Prática guiada | 2–3 min | 3–5 itens | dica disponível |
| Prática independente | 2–3 min | 4–6 itens | sem dica |
| Recuperação | 1 min | 2–3 itens | itens errados ou novos |
| Fechamento | 30 s | score + próximos passos | botão “continuar” |

**Regras:**
- A pessoa não pode pular a prática sem responder.
- Sair no meio não salva score; salva apenas rascunho local, se necessário.
- O botão “próxima lição” só aparece se o critério foi atingido.
- O app não usa timer nem pressão de velocidade.

---

## 16. Acessibilidade

- Contraste AA; não usar cor como única indicação de acerto/erro.
- Alvos ≥ 44×44 px; espaçamento entre alternativas.
- Foco visível; navegação por teclado em todos os controles.
- `lang="ko"` em todo texto coreano; `lang="pt-BR"` no restante.
- Áudio com rótulo e transcrição opcional; nunca autoplay.
- Respeitar `prefers-reduced-motion` na animação de traços.
- Leitor de tela: anunciar pergunta, opções e resultado; não anunciar a resposta antes da interação.
- Zoom 200% sem perda de conteúdo; sem scroll horizontal em 375 px.
- Não depender de hover, drag ou gesto de pinça.

---

## 17. Mobile

- Uma coluna; alternativas empilhadas.
- Botão de áudio fixo no topo do card, sem cobrir conteúdo.
- Ação primária no rodapé, respeitando `safe-area-inset-bottom`.
- Evitar teclado virtual em itens de escolha; usar botões.
- Em `order-jamo` e `build-syllable`, usar seletores nativos ou botões, não drag.
- Testar em 375×667 e 390×844; sem overflow.

---

## 18. Plano de testes

### 18.1 Unitários por tipo

- Resposta correta.
- Resposta errada.
- Normalização NFC.
- Variação aceita (quando documentada).
- Item inválido (duas corretas, opção inexistente, áudio ausente).
- `checkAnswer` com `answer` de tipo errado retorna erro controlado, não exceção.

### 18.2 Conteúdo

- Todos os jamo cobertos.
- DAG sem ciclo.
- Exemplos usam apenas jamo ensinados.
- Nenhuma romanização após `h15`.
- Round-trip de composição/decomposição.
- Nenhum item com duas respostas corretas.
- Nenhum `reviewed` sem revisor.

### 18.3 E2E

- Fluxo de lição completa em 375 px.
- Áudio indisponível → fallback textual.
- SRS: cartão vencido aparece; resposta errada volta para caixa 1.
- Checkpoint: 80% libera; abaixo, mostra revisão.
- Teclado: tabula por todas as opções e responde.
- Leitor de tela: smoke manual.

### 18.4 Fixtures

- Criar `tests/fixtures/hangul.ts` com lições mínimas e respostas.
- Não usar conteúdo de produção nos testes de unidade; usar fixtures pequenas.
- Testes de conteúdo podem varrer `src/content/hangul`.

---

## 19. Checklist de autoria

Antes de considerar um item pronto:

- [ ] O objetivo está claro em uma frase.
- [ ] A resposta correta é única.
- [ ] Os distratores representam erros previsíveis.
- [ ] O áudio (se houver) foi ouvido e está correto.
- [ ] O texto coreano está em NFC e usa jamo ensinados.
- [ ] A explicação tem no máximo 2 frases.
- [ ] O item funciona sem hover/drag.
- [ ] O item funciona com teclado.
- [ ] O item tem `skill` e `tags`.
- [ ] O item está `in-review`.
- [ ] Não há romanização após `h15`.
- [ ] Não há duas interpretações possíveis.
- [ ] O item não copia conteúdo de terceiros.

---

## 20. Referências

- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*, 17(3), 249–255.  
  https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*, 132(3), 354–380.  
  https://doi.org/10.1037/0033-2909.132.3.354
- Dunlosky, J., et al. (2013). Improving students’ learning with effective learning techniques. *Psychological Science in the Public Interest*, 14(1), 4–58.  
  https://doi.org/10.1177/1529100612453266
- Anki. *Getting Started*.  
  https://docs.ankiweb.net/getting-started.html
- WCAG 2.2. W3C.  
  https://www.w3.org/TR/WCAG22/

**Nota:** as decisões de UX e de tipos de exercício são hipóteses de design; não foram testadas com usuários do KBR. O plano de testes acima verifica consistência, não eficácia pedagógica.