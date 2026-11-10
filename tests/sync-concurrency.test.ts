import { describe, expect, test } from "vitest";
import {
  canonicalHistory,
  compareCardStates,
  createEmptyProgress,
  createSyncedProgressStore,
  inferCardReviewedAt,
  mergeProgress,
  progressEquals,
  type Progress,
  type ProgressStore,
} from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** Store local em memória, com o mesmo contrato de `ProgressStore`. */
function memoryStore(initial: Progress) {
  let current = clone(initial);
  return {
    get current() {
      return current;
    },
    store: {
      async load() {
        return clone(current);
      },
      async save(progress: Progress) {
        current = clone(progress);
        return true;
      },
    } satisfies ProgressStore,
  };
}

/**
 * Remoto fake de última escrita. Não simula PostgreSQL: serve apenas para
 * provar que um contrato sem CAS perde escritas concorrentes. O store de
 * produção usa `createSupabaseProgressStore` sobre o RPC CAS.
 */
function lastWriteWinsRemote(initial: Progress) {
  let current = clone(initial);
  return {
    get current() {
      return current;
    },
    store: {
      async load() {
        return clone(current);
      },
      async save(progress: Progress) {
        current = clone(progress);
        return true;
      },
    } satisfies ProgressStore,
  };
}

function progressAt(iso: string): Progress {
  return createEmptyProgress(new Date(iso));
}

function card(box: number, due: string, reviewedAt?: string) {
  return { box: box as 1 | 2 | 3 | 4 | 5, due, ...(reviewedAt ? { reviewedAt } : {}) };
}

