import type { Metadata } from "next";
import Link from "next/link";
import { LandingAuth } from "@/components/site/LandingAuth";
import { LandingRedirect } from "@/components/site/LandingRedirect";
import { postLoginPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Coreano para brasileiros",
  description:
    "Aprenda coreano em português, do Hangul às primeiras conversas, com vocabulário em contexto, diálogos progressivos e revisão espaçada.",
};

const features = [
  {
    glyph: "한",
    title: "Hangul sem decoreba",
    text: "Consoantes, vogais e sílabas montadas passo a passo, com o som aproximado em português.",
  },
  {
    glyph: "말",
    title: "Vocabulário em contexto",
    text: "Palavras e frases úteis desde o começo, com explicações pensadas para quem fala pt-BR.",
  },
  {
    glyph: "대",
    title: "Diálogos progressivos",
    text: "Situações reais em dificuldade crescente, para você entender e responder sem saltos.",
  },
  {
    glyph: "복",
    title: "Revisão no tempo certo",
    text: "Um sistema de repetição espaçada traz cada cartão de volta antes que ele seja esquecido.",
  },
];

const steps = [
  {
    number: "01",
    title: "Reconheça",
    text: "Comece pelo alfabeto: formas, sons e a lógica de composição das sílabas coreanas.",
  },
  {
    number: "02",
    title: "Use",
    text: "Aprenda palavras dentro de frases e diálogos que fazem sentido no dia a dia.",
  },
  {
    number: "03",
    title: "Retenha",
    text: "Revise no intervalo certo para transformar reconhecimento em memória de longo prazo.",
  },
];

const targetLabels: Record<string, string> = {
  "/dashboard": "o painel",
  "/hangul": "o Hangul",
  "/vocabulario": "o vocabulário",
  "/licoes": "as lições",
  "/revisao": "a revisão",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined) {
  return typeof value === "string" ? value : null;
}

