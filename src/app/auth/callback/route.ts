import { NextResponse, type NextRequest } from "next/server";
import { AUTH_NEXT_COOKIE, callbackDestination } from "@/lib/auth/next-cookie";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function redirectAndClear(url: URL) {
  const response = NextResponse.redirect(url);
  response.cookies.set(AUTH_NEXT_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = callbackDestination(
    request.nextUrl.searchParams.get("next"),
    request.cookies.get(AUTH_NEXT_COOKIE)?.value ?? null,
  );
  const supabase = await createServerSupabaseClient();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return redirectAndClear(new URL(next, request.url));
  }

  return redirectAndClear(new URL("/auth/error", request.url));
}