describe("merge de lições, cartões e histórico", () => {
  test("duas lições concluídas em dispositivos diferentes sobrevivem ao merge", () => {
    const left = progressAt("2026-11-10T10:00:00.000Z");
    left.lessons.h01 = { done: true, score: 80 };
    const right = progressAt("2026-11-10T10:05:00.000Z");
    right.lessons.h02 = { done: true, score: 90 };

    const merged = mergeProgress(left, right);
    expect(merged.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });
    expect(mergeProgress(right, left).lessons).toEqual(merged.lessons);
  });

  test("checkpoint concluído não regride e preserva o maior score", () => {
    const left = progressAt("2026-11-10T10:00:00.000Z");
    left.lessons.c1 = { done: true, score: 80 };
    const right = progressAt("2026-11-10T10:05:00.000Z");
    right.lessons.c1 = { done: false, score: 95 };

    expect(mergeProgress(left, right).lessons.c1).toEqual({ done: true, score: 95 });
    expect(mergeProgress(right, left).lessons.c1).toEqual({ done: true, score: 95 });
  });

  test("revisões de cartões diferentes são preservadas", () => {
    const left = progressAt("2026-11-10T10:00:00.000Z");
    left.cards["h:syl:가"] = card(2, "2026-11-12T10:00:00.000Z");
    const right = progressAt("2026-11-10T10:05:00.000Z");
    right.cards["h:syl:나"] = card(3, "2026-11-13T10:00:00.000Z");

    const merged = mergeProgress(left, right);
    expect(merged.cards).toMatchObject({
      "h:syl:가": { box: 2 },
      "h:syl:나": { box: 3 },
    });
    expect(mergeProgress(right, left).cards).toEqual(merged.cards);
  });

  test("deduplica tentativas idênticas e é idempotente em retentativas", () => {
    const attempt = {
      exerciseId: "h01-e01",
      correct: true,
      at: "2026-11-10T10:00:00.000Z",
    };
    const left = progressAt("2026-11-10T10:00:00.000Z");
    left.history.push(attempt);
    const right = progressAt("2026-11-10T10:05:00.000Z");
    right.history.push(attempt);

    const once = mergeProgress(left, right);
    const twice = mergeProgress(once, right);

    expect(once.history).toHaveLength(1);
    expect(twice.history).toEqual(once.history);
    expect(twice).toEqual(once);
  });

  test("histórico usa id estável, aceita repetição legítima e preserva registros antigos", () => {
    const at = "2026-11-10T10:00:00.000Z";
    const left = progressAt(at);
    left.history.push(
      { id: "attempt-a", exerciseId: "h01-e01", correct: true, at },
      { exerciseId: "h01-e01", correct: false, at: "2026-11-10T10:01:00.000Z" },
    );
    const right = progressAt(at);
    right.history.push(
      { id: "attempt-a", exerciseId: "h01-e01", correct: true, at },
      { exerciseId: "h01-e01", correct: true, at: "2026-11-10T10:02:00.000Z" },
    );

    const merged = mergeProgress(left, right);
    expect(merged.history).toHaveLength(3);
    expect(merged.history.filter((attempt) => attempt.id === "attempt-a")).toHaveLength(1);
    expect(merged.history.map((attempt) => attempt.at)).toEqual([
      at,
      "2026-11-10T10:01:00.000Z",
      "2026-11-10T10:02:00.000Z",
    ]);
    expect(canonicalHistory([...merged.history, ...left.history])).toEqual(merged.history);
  });

  test("migração de convidado preserva lições do convidado e do remoto", () => {
    const guest = progressAt("2026-11-10T10:00:00.000Z");
    guest.lessons.h01 = { done: true, score: 80 };
    const account = progressAt("2026-11-10T10:01:00.000Z");
    const remote = progressAt("2026-11-10T10:02:00.000Z");
    remote.lessons.h02 = { done: true, score: 90 };

    const local = mergeProgress(account, guest);
    const merged = mergeProgress(local, remote);

    expect(merged.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });
  });

  test("edição offline sobrevive à falha e é reenviada ao reconectar", async () => {
    const remoteState = lastWriteWinsRemote(createEmptyProgress(NOW));
    remoteState.current.lessons.h02 = { done: true, score: 90 };
    let online = false;
    const remote: ProgressStore = {
      load: () => remoteState.store.load(),
      async save(progress) {
        return online ? remoteState.store.save(progress) : false;
      },
    };
    const local = memoryStore(createEmptyProgress(NOW));
    const store = createSyncedProgressStore(local.store, remote);

    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    await expect(store.save(edited)).resolves.toBe(false);
    expect(local.current.lessons.h01).toEqual({ done: true, score: 80 });

    online = true;
    await expect(store.save(edited)).resolves.toBe(true);
    expect(remoteState.current.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });
  });
});

