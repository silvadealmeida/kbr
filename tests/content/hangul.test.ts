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
import { checkAnswer, type ExerciseAnswer, type ExerciseSpec } from "@/lib/exercises";

const codes = (curriculum: Curriculum) =>
  validateCurriculum(curriculum).map((issue) => issue.code);

const ALL_EXERCISES = [
  ...LESSONS.flatMap((lesson) => lesson.exercises),
  ...CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

describe("conteúdo Hangul — fatia h01–h15 + c1/c2", () => {
  test("o currículo implementado passa na validação sem erros", () => {
    const issues = validateCurriculum(HANGUL_CURRICULUM);
    expect(issues.filter((issue) => issue.severity === "error")).toEqual([]);
  });

  test("implementa as quinze primeiras lições e os checkpoints c1 e c2", () => {
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
      "h11",
      "h12",
      "h13",
      "h14",
      "h15",
    ]);
    expect([...IMPLEMENTED_LESSON_IDS]).toEqual(LESSONS.map((lesson) => lesson.id));
    expect(CHECKPOINTS.map((checkpoint) => checkpoint.id)).toEqual(["c1", "c2"]);
    expect(CHECKPOINTS[0]!.lessonIds).toEqual(LESSONS.slice(0, 10).map((lesson) => lesson.id));
    expect(CHECKPOINTS[1]!.lessonIds).toEqual(LESSONS.map((lesson) => lesson.id));
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
      ["h11", 12],
      ["h12", 12],
      ["h13", 12],
      ["h14", 12],
      ["h15", 14],
    ]);
    expect(CHECKPOINTS[0]!.exercises).toHaveLength(20);
    expect(CHECKPOINTS[1]!.exercises).toHaveLength(24);
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
      LESSONS.filter((lesson) => lesson.unit === 3 || lesson.unit === 4).map((lesson) => [
        lesson.id,
        lesson.newJamo,
      ]),
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

  test("h11–h15 completam as 21 vogais na ordem curricular", () => {
    const introductions = Object.fromEntries(
      LESSONS.filter((lesson) => lesson.unit === 5).map((lesson) => [
        lesson.id,
        lesson.newJamo,
      ]),
    );
    expect(introductions).toEqual({
      h11: ["ㅑ", "ㅕ", "ㅛ", "ㅠ"],
      h12: ["ㅐ", "ㅔ", "ㅒ", "ㅖ"],
      h13: ["ㅘ", "ㅝ", "ㅟ"],
      h14: ["ㅙ", "ㅞ", "ㅚ"],
      h15: ["ㅢ"],
    });

    const vowels = HANGUL_CURRICULUM.jamo.filter((jamo) => jamo.kind === "vowel");
    expect(vowels.map((jamo) => jamo.symbol)).toEqual([
      "ㅏ",
      "ㅓ",
      "ㅗ",
      "ㅜ",
      "ㅡ",
      "ㅣ",
      "ㅑ",
      "ㅕ",
      "ㅛ",
      "ㅠ",
      "ㅐ",
      "ㅔ",
      "ㅒ",
      "ㅖ",
      "ㅘ",
      "ㅝ",
      "ㅟ",
      "ㅙ",
      "ㅞ",
      "ㅚ",
      "ㅢ",
    ]);
    expect(vowels).toHaveLength(21);
    expect(new Set(vowels.map((jamo) => jamo.symbol)).size).toBe(21);
  });

  test("h11 depende de c1 e a unidade 5 segue a ordem dos pré-requisitos", () => {
    const byId = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));
    expect(byId.get("h11")!.prerequisites).toEqual(["c1"]);
    expect(byId.get("h12")!.prerequisites).toEqual(["h11"]);
    expect(byId.get("h13")!.prerequisites).toEqual(["h12"]);
    expect(byId.get("h14")!.prerequisites).toEqual(["h13"]);
    expect(byId.get("h15")!.prerequisites).toEqual(["h14"]);
    expect(CHECKPOINTS[1]!.lessonIds).toEqual(
      LESSONS.slice(0, 15).map((lesson) => lesson.id),
    );
  });

  test("rejeita lição cujo pré-requisito é um checkpoint ausente", () => {
    const broken: Curriculum = {
      ...HANGUL_CURRICULUM,
      checkpoints: CHECKPOINTS.filter((checkpoint) => checkpoint.id !== "c1"),
    };
    expect(codes(broken)).toContain("unknown-prerequisite");
  });

  test("as vogais compostas têm metadados de pronúncia e ficam em revisão", () => {
    const compound = HANGUL_CURRICULUM.jamo.filter((jamo) =>
      ["h11", "h12", "h13", "h14", "h15"].includes(jamo.introducedIn),
    );
    expect(compound).toHaveLength(15);
    for (const jamo of compound) {
      expect(jamo.notes?.trim()).toBeTruthy();
      expect(jamo.review.status).toBe("in-review");
      expect(jamo.ipa.length).toBeGreaterThan(0);
    }

    const tagsByLesson = new Map(
      LESSONS.filter((lesson) => lesson.unit === 5).map((lesson) => [
        lesson.id,
        new Set(lesson.exercises.flatMap((exercise) => exercise.tags ?? [])),
      ]),
    );
    expect(tagsByLesson.get("h11")!.has("pronunciation:glide-palatal")).toBe(true);
    expect(tagsByLesson.get("h12")!.has("pronunciation:merged-ae-e")).toBe(true);
    expect(tagsByLesson.get("h12")!.has("pronunciation:merged-yae-ye")).toBe(true);
    expect(tagsByLesson.get("h13")!.has("pronunciation:variation-wi")).toBe(true);
    expect(tagsByLesson.get("h14")!.has("pronunciation:merged-oe-wae-we")).toBe(true);
    expect(tagsByLesson.get("h15")!.has("pronunciation:variation-ui")).toBe(true);
  });

  test("toda sílaba e palavra é Hangul válido e usa apenas jamo do inventário", () => {
    const medial = new Set(
      HANGUL_CURRICULUM.jamo.filter((jamo) => jamo.kind === "vowel").map((jamo) => jamo.symbol),
    );
    for (const syllable of HANGUL_CURRICULUM.syllables) {
      expect(syllable.text.normalize("NFC")).toBe(syllable.text);
      expect(medial.has(syllable.medial)).toBe(true);
    }
    for (const word of HANGUL_CURRICULUM.words) {
      expect(word.ko.normalize("NFC")).toBe(word.ko);
    }
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

  test("os itens novos de h11–h15/c2 aceitam a resposta certa e rejeitam a errada", () => {
    const newExercises = [
      ...LESSONS.filter((lesson) => lesson.unit === 5).flatMap((lesson) => lesson.exercises),
      ...CHECKPOINTS.filter((checkpoint) => checkpoint.id === "c2").flatMap(
        (checkpoint) => checkpoint.exercises,
      ),
    ];

    const correctAnswer = (exercise: ExerciseSpec): ExerciseAnswer => {
      switch (exercise.type) {
        case "mcq":
          return { kind: "text", value: exercise.correctAnswer };
        case "cloze":
          return { kind: "text", value: exercise.answer };
        case "build-syllable":
          return {
            kind: "syllable",
            initial: exercise.initial,
            medial: exercise.medial,
            final: exercise.final,
          };
        case "reading":
          return { kind: "choice", optionId: exercise.correctOptionId! };
        case "audio-to-char":
        case "char-to-audio":
        case "minimal-pair":
          return { kind: "choice", optionId: exercise.correctOptionId };
        case "listen":
        case "translate":
          throw new Error(`Tipo inesperado na fatia: ${exercise.type}`);
      }
    };

    const wrongAnswer = (exercise: ExerciseSpec): ExerciseAnswer => {
      switch (exercise.type) {
        case "mcq":
        case "cloze":
          return { kind: "text", value: "__resposta_errada__" };
        case "build-syllable":
          return { kind: "text", value: "__resposta_errada__" };
        case "reading": {
          const wrong = exercise.options?.find(
            (option) => option.id !== exercise.correctOptionId,
          );
          return wrong
            ? { kind: "choice", optionId: wrong.id }
            : { kind: "text", value: "__resposta_errada__" };
        }
        case "audio-to-char":
        case "char-to-audio":
        case "minimal-pair": {
          const wrong = exercise.options.find(
            (option) => option.id !== exercise.correctOptionId,
          );
          return wrong
            ? { kind: "choice", optionId: wrong.id }
            : { kind: "text", value: "__resposta_errada__" };
        }
        case "listen":
        case "translate":
          throw new Error(`Tipo inesperado na fatia: ${exercise.type}`);
      }
    };

    for (const exercise of newExercises) {
      expect(checkAnswer(exercise, correctAnswer(exercise)).correct).toBe(true);
      expect(checkAnswer(exercise, wrongAnswer(exercise)).correct).toBe(false);
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
    expect(codes(broken)).toContain("example-uses-untaught-jamo");
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
