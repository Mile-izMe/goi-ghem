"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type DemoUser = { name: string; email: string };
type AuthState = {
  user: DemoUser | null;
  ready: boolean;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
};
const AuthContext = createContext<AuthState | null>(null);
const SESSION_KEY = "goi-ghem:demo-session:v1";

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{
    user: DemoUser | null;
    ready: boolean;
  }>({ user: null, ready: false });
  useEffect(() => {
    let user: DemoUser | null = null;
    try {
      const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "null");
      if (
        stored &&
        typeof stored.name === "string" &&
        typeof stored.email === "string"
      )
        user = stored;
    } catch {
      /* A blocked or invalid store starts a new demo session. */
    }
    // Hydrate browser-only session after the server and first client render agree.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({ user, ready: true });
  }, []);
  function signIn(user: DemoUser) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
      /* In-memory session still works. */
    }
    setSession({ user, ready: true });
  }
  function signOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* Clear the in-memory session too. */
    }
    // A fresh document clears the demo context without racing AuthGate redirects.
    window.location.replace("/");
  }
  return (
    <AuthContext.Provider value={{ ...session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useDemoAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useDemoAuth requires DemoAuthProvider");
  return value;
}
