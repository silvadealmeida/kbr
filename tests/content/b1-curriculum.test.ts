import { describe, expect, it } from "vitest";
import { B1_IMPLEMENTED_LESSONS, B1_IMPLEMENTED_CHECKPOINTS, validateB1Content } from "@/content/curriculum/b1";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

describe("conteúdo B1", () => {
  it("passa na validação estrutural", () => {
    expect(validateB1Content()).toEqual([]);
  });
  it("tem vocabulário B1 registrado", () => {
    expect(VOCAB_ENTRIES.filter((e) => e.course === "ko-b1").length).toBe(320);
    expect(VOCAB_SENTENCES.filter((s) => s.id.startsWith("sent:b1-")).length).toBe(320);
  });
  it("lições implementadas têm 10 itens", () => {
    for (const lesson of B1_IMPLEMENTED_LESSONS) expect(lesson.exercises).toHaveLength(10);
  });
});
