"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/icon";
import { useDemoAuth } from "./demo-auth-provider";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const register = mode === "register";
  const { signIn, user, ready } = useDemoAuth();
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("next") ?? "";
  const next =
    /^\/app(?:\/(?:plans(?:\/[a-zA-Z0-9_-]+)?|items|templates))?$/.test(
      requested,
    )
      ? requested
      : "/app/plans";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, router, next]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim();
    const password = String(data.get("password"));
    const name = register
      ? String(data.get("name")).trim()
      : email.split("@")[0];
    if (!name) return setError("Nhập tên để mình biết gọi bạn là gì nhé.");
    if (password.length < 8) return setError("Mật khẩu cần ít nhất 8 ký tự.");
    if (register && password !== String(data.get("confirmPassword")))
      return setError("Hai mật khẩu chưa khớp nhau.");
    setPending(true);
    // UI-only session: do not persist credentials or call any auth service.
    signIn({ name, email });
    router.replace(next);
  }
  const switchHref = `/${register ? "login" : "register"}${requested ? `?next=${encodeURIComponent(next)}` : ""}`;
  return (
    <div className="auth-form-wrap">
      <Link href="/" className="auth-back">
        <Icon name="arrow-left" size={16} /> Về trang giới thiệu
      </Link>
      <span className="landing-kicker">
        {register
          ? "MỖI CHUYẾN ĐI BẮT ĐẦU TỪ ĐÂY"
          : "CHÀO BẠN, LẠI LÀ MÌNH ĐÂY"}
      </span>
      <h1>
        {register
          ? "Một chỗ cho những\nchuyến đi của bạn."
          : "Mình gói ghém\ntiếp nhé?"}
      </h1>
      <p className="auth-subtitle">
        {register
          ? "Tạo không gian riêng, bắt đầu một hành trình mới."
          : "Vào xem những chuyến đi và checklist đang chờ bạn."}
      </p>
      <form className="auth-form" onSubmit={submit}>
        {register && (
          <label>
            Tên của bạn
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={60}
              placeholder="Mình gọi bạn là gì?"
            />
          </label>
        )}
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="ban@example.com"
          />
        </label>
        <label>
          Mật khẩu
          <input
            name="password"
            type="password"
            autoComplete={register ? "new-password" : "current-password"}
            minLength={8}
            required
            maxLength={128}
            placeholder="Ít nhất 8 ký tự"
          />
        </label>
        {register && (
          <label>
            Nhập lại mật khẩu
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              maxLength={128}
              placeholder="Nhập lại mật khẩu của bạn"
            />
          </label>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="button primary"
          type="submit"
          disabled={!ready || pending || !!user}
        >
          {pending
            ? "Đang mở không gian…"
            : register
              ? "Đăng ký trải nghiệm"
              : "Đăng nhập trải nghiệm"}
          <Icon name="arrow-right" size={18} />
        </button>
      </form>
      <div className="auth-demo-note">
        <Icon name="coffee" size={19} />
        <p>
          <strong>Bạn đang dùng bản demo.</strong> Chưa tạo tài khoản thật; mật
          khẩu không được lưu. Nhập email và mật khẩu hợp lệ để trải nghiệm. Dữ
          liệu mẫu dùng chung trên trình duyệt này.
        </p>
      </div>
      <p className="auth-switch">
        {register ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
        <Link href={switchHref}>{register ? "Đăng nhập" : "Đăng ký ngay"}</Link>
      </p>
    </div>
  );
}
