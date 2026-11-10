"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

export function AuthControl({ compact = false }: { compact?: boolean }) {
  const { user, status, signInWithGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<string | null>) {
    setBusy(true);
    setError(null);
    const message = await action();
    setError(message);
    setBusy(false);
  }

  if (status === "loading") {
    return <span className="text-sm text-muted">Verificando conta…</span>;
  }
  if (status === "unavailable") {
    return <span className="text-sm text-muted">Modo convidado</span>;
  }

  return (
    <div className={compact ? "flex items-center" : "space-y-2"}>
      {user && !compact ? (
        <p className="truncate text-xs text-muted" title={user.email}>
          {user.email}
        </p>
      ) : null}
      <button
        type="button"
        disabled={busy}
        onClick={() => void run(user ? signOut : signInWithGoogle)}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-3 text-sm font-semibold text-fg hover:bg-soft disabled:cursor-wait disabled:opacity-60"
        aria-label={user && compact ? "Sair da conta Google" : undefined}
      >
        {busy ? "Aguarde…" : user ? (compact ? "Sair" : "Sair da conta") : "Entrar com Google"}
      </button>
      {error ? <p role="alert" className="mt-1 max-w-48 text-xs text-red-700 dark:text-red-300">{error}</p> : null}
    </div>
  );
}
