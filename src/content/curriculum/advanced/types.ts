import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type {
  CourseAssessmentPlan,
  CourseBlueprintIssue,
  CourseCheckpointContent,
  CourseContentIssue,
  CourseLessonContent,
  CourseReadingText,
  CourseSkill,
  CourseVocabularyTarget,
} from "../course-types";

export type AdvancedCourseId = "ko-c1" | "ko-c2";
export type AdvancedSkill = CourseSkill;
export type AdvancedVocabularyTarget = CourseVocabularyTarget;
export type AdvancedAssessmentPlan = CourseAssessmentPlan;
export type AdvancedLessonContent = CourseLessonContent;
export type AdvancedCheckpointContent = CourseCheckpointContent;
export type AdvancedContentIssue = CourseContentIssue;
export type AdvancedBlueprintIssue = CourseBlueprintIssue;
export type AdvancedReadingText = CourseReadingText;

export type AdvancedLessonBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  communicativeGoal: string;
  previousKnowledge: readonly string[];
  prerequisites: readonly string[];
  vocabulary: AdvancedVocabularyTarget;
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
  assessment: AdvancedAssessmentPlan;
  estimatedMinutes: number;
  distributedReviewMinutes: number;
  review: ReviewMeta;
};

export type AdvancedCheckpointBlueprint = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  cumulativeReviewFrom: readonly string[];
  skills: readonly AdvancedSkill[];
  assessment: AdvancedAssessmentPlan;
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type AdvancedModuleBlueprint = {
  id: string;
  number: number;
  title: string;
  communicativeArc: string;
  stepIds: readonly string[];
};

export type AdvancedCurriculumBlueprint = {
  version: 1;
  courseId: AdvancedCourseId;
  status: "blueprint";
  prerequisite: string;
  entryPrerequisiteStep: string;
  modules: readonly AdvancedModuleBlueprint[];
  lessons: readonly AdvancedLessonBlueprint[];
  checkpoints: readonly AdvancedCheckpointBlueprint[];
  review: ReviewMeta;
};

/** Requisitos de conteúdo de um nível avançado (C1 ou C2). */
export type AdvancedContentStandards = {
  courseId: AdvancedCourseId;
  readingMinCharacters: number;
  readingMinParagraphs: number;
  rubricCriteria: readonly string[];
  checkpointFinalId: string;
};
