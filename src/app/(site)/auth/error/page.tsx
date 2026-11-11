import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = { title: "Não foi possível entrar" };

export default function AuthErrorPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 pb-20 sm:px-8 sm:py-16">
      <PageHeader title="Não foi possível entrar" subtitle="A sessão do Google não foi criada." />
      <Card className="border-t-[3px] border-t-danger">
        <p className="max-w-[58ch] leading-relaxed text-muted">Verifique sua conexão, permita cookies necessários e tente novamente. Se o problema continuar, volte à página inicial e tente entrar mais tarde.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/?next=/dashboard">Tentar entrar novamente</ButtonLink>
          <ButtonLink href="/" variant="secondary">Voltar ao início</ButtonLink>
        </div>
      </Card>
      <p className="mt-6 text-sm text-muted">O login e o progresso sincronizado dependem dos cookies necessários descritos na <Link href="/privacidade" className="text-accent underline underline-offset-2">política de privacidade</Link>.</p>
    </div>
  );
}
