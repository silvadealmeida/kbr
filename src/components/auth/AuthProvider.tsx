"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { AuthStatus } from "@/lib/auth/access";
import { clearAuthNextCookie, writeAuthNextCookie } from "@/lib/auth/next-cookie";
import { oauthCallbackPath } from "@/lib/auth/redirect";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  createLocalStorageStore,
  createSupabaseProgressStore,
  createSyncedProgressStore,
  progressStorageKeyForUser,
  syncProgressForUser,
  type ProgressStore,
  type ProgressSyncErrorKind,
  type SyncStatus,
} from "@/lib/storage";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  syncStatus: SyncStatus;
  syncErrorKind: ProgressSyncErrorKind | null;
  /** `false` apenas quando o navegador informa perda de conectividade. */
  isOnline: boolean;
  /** O usuário pediu para sair; evita anunciar “sessão expirada”. */
  signedOut: boolean;
  progressStore: ProgressStore | null;
  signInWithGoogle(next?: string): Promise<string | null>;
  signOut(): Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [syncErrorKind, setSyncErrorKind] = useState<ProgressSyncErrorKind | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [signedOut, setSignedOut] = useState(false);
  const [progressStore, setProgressStore] = useState<ProgressStore | null>(null);
  const progressStoreRef = useRef<ProgressStore | null>(null);
  const syncStatusRef = useRef<SyncStatus>("idle");
  const wasOnlineRef = useRef(true);

  useEffect(() => {
    progressStoreRef.current = progressStore;
  }, [progressStore]);

  useEffect(() => {
    syncStatusRef.current = syncStatus;
  }, [syncStatus]);

  // O navegador é a única fonte confiável para “sem conexão”; falhas de RPC
  // continuam sendo tratadas pelo store e podem ocorrer com rede nominal.
  useEffect(() => {
    const update = () => setIsOnline(window.navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Ao reconectar, relê/mescla o snapshot local com o remoto para escoar
  // gravações pendentes sem exigir que o usuário recarregue a página.
  useEffect(() => {
    const wasOnline = wasOnlineRef.current;
    wasOnlineRef.current = isOnline;
    if (!isOnline || wasOnline) return;
    if (syncStatusRef.current !== "offline") return;

    const store = progressStoreRef.current;
    if (!store) return;
    void store.load().catch(() => {
      // O store publica `offline` novamente; nada a fazer aqui.
    });
  }, [isOnline]);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    void getBrowserSupabaseClient().then((supabase) => {
      if (!active) return;
      if (!supabase) {
        setStatus("unavailable");
        return;
      }

      void supabase.auth.getUser().then(({ data }) => {
        if (!active) return;
        setUser(data.user);
        setStatus(data.user ? "authenticated" : "guest");
        if (data.user) setSignedOut(false);
      });
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setStatus(session?.user ? "authenticated" : "guest");
        if (session?.user) setSignedOut(false);
      });
      unsubscribe = () => data.subscription.unsubscribe();
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    let active = true;
    void getBrowserSupabaseClient().then((supabase) => {
      if (!active) return;
      if (!user || !supabase) {
        setProgressStore(createLocalStorageStore(window.localStorage));
        setSyncStatus("idle");
        setSyncErrorKind(null);
        return;
      }

      const local = createLocalStorageStore(
        window.localStorage,
        () => new Date(),
        progressStorageKeyForUser(user.id),
      );
      const remote = createSupabaseProgressStore(supabase, user.id, {
        onMerged: async (merged) => {
          await local.save(merged);
        },
        onError: (kind) => {
          if (!active) return;
          setSyncErrorKind(kind);
          // Sem PII: apenas a categoria do erro.
          console.warn("[kbr] falha de sincronização:", kind);
        },
      });
      setProgressStore(null);
      setSyncStatus("syncing");
      setSyncErrorKind(null);
      void syncProgressForUser(supabase, window.localStorage, user.id).then((result) => {
        if (active) {
          setProgressStore(createSyncedProgressStore(local, remote, (nextStatus) => {
            if (!active) return;
            setSyncStatus(nextStatus);
            if (nextStatus === "synced") setSyncErrorKind(null);
          }));
          setSyncStatus(result.status);
          setSyncErrorKind(result.errorKind);
        }
      });
    });

    return () => {
      active = false;
    };
  }, [status, user?.id]);

  const signInWithGoogle = useCallback(async (next?: string) => {
    const supabase = await getBrowserSupabaseClient();
    if (!supabase) return "Login não configurado.";

    writeAuthNextCookie(next ?? null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${oauthCallbackPath()}` },
    });
    if (error) clearAuthNextCookie();
    return error?.message ?? null;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = await getBrowserSupabaseClient();
    if (!supabase) return "Login não configurado.";

    // Marca a intenção antes do evento de sessão para que a UI não trate uma
    // saída deliberada como sessão expirada.
    setSignedOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setSignedOut(false);
      return error.message;
    }
    return null;
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      syncStatus,
      syncErrorKind,
      isOnline,
      signedOut,
      progressStore,
      signInWithGoogle,
      signOut,
    }),
    [
      user,
      status,
      syncStatus,
      syncErrorKind,
      isOnline,
      signedOut,
      progressStore,
      signInWithGoogle,
      signOut,
    ],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return value;
}
