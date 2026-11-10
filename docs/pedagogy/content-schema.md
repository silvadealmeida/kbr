# Schema de conteúdo — módulo Hangul

**Status:** especificação concluída; implementação pendente (Fase 3B).
**Objetivo:** definir os tipos TypeScript, a separação entre conteúdo estático e dados do usuário, a compatibilidade com o código existente e as invariantes que impedem conteúdo inválido.
**Princípio:** **nenhuma migração de banco, nenhuma mudança em auth, sync, RLS ou `Progress` v1.**

---

## 1. O que muda e o que não muda

### Muda

- Novo diretório `src/content/hangul/` com dados estáticos.
- Novos tipos em `src/lib/exercises` para os exercícios do módulo.
- Nova função `checkAnswer(spec, answer)`; `check(spec, string)` continua.
- Novas funções puras em `src/lib/hangul`: `decomposeSyllable`, `isHangulText`, `normalizeHangul`.
- Novos testes de conteúdo em `tests/content/`.

### Não muda

- `Progress` v1 (`v`, `lessons`, `cards`, `history`, `streak`, `dailyGoal`, `lastActive`).
- `LessonProgress` (`done`, `score` 0–100).
- `Attempt` (`exerciseId`, `correct`, `at`).
- `SrsState` (`box`, `due`) e o scheduler Leitner.
- `mergeProgress`, `createSyncedProgressStore`, `createSupabaseProgressStore`.
- Migração SQL, RLS, auth, cookies, rotas.
- Nenhuma coluna nova, nenhum `Progress` v2, nenhum `localStorage` fora de `lib/storage`.

**Regra:** se uma feature exigir mudar `Progress`, ela não pertence à Fase 3B. Propor uma fase separada.

---

## 2. Estrutura de arquivos recomendada

```
src/
  content/
    hangul/
      types.ts              # tipos do conteúdo
      jamo.ts               # 19 consoantes + 21 vogais
      syllables.ts          # sílabas de exemplo
      words.ts              # palavras de exemplo
      rules.ts              # ligação, nasalização, aspiração
      lessons/
        h01.ts ... h25.ts   # uma lição por arquivo
        index.ts            # registro ordenado
      checkpoints/
        c1.ts ... c4.ts
        index.ts
      index.ts              # exporta o currículo completo
      validate.ts           # validação pura do currículo
  lib/
    hangul/
      index.ts              # funções puras (compose, decompose, isHangulText)
    exercises/
      index.ts              # tipos + check + checkAnswer
tests/
  content/
    hangul.test.ts          # invariantes do currículo
  exercises.test.ts         # compatibilidade + novos tipos
  hangul.test.ts            # funções puras
```

**Decisões:**
- Não criar um `src/types/` global; os tipos de conteúdo ficam junto do conteúdo.
- `src/content/hangul/types.ts` pode importar tipos de `src/lib/exercises` e `src/lib/hangul`; o contrário não pode acontecer (evitar ciclo).
- Dados estáticos não importam React, storage, Supabase ou TTS.
- Nenhuma chamada de rede no carregamento do conteúdo.

---

## 3. Tipos de domínio

### 3.1 Status de revisão

```ts
export type ContentStatus = "draft" | "in-review" | "reviewed";

export type ReviewMeta = {
  status: ContentStatus;
  reviewedBy?: string;   // obrigatório se status = "reviewed"
  reviewedAt?: string;   // ISO 8601, obrigatório se status = "reviewed"
  notes?: string;
};
```

**Invariante:** `reviewed` sem `reviewedBy` e `reviewedAt` é inválido. Na Fase 3A, todo conteúdo é `in-review`; não existe `reviewed` sem revisão humana registrada.

### 3.2 Jamo

