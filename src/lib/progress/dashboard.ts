import type { Checkpoint, Lesson } from "@/content/hangul/types";
import {
  buildReviewQueue,
  REVIEW_KIND_LABELS,
  type ReviewKind,
} from "@/lib/review";
import { parseSrsCardKey, type LeitnerBox } from "@/lib/srs";
import type { Progress } from "@/lib/storage";
import {
  buildCourseSteps,
  isCourseStepDone,
  isCourseStepUnlocked,
  nextRecommendedCourseStep,
  type CourseStep,
} from "./lesson";

const DAY_MS = 24 * 60 * 60 * 1_000;
const RECENT_ACTIVITY_LIMIT = 8;

export const HANGUL_COURSE = {
  title: "Hangul",
  level: "Pré-A1",
} as const;

export type AttemptCategory = "lesson" | "checkpoint" | "review" | "other";

export const ATTEMPT_CATEGORY_LABELS: Readonly<Record<AttemptCategory, string>> = {
  lesson: "Lição",
  checkpoint: "Checkpoint",
  review: "Revisão espaçada",
  other: "Atividade anterior",
};

export type DashboardActivity = {
  exerciseId: string;
  correct: boolean;
  at: string;
  category: AttemptCategory;
  stepId: string | null;
  stepTitle: string | null;
  cardId: string | null;
  label: string;
  detail: string;
};

export type CourseSummary = {
  title: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  totalCheckpoints: number;
  completedCheckpoints: number;
  totalSteps: number;
  completedSteps: number;
  percent: number;
  complete: boolean;
  nextStep: CourseStep | null;
  lockedIncompleteSteps: number;
};

export type AttemptStats = {
  /** Todas as tentativas válidas do histórico, incluindo revisões. */
  total: number;
  correct: number;
  accuracy: number | null;
  lesson: number;
  checkpoint: number;
  review: number;
  other: number;
  exerciseAttempts: number;
  exerciseCorrect: number;
  exerciseAccuracy: number | null;
  reviewCorrect: number;
  reviewAccuracy: number | null;
  uniqueExercises: number;
  uniqueReviewCards: number;
  attemptedLessons: number;
  attemptedCheckpoints: number;
};

export type ActivitySummary = {
  activeDays: number;
  todayAttempts: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: string | null;
};

export type ReviewSummary = {
  totalCards: number;
  unknownCards: number;
  cardsByBox: Readonly<Record<LeitnerBox, number>>;
  due: number;
  overdue: number;
  dueToday: number;
  sessionSize: number;
  nextDue: string | null;
};

export type DashboardSummary = {
  course: CourseSummary;
  attempts: AttemptStats;
  activity: ActivitySummary;
  review: ReviewSummary;
  recent: readonly DashboardActivity[];
  generatedAt: string;
};

export type DashboardOptions = {
  now: Date;
  lessons: readonly Lesson[];
  checkpoints: readonly Checkpoint[];
};

type AttemptTarget = {
  category: "lesson" | "checkpoint";
  stepId: string;
  stepTitle: string;
};

type ParsedAttempt = DashboardActivity & {
  timestamp: number;
  order: number;
};

function isDateString(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function toTimestamp(value: unknown): number | null {
  if (!isDateString(value)) return null;
  return Date.parse(value);
}

/** Chave de dia local, coerente com a virada de dia usada pela revisão. */
export function localDayKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function dayNumber(key: string): number {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year!, month! - 1, day!) / DAY_MS;
}

function accuracy(correct: number, total: number): number | null {
  return total === 0 ? null : correct / total;
}

function buildAttemptTargets(
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
): Map<string, AttemptTarget> {
  const targets = new Map<string, AttemptTarget>();

  for (const lesson of lessons) {
    for (const exercise of lesson.exercises) {
      targets.set(exercise.id, {
        category: "lesson",
        stepId: lesson.id,
        stepTitle: lesson.title,
      });
    }
  }

  for (const checkpoint of checkpoints) {
    for (const exercise of checkpoint.exercises) {
      targets.set(exercise.id, {
        category: "checkpoint",
        stepId: checkpoint.id,
        stepTitle: checkpoint.title,
      });
    }
  }

  return targets;
}

function reviewActivity(cardId: string): { label: string; detail: string } {
  const ref = parseSrsCardKey(cardId);
  if (!ref) {
    return { label: "Cartão de revisão", detail: ATTEMPT_CATEGORY_LABELS.review };
  }

  const kind: ReviewKind =
    ref.kind === "jamo-consonant" || ref.kind === "jamo-vowel"
      ? "jamo"
      : ref.kind === "syllable"
        ? "syllable"
        : ref.kind === "word"
          ? "word"
          : "rule";

  return {
    label: `${REVIEW_KIND_LABELS[kind]} · ${ref.value}`,
    detail: ATTEMPT_CATEGORY_LABELS.review,
  };
}

