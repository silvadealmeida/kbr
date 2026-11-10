import { normalizeNextPath, postLoginPath } from "./redirect";

/**
 * Destino pós-login guardado por alguns minutos no navegador. O `redirectTo`
 * do OAuth não carrega query params (o Supabase pode recusá-los), então a
 * callback lê este cookie em vez de confiar apenas em `?next=`.
 */
export const AUTH_NEXT_COOKIE = "kbr_auth_next";
export const AUTH_NEXT_COOKIE_MAX_AGE = 600;

/** Valor do cookie com o destino já validado. */
export function nextCookieValue(next: string | null): string {
  return encodeURIComponent(postLoginPath(next));
}

/** Lê o destino do cookie; devolve `null` se estiver ausente ou adulterado. */
export function decodeNextCookie(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return normalizeNextPath(decodeURIComponent(value));
  } catch {
    return null;
  }
}

/** Destino da callback: `?next=` tem prioridade; o cookie cobre o OAuth sem query. */
export function callbackDestination(
  queryNext: string | null,
  cookieNext: string | null,
): string {
  return postLoginPath(queryNext, decodeNextCookie(cookieNext) ?? "/dashboard");
}

function cookieSuffix(): string {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  return `; Path=/; SameSite=Lax${secure}`;
}

export function writeAuthNextCookie(next: string | null): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_NEXT_COOKIE}=${nextCookieValue(next)}; Max-Age=${AUTH_NEXT_COOKIE_MAX_AGE}${cookieSuffix()}`;
}

export function readAuthNextCookie(): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${AUTH_NEXT_COOKIE}=`;
  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : null;
}

export function clearAuthNextCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_NEXT_COOKIE}=; Max-Age=0${cookieSuffix()}`;
}
