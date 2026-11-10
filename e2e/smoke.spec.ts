import { expect, test } from "@playwright/test";

const protectedRoutes = [
  ["/dashboard", "%2Fdashboard"],
  ["/hangul", "%2Fhangul"],
  ["/hangul/h01", "%2Fhangul%2Fh01"],
  ["/hangul/h11", "%2Fhangul%2Fh11"],
  ["/hangul/c1", "%2Fhangul%2Fc1"],
  ["/hangul/c2", "%2Fhangul%2Fc2"],
  ["/vocabulario", "%2Fvocabulario"],
  ["/licoes", "%2Flicoes"],
  ["/revisao", "%2Frevisao"],
];

test("landing pública apresenta proposta, método e CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coreano de verdade");
  await expect(page.getByText("explicado em português.")).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("button", { name: /Entrar com Google|Login indisponível/ })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Hangul sem decoreba" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Vocabulário em contexto" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Diálogos progressivos" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Revisão no tempo certo" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reconhecer, usar, retomar." })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
});

test("visitante não acessa nenhuma rota de aprendizagem", async ({ page }) => {
  for (const [path, encoded] of protectedRoutes) {
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(`\\/?next=${encoded}`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Coreano de verdade");
    if (path !== "/dashboard") {
      await expect(page.getByText("Depois de entrar, você volta")).toBeVisible();
    }
  }
});

test("sessão inválida é tratada como expirada", async ({ context, page, baseURL }) => {
  await context.addCookies([
    { name: "sb-teste-auth-token", value: "sessao-invalida", url: baseURL! },
  ]);
  await page.goto("/hangul");
  await expect(page).toHaveURL(/motivo=sessao-expirada/);
  await expect(page.getByText("Sua sessão expirou", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Coreano de verdade");
});

test("rota privada não vaza conteúdo no HTML sem sessão", async ({ request }) => {
  for (const [path] of protectedRoutes) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toMatch(/\/\?next=/);
    expect(await response.text()).not.toContain("Seu painel");
  }
});

test("deep link seguro volta para a rota pedida após o login", async ({ page }) => {
  await page.goto("/?next=%2Frevisao%3Ffiltro%3Dhoje");
  await expect(page.getByText("Depois de entrar, você volta para a revisão.")).toBeVisible();
  await expect(
    page
      .getByRole("main")
      .getByRole("button", { name: /Entrar com Google|Login indisponível/ })
      .first(),
  ).toBeVisible();
});

test("destino externo no parâmetro next é ignorado", async ({ page }) => {
  await page.goto("/?next=https%3A%2F%2Fevil.example");
  await expect(page.getByText("Depois de entrar, você volta")).toHaveCount(0);
});

test("página de privacidade está disponível e é completa", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ler a política de privacidade" }).click();
  await expect(page).toHaveURL(/\/privacidade$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Privacidade e proteção de dados" }),
  ).toBeVisible();
  for (const term of ["Google", "Supabase", "Vercel", "LGPD", "GDPR", "Seus direitos"]) {
    await expect(page.getByText(term, { exact: false }).first()).toBeVisible();
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true);
});

test("aviso legal e erro de autenticação continuam acessíveis", async ({ page }) => {
  await page.goto("/impressum");
  await expect(
    page.getByRole("heading", { level: 1, name: "Aviso legal / Impressum" }),
  ).toBeVisible();
  await expect(page.getByText("Documento incompleto")).toBeVisible();

  await page.goto("/auth/error");
  await expect(
    page.getByRole("heading", { level: 1, name: "Não foi possível entrar" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Tentar entrar novamente" })).toBeVisible();
});

test("callback sem código falha sem entrar em rota privada", async ({ page }) => {
  await page.goto("/auth/callback");
  await expect(page).toHaveURL(/\/auth\/error$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Não foi possível entrar" }),
  ).toBeVisible();
  expect(new URL(page.url()).pathname).toBe("/auth/error");
});

test("navegação pública se adapta a mobile e desktop", async ({ page, viewport }) => {
  await page.goto("/");
  const siteNav = page.getByRole("navigation", { name: "Site" });
  const width = viewport?.width ?? 1280;

  if (width >= 768) {
    await expect(siteNav).toBeVisible();
    await expect(siteNav.getByRole("link", { name: "Privacidade" })).toBeVisible();
  } else {
    await expect(siteNav).toBeHidden();
    await expect(page.getByRole("banner")).toBeVisible();
  }

  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Privacidade" }),
  ).toBeVisible();

  const targets = [
    page
      .getByRole("main")
      .getByRole("button", { name: /Entrar com Google|Login indisponível/ })
      .first(),
    page.getByRole("link", { name: "Privacidade" }).last(),
  ];
  for (const target of targets) {
    const box = await target.boundingBox();
    if (box) expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test("alternar tema persiste", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /tema/ }).and(page.locator(":visible")).click();
  const dark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  await page.reload();
  expect(
    await page.evaluate(() => document.documentElement.classList.contains("dark")),
  ).toBe(dark);
});
