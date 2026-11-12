import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type {
  CourseAssessmentPlan,
  CourseCheckpointContent,
  CourseContentIssue,
  CourseLessonContent,
  CourseLessonExercise,
  CourseSkill,
  CourseVocabularyTarget,
  CourseBlueprintIssue,
} from "../course-types";

export type A2Skill = CourseSkill;
export type A2VocabularyTarget = CourseVocabularyTarget;
export type A2AssessmentPlan = CourseAssessmentPlan;
export type A2LessonContent = CourseLessonContent;
export type A2CheckpointContent = CourseCheckpointContent;
export type A2ContentIssue = CourseContentIssue;
export type A2BlueprintIssue = CourseBlueprintIssue;

export type A2LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  prerequisites: readonly string[];
  vocabulary: A2VocabularyTarget;
  grammar: readonly string[];
  dialogueScenario: string;
  listeningObjective: string;
  writingObjective: string;
  exerciseTypes: readonly ExerciseTypeId[];
  reviewDependencies: readonly string[];
  assessment: A2AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type A2CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly A2Skill[];
  assessment: A2AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type A2ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type A2CurriculumBlueprint = {
  version: 1;
  courseId: "ko-a2";
  status: "blueprint";
  /** A conclusão do A1 é o pré-requisito de entrada do curso, testado no player. */
  prerequisite: "ko-a1";
  modules: readonly A2ModuleBlueprint[];
  lessons: readonly A2LessonBlueprint[];
  checkpoints: readonly A2CheckpointBlueprint[];
  review: ReviewMeta;
};
