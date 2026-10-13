// This mock route waits for the browser-only demo session before rendering.
export const instant = false;
import { PlansView } from "@/components/plans/plans-view";
export const metadata = { title: "Kế hoạch của tôi — Gói ghém" };
export default function Page() {
  return <PlansView />;
}
