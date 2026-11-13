import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseSpec } from "@/lib/exercises";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";
import type {
  CourseCheckpointContent,
  CourseExerciseStage,
  CourseLessonContent,
  CourseLessonExercise,
  CourseProductionTask,
  CourseReadingText,
} from "../course-types";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type AdvancedExerciseDraft = DistributiveOmit<ExerciseSpec, "id" | "tags">;

type BuilderOptions = {
  review: ReviewMeta;
  newVocabIdsFor: (lessonId: string) => readonly string[];
  sentenceIdsFor: (lessonId: string) => readonly string[];
};

function tagsFor(id: string, type: ExerciseSpec["type"]): readonly string[] {
  const lesson = id.includes("-e") ? id.slice(0, id.indexOf("-e")) : id;
  const diagnostic =
    type === "listen"
      ? "diag:listening"
      : type === "reading"
        ? "diag:reading"
        : type === "translate"
          ? "diag:writing"
          : "diag:grammar";
  return [diagnostic, lesson, type];
}

function buildExercise(
  lessonId: string,
  draft: AdvancedExerciseDraft,
  index: number,
  stage: CourseExerciseStage,
): CourseLessonExercise {
  const id = `${lessonId}-e${String(index + 1).padStart(2, "0")}`;
  const exercise = {
    ...draft,
    id,
    stage,
    tags: tagsFor(id, draft.type),
  } as CourseLessonExercise;

  if (exercise.type === "listen" && !/frase completa/i.test(exercise.prompt)) {
    exercise.prompt = `${exercise.prompt} Escreva a frase completa que ouvir.`;
  }

  if (
    exercise.type === "cloze" ||
    exercise.type === "listen" ||
    exercise.type === "translate"
  ) {
    const existing = exercise.acceptedAnswers ?? [];
    const variants = terminalPunctuationVariants(exercise.answer).filter(
      (variant) =>
        !sameAnswerText(variant, exercise.answer) &&
        !existing.some((accepted) => sameAnswerText(accepted, variant)),
    );
    if (variants.length > 0) {
      exercise.acceptedAnswers = [...existing, ...variants];
    }
  }

  return exercise;
}

export function mcq(
  prompt: string,
  options: readonly string[],
  correctAnswer: string,
  explanation: string,
): AdvancedExerciseDraft {
  return { type: "mcq", prompt, options, correctAnswer, explanation };
}

export function cloze(
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): AdvancedExerciseDraft {
  return {
    type: "cloze",
    prompt,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
  };
}

export function listen(
  prompt: string,
  audioText: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): AdvancedExerciseDraft {
  return {
    type: "listen",
    prompt,
    audioText,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
  };
}

export function translate(
  direction: "ko-pt" | "pt-ko",
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): AdvancedExerciseDraft {
  return {
    type: "translate",
    direction,
    prompt,
    answer,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    explanation,
  };
}

export function reading(
  text: string,
  question: string,
  options: readonly string[],
  correctAnswer: string,
  explanation: string,
): AdvancedExerciseDraft {
  const index = options.findIndex((option) => option === correctAnswer);
  return {
    type: "reading",
    text,
    mode: "mcq",
    prompt: question,
    question,
    options: options.map((label, optionIndex) => ({ id: `o${optionIndex + 1}`, label })),
    correctOptionId: index >= 0 ? `o${index + 1}` : "o1",
    explanation,
  };
}

function normalizeProduction(task: CourseProductionTask): CourseProductionTask {
  if (!task.sample) return task;
  if (/não é gabarito|não copie/i.test(task.sample.notePt)) return task;
  return {
    ...task,
    sample: {
      ...task.sample,
      notePt: `${task.sample.notePt} Exemplo ilustrativo; não é gabarito.`,
    },
  };
}

type ReadingInput = {
  titlePt: string;
  paragraphs: readonly string[];
  pt: string;
  objective: string;
};

type LessonInput = Omit<
  CourseLessonContent,
  "vocabulary" | "completion" | "dialogue" | "grammar" | "exercises" | "review" | "readingText"
> & {
  intro: readonly { title: string; body: string; ko?: string }[];
  dialogue: readonly (readonly [speaker: string, ko: string, pt: string])[];
  readingText: ReadingInput;
  reusedIds: readonly string[];
  grammar: readonly (readonly [
    titlePt: string,
    form: string,
    explanationPt: string,
    examples: readonly (readonly [ko: string, pt: string])[],
  ])[];
  guided: readonly AdvancedExerciseDraft[];
  independent: readonly AdvancedExerciseDraft[];
  summary: readonly string[];
  production: CourseProductionTask;
};

/**
 * Monta uma lição C1/C2 com IDs determinísticos, leitura longa e produção
 * aberta. O construtor não decide qualidade linguística: apenas garante a
 * estrutura comum e deixa o texto pedagógico explícito no arquivo da lição.
 */
export function defineAdvancedLesson(
  input: LessonInput,
  options: BuilderOptions,
): CourseLessonContent {
  const {
    dialogue,
    grammar,
    guided,
    independent,
    reusedIds,
    intro,
    readingText,
    summary,
    production,
    ...rest
  } = input;
  const exercises = [
    ...guided.map((draft, index) => buildExercise(input.id, draft, index, "guided")),
    ...independent.map((draft, index) =>
      buildExercise(input.id, draft, guided.length + index, "independent"),
    ),
  ];

  const anchor: CourseReadingText = {
    ...readingText,
    review: options.review,
  };

  return {
    ...rest,
    intro,
    dialogue: dialogue.map(([speaker, ko, pt], index) => ({
      id: `${input.id}-d${index + 1}`,
      speaker,
      ko,
      pt,
      audioText: ko,
      review: options.review,
    })),
    readingText: anchor,
    grammar: grammar.map(([titlePt, form, explanationPt, examples], index) => ({
      id: `${input.id}-g${index + 1}`,
      titlePt,
      form,
      explanationPt,
      examples: examples.map(([ko, pt]) => ({ ko, pt, audioText: ko })),
      review: options.review,
    })),
    vocabulary: {
      newIds: options.newVocabIdsFor(input.id),
      reusedIds,
      sentenceIds: options.sentenceIdsFor(input.id),
    },
    exercises,
    summary,
    production: normalizeProduction(production),
    completion: { minScore: 80, minCorrect: 8 },
    review: options.review,
  };
}

type CheckpointInput = Omit<
  CourseCheckpointContent,
  "exercises" | "review" | "passingScore" | "production"
> & {
  exercises: readonly AdvancedExerciseDraft[];
  production: CourseProductionTask;
};

/** Checkpoint C1/C2: 25 itens (ou 40 no final), 80% e IDs determinísticos. */
export function defineAdvancedCheckpoint(
  input: CheckpointInput,
  options: BuilderOptions,
): CourseCheckpointContent {
  return {
    ...input,
    passingScore: 80,
    exercises: input.exercises.map((draft, index) =>
      buildExercise(input.id, draft, index, "independent"),
    ),
    production: normalizeProduction(input.production),
    review: options.review,
  };
}
