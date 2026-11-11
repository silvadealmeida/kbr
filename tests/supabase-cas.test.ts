import { describe, expect, test } from "vitest";
import { applyReview } from "@/lib/review";
import {
  classifyProgressSyncError,
  createEmptyProgress,
  createSupabaseProgressStore,
  createSyncedProgressStore,
  progressEquals,
  syncProgressForUser,
  type Progress,
  type ProgressStore,
  type StorageLike,
} from "@/lib/storage";
import { FakeCasServer } from "./helpers/fakeSupabaseCas";

const NOW = new Date("2026-11-10T12:00:00.000Z");
const USER_A = "11111111-1111-1111-1111-111111111111";
const USER_B = "22222222-2222-2222-2222-222222222222";

function clone<T>(value: T): T {
  return structuredClone(value);
}

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

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

function storeFor(server: FakeCasServer, userId = USER_A) {
  return createSupabaseProgressStore(server.client(userId), userId, {
    now: () => NOW,
    retryDelayMs: [0, 0, 0],
    sleep: async () => {},
  });
}

describe("ProgressStore Supabase com CAS", () => {
  test("carrega snapshot e aplica a primeira escrita com o token lido", async () => {
    const server = new FakeCasServer();
    const initial = createEmptyProgress(NOW);
    initial.lessons.h01 = { done: true, score: 80 };
    const initialToken = server.seed(USER_A, initial);
    const store = storeFor(server);

    await expect(store.load()).resolves.toEqual(initial);
    const edited = clone(initial);
    edited.lessons.h02 = { done: true, score: 90 };
    await expect(store.save(edited)).resolves.toBe(true);

    expect(server.rpcCalls).toHaveLength(1);
    expect(server.rpcCalls[0]!.params).toMatchObject({
      p_expected_user_id: USER_A,
      p_expected_sync_id: initialToken,
    });
    expect(server.row(USER_A)!.progress.lessons.h02).toEqual({ done: true, score: 90 });
    expect(server.row(USER_A)!.syncId).not.toBe(initialToken);
    expect(store.lastMerged?.lessons.h02).toEqual({ done: true, score: 90 });
  });

  test("conflito mescla lições de duas sessões e ambas convergem", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    server.seed(USER_A, base);
    const storeA = storeFor(server);
    const storeB = storeFor(server);

    const [loadedA, loadedB] = await Promise.all([storeA.load(), storeB.load()]);
    const deviceA = clone(loadedA);
    deviceA.lessons.h01 = { done: true, score: 80 };
    const deviceB = clone(loadedB);
    deviceB.lessons.h02 = { done: true, score: 90 };

    await expect(storeA.save(deviceA)).resolves.toBe(true);
    await expect(storeB.save(deviceB)).resolves.toBe(true);

    const remote = server.row(USER_A)!.progress;
    expect(remote.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });
    expect(storeB.lastMerged?.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });

    await expect(storeA.load()).resolves.toEqual(remote);
  });

  test("conflito preserva revisões de cartões diferentes", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    base.cards["h:word:고기"] = { box: 2, due: "2026-11-12T10:00:00.000Z" };
    base.cards["h:syl:가"] = { box: 2, due: "2026-11-12T10:00:00.000Z" };
    server.seed(USER_A, base);
    const storeA = storeFor(server);
    const storeB = storeFor(server);

    const [loadedA, loadedB] = await Promise.all([storeA.load(), storeB.load()]);
    const reviewedA = applyReview(loadedA, { cardId: "h:word:고기" }, "correct", new Date("2026-11-10T11:00:00.000Z"), "a");
    const reviewedB = applyReview(loadedB, { cardId: "h:syl:가" }, "again", new Date("2026-11-10T11:00:01.000Z"), "b");

    await expect(storeA.save(reviewedA)).resolves.toBe(true);
    await expect(storeB.save(reviewedB)).resolves.toBe(true);

    const remote = server.row(USER_A)!.progress;
    expect(remote.cards["h:word:고기"]!.box).toBe(3);
    expect(remote.cards["h:syl:가"]!.box).toBe(1);
    expect(remote.history.map((attempt) => attempt.id)).toEqual(["a", "b"]);
  });

  test("revisões concorrentes do mesmo cartão mantêm histórico e última ação", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    base.cards["h:word:고기"] = { box: 2, due: "2026-11-12T10:00:00.000Z" };
    server.seed(USER_A, base);
    const storeA = storeFor(server);
    const storeB = storeFor(server);

    const [loadedA, loadedB] = await Promise.all([storeA.load(), storeB.load()]);
    const correct = applyReview(loadedA, { cardId: "h:word:고기" }, "correct", new Date("2026-11-10T11:00:00.000Z"), "review-a");
    const again = applyReview(loadedB, { cardId: "h:word:고기" }, "again", new Date("2026-11-10T11:00:01.000Z"), "review-b");

    await expect(storeA.save(correct)).resolves.toBe(true);
    await expect(storeB.save(again)).resolves.toBe(true);

    const remote = server.row(USER_A)!.progress;
    expect(remote.cards["h:word:고기"]!.box).toBe(1);
    expect(remote.cards["h:word:고기"]!.reviewedAt).toBe("2026-11-10T11:00:01.000Z");
    expect(remote.history.map((attempt) => attempt.id)).toEqual(["review-a", "review-b"]);

    // Limitação explícita: o estado final é a última ação lógica, não a
    // composição sequencial (que seria caixa 2 após erro + acerto).
    expect(remote.cards["h:word:고기"]!.box).not.toBe(2);
  });

  test("conflito com documento semanticamente igual confirma sem segunda escrita", async () => {
    const server = new FakeCasServer();
    const doc = createEmptyProgress(NOW);
    doc.lessons.h01 = { done: true, score: 80 };
    doc.cards["h:syl:가"] = { box: 1, due: "2026-11-11T10:00:00.000Z" };
    server.seed(USER_A, doc);
    const store = storeFor(server);

    await store.load();
    server.replace(USER_A, doc);
    await expect(store.save(doc)).resolves.toBe(true);

    expect(server.rpcCalls).toHaveLength(1);
    expect(store.lastErrorKind).toBeNull();
  });

  test("response perdido após aplicar é idempotente no retry", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    const token = server.seed(USER_A, base);
    const store = storeFor(server);
    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    server.loseNextResponseAfterApply();
    await expect(store.save(edited)).resolves.toBe(true);

    expect(server.rpcCalls).toHaveLength(2);
    expect(server.rpcCalls[0]!.params.p_expected_sync_id).toBe(token);
    expect(server.rpcCalls[1]!.params.p_expected_sync_id).toBe(token);
    expect(server.row(USER_A)!.progress.lessons.h01).toEqual({ done: true, score: 80 });
    expect(server.row(USER_A)!.progress.history).toHaveLength(0);
    expect(store.lastErrorKind).toBeNull();
  });

  test("conflitos esgotados retornam false sem tocar no remoto", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    server.seed(USER_A, base);
    const store = createSupabaseProgressStore(server.client(USER_A), USER_A, {
      now: () => NOW,
      retryLimit: 3,
      retryDelayMs: [0],
      sleep: async () => {},
    });
    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    server.forceConflict = true;
    await expect(store.save(edited)).resolves.toBe(false);

    expect(server.rpcCalls).toHaveLength(3);
    expect(store.lastErrorKind).toBe("conflict");
    expect(server.row(USER_A)!.progress.lessons.h01).toBeUndefined();
  });

  test("linha removida externamente é recriada na retentativa", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    server.seed(USER_A, base);
    const store = storeFor(server);
    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    server.rows.delete(USER_A);
    await expect(store.save(edited)).resolves.toBe(true);

    expect(server.row(USER_A)!.progress.lessons.h01).toEqual({ done: true, score: 80 });
    expect(server.rpcCalls).toHaveLength(2);
  });

  test("erro de autorização não faz retry nem grava em outra conta", async () => {
    const server = new FakeCasServer();
    const base = createEmptyProgress(NOW);
    server.seed(USER_B, base);
    // Store criado para A, mas cliente autenticado como B (sessão trocada).
    const store = createSupabaseProgressStore(server.client(USER_B), USER_A, {
      now: () => NOW,
      retryDelayMs: [0],
      sleep: async () => {},
    });
    const edited = clone(base);
    edited.lessons.h01 = { done: true, score: 80 };

    await expect(store.save(edited)).resolves.toBe(false);

    expect(server.rpcCalls).toHaveLength(1);
    expect(store.lastErrorKind).toBe("auth");
    expect(server.row(USER_B)!.progress.lessons.h01).toBeUndefined();
  });

  test("erro de validação do RPC não faz retry", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const store = storeFor(server);
    await store.load();

    server.failNextRpc(1, { kind: "validation" });
    await expect(store.save(createEmptyProgress(NOW))).resolves.toBe(false);

    expect(server.rpcCalls).toHaveLength(1);
    expect(store.lastErrorKind).toBe("validation");
  });

  test("falha transitória é repetida com backoff limitado", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const delays: number[] = [];
    const store = createSupabaseProgressStore(server.client(USER_A), USER_A, {
      now: () => NOW,
      retryDelayMs: [10, 20],
      sleep: async (milliseconds) => {
        delays.push(milliseconds);
      },
    });
    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    server.failNextRpc(2, { kind: "network" });
    await expect(store.save(edited)).resolves.toBe(true);

    expect(delays).toEqual([10, 20]);
    expect(server.rpcCalls).toHaveLength(3);
    expect(store.lastErrorKind).toBeNull();
  });

  test("load e save concorrentes na mesma instância são serializados", async () => {
    const server = new FakeCasServer();
    const token = server.seed(USER_A, createEmptyProgress(NOW));
    const store = storeFor(server);
    const edited = createEmptyProgress(NOW);
    edited.lessons.h01 = { done: true, score: 80 };

    const [loaded] = await Promise.all([store.load(), store.save(edited)]);

    expect(loaded.lessons.h01).toBeUndefined();
    expect(server.rpcCalls[0]!.params.p_expected_sync_id).toBe(token);
    expect(server.row(USER_A)!.progress.lessons.h01).toEqual({ done: true, score: 80 });
  });

  test("load remoto inválido falha sem sobrescrever a linha", async () => {
    const server = new FakeCasServer();
    const invalid = { v: 99 } as unknown as Progress;
    server.seed(USER_A, invalid);
    const store = storeFor(server);

    await expect(store.load()).rejects.toThrow("inválido");
    await expect(store.save(createEmptyProgress(NOW))).resolves.toBe(false);
    expect(server.rpcCalls).toHaveLength(0);
    expect(server.row(USER_A)!.progress).toEqual(invalid);
  });

  test("dados legados sem reviewedAt e sem id convergem com dados novos", async () => {
    const server = new FakeCasServer();
    const legacy = createEmptyProgress(NOW);
    legacy.cards["h:word:고기"] = { box: 1, due: "2026-11-11T10:00:00.000Z" };
    legacy.history.push({
      exerciseId: "h01-e01",
      correct: true,
      at: "2026-11-10T10:00:00.000Z",
    });
    server.seed(USER_A, legacy);
    const store = storeFor(server);
    const loaded = await store.load();

    const updated = applyReview(
      loaded,
      { cardId: "h:word:고기" },
      "correct",
      new Date("2026-11-10T11:00:00.000Z"),
      "review-new",
    );
    await expect(store.save(updated)).resolves.toBe(true);

    const remote = server.row(USER_A)!.progress;
    expect(remote.cards["h:word:고기"]).toEqual({
      box: 2,
      due: "2026-11-12T11:00:00.000Z",
      reviewedAt: "2026-11-10T11:00:00.000Z",
    });
    expect(remote.history.map((attempt) => attempt.id ?? "legacy")).toEqual([
      "legacy",
      "review-new",
    ]);
  });
});

