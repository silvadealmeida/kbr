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

  it("폐항 descreve o fechamento do porto, não o fim de uma linha", () => {
    const texts = ([
      ...C2_IMPLEMENTED_LESSONS.flatMap((lesson) => [
        ...lesson.intro.map((panel) => panel.ko),
        ...lesson.dialogue.map((line) => line.ko),
        ...(lesson.readingText?.paragraphs ?? []),
        ...lesson.exercises.flatMap((exercise) =>
          "text" in exercise && typeof exercise.text === "string" ? [exercise.text] : [],
        ),
      ]),
      ...C2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) =>
        checkpoint.exercises.flatMap((exercise) =>
          "text" in exercise && typeof exercise.text === "string" ? [exercise.text] : [],
        ),
      ),
    ] as (string | undefined)[]).filter(
      (text): text is string => typeof text === "string",
    );
    expect(texts.some((text) => /노선이\s*폐항/.test(text))).toBe(false);
    expect(texts.some((text) => /운항이 중단/.test(text))).toBe(true);
    expect(texts.some((text) => /북포항은 사실상 폐항하였다/.test(text))).toBe(true);
  });

  it("o conto mantém dois bilhetes, sem um terceiro bilhete na gaveta", () => {
    const l26 = C2_IMPLEMENTED_LESSONS.find((lesson) => lesson.id === "c2-l26");
    const l27 = C2_IMPLEMENTED_LESSONS.find((lesson) => lesson.id === "c2-l27");
    expect(l26?.readingText?.paragraphs.join("\n")).toContain("표 두 장을 밀어냈다");
    expect(l26?.readingText?.paragraphs.join("\n")).toContain("새 표만 구겨서");
    expect(l26?.readingText?.paragraphs.join("\n")).not.toContain("두 장을 가지고 있었던");
    expect(l27?.readingText?.paragraphs.join("\n")).toContain("오래된 승선권이 남아 있었다");
    expect(l27?.readingText?.paragraphs.join("\n")).not.toContain("한 장 더");
  });
});