function currentStreakFromDays(days: ReadonlySet<string>, now: Date): number {
  const today = dayNumber(localDayKey(now));
  let cursor: number | null = days.has(localDayKey(now))
    ? today
    : days.has(localDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)))
      ? today - 1
      : null;

  if (cursor === null) return 0;

  let streak = 0;
  while (days.has(dayKeyFromNumber(cursor))) {
    streak += 1;
    cursor -= 1;
  }
  return streak;
}

function longestStreakFromDays(days: ReadonlySet<string>): number {
  const numbers = [...new Set([...days].map(dayNumber))].sort((a, b) => a - b);
  let longest = 0;
  let run = 0;
  let previous: number | null = null;

  for (const value of numbers) {
    run = previous !== null && value === previous + 1 ? run + 1 : 1;
    if (run > longest) longest = run;
    previous = value;
  }

  return longest;
}

function dayKeyFromNumber(value: number): string {
  const date = new Date(value * DAY_MS);
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function summarizeAttempts(
  history: readonly unknown[],
  targets: ReadonlyMap<string, AttemptTarget>,
  now: Date,
): {
  attempts: AttemptStats;
  activity: ActivitySummary;
  recent: DashboardActivity[];
} {
  const parsed: ParsedAttempt[] = [];
  const days = new Set<string>();
  const uniqueExercises = new Set<string>();
  const uniqueReviewCards = new Set<string>();
  const attemptedLessonIds = new Set<string>();
  const attemptedCheckpointIds = new Set<string>();
  const today = localDayKey(now);

  let lessonAttempts = 0;
  let checkpointAttempts = 0;
  let reviewAttempts = 0;
  let otherAttempts = 0;
  let totalCorrect = 0;
  let exerciseCorrect = 0;
  let reviewCorrect = 0;
  let todayAttempts = 0;

  history.forEach((value, order) => {
    if (typeof value !== "object" || value === null) return;
    const attempt = value as {
      exerciseId?: unknown;
      correct?: unknown;
      at?: unknown;
    };
    const exerciseId = attempt.exerciseId;
    const correct = attempt.correct;
    const timestamp = toTimestamp(attempt.at);
    if (
      typeof exerciseId !== "string" ||
      exerciseId.length === 0 ||
      typeof correct !== "boolean" ||
      timestamp === null
    ) {
      return;
    }

    const at = new Date(timestamp);
    const day = localDayKey(at);
    days.add(day);
    if (day === today) todayAttempts += 1;
    if (correct) totalCorrect += 1;

    let activity: ParsedAttempt;

    if (exerciseId.startsWith("review:")) {
      const cardId = exerciseId.slice("review:".length);
      const labels = reviewActivity(cardId);
      reviewAttempts += 1;
      uniqueReviewCards.add(cardId);
      if (correct) reviewCorrect += 1;
      activity = {
        exerciseId,
        correct,
        at: at.toISOString(),
        category: "review",
        stepId: null,
        stepTitle: null,
        cardId: cardId.length > 0 ? cardId : null,
        label: labels.label,
        detail: labels.detail,
        timestamp,
        order,
      };
    } else {
      const target = targets.get(exerciseId);
      if (target) {
        uniqueExercises.add(exerciseId);
        if (target.category === "lesson") {
          lessonAttempts += 1;
          attemptedLessonIds.add(target.stepId);
        } else {
          checkpointAttempts += 1;
          attemptedCheckpointIds.add(target.stepId);
        }
        if (correct) exerciseCorrect += 1;
        activity = {
          exerciseId,
          correct,
          at: at.toISOString(),
          category: target.category,
          stepId: target.stepId,
          stepTitle: target.stepTitle,
          cardId: null,
          label: `${target.stepId} · ${target.stepTitle}`,
          detail: ATTEMPT_CATEGORY_LABELS[target.category],
          timestamp,
          order,
        };
      } else {
        otherAttempts += 1;
        activity = {
          exerciseId,
          correct,
          at: at.toISOString(),
          category: "other",
          stepId: null,
          stepTitle: null,
          cardId: null,
          label: exerciseId,
          detail: ATTEMPT_CATEGORY_LABELS.other,
          timestamp,
          order,
        };
      }
    }

    parsed.push(activity);
  });

  parsed.sort((a, b) => b.timestamp - a.timestamp || b.order - a.order);
  const exerciseAttempts = lessonAttempts + checkpointAttempts;
  const recent = parsed.slice(0, RECENT_ACTIVITY_LIMIT).map(
    ({ timestamp: _timestamp, order: _order, ...activity }) => activity,
  );

  return {
    attempts: {
      total: parsed.length,
      correct: totalCorrect,
      accuracy: accuracy(totalCorrect, parsed.length),
      lesson: lessonAttempts,
      checkpoint: checkpointAttempts,
      review: reviewAttempts,
      other: otherAttempts,
      exerciseAttempts,
      exerciseCorrect,
      exerciseAccuracy: accuracy(exerciseCorrect, exerciseAttempts),
      reviewCorrect,
      reviewAccuracy: accuracy(reviewCorrect, reviewAttempts),
      uniqueExercises: uniqueExercises.size,
      uniqueReviewCards: uniqueReviewCards.size,
      attemptedLessons: attemptedLessonIds.size,
      attemptedCheckpoints: attemptedCheckpointIds.size,
    },
    activity: {
      activeDays: days.size,
      todayAttempts,
      currentStreak: currentStreakFromDays(days, now),
      longestStreak: longestStreakFromDays(days),
      lastActivityAt: parsed[0]?.at ?? null,
    },
    recent,
  };
}

function summarizeCourse(
  progress: Progress,
  lessons: readonly Lesson[],
  checkpoints: readonly Checkpoint[],
): CourseSummary {
  const steps = buildCourseSteps(lessons, checkpoints);
  const completedLessons = lessons.filter(
    (lesson) => progress.lessons[lesson.id]?.done === true,
  ).length;
  const completedCheckpoints = checkpoints.filter(
    (checkpoint) => progress.lessons[checkpoint.id]?.done === true,
  ).length;
  const completedSteps = steps.filter((step) => isCourseStepDone(progress, step)).length;
  const totalSteps = steps.length;
  const complete = totalSteps > 0 && completedSteps === totalSteps;

  return {
    title: HANGUL_COURSE.title,
    level: HANGUL_COURSE.level,
    totalLessons: lessons.length,
    completedLessons,
    totalCheckpoints: checkpoints.length,
    completedCheckpoints,
    totalSteps,
    completedSteps,
    percent: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
    complete,
    nextStep:
      complete || totalSteps === 0
        ? null
        : nextRecommendedCourseStep(progress, steps) ?? null,
    lockedIncompleteSteps: steps.filter(
      (step) => !isCourseStepDone(progress, step) && !isCourseStepUnlocked(progress, step),
    ).length,
  };
}

function summarizeReview(progress: Progress, now: Date): ReviewSummary {
  const queue = buildReviewQueue(progress, now);
  const cardsByBox: Record<LeitnerBox, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalCards = 0;
  let unknownCards = 0;

  for (const [cardId, state] of Object.entries(progress.cards ?? {})) {
    if (
      !state ||
      !Number.isInteger(state.box) ||
      state.box < 1 ||
      state.box > 5 ||
      !isDateString(state.due)
    ) {
      continue;
    }

    if (!parseSrsCardKey(cardId)) {
      unknownCards += 1;
      continue;
    }

    totalCards += 1;
    cardsByBox[state.box as LeitnerBox] += 1;
  }

  return {
    totalCards,
    unknownCards,
    cardsByBox,
    due: queue.totalDue,
    overdue: queue.overdue,
    dueToday: queue.dueToday,
    sessionSize: queue.session.length,
    nextDue: queue.nextDue,
  };
}

/**
 * Resumo determinístico do painel a partir do `Progress` v1. Não altera o
 * progresso, não cria cartões e não usa `Progress.streak`: a sequência é
 * derivada do histórico de tentativas, que é a fonte real de atividade.
 */
export function buildDashboardSummary(
  progress: Progress,
  options: DashboardOptions,
): DashboardSummary {
  const nowValue = options.now.getTime();
  if (Number.isNaN(nowValue)) throw new RangeError("Relógio inválido");

  const targets = buildAttemptTargets(options.lessons, options.checkpoints);
  const { attempts, activity, recent } = summarizeAttempts(progress.history ?? [], targets, options.now);

  return {
    course: summarizeCourse(progress, options.lessons, options.checkpoints),
    attempts,
    activity,
    review: summarizeReview(progress, options.now),
    recent,
    generatedAt: options.now.toISOString(),
  };
}
