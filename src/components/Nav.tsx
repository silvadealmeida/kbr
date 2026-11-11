"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { ThemeToggle } from "./ThemeToggle";
import { AuthControl } from "./auth/AuthControl";

export function Nav() {
  const path = usePathname();
  const active = (href: string) => path === href || path.startsWith(`${href}/`);
  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line bg-surface px-4 py-5 md:flex">
        <div className="mb-9 flex items-center justify-between px-2">
          <Link href="/dashboard" className="inline-flex min-h-12 items-center gap-2.5 font-bold tracking-tight"><span aria-hidden className="flex size-8 items-center justify-center border border-fg text-lg">K</span>KBR</Link>
          <ThemeToggle />
        </div>
        <p className="mono-label mb-3 px-3 text-muted">Área de estudo</p>
        <nav aria-label="Principal" className="flex flex-col gap-1">
          {ROUTES.map((route) => <Link key={route.href} href={route.href} aria-current={active(route.href) ? "page" : undefined} className={`flex min-h-12 items-center gap-3 border-l-[3px] px-3 font-medium transition-colors duration-[var(--motion-fast)] ${active(route.href) ? "border-seal bg-surface-2 text-fg" : "border-transparent text-muted hover:bg-surface-2 hover:text-fg"}`}><span aria-hidden className="w-6 text-center font-ko">{route.icon}</span>{route.label}</Link>)}
        </nav>
        <div className="mt-auto border-t border-line pt-4"><AuthControl /></div>
      </aside>
      <header className="flex min-h-16 items-center justify-between border-b border-line bg-surface px-4 pt-[env(safe-area-inset-top)] md:hidden">
        <Link href="/dashboard" className="inline-flex min-h-11 items-center gap-2 text-lg font-bold"><span aria-hidden className="flex size-8 items-center justify-center border border-fg">K</span>KBR</Link>
        <div className="flex items-center gap-1"><ThemeToggle /><AuthControl compact /></div>
      </header>
      <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
        {ROUTES.map((route) => <Link key={route.href} href={route.href} aria-current={active(route.href) ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 border-t-[3px] px-1 text-[11px] font-medium leading-tight ${active(route.href) ? "border-seal text-fg" : "border-transparent text-muted"}`}><span aria-hidden className="font-ko text-lg leading-none">{route.icon}</span>{route.label}</Link>)}
      </nav>
    </>
  );
}
