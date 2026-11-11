import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "KBR — Coreano para brasileiros",
    short_name: "KBR",
    description: "Aprenda coreano em português, passo a passo.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#2f5d50",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["education"],
    prefer_related_applications: false,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Continuar o Hangul",
        short_name: "Hangul",
        description: "Abrir o curso de Hangul",
        url: "/hangul",
      },
      {
        name: "Revisar cartões",
        short_name: "Revisão",
        description: "Abrir a revisão espaçada",
        url: "/revisao",
      },
    ],
  };
}
