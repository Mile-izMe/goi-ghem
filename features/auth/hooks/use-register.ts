"use client";

import { useRef, useState, type FormEvent } from "react";
import { register } from "../services/auth-service";
import { validateRegister } from "../lib/validation";
import { getAuthErrorMessage } from "../lib/errors";
import { useAuthDestination } from "./use-auth-destination";

export function useRegister() {
  const auth = useAuthDestination();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      fullName: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    };
    const invalid = validateRegister(input);
    setError(invalid ?? "");
    if (invalid) return;
    submitting.current = true;
    setPending(true);
    try {
      const result = await register(input, window.location.origin);
      if (!result.needsEmailConfirmation) {
        window.location.replace(auth.next);
        return;
      }
      setConfirmationEmail(input.email.trim());
      form.reset();
    } catch (error) {
      setError(getAuthErrorMessage(error));
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return {
    submit,
    pending,
    next: auth.next,
    error: error || auth.error,
    confirmationEmail,
    resetConfirmation: () => setConfirmationEmail(""),
    disabled: !auth.ready || !!auth.user || !!auth.error || pending,
  };
}
