import { describe, expect, test } from "vitest";
import {
  check,
  checkAnswer,
  type AudioToCharExercise,
  type CharToAudioExercise,
  type ExerciseSpec,
  type ReadingExercise,
} from "@/lib/exercises";

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
    const expected = "answer" in spec ? spec.answer : "";
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

describe("checkAnswer — exercícios do módulo Hangul", () => {
  const listening: AudioToCharExercise = {
    id: "h02-e01",
    type: "audio-to-char",
    prompt: "Ouça",
    audioText: "아",
    fallback: "Som de 'a' aberto.",
    options: [
      { id: "a", jamo: "아" },
      { id: "eo", jamo: "어" },
    ],
    correctOptionId: "a",
    explanation: "아 é ㅇ + ㅏ.",
    tags: ["ㅏ"],
  };

  const describing: CharToAudioExercise = {
    id: "h02-e03",
    type: "char-to-audio",
    prompt: "Escolha o som",
    text: "어",
    options: [
      { id: "eo", audioText: "어", label: "Boca aberta, sem arredondar" },
      { id: "a", audioText: "아", label: "Som de 'a' aberto" },
    ],
    correctOptionId: "eo",
    tags: ["ㅓ"],
  };

  const reading: ReadingExercise = {
    id: "h03-e03",
    type: "reading",
    mode: "mcq",
    prompt: "Leia",
    text: "이",
    question: "Qual é a decomposição?",
    options: [
      { id: "ok", label: "ㅇ + ㅣ" },
      { id: "no", label: "ㅇ + ㅡ" },
    ],
    correctOptionId: "ok",
    tags: ["ㅣ"],
  };

  test("aceita e rejeita alternativas por id", () => {
    expect(checkAnswer(listening, { kind: "choice", optionId: "a" })).toMatchObject({
      correct: true,
      expected: "아",
    });
    expect(checkAnswer(listening, { kind: "choice", optionId: "eo" })).toMatchObject({
      correct: false,
      expected: "아",
    });
    expect(checkAnswer(describing, { kind: "choice", optionId: "eo" }).correct).toBe(true);
    expect(checkAnswer(reading, { kind: "choice", optionId: "no" }).correct).toBe(false);
  });

  test("resposta de tipo incompatível retorna erro controlado, sem lançar", () => {
    const result = checkAnswer(reading, { kind: "text", value: "ㅇ + ㅣ" });
    expect(result.correct).toBe(false);
    expect(result.errorTags).toContain("answer-kind");
    expect(result.explanation).toBe("Resposta incompatível com o exercício.");
  });

  test("monta sílabas e compara com o alvo", () => {
    const build: ExerciseSpec = {
      id: "h02-e05",
      type: "build-syllable",
      prompt: "Monte 아",
      initial: "ㅇ",
      medial: "ㅏ",
      target: "아",
      initialOptions: ["ㅇ"],
      medialOptions: ["ㅏ", "ㅓ"],
    };

    expect(
      checkAnswer(build, { kind: "syllable", initial: "ㅇ", medial: "ㅏ" }).correct,
    ).toBe(true);
    expect(
      checkAnswer(build, { kind: "syllable", initial: "ㅇ", medial: "ㅓ" }).correct,
    ).toBe(false);
    expect(checkAnswer(build, { kind: "text", value: "  아  " }).correct).toBe(true);
  });

  test("self-check não conta para a nota", () => {
    const selfCheck: ReadingExercise = {
      id: "pratica",
      type: "reading",
      mode: "self-check",
      prompt: "Leia em voz alta",
      text: "아",
      tags: ["reading"],
    };

    expect(
      checkAnswer(selfCheck, { kind: "self-check", confidence: "medium" }),
    ).toMatchObject({ correct: true, scored: false });
  });

  test("check continua retornando exatamente o formato antigo", () => {
    const result = check(listening, "아");
    expect(result).toEqual({
      correct: true,
      expected: "아",
      explanation: "아 é ㅇ + ㅏ.",
    });
  });
});
