import type { CourseDefinition } from "@/content/courses/types";
import type { Progress } from "@/lib/storage";
import {
  isCourseStepDone,
  isCourseStepUnlocked,
  nextRecommendedCourseStep,
  type CourseStep,
} from "./steps";

export type CourseProgressSummary = {
  courseId: string;
  totalSteps: number;
  completedSteps: number;
  totalLessons: number;
  completedLessons: number;
  totalCheckpoints: number;
  completedCheckpoints: number;
  percent: number;
  complete: boolean;
  nextStep: CourseStep | null;
  lockedIncompleteSteps: number;
};

/**
 * Progresso específico de um curso derivado do `Progress` v1. Não grava, não
 * inventa passos e não exige campo novo: as chaves de `progress.lessons` são
 * os IDs globais dos passos do registro. Cursos planejados nunca ficam
 * “concluídos”, porque não têm passos.
 */
export function summarizeCourseProgress(
  progress: Pick<Progress, "lessons">,
  course: CourseDefinition,
): CourseProgressSummary {
  const totalSteps = course.steps.length;
  const completedSteps = course.steps.filter((step) =>
    isCourseStepDone(progress, step),
  ).length;
  const totalLessons = course.steps.filter((step) => step.kind === "lesson").length;
  const completedLessons = course.steps.filter(
    (step) => step.kind === "lesson" && isCourseStepDone(progress, step),
  ).length;
  const totalCheckpoints = course.steps.filter(
    (step) => step.kind === "checkpoint",
  ).length;
  const completedCheckpoints = course.steps.filter(
    (step) => step.kind === "checkpoint" && isCourseStepDone(progress, step),
  ).length;
  const complete =
    course.status === "available" && totalSteps > 0 && completedSteps === totalSteps;

  return {
    courseId: course.id,
    totalSteps,
    completedSteps,
    totalLessons,
    completedLessons,
    totalCheckpoints,
    completedCheckpoints,
    percent: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
    complete,
    nextStep: complete ? null : nextRecommendedCourseStep(progress, course.steps) ?? null,
    lockedIncompleteSteps: course.steps.filter(
      (step) => !isCourseStepDone(progress, step) && !isCourseStepUnlocked(progress, step),
    ).length,
  };
}
