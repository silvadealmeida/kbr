import { expect, test, type BrowserContext } from "@playwright/test";
import { TEST_USER, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";

async function authenticate(context: BrowserContext) {
  await context.addCookies([{ ...testAuthCookie(), url: BASE_URL }]);
}

test.describe("Hangul autenticado", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("lista lições disponíveis e bloqueadas sem overflow em 375 px", async ({ page }) => {
    await page.goto("/hangul");

    await expect(page.getByRole("heading", { level: 1, name: "Aprender Hangul" })).toBeVisible();
    await expect(page.getByRole("link", { name: /h01.*Um alfabeto desenhado/ })).toBeVisible();
    await expect(page.getByText("Após h01")).toBeVisible();
    await expect(page.getByText("Em breve").first()).toBeVisible();

    const lessonLink = page.getByRole("link", { name: /h01.*Um alfabeto desenhado/ });
    const box = await lessonLink.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });

  test("faz a lição h01 com teclado e persiste após recarregar", async ({ page }) => {
    await page.goto("/hangul/h01");

    await expect(page.getByRole("heading", { level: 1, name: /Um alfabeto/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Objetivos" })).toBeVisible();
    await expect(page.getByText("Conteúdo em revisão")).toBeVisible();

    const start = page.getByRole("button", { name: "Começar a prática" });
    const startBox = await start.boundingBox();
    expect(startBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    await start.click();

    const answers = [
      "2 blocos",
      "Verdadeiro",
      "Falso",
      "Na posição medial, à direita ou embaixo da consoante inicial",
      "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
      "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
    ];

    for (const [index, answer] of answers.entries()) {
      const option = page.getByRole("button", { name: new RegExp(answer.slice(0, 24)) });
      await option.focus();
      await page.keyboard.press("Enter");
      await expect(option).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("button", { name: "Conferir" }).focus();
      await page.keyboard.press("Enter");

      await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();

      const action = index === answers.length - 1 ? "Concluir lição" : "Continuar";
      await page.getByRole("button", { name: action }).click();
    }

    await expect(page.getByRole("heading", { level: 1, name: "Lição concluída" })).toBeVisible();
    await expect(page.getByText("Você acertou 6 de 6 (100%).")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw).lessons?.h01?.score : null;
        }, `kbr:user:${TEST_USER.id}:v1`),
      )
      .toBe(100);

    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: /Um alfabeto/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Começar a prática" })).toBeVisible();

    await page.goto("/hangul");
    await expect(page.getByText("Concluída · 100%")).toBeVisible();
    await expect(page.getByRole("link", { name: /h02.*ㅏ ㅓ ㅗ ㅜ/ })).toBeVisible();
  });

  test("mostra feedback de resposta incorreta em h02", async ({ page }) => {
    await page.goto("/hangul/h01");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    const answers = [
      "2 blocos",
      "Verdadeiro",
      "Falso",
      "Na posição medial, à direita ou embaixo da consoante inicial",
      "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
      "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
    ];
    for (const [index, answer] of answers.entries()) {
      await page.getByRole("button", { name: new RegExp(answer.slice(0, 24)) }).click();
      await page.getByRole("button", { name: "Conferir" }).click();
      await page
        .getByRole("button", { name: index === answers.length - 1 ? "Concluir lição" : "Continuar" })
        .click();
    }

    await expect(page.getByRole("heading", { level: 1, name: "Lição concluída" })).toBeVisible();

    await page.goto("/hangul/h02");
    await page.getByRole("button", { name: "Começar a prática" }).click();

    await page.getByRole("button", { name: "어" }).click();
    await page.getByRole("button", { name: "Conferir" }).click();

    const feedback = page.getByRole("status").filter({ hasText: "Ainda não." });
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText("아");
    await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();
  });
});
