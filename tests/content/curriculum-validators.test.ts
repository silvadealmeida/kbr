import { describe, expect, test } from "vitest";

import { validateExerciseSpec } from "@/content/curriculum/validate-exercises";
import { targetBoundaryIssue } from "@/content/vocabulary/validate";
import type { ExerciseSpec } from "@/lib/exercises";

const base = {
  prompt: "Enunciado de teste.",
  tags: ["test"],
} as const;

function codes(exercise: ExerciseSpec, options?: { checkRedundantAccepted?: boolean }) {
  return validateExerciseSpec(exercise, "fixture", options).map((issue) => issue.code);
}

describe("validador compartilhado de exercícios", () => {
  test("aceita fixtures corretas", () => {
    expect(
      codes({
        ...base,
        id: "ok-mcq",
        type: "mcq",
        options: ["A", "B", "C"],
        correctAnswer: "B",
      }),
    ).toEqual([]);
    expect(
      codes({
        ...base,
        id: "ok-reading",
        type: "reading",
        text: "Texto.",
        mode: "mcq",
        question: "Pergunta?",
        options: [
          { id: "o1", label: "A" },
          { id: "o2", label: "B" },
        ],
        correctOptionId: "o2",
      }),
    ).toEqual([]);
    expect(
      codes({
        ...base,
        id: "ok-cloze",
        type: "cloze",
        prompt: "제 ___는 선생님이에요.",
        answer: "언니",
        acceptedAnswers: ["언니"],
      }),
    ).toEqual([]);
    expect(
      codes({
        ...base,
        id: "ok-listen",
        type: "listen",
        audioText: "저는 학생이에요.",
        answer: "저는 학생이에요.",
        acceptedAnswers: ["저는 학생이에요"],
      }),
    ).toEqual([]);
  });

  test("rejeita gabarito de MCQ fora das opções", () => {
    expect(
      codes({
        ...base,
        id: "bad-mcq",
        type: "mcq",
        options: ["Foi a uma fonte termal.", "Morou no exterior."],
        correctAnswer: "Foi uma fonte termal.",
      }),
    ).toContain("mcq-answer-not-in-options");
  });

  test("rejeita referência de leitura e de escolha que não existe", () => {
    expect(
      codes({
        ...base,
        id: "bad-reading",
        type: "reading",
        text: "Texto.",
        mode: "mcq",
        options: [{ id: "o1", label: "A" }],
        correctOptionId: "o9",
      }),
    ).toContain("reading-answer-dangling");
    expect(
      codes({
        ...base,
        id: "bad-choice",
        type: "minimal-pair",
        presentation: "text",
        text: "가",
        options: [{ id: "a", label: "가" }],
        correctOptionId: "b",
        contrast: { feature: "teste", a: "가", b: "카" },
        tags: ["test"],
      }),
    ).toContain("choice-answer-dangling");
  });

  test("rejeita partícula fixa incompatível com o batchim da resposta", () => {
    expect(
      codes({
        ...base,
        id: "bad-particle",
        type: "cloze",
        prompt: "제 ___은 선생님이에요.",
        answer: "언니",
      }),
    ).toContain("cloze-particle");
    expect(
      codes({
        ...base,
        id: "bad-particle-2",
        type: "cloze",
        prompt: "저는 ___을 읽어요.",
        answer: "학교",
      }),
    ).toContain("cloze-particle");
  });

  test("não decide partícula quando a resposta é frase ou tem pontuação", () => {
    expect(
      codes({
        ...base,
        id: "ambiguous",
        type: "cloze",
        prompt: "제 ___은 선생님이에요.",
        answer: "우리 언니",
      }),
    ).toEqual([]);
    expect(
      codes({
        ...base,
        id: "ambiguous-2",
        type: "cloze",
        prompt: "제 ___은 선생님이에요.",
        answer: "언니.",
      }),
    ).toEqual([]);
  });

  test("rejeita variantes vazias e redundantes quando a checagem é ligada", () => {
    expect(
      codes({
        ...base,
        id: "empty",
        type: "translate",
        direction: "pt-ko",
        answer: " ",
        acceptedAnswers: [" "],
      }),
    ).toEqual(expect.arrayContaining(["answer-empty", "accepted-empty"]));
    expect(
      codes(
        {
          ...base,
          id: "redundant",
          type: "translate",
          direction: "pt-ko",
          answer: "저는 학생이에요.",
          acceptedAnswers: ["저는 학생이에요."],
        },
        { checkRedundantAccepted: true },
      ),
    ).toContain("accepted-redundant");
  });

  test("rejeita listen cujo áudio não coincide com resposta ou variante", () => {
    expect(
      codes({
        ...base,
        id: "bad-listen",
        type: "listen",
        audioText: "저는 학생이에요.",
        answer: "저는 선생님이에요.",
      }),
    ).toContain("listen-audio-answer");
  });
});

describe("fronteira do alvo contextual", () => {
  const noun = { pos: "substantivo" as const };

  test("aceita partícula, verbalizador e alvo isolado", () => {
    expect(
      targetBoundaryIssue({ ko: "감기가 심해요.", target: "감기" }, noun),
    ).toBeNull();
    expect(
      targetBoundaryIssue({ ko: "지갑을 분실했어요.", target: "분실" }, noun),
    ).toBeNull();
    expect(
      targetBoundaryIssue({ ko: "감기 때문에 쉬었어요.", target: "감기" }, noun),
    ).toBeNull();
  });

  test("rejeita substantivo dentro de palavra maior", () => {
    expect(
      targetBoundaryIssue({ ko: "감기약 있어요?", target: "감기" }, noun),
    ).toContain("dentro de");
    expect(
      targetBoundaryIssue({ ko: "해외여행을 좋아해요.", target: "해외" }, noun),
    ).toContain("dentro de");
  });

  test("não opina sobre verbos, adjetivos ou alvo já separado", () => {
    expect(
      targetBoundaryIssue({ ko: "설명해 주세요.", target: "설명" }, {
        pos: "verbo",
      }),
    ).toBeNull();
    expect(
      targetBoundaryIssue({ ko: "감기 약이 있어요.", target: "감기" }, noun),
    ).toBeNull();
  });
});
