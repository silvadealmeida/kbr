import { describe, expect, test } from "vitest";
import { JAMO, RULES, SYLLABLES, WORDS } from "@/content/hangul";
import { checkAnswer, type ExerciseAnswer } from "@/lib/exercises";
import {
  applyReview,
  buildReviewExercise,
  buildReviewQueue,
  buildReviewQueueFromEntries,
  HANGUL_REVIEW_CATALOG,
  MAX_REVIEW_SESSION,
  REVIEW_KIND_LABELS,
} from "@/lib/review";
import type { SrsState } from "@/lib/srs";
import {
  createEmptyProgress,
  createLocalStorageStore,
  createSyncedProgressStore,
  type Progress,
  type ProgressStore,
  type StorageLike,
} from "@/lib/storage";

const NOW = new Date(2026, 10, 10, 12, 0, 0);

function at(day: number, hour = 12): string {
  return new Date(2026, 10, day, hour, 0, 0).toISOString();
}

function card(box: number, due: string): SrsState {
  return { box: box as SrsState["box"], due };
}

function progressWith(cards: Record<string, SrsState>): Progress {
  const progress = createEmptyProgress(NOW);
  progress.cards = cards;
  return progress;
}

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("fila de revisão", () => {
  test("não inventa cartões quando não há dados", () => {
    const queue = buildReviewQueue(createEmptyProgress(NOW), NOW);

    expect(queue.due).toEqual([]);
    expect(queue.session).toEqual([]);
    expect(queue.totalDue).toBe(0);
    expect(queue.nextDue).toBeNull();
  });

  test("seleciona apenas cartões vencidos e mantém a ordem estável", () => {
    const progress = progressWith({
      "h:word:고기": card(2, at(8)),
      "h:syl:가": card(1, at(9)),
      "h:jamo:v:ㅏ": card(1, at(9)),
      "h:rule:liaison": card(3, at(11)),
    });

    const queue = buildReviewQueue(progress, NOW);

    expect(queue.due.map((item) => item.cardId)).toEqual([
      "h:word:고기",
      "h:jamo:v:ㅏ",
      "h:syl:가",
    ]);
    expect(queue.totalDue).toBe(3);
    expect(queue.overdue).toBe(3);
    expect(queue.dueToday).toBe(0);
    expect(queue.nextDue).toBe(at(11));
    expect(Object.keys(progress.cards)).toHaveLength(4);
  });

  test("inclui o limite exato, separa vencidos de hoje e aplica o teto da sessão", () => {
    const entries: [string, SrsState][] = [
      ["h:word:고기", card(1, at(9))],
      ["h:syl:가", card(1, NOW.toISOString())],
      ["h:jamo:v:ㅏ", card(1, at(10, 11))],
      ["h:word:아이", card(1, at(10, 13))],
    ];

    const queue = buildReviewQueueFromEntries(entries, NOW, HANGUL_REVIEW_CATALOG, {
      limit: 2,
    });

    expect(queue.totalDue).toBe(3);
    expect(queue.overdue).toBe(1);
    expect(queue.dueToday).toBe(2);
    expect(queue.session).toHaveLength(2);
    expect(queue.session.map((item) => item.cardId)).toEqual([
      "h:word:고기",
      "h:jamo:v:ㅏ",
    ]);
  });

  test("deduplica chaves repetidas e ignora chaves desconhecidas", () => {
    const entries: [string, SrsState][] = [
      ["h:syl:가", card(1, at(8))],
      ["h:syl:가", card(4, at(1))],
      ["card:desconhecido", card(1, at(8))],
      ["h:jamo:c:ㅏ", card(1, at(8))],
    ];

    const queue = buildReviewQueueFromEntries(entries, NOW);

    expect(queue.due.map((item) => item.cardId)).toEqual(["h:syl:가"]);
    expect(queue.due[0]!.box).toBe(1);
    expect(queue.session).toHaveLength(1);
  });

  test("cada categoria de cartão gera um exercício verificável", () => {
    const keys = ["h:jamo:c:ㄱ", "h:syl:가", "h:word:고기", "h:rule:liaison"];
    const kinds = keys.map((key) => buildReviewExercise(key)?.kind);

    expect(kinds).toEqual(["jamo", "syllable", "word", "rule"]);
    for (const kind of kinds) {
      expect(REVIEW_KIND_LABELS[kind!]).toBeTruthy();
    }

    expect(buildReviewExercise("card:desconhecido")).toBeNull();
    expect(buildReviewExercise("h:jamo:c:ㅏ")).toBeNull();
  });

  test("jamo e regra corrigem a alternativa certa e a errada", () => {
    const jamo = buildReviewExercise("h:jamo:c:ㄱ")!;
    if (jamo.exercise.type !== "mcq") throw new Error("tipo inesperado");
    expect(jamo.exercise.options).toContain("기역");
    expect(checkAnswer(jamo.exercise, { kind: "text", value: "기역" }).correct).toBe(true);
    expect(checkAnswer(jamo.exercise, { kind: "text", value: "니은" }).correct).toBe(false);

    const rule = buildReviewExercise("h:rule:liaison")!;
    if (rule.exercise.type !== "reading") throw new Error("tipo inesperado");
    const correctId = rule.exercise.correctOptionId!;
    expect(checkAnswer(rule.exercise, { kind: "choice", optionId: correctId })).toMatchObject({
      correct: true,
      expected: "한구거",
    });
    const wrongId = rule.exercise.options!.find((option) => option.id !== correctId)!.id;
    expect(checkAnswer(rule.exercise, { kind: "choice", optionId: wrongId }).correct).toBe(false);
  });

  test("cartão de palavra revela a resposta só na correção", () => {
    const built = buildReviewExercise("h:word:고기")!;
    expect(built.exercise.type).toBe("reading");
    if (built.exercise.type !== "reading") throw new Error("tipo inesperado");
    const exercise = built.exercise;
    expect(exercise.text).toBe("고기");
    expect(exercise.prompt).not.toContain("carne");
    expect(exercise.options?.map((option) => option.label)).toContain("carne");

    const correct = checkAnswer(exercise, {
      kind: "choice",
      optionId: exercise.correctOptionId!,
    });
    expect(correct.correct).toBe(true);
    expect(correct.expected).toBe("carne");

    const wrongId = exercise.options!.find(
      (option) => option.id !== exercise.correctOptionId,
    )!.id;
    const wrong = checkAnswer(exercise, { kind: "choice", optionId: wrongId });
    expect(wrong.correct).toBe(false);
    expect(wrong.expected).toBe("carne");
  });

  test("cartão de sílaba exige a composição correta", () => {
    const built = buildReviewExercise("h:syl:가")!;
    if (built.exercise.type !== "build-syllable") throw new Error("tipo inesperado");
    const answer: ExerciseAnswer = {
      kind: "syllable",
      initial: built.exercise.initial,
      medial: built.exercise.medial,
      final: built.exercise.final,
    };

    expect(checkAnswer(built.exercise, answer).correct).toBe(true);
    expect(
      checkAnswer(built.exercise, {
        kind: "syllable",
        initial: built.exercise.initial,
        medial: "ㅓ" as typeof built.exercise.medial,
        final: built.exercise.final,
      }).correct,
    ).toBe(false);
  });

  test("todos os cartões possíveis do conteúdo têm exercício", () => {
    const keys = [
      ...JAMO.map((record) =>
        record.kind === "vowel" ? `h:jamo:v:${record.symbol}` : `h:jamo:c:${record.symbol}`,
      ),
      ...SYLLABLES.map((record) => `h:syl:${record.text}`),
      ...WORDS.map((record) => `h:word:${record.ko}`),
      ...RULES.map((record) => `h:rule:${record.kind}`),
    ];

    expect(keys.filter((key) => buildReviewExercise(key) === null)).toEqual([]);
    expect(MAX_REVIEW_SESSION).toBe(20);
  });
});