export default async function LandingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const nextPath = postLoginPath(first(params.next));
  const reason = first(params.motivo);
  const target = targetLabels[nextPath.split("?")[0]] ?? "a página anterior";
  const continuing = nextPath !== "/dashboard";

  return (
    <>
      <LandingRedirect next={nextPath} />
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 78% 8%, var(--accent-soft), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
              <span lang="ko" aria-hidden className="font-ko text-sm text-brand">
                한국어
              </span>
              Coreano para quem fala português
            </p>

            <h1 className="mt-6 max-w-2xl text-[2.65rem] font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Coreano de verdade,{" "}
              <span className="text-brand">explicado em português.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Do Hangul às primeiras conversas: aprenda com contexto, diálogos progressivos e
              revisão espaçada — sem traduções automáticas esquisitas e sem decoreba solta.
            </p>

            {reason === "sessao-expirada" ? (
              <p
                role="status"
                className="mt-6 rounded-2xl border border-border bg-surface px-4 py-3 text-sm"
              >
                Sua sessão expirou. Entre novamente para continuar de onde parou.
              </p>
            ) : null}
            {reason === "indisponivel" ? (
              <p
                role="status"
                className="mt-6 rounded-2xl border border-border bg-surface px-4 py-3 text-sm"
              >
                O login está temporariamente indisponível. Tente novamente em instantes.
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LandingAuth variant="hero" />
              <a
                href="#metodo"
                className="inline-flex min-h-13 w-full items-center justify-center rounded-full border border-border bg-surface px-6 font-semibold text-fg hover:bg-soft sm:w-auto"
              >
                Conhecer o método
              </a>
            </div>

            {continuing ? (
              <p className="mt-3 text-sm text-muted">
                Depois de entrar, você volta para {target}.
              </p>
            ) : null}

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {["Hangul desde o início", "Vocabulário em contexto", "Revisão espaçada"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden className="text-brand">
                      ✓
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -left-3 top-16 -rotate-6 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm"
            >
              <p lang="ko" className="font-ko text-xl font-bold text-brand">
                한글
              </p>
              <p className="text-xs text-muted">Hangul</p>
            </div>

            <div className="relative rounded-[2rem] border border-border bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(28,27,26,0.55)] sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-brand">
                  Prévia de um cartão
                </span>
                <span className="text-xs text-muted">em revisão</span>
              </div>

              <p lang="ko" className="mt-8 font-ko text-5xl font-bold leading-none sm:text-6xl">
                안녕하세요
              </p>
              <p className="mt-3 text-sm tracking-wide text-muted">annyeonghaseyo</p>
              <p className="mt-4 text-lg font-medium">Olá — cumprimento formal e educado.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Usado com pessoas que você acabou de conhecer, professores e atendentes.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2 text-center text-sm">
                <span className="rounded-xl border border-border px-3 py-2">
                  <span lang="ko" className="font-ko font-bold text-brand">
                    ㅎ
                  </span>{" "}
                  consoante
                </span>
                <span className="rounded-xl border border-border px-3 py-2">
                  <span lang="ko" className="font-ko font-bold text-brand">
                    ㅏ
                  </span>{" "}
                  vogal
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Repetição espaçada
                </p>
                <p className="mt-1 text-sm">
                  O cartão volta na hora certa — nem cedo demais, nem tarde demais.
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -bottom-6 -right-2 rotate-6 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm"
            >
              <p lang="ko" className="font-ko text-xl font-bold text-brand">
                복습
              </p>
              <p className="text-xs text-muted">revisão</p>
            </div>

            <figcaption className="mt-10 text-center text-xs text-muted">
              Prévia ilustrativa do método — sem dados reais.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="recursos" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              O que você encontra
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Uma trilha pensada para quem começa do zero.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Cada parte tem um papel: entender a escrita, usar a língua e não esquecer o que
              aprendeu.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="rounded-3xl border border-border bg-surface p-6 sm:p-7"
              >
                <span
                  lang="ko"
                  aria-hidden
                  className="flex size-12 items-center justify-center rounded-2xl bg-soft font-ko text-2xl font-bold text-brand"
                >
                  {feature.glyph}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="metodo" className="scroll-mt-20 border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              Método
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Reconhecer, usar, retomar.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              O KBR combina alfabetização em Hangul, prática contextual e repetição espaçada.
              A ideia é simples: aprender menos de uma vez e lembrar por mais tempo.
            </p>
            <p className="mt-6 rounded-2xl border border-border bg-bg p-4 text-sm leading-relaxed text-muted">
              As primeiras lições e o módulo de Hangul estão em desenvolvimento. O conteúdo
              coreano passa por revisão antes de ser publicado.
            </p>
          </div>

          <ol className="grid gap-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="flex gap-5 rounded-3xl border border-border bg-bg p-5 sm:p-6"
              >
                <span className="text-sm font-bold tracking-widest text-brand">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              Privacidade por padrão
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Sua conta serve para sincronizar, não para anunciar.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Pedimos apenas o necessário para autenticar sua conta Google e guardar seu
              progresso. Sem anúncios, sem rastreadores de terceiros e sem venda de dados.
            </p>
          </div>
          <Link
            href="/privacidade"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-surface px-6 font-semibold hover:bg-soft"
          >
            Ler a política de privacidade
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 90% at 50% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <p lang="ko" aria-hidden className="font-ko text-3xl font-bold text-brand">
              시작해 볼까요?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Comece pelo primeiro som.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Entre com sua conta Google para abrir o painel e continuar de onde parou. Seu
              progresso também fica salvo neste dispositivo.
            </p>
            <div className="mt-8 flex justify-center">
              <LandingAuth variant="footer" />
            </div>
            <p className="mt-4 text-xs text-muted">
              Saiba como tratamos seus dados na{" "}
              <Link href="/privacidade" className="underline underline-offset-2 hover:text-brand">
                política de privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
