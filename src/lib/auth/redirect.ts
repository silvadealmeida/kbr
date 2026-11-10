const SAFE_ORIGIN = "https://kbr.invalid";

function safeFallback(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")
    ? value
    : "/";
}

/** Normaliza um destino interno ou devolve `null` quando ele não é seguro. */
export function normalizeNextPath(value: string | null): string | null {
  if (typeof value !== "string" || !value.startsWith("/")) return null;
  if (value.startsWith("//") || value.includes("\\")) return null;
  // Controles são removidos pelo parser de URL e podem transformar "/\t/evil"
  // em um destino externo ("//evil"). Separadores percent-encoded também são
  // rejeitados por defesa em profundidade contra decodificação em outra camada.
  if (/[\u0000-\u001F\u007F]/.test(value) || /%(?:2f|5c)/i.test(value)) {
    return null;
  }

  try {
    const url = new URL(value, SAFE_ORIGIN);
    if (url.origin !== SAFE_ORIGIN) return null;
    const path = `${url.pathname}${url.search}${url.hash}`;
    return path.startsWith("/") && !path.startsWith("//") ? path : null;
  } catch {
    return null;
  }
}

export function safeNextPath(value: string | null, fallback = "/"): string {
  return normalizeNextPath(value) ?? safeFallback(fallback);
}

/**
 * Destino depois do login. A própria landing nunca é destino final: quem já
 * está autenticado segue para o painel ou para a rota profunda pedida.
 */
export function postLoginPath(value: string | null, fallback = "/dashboard"): string {
  const destination = safeNextPath(value, fallback);
  return destination.split(/[?#]/)[0] === "/" ? safeFallback(fallback) : destination;
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

/**
 * Caminho da callback OAuth. O destino viaja em um cookie de curta duração
 * (`kbr_auth_next`): o Supabase pode descartar query params do `redirectTo`
 * ao validar a lista de URLs permitidas, devolvendo o usuário para a landing.
 */
export function oauthCallbackPath(): string {
  return "/auth/callback";
}