```ts
import type { Final, Initial, Medial } from "@/lib/hangul";

export type JamoRecord = {
  symbol: string;                 // "ㄱ", "ㅏ"
  kind: "consonant" | "vowel";
  nameKo: string;                 // "기역"
  namePt: string;                 // "giyeok"
  ipa: readonly string[];         // ["[k]", "[ɡ]"] — várias realizações
  introducedIn: string;           // "h04"
  tags: readonly string[];        // ["plain", "velar"]
  notes?: string;                 // ex.: ㅇ inicial mudo vs final [ŋ]
  review: ReviewMeta;
};
```

**Invariantes:**
- `symbol` é um jamo de compatibilidade (U+3131–U+318E).
- `kind` corresponde ao inventário (`INITIALS`/`MEDIALS`).
- `introducedIn` existe em `lessons`.
- Cada jamo aparece uma vez, exceto ㅇ, que tem dois registros? **Não.** Um único registro para ㅇ, com `notes` explicando os dois papéis. A validação de “introduzido uma vez” conta o símbolo, não a função.

### 3.3 Sílabas

```ts
export type SyllableRecord = {
  id: string;                     // "syl:가"
  text: string;                   // "가"
  initial: Initial;
  medial: Medial;
  final: Final;
  introducedIn: string;
  audioText?: string;
  review: ReviewMeta;
};
```

**Invariantes:**
- `text` é uma única sílaba Hangul (U+AC00–U+D7A3).
- `composeSyllable(initial, medial, final) === text` após NFC.
- `introducedIn` existe.
- `id` é único e estável.

### 3.4 Palavras

```ts
export type WordRecord = {
  id: string;                     // "word:고기"
  ko: string;                     // "고기"
  pt: string;                     // "carne"
  syllables: readonly string[];   // ["고", "기"]
  introducedIn: string;
  tags: readonly string[];        // ["noun", "food"]
  audioText?: string;
  notes?: string;                 // polissemia, registro, empréstimo
  review: ReviewMeta;
};
```

**Invariantes:**
- `ko` está em NFC e contém apenas sílabas Hangul (sem jamo solto, sem hanja).
- `syllables` concatena exatamente `ko`.
- `pt` é uma tradução curta; se ambígua, usar `notes`.
- `introducedIn` existe e todos os jamo de `ko` já foram ensinados até essa lição, salvo `sound-only`.

### 3.5 Regras

```ts
export type RuleRecord = {
  id: string;                     // "rule:liaison"
  kind: "liaison" | "nasalization" | "aspiration" | "batchim";
  title: string;
  explanation: string;            // 1–2 frases
  introducedIn: string;           // "h21"
  examples: readonly {
    written: string;              // "한국어"
    spoken: string;               // "한구거"
    note?: string;
  }[];
  review: ReviewMeta;
};
```

**Invariantes:**
- `introducedIn` é `h21`, `h22` ou `h23` para as três regras de fronteira.
- Nenhuma regra é referenciada por exercício anterior à sua lição.
- `spoken` é uma representação legível, não IPA obrigatório; pode usar a forma “한구거”.

### 3.6 Lições

```ts
export type ExampleRef = {
  kind: "word" | "syllable";
  id: string;                     // "word:고기" | "syl:가"
};

export type Lesson = {
  id: string;                     // "h01" ... "h25"
  unit: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  objective: string;              // 1 frase
  prerequisites: readonly string[];
  newJamo: readonly string[];     // símbolos introduzidos
  newFinals: readonly Exclude<Final, "">[];
  examples: readonly ExampleRef[];
  exercises: readonly ExerciseSpec[];
  estimatedMinutes: number;       // 5–8
  completion: {
    minScore: number;             // 80
    requiredExerciseIds?: readonly string[];
  };
  review: ReviewMeta;
};
```

