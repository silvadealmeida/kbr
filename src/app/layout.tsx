import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

// Fontes self-hosted no build (next/font): nenhuma requisição ao Google em runtime.
// `preload: false` evita disputar banda com o LCP; o navegador baixa apenas a
// família realmente usada na página. Noto Sans KR continua restrita a (app).
const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-archivo",
  // `optional` evita troca tardia de métricas na landing (CLS < 0,1). Em visitas
  // com cache a fonte aparece; na primeira visita lenta, o fallback métrico fica.
  display: "optional",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "KBR — Coreano para brasileiros", template: "%s · KBR" },
  description:
    "Aprenda coreano em português: Hangul, vocabulário em contexto, diálogos progressivos e revisão espaçada.",
  applicationName: "KBR",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "KBR" },
  formatDetection: { telephone: false },
  // O Next só emite `mobile-web-app-capable`; iOS anterior ao 17.4 exige a variante Apple.
  other: { "apple-mobile-web-app-capable": "yes" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#101512" },
  ],
};

// Aplica o tema salvo antes da hidratação para evitar flash.
const themeScript = `try{var t=localStorage.getItem("kbr:theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${archivo.variable} ${plexMono.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
