"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  createLocalStorageStore,
  createSupabaseProgressStore,
  createSyncedProgressStore,
  progressStorageKeyForUser,
  syncProgressForUser,
  type ProgressStore,
  type SyncStatus,
} from "@/lib/storage";

type AuthStatus = "loading" | "guest" | "authenticated" | "unavailable";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  syncStatus: SyncStatus;
  progressStore: ProgressStore | null;
  signInWithGoogle(): Promise<string | null>;
  signOut(): Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [progressStore, setProgressStore] = useState<ProgressStore | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setStatus("unavailable");
      return;
    }

    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user);
      setStatus(data.user ? "authenticated" : "guest");
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setStatus(session?.user ? "authenticated" : "guest");
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    const supabase = getBrowserSupabaseClient();
    if (!user || !supabase) {
      setProgressStore(createLocalStorageStore(window.localStorage));
      setSyncStatus("idle");
      return;
    }

    const local = createLocalStorageStore(
      window.localStorage,
      () => new Date(),
      progressStorageKeyForUser(user.id),
    );
    const remote = createSupabaseProgressStore(supabase, user.id);
    setProgressStore(null);
    setSyncStatus("syncing");
    let active = true;
    void syncProgressForUser(supabase, window.localStorage, user.id).then((result) => {
      if (active) {
        setProgressStore(createSyncedProgressStore(local, remote, (nextStatus) => {
          if (active) setSyncStatus(nextStatus);
        }));
        setSyncStatus(result.status);
      }
    });

    return () => {
      active = false;
    };
  }, [status, user?.id]);

  const signInWithGoogle = useCallback(async () => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) return "Login não configurado.";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    return error?.message ?? null;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) return "Login não configurado.";

    const { error } = await supabase.auth.signOut();
    return error?.message ?? null;
  }, []);

  const value = useMemo(
    () => ({ user, status, syncStatus, progressStore, signInWithGoogle, signOut }),
    [user, status, syncStatus, progressStore, signInWithGoogle, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return value;
}
