import { describe, expect, test } from "vitest";
import { LESSONS } from "@/content/hangul";
import {
  jamoCardKey,
  leitner,
  parseSrsCardKey,
  ruleCardKey,
  scheduleMissedReview,
  SRS_RULE_IDS,
  syllableCardKey,
  wordCardKey,
  type SrsState,
} from "@/lib/srs";
import { createEmptyProgress, createLocalStorageStore } from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");

describe("agendador Leitner", () => {
  test("agenda um cartão novo na primeira caixa", () => {
    expect(leitner.review(undefined, "correct", NOW)).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
  });

  test("avança até a caixa cinco com intervalos crescentes", () => {
    const intervals = [2, 4, 8, 16];
    let state: SrsState = { box: 1, due: NOW.toISOString() };

    for (const [index, days] of intervals.entries()) {
      state = leitner.review(state, "correct", NOW);
      expect(state.box).toBe(index + 2);
      expect(state.due).toBe(
        new Date(NOW.getTime() + days * 86_400_000).toISOString(),
      );
    }

    expect(leitner.review(state, "correct", NOW).box).toBe(5);
  });

  test("erro retorna à caixa um sem alterar o estado anterior", () => {
    const previous: SrsState = { box: 4, due: "2026-11-18T12:00:00.000Z" };

    expect(leitner.review(previous, "again", NOW)).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
    expect(previous.box).toBe(4);
  });

  test("retorna apenas ids vencidos, incluindo o limite exato", () => {
    const states: Record<string, SrsState> = {
      overdue: { box: 1, due: "2026-11-09T12:00:00.000Z" },
      boundary: { box: 2, due: NOW.toISOString() },
      future: { box: 3, due: "2026-11-11T12:00:00.000Z" },
    };

    expect(leitner.due(states, NOW)).toEqual(["overdue", "boundary"]);
  });

  test("rejeita um relógio inválido", () => {
    expect(() =>
      leitner.review(undefined, "correct", new Date("invalid")),
    ).toThrow(RangeError);
  });
});

describe("cartões SRS do Hangul", () => {
  test("gera chaves estáveis e determinísticas", () => {
    expect(jamoCardKey("ㄱ")).toBe("h:jamo:c:ㄱ");
    expect(jamoCardKey("ㅏ")).toBe("h:jamo:v:ㅏ");
    expect(syllableCardKey("가")).toBe("h:syl:가");
    expect(wordCardKey("고기")).toBe("h:word:고기");
    expect(ruleCardKey("liaison")).toBe("h:rule:liaison");
    expect(ruleCardKey("nasalization")).toBe("h:rule:nasalization");
    expect(ruleCardKey("aspiration")).toBe("h:rule:aspiration");
    expect(() => jamoCardKey("가")).toThrow(RangeError);
    expect(() => syllableCardKey("가구")).toThrow(RangeError);
    expect(() => ruleCardKey("batchim" as never)).toThrow(RangeError);
  });

  test("interpreta apenas chaves conhecidas", () => {
    expect(parseSrsCardKey("h:jamo:c:ㄱ")).toMatchObject({
      kind: "jamo-consonant",
      value: "ㄱ",
    });
    expect(parseSrsCardKey("h:jamo:v:ㅓ")).toMatchObject({
      kind: "jamo-vowel",
      value: "ㅓ",
    });
    expect(parseSrsCardKey("h:syl:나")).toMatchObject({
      kind: "syllable",
      value: "나",
    });
    expect(parseSrsCardKey("h:word:고기")).toMatchObject({
      kind: "word",
      value: "고기",
    });
    expect(parseSrsCardKey("h:rule:liaison")).toMatchObject({
      kind: "rule",
      value: "liaison",
    });
    expect(parseSrsCardKey("h:rule:batchim")).toBeNull();
    expect(parseSrsCardKey("h:syl:가구")).toBeNull();
    expect(parseSrsCardKey("outro:card")).toBeNull();
    expect(parseSrsCardKey("h:jamo:c:ㅏ")).toBeNull();
  });

  test("erro cria cartões na caixa 1 sem duplicar ao repetir", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h04")!
      .exercises[0]!;
    const first = scheduleMissedReview(createEmptyProgress(NOW), exercise, NOW);

    expect(Object.keys(first.cards)).toEqual(["h:jamo:c:ㄴ", "h:syl:나"]);
    expect(first.cards["h:jamo:c:ㄴ"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });

    const again = scheduleMissedReview(first, exercise, NOW);
    expect(Object.keys(again.cards)).toHaveLength(2);
    expect(again.cards).toEqual(first.cards);
  });

  test("erro rebaixa um cartão já avançado para a caixa 1", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h04")!
      .exercises[0]!;
    const progress = createEmptyProgress(NOW);
    progress.cards["h:jamo:c:ㄴ"] = {
      box: 4,
      due: "2026-11-18T12:00:00.000Z",
    };

    const next = scheduleMissedReview(progress, exercise, NOW);
    expect(next.cards["h:jamo:c:ㄴ"]!.box).toBe(1);
    expect(next.cards["h:syl:나"]!.box).toBe(1);
    expect(progress.cards["h:jamo:c:ㄴ"]!.box).toBe(4);
  });

  test("erro em vogal composta cria cartões de jamo e sílaba sem duplicar", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h11")!
      .exercises[0]!;
    const first = scheduleMissedReview(createEmptyProgress(NOW), exercise, NOW);

    expect(Object.keys(first.cards)).toEqual(["h:jamo:v:ㅑ", "h:syl:야"]);
    expect(first.cards["h:jamo:v:ㅑ"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });

    const again = scheduleMissedReview(first, exercise, NOW);
    expect(again.cards).toEqual(first.cards);
    expect(exercise.srsCards).toEqual(["h:jamo:v:ㅑ", "h:syl:야"]);
  });

  test("erro em ㅢ agenda o cartão da vogal e a palavra da lição", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h15")!
      .exercises[0]!;
    const next = scheduleMissedReview(createEmptyProgress(NOW), exercise, NOW);

    expect(next.cards["h:jamo:v:ㅢ"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
    expect(next.cards["h:word:의사"]).toBeDefined();
    expect(next.cards["h:syl:의"]).toBeDefined();
  });

  test("item sem cartões não altera o progresso", () => {
    const exercise = LESSONS.find(
      (lesson) => lesson.id === "h08",
    )!.exercises.find((item) => item.id === "h08-e06")!;
    const progress = createEmptyProgress(NOW);
    expect(scheduleMissedReview(progress, exercise, NOW)).toBe(progress);
  });

  test("cartões de vogal composta persistem após recarga", async () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };
    const exercise = LESSONS.find((lesson) => lesson.id === "h15")!
      .exercises[0]!;
    const progress = scheduleMissedReview(
      createEmptyProgress(NOW),
      exercise,
      NOW,
    );

    const saved = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:srs",
    ).save(progress);
    expect(saved).toBe(true);

    const reloaded = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:srs",
    ).load();
    expect(reloaded.cards).toEqual(progress.cards);
    expect(reloaded.cards["h:jamo:v:ㅢ"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
  });
});

