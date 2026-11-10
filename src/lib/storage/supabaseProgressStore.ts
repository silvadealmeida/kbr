import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createEmptyProgress,
  isProgress,
} from "./localStorageStore";
import type { ProgressStore } from "./index";

type Options = {
  now?: () => Date;
  syncId?: () => string;
};

export function createSupabaseProgressStore(
  supabase: SupabaseClient,
  userId: string,
  options: Options = {},
): ProgressStore {
  const now = options.now ?? (() => new Date());
  const syncId = options.syncId ?? (() => crypto.randomUUID());

  return {
    async load() {
      const { data, error } = await supabase
        .from("user_progress")
        .select("progress")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw new Error("Falha ao carregar progresso remoto", { cause: error });
      if (data === null) return createEmptyProgress(now());
      if (!isProgress(data.progress)) throw new Error("Progresso remoto inválido");
      return data.progress;
    },

    async save(progress) {
      if (!isProgress(progress)) return false;

      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          progress,
          sync_id: syncId(),
          updated_at: now().toISOString(),
        },
        { onConflict: "user_id" },
      );
      return error === null;
    },
  };
}
