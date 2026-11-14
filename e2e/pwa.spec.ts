import { expect, test } from "@playwright/test";

test.describe("PWA instalável sem cache offline", () => {
  test("serve manifesto, metadados e ícones válidos", async ({ page, request }) => {
    await page.goto("/");

    const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
    expect(manifestHref).toBe("/manifest.webmanifest");

    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/manifest+json");
    expect(response.headers()["cache-control"]).toContain("must-revalidate");

    const manifest = await response.json();
    expect(manifest).toMatchObject({
      id: "/",
      start_url: "/",
      scope: "/",
      display: "standalone",
      lang: "pt-BR",
      dir: "ltr",
    });
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192", purpose: "any" }),
        expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
      ]),
    );

    for (const src of ["/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png"]) {
      const icon = await request.get(src);
      expect(icon.status(), src).toBe(200);
      expect(icon.headers()["content-type"], src).toContain("image/png");
      expect(icon.headers()["cache-control"], src).toContain("immutable");
    }
  });

  test("declara comportamento de app iOS e viewport com safe area", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute(
      "content",
      "yes",
    );
    await expect(page.locator('meta[name="mobile-web-app-capable"]')).toHaveAttribute(
      "content",
      "yes",
    );
    await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute(
      "content",
      "KBR",
    );
    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toContain("viewport-fit=cover");
    expect(await page.locator('meta[name="theme-color"]').count()).toBeGreaterThan(0);
  });

  test("aplica cabeçalhos de segurança e no-store em rotas privadas", async ({ request }) => {
    const publicPage = await request.get("/");
    expect(publicPage.headers()["x-content-type-options"]).toBe("nosniff");
    expect(publicPage.headers()["x-frame-options"]).toBe("DENY");
    expect(publicPage.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");

    const csp = publicPage.headers()["content-security-policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("connect-src 'self' http://127.0.0.1:54321");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toContain("*");
    expect(publicPage.headers()["permissions-policy"]).toContain("microphone=(self)");
    expect(publicPage.headers()["strict-transport-security"]).toMatch(/max-age=\d+/);
    expect(publicPage.headers()["x-powered-by"]).toBeUndefined();

    const privatePage = await request.get("/dashboard", { maxRedirects: 0 });
    expect(privatePage.status()).toBe(307);
    expect(privatePage.headers()["cache-control"]).toContain("no-store");
    expect(privatePage.headers()["x-content-type-options"]).toBe("nosniff");

    const callback = await request.get("/auth/callback", { maxRedirects: 0 });
    expect(callback.status()).toBe(307);
    expect(callback.headers()["cache-control"]).toContain("no-store");
  });

  test("não registra service worker nem abre cache de dados", async ({ page }) => {
    await page.goto("/");

    const state = await page.evaluate(async () => {
      const registrations = "serviceWorker" in navigator
        ? (await navigator.serviceWorker.getRegistrations()).length
        : 0;
      const cacheKeys = "caches" in window ? await caches.keys() : [];
      return { registrations, cacheKeys };
    });

    expect(state.registrations).toBe(0);
    expect(state.cacheKeys).toEqual([]);
  });

  test("Chromium reconhece o app como instalável", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Page.getInstallabilityErrors só existe no Chromium.");

    await page.goto("/");
    const session = await page.context().newCDPSession(page);
    const result = await session.send("Page.getInstallabilityErrors");
    expect(result.installabilityErrors).toEqual([]);
  });
});
