import type { ExerciseSpec } from "@/lib/exercises";
import type { Final, Initial, Medial } from "@/lib/hangul";

export type ContentStatus = "draft" | "in-review" | "reviewed";

export type ReviewMeta = {
  status: ContentStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
};

export type JamoRecord = {
  symbol: string;
  kind: "consonant" | "vowel";
  nameKo: string;
  namePt: string;
  ipa: readonly string[];
  introducedIn: string;
  tags: readonly string[];
  notes?: string;
  review: ReviewMeta;
};

export type SyllableRecord = {
  id: string;
  text: string;
  initial: Initial;
  medial: Medial;
  final: Final;
  introducedIn: string;
  audioText?: string;
  review: ReviewMeta;
};

export type WordRecord = {
  id: string;
  ko: string;
  pt: string;
  syllables: readonly string[];
  introducedIn: string;
  tags: readonly string[];
  audioText?: string;
  notes?: string;
  review: ReviewMeta;
};

export type ExampleRef = {
  kind: "word" | "syllable";
  id: string;
};

export type LessonPanel = {
  title: string;
  body: string;
  ko?: string;
};

/**
 * Critério adicional de conclusão. Permite representar regras documentadas que
 * não cabem em "todos os itens obrigatórios", como "3 dos 4 contrastes".
 */
export type CompletionRule = {
  id: string;
  label: string;
  exerciseIds: readonly string[];
  minCorrect: number;
};

export type Lesson = {
  id: string;
  unit: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  objective: string;
  objectives: readonly string[];
  intro: readonly LessonPanel[];
  prerequisites: readonly string[];
  newJamo: readonly string[];
  newFinals: readonly Exclude<Final, "">[];
  examples: readonly ExampleRef[];
  exercises: readonly ExerciseSpec[];
  estimatedMinutes: number;
  completion: {
    minScore: number;
    /**
     * Critério autoritativo em número de acertos, quando o currículo documenta
     * uma fração que não coincide com a porcentagem arredondada (ex.: 19/24).
     */
    minCorrect?: number;
    requiredExerciseIds?: readonly string[];
    rules?: readonly CompletionRule[];
  };
  review: ReviewMeta;
};

export type RuleRecord = {
  id: string;
  kind: "liaison" | "nasalization" | "aspiration" | "batchim";
  title: string;
  explanation: string;
  introducedIn: string;
  examples: readonly { written: string; spoken: string; note?: string }[];
  review: ReviewMeta;
};

export type Checkpoint = {
  id: string;
  unit: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  objective: string;
  instructions: readonly string[];
  lessonIds: readonly string[];
  exercises: readonly ExerciseSpec[];
  passingScore: number;
  /**
   * Critério autoritativo em número de acertos. `passingScore` continua sendo
   * a porcentagem documentada; o número explícito evita depender do
   * arredondamento exibido (ex.: 19/24 aparece como 79%, mas aprova).
   */
  minCorrect?: number;
  diagnosticTags: readonly string[];
  estimatedMinutes: number;
  review: ReviewMeta;
};

export type Curriculum = {
  version: 1;
  lessons: readonly Lesson[];
  checkpoints: readonly Checkpoint[];
  jamo: readonly JamoRecord[];
  syllables: readonly SyllableRecord[];
  words: readonly WordRecord[];
  rules: readonly RuleRecord[];
};

export type LessonOutline = {
  id: string;
  title: string;
};

export type UnitOutline = {
  unit: Lesson["unit"];
  title: string;
  lessons: readonly LessonOutline[];
  checkpoint?: string;
};
