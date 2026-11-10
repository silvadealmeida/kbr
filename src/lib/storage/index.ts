import type { SrsState } from "@/lib/srs";

export const PROGRESS_STORAGE_KEY = "kbr:v1";
export const progressStorageKeyForUser = (userId: string) => `kbr:user:${userId}:v1`;

export type LessonProgress = {
  done: boolean;
  score: number;
};

export type Attempt = {
  /** Identidade estável opcional; registros antigos usam a tupla como fallback. */
  id?: string;
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
  load(): Promise<Progress>;
  save(progress: Progress): Promise<boolean>;
}

export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export { createEmptyProgress, createLocalStorageStore, isProgress } from "./localStorageStore";
export {
  classifyProgressSyncError,
  createSupabaseProgressStore,
  type ProgressSyncErrorKind,
  type SupabaseProgressStore,
  type SupabaseProgressStoreOptions,
} from "./supabaseProgressStore";
export { createSyncedProgressStore } from "./syncedProgressStore";
export {
  canonicalHistory,
  compareCardStates,
  inferCardReviewedAt,
  mergeProgress,
  progressEquals,
} from "./mergeProgress";
export { syncProgressForUser, type SyncResult, type SyncStatus } from "./syncProgress";