**Invariantes:**
- `id` no formato `h` + dois dígitos, único.
- `unit` entre 1 e 7.
- `prerequisites` são IDs existentes e anteriores.
- `newJamo` não repete um jamo já introduzido em lição anterior.
- `newFinals` não repete um final já introduzido; `""` não é um final novo.
- `examples` referenciam registros existentes.
- `estimatedMinutes` entre 5 e 8.
- `completion.minScore` entre 0 e 100; o padrão é 80.
- `exercises` não vazio; IDs únicos no currículo inteiro.

### 3.7 Checkpoints

```ts
export type Checkpoint = {
  id: string;                     // "c1" ... "c4"
  unit: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  lessonIds: readonly string[];
  exercises: readonly ExerciseSpec[];
  passingScore: number;           // 80
  diagnosticTags: readonly string[];
  review: ReviewMeta;
};
```

**Invariantes:**
- `lessonIds` são lições existentes da mesma unidade.
- `exercises` não introduzem jamo novo.
- `passingScore` entre 0 e 100.
- IDs únicos no currículo inteiro.

### 3.8 Currículo

```ts
export type Curriculum = {
  version: 1;
  lessons: readonly Lesson[];
  checkpoints: readonly Checkpoint[];
  jamo: readonly JamoRecord[];
  syllables: readonly SyllableRecord[];
  words: readonly WordRecord[];
  rules: readonly RuleRecord[];
};
```

**Invariante:** `version: 1` é a versão do **conteúdo**, não do `Progress`. Não confundir com `Progress.v`.

---

## 4. Exercícios: extensão compatível

### 4.1 Estado atual

`src/lib/exercises/index.ts` define:

```ts
export type ExerciseSpec =
  | MultipleChoiceExercise
  | ClozeExercise
  | BuildSyllableExercise
  | ListenExercise
  | TranslateExercise;
```

`check(spec, answer: string)` trata `mcq`, `build-syllable` e os tipos textuais. Os testes existentes comparam o resultado exato de `check` com `toEqual`, então **não adicionar campos ao retorno de `check`**.

### 4.2 Novos tipos

Adicionar à união:

```ts
export type RecognitionExercise = ExerciseBase & {
  type: "recognition";
  jamo: string;
  options: readonly { id: string; label: string }[];
  correctOptionId: string;
  skill: "jamo";
  tags: readonly string[];
};

export type AudioToCharExercise = ExerciseBase & {
  type: "audio-to-char";
  audioText: string;
  audioSrc?: string;
  options: readonly { id: string; jamo: string }[];
  correctOptionId: string;
  skill: "jamo" | "syllable" | "word";
  tags: readonly string[];
};

export type CharToAudioExercise = ExerciseBase & {
  type: "char-to-audio";
  text: string;
  options: readonly { id: string; audioText: string; audioSrc?: string }[];
  correctOptionId: string;
  skill: "jamo" | "syllable" | "word";
  tags: readonly string[];
};

export type OrderJamoExercise = ExerciseBase & {
  type: "order-jamo";
  target: string;
  slots: readonly ("initial" | "medial" | "final")[];
  pool: readonly string[];
  correct: readonly string[];
  skill: "syllable";
  tags: readonly string[];
};

export type MinimalPairExercise = ExerciseBase & {
  type: "minimal-pair";
  presentation: "audio" | "text";
  response: "text" | "audio";
  audioText?: string;
  text?: string;
  options: readonly { id: string; label: string; audioText?: string }[];
  correctOptionId: string;
  contrast: { feature: string; a: string; b: string };
  skill: "contrast";
  tags: readonly string[];
};

export type ReadingExercise = ExerciseBase & {
  type: "reading";
  text: string;
  mode: "mcq" | "self-check";
  question?: string;
  options?: readonly { id: string; label: string }[];
  correctOptionId?: string;
  audioText?: string;
  skill: "reading";
  tags: readonly string[];
};

export type StrokeOrderExercise = ExerciseBase & {
  type: "stroke-order";
  jamo: string;
  strokes: readonly { id: string; path: string; label: string }[];
  correctOrder: readonly string[];
  mode: "tap-order";
  skill: "writing";
  tags: readonly string[];
};
```

