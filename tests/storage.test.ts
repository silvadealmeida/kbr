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
  test("cria progresso vazio com relógio injetado", () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);

    expect(store.load()).toEqual({
      v: 1,
      lessons: {},
      cards: {},
      history: [],
      streak: 0,
      dailyGoal: 10,
      lastActive: NOW.toISOString(),
    });
  });

  test("salva e carrega progresso válido", () => {
    const storage = new MemoryStorage();
    const store = createLocalStorageStore(storage, () => NOW);
    const progress = createEmptyProgress(NOW);
    progress.lessons.intro = { done: true, score: 90 };
    progress.cards.card1 = { box: 2, due: "2026-11-12T12:00:00.000Z" };
    progress.history.push({ exerciseId: "ex1", correct: true, at: NOW.toISOString() });

    expect(store.save(progress)).toBe(true);
    expect(store.load()).toEqual(progress);
  });

  test.each([
    "não é JSON",
    JSON.stringify({ v: 1, lessons: {}, cards: { bad: { box: 9, due: "ontem" } } }),
  ])("recupera de dados inválidos sem sobrescrevê-los", (raw) => {
    const storage = new MemoryStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, raw);

    expect(createLocalStorageStore(storage, () => NOW).load()).toEqual(createEmptyProgress(NOW));
    expect(storage.getItem(PROGRESS_STORAGE_KEY)).toBe(raw);
  });

  test("migra v0 para v1 e acrescenta a meta diária", () => {
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

    const progress = createLocalStorageStore(storage, () => NOW).load();

    expect(progress).toMatchObject({ v: 1, streak: 2, dailyGoal: 10 });
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "null")).toEqual(progress);
  });

  test("trata falhas de acesso e escrita do navegador", () => {
    const blocked: StorageLike = {
      getItem() {
        throw new Error("bloqueado");
      },
      setItem() {
        throw new Error("bloqueado");
      },
    };
    const store = createLocalStorageStore(blocked, () => NOW);

    expect(store.load()).toEqual(createEmptyProgress(NOW));
    expect(store.save(createEmptyProgress(NOW))).toBe(false);
  });
});
