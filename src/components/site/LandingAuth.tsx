"use client";

import Link from "next/link";
import { useState } from "react";
import { safeNextPath } from "@/lib/auth/redirect";
import { useAuth } from "@/components/auth/AuthProvider";
import { GoogleMark } from "./GoogleMark";

type Variant = "hero" | "header" | "footer";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors disabled:cursor-wait disabled:opacity-60";
const sizes: Record<Variant, string> = {
  hero: "min-h-13 w-full px-6 text-base sm:w-auto",
  header: "min-h-11 px-4 text-sm",
  footer: "min-h-12 w-full px-6 text-sm sm:w-auto",
};

export function LandingAuth({ variant = "hero" }: { variant?: Variant }) {
  const { status, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "authenticated") {
    return (
      <Link
        href="/dashboard"
        className={`${base} ${sizes[variant]} bg-brand text-brand-fg hover:opacity-90`}
      >
        {variant === "header" ? "Painel" : "Continuar no painel"}
        <span aria-hidden>→</span>
      </Link>
    );
  }

  if (status === "loading") {
    return (
      <span
        className={`${base} ${sizes[variant]} border border-border text-muted`}
        aria-live="polite"
      >
        Verificando conta…
      </span>
    );
  }

  const unavailable = status === "unavailable";

  async function signIn() {
    setBusy(true);
    setError(null);
    const fromUrl = new URLSearchParams(window.location.search).get("next");
    const message = await signInWithGoogle(safeNextPath(fromUrl, "/dashboard"));
    setError(message);
    setBusy(false);
  }

  return (
    <span className={`inline-flex flex-col items-stretch ${variant === "header" ? "" : "gap-2"}`}>
      <button
        type="button"
        disabled={busy || unavailable}
        onClick={() => void signIn()}
        title={unavailable ? "Login temporariamente indisponível" : undefined}
        className={`${base} ${sizes[variant]} bg-brand text-brand-fg hover:opacity-90`}
      >
        <GoogleMark />
        {unavailable ? "Login indisponível" : busy ? "Abrindo Google…" : "Entrar com Google"}
      </button>
      {error ? (
        <span role="alert" className="text-xs text-red-700 dark:text-red-300">
          {error}
        </span>
      ) : null}
    </span>
  );
}
