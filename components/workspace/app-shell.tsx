"use client";
import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { Sidebar } from "./sidebar";
import { useWorkspace } from "./workspace-provider";
export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const { selected, storageError } = useWorkspace();
  const pathname = usePathname();
  const title =
    selected?.destination ??
    (pathname.startsWith("/app/items")
      ? "Danh mục đồ dùng"
      : pathname.startsWith("/app/templates")
        ? "Checklist mẫu"
        : "Kế hoạch của tôi");
  return (
    <div className="app-shell">
      <Sidebar open={mobileNav} onClose={() => setMobileNav(false)} />
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Mở menu"
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(true)}
            >
              <Icon name="menu" />
            </button>
            <span>Không gian cá nhân</span>
            <Icon name="chevron-right" size={14} />
            <strong>{title}</strong>
          </div>
          <span className="local-badge">
            <span />
            Dữ liệu mẫu
          </span>
        </header>
        {storageError && (
          <div role="alert" className="storage-warning">
            <Icon name="alert" size={18} />
            Không thể lưu vào trình duyệt. Thay đổi hiện chỉ được giữ trong
            phiên này.
          </div>
        )}
        <main className="workspace-main">{children}</main>
      </div>
    </div>
  );
}
