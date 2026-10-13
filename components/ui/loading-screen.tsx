import { Icon } from "@/components/icon";
export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status">
      <Icon name="logo" size={36} />
      <p>Đang mở không gian của bạn…</p>
    </div>
  );
}