describe("merge por cartão e relógio", () => {
  test("cartão com revisão mais nova não é sobrescrito por lição posterior", () => {
    const stale = progressAt("2026-11-10T12:00:00.000Z");
    stale.cards["h:syl:가"] = card(1, "2026-11-11T10:00:00.000Z");
    stale.lessons.h20 = { done: true, score: 100 };
    stale.history.push({
      exerciseId: "review:h:syl:가",
      correct: false,
      at: "2026-11-10T10:00:00.000Z",
    });

    const newerReview = progressAt("2026-11-10T11:00:00.000Z");
    newerReview.cards["h:syl:가"] = card(3, "2026-11-14T11:00:00.000Z");
    newerReview.history.push({
      exerciseId: "review:h:syl:가",
      correct: true,
      at: "2026-11-10T11:00:00.000Z",
    });

    const merged = mergeProgress(stale, newerReview);

    expect(merged.history).toHaveLength(2);
    expect(merged.cards["h:syl:가"]).toEqual(newerReview.cards["h:syl:가"]);
    expect(mergeProgress(newerReview, stale).cards["h:syl:가"]).toEqual(
      newerReview.cards["h:syl:가"],
    );
  });

  test("clock adiantado não faz uma revisão antiga vencer a mais nova", () => {
    const skewed = progressAt("2026-11-10T12:10:00.000Z");
    skewed.cards["h:syl:가"] = card(1, "2026-11-11T10:00:00.000Z");
    const actualNewer = progressAt("2026-11-10T12:05:00.000Z");
    actualNewer.cards["h:syl:가"] = card(3, "2026-11-14T12:05:00.000Z");

    expect(mergeProgress(skewed, actualNewer).cards["h:syl:가"]).toEqual(
      actualNewer.cards["h:syl:가"],
    );
    expect(mergeProgress(actualNewer, skewed).cards["h:syl:가"]).toEqual(
      actualNewer.cards["h:syl:가"],
    );
  });

  test("due isolado não vence uma falha nova na caixa 1", () => {
    const oldBoxFive = card(5, "2026-11-26T10:00:00.000Z", "2026-11-10T10:00:00.000Z");
    const newFailure = card(1, "2026-11-11T11:00:00.000Z", "2026-11-10T11:00:00.000Z");

    expect(compareCardStates(newFailure, oldBoxFive)).toBeGreaterThan(0);
    expect(
      mergeProgress(
        { ...createEmptyProgress(NOW), cards: { "h:syl:가": oldBoxFive } },
        { ...createEmptyProgress(NOW), cards: { "h:syl:가": newFailure } },
      ).cards["h:syl:가"],
    ).toEqual(newFailure);
  });

  test("estado legado sem reviewedAt é inferido pela agenda Leitner", () => {
    expect(inferCardReviewedAt({ box: 1, due: "2026-11-11T10:00:00.000Z" })).toBe(
      "2026-11-10T10:00:00.000Z",
    );
    expect(inferCardReviewedAt({ box: 3, due: "2026-11-14T10:00:00.000Z" })).toBe(
      "2026-11-10T10:00:00.000Z",
    );

    const legacy = progressAt("2026-11-10T12:00:00.000Z");
    legacy.cards["h:syl:가"] = card(1, "2026-11-11T10:00:00.000Z");
    const reviewed = progressAt("2026-11-10T11:00:00.000Z");
    reviewed.cards["h:syl:가"] = card(3, "2026-11-14T11:00:00.000Z");

    expect(mergeProgress(legacy, reviewed).cards["h:syl:가"]).toEqual(
      reviewed.cards["h:syl:가"],
    );
  });

  test("empate de revisão é determinístico e independente da ordem", () => {
    const at = "2026-11-10T10:00:00.000Z";
    const higherBox = card(4, "2026-11-14T10:00:00.000Z", at);
    const lowerBox = card(2, "2026-11-12T10:00:00.000Z", at);

    const left = progressAt(at);
    left.cards["h:syl:가"] = higherBox;
    const right = progressAt(at);
    right.cards["h:syl:가"] = lowerBox;

    const forward = mergeProgress(left, right).cards["h:syl:가"];
    const backward = mergeProgress(right, left).cards["h:syl:가"];
    expect(forward).toEqual(backward);
    expect(forward).toEqual(lowerBox);
  });

  test("revisões concorrentes do mesmo cartão preservam as duas tentativas", () => {
    const base = progressAt("2026-11-10T10:00:00.000Z");
    base.cards["h:word:고기"] = card(2, "2026-11-12T10:00:00.000Z", "2026-11-10T10:00:00.000Z");

    const correct = clone(base);
    correct.cards["h:word:고기"] = card(3, "2026-11-14T11:00:00.000Z", "2026-11-10T11:00:00.000Z");
    correct.history.push({
      id: "review-a",
      exerciseId: "review:h:word:고기",
      correct: true,
      at: "2026-11-10T11:00:00.000Z",
    });

    const again = clone(base);
    again.cards["h:word:고기"] = card(1, "2026-11-11T11:00:01.000Z", "2026-11-10T11:00:01.000Z");
    again.history.push({
      id: "review-b",
      exerciseId: "review:h:word:고기",
      correct: false,
      at: "2026-11-10T11:00:01.000Z",
    });

    const merged = mergeProgress(correct, again);

    // A última ação lógica vence; a composição sequencial exata (2 → 3 ou
    // 1 → 2) não é garantida porque o Progress v1 não guarda a base de cada
    // revisão nem um log ordenado de eventos.
    expect(merged.cards["h:word:고기"]).toEqual(again.cards["h:word:고기"]);
    expect(merged.history.map((attempt) => attempt.id)).toEqual(["review-a", "review-b"]);
    expect(mergeProgress(again, correct).cards["h:word:고기"]).toEqual(
      again.cards["h:word:고기"],
    );
  });

  test("merge é comutativo, associativo e idempotente", () => {
    const a = progressAt("2026-11-10T10:00:00.000Z");
    a.lessons.h01 = { done: true, score: 80 };
    a.cards["h:syl:가"] = card(2, "2026-11-12T10:00:00.000Z", "2026-11-10T10:00:00.000Z");
    a.history.push({ id: "a1", exerciseId: "e1", correct: true, at: "2026-11-10T10:00:00.000Z" });

    const b = progressAt("2026-11-10T10:05:00.000Z");
    b.lessons.h01 = { done: false, score: 90 };
    b.cards["h:syl:나"] = card(1, "2026-11-11T10:05:00.000Z", "2026-11-10T10:05:00.000Z");
    b.history.push({ exerciseId: "e2", correct: false, at: "2026-11-10T10:05:00.000Z" });

    const c = progressAt("2026-11-10T10:10:00.000Z");
    c.lessons.h02 = { done: true, score: 70 };
    c.cards["h:syl:가"] = card(3, "2026-11-14T10:10:00.000Z", "2026-11-10T10:10:00.000Z");

    expect(progressEquals(mergeProgress(a, b), mergeProgress(b, a))).toBe(true);
    expect(
      progressEquals(mergeProgress(mergeProgress(a, b), c), mergeProgress(a, mergeProgress(b, c))),
    ).toBe(true);
    expect(progressEquals(mergeProgress(a, a), a)).toBe(true);
  });

  test("progressEquals ignora ordem de chaves e de tentativas canônicas", () => {
    const left = progressAt(NOW.toISOString());
    left.lessons.h01 = { done: true, score: 80 };
    left.cards["h:syl:가"] = card(1, "2026-11-11T10:00:00.000Z");
    left.history.push(
      { id: "b", exerciseId: "e2", correct: false, at: "2026-11-10T11:00:00.000Z" },
      { id: "a", exerciseId: "e1", correct: true, at: "2026-11-10T10:00:00.000Z" },
    );

    const right = structuredClone(left);
    right.history.reverse();

    expect(progressEquals(left, right)).toBe(true);
    right.cards["h:syl:가"] = card(2, "2026-11-12T10:00:00.000Z");
    expect(progressEquals(left, right)).toBe(false);
  });
});

describe("auditoria de concorrência — limite do contrato sem CAS", () => {
  test("harness: remoto de última escrita perde a lição da outra sessão", async () => {
    const base = createEmptyProgress(NOW);
    const remote = lastWriteWinsRemote(base);
    const localA = memoryStore(base);
    const localB = memoryStore(base);
    const storeA = createSyncedProgressStore(localA.store, remote.store);
    const storeB = createSyncedProgressStore(localB.store, remote.store);

    const [loadedA, loadedB] = await Promise.all([storeA.load(), storeB.load()]);
    const deviceA = clone(loadedA);
    deviceA.lessons.h01 = { done: true, score: 80 };
    const deviceB = clone(loadedB);
    deviceB.lessons.h02 = { done: true, score: 90 };

    await storeA.save(deviceA);
    await storeB.save(deviceB);

    // O remoto fake guarda apenas o último snapshot. Isto NÃO prova atomicidade
    // do PostgreSQL; prova por que o store de produção precisa do CAS do RPC.
    expect(remote.current.lessons.h01).toBeUndefined();
    expect(remote.current.lessons.h02).toEqual({ done: true, score: 90 });
  });
});
