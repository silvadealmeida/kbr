"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  clearAuthNextCookie,
  decodeNextCookie,
  readAuthNextCookie,
} from "@/lib/auth/next-cookie";
import { postLoginPath } from "@/lib/auth/redirect";

/**
 * Cobre o retorno do OAuth direto para `/` (quando o Supabase usa a Site URL):
 * o cliente troca o `code` sozinho e, ao autenticar, retoma o destino guardado
 * sem deixar o usuário parado na landing.
 */
export function LandingRedirect({ next }: { next: string }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;
    const destination = postLoginPath(decodeNextCookie(readAuthNextCookie()), next);
    clearAuthNextCookie();
    router.replace(destination);
  }, [next, router, status]);

  return null;
}
