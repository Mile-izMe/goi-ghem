"use client";
import { Icon } from "@/components/icon";
import { groupIcons } from "@/lib/planner/helpers";
import type { PlanItem } from "@/lib/planner-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export function ChecklistGroup({
  group,
  members,
  all,
}: {
  group: string;
  members: PlanItem[];
  all: PlanItem[];
}) {
  const { setModal, toggle, removeRow, itemName } = useWorkspace();
  return (
    <section className="check-group" key={group}>
      <div className="group-heading">
        <div>
          <span className="group-icon">
            <Icon name={groupIcons[group] ?? "bag"} size={18} />
          </span>
          <h3>{group}</h3>
          <span className="group-count">
            {all.filter((row) => row.isChecked).length}/{all.length}
          </span>
        </div>
        <button
          className="icon-button"
          aria-label={`Thêm món vào ${group}`}
          onClick={() => setModal({ kind: "item", group })}
        >
          <Icon name="plus" size={17} />
        </button>
      </div>
      <div>
        {members.map((row) => (
          <div
            className={`check-row ${row.isChecked ? "is-checked" : ""}`}
            key={row.id}
          >
            <label className="item-check">
              <input
                type="checkbox"
                checked={row.isChecked}
                onChange={() => toggle(row)}
              />
              <span className="checkbox-visual">
                <Icon name="check" size={13} />
              </span>
              <span className="item-copy">
                <span className="item-name">{itemName(row.itemId)}</span>
                {row.note && <span className="item-note">{row.note}</span>}
              </span>
            </label>
            <span className="quantity">×{row.quantity}</span>
            <button
              className="icon-button row-action"
              aria-label={`Sửa ${itemName(row.itemId)}`}
              onClick={() => setModal({ kind: "item", row })}
            >
              <Icon name="edit" size={15} />
            </button>
            <button
              className="icon-button row-action danger"
              aria-label={`Bỏ ${itemName(row.itemId)}`}
              onClick={() => removeRow(row)}
            >
              <Icon name="x" size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
