import { NextRequest } from "next/server";
import { beforeEach, describe, expect, test, vi } from "vitest";

const { getClaims } = vi.hoisted(() => ({ getClaims: vi.fn() }));

vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({ auth: { getClaims } }),
}));

vi.mock("@/lib/supabase/config", () => ({
  getSupabasePublicConfig: () => ({
    url: "https://project.supabase.co",
    publishableKey: "sb_publishable_test",
  }),
}));

import { updateSupabaseSession } from "@/lib/supabase/proxy";

const authenticated = () =>
  getClaims.mockResolvedValue({ data: { claims: { sub: "user-1" } }, error: null });
const anonymous = () => getClaims.mockResolvedValue({ data: { claims: null }, error: null });

function request(path: string, cookie?: string) {
  return new NextRequest(`https://kbr.test${path}`, {
    headers: cookie ? { cookie } : undefined,
  });
}

function location(response: Response) {
  return new URL(response.headers.get("location") ?? "", "https://kbr.test");
}

beforeEach(() => {
  getClaims.mockReset();
});

describe("proxy de sessão", () => {
  test("visitante vê a landing pública", async () => {
    anonymous();
    const response = await updateSupabaseSession(request("/"));
    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  test("usuário autenticado na landing vai para o painel", async () => {
    authenticated();
    const response = await updateSupabaseSession(request("/"));
    expect(response.status).toBe(307);
    expect(location(response).pathname).toBe("/dashboard");
  });

  test("deep link autenticado preserva o destino interno", async () => {
    authenticated();
    const response = await updateSupabaseSession(request("/?next=%2Fhangul"));
    expect(location(response).pathname).toBe("/hangul");
  });

  test("landing nunca é destino final do login", async () => {
    authenticated();
    for (const next of ["%2F", "%2F%3Fmotivo%3Dsessao-expirada", "https%3A%2F%2Fevil.example"]) {
      const response = await updateSupabaseSession(request(`/?next=${next}`));
      expect(location(response).pathname).toBe("/dashboard");
    }
  });

  test("visitante é devolvido ao login com o caminho original", async () => {
    anonymous();
    const response = await updateSupabaseSession(request("/hangul?aba=vogais"));
    expect(location(response).pathname).toBe("/");
    expect(location(response).searchParams.get("next")).toBe("/hangul?aba=vogais");
    expect(location(response).searchParams.get("motivo")).toBeNull();
  });

  test("cookie de sessão inválido indica sessão expirada", async () => {
    anonymous();
    const response = await updateSupabaseSession(
      request("/revisao", "sb-teste-auth-token=sessao-invalida"),
    );
    expect(location(response).searchParams.get("motivo")).toBe("sessao-expirada");
  });

  test("falha de autenticação não leva a rota privada", async () => {
    getClaims.mockResolvedValue({ data: null, error: { message: "invalid" } });
    const response = await updateSupabaseSession(request("/dashboard"));
    expect(location(response).pathname).toBe("/");
    expect(location(response).searchParams.get("next")).toBe("/dashboard");
  });

  test("autenticado acessa a rota privada normalmente", async () => {
    authenticated();
    const response = await updateSupabaseSession(request("/hangul"));
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
