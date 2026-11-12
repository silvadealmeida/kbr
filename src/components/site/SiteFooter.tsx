import Link from "next/link";

const learnLinks = [
  { href: "/dashboard", label: "Painel" },
  { href: "/cursos", label: "Cursos" },
  { href: "/hangul", label: "Hangul" },
  { href: "/vocabulario", label: "Vocabulário" },
  { href: "/revisao", label: "Revisão" },
];
const legalLinks = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/impressum", label: "Aviso legal / Impressum" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 text-xl font-bold tracking-[-.05em]"><span aria-hidden className="flex size-9 items-center justify-center border border-fg">K</span>KBR</Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">Coreano para brasileiros. Comece pela escrita, pratique a leitura e volte ao que precisa de atenção.</p>
          <p className="mt-5 text-sm text-muted">Hangul disponível · A1 em desenvolvimento · A2–C2 planejados</p>
        </div>
        <nav aria-label="Aprender"><h2 className="font-semibold">Aprender</h2><ul className="mt-3">{learnLinks.map((item) => <li key={item.href}><Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent">{item.label}</Link></li>)}</ul></nav>
        <nav aria-label="Transparência"><h2 className="font-semibold">Transparência</h2><ul className="mt-3">{legalLinks.map((item) => <li key={item.href}><Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent">{item.label}</Link></li>)}</ul><p className="mt-5 text-sm leading-relaxed text-muted">Sem anúncios ou rastreadores de terceiros. Conteúdo coreano em revisão.</p></nav>
      </div>
      <p className="border-t border-line px-5 py-5 text-center text-xs text-muted">© 2026 KBR · Estude coreano em português</p>
    </footer>
  );
}
