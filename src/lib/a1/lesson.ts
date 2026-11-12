import type {
  A1CheckpointContent,
  A1LessonContent,
} from "@/content/curriculum/a1/types";
import type { AnswerRecord } from "@/lib/progress/lesson";
import type { Progress } from "@/lib/storage";

export type A1LessonResult = {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  minCorrect: number;
};

export type A1CheckpointResult = A1LessonResult;

/** Mínimo de acertos da lição A1, dentro do total de exercícios avaliados. */
export function a1RequiredCorrect(lesson: A1LessonContent): number {
  return Math.min(
    lesson.exercises.length,
    lesson.completion.minCorrect ??
      Math.round((lesson.exercises.length * lesson.completion.minScore) / 100),
  );
}

/**
 * Avalia a primeira tentativa de cada exercício. Todos os tipos usados no A1
 * são determinísticos e pontuam; não há autoavaliação nesta lição.
 */
export function evaluateA1Lesson(
  lesson: A1LessonContent,
  answers: Readonly<Record<string, AnswerRecord>>,
): A1LessonResult {
  const total = lesson.exercises.length;
  const correct = lesson.exercises.filter(
    (exercise) => answers[exercise.id]?.correct === true,
  ).length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const minCorrect = a1RequiredCorrect(lesson);

  return {
    correct,
    total,
    score,
    minCorrect,
    passed: total > 0 && correct >= minCorrect,
  };
}

/**
 * Registra a lição em `Progress.lessons` com a mesma forma usada pelo Hangul
 * (sem campo novo, sem migração). Só é chamada ao final da prática; sair no
 * meio não conclui nada.
 */
export function completeA1Lesson(
  progress: Progress,
  lesson: A1LessonContent,
  answers: Readonly<Record<string, AnswerRecord>>,
  now: Date,
): { progress: Progress; result: A1LessonResult } {
  const result = evaluateA1Lesson(lesson, answers);
  const previous = progress.lessons[lesson.id];
  const next = {
    done: previous?.done === true || result.passed,
    score: Math.max(previous?.score ?? 0, result.score),
  };

  return {
    progress: {
      ...progress,
      lessons: { ...progress.lessons, [lesson.id]: next },
      lastActive: now.toISOString(),
    },
    result,
  };
}

/** Mínimo de acertos do checkpoint A1; 80% documentado sem arredondar para baixo. */
export function a1CheckpointRequiredCorrect(
  checkpoint: A1CheckpointContent,
): number {
  return Math.min(checkpoint.exercises.length, checkpoint.minCorrect);
}

/** Avaliação determinística do checkpoint, pela primeira tentativa de cada item. */
export function evaluateA1Checkpoint(
  checkpoint: A1CheckpointContent,
  answers: Readonly<Record<string, AnswerRecord>>,
): A1CheckpointResult {
  const total = checkpoint.exercises.length;
  const correct = checkpoint.exercises.filter(
    (exercise) => answers[exercise.id]?.correct === true,
  ).length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const minCorrect = a1CheckpointRequiredCorrect(checkpoint);

  return {
    correct,
    total,
    score,
    minCorrect,
    passed: total > 0 && correct >= minCorrect,
  };
}

/**
 * Registra o checkpoint na mesma entrada `Progress.lessons` usada por lições.
 * Repetir uma tentativa nunca apaga a conclusão anterior nem reduz o score.
 */
export function completeA1Checkpoint(
  progress: Progress,
  checkpoint: A1CheckpointContent,
  answers: Readonly<Record<string, AnswerRecord>>,
  now: Date,
): { progress: Progress; result: A1CheckpointResult } {
  const result = evaluateA1Checkpoint(checkpoint, answers);
  const previous = progress.lessons[checkpoint.id];
  const next = {
    done: previous?.done === true || result.passed,
    score: Math.max(previous?.score ?? 0, result.score),
  };

  return {
    progress: {
      ...progress,
      lessons: { ...progress.lessons, [checkpoint.id]: next },
      lastActive: now.toISOString(),
    },
    result,
  };
}
