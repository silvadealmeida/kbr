import type { SupabaseClient } from "@supabase/supabase-js";
import { createEmptyProgress, isProgress } from "./localStorageStore";
import { mergeProgress, progressEquals } from "./mergeProgress";
import type { Progress, ProgressStore } from "./index";

export type ProgressSyncErrorKind =
  | "network"
  | "auth"
  | "validation"
  | "invalid-remote"
  | "conflict"
  | "unexpected";

export type SupabaseProgressStoreOptions = {
  now?: () => Date;
  /** Total de tentativas CAS, incluindo a primeira. */
  retryLimit?: number;
  /** Tentativas adicionais para falhas transitórias de rede/servidor. */
  transientRetryLimit?: number;
  retryDelayMs?: readonly number[];
  sleep?: (milliseconds: number) => Promise<void>;
  onMerged?: (progress: Progress) => void | Promise<void>;
  onError?: (kind: ProgressSyncErrorKind, error?: unknown) => void;
};

export type SupabaseProgressStore = ProgressStore & {
  readonly lastMerged: Progress | null;
  readonly lastErrorKind: ProgressSyncErrorKind | null;
};

type RpcRow = {
  applied: boolean;
  progress: unknown;
  current_sync_id: unknown;
};

const DEFAULT_RETRY_DELAYS = [250, 750] as const;
const DEFAULT_RETRY_LIMIT = 3;
const DEFAULT_TRANSIENT_RETRY_LIMIT = 2;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function errorStatus(error: unknown): number | null {
  if (!isRecord(error)) return null;
  const status = error.status;
  return typeof status === "number" ? status : null;
}

function errorCode(error: unknown): string | null {
  if (!isRecord(error)) return null;
  return typeof error.code === "string" ? error.code : null;
}

function errorMessage(error: unknown): string {
  if (!isRecord(error)) return error instanceof Error ? error.message : String(error);
  return typeof error.message === "string" ? error.message : "";
}

/** Classifica o erro do PostgREST/Supabase sem expor o documento do usuário. */
export function classifyProgressSyncError(error: unknown): ProgressSyncErrorKind {
  const code = errorCode(error);
  const status = errorStatus(error);
  const message = errorMessage(error);

  if (
    code === "42501" ||
    code === "PGRST301" ||
    code === "PGRST302" ||
    status === 401 ||
    status === 403 ||
    /jwt|not authenticated|session|permission denied/i.test(message)
  ) {
    return "auth";
  }

  if (
    code?.startsWith("22") ||
    code === "23514" ||
    code === "23503" ||
    status === 400 ||
    status === 422
  ) {
    return "validation";
  }

  if (
    status === 408 ||
    status === 429 ||
    (status !== null && status >= 500) ||
    /fetch|network|timeout|connection|econn|enotfound/i.test(message)
  ) {
    return "network";
  }

  if (isRecord(error) && "cause" in error) {
    const causeKind = classifyProgressSyncError(error.cause);
    if (causeKind !== "unexpected") return causeKind;
  }

  return "unexpected";
}

function parseRpcRow(data: unknown): RpcRow | null {
  const candidate = Array.isArray(data) ? data[0] : data;
  if (!isRecord(candidate) || typeof candidate.applied !== "boolean") return null;
  return {
    applied: candidate.applied,
    progress: candidate.progress,
    current_sync_id: candidate.current_sync_id,
  };
}

/**
 * Store remoto com CAS transacional. O token `sync_id` nunca é escolhido pelo
 * cliente: ele é lido junto com o snapshot e devolvido ao RPC. Em conflito, o
 * cliente mescla o snapshot devolvido e tenta de novo com limite.
 */
