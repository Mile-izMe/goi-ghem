"use client";
import { PlanForm } from "@/components/forms/plan-form";
import {
  useWorkspace,
  type Modal,
} from "@/components/workspace/workspace-provider";
import { makeId, type Plan, type PlannerData } from "@/lib/planner-data";
import { appendItems } from "@/lib/planner/mutations";
export function PlanDialog({
  modal,
}: {
  modal: Extract<Modal, { kind: "plan" }>;
}) {
  const { update, setModal, openPlan, notify } = useWorkspace();
  return (
    <PlanForm
      plan={modal.plan}
      template={modal.template}
      onClose={() => setModal(null)}
      onSave={(values, template) => {
        const id = modal.plan?.id ?? makeId("plan");
        update((previous) => {
          if (modal.plan)
            return {
              ...previous,
              plans: previous.plans.map((plan) =>
                plan.id === id ? { ...plan, ...values } : plan,
              ),
            };
          const plan: Plan = {
            ...values,
            id,
            userId: "demo-user",
            createdAt: new Date().toISOString(),
          };
          let next: PlannerData = {
            ...previous,
            plans: [...previous.plans, plan],
          };
          if (template) next = appendItems(next, id, template.items);
          return next;
        });
        setModal(null);
        openPlan(id);
        notify(
          modal.plan
            ? "Đã cập nhật kế hoạch."
            : "Chuyến đi mới đã sẵn sàng để gói ghém.",
        );
      }}
    />
  );
}
