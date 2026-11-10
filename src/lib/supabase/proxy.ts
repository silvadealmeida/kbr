import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { loginRedirectPath } from "@/lib/auth/redirect";
import { isProtectedPath } from "@/lib/routes";
import { getSupabasePublicConfig } from "./config";

function redirectToLogin(request: NextRequest, reason?: "sessao-expirada" | "indisponivel") {
  const path = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return NextResponse.redirect(new URL(loginRedirectPath(path, reason), request.url));
}

function hadSessionCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some(
      ({ name }) =>
        name.startsWith("sb-") &&
        (name.endsWith("-auth-token") || /-auth-token\.\d+$/.test(name)),
    );
}

export async function updateSupabaseSession(request: NextRequest) {
  const config = getSupabasePublicConfig();
  if (!config) {
    // Sem configuração não há como autenticar: rotas privadas nunca são
    // renderizadas. A landing continua pública e explica o estado.
    return isProtectedPath(request.nextUrl.pathname)
      ? redirectToLogin(request, "indisponivel")
      : NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  if ((error || !data?.claims) && isProtectedPath(request.nextUrl.pathname)) {
    return redirectToLogin(request, hadSessionCookie(request) ? "sessao-expirada" : undefined);
  }
  return response;
}
