"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { postLoginPath } from "@/lib/auth/redirect";
import { GoogleMark } from "./GoogleMark";

type Variant = "hero" | "header" | "footer";
const base = "inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-field)] font-semibold transition-[background-color,color,opacity] duration-[var(--motion-fast)] disabled:cursor-wait disabled:opacity-60";
const sizes: Record<Variant, string> = {
  hero: "min-h-13 w-full px-6 text-base sm:w-auto",
  header: "min-h-11 px-3 text-sm sm:px-4",
  footer: "min-h-12 w-full px-6 text-sm sm:w-auto",
};

export function LandingAuth({ variant = "hero" }: { variant?: Variant }) {
  const { status, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "authenticated") {
    return <Link href="/dashboard" className={`${base} ${sizes[variant]} bg-fg text-bg hover:opacity-90`}>{variant === "header" ? "Painel" : "Continuar no painel"}</Link>;
  }
  if (status === "loading") {
    return <span className={`${base} ${sizes[variant]} border border-line text-muted`} aria-live="polite">{variant === "header" ? "Aguarde…" : "Verificando conta…"}</span>;
  }
  const unavailable = status === "unavailable";
  async function signIn() {
    setBusy(true);
    setError(null);
    const fromUrl = new URLSearchParams(window.location.search).get("next");
    const message = await signInWithGoogle(postLoginPath(fromUrl));
    setError(message);
    setBusy(false);
  }
  return (
    <span className={`inline-flex flex-col items-stretch ${variant === "header" ? "" : "gap-2"}`}>
      <button type="button" disabled={busy || unavailable} aria-busy={busy || undefined} aria-label={variant === "header" ? unavailable ? "Login indisponível" : busy ? "Abrindo Google…" : "Entrar com Google" : undefined} onClick={() => void signIn()} title={unavailable ? "Login temporariamente indisponível" : undefined} className={`${base} ${sizes[variant]} bg-fg text-bg hover:opacity-90`}>
        {busy ? <span aria-hidden className="spinner size-4 rounded-full border-2 border-current border-t-transparent" /> : <GoogleMark />}
        {unavailable ? variant === "header" ? "Indisponível" : "Login indisponível" : busy ? variant === "header" ? "Abrindo…" : "Abrindo Google…" : variant === "header" ? "Entrar" : "Entrar com Google"}
      </button>
      {error ? <span role="alert" className="max-w-56 text-xs text-danger">{error}</span> : null}
    </span>
  );
}