export function createSupabaseProgressStore(
  supabase: SupabaseClient,
  userId: string,
  options: SupabaseProgressStoreOptions = {},
): SupabaseProgressStore {
  const now = options.now ?? (() => new Date());
  const retryLimit = Math.max(1, Math.floor(options.retryLimit ?? DEFAULT_RETRY_LIMIT));
  const transientRetryLimit = Math.max(
    0,
    Math.floor(options.transientRetryLimit ?? DEFAULT_TRANSIENT_RETRY_LIMIT),
  );
  const retryDelays = options.retryDelayMs ?? DEFAULT_RETRY_DELAYS;
  const sleep = options.sleep ?? ((milliseconds: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, milliseconds)));

  let token: string | null = null;
  let base: Progress | null = null;
  let initialized = false;
  let loading: Promise<void> | null = null;
  let queue: Promise<unknown> = Promise.resolve();
  let lastMerged: Progress | null = null;
  let lastErrorKind: ProgressSyncErrorKind | null = null;

  function reportError(kind: ProgressSyncErrorKind, error?: unknown) {
    lastErrorKind = kind;
    options.onError?.(kind, error);
  }

  function clearError() {
    lastErrorKind = null;
  }

  function delayFor(attempt: number): number {
    if (retryDelays.length === 0) return 0;
    return retryDelays[Math.min(attempt - 1, retryDelays.length - 1)];
  }

  async function loadInternal(): Promise<Progress> {
    const { data, error } = await supabase
      .from("user_progress")
      .select("progress, sync_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw new Error("Falha ao carregar progresso remoto", { cause: error });
    }

    if (data === null) {
      base = null;
      token = null;
      initialized = true;
      clearError();
      return createEmptyProgress(now());
    }

    if (!isRecord(data) || !isProgress(data.progress) || !isUuid(data.sync_id)) {
      reportError("invalid-remote");
      throw new Error("Progresso remoto inválido");
    }

    base = data.progress;
    token = data.sync_id;
    initialized = true;
    clearError();
    return data.progress;
  }

  async function ensureLoaded(): Promise<void> {
    if (initialized) return;
    if (loading) return loading;
    loading = loadInternal()
      .then(() => undefined)
      .finally(() => {
        loading = null;
      });
    return loading;
  }

  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const result = queue.then(task, task);
    queue = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }

  async function notifyMerged(progress: Progress) {
    lastMerged = progress;
    if (!options.onMerged) return;
    try {
      await options.onMerged(progress);
    } catch {
      // O remoto já confirmou; falhar o cache local não pode desfazer o sucesso.
    }
  }

  async function saveInternal(progress: Progress): Promise<boolean> {
    if (!isProgress(progress)) {
      reportError("validation");
      return false;
    }

    try {
      await ensureLoaded();
    } catch (error) {
      reportError(classifyProgressSyncError(error), error);
      return false;
    }

    const candidateBase = base ? mergeProgress(progress, base) : progress;
    let candidate = candidateBase;
    let conflicts = 0;
    let transientRetries = 0;

    while (true) {
      const { data, error } = await supabase.rpc("save_user_progress", {
        p_expected_user_id: userId,
        p_expected_sync_id: token,
        p_progress: candidate,
      });

      if (error) {
        const kind = classifyProgressSyncError(error);
        if (kind === "network" && transientRetries < transientRetryLimit) {
          transientRetries += 1;
          await sleep(delayFor(transientRetries));
          continue;
        }
        reportError(kind, error);
        return false;
      }

      const row = parseRpcRow(data);
      if (!row) {
        if (transientRetries < transientRetryLimit) {
          transientRetries += 1;
          await sleep(delayFor(transientRetries));
          continue;
        }
        reportError("unexpected");
        return false;
      }

      if (row.applied) {
        if (!isProgress(row.progress) || !isUuid(row.current_sync_id)) {
          reportError("invalid-remote");
          return false;
        }
        base = row.progress;
        token = row.current_sync_id;
        initialized = true;
        await notifyMerged(row.progress);
        clearError();
        return true;
      }

      conflicts += 1;

      if (row.progress === null) {
        // Linha removida externamente: reidrata como vazio e tenta a inserção.
        base = null;
        token = null;
        initialized = true;
        candidate = progress;
      } else {
        if (!isProgress(row.progress) || !isUuid(row.current_sync_id)) {
          reportError("invalid-remote");
          return false;
        }
        base = row.progress;
        token = row.current_sync_id;
        initialized = true;
        candidate = mergeProgress(candidate, row.progress);

        if (progressEquals(candidate, row.progress)) {
          // Response perdido depois de aplicar: o documento já é o candidato.
          await notifyMerged(row.progress);
          clearError();
          return true;
        }
      }

      if (conflicts >= retryLimit) {
        reportError("conflict");
        return false;
      }

      await sleep(delayFor(conflicts));
    }
  }

  return {
    load() {
      return enqueue(async () => {
        try {
          return await loadInternal();
        } catch (error) {
          reportError(classifyProgressSyncError(error), error);
          throw error;
        }
      });
    },
    save(progress) {
      return enqueue(() => saveInternal(progress));
    },
    get lastMerged() {
      return lastMerged;
    },
    get lastErrorKind() {
      return lastErrorKind;
    },
  };
}
