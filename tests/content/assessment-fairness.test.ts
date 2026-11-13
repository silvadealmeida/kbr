import { describe, expect, test } from "vitest";

import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1/content";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2/content";
import { B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1/content";
import { checkAnswer } from "@/lib/exercises";
import {
  sameAnswerText,
  terminalPunctuationVariants,
} from "@/lib/exercises/punctuation";

const ALL_EXERCISES = [
  ...A1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...A1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
  ...A2_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...A2_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
  ...B1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...B1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

function textExercises(exercises: typeof ALL_EXERCISES) {
  return exercises.filter(
    (exercise) =>
      exercise.type === "cloze" ||
      exercise.type === "listen" ||
      exercise.type === "translate",
  );
}

function withoutFinalPunctuation(value: string): string {
  return value.trim().replace(/[.?!]$/, "");
}

/** A variante de pontuação final não é um fragmento de resposta. */
function isPunctuationVariant(candidate: string, answer: string): boolean {
  return sameAnswerText(
    withoutFinalPunctuation(candidate),
    withoutFinalPunctuation(answer),
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

  test("todo item digitado de A1, A2 e B1 aceita a forma sem pontuação final", () => {
    const strict = textExercises(ALL_EXERCISES).flatMap((exercise) => {
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
  const listens = ALL_EXERCISES.filter(
    (exercise) => exercise.type === "listen",
  );

  test("enunciado não pede fragmento quando o gabarito é frase inteira", () => {
    const bad = listens.flatMap((exercise) => {
      if (exercise.type !== "listen") return [];
      if (!exercise.prompt.includes("Ouça e escreva")) return [];
      const tokens = exercise.answer.trim().split(/\s+/);
      if (tokens.length < 2) return [];
      if (exercise.prompt.toLowerCase().includes("frase")) return [];
      const accepted = exercise.acceptedAnswers ?? [];
      const hasFragment = accepted.some(
        (value) =>
          !sameAnswerText(value, exercise.answer) &&
          !isPunctuationVariant(value, exercise.answer) &&
          exercise.answer.includes(value) &&
          value.trim().split(/\s+/).length < tokens.length,
      );
      return hasFragment ? [] : [exercise.id];
    });
    expect(bad).toEqual([]);
  });

  test("todo listen pede a frase completa ou aceita um fragmento", () => {
    const missing = listens.flatMap((exercise) => {
      if (exercise.type !== "listen") return [];
      if (!exercise.prompt.includes("Ouça e escreva")) return [];
      return exercise.prompt.toLowerCase().includes("frase") ||
        (exercise.acceptedAnswers ?? []).some(
          (value) =>
            !sameAnswerText(value, exercise.answer) &&
            !isPunctuationVariant(value, exercise.answer),
        )
        ? []
        : [exercise.id];
    });
    expect(missing).toEqual([]);
  });
});
