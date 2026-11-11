const protectedRoutes = [
  "/dashboard/:path*",
  "/cursos/:path*",
  "/hangul/:path*",
  "/vocabulario/:path*",
  "/revisao/:path*",
  "/licoes/:path*",
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const privateNoStore = {
  key: "Cache-Control",
  value: "private, no-store, max-age=0",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
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
    ];
  },
};

export default nextConfig;
