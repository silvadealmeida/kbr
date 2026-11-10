import { test, expect } from "@playwright/test";

const routes = [["/", "Bem-vindo ao KBR"], ["/hangul", "Aprender Hangul"], ["/vocabulario", "Vocabulário"], ["/licoes", "Lições"], ["/revisao", "Revisão"]];

for (const [path, h1] of routes) {
  test(`rota ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    // sem rolagem horizontal
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (path !== "/") await expect(page.getByText("Em desenvolvimento")).toBeVisible();
  });
}

test("navegação e alvos de toque", async ({ page, viewport }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Principal" }).and(page.locator(":visible"));
  const links = nav.getByRole("link");
  await expect(links).toHaveCount(5);
  for (const l of await links.all()) expect((await l.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await links.nth(1).click();
  await expect(page).toHaveURL(/\/hangul$/);
  await expect(links.nth(1)).toHaveAttribute("aria-current", "page");
  expect(viewport!.width).toBeGreaterThan(0);
});

test("alternar tema persiste", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /tema/ }).and(page.locator(":visible")).click();
  const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(dark);
});
