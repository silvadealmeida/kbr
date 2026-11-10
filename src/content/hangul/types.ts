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
    requiredExerciseIds?: readonly string[];
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
  lessonIds: readonly string[];
  exercises: readonly ExerciseSpec[];
  passingScore: number;
  diagnosticTags: readonly string[];
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
