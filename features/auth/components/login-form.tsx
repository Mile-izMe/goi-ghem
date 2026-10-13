"use client";

import { Icon } from "@/components/icon";
import { useLogin } from "../hooks/use-login";
import { AuthFormShell } from "./auth-form-shell";

export function LoginForm() {
  const { submit, pending, disabled, error, next } = useLogin();

  return (
    <AuthFormShell mode="login" next={next}>
      <form
        className="auth-form"
        onSubmit={submit}
        aria-busy={pending}
        aria-describedby={error ? "login-error" : undefined}
      >
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="ban@example.com"
            readOnly={pending}
          />
        </label>
        <label>
          Mật khẩu
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Nhập mật khẩu của bạn"
            readOnly={pending}
          />
        </label>
        {error && (
          <p id="login-error" className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button primary" type="submit" disabled={disabled}>
          {pending ? "Đang đăng nhập…" : "Đăng nhập"}
          <Icon name="arrow-right" size={18} />
        </button>
      </form>
    </AuthFormShell>
  );
}
