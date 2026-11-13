import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabEntry, VocabSentence } from "./types";
import type { B2VocabRow } from "./b2-shared";
import { B2_M01_ROWS } from "./b2-m01";
import { B2_M02_ROWS } from "./b2-m02";
import { B2_M03_ROWS } from "./b2-m03";
import { B2_M04_ROWS } from "./b2-m04";
import { B2_M05_ROWS } from "./b2-m05";
import { B2_M06_ROWS } from "./b2-m06";
import { B2_M07_ROWS } from "./b2-m07";
import { B2_M08_ROWS } from "./b2-m08";

const review: ReviewMeta = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso B2; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
};

export const B2_COURSE_ROWS: readonly B2VocabRow[] = [
  ...B2_M01_ROWS, ...B2_M02_ROWS, ...B2_M03_ROWS, ...B2_M04_ROWS,
  ...B2_M05_ROWS, ...B2_M06_ROWS, ...B2_M07_ROWS, ...B2_M08_ROWS,
];

export const B2_COURSE_VOCABULARY: readonly VocabEntry[] = B2_COURSE_ROWS.map(
  ([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`, ko, pt, pos, course: "ko-b2", lesson,
    audioText: ko, ...(notes ? { notes } : {}), review,
  }),
);

export const B2_COURSE_SENTENCES: readonly VocabSentence[] = B2_COURSE_ROWS.map(
  ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
    id: `sent:${lesson}:${ko}`, vocabId: `ko:${ko}`,
    ko: koSentence, pt: ptSentence, target, contextMeaning,
    review: {
      status: "in-review",
      notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
    },
  }),
);

const ROWS_BY_LESSON = new Map<string, B2VocabRow[]>();
for (const row of B2_COURSE_ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newB2VocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function b2SentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}
