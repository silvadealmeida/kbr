import { describe, expect, test, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createEmptyProgress, createSupabaseProgressStore } from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");
const USER_ID = "11111111-1111-1111-1111-111111111111";

function clientWith(result: { data: unknown; error: unknown }) {
  const maybeSingle = vi.fn().mockResolvedValue(result);
  const eq = vi.fn(() => ({ maybeSingle }));
  const select = vi.fn(() => ({ eq }));
  const upsert = vi.fn().mockResolvedValue({ error: result.error });
  const from = vi.fn(() => ({ select, upsert }));
  return { client: { from } as unknown as SupabaseClient, from, upsert };
}

describe("ProgressStore Supabase", () => {
  test("carrega e valida o snapshot do usuário", async () => {
    const progress = createEmptyProgress(NOW);
    const { client } = clientWith({ data: { progress }, error: null });
    const store = createSupabaseProgressStore(client, USER_ID, { now: () => NOW });

    await expect(store.load()).resolves.toEqual(progress);
  });

  test("retorna estado vazio quando ainda não há linha remota", async () => {
    const { client } = clientWith({ data: null, error: null });
    const store = createSupabaseProgressStore(client, USER_ID, { now: () => NOW });

    await expect(store.load()).resolves.toEqual(createEmptyProgress(NOW));
  });

  test("não mascara falha de rede nem dados remotos inválidos", async () => {
    const failed = clientWith({ data: null, error: new Error("offline") });
    const invalid = clientWith({ data: { progress: { v: 99 } }, error: null });

    await expect(createSupabaseProgressStore(failed.client, USER_ID).load()).rejects.toThrow("Falha ao carregar");
    await expect(createSupabaseProgressStore(invalid.client, USER_ID).load()).rejects.toThrow("inválido");
  });

  test("faz upsert idempotente pela chave do usuário", async () => {
    const { client, upsert } = clientWith({ data: null, error: null });
    const store = createSupabaseProgressStore(client, USER_ID, {
      now: () => NOW,
      syncId: () => "33333333-3333-3333-3333-333333333333",
    });
    const progress = createEmptyProgress(NOW);

    await expect(store.save(progress)).resolves.toBe(true);
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: USER_ID, progress }),
      { onConflict: "user_id" },
    );
  });

  test("sinaliza falha de escrita", async () => {
    const { client } = clientWith({ data: null, error: new Error("offline") });
    const store = createSupabaseProgressStore(client, USER_ID, { now: () => NOW });

    await expect(store.save(createEmptyProgress(NOW))).resolves.toBe(false);
  });
});