describe("cartões SRS de batchim", () => {
  test("erro em batchim usa sílaba e palavra, nunca jamo duplo", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h20")!
      .exercises[0]!;
    const progress = scheduleMissedReview(
      createEmptyProgress(NOW),
      exercise,
      NOW,
    );

    expect(Object.keys(progress.cards)).toEqual(["h:syl:닭", "h:word:닭"]);
    expect(progress.cards["h:jamo:c:ㄺ"]).toBeUndefined();
    expect(progress.cards["h:syl:닭"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
  });

  test("repetir o erro não duplica os cartões de batchim", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h20")!
      .exercises[0]!;
    const first = scheduleMissedReview(createEmptyProgress(NOW), exercise, NOW);
    const again = scheduleMissedReview(first, exercise, NOW);

    expect(Object.keys(again.cards)).toHaveLength(2);
    expect(again.cards).toEqual(first.cards);
  });

  test("cartões de batchim persistem após recarga", async () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };
    const exercise = LESSONS.find((lesson) => lesson.id === "h19")!
      .exercises[0]!;
    const progress = scheduleMissedReview(
      createEmptyProgress(NOW),
      exercise,
      NOW,
    );

    await createLocalStorageStore(storage, () => NOW, "kbr:test:batchim").save(
      progress,
    );
    const reloaded = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:batchim",
    ).load();

    expect(reloaded.cards).toEqual(progress.cards);
    expect(reloaded.cards["h:syl:말"]).toBeDefined();
    expect(reloaded.cards["h:word:말"]).toBeDefined();
  });
});

describe("cartões SRS de regras de fronteira", () => {
  test("as três regras têm chaves estáveis e aparecem no curso", () => {
    const cards = new Set(
      LESSONS.flatMap((lesson) =>
        lesson.exercises.flatMap((exercise) => exercise.srsCards ?? []),
      ),
    );
    expect(SRS_RULE_IDS).toEqual(["liaison", "nasalization", "aspiration"]);
    for (const id of SRS_RULE_IDS) {
      expect(cards.has(ruleCardKey(id))).toBe(true);
      expect(parseSrsCardKey(ruleCardKey(id))).toMatchObject({ kind: "rule", value: id });
    }
  });

  test("erro em h21 cria cartões da regra, da palavra e da sílaba sem duplicar", () => {
    const exercise = LESSONS.find((lesson) => lesson.id === "h21")!
      .exercises[0]!;
    const first = scheduleMissedReview(createEmptyProgress(NOW), exercise, NOW);

    expect(Object.keys(first.cards)).toEqual([
      "h:rule:liaison",
      "h:word:한국어",
      "h:syl:국",
    ]);
    expect(first.cards["h:rule:liaison"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });

    const again = scheduleMissedReview(first, exercise, NOW);
    expect(again.cards).toEqual(first.cards);
  });

  test("erro em h22 e h23 agenda as regras correspondentes", () => {
    const h22 = LESSONS.find((lesson) => lesson.id === "h22")!.exercises[0]!;
    const h23 = LESSONS.find((lesson) => lesson.id === "h23")!.exercises[0]!;

    const afterH22 = scheduleMissedReview(createEmptyProgress(NOW), h22, NOW);
    expect(afterH22.cards["h:rule:nasalization"]).toBeDefined();

    const afterH23 = scheduleMissedReview(afterH22, h23, NOW);
    expect(afterH23.cards["h:rule:aspiration"]).toBeDefined();
    expect(afterH23.cards["h:rule:nasalization"]).toBeDefined();
  });

  test("cartões de regra persistem após recarga", async () => {
    const memory = new Map<string, string>();
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value);
      },
    };
    const exercise = LESSONS.find((lesson) => lesson.id === "h23")!
      .exercises[0]!;
    const progress = scheduleMissedReview(
      createEmptyProgress(NOW),
      exercise,
      NOW,
    );

    expect(
      await createLocalStorageStore(storage, () => NOW, "kbr:test:rules").save(
        progress,
      ),
    ).toBe(true);
    const reloaded = await createLocalStorageStore(
      storage,
      () => NOW,
      "kbr:test:rules",
    ).load();

    expect(reloaded.cards).toEqual(progress.cards);
    expect(reloaded.cards["h:rule:aspiration"]).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
  });
});