describe("store sincronizado com CAS", () => {
  test("não anuncia synced antes da confirmação e recupera ao reconectar", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const local = memoryStore(createEmptyProgress(NOW));
    const remote = storeFor(server);
    const statuses: string[] = [];
    const store = createSyncedProgressStore(local.store, remote, (status) => statuses.push(status));

    const loaded = await store.load();
    const edited = clone(loaded);
    edited.lessons.h01 = { done: true, score: 80 };

    server.failNextRpc(3, { kind: "network" });
    await expect(store.save(edited)).resolves.toBe(false);
    expect(statuses).toEqual(["syncing", "synced", "syncing", "offline"]);
    expect(local.current.lessons.h01).toEqual({ done: true, score: 80 });
    expect(server.row(USER_A)!.progress.lessons.h01).toBeUndefined();

    await expect(store.save(edited)).resolves.toBe(true);
    expect(statuses.at(-1)).toBe("synced");
    expect(server.row(USER_A)!.progress.lessons.h01).toEqual({ done: true, score: 80 });
  });

  test("falha de leitura remota mantém local e status offline", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const local = memoryStore(createEmptyProgress(NOW));
    const remote = storeFor(server);
    const statuses: string[] = [];
    const store = createSyncedProgressStore(local.store, remote, (status) => statuses.push(status));

    server.failNext({ kind: "network" });
    await expect(store.load()).resolves.toEqual(createEmptyProgress(NOW));
    expect(statuses).toEqual(["syncing", "offline"]);
  });
});

