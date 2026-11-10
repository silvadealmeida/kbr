import type { Checkpoint, Lesson } from "@/content/hangul/types";
import type { Progress } from "@/lib/storage";
import { summarizeDiagnostics, type DiagnosticBreakdown } from "./diagnostics";

export type AnswerRecord = {
  correct: boolean;
  /** `false` para itens de autoavaliação, que não entram no denominador. */
  scored?: boolean;
};

export type CompletionRuleResult = {
  id: string;
  label: string;
  correct: number;
  minCorrect: number;
  met: boolean;
};

export type LessonResult = {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  requiredMet: boolean;
  passedLessonIds: string[];
  requiredExerciseIds: readonly string[];
  rules: CompletionRuleResult[];
  diagnostics: DiagnosticBreakdown[];
};

export type CheckpointResult = {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
  diagnostics: DiagnosticBreakdown[];
  missedExerciseIds: string[];
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
  const rules = (lesson.completion.rules ?? []).map((rule) => {
    const ruleCorrect = rule.exerciseIds.filter((id) => answers[id]?.correct === true).length;
    return {
      id: rule.id,
      label: rule.label,
      correct: ruleCorrect,
      minCorrect: rule.minCorrect,
      met: ruleCorrect >= rule.minCorrect,
    };
  });
  const requiredMet =
    requiredExerciseIds.every((id) => answers[id]?.correct === true) &&
    rules.every((rule) => rule.met);

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
    rules,
    diagnostics: summarizeDiagnostics(lesson.exercises, answers).categories,
  };
}

/**
 * Checkpoint: avaliação determinística dos itens obrigatórios. O critério de
 * aprovação é o `passingScore` documentado no currículo; não há bônus nem
 * penalidade por tempo ou tentativas anteriores.
 */
export function evaluateCheckpoint(
  checkpoint: Checkpoint,
  answers: Readonly<Record<string, AnswerRecord>>,
): CheckpointResult {
  const scored = checkpoint.exercises.filter((exercise) => answers[exercise.id]?.scored !== false);
  const correct = scored.filter((exercise) => answers[exercise.id]?.correct).length;
  const total = scored.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  const summary = summarizeDiagnostics(checkpoint.exercises, answers);

  return {
    correct,
    total,
    score,
    passed: score >= checkpoint.passingScore,
    diagnostics: summary.categories,
    missedExerciseIds: summary.missedExerciseIds,
  };
}

/** O checkpoint só abre com todas as lições do seu escopo concluídas. */
export function isCheckpointUnlocked(progress: Progress, checkpoint: Checkpoint): boolean {
  return checkpoint.lessonIds.every((id) => progress.lessons[id]?.done === true);
}

/** Registra o checkpoint na mesma estrutura de `LessonProgress`, com o maior score. */
export function completeCheckpoint(
  progress: Progress,
  checkpoint: Checkpoint,
  answers: Readonly<Record<string, AnswerRecord>>,
  now: Date,
): { progress: Progress; result: CheckpointResult } {
  const result = evaluateCheckpoint(checkpoint, answers);
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

/**
 * Próximo passo do curso: a próxima lição implementada ou, no fim do bloco,
 * o checkpoint cujo escopo termina nessa lição.
 */
export function nextCourseStepAfter(
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
  lessonId: string,
): { id: string; title: string } | undefined {
  const nextLesson = nextLessonAfter(lessons, lessonId);
  if (nextLesson) return { id: nextLesson.id, title: nextLesson.title };

  const lessonOrder = new Map(lessons.map((lesson, index) => [lesson.id, index]));
  const checkpoint = checkpoints.find((item) => {
    if (!item.lessonIds.includes(lessonId)) return false;
    return item.lessonIds.every((id) => lessonOrder.has(id));
  });
  if (!checkpoint) return undefined;
  return { id: checkpoint.id, title: checkpoint.title };
}
