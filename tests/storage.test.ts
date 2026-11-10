import { describe, expect, test } from "vitest";
import {
  PROGRESS_STORAGE_KEY,
  createEmptyProgress,
  createLocalStorageStore,
  type StorageLike,
} from "@/lib/storage";

const NOW = new Date("2026-11-10T12:00:00.000Z");

class MemoryStorage implements StorageLike {
  values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("persistência local", () => {
  test("cria progresso vazio com relógio injetado", async () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);

    await expect(store.load()).resolves.toEqual({
      v: 1,
      lessons: {},
      cards: {},
      history: [],
      streak: 0,
      dailyGoal: 10,
      lastActive: NOW.toISOString(),
    });
  });

  test("salva e carrega progresso válido", async () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);
    const progress = createEmptyProgress(NOW);
    progress.lessons.intro = { done: true, score: 90 };
    progress.cards.card1 = { box: 2, due: "2026-11-12T12:00:00.000Z" };
    progress.history.push({ exerciseId: "ex1", correct: true, at: NOW.toISOString() });

    await expect(store.save(progress)).resolves.toBe(true);
    await expect(store.load()).resolves.toEqual(progress);
  });

  test.each([
    "não é JSON",
    JSON.stringify({ v: 1, lessons: {}, cards: { bad: { box: 9, due: "ontem" } } }),
  ])("recupera de dados inválidos sem sobrescrevê-los", async (raw) => {
    const storage = new MemoryStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, raw);

    await expect(createLocalStorageStore(storage, () => NOW).load()).resolves.toEqual(createEmptyProgress(NOW));
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe(raw);
  });

  test("migra v0 para v1 e acrescenta a meta diária", async () => {
    const storage = new MemoryStorage();
    storage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        v: 0,
        lessons: {},
        cards: {},
        history: [],
        streak: 2,
        lastActive: NOW.toISOString(),
      }),
    );

    const progress = await createLocalStorageStore(storage, () => NOW).load();

    expect(progress).toMatchObject({ v: 1, streak: 2, dailyGoal: 10 });
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "null")).toEqual(progress);
  });

  test("trata falhas de acesso e escrita do navegador", async () => {
    const blocked: StorageLike = {
      getItem() {
        throw new Error("bloqueado");
      },
      setItem() {
        throw new Error("bloqueado");
      },
    };
    const store = createLocalStorageStore(blocked, () => NOW);

    await expect(store.load()).resolves.toEqual(createEmptyProgress(NOW));
    await expect(store.save(createEmptyProgress(NOW))).resolves.toBe(false);
  });
});