describe("limite de tempo das requisições remotas", () => {
  function hangingClient() {
    const calls = { abortSignals: 0 };
    const client = {
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: null }),
          }),
        }),
      }),
      rpc: () => ({
        abortSignal(signal: AbortSignal) {
          calls.abortSignals += 1;
          return new Promise((_, reject) => {
            signal.addEventListener("abort", () => {
              reject(Object.assign(new Error("The operation was aborted"), { name: "TimeoutError" }));
            });
          });
        },
      }),
    };
    return { client: client as unknown as Parameters<typeof createSupabaseProgressStore>[0], calls };
  }

  test("RPC sem resposta vira offline em vez de sincronizar para sempre", async () => {
    const { client, calls } = hangingClient();
    const store = createSupabaseProgressStore(client, USER_A, {
      now: () => NOW,
      requestTimeoutMs: 10,
      transientRetryLimit: 0,
      retryDelayMs: [0],
      sleep: async () => {},
    });

    const progress = createEmptyProgress(NOW);
    progress.lessons.h01 = { done: true, score: 100 };

    await expect(store.save(progress)).resolves.toBe(false);
    expect(calls.abortSignals).toBe(1);
    expect(store.lastErrorKind).toBe("network");
  });

  test("classifica erros de aborto/timeout como rede", async () => {
    expect(classifyProgressSyncError({ name: "TimeoutError", message: "timeout" })).toBe("network");
    expect(classifyProgressSyncError({ name: "AbortError", message: "aborted" })).toBe("network");
    expect(classifyProgressSyncError(new Error("AbortError"))).toBe("network");
  });
});

