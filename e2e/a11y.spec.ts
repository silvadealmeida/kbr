import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function expectNoAxeViolations(page: Page, context: string) {
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

    await page.keyboard.press("Enter");
    await expect(page.locator("main#conteudo")).toBeFocused();
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
});
