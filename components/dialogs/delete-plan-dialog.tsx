"use client";
import { Dialog } from "@/components/ui/dialog";
import {
  useWorkspace,
  type Modal,
} from "@/components/workspace/workspace-provider";

export function DeletePlanDialog({
  modal,
}: {
  modal: Extract<Modal, { kind: "delete-plan" }>;
}) {
  const { update, setModal, navigate, notify } = useWorkspace();
  return (
    <Dialog
      title="Xóa kế hoạch này?"
      description={`“${modal.plan.name}” và checklist của chuyến đi sẽ được xóa. Danh mục đồ dùng vẫn được giữ lại.`}
      onClose={() => setModal(null)}
    >
      <div className="dialog-actions">
        <button className="button secondary" onClick={() => setModal(null)}>
          Giữ lại
        </button>
        <button
          className="button destructive"
          onClick={() => {
            const id = modal.plan.id;
            update((previous) => ({
              ...previous,
              plans: previous.plans.filter((plan) => plan.id !== id),
              planItems: previous.planItems.filter((row) => row.planId !== id),
            }));
            setModal(null);
            navigate("plans");
            notify("Đã xóa kế hoạch.");
          }}
        >
          Xóa kế hoạch
        </button>
      </div>
    </Dialog>
  );
}
