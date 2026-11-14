import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal / Impressum",
  description:
    "Informações públicas do KBR, canal de contato e créditos de terceiros.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
        Informações legais
      </p>
      <h1 className="mt-3 break-words text-4xl font-bold tracking-tight sm:text-5xl">
        Aviso legal / Impressum
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Esta página reúne as informações públicas do projeto e o canal de contato publicado.
      </p>

      <div className="mt-8 rounded-[var(--radius-plate)] border border-line bg-surface p-5 text-sm leading-relaxed">
        <p className="font-semibold">Informações disponíveis e limites declarados</p>
        <p className="mt-2 text-muted">
          O projeto não publica intencionalmente nome civil, endereço postal ou e-mail de contato.
          Não inventamos esses dados nem os substituímos por placeholders. Esta é uma política
          operacional aceita pelo responsável, não um parecer jurídico profissional e não uma
          alegação de isenção ou conformidade legal certificada.
        </p>
      </div>

      <section aria-labelledby="provedor" className="mt-10 border-t border-line pt-8">
        <h2 id="provedor" className="text-2xl font-bold tracking-tight">
          Identificação do provedor
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          Regras como o § 5º da lei alemã DDG e o § 18, § 2º da MStV podem ser relevantes conforme
          a operação do serviço. O KBR não afirma uma conclusão profissional sobre a aplicação
          dessas regras. O responsável aceita esse limite como risco residual do produto, sem
          bloquear o release.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          O único canal de contato publicado é a página pública do repositório{" "}
          <a href="https://github.com/silvadealmeida/kbr" className="text-accent underline underline-offset-2" rel="noreferrer">
            silvadealmeida/kbr no GitHub
          </a>
          . Não publique dados pessoais ou detalhes da conta nesse canal. No momento não há e-mail
          nem outro canal privado publicado; use o repositório apenas para pedir um meio privado de
          contato.
        </p>
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
            O responsável pelo projeto aceita esta política operacional e os limites publicados.
            A página não afirma que um advogado a revisou, que os requisitos legais foram
            certificados ou que o projeto está dispensado de qualquer obrigação.
          </p>
          <p>
            A política de privacidade descreve os dados tratados e o mesmo canal público, sem
            inventar dados civis ou e-mail: consulte a página de{" "}
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
            O conteúdo coreano do KBR é original e passou por revisão editorial final assistida
            por IA, aceita pelo responsável pelo projeto. Não houve revisão por falante nativo. O
            material tem finalidade educacional e não substitui aulas, certificações ou orientação
            profissional; riscos residuais de qualidade são aceitos e não bloqueiam o release.
          </p>
          <p>
            Links externos são oferecidos apenas como referência. Não controlamos o conteúdo de
            sites de terceiros e não assumimos responsabilidade por eles.
          </p>
        </div>
      </section>

      <section aria-labelledby="creditos" className="mt-10 border-t border-line pt-8">
        <h2 id="creditos" className="text-2xl font-bold tracking-tight">
          Créditos de terceiros
        </h2>
        <div className="mt-4 space-y-3 leading-relaxed text-muted">
          <p>
            O áudio do KBR é síntese neural gerada com ferramentas e modelos abertos. O
            crédito abaixo é parte do uso:
          </p>
          <ul className="space-y-3 break-words">
            <li>
              <strong className="text-fg">MeloTTS</strong> e o modelo{" "}
              <strong className="text-fg">MeloTTS-Korean</strong>, de MyShell AI — licença MIT{" "}
              <a
                href="https://github.com/myshell-ai/MeloTTS"
                className="break-all text-accent underline underline-offset-2"
                rel="noreferrer"
              >
                github.com/myshell-ai/MeloTTS
              </a>
              ; modelo MeloTTS-Korean: <a href="https://huggingface.co/myshell-ai/MeloTTS-Korean" className="break-all text-accent underline underline-offset-2" rel="noreferrer">huggingface.co/myshell-ai/MeloTTS-Korean</a>.
            </li>
            <li>
              <strong className="text-fg">LMkor / kykim/bert-kor-base</strong>, de Kiyoung Kim
              — encoder usado na geração dos fonemas. Crédito ao autor e ao repositório{" "}
              <a
                href="https://github.com/kiyoungkim1/LMkor"
                className="break-all text-accent underline underline-offset-2"
                rel="noreferrer"
              >
                github.com/kiyoungkim1/LMkor
              </a>
              , conforme orientação do autor.
            </li>
            <li>
              <strong className="text-fg">FFmpeg / libmp3lame</strong> — codificação dos arquivos
              MP3 (
              <a
                href="https://ffmpeg.org"
                className="break-all text-accent underline underline-offset-2"
                rel="noreferrer"
              >
                ffmpeg.org
              </a>
              ).
            </li>
          </ul>
          <p className="break-words text-sm">
            O áudio está resolvido com créditos e é servido por padrão: 7.790 MP3 cobrem Hangul,
            A1, A2, B1, B2, C1, C2 e vocabulário; `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é apenas kill
            switch. É síntese, não gravação nativa, e não avalia pronúncia. A lista completa, com
            revisões fixadas e hashes, está em{" "}
            <code className="break-all text-xs">docs/audio/credits.md</code> no repositório.
          </p>
        </div>
      </section>

      <p className="mt-10 text-sm">
        <Link href="/" className="inline-flex min-h-11 items-center text-accent underline underline-offset-2">
          ← Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}
