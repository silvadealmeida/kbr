import type { Lesson } from "@/content/hangul/types";
import type { Progress } from "@/lib/storage";

export type AnswerRecord = {
  correct: boolean;
  /** `false` para itens de autoavaliação, que não entram no denominador. */
  scored?: boolean;
};

export type LessonResult = {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  requiredMet: boolean;
  passedLessonIds: string[];
  requiredExerciseIds: readonly string[];
};

/**
 * Calcula o resultado da lição a partir da primeira tentativa de cada item.
 * Itens com `scored: false` não entram no denominador.
 */
export function evaluateLesson(
  lesson: Lesson,
  answers: Readonly<Record<string, AnswerRecord>>,
): LessonResult {
  const scored = lesson.exercises.filter((exercise) => answers[exercise.id]?.scored !== false);
  const correct = scored.filter((exercise) => answers[exercise.id]?.correct).length;
  const total = scored.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const requiredExerciseIds = lesson.completion.requiredExerciseIds ?? [];
  const requiredMet = requiredExerciseIds.every((id) => answers[id]?.correct === true);

  return {
    correct,
    total,
    score,
    passed: score >= lesson.completion.minScore && requiredMet,
    requiredMet,
    passedLessonIds: scored
      .filter((exercise) => answers[exercise.id]?.correct)
      .map((exercise) => exercise.id),
    requiredExerciseIds,
  };
}

/** Acrescenta uma tentativa ao histórico e atualiza `lastActive`. */
export function recordAttempt(
  progress: Progress,
  exerciseId: string,
  correct: boolean,
  now: Date,
): Progress {
  if (Number.isNaN(now.getTime())) throw new RangeError("Relógio inválido");

  return {
    ...progress,
    history: [...progress.history, { exerciseId, correct, at: now.toISOString() }],
    lastActive: now.toISOString(),
  };
}

/**
 * Registra a conclusão da lição preservando o maior score já obtido.
 * Sair no meio da sessão não chama esta função.
 */
export function completeLesson(
  progress: Progress,
  lesson: Lesson,
  answers: Readonly<Record<string, AnswerRecord>>,
  now: Date,
): { progress: Progress; result: LessonResult } {
  const result = evaluateLesson(lesson, answers);
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

/** Uma lição só libera quando todas as anteriores exigidas estão concluídas. */
export function isLessonUnlocked(progress: Progress, lesson: Lesson): boolean {
  return lesson.prerequisites.every((id) => progress.lessons[id]?.done === true);
}

export function nextLessonAfter(
  lessons: readonly Lesson[],
  lessonId: string,
): Lesson | undefined {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  return index >= 0 ? lessons[index + 1] : undefined;
}
