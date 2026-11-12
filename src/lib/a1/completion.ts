import type { A1LessonContent } from "@/content/curriculum/a1/types";
import type { CourseDefinition } from "@/content/courses/types";
import type { Progress } from "@/lib/storage";
import {
  buildCourseCompletionReport,
  courseVocabularyFacts,
  type CourseCompletionReport,
  type CourseVocabularyFacts,
} from "@/lib/courses/completion";

export type A1VocabularyFacts = CourseVocabularyFacts;
export type A1CompletionReport = CourseCompletionReport;

/** Compatibilidade: fatos lexicais do A1 sobre a implementação compartilhada. */
export function a1VocabularyFacts(
  lessons: readonly A1LessonContent[],
): A1VocabularyFacts {
  return courseVocabularyFacts(lessons);
}

/** Compatibilidade: relatório do A1 sobre a implementação compartilhada. */
export function buildA1CompletionReport(
  progress: Progress,
  now: Date,
  course: Pick<CourseDefinition, "id" | "status" | "steps">,
  facts: A1VocabularyFacts,
): A1CompletionReport {
  return buildCourseCompletionReport(progress, now, course, facts);
}

export { buildCourseCompletionReport, courseVocabularyFacts };
