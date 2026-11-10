import type { SupabaseClient } from "@supabase/supabase-js";
import { isProgress, type Progress } from "@/lib/storage";

export type FakeCasRpcParams = {
  p_expected_user_id: string;
  p_expected_sync_id: string | null;
  p_progress: unknown;
};

export type FakeCasFailure = {
  kind: "network" | "auth" | "validation";
  code?: string;
  status?: number;
  message?: string;
};

type FakeRow = {
  progress: Progress;
  syncId: string;
  updatedAt: string;
};

type RpcCall = {
  userId: string;
  params: FakeCasRpcParams;
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

function uuidFromCounter(counter: number): string {
  const tail = String(counter).padStart(12, "0");
  return `00000000-0000-4000-8000-${tail}`;
}

function errorFor(failure: FakeCasFailure) {
  if (failure.kind === "auth") {
    return {
      code: failure.code ?? "42501",
      message: failure.message ?? "not authenticated",
      status: failure.status,
    };
  }
  if (failure.kind === "validation") {
    return {
      code: failure.code ?? "22023",
      message: failure.message ?? "invalid progress payload",
      status: failure.status ?? 400,
    };
  }
  return {
    code: failure.code,
    message: failure.message ?? "fetch failed",
    status: failure.status,
  };
}

/**
 * Servidor CAS em memória que reproduz o contrato do RPC
 * `save_user_progress`. Não substitui um teste de PostgreSQL: serializa as
 * chamadas por usuário e valida token/autorização como o RPC real.
 */
export class FakeCasServer {
  readonly rows = new Map<string, FakeRow>();
  readonly rpcCalls: RpcCall[] = [];
  loadCalls = 0;

  /** Quando verdadeiro, toda chamada devolve conflito sem aplicar. */
  forceConflict = false;

  private uuidCounter = 0;
  private readonly queues = new Map<string, Promise<unknown>>();
  private loadFailures: FakeCasFailure[] = [];
  private rpcFailures: FakeCasFailure[] = [];
  private loseResponseAfterApply = false;
  private readonly now: () => Date;

  constructor(options: { now?: () => Date } = {}) {
    this.now = options.now ?? (() => new Date("2026-11-10T12:00:00.000Z"));
  }

  seed(userId: string, progress: Progress, syncId = this.nextUuid()): string {
    this.rows.set(userId, {
      progress: clone(progress),
      syncId,
      updatedAt: this.now().toISOString(),
    });
    return syncId;
  }

  row(userId: string): FakeRow | undefined {
    return this.rows.get(userId);
  }

  /** Escrita direta, equivalente a outro dispositivo/cliente antigo. */
  replace(userId: string, progress: Progress): string {
    return this.seed(userId, progress);
  }

  /** Falha a próxima leitura REST (GET da tabela). */
  failNext(failure: FakeCasFailure): void {
    this.loadFailures.push(failure);
  }

  /** Falha as próximas chamadas do RPC CAS. */
  failNextRpc(times: number, failure: FakeCasFailure = { kind: "network" }): void {
    for (let index = 0; index < times; index += 1) this.rpcFailures.push(failure);
  }

  loseNextResponseAfterApply(): void {
    this.loseResponseAfterApply = true;
  }

  client(userId: string): SupabaseClient {
    return {
      from: (table: string) => {
        if (table !== "user_progress") throw new Error(`Tabela inesperada: ${table}`);
        return {
          select: () => ({
            eq: (column: string, value: unknown) => ({
              maybeSingle: async () => {
                this.loadCalls += 1;
                const failure = this.loadFailures.shift();
                if (failure) return { data: null, error: errorFor(failure) };
                if (column !== "user_id" || value !== userId) {
                  // RLS: o cliente autenticado só enxerga a própria linha.
                  return { data: null, error: null };
                }
                const row = this.rows.get(userId);
                return {
                  data: row ? { progress: clone(row.progress), sync_id: row.syncId } : null,
                  error: null,
                };
              },
            }),
          }),
        };
      },
      rpc: (name: string, params: FakeCasRpcParams) => {
        if (name !== "save_user_progress") {
          return Promise.resolve({ data: null, error: { message: `RPC inesperado: ${name}` } });
        }
        return this.enqueue(userId, () => this.runRpc(userId, params));
      },
    } as unknown as SupabaseClient;
  }

  private enqueue<T>(userId: string, task: () => Promise<T>): Promise<T> {
    const previous = this.queues.get(userId) ?? Promise.resolve();
    const result = previous.then(task, task);
    this.queues.set(
      userId,
      result.then(
        () => undefined,
        () => undefined,
      ),
    );
    return result;
  }

  private async runRpc(userId: string, params: FakeCasRpcParams) {
    this.rpcCalls.push({ userId, params: clone(params) });

    const failure = this.rpcFailures.shift();
    if (failure) return { data: null, error: errorFor(failure) };

    if (params.p_expected_user_id !== userId) {
      return { data: null, error: errorFor({ kind: "auth" }) };
    }

    if (!isProgress(params.p_progress)) {
      return { data: null, error: errorFor({ kind: "validation" }) };
    }

    const current = this.rows.get(userId);
    const expected = params.p_expected_sync_id;

    if (expected === null) {
      if (!current) {
        const syncId = this.nextUuid();
        this.rows.set(userId, {
          progress: clone(params.p_progress),
          syncId,
          updatedAt: this.now().toISOString(),
        });
        return { data: [{ applied: true, progress: clone(params.p_progress), current_sync_id: syncId }], error: null };
      }
      return { data: [{ applied: false, progress: clone(current.progress), current_sync_id: current.syncId }], error: null };
    }

    if (!current) {
      return { data: [{ applied: false, progress: null, current_sync_id: null }], error: null };
    }

    if (this.forceConflict) {
      return {
        data: [{ applied: false, progress: clone(current.progress), current_sync_id: this.nextUuid() }],
        error: null,
      };
    }

    if (current.syncId !== expected) {
      return { data: [{ applied: false, progress: clone(current.progress), current_sync_id: current.syncId }], error: null };
    }

    const syncId = this.nextUuid();
    this.rows.set(userId, {
      progress: clone(params.p_progress),
      syncId,
      updatedAt: this.now().toISOString(),
    });

    if (this.loseResponseAfterApply) {
      this.loseResponseAfterApply = false;
      return { data: null, error: errorFor({ kind: "network", message: "fetch response lost" }) };
    }

    return { data: [{ applied: true, progress: clone(params.p_progress), current_sync_id: syncId }], error: null };
  }

  private nextUuid(): string {
    this.uuidCounter += 1;
    return uuidFromCounter(this.uuidCounter);
  }
}
