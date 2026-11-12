import { expect, test } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

// Regressão do iPhone: o cartão do curso tinha `pr-14` por causa do número da
// lâmina, deixando ~57px vazios à direita e quebrando o texto cedo.
for (const width of [320, 375, 390, 768, 1280]) {
  test(`cartão do curso tem recuos simétricos em ${width}px`, async ({ page, context }) => {
    await context.addCookies([
      { ...testAuthCookie(Date.now(), createTestUser()), url: "http://localhost:3100" },
    ]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/cursos");
    await expect(page.getByRole("heading", { name: "Hangul" })).toBeVisible();

    const m = await page.evaluate(() => {
      const card = document.querySelector("main ul > li > div") as HTMLElement;
      const flex = card.querySelector(".flex.flex-wrap") as HTMLElement;
      const c = card.getBoundingClientRect();
      const f = flex.getBoundingClientRect();
      return {
        left: Math.round(f.left - c.left),
        right: Math.round(c.right - f.right),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    expect(m.overflow).toBeLessThanOrEqual(0);
    expect(Math.abs(m.left - m.right)).toBeLessThanOrEqual(2);
  });
}
