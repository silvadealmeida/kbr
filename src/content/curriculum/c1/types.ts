import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type {
  CourseAssessmentPlan,
  CourseCheckpointContent,
  CourseContentIssue,
  CourseLessonContent,
  CourseReadingText,
  CourseSkill,
  CourseVocabularyTarget,
  CourseBlueprintIssue,
} from "../course-types";

export type C1Skill = CourseSkill;
export type C1VocabularyTarget = CourseVocabularyTarget;
export type C1AssessmentPlan = CourseAssessmentPlan;
export type C1LessonContent = CourseLessonContent;
export type C1CheckpointContent = CourseCheckpointContent;
export type C1ContentIssue = CourseContentIssue;
export type C1BlueprintIssue = CourseBlueprintIssue;
export type C1ReadingText = CourseReadingText;

export type C1LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  previousKnowledge: readonly string[];
  prerequisites: readonly string[];
  vocabulary: C1VocabularyTarget;
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
  assessment: C1AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type C1CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly C1Skill[];
  assessment: C1AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type C1ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type C1CurriculumBlueprint = {
  version: 1;
  courseId: "ko-c1";
  status: "blueprint";
  prerequisite: "ko-b2";
  entryPrerequisiteStep: "b2-c08";
  modules: readonly C1ModuleBlueprint[];
  lessons: readonly C1LessonBlueprint[];
  checkpoints: readonly C1CheckpointBlueprint[];
  review: ReviewMeta;
};
