import type { Progress, ProgressStore } from "./index";
import { mergeProgress } from "./mergeProgress";

export function createSyncedProgressStore(
  local: ProgressStore,
  remote: ProgressStore,
): ProgressStore {
  let pendingLoad: Promise<Progress> | null = null;
  let writeQueue: Promise<boolean> = Promise.resolve(true);

  return {
    load() {
      if (pendingLoad) return pendingLoad;
      pendingLoad = (async () => {
        const localProgress = await local.load();
        try {
          const remoteProgress = await remote.load();
          const merged = mergeProgress(localProgress, remoteProgress);
          await local.save(merged);
          if (JSON.stringify(merged) !== JSON.stringify(remoteProgress)) {
            await remote.save(merged);
          }
          return merged;
        } catch {
          return localProgress;
        } finally {
          pendingLoad = null;
        }
      })();
      return pendingLoad;
    },

    save(progress) {
      writeQueue = writeQueue.then(async () => {
        const savedLocally = await local.save(progress);
        if (!savedLocally) return false;
        try {
          return await remote.save(progress);
        } catch {
          return false;
        }
      });
      return writeQueue;
    },
  };
}
