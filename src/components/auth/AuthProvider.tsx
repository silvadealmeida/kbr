"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
  const [progressStore, setProgressStore] = useState<ProgressStore | null>(null);

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
      });
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setStatus(session?.user ? "authenticated" : "guest");
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

    const { error } = await supabase.auth.signOut();
    return error?.message ?? null;
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      syncStatus,
      syncErrorKind,
      progressStore,
      signInWithGoogle,
      signOut,
    }),
    [user, status, syncStatus, syncErrorKind, progressStore, signInWithGoogle, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return value;
}
