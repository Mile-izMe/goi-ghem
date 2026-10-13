"use client";

import { Icon } from "@/components/icon";
import { useRegister } from "../hooks/use-register";
import { AuthFormShell } from "./auth-form-shell";

export function RegisterForm() {
  const {
    submit,
    pending,
    disabled,
    error,
    next,
    confirmationEmail,
    resetConfirmation,
  } = useRegister();

  return (
    <AuthFormShell mode="register" next={next}>
      {confirmationEmail ? (
        <div className="auth-confirmation" role="status">
          <Icon name="check-circle" size={28} />
          <h2>Kiểm tra email nhé!</h2>
          <p>
            Yêu cầu đăng ký đã được tiếp nhận. Nếu địa chỉ{" "}
            <strong>{confirmationEmail}</strong> đủ điều kiện đăng ký, bạn sẽ
            nhận được email xác nhận.
          </p>
          <p>
            Mở liên kết trong email trên trình duyệt này để tiếp tục. Nhớ kiểm
            tra cả thư mục spam. Nếu đã có tài khoản, bạn có thể đăng nhập.
          </p>
          <button
            className="button secondary"
            type="button"
            onClick={resetConfirmation}
          >
            Dùng email khác
          </button>
        </div>
      ) : (
        <form
          className="auth-form"
          onSubmit={submit}
          aria-busy={pending}
          aria-describedby={error ? "register-error" : undefined}
        >
          <label>
            Tên của bạn
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={60}
              placeholder="Mình gọi bạn là gì?"
              readOnly={pending}
            />
          </label>
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
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              placeholder="Ít nhất 8 ký tự"
              readOnly={pending}
            />
          </label>
          <label>
            Nhập lại mật khẩu
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              placeholder="Nhập lại mật khẩu của bạn"
              readOnly={pending}
            />
          </label>
          {error && (
            <p id="register-error" className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button primary" type="submit" disabled={disabled}>
            {pending ? "Đang tạo tài khoản…" : "Tạo tài khoản"}
            <Icon name="arrow-right" size={18} />
          </button>
        </form>
      )}
    </AuthFormShell>
  );
}
