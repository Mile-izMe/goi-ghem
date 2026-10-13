import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import "../marketing.css";
import "./auth.css";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <aside className="auth-story">
        <Link href="/" className="site-brand">
          <Icon name="logo" size={32} />
          <span>
            gói ghém<span>.</span>
          </span>
        </Link>
        <div className="auth-story-copy">
          <span className="landing-kicker">
            ÍT LO CHUẨN BỊ. NHIỀU HƠN TRẢI NGHIỆM.
          </span>
          <h2>
            Để tâm trí
            <br />
            lang thang.
            <br />
            <em>Hành lý đã gọn gàng.</em>
          </h2>
          <p>
            Một chiếc checklist nhỏ,
            <br />
            cho những hành trình thật lớn.
          </p>
        </div>
        <div className="auth-story-foot">
          <Icon name="pin" size={17} />
          <span>Đi đâu cũng được. Miễn là mình đã sẵn sàng.</span>
        </div>
      </aside>
      <section className="auth-panel">{children}</section>
    </main>
  );
}
