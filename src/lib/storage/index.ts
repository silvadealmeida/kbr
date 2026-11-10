import type { SrsState } from "@/lib/srs";

export const PROGRESS_STORAGE_KEY = "kbr:v1";

export type LessonProgress = {
  done: boolean;
  score: number;
};

export type Attempt = {
  exerciseId: string;
  correct: boolean;
  at: string;
};

export type Progress = {
  v: 1;
  lessons: Record<string, LessonProgress>;
  cards: Record<string, SrsState>;
  history: Attempt[];
  streak: number;
  dailyGoal: number;
  lastActive: string;
};

export interface ProgressStore {
  load(): Progress;
  save(progress: Progress): boolean;
}

export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export { createEmptyProgress, createLocalStorageStore, isProgress } from "./localStorageStore";
