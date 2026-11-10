const SAFE_ORIGIN = "https://kbr.invalid";

export function safeNextPath(value: string | null): string {
  if (typeof value !== "string" || !value.startsWith("/")) return "/";
  if (value.startsWith("//") || value.includes("\\")) return "/";
  // Controles são removidos pelo parser de URL e podem transformar "/\t/evil"
  // em um destino externo ("//evil"). Separadores percent-encoded também são
  // rejeitados por defesa em profundidade contra decodificação em outra camada.
  if (/[\u0000-\u001F\u007F]/.test(value) || /%(?:2f|5c)/i.test(value)) return "/";

  try {
    const url = new URL(value, SAFE_ORIGIN);
    if (url.origin !== SAFE_ORIGIN) return "/";
    const path = `${url.pathname}${url.search}${url.hash}`;
    return path.startsWith("/") && !path.startsWith("//") ? path : "/";
  } catch {
    return "/";
  }
}
