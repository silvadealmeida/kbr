import type { Metadata } from "next";
import Link from "next/link";
import { HangulComposition } from "@/components/site/HangulComposition";
import { LandingAuth } from "@/components/site/LandingAuth";
import { LandingRedirect } from "@/components/site/LandingRedirect";
import { ButtonLink } from "@/components/ui/Button";
import { postLoginPath } from "@/lib/auth/redirect";

export const metadata: Metadata = {
  title: "Coreano para brasileiros",
  description: "Aprenda a ler Hangul em português com lições curtas, prática e revisão espaçada.",
};
const targetLabels: Record<string, string> = {
  "/dashboard": "o painel", "/cursos": "os cursos", "/hangul": "o Hangul",
  "/vocabulario": "o vocabulário", "/licoes": "os cursos", "/revisao": "a revisão",
};
const method = [
  { number: "01", title: "Reconhecer", text: "Veja a forma e escute o som antes de montar a primeira sílaba." },
  { number: "02", title: "Usar", text: "Pratique em lições curtas e confira o que você realmente entendeu." },
  { number: "03", title: "Retomar", text: "Reveja os cartões criados pelos seus erros quando eles vencerem." },
];
const resources = [
  { title: "Hangul sem decoreba", status: "Disponível", text: "25 lições e quatro checkpoints para aprender a ler os blocos da escrita coreana." },
  { title: "Vocabulário em contexto", status: "Disponível", text: "Palavras com frases, dicas de sentido e revisão espaçada em /vocabulario." },
  { title: "Diálogos progressivos", status: "Disponível", text: "O curso A1 traz diálogos originais, tradução e prática contextual em 40 lições." },
  { title: "Revisão no tempo certo", status: "Disponível", text: "Cartões de repetição espaçada surgem a partir dos erros nas lições." },
];
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const first = (value: string | string[] | undefined) => typeof value === "string" ? value : null;

