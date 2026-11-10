import type { Metadata } from "next";
import Link from "next/link";
import { AccountCard } from "@/components/auth/AccountCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Painel" };

const stats = [
  { label: "Sequência", hint: "dias seguidos" },
  { label: "Meta diária", hint: "revisões por dia" },
  { label: "Cartões para revisar", hint: "hoje" },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        ko="안녕하세요!"
        title="Seu painel"
        subtitle="Continue de onde parou. Seu progresso acompanha você."
      />

      <AccountCard />

      <Card className="mb-6 bg-soft">
        <h2 className="text-lg font-semibold">Comece pelo Hangul</h2>
        <p className="mb-4 mt-1 text-muted">
          O alfabeto coreano é o primeiro passo. A trilha de aprendizagem ainda está em
          desenvolvimento.
        </p>
        <ButtonLink href="/hangul">Abrir Hangul</ButtonLink>
      </Card>

      <section aria-labelledby="prog" className="mb-6">
        <h2 id="prog" className="mb-3 text-lg font-semibold">
          Seu progresso
        </h2>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="text-2xl font-bold" aria-label="sem dados ainda">
                —
              </p>
              <p className="text-xs text-muted">{stat.hint}</p>
            </Card>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">
          As estatísticas aparecerão aqui quando você começar a estudar.
        </p>
      </section>

      <section aria-labelledby="areas">
        <h2 id="areas" className="mb-3 text-lg font-semibold">
          Áreas
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ROUTES.filter((route) => route.href !== "/dashboard").map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-surface p-4 font-medium hover:bg-soft"
              >
                <span aria-hidden className="w-8 text-center font-ko text-xl text-brand">
                  {route.icon}
                </span>
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
