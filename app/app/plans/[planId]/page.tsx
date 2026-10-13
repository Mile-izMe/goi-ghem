// This mock route waits for the browser-only demo session before rendering.
export const instant = false;
import { PlanDetail } from "@/components/checklist/plan-detail";
export const metadata = { title: "Checklist chuyến đi — Gói ghém" };
export default async function Page({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  return <PlanDetail key={planId} planId={planId} />;
}
