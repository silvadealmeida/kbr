import Link from "next/link";
import type { ReactNode } from "react";

export function NavLink({
  href,
  active = false,
  children,
  className = "",
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-[var(--radius-field)] px-3 font-medium text-muted transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)] hover:bg-surface-2 hover:text-fg ${
        active ? "bg-surface-2 font-semibold text-accent" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function SkipLink({
  href = "#conteudo",
  children = "Pular para o conteúdo",
}: {
  href?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[var(--radius-field)] focus:bg-fg focus:px-4 focus:py-3 focus:font-semibold focus:text-bg"
    >
      {children}
    </a>
  );
}