### 4.3 `build-syllable` estendido

O tipo existente **não muda** nos campos obrigatórios:

```ts
export type BuildSyllableExercise = ExerciseBase & {
  type: "build-syllable";
  initial: Initial;
  medial: Medial;
  final?: Final;

  // Novos campos opcionais para o player interativo:
  target?: string;
  initialOptions?: readonly Initial[];
  medialOptions?: readonly Medial[];
  finalOptions?: readonly Final[];
  skill?: "syllable";
  tags?: readonly string[];
};
```

**Por quê:** `check(spec, string)` continua derivando a resposta de `initial`/`medial`/`final`. O player usa as opções quando existirem; se não existirem, mostra seletores com o inventário completo.

**Invariante:** se `target` existir, `composeSyllable(initial, medial, final) === target`. Se `initialOptions` existir, `initial` está nela. O mesmo para medial/final.

### 4.4 União final

```ts
export type ExerciseSpec =
  | MultipleChoiceExercise
  | ClozeExercise
  | BuildSyllableExercise
  | ListenExercise
  | TranslateExercise
  | RecognitionExercise
  | AudioToCharExercise
  | CharToAudioExercise
  | OrderJamoExercise
  | MinimalPairExercise
  | ReadingExercise
  | StrokeOrderExercise;
```

**Cuidado:** `ExerciseBase` já tem `id`, `prompt`, `explanation?`. Não duplicar `id` nos novos tipos.

---

## 5. Respostas e correção

### 5.1 União

```ts
export type ExerciseAnswer =
  | { kind: "choice"; optionId: string }
  | { kind: "text"; value: string }
  | { kind: "jamo-order"; jamo: readonly string[] }
  | { kind: "syllable"; initial: Initial; medial: Medial; final?: Final }
  | { kind: "tap-order"; taps: readonly string[] }
  | { kind: "self-check"; confidence: "low" | "medium" | "high" };
```

### 5.2 Resultado detalhado

```ts
export type DetailedCheckResult = {
  correct: boolean;
  expected: string;
  explanation?: string;
  errorTags?: readonly string[];
  scored?: boolean;               // false para self-check
};

export function checkAnswer(
  spec: ExerciseSpec,
  answer: ExerciseAnswer,
): DetailedCheckResult;
```

### 5.3 `check` preservado

```ts
export function check(spec: ExerciseSpec, answer: string): CheckResult {
  const result = checkAnswer(spec, { kind: "text", value: answer });
  return {
    correct: result.correct,
    expected: result.expected,
    explanation: result.explanation,
  };
}
```

**Invariante:** `check` retorna exatamente `{ correct, expected, explanation? }`. Não adicionar `errorTags` nem `scored` ao retorno de `check`, para não quebrar `toEqual` nos testes existentes.

### 5.4 Normalização

```ts
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");
}
```

- Para coreano, `toLocaleLowerCase` não altera nada.
- Para traduções em pt-BR, minúsculas são aceitas.
- **Não** remover acentos de respostas em coreano; em pt-BR, `acceptedAnswers` pode incluir variantes sem acento, se forem ortograficamente aceitáveis. Não usar isso para mascarar erro.
- **Não** aceitar jamo conjoining; normalizar NFC e validar a faixa.

### 5.5 Regras por tipo

| Tipo | `answer.kind` | Comparação |
|---|---|---|
| `mcq` | `text` | texto da opção (`correctAnswer`) |
| `cloze` | `text` | `answer` + `acceptedAnswers` |
| `listen` | `text` | `answer` + `acceptedAnswers` |
| `translate` | `text` | `answer` + `acceptedAnswers` |
| `build-syllable` | `syllable` ou `text` | compor e comparar |
| `recognition` | `choice` | `optionId` |
| `audio-to-char` | `choice` | `optionId` |
| `char-to-audio` | `choice` | `optionId` |
| `order-jamo` | `jamo-order` | sequência |
| `minimal-pair` | `choice` | `optionId` |
| `reading` (mcq) | `choice` | `optionId` |
| `reading` (self-check) | `self-check` | sempre `scored: false` |
| `stroke-order` | `tap-order` | sequência |

