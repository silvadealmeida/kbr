import type { ReviewMeta } from "@/content/hangul/types";
import type { ExerciseTypeId } from "@/lib/exercises/registry";
import type { ExerciseSpec } from "@/lib/exercises";

/**
 * Contrato compartilhado de lição/checkpoint para cursos de língua (A1, A2…).
 * O modelo não contém estado de aluno: progresso continua no `Progress` v1.
 */
export type CourseSkill =
  | "reading"
  | "listening"
  | "speaking"
  | "writing"
  | "vocabulary"
  | "grammar"
  | "register"
  | "culture";

export type CourseVocabularyTarget = {
  themes: readonly string[];
  newItems: { min: number; max: number };
};

export type CourseAssessmentPlan = {
  automaticItems: number;
  minCorrect: number;
  performance: string;
};

export type CourseIntroPanel = {
  title: string;
  body: string;
  /** Trecho coreano curto já explicado no corpo; nunca é a única instrução. */
  ko?: string;
};

export type CourseDialogueLine = {
  id: string;
  speaker: string;
  ko: string;
  pt: string;
  audioText: string;
  review: ReviewMeta;
};

export type CourseGrammarExample = {
  ko: string;
  pt: string;
  audioText: string;
};

export type CourseGrammarNote = {
  id: string;
  titlePt: string;
  form: string;
  explanationPt: string;
  examples: readonly CourseGrammarExample[];
  review: ReviewMeta;
};

export type CourseLessonVocabularyRefs = {
  newIds: readonly string[];
  reusedIds: readonly string[];
  sentenceIds: readonly string[];
};

export type CourseExerciseStage = "guided" | "independent";

/**
 * Exercício jogável de um curso. `stage` separa a prática guiada da
 * independente sem criar outro tipo de exercício nem mudar a correção.
 */
export type CourseLessonExercise = ExerciseSpec & { stage: CourseExerciseStage };

/** Dataset jogável de uma lição. */
export type CourseLessonContent = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  objective: string;
  /** Pré-requisitos estruturais; a rota só libera com todos concluídos. */
  prerequisites: readonly string[];
  estimatedMinutes: number;
  dialogueTitle: string;
  /** Ensina antes de testar: painéis curtos de introdução ao tema. */
  intro: readonly CourseIntroPanel[];
  dialogue: readonly CourseDialogueLine[];
  vocabulary: CourseLessonVocabularyRefs;
  grammar: readonly CourseGrammarNote[];
  exercises: readonly CourseLessonExercise[];
  /** Fechamento em pt-BR; não substitui a revisão humana do conteúdo. */
  summary: readonly string[];
  completion: { minScore: number; minCorrect: number };
  review: ReviewMeta;
};

/** Checkpoint jogável: avaliação determinística, sem conteúdo novo obrigatório. */
export type CourseCheckpointContent = {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  objective: string;
  instructions: readonly string[];
  lessonIds: readonly string[];
  prerequisites: readonly string[];
  estimatedMinutes: number;
  exercises: readonly CourseLessonExercise[];
  passingScore: number;
  minCorrect: number;
  review: ReviewMeta;
};

export type CourseContentIssue = {
  code: string;
  path: string;
  message: string;
};

export type CourseBlueprintIssue = {
  code: string;
  path: string;
  message: string;
};

export type CourseExerciseTypeId = ExerciseTypeId;
