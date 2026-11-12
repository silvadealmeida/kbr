import { expect, test, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const GUEST_STORAGE_KEY = "kbr:v1";

type Seed = {
  cards?: Record<string, { box: number; due: string }>;
  lessons?: Record<string, { done: boolean; score: number }>;
  history?: { id?: string; exerciseId: string; correct: boolean; at: string }[];
};

function progress(seed: Seed) {
  return {
    v: 1,
    lessons: seed.lessons ?? {},
    cards: seed.cards ?? {},
    history: seed.history ?? [],
    streak: 0,
    dailyGoal: 10,
    lastActive: "2020-01-01T00:00:00.000Z",
  };
}

function accountKeyFor(userId: string) {
  return `kbr:user:${userId}:v1`;
}

async function createDevice(
  browser: Browser,
  options: { user?: ReturnType<typeof createTestUser>; seed?: Seed; guestSeed?: Seed } = {},
) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  if (options.user) {
    await context.addCookies([{ ...testAuthCookie(Date.now(), options.user), url: BASE_URL }]);
  }

  const key = options.guestSeed
    ? GUEST_STORAGE_KEY
    : options.user
      ? accountKeyFor(options.user.id)
      : GUEST_STORAGE_KEY;
  const seed = options.guestSeed ?? options.seed;
  if (seed) {
    await context.addInitScript(
      ({ storageKey, value }) => {
        try {
          if (window.sessionStorage.getItem("kbr:e2e:sync-seeded") === "1") return;
          window.localStorage.setItem(storageKey, JSON.stringify(value));
          window.sessionStorage.setItem("kbr:e2e:sync-seeded", "1");
        } catch {
          /* documento sem origem utilizável (about:blank) */
        }
      },
      { storageKey: key, value: progress(seed) },
    );
  }

  const page = await context.newPage();
  return { context, page, key };
}

async function readProgress(page: Page, key: string) {
  return page.evaluate((storageKey) => {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  }, key);
}

