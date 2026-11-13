import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { createTestUser, testAuthCookie } from "./mock-supabase.mjs";

const BASE_URL = "http://localhost:3100";
const sessions = new WeakMap<BrowserContext, { storageKey: string }>();

async function authenticate(context: BrowserContext) {
  const existing = sessions.get(context);
  if (existing) return existing;

  const user = createTestUser();
  const session = { storageKey: `kbr:user:${user.id}:v1` };
  sessions.set(context, session);
  await context.addCookies([
    { ...testAuthCookie(Date.now(), user), url: BASE_URL },
  ]);
  return session;
}

async function seedLesson(context: BrowserContext, id: string) {
  const session = await authenticate(context);
  await context.addInitScript(
    ({ key, lessonId }) => {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            v: 1,
            lessons: { [lessonId]: { done: true, score: 100 } },
            cards: {},
            history: [],
            streak: 0,
            dailyGoal: 10,
            lastActive: "2020-01-01T00:00:00.000Z",
          }),
        );
      } catch {
        /* documento sem origem utilizável */
      }
    },
    { key: session.storageKey, lessonId: id },
  );
}

async function openFirstAudioExercise(page: Page) {
  await page.goto("/hangul/h02");
  await page.getByRole("button", { name: "Começar a prática" }).click();
  await expect(
    page.getByRole("button", { name: "Ouvir o áudio" }),
  ).toBeVisible();
}

test.describe("áudio estático do currículo", () => {
  test.beforeEach(async ({ context }) => {
    await seedLesson(context, "h01");
  });

  test("serve o MP3 do corpus com cache imutável", async ({ request }) => {
    for (const src of [
      "/audio/v1/ko-cdd08b15.mp3",
      "/audio/v1/ko-2620702c.mp3",
      // MP3 gerado na Fase 14 para o B1
      "/audio/v1/ko-181625df.mp3",
    ]) {
      const response = await request.get(src);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("audio/mpeg");
      expect(response.headers()["cache-control"]).toContain("immutable");
    }
  });

  test("MP3 que falha mostra indisponibilidade sem usar voz do navegador", async ({
    page,
  }) => {
    await page.route("**/audio/v1/*.mp3", (route) => route.abort());

    const speechCalls: string[] = [];
    await page.addInitScript(() => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      const originalSpeak = synth.speak.bind(synth);
      Object.defineProperty(synth, "speak", {
        configurable: true,
        value: (utterance: SpeechSynthesisUtterance) => {
          (window as unknown as { __kbrSpeech: string[] }).__kbrSpeech ??= [];
          (window as unknown as { __kbrSpeech: string[] }).__kbrSpeech.push(
            utterance.text,
          );
          originalSpeak(utterance);
        },
      });
    });

    await openFirstAudioExercise(page);
    await page.getByRole("button", { name: "Ouvir o áudio" }).click();

    await expect(
      page.getByText(
        "Não foi possível reproduzir o áudio agora. Use a dica de som abaixo.",
        { exact: true },
      ),
    ).toBeVisible({ timeout: 10_000 });
    speechCalls.push(
      ...(await page.evaluate(
        () => (window as unknown as { __kbrSpeech?: string[] }).__kbrSpeech ?? [],
      )),
    );
    expect(speechCalls).toEqual([]);
    await expect(page.getByText(/Reproduzindo/)).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Ouvir novamente" }),
    ).toHaveCount(0);
  });

  test("toca o MP3 do corpus e permite repetir", async ({ page }) => {
    await page.addInitScript(() => {
      const rates: number[] = [];
      (window as unknown as { __kbrRates: number[] }).__kbrRates = rates;
      const originalPlay = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function play() {
        rates.push(this.playbackRate);
        return originalPlay.call(this);
      };
    });

    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/audio/v1/")) {
        requests.push(request.url());
      }
    });

    await openFirstAudioExercise(page);
    await page.getByRole("button", { name: "Ouvir o áudio" }).click();

    await expect.poll(() => requests.length).toBeGreaterThan(0);
    expect(requests[0]).toMatch(/\/audio\/v1\/ko-[0-9a-f]{8}\.mp3$/);
    await expect(
      page.getByRole("button", { name: "Ouvir novamente" }),
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Áudio concluído.", { exact: true })).toBeVisible();

    const rates = await page.evaluate(
      () => (window as unknown as { __kbrRates: number[] }).__kbrRates,
    );
    expect(rates).toContain(1);
  });

  test("aplica 0,75× com preservação de pitch", async ({ page }) => {
    await page.addInitScript(() => {
      const rates: number[] = [];
      (window as unknown as { __kbrRates: number[] }).__kbrRates = rates;
      const originalPlay = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function play() {
        rates.push(this.playbackRate);
        return originalPlay.call(this);
      };
    });

    await openFirstAudioExercise(page);
    await page
      .getByRole("button", { name: "Velocidade 1×; alterar para 0,5×" })
      .click();
    await expect(
      page.getByRole("button", {
        name: "Velocidade 0,5×; alterar para 0,75×",
      }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Velocidade 0,5×; alterar para 0,75×" })
      .click();
    await expect(
      page.getByRole("button", {
        name: "Velocidade 0,75×; alterar para 1×",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Ouvir o áudio" }).click();
    await expect
      .poll(async () =>
        page.evaluate(
          () => (window as unknown as { __kbrRates: number[] }).__kbrRates,
        ),
      )
      .toContain(0.75);
  });

});
