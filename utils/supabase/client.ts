import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key)
    throw Object.assign(new Error("Supabase is not configured"), {
      code: "auth_not_configured",
    });
  return createBrowserClient(url, key);
}
