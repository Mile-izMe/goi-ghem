"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icon";
import { useDemoAuth } from "@/components/auth/demo-auth-provider";
import { useWorkspace } from "./workspace-provider";
const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/app/plans", label: "Kế hoạch của tôi", icon: "grid" },
  { href: "/app/items", label: "Danh mục đồ dùng", icon: "bag" },
  { href: "/app/templates", label: "Checklist mẫu", icon: "template" },
];
export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const { user, signOut } = useDemoAuth();
  const { data, initialDate } = useWorkspace();
  const upcoming = data.plans
    .filter((plan) => plan.endDate >= initialDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return (
    <>
      {open && (
        <button
          className="nav-backdrop"
          aria-label="Đóng menu"
          onClick={onClose}
        />
      )}
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <Link className="brand" href="/" onClick={onClose}>
          <span className="brand-symbol">
            <Icon name="logo" size={27} />
          </span>
          <span>
            gói ghém<span className="brand-dot">.</span>
          </span>
        </Link>
        <div className="workspace-label">KHÔNG GIAN CỦA BẠN</div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={pathname.startsWith(link.href) ? "active" : ""}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              <Icon name={link.icon} />
              {link.label}
              {link.href === "/app/plans" && (
                <span className="nav-count">{data.plans.length}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-trips">
          <div className="workspace-label">CHUYẾN ĐI SẮP TỚI</div>
          {upcoming.slice(0, 3).map((plan) => (
            <Link
              href={`/app/plans/${plan.id}`}
              key={plan.id}
              onClick={onClose}
              className={
                pathname === `/app/plans/${plan.id}` ? "selected-trip" : ""
              }
            >
              <span className={`trip-dot ${plan.cover}`} />
              {plan.destination}
              <Icon name="chevron-right" size={14} />
            </Link>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="little-note">
            <Icon name="sun" size={24} />
            <p>
              Ít lo chuẩn bị.
              <br />
              <strong>Nhiều hơn trải nghiệm.</strong>
            </p>
            <span>Mỗi chuyến đi bắt đầu từ một chút gói ghém.</span>
          </div>
          <div className="profile">
            <span className="avatar">
              {user?.name.charAt(0).toUpperCase() ?? "B"}
            </span>
            <div>
              <strong title={user?.name}>
                {user?.name ?? "Bạn đồng hành"}
              </strong>
              <span>Phiên trải nghiệm</span>
            </div>
            <button
              className="logout-button"
              onClick={() => {
                signOut();

              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
