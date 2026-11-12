import { defineConfig, devices } from "@playwright/test";

const E2E_SUPABASE_URL = "http://127.0.0.1:54321";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    command: "npm run build && node e2e/run-e2e-server.mjs",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 180_000,
    env: {
      ...process.env,
      // Supabase de teste local: auth mock + REST vazio. Nunca use em produção.
      NEXT_PUBLIC_SUPABASE_URL: E2E_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "e2e-publishable-key",
      NEXT_PUBLIC_SUPABASE_AUTH_CALLBACK_URL: `${E2E_SUPABASE_URL}/auth/v1/callback`,
    },
  },
  use: { baseURL: "http://localhost:3100" },
  projects: [
    { name: "mobile-375", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true } },
    { name: "mobile-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, hasTouch: true, isMobile: true } },
    { name: "desktop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    // Cobertura Safari/WebKit: fumaça, PWA, acessibilidade e fluxos móveis.
    {
      name: "webkit-390",
      use: { ...devices["iPhone 13"] },
      testMatch: /(a1|a2|smoke|pwa|a11y|webkit|audio|speech|vocabulary)\.spec\.ts/,
    },
  ],
});
