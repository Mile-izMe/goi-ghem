import Link from "next/link";
import { Icon } from "@/components/icon";
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-brand" aria-label="Gói ghém — trang chủ">
        <Icon name="logo" size={31} />
        <span>
          gói ghém<span>.</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Giới thiệu">
        <a href="#features">Có gì hay?</a>
        <a href="#how-it-works">Cách bắt đầu</a>
      </nav>
      <div className="site-auth-links">
        <Link href="/login" className="site-login">
          Đăng nhập
        </Link>
        <Link href="/register" className="button primary">
          Bắt đầu <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </header>
  );
}
