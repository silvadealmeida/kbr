import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "e2e",
  webServer: { command: "npm run build && npm run start -- -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 180_000 },
  use: { baseURL: "http://localhost:3100" },
  projects: [
    { name: "mobile-375", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true } },
    { name: "mobile-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "desktop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
  ],
});
