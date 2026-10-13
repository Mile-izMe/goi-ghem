import "server-only";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getAuthRedirect } from "../lib/redirects";

export async function completeAuth(
  request: NextRequest,
  mode: "code" | "token",
) {
  const params = request.nextUrl.searchParams;
  const next = getAuthRedirect(params.get("next"));
  const failure = new URL("/login", request.url);
  failure.searchParams.set("error", "confirmation_failed");
  failure.searchParams.set("next", next);
  const response = NextResponse.redirect(failure);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  const code = params.get("code");
  const tokenHash = params.get("token_hash");
  const type = params.get("type");
  if (
    mode === "code"
      ? !code
      : !tokenHash || (type !== "email" && type !== "signup")
  )
    return response;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll(cookies, headers) {
            cookies.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
            Object.entries(headers).forEach(([name, value]) =>
              response.headers.set(name, value),
            );
          },
        },
      },
    );
    const result =
      mode === "code"
        ? await supabase.auth.exchangeCodeForSession(code!)
        : await supabase.auth.verifyOtp({
            token_hash: tokenHash!,
            type: type as "email" | "signup",
          });
    if (!result.error && result.data.session)
      response.headers.set("Location", new URL(next, request.url).href);
  } catch {
    // Keep the same generic error URL; never expose tokens or provider errors.
  }
  return response;
}
