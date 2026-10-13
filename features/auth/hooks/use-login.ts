"use client";

import { useRef, useState, type FormEvent } from "react";
import { login } from "../services/auth-service";
import { validateLogin } from "../lib/validation";
import { getAuthErrorMessage } from "../lib/errors";
import { useAuthDestination } from "./use-auth-destination";

export function useLogin() {
  const auth = useAuthDestination();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const input = {
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    };
    const invalid = validateLogin(input);
    setError(invalid ?? "");
    if (invalid) return;
    submitting.current = true;
    setPending(true);
    try {
      await login(input);
      window.location.replace(auth.next);
    } catch (error) {
      setError(getAuthErrorMessage(error));
      submitting.current = false;
      setPending(false);
    }
  }

  return {
    submit,
    pending,
    next: auth.next,
    disabled: !auth.ready || !!auth.user || !!auth.error || pending,
    error:
      error ||
      auth.error ||
      (auth.confirmationFailed
        ? "Liên kết xác nhận không hợp lệ hoặc đã hết hạn. Nếu đã xác nhận email, bạn có thể đăng nhập bên dưới."
        : ""),
  };
}
