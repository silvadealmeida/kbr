import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { loginRedirectPath, postLoginPath } from "@/lib/auth/redirect";
import { isProtectedPath } from "@/lib/routes";
import { getSupabasePublicConfig } from "./config";

function redirect(request: NextRequest, path: string, response?: NextResponse) {
  const target = NextResponse.redirect(new URL(path, request.url));
  // Preserva cookies renovados por `getClaims()` (rotação de sessão).
  response?.cookies.getAll().forEach((cookie) => target.cookies.set(cookie));
  return target;
}

function redirectToLogin(
  request: NextRequest,
  response: NextResponse | undefined,
  reason?: "sessao-expirada" | "indisponivel",
) {
  const path = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return redirect(request, loginRedirectPath(path, reason), response);
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
      ? redirectToLogin(request, undefined, "indisponivel")
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
  const authenticated = !error && Boolean(data?.claims);

  if (authenticated && request.nextUrl.pathname === "/") {
    // Login concluído ou visita autenticada: a landing nunca fica como destino.
    const next = postLoginPath(request.nextUrl.searchParams.get("next"));
    return redirect(request, next, response);
  }

  if (!authenticated && isProtectedPath(request.nextUrl.pathname)) {
    return redirectToLogin(
      request,
      response,
      hadSessionCookie(request) ? "sessao-expirada" : undefined,
    );
  }
  return response;
}
