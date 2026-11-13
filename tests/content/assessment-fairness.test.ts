import { describe, expect, test } from "vitest";

import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1/content";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2/content";
import { checkAnswer } from "@/lib/exercises";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";

const A2_EXERCISES = [
  ...A2_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...A2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];
const A1_EXERCISES = [
  ...A1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...A1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

function textExercises(exercises: typeof A1_EXERCISES) {
  return exercises.filter(
    (exercise) =>
      exercise.type === "cloze" ||
      exercise.type === "listen" ||
      exercise.type === "translate",
  );
}

describe("justiça de correção — pontuação final", () => {
  test("gera somente a variante sem o sinal final", () => {
    expect(terminalPunctuationVariants("저는 학생이에요.")).toEqual([
      "저는 학생이에요",
    ]);
    expect(terminalPunctuationVariants("Vamos juntos?")).toEqual(["Vamos juntos"]);
    expect(terminalPunctuationVariants("정말요!")).toEqual(["정말요"]);
    expect(terminalPunctuationVariants("저는 학생이에요")).toEqual([]);
    expect(sameAnswerText("저는  학생이에요", "저는 학생이에요")).toBe(true);
  });

  test("todo item digitado do A2 aceita a forma sem pontuação final", () => {
    const strict = textExercises(A2_EXERCISES).flatMap((exercise) => {
      if (exercise.type === "cloze" || exercise.type === "listen" || exercise.type === "translate") {
        const variants = terminalPunctuationVariants(exercise.answer);
        if (variants.length === 0) return [];
        return variants.some(
          (variant) =>
            checkAnswer(exercise, { kind: "text", value: variant }).correct,
        )
          ? []
          : [exercise.id];
      }
      return [];
    });
    expect(strict).toEqual([]);
  });

  test("o A1 também não depende de pontuação final", () => {
    const strict = textExercises(A1_EXERCISES).flatMap((exercise) => {
      if (exercise.type === "cloze" || exercise.type === "listen" || exercise.type === "translate") {
        const variants = terminalPunctuationVariants(exercise.answer);
        if (variants.length === 0) return [];
        return variants.some(
          (variant) =>
            checkAnswer(exercise, { kind: "text", value: variant }).correct,
        )
          ? []
          : [exercise.id];
      }
      return [];
    });
    expect(strict).toEqual([]);
  });
});

describe("unidade de resposta da escuta", () => {
  const listens = [...A1_EXERCISES, ...A2_EXERCISES].filter(
    (exercise) => exercise.type === "listen",
  );

  test("enunciado não pede fragmento quando o gabarito é frase inteira", () => {
    const bad = listens.flatMap((exercise) => {
      if (exercise.type !== "listen") return [];
      if (!exercise.prompt.includes("Ouça e escreva")) return [];
      const tokens = exercise.answer.trim().split(/\s+/);
      if (tokens.length < 2) return [];
      if (exercise.prompt.includes("frase")) return [];
      const accepted = exercise.acceptedAnswers ?? [];
      const hasFragment = accepted.some(
        (value) =>
          !sameAnswerText(value, exercise.answer) &&
          exercise.answer.includes(value) &&
          value.trim().split(/\s+/).length < tokens.length,
      );
      return hasFragment ? [] : [exercise.id];
    });
    expect(bad).toEqual([]);
  });

  test("todo listen A1/A2 pede a frase completa ou aceita um fragmento", () => {
    const missing = listens.flatMap((exercise) => {
      if (exercise.type !== "listen") return [];
      if (!exercise.prompt.includes("Ouça e escreva")) return [];
      return exercise.prompt.includes("frase") ||
        (exercise.acceptedAnswers ?? []).some(
          (value) => !sameAnswerText(value, exercise.answer),
        )
        ? []
        : [exercise.id];
    });
    expect(missing).toEqual([]);
  });
});