**Erro de tipo de resposta:** retornar `{ correct: false, expected, explanation: "Resposta incompatível com o exercício." }` e registrar `errorTags: ["answer-kind"]`. Não lançar exceção no player.

---

## 6. Compatibilidade com `Progress`

### 6.1 Mapeamento de lições

- IDs `h01`…`h25` são as chaves de `Progress.lessons`.
- Checkpoints usam `c1`…`c4` **na mesma estrutura** `LessonProgress`, para não criar um campo novo.
- `score` é **0–100** (o validador atual de `isProgress` exige esse intervalo).
- `done` é `true` quando o critério da lição/checkpoint foi atingido.
- O maior score é preservado; não sobrescrever com um score menor.

```ts
progress.lessons["h07"] = { done: true, score: 90 };
progress.lessons["c1"] = { done: true, score: 85 };
```

**Por que não criar `checkpoints`:** `Progress` é validado por `isProgress`; adicionar campo exigiria migração e quebraria snapshots antigos. Reutilizar `lessons` é compatível e suficiente.

### 6.2 Cartões SRS

| Tipo | Chave | Exemplo |
|---|---|---|
| Jamo | `h:jamo:c:<símbolo>` | `h:jamo:c:ㄱ` |
| Vogal | `h:jamo:v:<símbolo>` | `h:jamo:v:ㅏ` |
| Sílaba | `h:syl:<sílaba>` | `h:syl:가` |
| Palavra | `h:word:<palavra>` | `h:word:고기` |
| Regra | `h:rule:<regra>` | `h:rule:liaison` |

- A chave é estável; não mudar depois de lançada.
- `SrsState` continua `{ box, due }`.
- `leitner.review` e `leitner.due` não mudam.
- O conteúdo estático mapeia `cardKey` → `exercise` para montar a sessão.

### 6.3 Histórico

`Progress.history` continua:

```ts
type Attempt = { exerciseId: string; correct: boolean; at: string };
```

- `exerciseId` é o ID do exercício (`h07-e03`, `c2-e11`).
- O vínculo com jamo/tags é derivado do currículo estático, não persistido.
- `deriveMastery(progress, curriculum)` percorre `history`, encontra o exercício no registro e agrega por tag.
- Exercícios antigos sem registro são ignorados (`unknown`), sem quebrar.

### 6.4 `mergeProgress`

Nenhuma mudança:

- Lições: `done` por OR; `score` por máximo.
- Cartões: por `due`/`box` conforme o lado mais recente.
- Histórico: união por `exerciseId + at + correct`.
- Streak: máximo.
- `lastActive`: lado mais recente.

**Invariante:** checkpoints em `lessons` também se beneficiam do merge por máximo. Não é necessário código novo.

### 6.5 Domínio derivado (não persistido)

```ts
export type MasteryLevel = "new" | "learning" | "familiar" | "mastered";

export type MasteryEntry = {
  correct: number;
  attempts: number;
  days: number;                   // dias distintos com tentativa
  accuracy: number;               // 0–1
  box: number;                    // 0 se não houver cartão
  level: MasteryLevel;
};

export type LearnerMastery = Record<string, MasteryEntry>;
```

**Hipótese de design (não persistir):**

- `new`: nenhuma tentativa.
- `learning`: 1–2 acertos, ou accuracy < 80%.
- `familiar`: ≥ 3 acertos em ≥ 2 dias distintos, accuracy ≥ 80%.
- `mastered`: ≥ 5 acertos em ≥ 3 dias distintos, accuracy ≥ 90%, box ≥ 4.

