"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { protectedView } from "@/lib/auth/access";
import { loginRedirectPath } from "@/lib/auth/redirect";
import { useAuth } from "./AuthProvider";

function GateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 text-center">
        <p lang="ko" aria-hidden className="font-ko text-3xl font-bold text-accent">
          잠시만요
        </p>
        <h1 className="mt-2 text-xl font-semibold">{title}</h1>
        <div className="mt-2 text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}

/**
 * Camada de cliente para sessão expirada depois do carregamento inicial.
 * O layout do servidor já bloqueia quem chega sem sessão; aqui nunca
 * renderizamos conteúdo para visitantes (`guest`).
 */
export function ProtectedArea({ children }: { children: React.ReactNode }) {
  const { status, signedOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const view = protectedView(status);

  useEffect(() => {
    if (view !== "redirect") return;
    const target = loginRedirectPath(
      `${pathname}${window.location.search}`,
      signedOut ? "logout" : "sessao-expirada",
    );
    router.replace(target);
  }, [view, pathname, router, signedOut]);

  if (view === "content") return <>{children}</>;

  if (view === "unavailable") {
    return (
      <GateCard title="Não foi possível verificar sua conta">
        <p>O serviço de login está indisponível agora. Tente novamente em instantes.</p>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-line px-5 font-semibold text-fg hover:bg-surface-2"
        >
          Voltar à página inicial
        </Link>
      </GateCard>
    );
  }

  return (
    <GateCard title="Sua sessão expirou">
      <p aria-live="polite">Redirecionando para você entrar novamente…</p>
    </GateCard>
  );
}
