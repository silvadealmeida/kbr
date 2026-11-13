import type {
  CourseCheckpointContent,
  CourseExerciseStage,
  CourseLessonContent,
  CourseLessonExercise,
} from "../../course-types";
import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseSpec } from "@/lib/exercises";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";
import {
  a2SentenceIdsFor,
  newA2VocabIdsFor,
} from "@/content/vocabulary/a2-course";

const REVIEW_NOTES =
  "Conteúdo original do KBR para o curso A2; naturalidade, tradução e registro aguardam revisão de falante nativo.";

export const review: ReviewMeta = { status: "in-review", notes: REVIEW_NOTES };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type ExerciseDraft = DistributiveOmit<ExerciseSpec, "id" | "tags">;

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
  draft: ExerciseDraft,
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
): ExerciseDraft {
  return { type: "mcq", prompt, options, correctAnswer, explanation };
}

export function cloze(
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers?: readonly string[],
): ExerciseDraft {
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
): ExerciseDraft {
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
): ExerciseDraft {
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
): ExerciseDraft {
  return {
    type: "reading",
    text,
    mode: "mcq",
    prompt: question,
    question,
    options: options.map((label, index) => ({ id: `o${index + 1}`, label })),
    correctOptionId:
      options.findIndex((option) => option === correctAnswer) >= 0
        ? `o${options.findIndex((option) => option === correctAnswer) + 1}`
        : "o1",
    explanation,
  };
}

type LessonInput = Omit<
  CourseLessonContent,
  "vocabulary" | "completion" | "dialogue" | "grammar" | "exercises" | "review"
> & {
  intro: readonly { title: string; body: string; ko?: string }[];
  dialogue: readonly (readonly [speaker: string, ko: string, pt: string])[];
  reusedIds: readonly string[];
  grammar: readonly (readonly [
    titlePt: string,
    form: string,
    explanationPt: string,
    examples: readonly (readonly [ko: string, pt: string])[],
  ])[];
  guided: readonly ExerciseDraft[];
  independent: readonly ExerciseDraft[];
  summary: readonly string[];
};

/**
 * Monta uma lição A2 com IDs determinísticos e referências lexicais do
 * registro canônico. O texto pedagógico continua explícito em cada arquivo.
 */
export function defineA2Lesson(input: LessonInput): CourseLessonContent {
  const {
    dialogue,
    grammar,
    guided,
    independent,
    reusedIds,
    intro,
    summary,
    ...rest
  } = input;
  const exercises = [
    ...guided.map((draft, index) => buildExercise(input.id, draft, index, "guided")),
    ...independent.map((draft, index) =>
      buildExercise(input.id, draft, guided.length + index, "independent"),
    ),
  ];

  return {
    ...rest,
    intro,
    dialogue: dialogue.map(([speaker, ko, pt], index) => ({
      id: `${input.id}-d${index + 1}`,
      speaker,
      ko,
      pt,
      audioText: ko,
      review,
    })),
    grammar: grammar.map(([titlePt, form, explanationPt, examples], index) => ({
      id: `${input.id}-g${index + 1}`,
      titlePt,
      form,
      explanationPt,
      examples: examples.map(([ko, pt]) => ({ ko, pt, audioText: ko })),
      review,
    })),
    vocabulary: {
      newIds: newA2VocabIdsFor(input.id),
      reusedIds,
      sentenceIds: a2SentenceIdsFor(input.id),
    },
    exercises,
    summary,
    completion: { minScore: 80, minCorrect: 8 },
    review,
  };
}

type CheckpointInput = Omit<
  CourseCheckpointContent,
  "exercises" | "review" | "passingScore"
> & {
  exercises: readonly ExerciseDraft[];
};

/** Checkpoint A2: 25 itens (ou 40 no final), 80% e IDs determinísticos. */
export function defineA2Checkpoint(input: CheckpointInput): CourseCheckpointContent {
  return {
    ...input,
    passingScore: 80,
    exercises: input.exercises.map((draft, index) =>
      buildExercise(input.id, draft, index, "independent"),
    ),
    review,
  };
}

export type { ExerciseDraft };
