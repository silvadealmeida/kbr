import type { CourseLessonContent } from "@/content/curriculum/course-types";
import type { CourseDefinition } from "@/content/courses/types";
import type { Progress } from "@/lib/storage";
import { REMOVED_DUE, vocabCardKey } from "@/lib/vocabulary/state";
import { summarizeCourseProgress } from "./progress";

export type CourseVocabularyFacts = {
  /** Identidades novas apresentadas pelo curso. */
  introduced: number;
  /** Identidades de outros cursos retomadas explicitamente no curso. */
  reused: number;
  /** Identidades distintas apresentadas ou retomadas. */
  ids: readonly string[];
};

export type CourseCompletionReport = {
  complete: boolean;
  totalSteps: number;
  completedSteps: number;
  totalLessons: number;
  completedLessons: number;
  totalCheckpoints: number;
  completedCheckpoints: number;
  percent: number;
  vocabIntroduced: number;
  vocabReused: number;
  vocabTaught: number;
  /** Palavras do curso salvas pelo aluno em `Progress.cards`. */
  vocabSaved: number;
  /** Palavras do curso salvas e vencidas neste momento. */
  vocabDue: number;
};

/** Fatos lexicais derivados das lições, sem enviar o conteúdo ao cliente. */
export function courseVocabularyFacts(
  lessons: readonly CourseLessonContent[],
): CourseVocabularyFacts {
  const introduced = new Set<string>();
  const retaken = new Set<string>();
  for (const lesson of lessons) {
    for (const id of lesson.vocabulary.newIds) introduced.add(id);
    for (const id of lesson.vocabulary.reusedIds) {
      if (!introduced.has(id)) retaken.add(id);
    }
  }
  for (const id of introduced) retaken.delete(id);
  return {
    introduced: introduced.size,
    reused: retaken.size,
    ids: [...introduced, ...retaken],
  };
}

/**
 * Relatório de conclusão derivado do `Progress` v1, do registro de curso e dos
 * fatos lexicais. Não grava nada e não cria estatística estimada.
 */
export function buildCourseCompletionReport(
  progress: Progress,
  now: Date,
  course: Pick<CourseDefinition, "id" | "status" | "steps">,
  facts: CourseVocabularyFacts,
): CourseCompletionReport {
  const summary = summarizeCourseProgress(progress, course);
  let vocabSaved = 0;
  let vocabDue = 0;
  for (const id of facts.ids) {
    const card = progress.cards[vocabCardKey(id)];
    if (!card || card.due === REMOVED_DUE) continue;
    vocabSaved += 1;
    if (Date.parse(card.due) <= now.getTime()) vocabDue += 1;
  }

  return {
    complete: summary.complete,
    totalSteps: summary.totalSteps,
    completedSteps: summary.completedSteps,
    totalLessons: summary.totalLessons,
    completedLessons: summary.completedLessons,
    totalCheckpoints: summary.totalCheckpoints,
    completedCheckpoints: summary.completedCheckpoints,
    percent: summary.percent,
    vocabIntroduced: facts.introduced,
    vocabReused: facts.reused,
    vocabTaught: facts.ids.length,
    vocabSaved,
    vocabDue,
  };
}
