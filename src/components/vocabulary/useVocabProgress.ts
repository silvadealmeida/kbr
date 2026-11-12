"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Progress } from "@/lib/storage";

/**
 * Carrega o `Progress` v1 do mesmo store usado pelo restante do app (local ou
 * sincronizado) e aplica transformações puras, salvando a cada mudança. Só
 * cartões `v:` mudam; as demais chaves passam intactas pelo merge existente.
 */
export function useVocabProgress() {
  const { progressStore, status, syncStatus, user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [saveWarning, setSaveWarning] = useState(false);
  const ref = useRef<Progress | null>(null);

  useEffect(() => {
    if (!progressStore) return;
    let active = true;
    void progressStore
      .load()
      .then((loaded) => {
        if (!active) return;
        ref.current = loaded;
        setProgress(loaded);
      })
      .catch(() => active && setLoadError(true));
    return () => {
      active = false;
    };
  }, [progressStore]);

  const update = useCallback(
    (change: (current: Progress, now: Date) => Progress) => {
      if (!ref.current) return;
      const next = change(ref.current, new Date());
      if (next === ref.current) return;
      ref.current = next;
      setProgress(next);
      if (!progressStore) return setSaveWarning(true);
      void progressStore.save(next).then((ok) => setSaveWarning(!ok));
    },
    [progressStore],
  );

  // Mesma regra do ReviewArea: a sessão autenticada manda no texto de sincronização.
  const synced = Boolean(user) && syncStatus === "synced";
  const offline = syncStatus === "offline" || (saveWarning && !synced);
  const syncNote = offline
    ? "Salvo neste dispositivo. A sincronização com sua conta está pendente — nada foi perdido."
    : user && syncStatus === "syncing"
      ? "Sincronizando com sua conta…"
      : synced
        ? "Progresso sincronizado com sua conta."
        : null;

  return { progress, update, loading: status === "loading" || (!progress && !loadError), loadError, saveWarning, syncNote };
}
