import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabEntry, VocabSentence } from "./types";
import type { A2VocabRow } from "./a2-shared";
import { A2_M01_ROWS } from "./a2-m01";
import { A2_M02_ROWS } from "./a2-m02";
import { A2_M03_ROWS } from "./a2-m03";
import { A2_M04_ROWS } from "./a2-m04";
import { A2_M05_ROWS } from "./a2-m05";
import { A2_M06_ROWS } from "./a2-m06";
import { A2_M07_ROWS } from "./a2-m07";
import { A2_M08_ROWS } from "./a2-m08";

const review: ReviewMeta = {
  status: "in-review",
  notes:
    "Vocabulário original do KBR para o curso A2; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
};

/** Fonte única das identidades e frases contextuais do A2. */
export const A2_COURSE_ROWS: readonly A2VocabRow[] = [
  ...A2_M01_ROWS,
  ...A2_M02_ROWS,
  ...A2_M03_ROWS,
  ...A2_M04_ROWS,
  ...A2_M05_ROWS,
  ...A2_M06_ROWS,
  ...A2_M07_ROWS,
  ...A2_M08_ROWS,
];

export const A2_COURSE_VOCABULARY: readonly VocabEntry[] =
  A2_COURSE_ROWS.map(([lesson, ko, pt, pos, , , , , notes]) => ({
    id: `ko:${ko}`,
    ko,
    pt,
    pos,
    course: "ko-a2",
    lesson,
    audioText: ko,
    ...(notes ? { notes } : {}),
    review,
  }));

export const A2_COURSE_SENTENCES: readonly VocabSentence[] =
  A2_COURSE_ROWS.map(
    ([lesson, ko, , , target, koSentence, ptSentence, contextMeaning]) => ({
      id: `sent:${lesson}:${ko}`,
      vocabId: `ko:${ko}`,
      ko: koSentence,
      pt: ptSentence,
      target,
      contextMeaning,
      review: {
        status: "in-review",
        notes: `Frase original do KBR para ${lesson}; naturalidade e tradução aguardam revisão de falante nativo.`,
      },
    }),
  );

const ROWS_BY_LESSON = new Map<string, A2VocabRow[]>();
for (const row of A2_COURSE_ROWS) {
  const list = ROWS_BY_LESSON.get(row[0]) ?? [];
  list.push(row);
  ROWS_BY_LESSON.set(row[0], list);
}

export function newA2VocabIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map((row) => `ko:${row[1]}`);
}

export function a2SentenceIdsFor(lessonId: string): readonly string[] {
  return (ROWS_BY_LESSON.get(lessonId) ?? []).map(
    (row) => `sent:${lessonId}:${row[1]}`,
  );
}
