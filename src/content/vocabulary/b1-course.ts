import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabEntry, VocabSentence } from "./types";
import type { B1VocabRow } from "./b1-shared";
import { B1_M01_ROWS } from "./b1-m01";
import { B1_M02_ROWS } from "./b1-m02";
import { B1_M03_ROWS } from "./b1-m03";
import { B1_M04_ROWS } from "./b1-m04";
import { B1_M05_ROWS } from "./b1-m05";
import { B1_M06_ROWS } from "./b1-m06";
import { B1_M07_ROWS } from "./b1-m07";
import { B1_M08_ROWS } from "./b1-m08";

const review: ReviewMeta = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso B1; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
};

export const B1_COURSE_ROWS: readonly B1VocabRow[] = [
  ...B1_M01_ROWS, ...B1_M02_ROWS, ...B1_M03_ROWS, ...B1_M04_ROWS,
  ...B1_M05_ROWS, ...B1_M06_ROWS, ...B1_M07_ROWS, ...B1_M08_ROWS,
];

export const B1_COURSE_VOCABULARY: readonly VocabEntry[] = B1_COURSE_ROWS.map(
  ([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`, ko, pt, pos, course: "ko-b1", lesson,
    audioText: ko, ...(notes ? { notes } : {}), review,
  }),
);

export const B1_COURSE_SENTENCES: readonly VocabSentence[] = B1_COURSE_ROWS.map(
  ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
    id: `sent:${lesson}:${ko}`, vocabId: `ko:${ko}`,
    ko: koSentence, pt: ptSentence, target, contextMeaning,
    review: {
      status: "in-review",
      notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
    },
  }),
);

const ROWS_BY_LESSON = new Map<string, B1VocabRow[]>();
for (const row of B1_COURSE_ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newB1VocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function b1SentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}
