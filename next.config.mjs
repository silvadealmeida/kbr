const protectedRoutes = [
  "/dashboard/:path*",
  "/cursos/:path*",
  "/hangul/:path*",
  "/vocabulario/:path*",
  "/revisao/:path*",
  "/licoes/:path*",
  "/fala/:path*",
  "/a1/:path*",
  "/a2/:path*",
  "/b1/:path*",
  "/b2/:path*",
  "/c1/:path*",
  "/c2/:path*",
];

const privateNoStore = {
  key: "Cache-Control",
  value: "private, no-store, max-age=0",
};

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

/**
 * Origens do Supabase permitidas em `connect-src`. Derivadas da mesma variável
 * pública usada pelo cliente, para que previews e o mock de E2E continuem
 * funcionando sem abrir a política para qualquer host.
 */
function supabaseConnectSources() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw) return [];

  try {
    const url = new URL(raw);
    const origins = [url.origin];
    // O Realtime usa WebSocket; manter a origem `wss:` evita quebrar um uso
    // futuro sem precisar afrouxar a política.
    if (url.protocol === "https:") origins.push(`wss://${url.host}`);
    return origins;
  } catch {
    return [];
  }
}

/**
 * CSP estática, aplicada por `headers()` em todas as rotas.
 *
 * `script-src`/`style-src` mantêm `'unsafe-inline'` porque o Next injeta scripts
 * de bootstrap e o layout raiz aplica o tema antes da hidratação, e porque o
 * React usa atributos `style` inline. A política ainda bloqueia scripts e
 * estilos externos, objetos, frames e formulários para fora do site. Migrar
 * para nonce + `strict-dynamic` exigiria renderização dinâmica em todas as
 * páginas e está registrado como endurecimento futuro em `docs/architecture.md`.
 */
export function buildContentSecurityPolicy() {
  const isDev = isDevelopment();
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    `connect-src 'self'${supabaseConnectSources().map((origin) => ` ${origin}`).join("")}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  return directives.join("; ");
}

function buildSecurityHeaders() {
  return [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // O app não usa câmera, localização ou pagamentos; o microfone fica restrito
    // ao próprio site (prática de fala experimental em `/fala`).
    {
      key: "Permissions-Policy",
      value: "camera=(), geolocation=(), microphone=(self), payment=(), usb=()",
    },
    // Ignorado sobre HTTP (dev/E2E); aplica-se quando servido por HTTPS.
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Não anuncia a versão do framework em cada resposta.
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: buildSecurityHeaders() },
      // Respostas de autenticação e dados de progresso nunca devem ficar em cache.
      { source: "/auth/:path*", headers: [privateNoStore] },
      ...protectedRoutes.map((source) => ({ source, headers: [privateNoStore] })),
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // MP3s versionados por conteúdo; o caminho inclui a versão do corpus.
      // Servidos por padrão (Fase 14); o kill switch `=0` desliga o player e
      // retira o cache imutável para não fixar 404s.
      ...(process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "0"
        ? []
        : [{
            source: "/audio/:path*",
            headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
          }]),
    ];
  },
};

export default nextConfig;
