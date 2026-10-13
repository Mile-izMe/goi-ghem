"use client";
import { useState } from "react";
import { groups, type PlanItem, type PlannerData } from "@/lib/planner-data";
import { normalized } from "@/lib/planner/helpers";
import type { ItemValues } from "@/lib/planner/mutations";
import { Dialog } from "@/components/ui/dialog";
export function ItemForm({
  row,
  name,
  group,
  data,
  onClose,
  onSave,
}: {
  row?: PlanItem;
  name: string;
  group?: string;
  data: PlannerData;
  onClose: () => void;
  onSave: (values: ItemValues) => void;
}) {
  const [error, setError] = useState("");
  return (
    <Dialog
      title={row ? "Chỉnh sửa món đồ" : "Thêm một món vào hành lý"}
      description="Chọn đồ có sẵn hoặc nhập tên món mới."
      onClose={onClose}
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const name = String(form.get("name")).trim();
          const quantity = Number(form.get("quantity"));
          if (!name || !Number.isInteger(quantity) || quantity < 1)
            return setError("Nhập tên món và số lượng nguyên từ 1 trở lên.");
          const matchedItem = data.items.find(
            (item) => normalized(item.name) === normalized(name),
          );
          if (
            row &&
            matchedItem &&
            data.planItems.some(
              (other) =>
                other.planId === row.planId &&
                other.itemId === matchedItem.id &&
                other.id !== row.id,
            )
          )
            return setError(
              "Món đồ này đã có trong checklist. Hãy chỉnh số lượng ở món đã có hoặc chọn tên khác.",
            );
          onSave({
            name,
            quantity,
            group: String(form.get("group")),
            note: String(form.get("note")).trim(),
          });
        }}
      >
        <label>
          Tên món đồ
          <input
            name="name"
            autoFocus
            required
            maxLength={100}
            list="catalog-options"
            defaultValue={name}
            placeholder="Ví dụ: Áo thun trắng"
          />
          <datalist id="catalog-options">
            {data.items.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </label>
        <div className="form-grid">
          <label>
            Số lượng
            <input
              name="quantity"
              type="number"
              required
              min="1"
              max="999"
              step="1"
              defaultValue={row?.quantity ?? 1}
            />
          </label>
          <label>
            Nhóm đồ
            <select
              name="group"
              defaultValue={row?.group ?? group ?? groups[0]}
            >
              {[
                ...new Set([
                  ...groups,
                  ...data.planItems.map((row) => row.group),
                ]),
              ].map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Ghi chú <span className="muted">(không bắt buộc)</span>
          <textarea
            name="note"
            rows={3}
            maxLength={240}
            defaultValue={row?.note}
            placeholder="Màu sắc, vị trí cất đồ, lưu ý nhỏ…"
          />
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" type="submit">
            {row ? "Lưu thay đổi" : "Thêm vào checklist"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
