import { describe, expect, test, vi } from "vitest";
import { protectedView } from "@/lib/auth/access";
import {
  loginRedirectPath,
  oauthCallbackPath,
  safeNextPath,
} from "@/lib/auth/redirect";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

describe("autenticação", () => {
  test.each([
    ["/", "/"],
    ["/revisao?origem=login", "/revisao?origem=login"],
    ["/revisao?origem=login#topo", "/revisao?origem=login#topo"],
    ["https://evil.example", "/"],
    ["//evil.example", "/"],
    ["/\\evil.example", "/"],
    ["/%5Cevil.example", "/"],
    ["/%5cevil.example", "/"],
    ["/%2F%2Fevil.example", "/"],
    ["/\t/evil.example", "/"],
    [null, "/"],
  ])("limita o redirecionamento OAuth ao próprio site", (input, expected) => {
    expect(safeNextPath(input)).toBe(expected);
  });

  test("usa o destino padrão apenas para entrada inválida", () => {
    expect(safeNextPath(null, "/dashboard")).toBe("/dashboard");
    expect(safeNextPath("https://evil.example", "/dashboard")).toBe("/dashboard");
    expect(safeNextPath("//evil.example", "/dashboard")).toBe("/dashboard");
    expect(safeNextPath("/hangul", "/dashboard")).toBe("/hangul");
    expect(safeNextPath("/hangul", "//evil.example")).toBe("/hangul");
  });

  test("monta o login preservando o retorno interno e o motivo", () => {
    const expired = new URL(
      loginRedirectPath("/revisao?filtro=hoje", "sessao-expirada"),
      "https://kbr.invalid",
    );
    expect(expired.pathname).toBe("/");
    expect(expired.searchParams.get("next")).toBe("/revisao?filtro=hoje");
    expect(expired.searchParams.get("motivo")).toBe("sessao-expirada");

    const unavailable = new URL(
      loginRedirectPath("/dashboard", "indisponivel"),
      "https://kbr.invalid",
    );
    expect(unavailable.searchParams.get("next")).toBe("/dashboard");
    expect(unavailable.searchParams.get("motivo")).toBe("indisponivel");
  });

  test("nunca envia retorno externo ao login", () => {
    expect(loginRedirectPath("https://evil.example")).toBe("/");
    expect(loginRedirectPath("//evil.example", "sessao-expirada")).toBe(
      "/?motivo=sessao-expirada",
    );
  });

  test("a callback OAuth aponta para o painel por padrão", () => {
    expect(oauthCallbackPath("/hangul")).toBe("/auth/callback?next=%2Fhangul");
    expect(oauthCallbackPath(null)).toBe("/auth/callback?next=%2Fdashboard");
    expect(oauthCallbackPath("https://evil.example")).toBe(
      "/auth/callback?next=%2Fdashboard",
    );
  });

  test("resolve os estados de acesso da área autenticada", () => {
    expect(protectedView("authenticated")).toBe("content");
    expect(protectedView("loading")).toBe("content");
    expect(protectedView("guest")).toBe("redirect");
    expect(protectedView("unavailable")).toBe("unavailable");
  });

  test("só habilita Supabase com URL e chave públicas válidas", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    expect(getSupabasePublicConfig()).toEqual({
      url: "https://project.supabase.co",
      publishableKey: "sb_publishable_test",
    });

    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "javascript:alert(1)");
    expect(getSupabasePublicConfig()).toBeNull();
    vi.unstubAllEnvs();
  });
});
