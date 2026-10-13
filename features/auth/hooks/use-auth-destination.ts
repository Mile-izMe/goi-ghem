"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../components/auth-provider";
import { getAuthRedirect } from "../lib/redirects";

export function useAuthDestination() {
  const params = useSearchParams();
  const auth = useAuth();
  const next = getAuthRedirect(params.get("next"));
  useEffect(() => {
    if (auth.ready && auth.user) window.location.replace(next);
  }, [auth.ready, auth.user, next]);
  return {
    ...auth,
    next,
    confirmationFailed: params.get("error") === "confirmation_failed",
  };
}
