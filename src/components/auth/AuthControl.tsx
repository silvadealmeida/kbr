"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

export function AuthControl({ compact = false }: { compact?: boolean }) {
  const { user, status, syncStatus, signInWithGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<string | null>) {
    setBusy(true);
    setError(null);
    const message = await action();
    setError(message);
    setBusy(false);
  }
  if (status === "loading") return <span className="text-sm text-muted">Verificando conta…</span>;
  if (status === "unavailable") return <span className="text-sm text-muted">Modo convidado</span>;
  return (
    <div className={compact ? "flex items-center" : "space-y-3"}>
      {user && !compact ? <div className="border-l-2 border-seal pl-3"><p className="mono-label text-muted">Conta Google</p><p className="mt-2 truncate text-sm font-medium" title={user.email}>{user.email}</p><p className="mt-1 text-xs text-muted" aria-live="polite">{syncStatus === "syncing" ? "Sincronizando…" : syncStatus === "synced" ? "Progresso sincronizado" : syncStatus === "offline" ? "Salvo neste dispositivo" : ""}</p></div> : null}
      <button type="button" disabled={busy} aria-busy={busy || undefined} onClick={() => void run(user ? signOut : signInWithGoogle)} className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-field)] border border-line-strong px-3 text-sm font-semibold text-fg hover:bg-surface-2 disabled:cursor-wait disabled:opacity-60" aria-label={user && compact ? "Sair da conta Google" : undefined}>{busy ? "Aguarde…" : user ? (compact ? "Sair" : "Sair da conta") : "Entrar com Google"}</button>
      {error ? <p role="alert" className="mt-1 max-w-48 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
