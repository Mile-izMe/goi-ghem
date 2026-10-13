"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { getAuthErrorMessage } from "../lib/errors";

type AuthState = { user: User | null; ready: boolean; error: string };
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    ready: false,
    error: "",
  });

  useEffect(() => {
    try {
      const {
        data: { subscription },
      } = createClient().auth.onAuthStateChange((event, session) => {
        // Clear protected UI and the router cache, including sign-out from another tab.
        if (
          event === "SIGNED_OUT" &&
          /^\/app(?:\/|$)/.test(window.location.pathname)
        ) {
          window.location.replace("/");
          return;
        }
        setState({ user: session?.user ?? null, ready: true, error: "" });
      });
      return () => subscription.unsubscribe();
    } catch (error) {
      // Initialization happens only in the browser, after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ user: null, ready: true, error: getAuthErrorMessage(error) });
    }
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth requires AuthProvider");
  return context;
}
