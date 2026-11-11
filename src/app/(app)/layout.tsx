import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ConnectionNotice } from "@/components/auth/ConnectionNotice";
import { ProtectedArea } from "@/components/auth/ProtectedArea";
import { SkipLink } from "@/components/ui/Navigation";
import { loginRedirectPath } from "@/lib/auth/redirect";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// A fonte coreana só é necessária dentro da área autenticada; mantê-la fora do
// layout raiz evita baixar o arquivo nas páginas públicas.
const kr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-kr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Toda rota deste grupo verifica a sessão a cada requisição.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect(loginRedirectPath("/", "indisponivel"));

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) redirect(loginRedirectPath("/dashboard"));

  return (
    <div className={kr.variable}>
      <ProtectedArea>
        <SkipLink />
        <Nav />
        <main
          id="conteudo"
          tabIndex={-1}
          className="mx-auto max-w-3xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 md:ml-60 md:max-w-none md:px-10 md:pb-12 md:pt-10 [&>*]:md:max-w-3xl"
        >
          <ConnectionNotice />
          {children}
        </main>
      </ProtectedArea>
    </div>
  );
}
