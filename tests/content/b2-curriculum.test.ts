import { describe, expect, it } from "vitest";
import {
  B2_CHECKPOINTS,
  B2_CURRICULUM,
  B2_IMPLEMENTED_CHECKPOINTS,
  B2_IMPLEMENTED_LESSONS,
  B2_LESSONS,
  B2_MODULES,
  validateB2Blueprint,
  validateB2Content,
} from "@/content/curriculum/b2";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

describe("conteúdo B2", () => {
  it("passa na validação estrutural", () => {
    expect(validateB2Content()).toEqual([]);
  });

  it("blueprint tem 8 módulos, 40 lições e 8 checkpoints", () => {
    expect(validateB2Blueprint(B2_CURRICULUM)).toEqual([]);
    expect(B2_MODULES).toHaveLength(8);
    expect(B2_LESSONS).toHaveLength(40);
    expect(B2_CHECKPOINTS).toHaveLength(8);
  });

  it("vocabulário B2 registrado tem 8 identidades por lição implementada", () => {
    const newEntries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-b2");
    expect(newEntries).toHaveLength(B2_IMPLEMENTED_LESSONS.length * 8);
    const newSentences = VOCAB_SENTENCES.filter((sentence) =>
      sentence.id.startsWith("sent:b2-"),
    );
    expect(newSentences).toHaveLength(B2_IMPLEMENTED_LESSONS.length * 8);
  });

  it("lições implementadas têm 10 itens, leitura longa e produção", () => {
    for (const lesson of B2_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.readingText?.paragraphs.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(lesson.production?.rubric).toHaveLength(5);
      expect(lesson.production?.sample?.ko).toBeTruthy();
    }
  });

  it("checkpoints implementados usam o limiar do blueprint", () => {
    for (const checkpoint of B2_IMPLEMENTED_CHECKPOINTS) {
      const plan = B2_CHECKPOINTS.find((item) => item.id === checkpoint.id);
      expect(plan).toBeTruthy();
      expect(checkpoint.passingScore).toBe(80);
      expect(checkpoint.minCorrect).toBe(plan?.assessment.minCorrect);
      expect(checkpoint.production?.rubric).toHaveLength(5);
    }
  });
});
