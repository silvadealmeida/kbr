import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LandingAuth } from "./LandingAuth";

const nav = [
  { href: "/#metodo", label: "Método" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/privacidade", label: "Privacidade" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm">
      <div className="mx-auto flex min-h-18 max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-1.5 sm:px-8">
        <Link href="/" aria-label="KBR, página inicial" className="inline-flex min-h-12 items-center gap-3">
          <span aria-hidden className="flex size-9 items-center justify-center border border-fg text-xl font-bold leading-none">K</span>
          <span className="text-xl font-bold tracking-[-.05em]">KBR</span>
        </Link>
        <nav aria-label="Site" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-12 items-center px-4 text-sm font-medium text-muted hover:text-accent">{item.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1"><ThemeToggle /><LandingAuth variant="header" /></div>
      </div>
      <nav aria-label="Site móvel" className="flex flex-wrap items-center justify-around border-t border-line md:hidden">
        {nav.map((item) => <Link key={item.href} href={item.href} className="flex min-h-11 flex-1 items-center justify-center px-2 text-center text-sm font-medium text-muted hover:bg-surface-2 hover:text-accent">{item.label}</Link>)}
      </nav>
    </header>
  );
}