**Por que derivar:** evita migração, funciona com dados antigos e permite ajustar limiares sem quebrar snapshots. Os limiares são hipótese; validar com usuários.

**Implementação:** `src/lib/mastery/derive.ts` (novo, puro), com `now` injetado apenas se necessário para “dias distintos”. Não persistir.

---

## 7. Validação do currículo

### 7.1 API

```ts
export type ContentIssue = {
  severity: "error" | "warning";
  code: string;
  path: string;
  message: string;
};

export function validateCurriculum(curriculum: Curriculum): ContentIssue[];

export function assertCurriculum(curriculum: Curriculum): void;
```

- `validateCurriculum` não lança; retorna lista.
- `assertCurriculum` lança `Error` com os erros formatados; usado em testes e no build.
- `warnings` não bloqueiam, mas aparecem no relatório.

### 7.2 Invariantes obrigatórias

**Estrutura**
- `version === 1`.
- IDs únicos em lições, checkpoints, jamo, sílabas, palavras, regras e exercícios.
- Lições ordenadas `h01`…`h25`; checkpoints `c1`…`c4`.
- `unit` entre 1 e 7.
- `prerequisites` existem e são anteriores.
- DAG sem ciclo.
- Checkpoints referenciam lições existentes da mesma unidade.
- `estimatedMinutes` entre 5 e 8.
- `minScore`/`passingScore` entre 0 e 100; padrão 80.

**Cobertura**
- Todos os 19 iniciais e 21 mediais aparecem em `jamo` e em `newJamo` de alguma lição.
- Todos os 16 finais simples e 11 duplos aparecem em `newFinals` ou em `rules`/`syllables` documentados.
- Cada jamo é introduzido exatamente uma vez (exceto ㅇ, um registro com dois papéis).
- Nenhum jamo é avaliado antes de ser introduzido.

**Texto coreano**
- Todo texto está em NFC.
- Toda sílaba está entre U+AC00 e U+D7A3.
- Jamo solto usa compatibilidade (U+3131–U+318E).
- Rejeitar conjoining jamo (U+1100–U+11FF) em conteúdo avaliado.
- Rejeitar o ponto arcaico U+318D e letras históricas fora do inventário.
- `composeSyllable`/`decomposeSyllable` fazem round-trip.
- Palavras não misturam hanja, latim ou pontuação interna, salvo `notes`.

**Pedagogia**
- Exemplos usam apenas jamo ensinados até a lição; exceções `sound-only` com áudio.
- Nenhum exercício de ligação antes de `h21`.
- Nenhum exercício de nasalização antes de `h22`.
- Nenhum exercício de aspiração antes de `h23`.
- Nenhum exercício de tensificação/lateralização como alvo.
- Nenhuma romanização em enunciado, alternativa ou resposta após `h15`.
- `self-check` não entra no denominador.
- `stroke-order` é prática e não entra em checkpoint; `scored: false`.
- Cada lição tem pelo menos 6 exercícios; cada checkpoint, pelo menos 15.

**Exercícios**
- `correctOptionId` existe em `options`.
- Não há duas opções corretas.
- `order-jamo.correct` usa apenas `pool`.
- `build-syllable` compõe `target`.
- `char-to-audio` tem áudios distintos.
- `reading` com `mode: "mcq"` tem `correctOptionId`.
- `reading` com `mode: "self-check"` não tem `correctOptionId`.
- `stroke-order.correctOrder` usa apenas `strokes`.
- Todo item de áudio tem `audioText` e fallback.

**Revisão**
- `status` é `draft`, `in-review` ou `reviewed`.
- `reviewed` exige `reviewedBy` e `reviewedAt` válidos.
- Na Fase 3A, nenhum item é `reviewed`.
- Todo item tem `review` (não usar status solto).

### 7.3 Quando rodar

