import { describe, expect, it } from "vitest";
import {
  C1_CHECKPOINTS,
  C1_CURRICULUM,
  C1_IMPLEMENTED_CHECKPOINTS,
  C1_IMPLEMENTED_LESSONS,
  C1_LESSONS,
  C1_MODULES,
  validateC1Blueprint,
  validateC1Content,
} from "@/content/curriculum/c1";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

describe("conteúdo C1", () => {
  it("passa na validação estrutural", () => {
    expect(validateC1Content()).toEqual([]);
  });

  it("blueprint tem 8 módulos, 40 lições e 8 checkpoints", () => {
    expect(validateC1Blueprint(C1_CURRICULUM)).toEqual([]);
    expect(C1_MODULES).toHaveLength(8);
    expect(C1_LESSONS).toHaveLength(40);
    expect(C1_CHECKPOINTS).toHaveLength(8);
  });

  it("vocabulário C1 registrado tem 8 identidades por lição implementada", () => {
    const newEntries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-c1");
    expect(newEntries).toHaveLength(C1_IMPLEMENTED_LESSONS.length * 8);
    const newSentences = VOCAB_SENTENCES.filter((sentence) =>
      sentence.id.startsWith("sent:c1-"),
    );
    expect(newSentences).toHaveLength(C1_IMPLEMENTED_LESSONS.length * 8);
  });

  it("lições implementadas têm 10 itens, leitura longa e produção", () => {
    for (const lesson of C1_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.readingText?.paragraphs.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(lesson.production?.rubric).toHaveLength(6);
      expect(lesson.production?.sample?.ko).toBeTruthy();
    }
  });

  it("checkpoints implementados usam o limiar do blueprint", () => {
    for (const checkpoint of C1_IMPLEMENTED_CHECKPOINTS) {
      const plan = C1_CHECKPOINTS.find((item) => item.id === checkpoint.id);
      expect(plan).toBeTruthy();
      expect(checkpoint.passingScore).toBe(80);
      expect(checkpoint.minCorrect).toBe(plan?.assessment.minCorrect);
      expect(checkpoint.production?.rubric).toHaveLength(6);
    }
  });
});
