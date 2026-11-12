import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal / Impressum",
  description:
    "Informações legais do KBR e pendências de identificação do provedor para o público na Alemanha.",
};

const pendingItems = [
  ["Nome ou razão social do provedor", "a confirmar"],
  ["Endereço postal completo (sem caixa postal)", "a confirmar"],
  ["E-mail e, se exigido, telefone de contato", "a confirmar"],
  ["Representante legal", "a confirmar"],
  ["Registro comercial, quando aplicável", "a confirmar"],
  ["Número de identificação fiscal (USt-IdNr.), quando aplicável", "a confirmar"],
  ["Responsável pelo conteúdo editorial (§ 18, § 2º MStV)", "a confirmar"],
];

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
        Informações legais
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Aviso legal / Impressum
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Esta página reúne as informações de identificação do provedor. Ela está em preparação e
        será concluída antes do lançamento público.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed">
        <p className="font-semibold">Documento incompleto — revisão jurídica pendente</p>
        <p className="mt-2 text-muted">
          Os campos abaixo não foram preenchidos porque os dados ainda não estão confirmados. Não
          inventamos nome, endereço, registro ou contato. Enquanto esta página estiver incompleta,
          o KBR não deve ser tratado como pronto para operação comercial pública na Alemanha.
        </p>
      </div>

      <section aria-labelledby="provedor" className="mt-10 border-t border-line pt-8">
        <h2 id="provedor" className="text-2xl font-bold tracking-tight">
          Identificação do provedor
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Informações exigidas pelo § 5º da Lei Alemã de Serviços Digitais (DDG), quando
          aplicável:
        </p>
        <dl className="mt-5 grid gap-3 rounded-2xl border border-line bg-surface p-5 text-sm">
          {pendingItems.map(([label, value]) => (
            <div key={label} className="grid gap-1 sm:grid-cols-[1.2fr_0.8fr] sm:gap-4">
              <dt className="font-semibold">{label}</dt>
              <dd>
                <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold text-accent">
                  {value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="avaliacao" className="mt-10 border-t border-line pt-8">
        <h2 id="avaliacao" className="text-2xl font-bold tracking-tight">
          Por que esta página existe
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted">
          <p>
            O KBR é um site público com contas de usuário. Na Alemanha, um Impressum pode ser
            exigido para serviços digitais oferecidos de forma empresarial, mesmo sem fins
            lucrativos. Sites estritamente privados podem estar dispensados, mas a avaliação
            depende de quem opera, de como o serviço é oferecido e de ele ter ou não caráter
            comercial.
          </p>
          <p>
            A avaliação jurídica ainda não foi concluída. Se for confirmada a exigência, esta
            página será completada com os dados de identificação e vinculada de forma permanente
            no rodapé de todas as páginas. Se a dispensa for confirmada, esta página será
            substituída por uma nota explicativa.
          </p>
          <p>
            Enquanto isso, o contato de privacidade e os demais dados do controlador também estão
            pendentes na{" "}
            <Link href="/privacidade" className="text-accent underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="conteudo" className="mt-10 border-t border-line pt-8">
        <h2 id="conteudo" className="text-2xl font-bold tracking-tight">
          Conteúdo e responsabilidade
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted">
          <p>
            O conteúdo coreano do KBR é original e está em revisão. O material tem finalidade
            educacional e não substitui aulas, certificações ou orientação profissional.
          </p>
          <p>
            Links externos são oferecidos apenas como referência. Não controlamos o conteúdo de
            sites de terceiros e não assumimos responsabilidade por eles.
          </p>
        </div>
      </section>

      <p className="mt-10 text-sm">
        <Link href="/" className="text-accent underline underline-offset-2">
          ← Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}
