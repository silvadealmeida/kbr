import { defineConfig } from "vitest/config";

/**
 * Config Vitest da auditoria (PASS A). Roda apenas as ferramentas de leitura
 * em `docs/audits/a0-a2/tools`, sem tocar na suíte do projeto.
 */
export default defineConfig({
  test: {
    include: ["docs/audits/a0-a2/tools/**/*.test.ts"],
  },
  resolve: { alias: { "@": new URL("../../../../src", import.meta.url).pathname } },
});
