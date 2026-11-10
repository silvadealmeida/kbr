import { describe, expect, test } from "vitest";
import {
  createEmptyProgress,
  createSyncedProgressStore,
  mergeProgress,
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
 * demonstrar que o contrato atual do `ProgressStore` não detecta conflito.
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

describe("auditoria de concorrência — invariantes já garantidos", () => {
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
    left.cards["h:syl:가"] = { box: 2, due: "2026-11-12T10:00:00.000Z" };
    const right = progressAt("2026-11-10T10:05:00.000Z");
    right.cards["h:syl:나"] = { box: 3, due: "2026-11-13T10:00:00.000Z" };

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

describe("auditoria de concorrência — conflitos confirmados", () => {
  /**
   * Bug confirmado em `mergeProgress`: a escolha do lado "mais recente" usa
   * `lastActive` do documento inteiro. Uma lição feita depois de uma revisão
   * faz com que o snapshot inteiro do cartão antigo vença a revisão mais nova.
   * Quando o merge for corrigido por cartão, este `test.fails` deve virar um
   * teste normal (remover `.fails`).
   */
  test.fails("cartão com revisão mais nova não é sobrescrito por lição posterior", () => {
    const stale = progressAt("2026-11-10T12:00:00.000Z");
    stale.cards["h:syl:가"] = { box: 1, due: "2026-11-11T10:00:00.000Z" };
    stale.lessons.h20 = { done: true, score: 100 };
    stale.history.push({
      exerciseId: "review:h:syl:가",
      correct: false,
      at: "2026-11-10T10:00:00.000Z",
    });

    const newerReview = progressAt("2026-11-10T11:00:00.000Z");
    newerReview.cards["h:syl:가"] = { box: 3, due: "2026-11-14T11:00:00.000Z" };
    newerReview.history.push({
      exerciseId: "review:h:syl:가",
      correct: true,
      at: "2026-11-10T11:00:00.000Z",
    });

    const merged = mergeProgress(stale, newerReview);

    // A tentativa nova continua no histórico...
    expect(merged.history).toHaveLength(2);
    // ...mas o estado Leitner novo é descartado pelo snapshot de `stale`.
    expect(merged.cards["h:syl:가"]).toEqual(newerReview.cards["h:syl:가"]);
  });

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
    // do PostgreSQL; prova que o contrato atual do store é última-escrita-vence.
    expect(remote.current.lessons.h01).toBeUndefined();
    expect(remote.current.lessons.h02).toEqual({ done: true, score: 90 });
  });

  test.fails("clock adiantado não faz uma revisão antiga vencer a mais nova", () => {
    const skewed = progressAt("2026-11-10T12:10:00.000Z");
    skewed.cards["h:syl:가"] = { box: 1, due: "2026-11-11T10:00:00.000Z" };
    const actualNewer = progressAt("2026-11-10T12:05:00.000Z");
    actualNewer.cards["h:syl:가"] = { box: 3, due: "2026-11-14T12:05:00.000Z" };

    expect(mergeProgress(skewed, actualNewer).cards["h:syl:가"]).toEqual(
      actualNewer.cards["h:syl:가"],
    );
  });
});
