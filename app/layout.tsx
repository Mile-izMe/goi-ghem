import type { Metadata } from "next";
import "./globals.css";
import { DemoAuthProvider } from "@/components/auth/demo-auth-provider";

export const metadata: Metadata = {
  title: "Gói ghém — Sẵn sàng cho chuyến đi",
  description:
    "Lên kế hoạch, chuẩn bị hành lý và lưu lại những checklist cho chuyến đi của bạn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <DemoAuthProvider>{children}</DemoAuthProvider>
      </body>
    </html>
  );
}
