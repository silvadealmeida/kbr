import { describe, expect, test } from "vitest";
import { CHECKPOINTS } from "@/content/hangul/checkpoints";
import { LESSONS } from "@/content/hangul/lessons";
import { checkAnswer, type ExerciseSpec } from "@/lib/exercises";
import { shuffle, type RandomSource } from "@/lib/exercises/shuffle";

type ChoiceShape = {
  exercise: ExerciseSpec;
  labels: readonly string[];
  correctIndex: number;
};

const ALL_EXERCISES: ExerciseSpec[] = [
  ...LESSONS.flatMap((lesson) => lesson.exercises),
  ...CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];

function choiceShape(exercise: ExerciseSpec): ChoiceShape | null {
  if (exercise.type === "mcq") {
    return {
      exercise,
      labels: exercise.options,
      correctIndex: exercise.options.indexOf(exercise.correctAnswer),
    };
  }

  if (
    exercise.type === "audio-to-char" ||
    exercise.type === "char-to-audio" ||
    exercise.type === "minimal-pair"
  ) {
    const labels = exercise.options.map((option) =>
      "jamo" in option ? option.jamo : option.label,
    );
    return {
      exercise,
      labels,
      correctIndex: exercise.options.findIndex(
        (option) => option.id === exercise.correctOptionId,
      ),
    };
  }

  if (exercise.type === "reading" && exercise.mode === "mcq") {
    const options = exercise.options ?? [];
    return {
      exercise,
      labels: options.map((option) => option.label),
      correctIndex: options.findIndex(
        (option) => option.id === exercise.correctOptionId,
      ),
    };
  }

  return null;
}

const CHOICES = ALL_EXERCISES.flatMap((exercise) => {
  const shape = choiceShape(exercise);
  return shape ? [shape] : [];
});

