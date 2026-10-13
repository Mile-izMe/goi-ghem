"use client";
import { BulkForm } from "@/components/forms/bulk-form";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { appendItems } from "@/lib/planner/mutations";
export function BulkDialog() {
  const { selected, update, setModal, notify } = useWorkspace();
  if (!selected) return null;
  return (
    <BulkForm
      onClose={() => setModal(null)}
      onSave={(names, group) => {
        update((previous) =>
          appendItems(
            previous,
            selected.id,
            names.map((name) => ({ name, group, quantity: 1, note: "" })),
          ),
        );
        setModal(null);
        notify(`Đã nhập ${names.length} dòng. Món trùng được cộng số lượng.`);
      }}
    />
  );
}
