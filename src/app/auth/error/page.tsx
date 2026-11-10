import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AuthErrorPage() {
  return (
    <>
      <PageHeader title="Não foi possível entrar" subtitle="A sessão do Google não foi criada." />
      <Card>
        <p className="text-muted">Verifique sua conexão e tente novamente.</p>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
        >
          Voltar ao início
        </Link>
      </Card>
    </>
  );
}
