"use client";
import { CatalogForm } from "@/components/forms/catalog-form";
import {
  useWorkspace,
  type Modal,
} from "@/components/workspace/workspace-provider";
import { createItem, updateItem } from "@/features/items/item-service";
import { normalized } from "@/lib/planner/helpers";

export function CatalogDialog({
  modal,
}: {
  modal: Extract<Modal, { kind: "catalog" }>;
}) {
  const { catalogItems, setCatalogItems, setModal, notify } = useWorkspace();
  return (
    <CatalogForm
      existingName={
        catalogItems.find((item) => item.id === modal.id)?.name || null
      }
      onClose={() => setModal(null)}
      onSave={async (name) => {
        if (
          catalogItems.some(
            (item) =>
              item.id !== modal.id &&
              normalized(item.name) === normalized(name),
          )
        ) {
          return "Món đồ này đã có trong danh mục.";
        }

        const saved = modal.id
          ? await updateItem(modal.id, { name })
          : await createItem({ name });

        setCatalogItems((prev) =>
          modal.id
            ? prev.map((item) => (item.id === saved.id ? saved : item))
            : [saved, ...prev],
        );

        setModal(null);
        notify("Đã cập nhật danh mục đồ dùng.");
        return null;
      }}
    />
  );
}