/** PRNG determinístico só para testes; a produção usa Math.random. */
function seededRandom(seed: number): RandomSource {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function permutations<T>(items: readonly T[]): T[][] {
  if (items.length <= 1) return [[...items]];
  return items.flatMap((item, index) => {
    const rest = [...items.slice(0, index), ...items.slice(index + 1)];
    return permutations(rest).map((tail) => [item, ...tail]);
  });
}

describe("auditoria de alternativas do currículo", () => {
  test("encontra todas as alternativas de escolha única e de composição", () => {
    expect(CHOICES).toHaveLength(341);
    expect(CHOICES.every((choice) => choice.labels.length >= 2)).toBe(true);
    expect(CHOICES.every((choice) => choice.correctIndex >= 0)).toBe(true);
  });

  test("não há rótulos duplicados dentro do mesmo exercício", () => {
    for (const choice of CHOICES) {
      expect(
        new Set(choice.labels).size,
        `${choice.exercise.id} tem alternativas equivalentes`,
      ).toBe(choice.labels.length);
    }
  });

  test("registra a ordem autoral atual, que era quase sempre a correta primeiro", () => {
    expect(CHOICES.filter((choice) => choice.correctIndex === 0).length).toBe(330);
  });
});

describe("shuffle (Fisher–Yates)", () => {
  test("não muta a origem e preserva todos os itens exatamente uma vez", () => {
    const source = Object.freeze(["a", "b", "c", "d"]);
    const ordered = shuffle(source, seededRandom(7));

    expect(source).toEqual(["a", "b", "c", "d"]);
    expect(ordered).toHaveLength(source.length);
    expect([...ordered].sort()).toEqual([...source].sort());
  });

  test("distribui a posição da resposta correta de forma equilibrada", () => {
    const attempts = 24_000;

    for (const optionCount of [2, 3, 4, 6]) {
      const options = Array.from({ length: optionCount }, (_, index) => `o${index}`);
      const correct = options[0]!;
      const random = seededRandom(1_000 + optionCount);
      const counts = Array.from({ length: optionCount }, () => 0);

      for (let attempt = 0; attempt < attempts; attempt += 1) {
        const ordered = shuffle(options, random);
        counts[ordered.indexOf(correct)]! += 1;
      }

      const expected = attempts / optionCount;
      const tolerance = 3 * Math.sqrt(expected * (1 - 1 / optionCount)) + 1;

      expect(new Set(counts).size).toBe(optionCount);
      for (const count of counts) {
        expect(Math.abs(count - expected)).toBeLessThanOrEqual(tolerance);
      }
    }
  });

  test("rejeita uma fonte aleatória fora de [0, 1)", () => {
    expect(() => shuffle(["a", "b"], () => 1)).toThrow(RangeError);
    expect(() => shuffle(["a", "b"], () => -0.1)).toThrow(RangeError);
  });
});

describe("distribuição nas tentativas do currículo", () => {
  test("cada posição recebe uma fração compatível com o número de alternativas", () => {
    const rounds = 300;
    const random = seededRandom(2026);
    const byOptionCount = new Map<number, { total: number; counts: number[] }>();

    for (const choice of CHOICES) {
      const entry =
        byOptionCount.get(choice.labels.length) ??
        { total: 0, counts: Array.from({ length: choice.labels.length }, () => 0) };
      const correct = choice.labels[choice.correctIndex]!;

      for (let round = 0; round < rounds; round += 1) {
        const ordered = shuffle(choice.labels, random);
        const position = ordered.indexOf(correct);
        expect(position).toBeGreaterThanOrEqual(0);
        entry.counts[position]! += 1;
        entry.total += 1;
      }

      byOptionCount.set(choice.labels.length, entry);
    }

    expect([...byOptionCount.keys()].sort()).toEqual([2, 3, 4, 6]);

    for (const [optionCount, entry] of byOptionCount) {
      const expected = entry.total / optionCount;
      const tolerance = 3 * Math.sqrt(expected * (1 - 1 / optionCount)) + 1;
      expect(entry.counts).toHaveLength(optionCount);
      for (const count of entry.counts) {
        expect(Math.abs(count - expected)).toBeLessThanOrEqual(tolerance);
      }
    }
  });

  test("uma nova ordem mantém os mesmos IDs e rótulos", () => {
    const random = seededRandom(99);

    for (const choice of CHOICES) {
      const ordered = shuffle(choice.labels, random);
      expect(ordered).toHaveLength(choice.labels.length);
      expect([...ordered].sort()).toEqual([...choice.labels].sort());
      expect(ordered[choice.correctIndex]).not.toBeUndefined();
    }
  });
});

describe("correção independe da posição", () => {
  test("todas as permutações de uma múltipla escolha mantêm o gabarito", () => {
    const exercise = ALL_EXERCISES.find(
      (item): item is Extract<ExerciseSpec, { type: "mcq" }> => item.type === "mcq",
    )!;
    const expected = exercise.correctAnswer;

    for (const options of permutations(exercise.options)) {
      const permuted = { ...exercise, options };
      expect(checkAnswer(permuted, { kind: "text", value: expected }).correct).toBe(true);

      for (const wrong of options.filter((option) => option !== expected)) {
        expect(checkAnswer(permuted, { kind: "text", value: wrong }).correct).toBe(false);
      }
    }
  });

  test.each(["audio-to-char", "char-to-audio", "minimal-pair"] as const)(
    "todas as permutações de %s mantêm o gabarito",
    (type) => {
      const exercise = ALL_EXERCISES.find(
        (item): item is Extract<
          ExerciseSpec,
          { type: "audio-to-char" | "char-to-audio" | "minimal-pair" }
        > => item.type === type,
      )!;
      const correctId = exercise.correctOptionId;
      const options = exercise.options as readonly { id: string }[];

      for (const permutation of permutations(options)) {
        const permuted = { ...exercise, options: permutation } as unknown as ExerciseSpec;
        expect(checkAnswer(permuted, { kind: "choice", optionId: correctId }).correct).toBe(
          true,
        );

        for (const wrong of permutation.filter((option) => option.id !== correctId)) {
          expect(
            checkAnswer(permuted, { kind: "choice", optionId: wrong.id }).correct,
          ).toBe(false);
        }
      }
    },
  );

  test("todas as permutações de leitura com escolha mantêm o gabarito", () => {
    const exercise = ALL_EXERCISES.find(
      (item): item is Extract<ExerciseSpec, { type: "reading" }> =>
        item.type === "reading" && item.mode === "mcq",
    )!;
    const options = exercise.options!;
    const correctId = exercise.correctOptionId!;

    for (const permutation of permutations(options)) {
      const permuted = { ...exercise, options: permutation };
      expect(checkAnswer(permuted, { kind: "choice", optionId: correctId }).correct).toBe(
        true,
      );

      for (const wrong of permutation.filter((option) => option.id !== correctId)) {
        expect(
          checkAnswer(permuted, { kind: "choice", optionId: wrong.id }).correct,
        ).toBe(false);
      }
    }
  });

  test("a ordem dos grupos da bancada não altera a composição correta", () => {
    const exercise = ALL_EXERCISES.find(
      (item): item is Extract<ExerciseSpec, { type: "build-syllable" }> =>
        item.type === "build-syllable" &&
        Boolean(item.initialOptions && item.medialOptions && item.finalOptions),
    )!;

    const answer = {
      kind: "syllable" as const,
      initial: exercise.initial,
      medial: exercise.medial,
      final: exercise.final ?? "",
    };

    for (const initialOptions of permutations(exercise.initialOptions!)) {
      for (const medialOptions of permutations(exercise.medialOptions!)) {
        for (const finalOptions of permutations(exercise.finalOptions!)) {
          const permuted = { ...exercise, initialOptions, medialOptions, finalOptions };
          expect(checkAnswer(permuted, answer).correct).toBe(true);
        }
      }
    }
  });
});