describe("integração com o Leitner", () => {
  test("acerto avança a caixa e preserva lições e histórico", () => {
    const progress = progressWith({ "h:word:고기": card(3, at(8)) });
    progress.lessons.h01 = { done: true, score: 100 };
    progress.history.push({ exerciseId: "h01-e01", correct: true, at: at(7) });

    const next = applyReview(progress, { cardId: "h:word:고기" }, "correct", NOW);

    expect(next.cards["h:word:고기"]).toEqual({ box: 4, due: at(18) });
    expect(next.lessons.h01).toEqual({ done: true, score: 100 });
    expect(next.history.map((attempt) => attempt.exerciseId)).toEqual([
      "h01-e01",
      "review:h:word:고기",
    ]);
    expect(next.history.at(-1)).toMatchObject({ correct: true, at: NOW.toISOString() });
    expect(next.lastActive).toBe(NOW.toISOString());
    expect(Object.keys(next.cards)).toEqual(["h:word:고기"]);
    expect(progress.cards["h:word:고기"]!.box).toBe(3);
  });

  test("erro volta à caixa 1 e agenda o dia seguinte", () => {
    const progress = progressWith({ "h:rule:liaison": card(5, at(8)) });
    const next = applyReview(progress, { cardId: "h:rule:liaison" }, "again", NOW);

    expect(next.cards["h:rule:liaison"]).toEqual({ box: 1, due: at(11) });
    expect(next.history.at(-1)).toMatchObject({
      exerciseId: "review:h:rule:liaison",
      correct: false,
    });
  });

  test("não cria cartão para chave ausente", () => {
    const progress = progressWith({});
    const next = applyReview(progress, { cardId: "h:word:고기" }, "correct", NOW);

    expect(next).toBe(progress);
    expect(next.cards).toEqual({});
  });
});

describe("persistência da revisão", () => {
  test("a resposta concluída sobrevive à recarga", async () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);
    const progress = progressWith({ "h:syl:가": card(2, at(8)) });

    const reviewed = applyReview(progress, { cardId: "h:syl:가" }, "correct", NOW);
    await expect(store.save(reviewed)).resolves.toBe(true);
    const loaded = await store.load();

    expect(loaded.cards["h:syl:가"]).toEqual({ box: 3, due: at(14) });
    expect(loaded.history).toHaveLength(1);
    expect(buildReviewQueue(loaded, NOW).totalDue).toBe(0);
  });

  test("falha remota mantém a revisão local e informa offline", async () => {
    const progress = progressWith({ "h:word:고기": card(1, at(9)) });
    const local: ProgressStore = {
      load: async () => progress,
      save: async () => true,
    };
    const remote: ProgressStore = {
      load: async () => progress,
      save: async () => false,
    };
    const statuses: string[] = [];
    const store = createSyncedProgressStore(local, remote, (status) => statuses.push(status));
    const reviewed = applyReview(progress, { cardId: "h:word:고기" }, "correct", NOW);

    await expect(store.save(reviewed)).resolves.toBe(false);
    expect(statuses).toEqual(["syncing", "offline"]);
    expect(reviewed.cards["h:word:고기"]!.box).toBe(2);
  });
});
