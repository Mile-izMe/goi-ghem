import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = { title: "Đăng ký — Gói ghém" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở trang đăng ký…</p>}>
      <AuthForm mode="register" />
    </Suspense>
  );
}
