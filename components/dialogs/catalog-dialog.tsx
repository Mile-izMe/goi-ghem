"use client";
import { CatalogForm } from "@/components/forms/catalog-form";
import {
  useWorkspace,
  type Modal,
} from "@/components/workspace/workspace-provider";
import { makeId } from "@/lib/planner-data";
import { normalized } from "@/lib/planner/helpers";
export function CatalogDialog({
  modal,
}: {
  modal: Extract<Modal, { kind: "catalog" }>;
}) {
  const { data, itemName, update, setModal, notify } = useWorkspace();
  return (
    <CatalogForm
      existingName={modal.id ? itemName(modal.id) : ""}
      onClose={() => setModal(null)}
      onSave={(name) => {
        if (
          data.items.some(
            (item) =>
              item.id !== modal.id &&
              normalized(item.name) === normalized(name),
          )
        )
          return "Món đồ này đã có trong danh mục.";
        update((previous) => ({
          ...previous,
          items: modal.id
            ? previous.items.map((item) =>
                item.id === modal.id ? { ...item, name } : item,
              )
            : [
                ...previous.items,
                { id: makeId("item"), userId: "demo-user", name },
              ],
        }));
        setModal(null);
        notify("Đã cập nhật danh mục đồ dùng.");
        return null;
      }}
    />
  );
}
