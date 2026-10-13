import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const protectedRoute = /^\/app(?:\/|$)/.test(request.nextUrl.pathname);
  let authenticated = false;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll(cookies, headers) {
            cookies.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            const previous = response;
            response = NextResponse.next({ request });
            previous.cookies
              .getAll()
              .forEach((cookie) => response.cookies.set(cookie));
            cookies.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
            Object.entries(headers).forEach(([name, value]) =>
              response.headers.set(name, value),
            );
          },
        },
      },
    );
    const { data, error } = await supabase.auth.getClaims();
    authenticated = !error && !!data?.claims?.sub;
  } catch {
    // Fail closed for protected routes if verification is unavailable.
  }

  if (protectedRoute && !authenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    redirect.headers.set("Cache-Control", "private, no-store");
    return redirect;
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
