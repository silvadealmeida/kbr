import Link from "next/link";
export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  const v = variant === "primary" ? "bg-brand text-brand-fg" : "border border-border text-fg hover:bg-soft";
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 font-semibold ${v}`}>{children}</Link>;
}
