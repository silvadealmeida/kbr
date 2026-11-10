"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { useAuth } from "./AuthProvider";

const syncLabels = {
  idle: "Sem sincronização pendente",
  syncing: "Sincronizando…",
  synced: "Progresso sincronizado",
  offline: "Salvo neste dispositivo",
};

export function AccountCard() {
  const { user, status, syncStatus, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") {
    return (
      <Card className="mb-6">
        <p className="text-sm text-muted" aria-live="polite">
          Verificando sua conta…
        </p>
      </Card>
    );
  }

  if (status !== "authenticated" || !user) return null;

  async function handleSignOut() {
    setBusy(true);
    setError(null);
    const message = await signOut();
    setError(message);
    setBusy(false);
  }

  return (
    <Card className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Conta Google
          </p>
          <p className="mt-1 truncate font-medium" title={user.email}>
            {user.email}
          </p>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {syncLabels[syncStatus]}
          </p>
          {error ? (
            <p role="alert" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => void handleSignOut()}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold hover:bg-soft disabled:cursor-wait disabled:opacity-60"
        >
          {busy ? "Saindo…" : "Sair da conta"}
        </button>
      </div>
    </Card>
  );
}