describe("syncProgressForUser com CAS", () => {
  test("migra convidado, mescla remoto e grava marcador só após confirmação", async () => {
    const server = new FakeCasServer();
    const remote = createEmptyProgress(NOW);
    remote.cards["h:syl:가"] = { box: 2, due: "2026-11-13T12:00:00.000Z" };
    server.seed(USER_A, remote);

    const storage = new MemoryStorage();
    const guest = createEmptyProgress(NOW);
    guest.lessons.h01 = { done: true, score: 90 };
    storage.setItem("kbr:v1", JSON.stringify(guest));

    const result = await syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);

    expect(result).toMatchObject({ status: "synced", migratedGuest: true, errorKind: null });
    expect(result.progress.lessons.h01).toEqual({ done: true, score: 90 });
    expect(result.progress.cards["h:syl:가"]!.box).toBe(2);
    expect(server.row(USER_A)!.progress.lessons.h01).toEqual({ done: true, score: 90 });
    expect(storage.getItem(`kbr:migrated:${USER_A}:v1`)).not.toBeNull();

    const second = await syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);
    expect(second).toMatchObject({ status: "synced", migratedGuest: false });
    expect(second.progress.lessons.h01).toEqual({ done: true, score: 90 });
  });

  test("falha de leitura preserva o convidado no cache da conta e permite retry", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const storage = new MemoryStorage();
    const guest = createEmptyProgress(NOW);
    guest.streak = 3;
    storage.setItem("kbr:v1", JSON.stringify(guest));

    server.failNext({ kind: "network" });
    const offline = await syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);

    expect(offline).toMatchObject({ status: "offline", migratedGuest: false, errorKind: "network" });
    const cached = JSON.parse(storage.getItem(`kbr:user:${USER_A}:v1`) ?? "null") as Progress;
    expect(cached.streak).toBe(3);
    expect(storage.getItem(`kbr:migrated:${USER_A}:v1`)).toBeNull();

    const retry = await syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);
    expect(retry).toMatchObject({ status: "synced", migratedGuest: true });
    expect(server.row(USER_A)!.progress.streak).toBe(3);
  });

  test("duas chamadas simultâneas do mesmo usuário são deduplicadas", async () => {
    const server = new FakeCasServer();
    server.seed(USER_A, createEmptyProgress(NOW));
    const storage = new MemoryStorage();

    const first = syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);
    const second = syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);
    expect(first).toBe(second);
    await first;
    expect(server.loadCalls).toBe(1);
  });

  test("resultado remoto mesclado é gravado no cache local da conta", async () => {
    const server = new FakeCasServer();
    const remote = createEmptyProgress(NOW);
    remote.lessons.h02 = { done: true, score: 90 };
    server.seed(USER_A, remote);
    const storage = new MemoryStorage();
    const account = createEmptyProgress(NOW);
    account.lessons.h01 = { done: true, score: 80 };
    storage.setItem(`kbr:user:${USER_A}:v1`, JSON.stringify(account));

    const result = await syncProgressForUser(server.client(USER_A), storage, USER_A, () => NOW);

    expect(result.status).toBe("synced");
    expect(progressEquals(result.progress, server.row(USER_A)!.progress)).toBe(true);
    const cached = JSON.parse(storage.getItem(`kbr:user:${USER_A}:v1`) ?? "null") as Progress;
    expect(cached.lessons).toMatchObject({
      h01: { done: true, score: 80 },
      h02: { done: true, score: 90 },
    });
  });
});
