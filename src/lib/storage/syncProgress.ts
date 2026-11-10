import type { SupabaseClient } from "@supabase/supabase-js";
import {
  PROGRESS_STORAGE_KEY,
  progressStorageKeyForUser,
  type Progress,
  type StorageLike,
} from "./index";
import { createLocalStorageStore } from "./localStorageStore";
import { mergeProgress } from "./mergeProgress";
import { createSupabaseProgressStore } from "./supabaseProgressStore";

export type SyncStatus = "idle" | "syncing" | "synced" | "offline";
export type SyncResult = { progress: Progress; status: "synced" | "offline"; migratedGuest: boolean };

const activeSyncs = new Map<string, Promise<SyncResult>>();
const migrationKey = (userId: string) => `kbr:migrated:${userId}:v1`;

function readMarker(storage: StorageLike, key: string) {
  try { return storage.getItem(key); } catch { return null; }
}

function writeMarker(storage: StorageLike, key: string, value: string) {
  try { storage.setItem(key, value); } catch { /* O remoto já confirmou; o próximo login repetirá um merge idempotente. */ }
}

function hasLearningData(progress: Progress) {
  return Object.keys(progress.lessons).length > 0 ||
    Object.keys(progress.cards).length > 0 ||
    progress.history.length > 0 ||
    progress.streak > 0;
}

export function syncProgressForUser(
  supabase: SupabaseClient,
  storage: StorageLike,
  userId: string,
  now: () => Date = () => new Date(),
): Promise<SyncResult> {
  const existing = activeSyncs.get(userId);
  if (existing) return existing;

  const operation: Promise<SyncResult> = (async (): Promise<SyncResult> => {
    const guestStore = createLocalStorageStore(storage, now, PROGRESS_STORAGE_KEY);
    const accountStore = createLocalStorageStore(storage, now, progressStorageKeyForUser(userId));
    const remoteStore = createSupabaseProgressStore(supabase, userId, { now });
    const [guest, account] = await Promise.all([guestStore.load(), accountStore.load()]);
    const guestSnapshot = JSON.stringify(guest);
    const shouldMigrateGuest = hasLearningData(guest) &&
      readMarker(storage, migrationKey(userId)) !== guestSnapshot;
    const local = shouldMigrateGuest ? mergeProgress(account, guest) : account;

    let remote: Progress;
    try {
      remote = await remoteStore.load();
    } catch {
      await accountStore.save(local);
      return { progress: local, status: "offline", migratedGuest: false };
    }

    const merged = mergeProgress(local, remote);
    await accountStore.save(merged);

    let savedRemotely = false;
    try {
      savedRemotely = await remoteStore.save(merged);
    } catch {
      savedRemotely = false;
    }
    if (!savedRemotely) return { progress: merged, status: "offline", migratedGuest: false };

    if (shouldMigrateGuest) writeMarker(storage, migrationKey(userId), guestSnapshot);
    return { progress: merged, status: "synced", migratedGuest: shouldMigrateGuest };
  })().finally(() => activeSyncs.delete(userId));

  activeSyncs.set(userId, operation);
  return operation;
}
