"use client";
import { ItemForm } from "@/components/forms/item-form";
import {
  useWorkspace,
  type Modal,
} from "@/components/workspace/workspace-provider";
import { makeId } from "@/lib/planner-data";
import { normalized } from "@/lib/planner/helpers";
import { appendItems } from "@/lib/planner/mutations";
export function ItemDialog({
  modal,
}: {
  modal: Extract<Modal, { kind: "item" }>;
}) {
  const { data, selected, itemName, update, setModal, notify } = useWorkspace();
  if (!selected) return null;
  return (
    <ItemForm
      row={modal.row}
      name={modal.row ? itemName(modal.row.itemId) : ""}
      group={modal.group}
      data={data}
      onClose={() => setModal(null)}
      onSave={(values) => {
        update((previous) => {
          if (!modal.row) return appendItems(previous, selected.id, [values]);
          const row = modal.row;
          let items = previous.items;
          let item = items.find(
            (item) => normalized(item.name) === normalized(values.name),
          );
          if (!item) {
            item = {
              id: makeId("item"),
              userId: "demo-user",
              name: values.name,
            };
            items = [...items, item];
          }
          return {
            ...previous,
            items,
            planItems: previous.planItems.map((other) =>
              other.id === row.id
                ? {
                    ...other,
                    itemId: item.id,
                    quantity: values.quantity,
                    note: values.note,
                    group: values.group,
                    isChecked:
                      other.itemId !== item.id ||
                      values.quantity > other.quantity
                        ? false
                        : other.isChecked,
                  }
                : other,
            ),
          };
        });
        setModal(null);
        notify("Đã lưu món đồ vào checklist.");
      }}
    />
  );
}
