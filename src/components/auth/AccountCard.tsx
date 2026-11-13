"use client";

import { Card } from "@/components/ui/Card";
import { useAuth } from "./AuthProvider";

const syncLabels = {
  idle: "Sem sincronização pendente",
  syncing: "Sincronizando…",
  synced: "Progresso sincronizado",
  offline: "Salvo neste dispositivo",
};

/**
 * Cartão informativo da conta. O botão de sair fica apenas na navegação
 * (header no mobile, menu lateral no desktop) para não duplicar a ação logo
 * na abertura do painel.
 */
export function AccountCard() {
  const { user, status, syncStatus } = useAuth();
  if (status === "loading") return <Card className="mb-6"><p className="text-sm text-muted" aria-live="polite">Verificando sua conta…</p></Card>;
  if (status !== "authenticated" || !user) return null;
  return (
    <Card className="mb-5 border-l-[3px] border-l-accent p-4 sm:p-5">
      <div className="min-w-0"><p className="mono-label text-muted">Conta Google</p><p className="mt-1 truncate font-medium" title={user.email}>{user.email}</p><p className="mt-0.5 text-sm text-muted" aria-live="polite">{syncLabels[syncStatus]}</p></div>
    </Card>
  );
}
