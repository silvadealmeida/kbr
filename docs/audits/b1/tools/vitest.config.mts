import { defineConfig } from "vitest/config";

// Config separada da 12B: roda SOMENTE os testes de auditoria (leitura do
// conteúdo + validadores compartilhados) sem tocar no vitest.config.ts raiz.
export default defineConfig({
  resolve: {
    alias: { "@": new URL("../../../../src", import.meta.url).pathname },
  },
  test: {
    root: new URL("..", import.meta.url).pathname,
    include: ["tools/content/**/*.test.ts"],
  },
});
