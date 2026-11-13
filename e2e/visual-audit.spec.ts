import { mkdirSync } from "node:fs";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const OUT = "/tmp/kbr-audit-shots";
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();
const LEVELS = [
  { id: "hangul", path: "/hangul/h01", seed: {} },
  { id: "a1", path: "/a1/a1-l01", seed: { "a1-l01": { done: false, score: 0 } } },
  { id: "a2", path: "/a2/a2-l01", seed: { "a1-c08": { done: true, score: 100 } } },
  { id: "b1", path: "/b1/b1-l01", seed: { "a2-c08": { done: true, score: 100 } } },
  { id: "b2", path: "/b2/b2-l01", seed: { "b1-c08": { done: true, score: 100 } } },
  { id: "c1", path: "/c1/c1-l01", seed: { "b2-c08": { done: true, score: 100 } } },
  { id: "c2", path: "/c2/c2-l01", seed: { "c1-c08": { done: true, score: 100 } } },
] as const;

async function authenticate(context: BrowserContext) {
  const account = createTestUser();
  sessions.set(context, { storageKey: `kbr:user:${account.id}:v1` });
  await context.addCookies([{ ...testAuthCookie(Date.now(), account), url: BASE_URL }]);
}

function storageKeyFor(context: BrowserContext) {
  const session = sessions.get(context);
  if (!session) throw new Error("Autentique antes de semear.");
  return session.storageKey;
}

async function seedProgress(
  context: BrowserContext,
  lessons: Record<string, { done: boolean; score: number }>,
) {
  await context.addInitScript(({ key, value }) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* about:blank */
    }
  }, {
    key: storageKeyFor(context),
    value: {
      v: 1,
      lessons,
      cards: {},
      history: [],
      streak: 0,
      dailyGoal: 10,
      lastActive: "2020-01-01T00:00:00.000Z",
    },
  });
}

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test.describe("auditoria visual 13C", () => {
  test.beforeEach(async ({ context }) => {
    await authenticate(context);
  });

  test("captura lições e catálogo em 320/375/390/768/1280", async ({ page }) => {
    test.skip(test.info().project.name !== "desktop-1280", "capturas em um único projeto");
    mkdirSync(OUT, { recursive: true });
    for (const level of LEVELS) {
      await seedProgress(page.context(), level.seed as Record<string, { done: boolean; score: number }>);
      for (const width of [320, 375, 390, 768, 1280]) {
        await page.setViewportSize({ width, height: width >= 768 ? 900 : 760 });
        await page.goto(level.path);
        await expect(page.locator("main")).toBeVisible();
        await expect(page.getByText("Preparando seu progresso…")).toHaveCount(0);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await noOverflow(page);
        await page.screenshot({ path: `${OUT}/${level.id}-${width}.png`, fullPage: true });
      }
    }
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto("/cursos");
    await expect(page.locator("main")).toBeVisible();
    await noOverflow(page);
    await page.screenshot({ path: `${OUT}/cursos-375.png`, fullPage: true });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.screenshot({ path: `${OUT}/cursos-1280.png`, fullPage: true });
  });
});
