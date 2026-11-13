import { describe, expect, test } from "vitest";

import { A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1/content";
import { A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2/content";
import { B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1/content";
import { B2_IMPLEMENTED_LESSONS } from "@/content/curriculum/b2/content";
import { C1_IMPLEMENTED_LESSONS } from "@/content/curriculum/c1/content";
import { C2_IMPLEMENTED_LESSONS } from "@/content/curriculum/c2/content";
import { findUnusedReusedRefs } from "@/content/curriculum/validate-reuse";
import { VOCAB_ENTRIES, type VocabEntry } from "@/content/vocabulary";
import baseline from "../fixtures/reused-ids-baseline.json";

const REVIEW = { status: "in-review" as const };

function entry(id: string, ko: string): VocabEntry {
  return {
    id,
    ko,
    pt: "teste",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: ko,
    review: REVIEW,
  };
}

describe("auditoria de reusedIds", () => {
  test("não introduz novas referências sem ocorrência no texto da lição", () => {
    const current = findUnusedReusedRefs(
      [...A1_IMPLEMENTED_LESSONS, ...A2_IMPLEMENTED_LESSONS, ...B1_IMPLEMENTED_LESSONS, ...B2_IMPLEMENTED_LESSONS, ...C1_IMPLEMENTED_LESSONS, ...C2_IMPLEMENTED_LESSONS],
      VOCAB_ENTRIES,
    );
    const frozen = new Set(baseline.refs);
    const added = current
      .map((ref) => `${ref.step}:${ref.id}`)
      .filter((key) => !frozen.has(key));
    expect(added).toEqual([]);
  });

  test("distingue forma presente de forma ausente", () => {
    const lesson = A1_IMPLEMENTED_LESSONS[0]!;
    const present = entry("ko:안녕하세요", "안녕하세요");
    const absent = entry("ko:없는말", "없는말");
    const fixture = {
      ...lesson,
      vocabulary: {
        ...lesson.vocabulary,
        reusedIds: [present.id, absent.id],
      },
    };
    const refs = findUnusedReusedRefs([fixture], [present, absent]);
    expect(refs).toEqual([
      { step: lesson.id, id: absent.id, form: absent.ko },
    ]);
  });
});
