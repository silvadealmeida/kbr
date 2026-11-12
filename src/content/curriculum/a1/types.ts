import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type {
  CourseAssessmentPlan,
  CourseCheckpointContent,
  CourseContentIssue,
  CourseDialogueLine,
  CourseExerciseStage,
  CourseGrammarExample,
  CourseGrammarNote,
  CourseIntroPanel,
  CourseLessonContent,
  CourseLessonExercise,
  CourseLessonVocabularyRefs,
  CourseSkill,
  CourseVocabularyTarget,
  CourseBlueprintIssue,
} from "../course-types";

export type A1Skill = CourseSkill;
export type A1VocabularyTarget = CourseVocabularyTarget;
export type A1AssessmentPlan = CourseAssessmentPlan;
export type A1IntroPanel = CourseIntroPanel;
export type A1DialogueLine = CourseDialogueLine;
export type A1GrammarExample = CourseGrammarExample;
export type A1GrammarNote = CourseGrammarNote;
export type A1LessonVocabularyRefs = CourseLessonVocabularyRefs;
export type A1ExerciseStage = CourseExerciseStage;
export type A1LessonExercise = CourseLessonExercise;
export type A1LessonContent = CourseLessonContent;
export type A1CheckpointContent = CourseCheckpointContent;
export type A1ContentIssue = CourseContentIssue;
export type A1BlueprintIssue = CourseBlueprintIssue;

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
