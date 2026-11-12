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

export type B1Skill = CourseSkill;
export type B1VocabularyTarget = CourseVocabularyTarget;
export type B1AssessmentPlan = CourseAssessmentPlan;
export type B1LessonContent = CourseLessonContent;
export type B1CheckpointContent = CourseCheckpointContent;
export type B1ContentIssue = CourseContentIssue;
export type B1BlueprintIssue = CourseBlueprintIssue;

export type B1LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  prerequisites: readonly string[];
  vocabulary: B1VocabularyTarget;
  grammar: readonly string[];
  dialogueScenario: string;
  listeningObjective: string;
  writingObjective: string;
  exerciseTypes: readonly ExerciseTypeId[];
  reviewDependencies: readonly string[];
  assessment: B1AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type B1CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly B1Skill[];
  assessment: B1AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type B1ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type B1CurriculumBlueprint = {
  version: 1;
  courseId: "ko-b1";
  status: "blueprint";
  /** A conclusão do A2 é o pré-requisito de entrada do curso, testado no player. */
  prerequisite: "ko-a2";
  modules: readonly B1ModuleBlueprint[];
  lessons: readonly B1LessonBlueprint[];
  checkpoints: readonly B1CheckpointBlueprint[];
  review: ReviewMeta;
};
