import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { ROUTES } from "@/components/Nav";

const stats = ["Sequência", "Meta diária", "Cartões para revisar"];

export default function Dashboard() {
  return (
    <>
      <PageHeader ko="안녕하세요!" title="Bem-vindo ao KBR" subtitle="Coreano para brasileiros, em passos curtos." />
      <Card className="mb-6 bg-soft">
        <h2 className="text-lg font-semibold">Comece pelo Hangul</h2>
        <p className="mb-4 mt-1 text-muted">O alfabeto coreano é o primeiro passo. A trilha de aprendizado ainda está em desenvolvimento.</p>
        <ButtonLink href="/hangul">Ver Hangul</ButtonLink>
      </Card>
      <section aria-labelledby="prog" className="mb-6">
        <h2 id="prog" className="mb-3 text-lg font-semibold">Seu progresso</h2>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
          {stats.map((s) => (
            <Card key={s} className="p-4"><p className="text-sm text-muted">{s}</p><p className="text-2xl font-bold" aria-label="sem dados ainda">—</p></Card>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">As estatísticas aparecerão aqui quando você começar a estudar.</p>
      </section>
      <section aria-labelledby="areas">
        <h2 id="areas" className="mb-3 text-lg font-semibold">Áreas</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ROUTES.slice(1).map((r) => (
            <li key={r.href}><a href={r.href} className="flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-surface p-4 font-medium hover:bg-soft">
              <span aria-hidden className="w-8 text-center font-ko text-xl text-brand">{r.icon}</span>{r.label}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
