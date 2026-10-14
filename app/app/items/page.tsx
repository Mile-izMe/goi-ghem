// This mock route waits for the browser-only demo session before rendering.
export const instant = false;
import { ItemsView } from "@/features/items/components/items-view";

export const metadata = { title: "Danh mục đồ dùng — Gói ghém" };

export default function Page() {
  return <ItemsView />;
}
