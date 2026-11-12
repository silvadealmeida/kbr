import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type { ExerciseSpec } from "@/lib/exercises";

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

export type A1DialogueLine = {
  id: string;
  speaker: string;
  ko: string;
  pt: string;
  audioText: string;
  review: ReviewMeta;
};

export type A1GrammarExample = {
  ko: string;
  pt: string;
  audioText: string;
};

export type A1GrammarNote = {
  id: string;
  titlePt: string;
  form: string;
  explanationPt: string;
  examples: readonly A1GrammarExample[];
  review: ReviewMeta;
};

export type A1LessonVocabularyRefs = {
  newIds: readonly string[];
  reusedIds: readonly string[];
  sentenceIds: readonly string[];
};

/** Dataset jogável futuro. A Fase 9A define o contrato, mas não instancia lições. */
export type A1LessonContent = {
  id: string;
  title: string;
  objective: string;
  dialogue: readonly A1DialogueLine[];
  vocabulary: A1LessonVocabularyRefs;
  grammar: readonly A1GrammarNote[];
  exercises: readonly ExerciseSpec[];
  completion: { minScore: number; minCorrect: number };
  review: ReviewMeta;
};

export type A1ContentIssue = {
  code: string;
  path: string;
  message: string;
};

export type A1BlueprintIssue = {
  code: string;
  path: string;
  message: string;
};
