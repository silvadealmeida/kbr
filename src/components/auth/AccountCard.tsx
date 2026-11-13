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
  if (status === "loading") return <Card className="mb-6"><p className="text-sm text-muted" aria-live="polite">Verificando sua conta…</p></Card>;
  if (status !== "authenticated" || !user) return null;
  async function handleSignOut() {
    setBusy(true);
    setError(null);
    const message = await signOut();
    setError(message);
    setBusy(false);
  }
  return (
    <Card className="mb-5 border-l-[3px] border-l-accent p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1"><p className="mono-label text-muted">Conta Google</p><p className="mt-1 truncate font-medium" title={user.email}>{user.email}</p><p className="mt-0.5 text-sm text-muted" aria-live="polite">{syncLabels[syncStatus]}</p>{error ? <p role="alert" className="mt-1.5 text-sm text-danger">{error}</p> : null}</div>
        <button type="button" disabled={busy} aria-busy={busy || undefined} onClick={() => void handleSignOut()} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-4 text-sm font-semibold hover:bg-surface-2 disabled:cursor-wait disabled:opacity-60">{busy ? "Saindo…" : "Sair da conta"}</button>
      </div>
    </Card>
  );
}
