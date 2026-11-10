import Link from "next/link";

const learnLinks = [
  { href: "/dashboard", label: "Painel" },
  { href: "/hangul", label: "Hangul" },
  { href: "/vocabulario", label: "Vocabulário" },
  { href: "/licoes", label: "Lições" },
  { href: "/revisao", label: "Revisão" },
];

const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/impressum", label: "Aviso legal / Impressum" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              lang="ko"
              aria-hidden
              className="flex size-10 items-center justify-center rounded-xl bg-brand font-ko text-xl font-bold text-brand-fg"
            >
              한
            </span>
            <span className="text-lg font-bold tracking-tight">KBR</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Coreano para quem fala português. Hangul, vocabulário em contexto, diálogos
            progressivos e revisão espaçada.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-soft px-3 py-1 text-xs font-semibold text-brand">
            Projeto em desenvolvimento
          </p>
        </div>

        <nav aria-label="Aprender" className="text-sm">
          <h2 className="mb-3 font-semibold">Aprender</h2>
          <ul className="space-y-1">
            {learnLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center text-muted hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Transparência" className="text-sm">
          <h2 className="mb-3 font-semibold">Transparência</h2>
          <ul className="space-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center text-muted hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Sem anúncios e sem rastreadores de terceiros. Conteúdo coreano em revisão.
          </p>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © 2026 KBR. Feito para aprender coreano em português.
        </p>
      </div>
    </footer>
  );
}
