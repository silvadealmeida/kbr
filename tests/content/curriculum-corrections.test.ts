import { describe, expect, test } from "vitest";

import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1/content";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2/content";
import { HANGUL_CURRICULUM } from "@/content/hangul";
import { getVocab, sentencesFor } from "@/content/vocabulary";
import { checkAnswer } from "@/lib/exercises";

/**
 * Regressões da fase 12A. Cada teste trava uma correção linguística verificada
 * na auditoria A0–A2; não certifica naturalidade nem substitui revisão nativa.
 */

function exercise(id: string) {
  const all = [
    ...A1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
    ...A1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
    ...A2_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
    ...A2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
  ];
  const found = all.find((item) => item.id === id);
  if (!found) throw new Error(`Exercício não encontrado: ${id}`);
  return found;
}

describe("correções críticas A0–A2", () => {
  test("a2-l02-e01 aceita uma das opções exibidas", () => {
    const item = exercise("a2-l02-e01");
    expect(item.type).toBe("mcq");
    if (item.type !== "mcq") return;
    expect(item.options).toContain(item.correctAnswer);
    expect(
      checkAnswer(item, { kind: "text", value: item.correctAnswer }).correct,
    ).toBe(true);
  });

  test.each(["a1-l11-e06", "a1-c03-e13"])(
    "%s forma 제 언니는 선생님이에요, não 언니은",
    (id) => {
      const item = exercise(id);
      expect(item.type).toBe("cloze");
      if (item.type !== "cloze") return;
      expect(item.prompt).toContain("제 ___는 선생님이에요.");
      expect(item.prompt).not.toContain("제 ___은 선생님이에요.");
      expect(item.prompt.replace("___", "언니")).toContain(
        "제 언니는 선생님이에요.",
      );
      expect(checkAnswer(item, { kind: "text", value: "언니" }).correct).toBe(true);
    },
  );

  test("a1-l25 ensina 에서 para ponto de encontro", () => {
    const lesson = A1_IMPLEMENTED_LESSONS.find((item) => item.id === "a1-l25")!;
    const note = lesson.grammar.find((item) => item.id === "g:a1-l25-appointment")!;
    expect(note.explanationPt).toContain("에서 para o ponto de encontro");
    expect(note.examples.map((example) => example.ko)).toContain(
      "극장 앞에서 만나요.",
    );
    expect(note.examples.map((example) => example.ko)).not.toContain(
      "극장 앞에 만나요.",
    );
  });

  test("a1-l01-e03 não ensina que nome próprio rejeita 이에요", () => {
    const item = exercise("a1-l01-e03");
    expect(item.type).toBe("cloze");
    if (item.type !== "cloze") return;
    expect(item.explanation).not.toContain("O nome próprio não recebe 이에요");
    expect(item.explanation).toContain("consoante recebem 이에요");
  });

  test("h21-e02 e rule:liaison identificam o batchim ㅁ de 음", () => {
    const item = HANGUL_CURRICULUM.lessons
      .find((lesson) => lesson.id === "h21")!
      .exercises.find((exercise) => exercise.id === "h21-e02")!;
    expect(item.type).toBe("mcq");
    if (item.type !== "mcq") return;
    expect(item.explanation).toContain("ㅁ final de 음");
    expect(item.explanation).not.toContain("ㄱ final de 음");

    const rule = HANGUL_CURRICULUM.rules.find((item) => item.id === "rule:liaison")!;
    const example = rule.examples.find((item) => item.written === "음악")!;
    expect(example.note).toContain("ㅁ de 음");
    expect(example.note).not.toContain("ㄱ de 음");
  });

  test("ko:따라서 usa o conectivo “portanto”, não 따르다 + -아/서", () => {
    const entry = getVocab("ko:따라서")!;
    const [sentence] = sentencesFor(entry.id);
    expect(sentence.ko).not.toBe("규칙을 따라서 행동하세요.");
    expect(sentence.ko).toContain("따라서");
    expect(sentence.pt).toContain("Portanto");
    expect(sentence.target).toBe("따라서");
  });

  test.each([
    ["a1-l09-e09", "영화는 별로 안 보아요"],
    ["a1-l37-e01", "은"],
    ["a2-l13-e08", "삼층이에요"],
    ["a2-l29-e07", "면"],
    ["a2-l29-e07", "는 것이"],
    ["a2-l33-e02", "계셔요"],
    ["a2-l33-e07", "뵀어요"],
    ["a2-c06-e19", "면"],
  ])("%s aceita a variante registrada “%s”", (id, variant) => {
    const item = exercise(id);
    expect(
      checkAnswer(item, { kind: "text", value: variant }).correct,
      `${id}: ${variant}`,
    ).toBe(true);
  });
});