- Em `npm test` (teste dedicado).
- No build, se o custo for aceitável; caso contrário, em CI.
- Antes de cada commit que altera conteúdo.
- Em um script `scripts/validate-content.ts` (opcional), para rodar manualmente.

### 7.4 Exemplo de issue

```json
{
  "severity": "error",
  "code": "example-uses-untaught-jamo",
  "path": "lessons.h05.examples[2]",
  "message": "A palavra '지도' usa ㅈ, que só é ensinado em h06."
}
```

---

## 8. Separação conteúdo × usuário

| Dado | Onde vive | Mutável? | Sincroniza? |
|---|---|---|---|
| Lições, jamo, palavras, regras | `src/content/hangul` | não (build) | não |
| Progresso de lição | `Progress.lessons` (local/Supabase) | sim | sim |
| Cartões SRS | `Progress.cards` | sim | sim |
| Histórico | `Progress.history` | sim (append) | sim |
| Domínio derivado | memória | não persistido | não |
| Sessão de lição em andamento | memória/local descartável | sim | não |
| Preferências de áudio | estado de UI | sim | não (MVP) |

**Regra:** conteúdo não importa `lib/storage`; storage não importa conteúdo. O player faz a ponte.

---

## 9. Ordem de implementação da Fase 3B

1. **Tipos e jamo:** criar `src/content/hangul/types.ts` e `jamo.ts` com os 40 jamo; validar com teste.
2. **Funções puras:** adicionar `decomposeSyllable`, `isHangulText`, `normalizeHangul` em `src/lib/hangul`; testes de round-trip.
3. **Exercícios:** adicionar tipos novos e `checkAnswer`; manter `check`; rodar testes existentes.
4. **Conteúdo inicial:** `h01`–`h10` + `c1`; validar DAG, cobertura e exemplos.
5. **Player:** uma rota `/hangul` funcional, com lição, áudio, feedback e progresso.
6. **SRS:** criar cartões ao concluir; sessão de revisão; reutilizar `leitner`.
7. **Checkpoints:** `c1` com diagnóstico por tag.
8. **Conteúdo restante:** `h11`–`h25` + `c2`–`c4`.
9. **Validação:** `validateCurriculum` no teste; corrigir issues.
10. **Acessibilidade e e2e:** 375 px, teclado, áudio fallback, checkpoints.
11. **Revisão humana:** status `in-review`; não declarar `reviewed` sem revisor.

**Não fazer:**
- Não criar tabela nova.
- Não mudar `Progress.v`.
- Não mudar `Attempt`.
- Não adicionar `checkpoints` ao `Progress`.
- Não usar `localStorage` direto.
- Não importar conteúdo no servidor se isso criar dependência de browser.
- Não usar `"use client"` em módulos de conteúdo puro.

---

## 10. Critérios de aceite técnicos

- `npm run typecheck` verde.
- `npm test` verde, incluindo testes antigos de `check`.
- `npm run build` verde.
- `validateCurriculum` sem erros.
- Nenhuma alteração em `supabase/migrations`, auth ou sync.
- `Progress` v1 validado por `isProgress`.
- Nenhum item `reviewed` sem revisor.
- Nenhuma romanização após `h15`.
- 375 px sem overflow; alvos ≥ 44 px.

---

## 11. Referências

- Código existente: `src/lib/hangul/index.ts`, `src/lib/exercises/index.ts`, `src/lib/storage/index.ts`, `src/lib/srs/leitner.ts`.
- Documentos irmãos: `curriculum.md`, `hangul.md`, `pronunciation-ptbr.md`, `exercise-design.md`.
- TypeScript Handbook — unions e narrowing: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- Unicode Hangul syllables: https://www.unicode.org/charts/PDF/UAC00.pdf

**Nota:** os tipos acima são uma proposta; a implementação pode ajustar nomes desde que preserve as invariantes e a compatibilidade com `Progress` v1. Qualquer desvio deve ser registrado em `docs/architecture.md`.