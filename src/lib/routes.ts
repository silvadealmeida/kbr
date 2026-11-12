export const ROUTES = [
  { href: "/dashboard", label: "Painel", icon: "⌂" },
  { href: "/cursos", label: "Cursos", icon: "◈" },
  { href: "/hangul", label: "Hangul", icon: "한" },
  { href: "/vocabulario", label: "Vocabulário", icon: "Aa" },
  { href: "/revisao", label: "Revisão", icon: "↻" },
];

/**
 * `/licoes` era o placeholder de lições. A rota continua protegida e
 * redireciona para o catálogo; não é mais um item da navegação principal.
 */
export const LEGACY_PROTECTED_PATHS = ["/licoes"];

/**
 * Recursos experimentais: protegidos, mas fora da navegação principal para não
 * interferir no fluxo do curso. A entrada é um link na página do Hangul.
 */
export const EXPERIMENTAL_PROTECTED_PATHS = ["/fala"];

/** Rotas que exigem sessão válida; a landing e as páginas legais são públicas. */
export const PROTECTED_PATHS = [
  ...ROUTES.map((route) => route.href),
  ...LEGACY_PROTECTED_PATHS,
  ...EXPERIMENTAL_PROTECTED_PATHS,
];

export function isProtectedPath(pathname: string): boolean {
  const path = pathname.split(/[?#]/, 1)[0] ?? pathname;
  return PROTECTED_PATHS.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`),
  );
}
