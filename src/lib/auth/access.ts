export type AuthStatus = "loading" | "guest" | "authenticated" | "unavailable";

/**
 * Decisão de renderização da área autenticada.
 * `loading` pode exibir o conteúdo porque o layout do servidor já validou a
 * sessão antes de entregar a página; `guest` nunca renderiza conteúdo.
 */
export type ProtectedView = "content" | "redirect" | "unavailable";

export function protectedView(status: AuthStatus): ProtectedView {
  switch (status) {
    case "authenticated":
    case "loading":
      return "content";
    case "guest":
      return "redirect";
    case "unavailable":
      return "unavailable";
  }
}
