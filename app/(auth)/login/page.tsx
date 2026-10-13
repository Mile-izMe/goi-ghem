import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = { title: "Đăng nhập — Gói ghém" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở trang đăng nhập…</p>}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
