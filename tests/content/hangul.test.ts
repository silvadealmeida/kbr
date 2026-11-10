import { describe, expect, test } from "vitest";
import {
  HANGUL_CURRICULUM,
  IMPLEMENTED_LESSON_IDS,
  LESSONS,
  validateCurriculum,
  type Curriculum,
  type Lesson,
  type SyllableRecord,
} from "@/content/hangul";

const codes = (curriculum: Curriculum) =>
  validateCurriculum(curriculum).map((issue) => issue.code);

describe("conteúdo Hangul — fatia h01–h03", () => {
  test("o currículo implementado passa na validação sem erros", () => {
    const issues = validateCurriculum(HANGUL_CURRICULUM);
    expect(issues.filter((issue) => issue.severity === "error")).toEqual([]);
  });

  test("implementa exatamente as três primeiras lições", () => {
    expect(LESSONS.map((lesson) => lesson.id)).toEqual(["h01", "h02", "h03"]);
    expect([...IMPLEMENTED_LESSON_IDS]).toEqual(["h01", "h02", "h03"]);
  });

  test("cada lição tem a quantidade de prática definida no currículo", () => {
    expect(LESSONS.map((lesson) => [lesson.id, lesson.exercises.length])).toEqual([
      ["h01", 6],
      ["h02", 10],
      ["h03", 10],
    ]);
  });

  test("todo conteúdo coreano está marcado como in-review", () => {
    for (const lesson of LESSONS) expect(lesson.review.status).toBe("in-review");
    for (const jamo of HANGUL_CURRICULUM.jamo) expect(jamo.review.status).toBe("in-review");
    for (const syllable of HANGUL_CURRICULUM.syllables) {
      expect(syllable.review.status).toBe("in-review");
    }
    for (const word of HANGUL_CURRICULUM.words) expect(word.review.status).toBe("in-review");
  });

  test("h02 e h03 não introduzem batchim nem jamo fora do escopo", () => {
    const h02 = LESSONS.find((lesson) => lesson.id === "h02")!;
    const h03 = LESSONS.find((lesson) => lesson.id === "h03")!;

    expect(h02.newJamo).toEqual(["ㅇ", "ㅏ", "ㅓ", "ㅗ", "ㅜ"]);
    expect(h03.newJamo).toEqual(["ㅡ", "ㅣ"]);
    expect(h02.newFinals).toEqual([]);
    expect(h03.newFinals).toEqual([]);
  });

  test("as palavras usam apenas sílabas registradas e ensinadas", () => {
    const byText = new Map(HANGUL_CURRICULUM.syllables.map((syllable) => [syllable.text, syllable]));
    for (const word of HANGUL_CURRICULUM.words) {
      expect(word.syllables.join("")).toBe(word.ko);
      for (const syllable of word.syllables) expect(byText.has(syllable)).toBe(true);
    }
  });

  test("todo item de áudio tem áudio e fallback textual", () => {
    for (const lesson of LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.type === "audio-to-char") {
          expect(exercise.audioText).toBeTruthy();
          expect(exercise.fallback).toBeTruthy();
        }
        if (exercise.type === "minimal-pair" && exercise.presentation === "audio") {
          expect(exercise.audioText).toBeTruthy();
          expect(exercise.fallback).toBeTruthy();
        }
        if (exercise.type === "char-to-audio") {
          expect(new Set(exercise.options.map((option) => option.audioText)).size).toBe(
            exercise.options.length,
          );
        }
      }
    }
  });

  test("rejeita jamo duplicado", () => {
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      jamo: [...HANGUL_CURRICULUM.jamo, HANGUL_CURRICULUM.jamo[0]!],
    };
    expect(codes(broken)).toContain("duplicate-jamo");
  });

  test("rejeita sílaba cuja composição não bate com o texto", () => {
    const wrong: SyllableRecord = {
      ...HANGUL_CURRICULUM.syllables[0]!,
      text: "어",
      medial: "ㅏ",
    };
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      syllables: [wrong, ...HANGUL_CURRICULUM.syllables.slice(1)],
    };
    expect(codes(broken)).toContain("syllable-composition");
  });

  test("rejeita palavra com jamo ainda não ensinado na lição", () => {
    const consonant: SyllableRecord = {
      id: "syl:가",
      text: "가",
      initial: "ㄱ",
      medial: "ㅏ",
      final: "",
      introducedIn: "h02",
      review: { status: "in-review" },
    };
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      syllables: [...HANGUL_CURRICULUM.syllables, consonant],
      words: [
        ...HANGUL_CURRICULUM.words,
        {
          id: "word:가",
          ko: "가",
          pt: "teste",
          syllables: ["가"],
          introducedIn: "h02",
          tags: ["test"],
          review: { status: "in-review" },
        },
      ],
    };
    expect(codes(broken)).toContain("untaught-jamo");
  });

  test("rejeita revisão declarada sem revisor e data", () => {
    const reviewed: Lesson = {
      ...LESSONS[0]!,
      review: { status: "reviewed" },
    };
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      lessons: [reviewed, ...LESSONS.slice(1)],
    };
    expect(codes(broken)).toContain("review-author-missing");
    expect(codes(broken)).toContain("review-date-missing");
  });

  test("rejeita exercício obrigatório inexistente e alternativa correta ausente", () => {
    const h02 = LESSONS[1]!;
    const brokenLesson: Lesson = {
      ...h02,
      completion: { ...h02.completion, requiredExerciseIds: ["h02-e99"] },
      exercises: h02.exercises.map((exercise, index) =>
        index === 0 && exercise.type === "audio-to-char"
          ? { ...exercise, correctOptionId: "nao-existe" }
          : exercise,
      ),
    };
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      lessons: [LESSONS[0]!, brokenLesson, LESSONS[2]!],
    };
    const brokenCodes = codes(broken);
    expect(brokenCodes).toContain("required-exercise");
    expect(brokenCodes).toContain("missing-correct-option");
  });
});
