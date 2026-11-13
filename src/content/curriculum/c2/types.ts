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

export type C2Skill = CourseSkill;
export type C2VocabularyTarget = CourseVocabularyTarget;
export type C2AssessmentPlan = CourseAssessmentPlan;
export type C2LessonContent = CourseLessonContent;
export type C2CheckpointContent = CourseCheckpointContent;
export type C2ContentIssue = CourseContentIssue;
export type C2BlueprintIssue = CourseBlueprintIssue;
export type C2ReadingText = CourseReadingText;

export type C2LessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  previousKnowledge: readonly string[];
  prerequisites: readonly string[];
  vocabulary: C2VocabularyTarget;
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
  assessment: C2AssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type C2CheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly C2Skill[];
  assessment: C2AssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type C2ModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type C2CurriculumBlueprint = {
  version: 1;
  courseId: "ko-c2";
  status: "blueprint";
  prerequisite: "ko-c1";
  entryPrerequisiteStep: "c1-c08";
  modules: readonly C2ModuleBlueprint[];
  lessons: readonly C2LessonBlueprint[];
  checkpoints: readonly C2CheckpointBlueprint[];
  review: ReviewMeta;
};
