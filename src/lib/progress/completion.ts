import type { Checkpoint, Lesson } from "@/content/hangul/types";
import {
  buildCourseSteps,
  isCourseStepUnlocked,
  nextRecommendedCourseStep,
  type CourseStepKind,
} from "@/lib/courses";
import type { Progress } from "@/lib/storage";
import { buildDashboardSummary } from "./dashboard";
import { summarizeDiagnostics } from "./diagnostics";
import {
  checkpointRequiredCorrect,
  isCourseComplete,
  type CheckpointResult,
} from "./lesson";

export type CompletedLessonSummary = {
  id: string;
  title: string;
  score: number;
};

export type CompletedCheckpointSummary = {
  id: string;
  title: string;
  score: number;
};

/**
 * Passo da jornada intercalada do curso (lições e checkpoints na ordem em que
 * aparecem no percurso). `done`, `score`, `unlocked` e `current` são derivados
 * do `Progress` v1; nada aqui inventa conclusão, nota ou desbloqueio.
 */
export type CourseJourneyStep = {
  id: string;
  kind: CourseStepKind;
  title: string;
  done: boolean;
  score: number | null;
  unlocked: boolean;
  current: boolean;
};

export type CompletionStats = {
  attempts: number;
  correct: number;
  accuracy: number | null;
  exerciseAttempts: number;
  exerciseCorrect: number;
  exerciseAccuracy: number | null;
  reviewAttempts: number;
  reviewCorrect: number;
  activeDays: number;
  longestStreak: number;
  totalCards: number;
  dueCards: number;
};

export type FinalAssessmentFeedback = {
  checkpointId: string;
  checkpointTitle: string;
  score: number;
  correct: number;
  total: number;
  incorrect: number;
  requiredCorrect: number;
  passed: boolean;
  /** Apenas categorias com pelo menos um erro, na ordem estável do diagnóstico. */
  diagnostics: ReturnType<typeof summarizeDiagnostics>["categories"];
  missedExerciseIds: readonly string[];
  relatedLessonIds: readonly string[];
};

export type CourseCompletionReport = {
  complete: boolean;
  totalLessons: number;
  completedLessons: number;
  totalCheckpoints: number;
  completedCheckpoints: number;
  completedLessonList: readonly CompletedLessonSummary[];
  completedCheckpointList: readonly CompletedCheckpointSummary[];
  missingLessonIds: readonly string[];
  missingCheckpointIds: readonly string[];
  /** Melhor score já registrado no checkpoint final, se existir. */
  finalCheckpointScore: number | null;
  /** Resultado da tentativa atual do checkpoint final, quando disponível. */
  finalAssessment: FinalAssessmentFeedback | null;
  /** Ordem intercalada real de lições e checkpoints, com estado derivado. */
  journey: readonly CourseJourneyStep[];
  completedSteps: number;
  totalSteps: number;
  currentStepId: string | null;
  nextStep: { id: string; title: string; kind: CourseStepKind } | null;
  stats: CompletionStats;
};

export type CompletionReportOptions = {
  now: Date;
  lessons: readonly Lesson[];
  checkpoints: readonly Checkpoint[];
  finalCheckpoint?: Checkpoint;
  finalResult?: CheckpointResult;
};

function buildFinalAssessment(
  checkpoint: Checkpoint,
  result: CheckpointResult,
  lessons: readonly Lesson[],
): FinalAssessmentFeedback {
  const diagnostics = result.diagnostics.filter((category) => category.missed > 0);
  const lessonOrder = new Map(lessons.map((lesson, index) => [lesson.id, index]));
  const related = new Set<string>();
  for (const category of diagnostics) {
    for (const lessonId of category.lessonIds) {
      if (lessonOrder.has(lessonId)) related.add(lessonId);
    }
  }

  return {
    checkpointId: checkpoint.id,
    checkpointTitle: checkpoint.title,
    score: result.score,
    correct: result.correct,
    total: result.total,
    incorrect: Math.max(0, result.total - result.correct),
    requiredCorrect: checkpointRequiredCorrect(checkpoint),
    passed: result.passed,
    diagnostics,
    missedExerciseIds: result.missedExerciseIds,
    relatedLessonIds: [...related].sort(
      (left, right) => lessonOrder.get(left)! - lessonOrder.get(right)!,
    ),
  };
}

