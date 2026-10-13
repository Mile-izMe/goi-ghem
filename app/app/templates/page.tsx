// This mock route waits for the browser-only demo session before rendering.
export const instant = false;
import { TemplatesView } from "@/components/templates/templates-view";
export const metadata = { title: "Checklist mẫu — Gói ghém" };
export default function Page() {
  return <TemplatesView />;
}
