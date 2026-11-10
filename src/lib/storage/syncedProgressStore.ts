import type { Progress, ProgressStore } from "./index";
import { mergeProgress } from "./mergeProgress";
import type { SyncStatus } from "./syncProgress";

export type SyncStatusChange = Exclude<SyncStatus, "idle">;

export function createSyncedProgressStore(
  local: ProgressStore,
  remote: ProgressStore,
  onStatusChange: (status: SyncStatusChange) => void = () => {},
): ProgressStore {
  let pendingLoad: Promise<Progress> | null = null;
  let writeQueue: Promise<boolean> = Promise.resolve(true);

  return {
    load() {
      if (pendingLoad) return pendingLoad;
      pendingLoad = (async () => {
        const localProgress = await local.load();
        onStatusChange("syncing");
        try {
          const remoteProgress = await remote.load();
          const merged = mergeProgress(localProgress, remoteProgress);
          await local.save(merged);
          if (JSON.stringify(merged) !== JSON.stringify(remoteProgress)) {
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
        } finally {
          pendingLoad = null;
        }
      })();
      return pendingLoad;
    },

    save(progress) {
      writeQueue = writeQueue.then(async () => {
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
      });
      return writeQueue;
    },
  };
}
