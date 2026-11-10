const SAFE_ORIGIN = "https://kbr.invalid";

function safeFallback(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")
    ? value
    : "/";
}

export function safeNextPath(value: string | null, fallback = "/"): string {
  const destination = safeFallback(fallback);
  if (typeof value !== "string" || !value.startsWith("/")) return destination;
  if (value.startsWith("//") || value.includes("\\")) return destination;
  // Controles são removidos pelo parser de URL e podem transformar "/\t/evil"
  // em um destino externo ("//evil"). Separadores percent-encoded também são
  // rejeitados por defesa em profundidade contra decodificação em outra camada.
  if (/[\u0000-\u001F\u007F]/.test(value) || /%(?:2f|5c)/i.test(value)) {
    return destination;
  }

  try {
    const url = new URL(value, SAFE_ORIGIN);
    if (url.origin !== SAFE_ORIGIN) return destination;
    const path = `${url.pathname}${url.search}${url.hash}`;
    return path.startsWith("/") && !path.startsWith("//") ? path : destination;
  } catch {
    return destination;
  }
}

export type LoginReason = "sessao-expirada" | "indisponivel";

/** Monta a URL pública de login preservando o destino interno (validado). */
export function loginRedirectPath(path: string, reason?: LoginReason): string {
  const next = safeNextPath(path);
  const params = new URLSearchParams();
  if (next !== "/") params.set("next", next);
  if (reason) params.set("motivo", reason);
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

/** Caminho da callback OAuth com o retorno seguro já validado. */
export function oauthCallbackPath(next: string | null): string {
  const destination = safeNextPath(next, "/dashboard");
  return `/auth/callback?next=${encodeURIComponent(destination)}`;
}
