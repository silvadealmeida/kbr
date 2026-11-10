import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const kr = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-kr", display: "swap" });

export const metadata: Metadata = { title: { default: "KBR — Coreano para brasileiros", template: "%s · KBR" }, description: "Aprenda coreano em português, passo a passo." };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// Aplica o tema salvo antes da hidratação para evitar flash.
const themeScript = `try{var t=localStorage.getItem("kbr:theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={kr.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="font-sans antialiased">
        <Nav />
        <main className="mx-auto max-w-3xl px-4 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] md:ml-60 md:max-w-none md:px-10 md:pb-12 md:pt-10 [&>*]:md:max-w-3xl">
          {children}
        </main>
      </body>
    </html>
  );
}
