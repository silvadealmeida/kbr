import type { A1LessonContent } from "@/content/curriculum/a1/types";
import type { CourseDefinition } from "@/content/courses/types";
import type { Progress } from "@/lib/storage";
import { REMOVED_DUE, vocabCardKey } from "@/lib/vocabulary/state";
import { summarizeCourseProgress } from "@/lib/courses/progress";

export type A1VocabularyFacts = {
  /** Identidades novas apresentadas pelo curso A1. */
  introduced: number;
  /** Identidades de outros cursos retomadas explicitamente no A1. */
  reused: number;
  /** Identidades distintas apresentadas ou retomadas. */
  ids: readonly string[];
};

export type A1CompletionReport = {
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
  /** Palavras do A1 salvas pelo aluno em `Progress.cards`. */
  vocabSaved: number;
  /** Palavras do A1 salvas e vencidas neste momento. */
  vocabDue: number;
};

/** Fatos lexicais derivados das lições, para não enviar o conteúdo ao cliente. */
export function a1VocabularyFacts(
  lessons: readonly A1LessonContent[],
): A1VocabularyFacts {
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
 * Relatório de conclusão do A1 derivado exclusivamente do `Progress` v1, do
 * registro de curso e dos fatos lexicais. Não grava nada, não cria estatística
 * estimada e não usa `streak` como fonte de sequência.
 */
export function buildA1CompletionReport(
  progress: Progress,
  now: Date,
  course: CourseDefinition,
  facts: A1VocabularyFacts,
): A1CompletionReport {
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
