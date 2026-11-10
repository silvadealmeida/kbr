import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

const read = (path: string) =>
  readFileSync(new URL(`../src/${path}`, import.meta.url), "utf8");

const landing = read("app/(site)/page.tsx");
const landingAuth = read("components/site/LandingAuth.tsx");
const footer = read("components/site/SiteFooter.tsx");
const privacy = read("app/(site)/privacidade/page.tsx");
const impressum = read("app/(site)/impressum/page.tsx");
const appLayout = read("app/(app)/layout.tsx");
const protectedArea = read("components/auth/ProtectedArea.tsx");
const proxy = read("lib/supabase/proxy.ts");
const callback = read("app/auth/callback/route.ts");
const landingRedirect = read("components/site/LandingRedirect.tsx");

describe("landing pública", () => {
  test("apresenta a proposta e o CTA principal", () => {
    expect(landing).toContain("Coreano de verdade");
    expect(landing).toContain("explicado em português");
    expect(landingAuth).toContain("Entrar com Google");
    expect(landingAuth).toContain("Continuar no painel");
    expect(landing).toContain('id="metodo"');
    expect(landing).toContain('id="recursos"');
  });

  test("explica o método e os recursos sem estatísticas falsas", () => {
    expect(landing).toContain("Hangul sem decoreba");
    expect(landing).toContain("Vocabulário em contexto");
    expect(landing).toContain("Diálogos progressivos");
    expect(landing).toContain("Revisão no tempo certo");
    expect(landing).toContain("Reconhecer, usar, retomar");
    expect(landing).not.toMatch(/\b\d{3,}\s*(alunos|usuários|lições)/i);
  });

  test("tem links de privacidade e legal", () => {
    expect(footer).toContain('href: "/privacidade"');
    expect(footer).toContain('href: "/impressum"');
    expect(landing).toContain('href="/privacidade"');
  });
});

describe("proteção de rotas", () => {
  test("exige sessão no servidor e trata sessão expirada no cliente", () => {
    expect(appLayout).toContain("getClaims");
    expect(appLayout).toContain("redirect(loginRedirectPath");
    expect(protectedArea).toContain("sessao-expirada");
    expect(protectedArea).toContain("protectedView");
    expect(proxy).toContain("isProtectedPath");
    expect(proxy).toContain("getClaims");
  });

  test("usuário autenticado sai da landing para o painel", () => {
    expect(proxy).toContain("postLoginPath");
    expect(proxy).toContain('request.nextUrl.pathname === "/"');
    expect(landing).toContain("LandingRedirect");
    expect(landingRedirect).toContain("postLoginPath");
    expect(landingRedirect).toContain("router.replace");
  });

  test("a callback retoma o destino guardado e falha para /auth/error", () => {
    expect(callback).toContain("AUTH_NEXT_COOKIE");
    expect(callback).toContain("callbackDestination");
    expect(callback).toContain("/auth/error");
  });
});

describe("transparência de privacidade", () => {
  test("documenta os dados, provedores e direitos", () => {
    const text = privacy.toLowerCase();
    for (const term of [
      "google",
      "supabase",
      "vercel",
      "localstorage",
      "kbr:theme",
      "kbr:v1",
      "kbr:user:",
      "kbr:migrated:",
      "gdpr",
      "lgpd",
      "retenção",
      "exclusão",
      "direitos",
      "cookies",
      "base legal",
      "a confirmar",
    ]) {
      expect(text).toContain(term);
    }
  });

  test("não inventa prazos nem identidade legal", () => {
    expect(privacy).not.toMatch(/\b\d+\s*(dias|meses|anos)\s+de\s+retenção/i);
    expect(privacy).not.toMatch(/CNPJ|Steuernummer|USt-IdNr\.\s*:\s*DE\d/i);
  });

  test("avalia o Impressum alemão e lista pendências", () => {
    expect(impressum).toContain("DDG");
    expect(impressum).toContain("MStV");
    expect(impressum).toContain("a confirmar");
    expect(impressum).toContain("revisão jurídica");
  });
});

describe("auditoria de rastreamento", () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(?:ts|tsx|js|jsx|mjs|css)$/.test(entry.name)) files.push(path);
    }
  };
  walk(new URL("../src", import.meta.url).pathname);

  test("não há analytics, pixels ou scripts de publicidade", () => {
    const source = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(source).not.toMatch(
      /gtag\s*\(|googletagmanager|google-analytics|@vercel\/analytics|@vercel\/speed-insights|plausible|posthog|hotjar|mixpanel|clarity\.ms|fbq\s*\(|segment\.com/i,
    );
  });

  test("não há banner de consentimento nem embeds de terceiros", () => {
    const source = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(source).not.toMatch(/cookieconsent|cookie-consent|consent-banner|<iframe/i);
  });
});
