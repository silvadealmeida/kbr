import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LandingAuth } from "./LandingAuth";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-xl py-1" aria-label="KBR, página inicial">
          <span
            lang="ko"
            aria-hidden
            className="flex size-10 items-center justify-center rounded-xl bg-brand font-ko text-xl font-bold text-brand-fg"
          >
            한
          </span>
          <span className="text-lg font-bold tracking-tight">KBR</span>
        </Link>

        <nav aria-label="Site" className="hidden items-center gap-1 md:flex">
          <a
            href="/#metodo"
            className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-muted hover:bg-soft hover:text-fg"
          >
            Método
          </a>
          <a
            href="/#recursos"
            className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-muted hover:bg-soft hover:text-fg"
          >
            Recursos
          </a>
          <Link
            href="/privacidade"
            className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-muted hover:bg-soft hover:text-fg"
          >
            Privacidade
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LandingAuth variant="header" />
        </div>
      </div>
    </header>
  );
}
