import type { Progress, ProgressStore } from "./index";
import { mergeProgress, progressEquals } from "./mergeProgress";
import type { SyncStatus } from "./syncProgress";

export type SyncStatusChange = Exclude<SyncStatus, "idle">;

/**
 * Store local-first com fila única: leitura e gravação nunca se cruzam na mesma
 * instância. O remoto confirma a escrita antes de o status virar `synced`.
 */
export function createSyncedProgressStore(
  local: ProgressStore,
  remote: ProgressStore,
  onStatusChange: (status: SyncStatusChange) => void = () => {},
): ProgressStore {
  let queue: Promise<unknown> = Promise.resolve();

  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const result = queue.then(task, task);
    queue = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }

  async function loadInternal(): Promise<Progress> {
    const localProgress = await local.load();
    onStatusChange("syncing");
    try {
      const remoteProgress = await remote.load();
      const merged = mergeProgress(localProgress, remoteProgress);
      await local.save(merged);
      if (!progressEquals(merged, remoteProgress)) {
        const savedRemotely = await remote.save(merged);
        if (!savedRemotely) {
          onStatusChange("offline");
          return merged;
        }
      }
      onStatusChange("synced");
      return merged;
    } catch {
      onStatusChange("offline");
      return localProgress;
    }
  }

  async function saveInternal(progress: Progress): Promise<boolean> {
    onStatusChange("syncing");
    try {
      const savedLocally = await local.save(progress);
      if (!savedLocally) {
        onStatusChange("offline");
        return false;
      }
      const savedRemotely = await remote.save(progress);
      onStatusChange(savedRemotely ? "synced" : "offline");
      return savedRemotely;
    } catch {
      onStatusChange("offline");
      return false;
    }
  }

  return {
    load() {
      return enqueue(loadInternal);
    },
    save(progress) {
      return enqueue(() => saveInternal(progress));
    },
  };
}
