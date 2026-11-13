import type { VocabEntry, VocabSentence } from "./types";
import type { C1VocabRow } from "./c1-shared";
import { C1_M01_ROWS } from "./c1-m01";
import { C1_M02_ROWS } from "./c1-m02";
import { C1_M03_ROWS } from "./c1-m03";
import { C1_M04_ROWS } from "./c1-m04";
import { C1_M05_ROWS } from "./c1-m05";
import { C1_M06_ROWS } from "./c1-m06";
import { C1_M07_ROWS } from "./c1-m07";
import { C1_M08_ROWS } from "./c1-m08";

const review = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso C1; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
} as const;

export const C1_COURSE_ROWS: readonly C1VocabRow[] = [
  ...C1_M01_ROWS, ...C1_M02_ROWS, ...C1_M03_ROWS, ...C1_M04_ROWS,
  ...C1_M05_ROWS, ...C1_M06_ROWS, ...C1_M07_ROWS, ...C1_M08_ROWS,
];

export const C1_COURSE_VOCABULARY: readonly VocabEntry[] = C1_COURSE_ROWS.map(
  ([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`, ko, pt, pos, course: "ko-c1", lesson,
    audioText: ko, ...(notes ? { notes } : {}), review,
  }),
);

export const C1_COURSE_SENTENCES: readonly VocabSentence[] = C1_COURSE_ROWS.map(
  ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
    id: `sent:${lesson}:${ko}`, vocabId: `ko:${ko}`,
    ko: koSentence, pt: ptSentence, target, contextMeaning,
    review: {
      status: "in-review",
      notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
    },
  }),
);

const ROWS_BY_LESSON = new Map<string, C1VocabRow[]>();
for (const row of C1_COURSE_ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newC1VocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function c1SentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}
