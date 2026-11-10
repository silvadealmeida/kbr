import { describe, expect, test, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  PROGRESS_STORAGE_KEY,
  createEmptyProgress,
  createSyncedProgressStore,
  mergeProgress,
  progressStorageKeyForUser,
  syncProgressForUser,
  type Progress,
  type ProgressStore,
  type StorageLike,
} from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");
const USER_ID = "11111111-1111-1111-1111-111111111111";

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

function memoryStore(progress: Progress, saveResult = true): ProgressStore & { save: ReturnType<typeof vi.fn> } {
  return {
    load: vi.fn().mockResolvedValue(progress),
    save: vi.fn().mockResolvedValue(saveResult),
  };
}

function supabaseClient(remote: Progress | null, loadError: unknown = null, saveError: unknown = loadError) {
  const maybeSingle = vi.fn().mockResolvedValue({ data: remote ? { progress: remote } : null, error: loadError });
  const eq = vi.fn(() => ({ maybeSingle }));
  const select = vi.fn(() => ({ eq }));
  const upsert = vi.fn().mockResolvedValue({ error: saveError });
  const from = vi.fn(() => ({ select, upsert }));
  return { client: { from } as unknown as SupabaseClient, maybeSingle, upsert };
}

describe("sincronização de progresso", () => {
  test("merge é idempotente e não duplica tentativas", () => {
    const left = createEmptyProgress(NOW);
    left.lessons.hangul = { done: false, score: 50 };
    left.history.push({ exerciseId: "e1", correct: true, at: NOW.toISOString() });
    const right = structuredClone(left);
    right.lessons.hangul = { done: true, score: 80 };

    const merged = mergeProgress(left, right);
    expect(merged.lessons.hangul).toEqual({ done: true, score: 80 });
    expect(merged.history).toHaveLength(1);
    expect(mergeProgress(merged, right)).toEqual(merged);
  });

  test("estado vazio recente não apaga streak remoto", () => {
    const empty = createEmptyProgress(new Date("2026-11-12T12:00:00.000Z"));
    const remote = createEmptyProgress(NOW);
    remote.streak = 4;

    expect(mergeProgress(empty, remote).streak).toBe(4);
  });

  test("merge entre dispositivos preserva o maior streak válido", () => {
    const older = createEmptyProgress(new Date("2026-11-09T12:00:00.000Z"));
    older.streak = 7;
    older.lessons.hangul = { done: true, score: 90 };
    const newer = createEmptyProgress(NOW);
    newer.streak = 2;
    newer.cards.card1 = { box: 1, due: "2026-11-12T12:00:00.000Z" };

    const merged = mergeProgress(older, newer);

    expect(merged.streak).toBe(7);
    expect(merged.lastActive).toBe(newer.lastActive);
    expect(merged.cards.card1).toEqual(newer.cards.card1);
    expect(mergeProgress(newer, older).streak).toBe(7);
  });

  test("store sincronizado informa offline após falha remota e synced ao recuperar", async () => {
    const progress = createEmptyProgress(NOW);
    const local = memoryStore(progress);
    const remote = memoryStore(progress, false);
    remote.save.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const statuses: string[] = [];
    const store = createSyncedProgressStore(local, remote, (status) => statuses.push(status));

    await expect(store.save(progress)).resolves.toBe(false);
    await expect(store.save(progress)).resolves.toBe(true);

    expect(statuses).toEqual(["syncing", "offline", "syncing", "synced"]);
  });

  test("store sincronizado informa offline quando a leitura remota falha", async () => {
    const progress = createEmptyProgress(NOW);
    const local = memoryStore(progress);
    const remote: ProgressStore = {
      load: vi.fn().mockRejectedValue(new Error("offline")),
      save: vi.fn().mockResolvedValue(true),
    };
    const statuses: string[] = [];
    const store = createSyncedProgressStore(local, remote, (status) => statuses.push(status));

    await expect(store.load()).resolves.toEqual(progress);
    expect(statuses).toEqual(["syncing", "offline"]);
  });

  test("store sincronizado salva local antes do remoto e tolera offline", async () => {
    const progress = createEmptyProgress(NOW);
    const local = memoryStore(progress);
    const remote = memoryStore(progress, false);
    const store = createSyncedProgressStore(local, remote);

    await expect(store.save(progress)).resolves.toBe(false);
    expect(local.save).toHaveBeenCalledWith(progress);
    expect(remote.save).toHaveBeenCalledWith(progress);
  });

  test("migra convidado uma vez e restaura o remoto no cache da conta", async () => {
    const storage = new MemoryStorage();
    const guest = createEmptyProgress(NOW);
    guest.lessons.hangul = { done: true, score: 90 };
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(guest));
    const remote = createEmptyProgress(new Date("2026-11-11T12:00:00.000Z"));
    remote.cards.card1 = { box: 2, due: "2026-11-13T12:00:00.000Z" };
    const supabase = supabaseClient(remote);

    const result = await syncProgressForUser(supabase.client, storage, USER_ID, () => NOW);

    expect(result).toMatchObject({ status: "synced", migratedGuest: true });
    expect(result.progress.lessons.hangul.done).toBe(true);
    expect(result.progress.cards.card1.box).toBe(2);
    expect(JSON.parse(storage.getItem(progressStorageKeyForUser(USER_ID)) ?? "null")).toEqual(result.progress);
    expect(supabase.upsert).toHaveBeenCalledTimes(1);
  });

  test("falha de rede preserva convidado no cache da conta e permite nova tentativa", async () => {
    const storage = new MemoryStorage();
    const guest = createEmptyProgress(NOW);
    guest.streak = 3;
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(guest));
    const supabase = supabaseClient(null, new Error("offline"));

    const result = await syncProgressForUser(supabase.client, storage, USER_ID, () => NOW);

    expect(result).toMatchObject({ status: "offline", migratedGuest: false });
    expect(JSON.parse(storage.getItem(progressStorageKeyForUser(USER_ID)) ?? "null").streak).toBe(3);
  });

  test("falha só na gravação remota mantém status offline e preserva o merge", async () => {
    const storage = new MemoryStorage();
    const account = createEmptyProgress(NOW);
    account.lessons.hangul = { done: true, score: 80 };
    storage.setItem(progressStorageKeyForUser(USER_ID), JSON.stringify(account));
    const remote = createEmptyProgress(NOW);
    remote.streak = 4;
    const supabase = supabaseClient(remote, null, new Error("offline"));

    const result = await syncProgressForUser(supabase.client, storage, USER_ID, () => NOW);

    expect(result).toMatchObject({ status: "offline", migratedGuest: false });
    expect(result.progress.lessons.hangul.done).toBe(true);
    expect(result.progress.streak).toBe(4);
    expect(JSON.parse(storage.getItem(progressStorageKeyForUser(USER_ID)) ?? "null")).toEqual(result.progress);
  });

  test("deduplica sincronizações simultâneas do mesmo usuário", async () => {
    const storage = new MemoryStorage();
    const supabase = supabaseClient(createEmptyProgress(NOW));

    const first = syncProgressForUser(supabase.client, storage, USER_ID, () => NOW);
    const second = syncProgressForUser(supabase.client, storage, USER_ID, () => NOW);
    expect(first).toBe(second);
    await first;
    expect(supabase.maybeSingle).toHaveBeenCalledTimes(1);
  });
});