export default async function LandingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const nextPath = postLoginPath(first(params.next));
  const reason = first(params.motivo);
  const target = targetLabels[nextPath.split("?")[0]] ?? "a página anterior";
  return (
    <>
      <LandingRedirect next={nextPath} />
      <section className="paper-texture border-b border-line">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 pb-18 pt-12 sm:px-8 lg:min-h-[680px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-center lg:gap-16 lg:py-20">
          <div className="min-w-0 max-w-[650px]">
            <p className="mono-label text-accent">Coreano para quem fala português</p>
            <h1 className="composition-enter mt-7 max-w-[11ch] break-words font-display text-[clamp(2.35rem,7vw,6.5rem)] font-semibold leading-[.98] tracking-[-.055em]">Coreano de verdade, explicado em português.</h1>
            <p className="mt-7 max-w-[55ch] text-lg leading-relaxed text-muted">Comece pela lógica da escrita coreana. Monte sílabas, pratique a leitura e retome o que ainda precisa de atenção.</p>
            {reason === "sessao-expirada" ? <p role="status" className="mt-6 border-l-[3px] border-warning bg-surface px-4 py-3 text-sm">Sua sessão expirou. Entre novamente para continuar de onde parou.</p> : null}
            {reason === "indisponivel" ? <p role="status" className="mt-6 border-l-[3px] border-warning bg-surface px-4 py-3 text-sm">O login está temporariamente indisponível. Tente novamente em instantes.</p> : null}
            {reason === "logout" ? <p role="status" className="mt-6 border-l-[3px] border-accent bg-surface px-4 py-3 text-sm">Você saiu da conta. Seu progresso deste dispositivo foi mantido e volta ao entrar novamente.</p> : null}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><LandingAuth variant="hero" /><ButtonLink href="#metodo" variant="secondary" className="w-full sm:w-auto">Conhecer o método</ButtonLink></div>
            {nextPath !== "/dashboard" ? <p className="mt-3 text-sm text-muted">Depois de entrar, você volta para {target}.</p> : null}
            <p className="mt-8 border-t border-line pt-4 text-sm text-muted">Hangul e A1 disponíveis · A2–C2 planejados · Conteúdo coreano em revisão</p>
          </div>
          <figure className="composition-enter mx-auto w-full min-w-0 max-w-[480px] [animation-delay:120ms] lg:max-w-none"><HangulComposition /><figcaption className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted"><span lang="ko">한</span> nasce da combinação de <span lang="ko">ㅎ</span>, <span lang="ko">ㅏ</span> e <span lang="ko">ㄴ</span>. Cada parte ocupa um lugar no bloco.</figcaption></figure>
        </div>
      </section>
      <section id="metodo" className="scroll-mt-24 border-b border-line bg-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-18 sm:px-8 lg:py-24">
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr] lg:gap-12"><div><p className="mono-label text-accent">Como se aprende</p><h2 className="mt-4 max-w-[12ch] text-h1 font-semibold">Reconhecer, usar, retomar.</h2></div><p className="max-w-[60ch] text-lg leading-relaxed text-muted">No Hangul, as letras se organizam em blocos. O curso segue a mesma lógica: entenda uma parte, use-a numa lição e volte a ela quando precisar.</p></div>
          <ol className="mt-10 grid border-t border-line md:grid-cols-3">{method.map((step) => <li key={step.number} className="border-b border-line py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"><span className="mono-data text-accent">{step.number} / 03</span><h3 className="mt-7 text-2xl font-semibold">{step.title}</h3><p className="mt-3 max-w-[36ch] leading-relaxed text-muted">{step.text}</p></li>)}</ol>
        </div>
      </section>
      <section id="recursos" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[1280px] px-4 py-18 sm:px-8 lg:py-24"><p className="mono-label text-accent">O que você encontra</p><h2 className="mt-4 max-w-[20ch] text-h1 font-semibold">Um primeiro curso completo. Os próximos, no tempo certo.</h2>
          <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">{resources.map((item, index) => <li key={item.title} className="bg-surface p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><span className="mono-data text-muted">0{index + 1}</span><span className={`text-xs font-semibold ${item.status === "Disponível" ? "text-accent" : "text-muted"}`}>{item.status}</span></div><h3 className="mt-10 text-2xl font-semibold">{item.title}</h3><p className="mt-3 max-w-[40ch] leading-relaxed text-muted">{item.text}</p></li>)}</ul>
        </div>
      </section>
      <section className="border-b border-line bg-surface-2"><div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="mono-label text-accent">Índice de cursos</p><h2 className="mt-4 text-h1 font-semibold">Comece pelo Hangul.</h2><p className="mt-3 max-w-[58ch] leading-relaxed text-muted">O curso de leitura está disponível como Pré-A1. O Coreano A1 está disponível com 40 lições e 8 checkpoints no currículo interno do KBR; A2–C2 aparecem no catálogo como planejados, sem certificação.</p></div><ButtonLink href="/cursos" variant="primary" className="w-full sm:w-auto">Ver os cursos</ButtonLink></div></section>
      <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-18 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-24"><div><p className="mono-label text-accent">Seu próximo passo</p><h2 className="mt-4 max-w-[15ch] text-h1 font-semibold">A primeira sílaba começa aqui.</h2><p className="mt-5 max-w-[52ch] leading-relaxed text-muted">Entre com Google para abrir as lições. Seu progresso fica salvo neste dispositivo e pode ser sincronizado com sua conta.</p><p className="mt-4 text-sm text-muted">Saiba como tratamos seus dados na <Link href="/privacidade" className="text-accent underline underline-offset-4">Ler a política de privacidade</Link>.</p></div><div className="border-t-[3px] border-seal bg-surface p-7 sm:p-10"><p className="mono-label text-seal">Lâmina 01 / 25</p><p className="mt-6 text-3xl font-semibold">Aprenda a ler, um bloco de cada vez.</p><div className="mt-8"><LandingAuth variant="footer" /></div></div></section>
    </>
  );
}
