export const ROUTES = [
  { href: "/dashboard", label: "Painel", icon: "⌂" },
  { href: "/hangul", label: "Hangul", icon: "한" },
  { href: "/vocabulario", label: "Vocabulário", icon: "Aa" },
  { href: "/licoes", label: "Lições", icon: "▤" },
  { href: "/revisao", label: "Revisão", icon: "↻" },
];

/** Rotas que exigem sessão válida; a landing e as páginas legais são públicas. */
export const PROTECTED_PATHS = ROUTES.map((route) => route.href);

export function isProtectedPath(pathname: string): boolean {
  const path = pathname.split(/[?#]/, 1)[0] ?? pathname;
  return PROTECTED_PATHS.some(
    (protectedPath) =>
      path === protectedPath || path.startsWith(`${protectedPath}/`),
  );
}
