import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type {
  CourseAssessmentPlan,
  CourseCheckpointContent,
  CourseContentIssue,
  CourseLessonContent,
  CourseSkill,
  CourseVocabularyTarget,
  CourseBlueprintIssue,
  CourseReadingText,
  CourseProductionRubricCriterion,
} from "../course-types";

export type B2Skill = CourseSkill;
export type B2VocabularyTarget = CourseVocabularyTarget;
export type B2AssessmentPlan = CourseAssessmentPlan;
export type B2LessonContent = CourseLessonContent;
export type B2CheckpointContent = CourseCheckpointContent;
export type B2ContentIssue = CourseContentIssue;
export type B2BlueprintIssue = CourseBlueprintIssue;
export type B2ReadingText = CourseReadingText;
export type B2ProductionCriterion = CourseProductionRubricCriterion;

export type B2LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  /** Conhecimento anterior exigido pelo desenho, além dos pré-requisitos de rota. */
  previousKnowledge: readonly string[];
  prerequisites: readonly string[];
  vocabulary: B2VocabularyTarget;
  grammar: readonly string[];
  discourse: readonly string[];
  dialogueScenario: string;
  readingScenario: string;
  listeningObjective: string;
  readingObjective: string;
  writingObjective: string;
  speakingObjective: string;
  exerciseTypes: readonly ExerciseTypeId[];
  reviewDependencies: readonly string[];
  assessment: B2AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type B2CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly B2Skill[];
  assessment: B2AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type B2ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type B2CurriculumBlueprint = {
  version: 1;
  courseId: "ko-b2";
  status: "blueprint";
  /** O B1 completo é o pré-requisito de entrada; a rota usa `b1-c08`. */
  prerequisite: "ko-b1";
  entryPrerequisiteStep: "b1-c08";
  modules: readonly B2ModuleBlueprint[];
  lessons: readonly B2LessonBlueprint[];
  checkpoints: readonly B2CheckpointBlueprint[];
  review: ReviewMeta;
};
