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

export type CourseStepKind = "lesson" | "checkpoint";

export type CourseStep = {
  id: string;
  kind: CourseStepKind;
  title: string;
  estimatedMinutes: number;
  prerequisites: readonly string[];
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
 * Quantidade mínima de acertos para atingir uma nota percentual. Evita que
 * 19/24 (79% arredondado) reprove um critério documentado como 80% (19/24).
 */
export function requiredCorrect(total: number, minScore: number): number {
  if (total <= 0) return 0;
  return Math.min(total, Math.round((total * minScore) / 100));
}

/** Número mínimo de acertos de uma lição, priorizando o critério explícito. */
export function lessonRequiredCorrect(lesson: Lesson): number {
  const total = lesson.exercises.length;
  return Math.min(total, lesson.completion.minCorrect ?? requiredCorrect(total, lesson.completion.minScore));
}

/** Número mínimo de acertos de um checkpoint, priorizando o critério explícito. */
export function checkpointRequiredCorrect(checkpoint: Checkpoint): number {
  const total = checkpoint.exercises.length;
  return Math.min(total, checkpoint.minCorrect ?? requiredCorrect(total, checkpoint.passingScore));
}

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
    passed: correct >= lessonRequiredCorrect(lesson) && requiredMet,
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
    passed: correct >= checkpointRequiredCorrect(checkpoint),
    diagnostics: summary.categories,
    missedExerciseIds: summary.missedExerciseIds,
  };
}

/**
 * Checkpoints anteriores ao informado, na ordem curricular. Como a lista de
 * checkpoints é ordenada, `c2` depende de `c1`, `c3` de `c1`–`c2` e `c4` de
 * `c1`–`c3`, mesmo que um snapshot inconsistente já tenha lições posteriores
 * marcadas como concluídas.
 */
export function checkpointPrerequisiteIds(
  checkpoints: readonly Checkpoint[],
  checkpointId: string,
): string[] {
  const index = checkpoints.findIndex((checkpoint) => checkpoint.id === checkpointId);
  return index <= 0
    ? []
    : checkpoints.slice(0, index).map((checkpoint) => checkpoint.id);
}

/**
 * O checkpoint só abre com todas as lições do seu escopo e todos os
 * checkpoints anteriores concluídos. `checkpoints` precisa vir na ordem
 * curricular; a UI e o dashboard passam `CHECKPOINTS`.
 */
export function isCheckpointUnlocked(
  progress: Progress,
  checkpoint: Checkpoint,
  checkpoints: readonly Checkpoint[],
): boolean {
  return (
    checkpoint.lessonIds.every((id) => progress.lessons[id]?.done === true) &&
    checkpointPrerequisiteIds(checkpoints, checkpoint.id).every(
      (id) => progress.lessons[id]?.done === true,
    )
  );
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
 * Ordem intercalada de lições e checkpoints, com os pré-requisitos usados para
 * desbloqueio. O checkpoint ocupa a posição imediatamente depois do último
 * conteúdo do seu escopo, então `h10` é seguido por `c1`, `c1` por `h11` e
 * `c3` por `h21`.
 */
export function buildCourseSteps(
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
): CourseStep[] {
  const lessonPosition = new Map(lessons.map((lesson, index) => [lesson.id, index * 2]));
  const entries: { step: CourseStep; position: number; order: number }[] = lessons.map(
    (lesson, index) => ({
      step: {
        id: lesson.id,
        kind: "lesson",
        title: lesson.title,
        estimatedMinutes: lesson.estimatedMinutes,
        prerequisites: lesson.prerequisites,
      },
      position: index * 2,
      order: index,
    }),
  );

  checkpoints.forEach((checkpoint, index) => {
    const scope = checkpoint.lessonIds
      .map((id) => lessonPosition.get(id))
      .filter((position): position is number => position !== undefined);
    const base = scope.length > 0 ? Math.max(...scope) : lessons.length * 2 + index * 2;
    const previousCheckpoints = checkpoints
      .slice(0, index)
      .map((item) => item.id);
    entries.push({
      step: {
        id: checkpoint.id,
        kind: "checkpoint",
        title: checkpoint.title,
        estimatedMinutes: checkpoint.estimatedMinutes,
        prerequisites: [...checkpoint.lessonIds, ...previousCheckpoints],
      },
      position: base + 1,
      order: lessons.length + index,
    });
  });

  return entries
    .sort((a, b) => a.position - b.position || a.order - b.order)
    .map((entry) => entry.step);
}

export function isCourseStepDone(progress: Progress, step: CourseStep): boolean {
  return progress.lessons[step.id]?.done === true;
}

/** Um passo só abre quando todos os pré-requisitos curriculares estão concluídos. */
export function isCourseStepUnlocked(progress: Progress, step: CourseStep): boolean {
  return step.prerequisites.every((id) => progress.lessons[id]?.done === true);
}

/**
 * Primeiro passo ainda não concluído cujos pré-requisitos estão satisfeitos.
 * Retorna `undefined` quando o curso terminou ou quando só restam passos
 * bloqueados (dados inconsistentes/legados); nunca recomenda conteúdo fechado.
 */
export function nextRecommendedCourseStep(
  progress: Progress,
  steps: readonly CourseStep[],
): CourseStep | undefined {
  return steps.find(
    (step) => !isCourseStepDone(progress, step) && isCourseStepUnlocked(progress, step),
  );
}

/**
 * Próximo passo do curso na ordem intercalada de lições e checkpoints.
 * O checkpoint ocupa a posição imediatamente depois do último conteúdo do seu
 * escopo, então `h10` é seguido por `c1`, `c1` por `h11` e `h15` por `c2`.
 */
export function nextCourseStepAfter(
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
  stepId: string,
): { id: string; title: string } | undefined {
  const steps = buildCourseSteps(lessons, checkpoints);
  const index = steps.findIndex((step) => step.id === stepId);
  if (index < 0) return undefined;
  const next = steps[index + 1];
  return next ? { id: next.id, title: next.title } : undefined;
}

/**
 * Módulo Hangul concluído: todas as lições e todos os checkpoints do curso
 * têm `done: true`. Não implica desbloqueio de conteúdo CEFR A1, que ainda não
 * existe no produto.
 */
export function isCourseComplete(
  progress: Progress,
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
): boolean {
  return (
    lessons.every((lesson) => progress.lessons[lesson.id]?.done === true) &&
    checkpoints.every((checkpoint) => progress.lessons[checkpoint.id]?.done === true)
  );
}
