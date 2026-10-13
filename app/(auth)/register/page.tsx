import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/components/register-form";
export const metadata = { title: "Đăng ký — Gói ghém" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở trang đăng ký…</p>}>
      <RegisterForm />
    </Suspense>
  );
}
