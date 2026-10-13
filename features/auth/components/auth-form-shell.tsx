import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

export function AuthFormShell({
  mode,
  next,
  children,
}: {
  mode: "login" | "register";
  next: string;
  children: ReactNode;
}) {
  const register = mode === "register";

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
          ? "Tạo tài khoản để bắt đầu một hành trình mới."
          : "Vào xem những chuyến đi và checklist đang chờ bạn."}
      </p>
      {children}
      <p className="auth-switch">
        {register ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
        <Link
          href={`/${register ? "login" : "register"}?next=${encodeURIComponent(next)}`}
        >
          {register ? "Đăng nhập" : "Đăng ký ngay"}
        </Link>
      </p>
    </div>
  );
}
