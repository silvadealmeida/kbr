import { readFileSync } from "node:fs";
import { afterEach, describe, expect, test } from "vitest";
import nextConfig, { buildContentSecurityPolicy } from "../next.config.mjs";

const migration = readFileSync(
  new URL("../supabase/migrations/20261110120000_create_user_progress.sql", import.meta.url),
  "utf8",
);

describe("segurança do banco", () => {
  test("ativa RLS, remove anon e limita cada operação ao auth.uid", () => {
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("revoke all on table public.user_progress from anon, authenticated");
    expect(migration.match(/\nto authenticated\n/g)).toHaveLength(4);
    expect(migration.match(/\(select auth\.uid\(\)\) = user_id/g)).toHaveLength(5);
  });

  test("não referencia credenciais privilegiadas", () => {
    expect(migration).not.toMatch(/service_role|secret key/i);
  });
});

function headerValue(headers: { key: string; value: string }[], key: string) {
  return headers.find((header) => header.key.toLowerCase() === key.toLowerCase())?.value;
}

async function globalHeaders() {
  const groups = await nextConfig.headers();
  const global = groups.find((group) => group.source === "/:path*");
  expect(global, "grupo global de cabeçalhos").toBeDefined();
  return global!.headers;
}

describe("cabeçalhos HTTP de segurança", () => {
  const previousSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  afterEach(() => {
    if (previousSupabaseUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    } else {
      process.env.NEXT_PUBLIC_SUPABASE_URL = previousSupabaseUrl;
    }
  });

  test("aplica CSP restritiva em todas as rotas", async () => {
    const csp = headerValue(await globalHeaders(), "Content-Security-Policy");
    expect(csp).toBeTruthy();

    for (const directive of [
      "default-src 'self'",
      "object-src 'none'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ]) {
      expect(csp).toContain(directive);
    }

    // Nenhuma origem curinga e nenhum eval em produção/teste.
    expect(csp).not.toContain("*");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toMatch(/connect-src 'self'/);
    expect(csp).toMatch(/img-src 'self' data: blob:/);
  });

  test("deriva connect-src da URL pública do Supabase", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://projeto.supabase.co";
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("connect-src 'self' https://projeto.supabase.co wss://projeto.supabase.co");

    process.env.NEXT_PUBLIC_SUPABASE_URL = "http://127.0.0.1:54321";
    const localCsp = buildContentSecurityPolicy();
    expect(localCsp).toContain("connect-src 'self' http://127.0.0.1:54321");
    expect(localCsp).not.toContain("wss://");
  });

  test("restringe APIs sensíveis e evita sniffing, framing e vazamento de referer", async () => {
    const headers = await globalHeaders();
    expect(headerValue(headers, "X-Content-Type-Options")).toBe("nosniff");
    expect(headerValue(headers, "X-Frame-Options")).toBe("DENY");
    expect(headerValue(headers, "Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headerValue(headers, "Strict-Transport-Security")).toMatch(/max-age=\d+/);
    expect(headerValue(headers, "Cross-Origin-Opener-Policy")).toBe("same-origin-allow-popups");

    const permissions = headerValue(headers, "Permissions-Policy") ?? "";
    expect(permissions).toContain("camera=()");
    expect(permissions).toContain("geolocation=()");
    expect(permissions).toContain("payment=()");
    expect(permissions).toContain("usb=()");
    // O microfone só é permitido para o próprio site (prática de fala em `/fala`).
    expect(permissions).toContain("microphone=(self)");
  });

  test("não expõe a versão do framework", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  test("marca todas as rotas privadas como no-store", async () => {
    const groups = await nextConfig.headers();
    const noStoreSources = new Set(
      groups
        .filter((group) => headerValue(group.headers, "Cache-Control")?.includes("no-store"))
        .map((group) => group.source),
    );

    for (const source of [
      "/auth/:path*",
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
    ]) {
      expect(noStoreSources.has(source), source).toBe(true);
    }
  });
});
