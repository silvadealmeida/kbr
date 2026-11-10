import { describe, expect, test } from "vitest";
import {
  classifyProgressSyncError,
  createEmptyProgress,
  createSupabaseProgressStore,
} from "@/lib/storage";
import { FakeCasServer } from "./helpers/fakeSupabaseCas";

const NOW = new Date("2026-11-10T12:00:00.000Z");
const USER_ID = "11111111-1111-1111-1111-111111111111";

describe("ProgressStore Supabase", () => {
  test("carrega e valida o snapshot e o token do usuário", async () => {
    const server = new FakeCasServer();
    const progress = createEmptyProgress(NOW);
    progress.lessons.h01 = { done: true, score: 80 };
    server.seed(USER_ID, progress);
    const store = createSupabaseProgressStore(server.client(USER_ID), USER_ID, {
      now: () => NOW,
    });

    await expect(store.load()).resolves.toEqual(progress);
  });

  test("retorna estado vazio quando ainda não há linha remota", async () => {
    const server = new FakeCasServer();
    const store = createSupabaseProgressStore(server.client(USER_ID), USER_ID, {
      now: () => NOW,
    });

    await expect(store.load()).resolves.toEqual(createEmptyProgress(NOW));
  });

  test("não mascara falha de rede nem dados remotos inválidos", async () => {
    const failed = new FakeCasServer();
    failed.failNext({ kind: "network" });
    const invalid = new FakeCasServer();
    invalid.seed(USER_ID, { v: 99 } as never);

    await expect(
      createSupabaseProgressStore(failed.client(USER_ID), USER_ID).load(),
    ).rejects.toThrow("Falha ao carregar");
    await expect(
      createSupabaseProgressStore(invalid.client(USER_ID), USER_ID).load(),
    ).rejects.toThrow("inválido");
  });

  test("grava com CAS e devolve confirmação do servidor", async () => {
    const server = new FakeCasServer();
    server.seed(USER_ID, createEmptyProgress(NOW));
    const store = createSupabaseProgressStore(server.client(USER_ID), USER_ID, {
      now: () => NOW,
    });
    const progress = createEmptyProgress(NOW);

    await expect(store.save(progress)).resolves.toBe(true);
    expect(server.row(USER_ID)!.progress).toEqual(progress);
  });

  test("sinaliza falha de escrita sem lançar", async () => {
    const server = new FakeCasServer();
    server.seed(USER_ID, createEmptyProgress(NOW));
    const store = createSupabaseProgressStore(server.client(USER_ID), USER_ID, {
      now: () => NOW,
      transientRetryLimit: 0,
    });
    await store.load();

    server.failNextRpc(1, { kind: "network" });
    await expect(store.save(createEmptyProgress(NOW))).resolves.toBe(false);
    expect(store.lastErrorKind).toBe("network");
  });
});

describe("classificação de erros de sincronização", () => {
  test("distingue autorização, validação e rede", () => {
    expect(classifyProgressSyncError({ code: "42501" })).toBe("auth");
    expect(classifyProgressSyncError({ status: 401 })).toBe("auth");
    expect(classifyProgressSyncError({ code: "PGRST301" })).toBe("auth");
    expect(classifyProgressSyncError({ code: "22023" })).toBe("validation");
    expect(classifyProgressSyncError({ status: 422 })).toBe("validation");
    expect(classifyProgressSyncError({ message: "fetch failed" })).toBe("network");
    expect(classifyProgressSyncError({ status: 503 })).toBe("network");
    expect(classifyProgressSyncError({ message: "algo inesperado" })).toBe("unexpected");
  });

  test("propaga a causa classificável sem expor o documento", () => {
    const error = new Error("wrapper", { cause: { status: 429 } });
    expect(classifyProgressSyncError(error)).toBe("network");
  });
});