async function reviewWord(page: Page, answer: string) {
  await page.getByRole("button", { name: /Começar revisão/ }).click();
  await page
    .getByRole("group", { name: "Alternativas" })
    .getByRole("button", { name: answer })
    .click();
  await page.getByRole("button", { name: "Mostrar resposta" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
  await page.getByRole("button", { name: /Concluir revisão/ }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Revisão concluída" }),
  ).toBeVisible();
  await expect(page.getByText("Progresso sincronizado com sua conta.")).toBeVisible();
}

test.describe("Sincronização multi-dispositivo", () => {
  test("dois dispositivos da mesma conta convergem cartões e histórico", async ({ browser }) => {
    const user = createTestUser();
    const deviceA = await createDevice(browser, {
      user,
      seed: { cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } } },
    });
    const deviceB = await createDevice(browser, {
      user,
      seed: { cards: { "h:jamo:v:ㅏ": { box: 1, due: "2020-01-02T00:00:00.000Z" } } },
    });

    try {
      // A revisa o próprio cartão e confirma a gravação remota antes de B entrar.
      await deviceA.page.goto("/revisao");
      await expect(deviceA.page.getByText("Há 1 cartão para revisar.")).toBeVisible();
      await reviewWord(deviceA.page, "carne");

      // B carrega depois: o merge já traz o cartão de A (vencido no futuro) e
      // deixa apenas o cartão local de B na fila.
      await deviceB.page.goto("/revisao");
      await expect(deviceB.page.getByText("Há 1 cartão para revisar.")).toBeVisible();
      await reviewWord(deviceB.page, "아");

      // A recarrega e recebe o cartão/histórico de B.
      await deviceA.page.reload();
      await expect(deviceA.page.getByText("Nada para revisar agora")).toBeVisible();
      await expect(deviceA.page.getByText("Progresso sincronizado com sua conta.")).toBeVisible();

      await expect
        .poll(async () => {
          const stored = await readProgress(deviceA.page, deviceA.key);
          return {
            wordBox: stored?.cards?.["h:word:고기"]?.box,
            jamoBox: stored?.cards?.["h:jamo:v:ㅏ"]?.box,
            history: stored?.history?.length,
            attempts: stored?.history?.every(
              (attempt: { id?: string }) => typeof attempt.id === "string",
            ),
          };
        })
        .toEqual({ wordBox: 2, jamoBox: 2, history: 2, attempts: true });

      // B também converge ao recarregar.
      await deviceB.page.reload();
      await expect(deviceB.page.getByText("Nada para revisar agora")).toBeVisible();
      await expect
        .poll(async () => {
          const stored = await readProgress(deviceB.page, deviceB.key);
          return [stored?.cards?.["h:word:고기"]?.box, stored?.cards?.["h:jamo:v:ㅏ"]?.box];
        })
        .toEqual([2, 2]);
    } finally {
      await deviceA.context.close();
      await deviceB.context.close();
    }
  });

  test("revisão offline fica local e sincroniza ao reconectar", async ({ browser }) => {
    const user = createTestUser();
    const offlineDevice = await createDevice(browser, {
      user,
      seed: { cards: { "h:word:고기": { box: 1, due: "2020-01-01T00:00:00.000Z" } } },
    });

    try {
      await offlineDevice.page.route("**/rest/v1/**", (route) =>
        route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ message: "offline" }),
        }),
      );
      await offlineDevice.page.goto("/revisao");
      await expect(
        offlineDevice.page.getByText(
          /Salvo neste dispositivo\. A sincronização com sua conta está pendente/,
        ),
      ).toBeVisible();
      await expect(
        offlineDevice.page.getByText("Progresso sincronizado com sua conta."),
      ).toHaveCount(0);

      await reviewWordOffline(offlineDevice.page, "carne");

      await expect
        .poll(async () => {
          const stored = await readProgress(offlineDevice.page, offlineDevice.key);
          return {
            box: stored?.cards?.["h:word:고기"]?.box,
            history: stored?.history?.length,
          };
        })
        .toEqual({ box: 2, history: 1 });

      // Reconecta: a próxima carga mescla o local com o remoto e confirma.
      await offlineDevice.page.unroute("**/rest/v1/**");
      await offlineDevice.page.reload();
      await expect(offlineDevice.page.getByText("Nada para revisar agora")).toBeVisible();
      await expect(
        offlineDevice.page.getByText("Progresso sincronizado com sua conta."),
      ).toBeVisible();

      const otherDevice = await createDevice(browser, { user });
      try {
        await otherDevice.page.goto("/revisao");
        await expect(otherDevice.page.getByText("Nada para revisar agora")).toBeVisible();
        await expect
          .poll(async () => {
            const stored = await readProgress(otherDevice.page, otherDevice.key);
            return {
              box: stored?.cards?.["h:word:고기"]?.box,
              history: stored?.history?.length,
            };
          })
          .toEqual({ box: 2, history: 1 });
      } finally {
        await otherDevice.context.close();
      }
    } finally {
      await offlineDevice.context.close();
    }
  });

  test("progresso de convidado é migrado ao entrar na conta", async ({ browser }) => {
    const user = createTestUser();
    const device = await createDevice(browser, {
      user,
      guestSeed: {
        lessons: { h01: { done: true, score: 100 } },
        history: [
          {
            id: "guest-attempt-1",
            exerciseId: "h01:e1",
            correct: true,
            at: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
    });

    try {
      await device.page.goto("/dashboard");
      await expect(device.page.getByRole("heading", { level: 1, name: "Seu painel" })).toBeVisible();
      await expect(device.page.getByText("3% do curso")).toBeVisible();
      await expect(
        device.page.locator("#conteudo").getByText("Progresso sincronizado", { exact: true }),
      ).toBeVisible();

      await expect
        .poll(async () => {
          const stored = await readProgress(device.page, accountKeyFor(user.id));
          return {
            lesson: stored?.lessons?.h01,
            history: stored?.history?.length,
          };
        })
        .toEqual({ lesson: { done: true, score: 100 }, history: 1 });

      // O snapshot migrado chega a outro dispositivo da mesma conta.
      const otherDevice = await createDevice(browser, { user });
      try {
        await otherDevice.page.goto("/dashboard");
        await expect(otherDevice.page.getByText("3% do curso")).toBeVisible();
        await expect
          .poll(async () => {
            const stored = await readProgress(otherDevice.page, otherDevice.key);
            return [stored?.lessons?.h01?.done, stored?.history?.length];
          })
          .toEqual([true, 1]);
      } finally {
        await otherDevice.context.close();
      }
    } finally {
      await device.context.close();
    }
  });
});

async function reviewWordOffline(page: Page, answer: string) {
  await page.getByRole("button", { name: /Começar revisão/ }).click();
  await page
    .getByRole("group", { name: "Alternativas" })
    .getByRole("button", { name: answer })
    .click();
  await page.getByRole("button", { name: "Mostrar resposta" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Correto." })).toBeVisible();
  await page.getByRole("button", { name: /Concluir revisão/ }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Revisão concluída" }),
  ).toBeVisible();
  await expect(
    page.getByText(/Salvo neste dispositivo\. A sincronização com sua conta está pendente/),
  ).toBeVisible();
}
