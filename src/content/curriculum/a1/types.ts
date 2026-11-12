import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";

export type A1Skill =
  | "reading"
  | "listening"
  | "speaking"
  | "writing"
  | "vocabulary"
  | "grammar"
  | "register"
  | "culture";

export type A1VocabularyTarget = {
  themes: readonly string[];
  newItems: { min: number; max: number };
};

export type A1AssessmentPlan = {
  automaticItems: number;
  minCorrect: number;
  performance: string;
};

/**
 * Plano editorial, não uma lição jogável. Não contém falas, frases, entradas de
 * vocabulário nem exercícios finais; esses dados começam na Fase 9B.
 */
export type A1LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  prerequisites: readonly string[];
  vocabulary: A1VocabularyTarget;
  grammar: readonly string[];
  dialogueScenario: string;
  listeningObjective: string;
  writingObjective: string;
  exerciseTypes: readonly ExerciseTypeId[];
  reviewDependencies: readonly string[];
  assessment: A1AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type A1CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly A1Skill[];
  assessment: A1AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type A1ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type A1CurriculumBlueprint = {
  version: 1;
  courseId: "ko-a1";
  status: "blueprint";
  prerequisite: "hangul-literacy";
  modules: readonly A1ModuleBlueprint[];
  lessons: readonly A1LessonBlueprint[];
  checkpoints: readonly A1CheckpointBlueprint[];
  review: ReviewMeta;
};

export type A1BlueprintIssue = {
  code: string;
  path: string;
  message: string;
};
