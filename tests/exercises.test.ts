import { describe, expect, test } from "vitest";
import { check, type ExerciseSpec } from "@/lib/exercises";

describe("validação de exercícios", () => {
  const textExercises: ExerciseSpec[] = [
    { id: "c1", type: "cloze", prompt: "Complete", answer: "안녕하세요" },
    { id: "l1", type: "listen", prompt: "Ouça", audioText: "감사합니다", answer: "감사합니다" },
    {
      id: "t1",
      type: "translate",
      prompt: "Traduza",
      direction: "ko-pt",
      answer: "obrigado",
      acceptedAnswers: ["obrigada"],
    },
  ];

  test.each(textExercises)("valida resposta do tipo $type", (spec) => {
    const expected = spec.type === "build-syllable" || spec.type === "mcq" ? "" : spec.answer;
    expect(check(spec, `  ${expected.toLocaleUpperCase("pt-BR")}  `).correct).toBe(true);
    expect(check(spec, "resposta errada").correct).toBe(false);
  });

  test("valida múltipla escolha e preserva a explicação", () => {
    const spec: ExerciseSpec = {
      id: "m1",
      type: "mcq",
      prompt: "Escolha",
      options: ["가", "나"],
      correctAnswer: "가",
      explanation: "가 combina ㄱ e ㅏ.",
    };

    expect(check(spec, "가")).toEqual({
      correct: true,
      expected: "가",
      explanation: "가 combina ㄱ e ㅏ.",
    });
  });

  test("deriva a resposta do construtor de sílabas", () => {
    const spec: ExerciseSpec = {
      id: "b1",
      type: "build-syllable",
      prompt: "Monte a sílaba",
      initial: "ㅎ",
      medial: "ㅏ",
      final: "ㄴ",
    };

    expect(check(spec, "한")).toMatchObject({ correct: true, expected: "한" });
  });

  test("normaliza espaços internos e Unicode composto", () => {
    const spec: ExerciseSpec = {
      id: "t2",
      type: "translate",
      prompt: "Traduza",
      direction: "ko-pt",
      answer: "até amanhã",
    };

    expect(check(spec, "ate\u0301   amanha\u0303").correct).toBe(true);
  });
});
