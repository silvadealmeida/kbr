import { describe, expect, test } from "vitest";
import {
  CHECKPOINTS,
  HANGUL_CURRICULUM,
  IMPLEMENTED_LESSON_IDS,
  LESSONS,
  validateCurriculum,
  type Checkpoint,
  type Curriculum,
  type Lesson,
  type SyllableRecord,
} from "@/content/hangul";
import { parseSrsCardKey } from "@/lib/srs";

const codes = (curriculum: Curriculum) =>
  validateCurriculum(curriculum).map((issue) => issue.code);

const ALL_EXERCISES = [
  ...LESSONS.flatMap((lesson) => lesson.exercises),
  ...CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

describe("conteúdo Hangul — fatia h01–h10 + c1", () => {
  test("o currículo implementado passa na validação sem erros", () => {
    const issues = validateCurriculum(HANGUL_CURRICULUM);
    expect(issues.filter((issue) => issue.severity === "error")).toEqual([]);
  });

  test("implementa as dez primeiras lições e o checkpoint c1", () => {
    expect(LESSONS.map((lesson) => lesson.id)).toEqual([
      "h01",
      "h02",
      "h03",
      "h04",
      "h05",
      "h06",
      "h07",
      "h08",
      "h09",
      "h10",
    ]);
    expect([...IMPLEMENTED_LESSON_IDS]).toEqual(LESSONS.map((lesson) => lesson.id));
    expect(CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(["c1"]);
    expect(CHECKPOINTS[0]!.lessonIds).toEqual(LESSONS.map((lesson) => lesson.id));
  });

  test("cada lição tem a quantidade de prática definida no currículo", () => {
    expect(LESSONS.map((lesson) => [lesson.id, lesson.exercises.length])).toEqual([
      ["h01", 6],
      ["h02", 10],
      ["h03", 10],
      ["h04", 10],
      ["h05", 10],
      ["h06", 10],
      ["h07", 12],
      ["h08", 14],
      ["h09", 12],
      ["h10", 14],
    ]);
    expect(CHECKPOINTS[0]!.exercises).toHaveLength(20);
  });

  test("todo conteúdo coreano está marcado como in-review", () => {
    for (const lesson of LESSONS) expect(lesson.review.status).toBe("in-review");
    for (const checkpoint of CHECKPOINTS) expect(checkpoint.review.status).toBe("in-review");
    for (const jamo of HANGUL_CURRICULUM.jamo) expect(jamo.review.status).toBe("in-review");
    for (const syllable of HANGUL_CURRICULUM.syllables) {
      expect(syllable.review.status).toBe("in-review");
    }
    for (const word of HANGUL_CURRICULUM.words) expect(word.review.status).toBe("in-review");
  });

  test("h04–h10 introduzem exatamente as consoantes da unidade 3 e 4", () => {
    const introductions = Object.fromEntries(
      LESSONS.filter((lesson) => lesson.unit >= 3).map((lesson) => [lesson.id, lesson.newJamo]),
    );
    expect(introductions).toEqual({
      h04: ["ㄱ", "ㄴ"],
      h05: ["ㄷ", "ㄹ", "ㅁ"],
      h06: ["ㅂ", "ㅅ", "ㅈ"],
      h07: ["ㅋ", "ㅌ", "ㅍ", "ㅊ"],
      h08: ["ㅎ"],
      h09: ["ㄲ", "ㄸ", "ㅃ"],
      h10: ["ㅆ", "ㅉ"],
    });
    for (const lesson of LESSONS) expect(lesson.newFinals).toEqual([]);
  });

  test("as palavras usam apenas sílabas registradas e ensinadas", () => {
    const byText = new Map(HANGUL_CURRICULUM.syllables.map((syllable) => [syllable.text, syllable]));
    for (const word of HANGUL_CURRICULUM.words) {
      expect(word.syllables.join("")).toBe(word.ko);
      for (const syllable of word.syllables) expect(byText.has(syllable)).toBe(true);
    }
  });

  test("todo item de áudio tem áudio e fallback textual", () => {
    for (const exercise of ALL_EXERCISES) {
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
  });

  test("todo exercício tem uma tag diag:* e chaves SRS válidas", () => {
    for (const exercise of ALL_EXERCISES) {
      expect(exercise.tags?.some((tag) => tag.startsWith("diag:"))).toBe(true);
      for (const key of exercise.srsCards ?? []) {
        expect(parseSrsCardKey(key)).not.toBeNull();
      }
    }
  });

  test("o critério documentado de h07, h09 e h10 está representado", () => {
    const rules = (id: string) =>
      LESSONS.find((lesson) => lesson.id === id)!.completion.rules ?? [];
    expect(rules("h07").find((rule) => rule.id === "h07-aspiration")?.minCorrect).toBe(3);
    expect(rules("h09").find((rule) => rule.id === "h09-tenses")?.minCorrect).toBe(4);
    expect(rules("h10").filter((rule) => rule.id.startsWith("h10-contrast-"))).toHaveLength(5);
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
      id: "syl:댜",
      text: "댜",
      initial: "ㄷ",
      medial: "ㅑ",
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
          id: "word:댜",
          ko: "댜",
          pt: "teste",
          syllables: ["댜"],
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
      lessons: [LESSONS[0]!, brokenLesson, ...LESSONS.slice(2)],
    };
    const brokenCodes = codes(broken);
    expect(brokenCodes).toContain("required-exercise");
    expect(brokenCodes).toContain("missing-correct-option");
  });

  test("rejeita cartão SRS com conteúdo ainda não ensinado", () => {
    const h02 = LESSONS[1]!;
    const brokenLesson: Lesson = {
      ...h02,
      exercises: h02.exercises.map((exercise, index) =>
        index === 0 ? { ...exercise, srsCards: ["h:jamo:c:ㄱ"] } : exercise,
      ),
    };
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      lessons: [LESSONS[0]!, brokenLesson, ...LESSONS.slice(2)],
    };
    expect(codes(broken)).toContain("srs-card-untaught");
  });

  test("rejeita checkpoint com escopo de unidade posterior", () => {
    const broken: Checkpoint = {
      ...CHECKPOINTS[0]!,
      unit: 3,
    };
    const brokenCurriculum: Curriculum = {
      ...HANGUL_CURRICULUM,
      checkpoints: [broken],
    };
    expect(codes(brokenCurriculum)).toContain("checkpoint-unit");
  });

  test("rejeita checkpoint com menos de 15 itens", () => {
    const broken: Checkpoint = {
      ...CHECKPOINTS[0]!,
      exercises: CHECKPOINTS[0]!.exercises.slice(0, 14),
    };
    const brokenCurriculum: Curriculum = {
      ...HANGUL_CURRICULUM,
      checkpoints: [broken],
    };
    expect(codes(brokenCurriculum)).toContain("checkpoint-exercises");
  });
});
