"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { ThemeToggle } from "./ThemeToggle";
import { AuthControl } from "./auth/AuthControl";

export function Nav() {
  const path = usePathname();
  const active = (h: string) => path === h || path.startsWith(`${h}/`);
  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col gap-1 border-r border-border bg-surface p-4 md:flex">
        <div className="mb-4 flex items-center justify-between px-2">
          <span className="text-xl font-bold text-brand">KBR</span>
          <ThemeToggle />
        </div>
        <nav aria-label="Principal" className="flex flex-col gap-1">
          {ROUTES.map((r) => (
            <Link key={r.href} href={r.href} aria-current={active(r.href) ? "page" : undefined}
              className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-medium text-muted hover:bg-soft aria-[current=page]:bg-soft aria-[current=page]:text-brand">
              <span aria-hidden className="w-6 text-center font-ko">{r.icon}</span>{r.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-border pt-4">
          <AuthControl />
        </div>
      </aside>
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 pt-[env(safe-area-inset-top)] md:hidden">
        <span className="py-3 text-lg font-bold text-brand">KBR</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AuthControl compact />
        </div>
      </header>
      <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-5 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
        {ROUTES.map((r) => (
          <Link key={r.href} href={r.href} aria-current={active(r.href) ? "page" : undefined}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted aria-[current=page]:text-brand">
            <span aria-hidden className="font-ko text-lg leading-none">{r.icon}</span>{r.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
