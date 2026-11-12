import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function expectNoAxeViolations(page: Page, context: string) {
  // A varredura de contraste precisa do estado visual estável. As entradas da
  // 7D/7F animam opacity; rodar o axe no meio do fade produz um falso positivo
  // de contraste (o texto ainda está transparente). Esperar as animações finitas
  // terminar não altera o produto nem ignora violações reais.
  await page.evaluate(async () => {
    const deadline = performance.now() + 1500;
    let quietFrames = 0;
    while (performance.now() < deadline) {
      await new Promise(requestAnimationFrame);
      const running = document.getAnimations().some((animation) => {
        const timing = animation.effect?.getTiming();
        return animation.playState === "running" && timing?.iterations !== Infinity;
      });
      quietFrames = running ? 0 : quietFrames + 1;
      if (quietFrames >= 4) return;
    }
  });
  const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
  const summary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.map((node) => node.target.join(" ")),
  }));
  expect(summary, `${context}: ${JSON.stringify(summary, null, 2)}`).toEqual([]);
}

test.describe("acessibilidade automatizada", () => {
  test("páginas públicas não têm violações axe", async ({ page }) => {
    for (const [path, heading] of [
      ["/", /Coreano de verdade/],
      ["/privacidade", /Privacidade e proteção de dados/],
      ["/impressum", /Aviso legal/],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expectNoAxeViolations(page, path);
    }
  });

  test("skip link move o foco para o conteúdo", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    const focusRing = await skip.evaluate((element) => {
      const style = getComputedStyle(element);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(focusRing).toEqual({ width: "3px", style: "solid" });

    await page.keyboard.press("Enter");
    await expect(page.locator("main#conteudo")).toBeFocused();
  });

  test("tema aplica tokens de cor e color-scheme nos dois modos", async ({ page }) => {
    await page.goto("/");

    const light = await page.evaluate(() => ({
      scheme: getComputedStyle(document.documentElement).colorScheme,
      background: getComputedStyle(document.body).backgroundColor,
      font: getComputedStyle(document.body).fontFamily,
    }));
    expect(light.scheme).toBe("light");
    expect(light.background).toBe("rgb(244, 239, 227)");
    expect(light.font).toContain("Archivo");

    await page.getByRole("button", { name: "Ativar tema escuro" }).click();

    const dark = await page.evaluate(() => ({
      scheme: getComputedStyle(document.documentElement).colorScheme,
      background: getComputedStyle(document.body).backgroundColor,
      foreground: getComputedStyle(document.body).color,
      font: getComputedStyle(document.body).fontFamily,
    }));
    expect(dark.scheme).toBe("dark");
    expect(dark.background).toBe("rgb(16, 21, 18)");
    expect(dark.foreground).toBe("rgb(242, 237, 226)");
    expect(dark.font).toContain("Archivo");
  });

  test("alternador de tema anuncia estado e ação", async ({ page }) => {
    await page.goto("/");

    const darkToggle = page.getByRole("button", { name: "Ativar tema escuro" });
    await expect(darkToggle).toHaveAttribute("aria-pressed", "false");
    await darkToggle.click();

    const lightToggle = page.getByRole("button", { name: "Ativar tema claro" });
    await expect(lightToggle).toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
      .toBe(true);
  });

  test("tema escuro mantém contraste em página pública e painel", async ({ context, page }) => {
    await page.goto("/privacidade");
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme))
      .toBe("dark");
    await expectNoAxeViolations(page, "/privacidade (escuro)");

    const user = createTestUser();
    await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
    await expectNoAxeViolations(page, "/dashboard (escuro)");
  });

  test("área autenticada e prática não têm violações axe", async ({ context, page }) => {
    const user = createTestUser();
    await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);

    for (const [path, heading] of [
      ["/dashboard", /Seu painel/],
      ["/cursos", /Cursos/],
      ["/hangul", /Aprender Hangul/],
      ["/hangul/h01", /Um alfabeto/],
      ["/revisao", /Revisão/],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading }).first()).toBeVisible();
      await expectNoAxeViolations(page, path);
    }

    await page.goto("/hangul/h01");
    await page.getByRole("button", { name: "Começar a prática" }).click();
    await expect(page.getByRole("heading", { name: /Quantos blocos/ })).toBeVisible();
    await expectNoAxeViolations(page, "/hangul/h01 (prática)");
  });

  test("A1 em desenvolvimento não tem violações axe em claro e escuro", async ({
    context,
    page,
  }) => {
    const user = createTestUser();
    await context.addCookies([{ ...testAuthCookie(Date.now(), user), url: BASE_URL }]);

    await page.goto("/a1");
    await expect(
      page.getByRole("heading", { level: 1, name: "Coreano A1" }),
    ).toBeVisible();
    await expectNoAxeViolations(page, "/a1 (claro)");

    await page.goto("/a1/a1-l01");
    await expect(
      page.getByRole("heading", { level: 1, name: "Olá, eu sou…" }),
    ).toBeVisible();
    await expectNoAxeViolations(page, "/a1/a1-l01 (claro)");

    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.documentElement).colorScheme),
      )
      .toBe("dark");
    await expectNoAxeViolations(page, "/a1/a1-l01 (escuro)");
  });
});
