import { createClient } from "@/utils/supabase/client";
import type { LoginInput, RegisterInput } from "../lib/validation";

export async function login(input: LoginInput) {
  const { data, error } = await createClient().auth.signInWithPassword({
    email: input.email.trim(),
    password: input.password,
  });
  if (error) throw error;
  return data;
}

export async function register(input: RegisterInput, origin: string) {
  const { data, error } = await createClient().auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: { full_name: input.fullName.trim() },
      emailRedirectTo: new URL("/auth/callback", origin).href,
    },
  });
  if (error) throw error;
  // Confirm email enabled: Supabase returns no session until the link is opened.
  return { needsEmailConfirmation: !data.session };
}

export async function logout() {
  const { error } = await createClient().auth.signOut({ scope: "local" });
  if (error) throw error;
}
