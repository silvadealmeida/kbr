import type { VocabEntry, VocabSentence } from "./types";
import type { C2VocabRow } from "./c2-shared";
import { C2_M01_ROWS } from "./c2-m01";
import { C2_M02_ROWS } from "./c2-m02";
import { C2_M03_ROWS } from "./c2-m03";
import { C2_M04_ROWS } from "./c2-m04";
import { C2_M05_ROWS } from "./c2-m05";
import { C2_M06_ROWS } from "./c2-m06";
import { C2_M07_ROWS } from "./c2-m07";
import { C2_M08_ROWS } from "./c2-m08";

const review = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso C2; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
} as const;

export const C2_COURSE_ROWS: readonly C2VocabRow[] = [
  ...C2_M01_ROWS, ...C2_M02_ROWS, ...C2_M03_ROWS, ...C2_M04_ROWS,
  ...C2_M05_ROWS, ...C2_M06_ROWS, ...C2_M07_ROWS, ...C2_M08_ROWS,
];

export const C2_COURSE_VOCABULARY: readonly VocabEntry[] = C2_COURSE_ROWS.map(
  ([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`, ko, pt, pos, course: "ko-c2", lesson,
    audioText: ko, ...(notes ? { notes } : {}), review,
  }),
);

export const C2_COURSE_SENTENCES: readonly VocabSentence[] = C2_COURSE_ROWS.map(
  ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
    id: `sent:${lesson}:${ko}`, vocabId: `ko:${ko}`,
    ko: koSentence, pt: ptSentence, target, contextMeaning,
    review: {
      status: "in-review",
      notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
    },
  }),
);

const ROWS_BY_LESSON = new Map<string, C2VocabRow[]>();
for (const row of C2_COURSE_ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newC2VocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function c2SentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}
