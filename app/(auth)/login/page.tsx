import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata = { title: "Đăng nhập — Gói ghém" };

export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở trang đăng nhập…</p>}>
      <LoginForm />
    </Suspense>
  );
}
