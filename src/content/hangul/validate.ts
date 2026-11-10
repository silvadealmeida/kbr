import { composeSyllable, decomposeSyllable, isHangulSyllable, isInitial, isMedial } from "@/lib/hangul";
import { parseSrsCardKey } from "@/lib/srs";
import type {
  Curriculum,
  JamoRecord,
  Lesson,
  ReviewMeta,
  SyllableRecord,
  WordRecord,
} from "./types";

export type ContentIssue = {
  severity: "error" | "warning";
  code: string;
  path: string;
  message: string;
};

const LESSON_ID = /^h\d{2}$/;
const CHECKPOINT_ID = /^c[1-4]$/;
const JAMO_SYMBOL = /^[\u3131-\u318E]$/;
const KOREAN = /[\u3131-\u318E\uAC00-\uD7A3]/;
const CONJOINING_JAMO = /[\u1100-\u11FF\uA960-\uA97F\uD7B0-\uD7FF]/;

function error(issues: ContentIssue[], code: string, path: string, message: string) {
  issues.push({ severity: "error", code, path, message });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function checkReview(issues: ContentIssue[], path: string, review: ReviewMeta) {
  if (!isRecord(review)) {
    error(issues, "review-missing", path, "Todo item de conteúdo precisa de `review`.");
    return;
  }
  if (review.status !== "draft" && review.status !== "in-review" && review.status !== "reviewed") {
    error(issues, "review-status-invalid", path, `Status de revisão inválido: ${String(review.status)}.`);
  }
  if (review.status === "reviewed") {
    if (!review.reviewedBy) {
      error(issues, "review-author-missing", path, "`reviewed` exige `reviewedBy`.");
    }
    if (!review.reviewedAt || Number.isNaN(Date.parse(review.reviewedAt))) {
      error(issues, "review-date-missing", path, "`reviewed` exige `reviewedAt` em ISO 8601.");
    }
  }
}

function checkNfc(issues: ContentIssue[], path: string, value: string) {
  if (value !== value.normalize("NFC")) {
    error(issues, "not-nfc", path, "O texto coreano precisa estar em NFC.");
  }
  if (CONJOINING_JAMO.test(value)) {
    error(issues, "conjoining-jamo", path, "Use jamo de compatibilidade, não conjoining jamo.");
  }
}

function checkJamoRecord(issues: ContentIssue[], path: string, jamo: JamoRecord) {
  checkReview(issues, `${path}.review`, jamo.review);
  checkNfc(issues, `${path}.symbol`, jamo.symbol);

  if (!JAMO_SYMBOL.test(jamo.symbol)) {
    error(issues, "jamo-symbol", `${path}.symbol`, "Símbolo fora da faixa de compatibilidade Hangul.");
  }
  if (jamo.kind === "consonant" && !isInitial(jamo.symbol)) {
    error(issues, "jamo-kind", `${path}.kind`, `"${jamo.symbol}" não é uma consoante inicial válida.`);
  }
  if (jamo.kind === "vowel" && !isMedial(jamo.symbol)) {
    error(issues, "jamo-kind", `${path}.kind`, `"${jamo.symbol}" não é uma vogal válida.`);
  }
  if (!jamo.nameKo || !jamo.namePt) {
    error(issues, "jamo-name", path, "Todo jamo precisa de nome em coreano e em português.");
  }
  if (jamo.ipa.length === 0) {
    error(issues, "jamo-ipa", `${path}.ipa`, "Informe ao menos uma realização fonética.");
  }
}

function checkSyllable(
  issues: ContentIssue[],
  path: string,
  syllable: SyllableRecord,
  lessonIds: Set<string>,
) {
  checkReview(issues, `${path}.review`, syllable.review);
  checkNfc(issues, `${path}.text`, syllable.text);
  if (!lessonIds.has(syllable.introducedIn)) {
    error(issues, "unknown-lesson", `${path}.introducedIn`, `Lição inexistente: ${syllable.introducedIn}.`);
  }
  if (!isHangulSyllable(syllable.text)) {
    error(issues, "syllable-text", `${path}.text`, "`text` precisa ser exatamente uma sílaba Hangul.");
    return;
  }
  const expected = composeSyllable(syllable.initial, syllable.medial, syllable.final);
  if (expected !== syllable.text) {
    error(
      issues,
      "syllable-composition",
      path,
      `A composição ${syllable.initial}+${syllable.medial}+${syllable.final || "∅"} gera ${expected}, não ${syllable.text}.`,
    );
  }
}

function checkWord(
  issues: ContentIssue[],
  path: string,
  word: WordRecord,
  lessonIds: Set<string>,
  syllables: Map<string, SyllableRecord>,
) {
  checkReview(issues, `${path}.review`, word.review);
  checkNfc(issues, `${path}.ko`, word.ko);
  if (!lessonIds.has(word.introducedIn)) {
    error(issues, "unknown-lesson", `${path}.introducedIn`, `Lição inexistente: ${word.introducedIn}.`);
  }
  if (![...word.ko].every(isHangulSyllable)) {
    error(issues, "word-text", `${path}.ko`, "Palavras devem conter apenas sílabas Hangul.");
  }
  if (word.syllables.join("") !== word.ko) {
    error(issues, "word-syllables", `${path}.syllables`, "As sílabas não concatenam exatamente `ko`.");
  }
  for (const text of word.syllables) {
    if (!syllables.has(text)) {
      error(issues, "word-unknown-syllable", `${path}.syllables`, `Sílaba "${text}" não existe no registro.`);
    }
  }
  if (!word.pt.trim()) {
    error(issues, "word-translation", `${path}.pt`, "Informe uma tradução curta em português.");
  }
}

function lessonOrder(curriculum: Curriculum): Map<string, number> {
  return new Map(curriculum.lessons.map((lesson, index) => [lesson.id, index]));
}

/** Verifica se todo jamo usado em `text` já foi ensinado até `maxOrder`. */
function checkTaughtText(
  issues: ContentIssue[],
  path: string,
  text: string,
  maxOrder: number,
  label: string,
  order: Map<string, number>,
  jamoBySymbol: Map<string, JamoRecord>,
) {
  checkNfc(issues, path, text);
  for (const char of text) {
    if (char === " ") continue;
    const parts = decomposeSyllable(char);
    if (!parts) {
      if (KOREAN.test(char)) {
        error(issues, "text-not-syllable", path, `"${char}" não é uma sílaba Hangul pré-composta.`);
      }
      continue;
    }
    const used = [parts.initial, parts.medial, ...(parts.final ? [parts.final] : [])];
    for (const symbol of used) {
      const record = jamoBySymbol.get(symbol);
      if (!record) {
        error(issues, "untaught-jamo", path, `O jamo "${symbol}" não existe no registro.`);
        continue;
      }
      const introduced = order.get(record.introducedIn);
      if (introduced === undefined || introduced > maxOrder) {
        error(
          issues,
          "example-uses-untaught-jamo",
          path,
          `"${text}" usa ${symbol}, ensinado em ${record.introducedIn}, depois de ${label}.`,
        );
      }
    }
  }
}

type ExerciseScope = {
  idPrefix: string;
  maxOrder: number;
  label: string;
};

function checkExercise(
  issues: ContentIssue[],
  path: string,
  exercise: Lesson["exercises"][number],
  scope: ExerciseScope,
  order: Map<string, number>,
  jamoBySymbol: Map<string, JamoRecord>,
  syllableByText: Map<string, SyllableRecord>,
  wordByKo: Map<string, WordRecord>,
) {
  const idPath = `${path}[${exercise.id}]`;
  if (!exercise.id.startsWith(scope.idPrefix)) {
    error(issues, "exercise-id", `${idPath}.id`, `O ID deve começar com ${scope.idPrefix}.`);
  }
  if (!exercise.prompt.trim()) {
    error(issues, "exercise-prompt", `${idPath}.prompt`, "O enunciado não pode ficar vazio.");
  }

  const cards = exercise.srsCards ?? [];
  if (new Set(cards).size !== cards.length) {
    error(issues, "duplicate-srs-card", `${idPath}.srsCards`, "Há chaves SRS repetidas no mesmo item.");
  }
  for (const key of cards) {
    const ref = parseSrsCardKey(key);
    if (!ref) {
      error(issues, "srs-card-key", `${idPath}.srsCards`, `Chave SRS inválida: ${key}.`);
      continue;
    }
    if (ref.kind === "jamo-consonant" || ref.kind === "jamo-vowel") {
      const record = jamoBySymbol.get(ref.value);
      if (!record) {
        error(issues, "srs-card-jamo", `${idPath}.srsCards`, `Jamo desconhecido no cartão: ${ref.value}.`);
      } else if ((order.get(record.introducedIn) ?? Infinity) > scope.maxOrder) {
        error(
          issues,
          "srs-card-untaught",
          `${idPath}.srsCards`,
          `O cartão ${key} usa conteúdo ensinado depois de ${scope.label}.`,
        );
      }
    }
    if (ref.kind === "syllable" && !syllableByText.has(ref.value)) {
      error(issues, "srs-card-syllable", `${idPath}.srsCards`, `Sílaba desconhecida no cartão: ${ref.value}.`);
    }
    if (ref.kind === "word" && !wordByKo.has(ref.value)) {
      error(issues, "srs-card-word", `${idPath}.srsCards`, `Palavra desconhecida no cartão: ${ref.value}.`);
    }
  }

  const uniqueIds = (options: readonly { id: string }[] | undefined, field: string) => {
    if (!options) return;
    const ids = options.map((option) => option.id);
    if (new Set(ids).size !== ids.length) {
      error(issues, "duplicate-option-id", `${idPath}.${field}`, "Há IDs de alternativa repetidos.");
    }
  };

  switch (exercise.type) {
    case "mcq": {
      if (new Set(exercise.options).size !== exercise.options.length) {
        error(issues, "duplicate-option", `${idPath}.options`, "Há alternativas repetidas.");
      }
      if (!exercise.options.includes(exercise.correctAnswer)) {
        error(issues, "missing-correct-option", `${idPath}.correctAnswer`, "A resposta correta não está nas alternativas.");
      }
      break;
    }
    case "build-syllable": {
      const target = composeSyllable(exercise.initial, exercise.medial, exercise.final);
      if (exercise.target && exercise.target.normalize("NFC") !== target) {
        error(issues, "build-target", `${idPath}.target`, `O alvo deveria ser ${target}.`);
      }
      if (exercise.initialOptions && !exercise.initialOptions.includes(exercise.initial)) {
        error(issues, "build-option", `${idPath}.initialOptions`, "A consoante correta não está nas opções.");
      }
      if (exercise.medialOptions && !exercise.medialOptions.includes(exercise.medial)) {
        error(issues, "build-option", `${idPath}.medialOptions`, "A vogal correta não está nas opções.");
      }
      if (exercise.finalOptions && !exercise.finalOptions.includes(exercise.final ?? "")) {
        error(issues, "build-option", `${idPath}.finalOptions`, "O final correto não está nas opções.");
      }
      if (exercise.final && scope.maxOrder < (order.get("h17") ?? Number.POSITIVE_INFINITY)) {
        error(issues, "batchim-before-h17", `${idPath}.final`, "Batchim só entra a partir de h17.");
      }
      break;
    }
    case "audio-to-char": {
      uniqueIds(exercise.options, "options");
      if (!exercise.options.some((option) => option.id === exercise.correctOptionId)) {
        error(issues, "missing-correct-option", `${idPath}.correctOptionId`, "A alternativa correta não existe.");
      }
      if (!exercise.options.every((option) => option.jamo.trim())) {
        error(issues, "option-jamo", `${idPath}.options`, "Toda alternativa precisa exibir um jamo/sílaba.");
      }
      if (!exercise.audioText.trim()) {
        error(issues, "audio-text", `${idPath}.audioText`, "Item de áudio precisa de `audioText`.");
      }
      if (!exercise.fallback.trim()) {
        error(issues, "audio-fallback", `${idPath}.fallback`, "Item de áudio precisa de fallback textual.");
      }
      checkTaughtText(issues, `${idPath}.audioText`, exercise.audioText, scope.maxOrder, scope.label, order, jamoBySymbol);
      break;
    }
    case "char-to-audio": {
      uniqueIds(exercise.options, "options");
      if (!exercise.options.some((option) => option.id === exercise.correctOptionId)) {
        error(issues, "missing-correct-option", `${idPath}.correctOptionId`, "A alternativa correta não existe.");
      }
      const audioTexts = exercise.options.map((option) => option.audioText);
      if (new Set(audioTexts).size !== audioTexts.length) {
        error(issues, "duplicate-audio", `${idPath}.options`, "As alternativas precisam ter áudios distintos.");
      }
      if (!exercise.options.every((option) => option.label.trim())) {
        error(issues, "option-label", `${idPath}.options`, "Toda alternativa precisa de descrição textual.");
      }
      checkTaughtText(issues, `${idPath}.text`, exercise.text, scope.maxOrder, scope.label, order, jamoBySymbol);
      break;
    }
    case "minimal-pair": {
      uniqueIds(exercise.options, "options");
      if (!exercise.options.some((option) => option.id === exercise.correctOptionId)) {
        error(issues, "missing-correct-option", `${idPath}.correctOptionId`, "A alternativa correta não existe.");
      }
      if (exercise.presentation === "audio") {
        if (!exercise.audioText?.trim()) {
          error(issues, "audio-text", `${idPath}.audioText`, "Apresentação em áudio exige `audioText`.");
        }
        if (!exercise.fallback?.trim()) {
          error(issues, "audio-fallback", `${idPath}.fallback`, "Apresentação em áudio exige fallback.");
        }
        checkTaughtText(issues, `${idPath}.audioText`, exercise.audioText ?? "", scope.maxOrder, scope.label, order, jamoBySymbol);
      } else {
        if (!exercise.text?.trim()) {
          error(issues, "pair-text", `${idPath}.text`, "Apresentação em texto exige `text`.");
        }
        checkTaughtText(issues, `${idPath}.text`, exercise.text ?? "", scope.maxOrder, scope.label, order, jamoBySymbol);
      }
      if (!exercise.contrast.feature || !exercise.contrast.a || !exercise.contrast.b) {
        error(issues, "pair-contrast", `${idPath}.contrast`, "Descreva o contraste entre os dois sons.");
      }
      break;
    }
    case "reading": {
      checkTaughtText(issues, `${idPath}.text`, exercise.text, scope.maxOrder, scope.label, order, jamoBySymbol);
      if (exercise.mode === "mcq") {
        if (!exercise.question?.trim()) {
          error(issues, "reading-question", `${idPath}.question`, "Leitura com MCQ exige pergunta.");
        }
        if (!exercise.options || exercise.options.length < 2) {
          error(issues, "reading-options", `${idPath}.options`, "Leitura com MCQ exige ao menos duas alternativas.");
        }
        uniqueIds(exercise.options, "options");
        if (!exercise.correctOptionId || !exercise.options?.some((option) => option.id === exercise.correctOptionId)) {
          error(issues, "missing-correct-option", `${idPath}.correctOptionId`, "A alternativa correta não existe.");
        }
      } else if (exercise.correctOptionId) {
        error(issues, "self-check-option", `${idPath}.correctOptionId`, "Self-check não tem alternativa correta.");
      }
      break;
    }
    default:
      break;
  }
}

/**
 * Validação determinística da fatia implementada do currículo. Não lança:
 * retorna todos os problemas encontrados. `assertCurriculum` lança com os erros.
 */
export function validateCurriculum(curriculum: Curriculum): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const order = lessonOrder(curriculum);

  if (curriculum.version !== 1) {
    error(issues, "version", "version", "A versão do conteúdo precisa ser 1.");
  }

  const lessonIds = new Set<string>();
  let previousOrder = -1;
  for (const [index, lesson] of curriculum.lessons.entries()) {
    const path = `lessons[${index}]`;
    checkReview(issues, `${path}.review`, lesson.review);

    if (!LESSON_ID.test(lesson.id)) {
      error(issues, "lesson-id", `${path}.id`, `ID de lição inválido: ${lesson.id}.`);
    }
    if (lessonIds.has(lesson.id)) {
      error(issues, "duplicate-lesson", `${path}.id`, `Lição duplicada: ${lesson.id}.`);
    }
    lessonIds.add(lesson.id);

    const currentOrder = order.get(lesson.id)!;
    if (currentOrder < previousOrder) {
      error(issues, "lesson-order", `${path}.id`, "As lições precisam estar em ordem curricular.");
    }
    previousOrder = currentOrder;

    if (!Number.isInteger(lesson.unit) || lesson.unit < 1 || lesson.unit > 7) {
      error(issues, "lesson-unit", `${path}.unit`, "Unidade precisa estar entre 1 e 7.");
    }
    if (!Number.isInteger(lesson.estimatedMinutes) || lesson.estimatedMinutes < 5 || lesson.estimatedMinutes > 8) {
      error(issues, "lesson-duration", `${path}.estimatedMinutes`, "Duração estimada precisa ficar entre 5 e 8 minutos.");
    }
    if (lesson.completion.minScore < 0 || lesson.completion.minScore > 100) {
      error(issues, "completion-score", `${path}.completion.minScore`, "A nota mínima precisa ficar entre 0 e 100.");
    }
    if (lesson.objectives.length === 0) {
      error(issues, "lesson-objectives", `${path}.objectives`, "Liste ao menos um objetivo de aprendizagem.");
    }
    if (lesson.intro.length === 0) {
      error(issues, "lesson-intro", `${path}.intro`, "A lição precisa de telas de apresentação.");
    }
    for (const [panelIndex, panel] of lesson.intro.entries()) {
      if (!panel.title.trim() || !panel.body.trim()) {
        error(issues, "lesson-panel", `${path}.intro[${panelIndex}]`, "Título e texto da apresentação são obrigatórios.");
      }
      if (panel.ko) checkNfc(issues, `${path}.intro[${panelIndex}].ko`, panel.ko);
    }

    for (const prerequisite of lesson.prerequisites) {
      const prerequisiteOrder = order.get(prerequisite);
      if (prerequisiteOrder === undefined) {
        error(issues, "unknown-prerequisite", `${path}.prerequisites`, `Pré-requisito inexistente: ${prerequisite}.`);
      } else if (prerequisiteOrder >= currentOrder) {
        error(issues, "prerequisite-order", `${path}.prerequisites`, `O pré-requisito ${prerequisite} precisa vir antes de ${lesson.id}.`);
      }
    }

    if (lesson.exercises.length === 0) {
      error(issues, "lesson-exercises", `${path}.exercises`, "A lição precisa de exercícios.");
    }
    const localIds = new Set(lesson.exercises.map((exercise) => exercise.id));
    for (const requiredId of lesson.completion.requiredExerciseIds ?? []) {
      if (!localIds.has(requiredId)) {
        error(issues, "required-exercise", `${path}.completion.requiredExerciseIds`, `Exercício obrigatório inexistente: ${requiredId}.`);
      }
    }

    const ruleIds = new Set<string>();
    for (const rule of lesson.completion.rules ?? []) {
      if (!rule.id.trim() || ruleIds.has(rule.id)) {
        error(issues, "completion-rule-id", `${path}.completion.rules`, `Regra de conclusão inválida ou repetida: ${rule.id}.`);
      }
      ruleIds.add(rule.id);
      if (!rule.label.trim()) {
        error(issues, "completion-rule-label", `${path}.completion.rules`, "Toda regra de conclusão precisa de rótulo.");
      }
      if (rule.exerciseIds.length === 0 || rule.minCorrect < 1 || rule.minCorrect > rule.exerciseIds.length) {
        error(
          issues,
          "completion-rule-range",
          `${path}.completion.rules[${rule.id}]`,
          "A regra precisa de itens e de um mínimo de acertos válido.",
        );
      }
      for (const exerciseId of rule.exerciseIds) {
        if (!localIds.has(exerciseId)) {
          error(issues, "completion-rule-exercise", `${path}.completion.rules[${rule.id}]`, `Exercício inexistente na regra: ${exerciseId}.`);
        }
      }
    }
  }

  const exerciseIds = new Set<string>();
  for (const [index, lesson] of curriculum.lessons.entries()) {
    for (const exercise of lesson.exercises) {
      if (exerciseIds.has(exercise.id)) {
        error(issues, "duplicate-exercise", `lessons[${index}].exercises[${exercise.id}].id`, "ID de exercício repetido no currículo.");
      }
      exerciseIds.add(exercise.id);
    }
  }

  const jamoBySymbol = new Map<string, JamoRecord>();
  for (const [index, jamo] of curriculum.jamo.entries()) {
    const path = `jamo[${index}]`;
    checkJamoRecord(issues, path, jamo);
    if (jamoBySymbol.has(jamo.symbol)) {
      error(issues, "duplicate-jamo", `${path}.symbol`, `Jamo duplicado: ${jamo.symbol}.`);
    }
    jamoBySymbol.set(jamo.symbol, jamo);
    if (!order.has(jamo.introducedIn)) {
      error(issues, "unknown-lesson", `${path}.introducedIn`, `Lição inexistente: ${jamo.introducedIn}.`);
    }
  }

  const introducedJamo = new Map<string, string>();
  for (const lesson of curriculum.lessons) {
    for (const symbol of lesson.newJamo) {
      const previous = introducedJamo.get(symbol);
      if (previous) {
        error(issues, "reintroduced-jamo", `lessons[${lesson.id}].newJamo`, `${symbol} já foi introduzido em ${previous}.`);
      }
      introducedJamo.set(symbol, lesson.id);
      const record = jamoBySymbol.get(symbol);
      if (!record) {
        error(issues, "unknown-jamo", `lessons[${lesson.id}].newJamo`, `"${symbol}" não existe no registro de jamo.`);
      } else if (record.introducedIn !== lesson.id) {
        error(issues, "jamo-lesson-mismatch", `lessons[${lesson.id}].newJamo`, `${symbol} está registrado como introduzido em ${record.introducedIn}.`);
      }
    }
  }
  for (const jamo of curriculum.jamo) {
    if (!introducedJamo.has(jamo.symbol)) {
      error(issues, "jamo-not-introduced", `jamo[${jamo.symbol}]`, `O jamo ${jamo.symbol} não aparece em nenhuma lição.`);
    }
  }

  const syllableByText = new Map<string, SyllableRecord>();
  for (const [index, syllable] of curriculum.syllables.entries()) {
    const path = `syllables[${index}]`;
    checkSyllable(issues, path, syllable, lessonIds);
    if (syllableByText.has(syllable.text)) {
      error(issues, "duplicate-syllable", `${path}.text`, `Sílaba duplicada: ${syllable.text}.`);
    }
    syllableByText.set(syllable.text, syllable);
  }

  const ids = new Set<string>();
  for (const [index, syllable] of curriculum.syllables.entries()) {
    if (ids.has(syllable.id)) {
      error(issues, "duplicate-id", `syllables[${index}].id`, `ID duplicado: ${syllable.id}.`);
    }
    ids.add(syllable.id);
  }
  const wordByKo = new Map<string, WordRecord>();
  for (const [index, word] of curriculum.words.entries()) {
    const path = `words[${index}]`;
    checkWord(issues, path, word, lessonIds, syllableByText);
    if (ids.has(word.id)) {
      error(issues, "duplicate-id", `${path}.id`, `ID duplicado: ${word.id}.`);
    }
    ids.add(word.id);
    wordByKo.set(word.ko, word);
  }

  for (const lesson of curriculum.lessons) {
    for (const [index, ref] of lesson.examples.entries()) {
      const path = `lessons[${lesson.id}].examples[${index}]`;
      const exists =
        ref.kind === "syllable"
          ? curriculum.syllables.some((syllable) => syllable.id === ref.id)
          : curriculum.words.some((word) => word.id === ref.id);
      if (!exists) {
        error(issues, "unknown-example", path, `Exemplo inexistente: ${ref.id}.`);
      }
    }
    const maxOrder = order.get(lesson.id)!;
    for (const [index, exercise] of lesson.exercises.entries()) {
      checkExercise(
        issues,
        `lessons[${lesson.id}].exercises[${index}]`,
        exercise,
        { idPrefix: `${lesson.id}-e`, maxOrder, label: lesson.id },
        order,
        jamoBySymbol,
        syllableByText,
        wordByKo,
      );
    }
  }

  for (const [index, word] of curriculum.words.entries()) {
    const wordOrder = order.get(word.introducedIn);
    if (wordOrder !== undefined) {
      checkTaughtText(
        issues,
        `words[${index}].ko`,
        word.ko,
        wordOrder,
        word.introducedIn,
        order,
        jamoBySymbol,
      );
    }
  }

  for (const [index, checkpoint] of curriculum.checkpoints.entries()) {
    const path = `checkpoints[${index}]`;
    checkReview(issues, `${path}.review`, checkpoint.review);
    if (!CHECKPOINT_ID.test(checkpoint.id)) {
      error(issues, "checkpoint-id", `${path}.id`, `ID de checkpoint inválido: ${checkpoint.id}.`);
    }
    if (!checkpoint.title.trim() || !checkpoint.objective.trim()) {
      error(issues, "checkpoint-copy", path, "Checkpoint precisa de título e objetivo.");
    }
    if (checkpoint.instructions.length === 0) {
      error(issues, "checkpoint-instructions", `${path}.instructions`, "Liste as instruções do checkpoint.");
    }
    if (checkpoint.exercises.length < 15) {
      error(issues, "checkpoint-exercises", `${path}.exercises`, "O checkpoint precisa de pelo menos 15 itens.");
    }
    if (checkpoint.passingScore < 0 || checkpoint.passingScore > 100) {
      error(issues, "checkpoint-score", `${path}.passingScore`, "A nota do checkpoint precisa ficar entre 0 e 100.");
    }
    if (
      !Number.isInteger(checkpoint.estimatedMinutes) ||
      checkpoint.estimatedMinutes < 15 ||
      checkpoint.estimatedMinutes > 20
    ) {
      error(issues, "checkpoint-duration", `${path}.estimatedMinutes`, "O checkpoint dura entre 15 e 20 minutos.");
    }

    let maxOrder = -1;
    for (const lessonId of checkpoint.lessonIds) {
      const target = curriculum.lessons.find((item) => item.id === lessonId);
      if (!target) {
        error(issues, "unknown-lesson", `${path}.lessonIds`, `Lição inexistente: ${lessonId}.`);
      } else if (target.unit > checkpoint.unit) {
        error(
          issues,
          "checkpoint-unit",
          `${path}.lessonIds`,
          `${lessonId} pertence a uma unidade posterior à do checkpoint ${checkpoint.id}.`,
        );
      } else {
        maxOrder = Math.max(maxOrder, order.get(lessonId)!);
      }
    }

    for (const [exerciseIndex, exercise] of checkpoint.exercises.entries()) {
      if (exerciseIds.has(exercise.id)) {
        error(issues, "duplicate-exercise", `${path}.exercises[${exercise.id}].id`, "ID de exercício repetido no currículo.");
      }
      exerciseIds.add(exercise.id);
      checkExercise(
        issues,
        `${path}.exercises[${exerciseIndex}]`,
        exercise,
        { idPrefix: `${checkpoint.id}-e`, maxOrder, label: checkpoint.id },
        order,
        jamoBySymbol,
        syllableByText,
        wordByKo,
      );
    }
  }

  for (const [index, rule] of curriculum.rules.entries()) {
    const path = `rules[${index}]`;
    checkReview(issues, `${path}.review`, rule.review);
    if (!["h21", "h22", "h23"].includes(rule.introducedIn)) {
      error(issues, "rule-lesson", `${path}.introducedIn`, "Regras de fronteira entram em h21, h22 ou h23.");
    }
  }

  return issues;
}

export function assertCurriculum(curriculum: Curriculum): void {
  const errors = validateCurriculum(curriculum).filter((issue) => issue.severity === "error");
  if (errors.length === 0) return;
  const formatted = errors.map((issue) => `${issue.path}: ${issue.message} (${issue.code})`).join("\n");
  throw new Error(`Currículo Hangul inválido:\n${formatted}`);
}
