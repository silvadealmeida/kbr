import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Não foi possível entrar" };

export default function AuthErrorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <PageHeader
        title="Não foi possível entrar"
        subtitle="A sessão do Google não foi criada."
      />
      <Card>
        <p className="text-muted">
          Verifique sua conexão, permita cookies necessários e tente novamente. Se o problema
          continuar, volte à página inicial e tente entrar mais tarde.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/?next=/dashboard"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 font-semibold text-brand-fg"
          >
            Tentar entrar novamente
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 font-semibold hover:bg-soft"
          >
            Voltar ao início
          </Link>
        </div>
      </Card>
      <p className="mt-6 text-sm text-muted">
        O login e o progresso sincronizado dependem dos cookies necessários descritos na{" "}
        <Link href="/privacidade" className="text-brand underline underline-offset-2">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
