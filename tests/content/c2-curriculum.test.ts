import { describe, expect, it } from "vitest";
import {
  C2_CHECKPOINTS,
  C2_CURRICULUM,
  C2_IMPLEMENTED_CHECKPOINTS,
  C2_IMPLEMENTED_LESSONS,
  C2_LESSONS,
  C2_MODULES,
  validateC2Blueprint,
  validateC2Content,
} from "@/content/curriculum/c2";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

describe("conteúdo C2", () => {
  it("passa na validação estrutural", () => {
    expect(validateC2Content()).toEqual([]);
  });

  it("blueprint tem 8 módulos, 40 lições e 8 checkpoints", () => {
    expect(validateC2Blueprint(C2_CURRICULUM)).toEqual([]);
    expect(C2_MODULES).toHaveLength(8);
    expect(C2_LESSONS).toHaveLength(40);
    expect(C2_CHECKPOINTS).toHaveLength(8);
  });

  it("vocabulário C2 registrado tem 8 identidades por lição implementada", () => {
    const newEntries = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-c2");
    expect(newEntries).toHaveLength(C2_IMPLEMENTED_LESSONS.length * 8);
    const newSentences = VOCAB_SENTENCES.filter((sentence) =>
      sentence.id.startsWith("sent:c2-"),
    );
    expect(newSentences).toHaveLength(C2_IMPLEMENTED_LESSONS.length * 8);
  });

  it("lições implementadas têm 10 itens, leitura longa e produção", () => {
    for (const lesson of C2_IMPLEMENTED_LESSONS) {
      expect(lesson.exercises).toHaveLength(10);
      expect(lesson.readingText?.paragraphs.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(lesson.production?.rubric).toHaveLength(6);
      expect(lesson.production?.sample?.ko).toBeTruthy();
    }
  });

  it("checkpoints implementados usam o limiar do blueprint", () => {
    for (const checkpoint of C2_IMPLEMENTED_CHECKPOINTS) {
      const plan = C2_CHECKPOINTS.find((item) => item.id === checkpoint.id);
      expect(plan).toBeTruthy();
      expect(checkpoint.passingScore).toBe(80);
      expect(checkpoint.minCorrect).toBe(plan?.assessment.minCorrect);
      expect(checkpoint.production?.rubric).toHaveLength(6);
    }
  });
});