/**
 * Resumo determinístico da conclusão do módulo Hangul. Lê apenas o `Progress`
 * v1 existente: não grava, não cria cartões, não inventa conquistas e não
 * considera um passo concluído sem `done: true`. Estatísticas reutilizam
 * `buildDashboardSummary`, a mesma fonte do painel.
 */
export function buildCourseCompletionReport(
  progress: Progress,
  options: CompletionReportOptions,
): CourseCompletionReport {
  const dashboard = buildDashboardSummary(progress, {
    now: options.now,
    lessons: options.lessons,
    checkpoints: options.checkpoints,
  });

  const completedLessonList = options.lessons
    .filter((lesson) => progress.lessons[lesson.id]?.done === true)
    .map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      score: progress.lessons[lesson.id]!.score,
    }));
  const completedCheckpointList = options.checkpoints
    .filter((checkpoint) => progress.lessons[checkpoint.id]?.done === true)
    .map((checkpoint) => ({
      id: checkpoint.id,
      title: checkpoint.title,
      score: progress.lessons[checkpoint.id]!.score,
    }));

  const finalAssessment =
    options.finalCheckpoint && options.finalResult
      ? buildFinalAssessment(options.finalCheckpoint, options.finalResult, options.lessons)
      : null;

  const steps = buildCourseSteps(options.lessons, options.checkpoints);
  const nextStep = nextRecommendedCourseStep(progress, steps) ?? null;
  const journey = steps.map((step): CourseJourneyStep => {
    const record = progress.lessons[step.id];
    return {
      id: step.id,
      kind: step.kind,
      title: step.title,
      done: record?.done === true,
      score: typeof record?.score === "number" ? record.score : null,
      unlocked: isCourseStepUnlocked(progress, step),
      current: nextStep?.id === step.id,
    };
  });

  return {
    complete: isCourseComplete(progress, options.lessons, options.checkpoints),
    totalLessons: options.lessons.length,
    completedLessons: completedLessonList.length,
    totalCheckpoints: options.checkpoints.length,
    completedCheckpoints: completedCheckpointList.length,
    completedLessonList,
    completedCheckpointList,
    missingLessonIds: options.lessons
      .filter((lesson) => progress.lessons[lesson.id]?.done !== true)
      .map((lesson) => lesson.id),
    missingCheckpointIds: options.checkpoints
      .filter((checkpoint) => progress.lessons[checkpoint.id]?.done !== true)
      .map((checkpoint) => checkpoint.id),
    finalCheckpointScore:
      options.finalCheckpoint &&
      typeof progress.lessons[options.finalCheckpoint.id]?.score === "number"
        ? progress.lessons[options.finalCheckpoint.id]!.score
        : null,
    finalAssessment,
    journey,
    completedSteps: journey.filter((step) => step.done).length,
    totalSteps: journey.length,
    currentStepId: nextStep?.id ?? null,
    nextStep: nextStep
      ? { id: nextStep.id, title: nextStep.title, kind: nextStep.kind }
      : null,
    stats: {
      attempts: dashboard.attempts.total,
      correct: dashboard.attempts.correct,
      accuracy: dashboard.attempts.accuracy,
      exerciseAttempts: dashboard.attempts.exerciseAttempts,
      exerciseCorrect: dashboard.attempts.exerciseCorrect,
      exerciseAccuracy: dashboard.attempts.exerciseAccuracy,
      reviewAttempts: dashboard.attempts.review,
      reviewCorrect: dashboard.attempts.reviewCorrect,
      activeDays: dashboard.activity.activeDays,
      longestStreak: dashboard.activity.longestStreak,
      totalCards: dashboard.review.totalCards,
      dueCards: dashboard.review.due,
    },
  };
}
