"use client";

import { useEffect, useRef, useState } from "react";
import { getItems } from "@/features/items/item-service";
import type { Item } from "@/features/items/type";
import type { PlanItem } from "../types";
import {
  getPlanItems,
  createPlanItem,
  updatePlanItem,
  deletePlanItem,
} from "../plan-item-service";

export function PlanItemsPanel({ planId }: { planId: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [rows, setRows] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const busy = useRef(false);

  // Load the catalog and this plan's checklist.
  useEffect(() => {
    console.log("Go heres");
    let active = true;

    async function load() {
      try {
        const [catalog, checklist] = await Promise.all([
          getItems(),
          getPlanItems(planId),
        ]);
        console.log(catalog, checklist);

        if (!active) return;

        setItems(catalog);
        setRows(checklist);
      } catch {
        if (active) {
          setError("Không tải được checklist. Hãy tải lại trang.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [planId]);

  // All writes share loading/error handling.
  async function run(action: () => Promise<void>) {
    if (busy.current) return;

    busy.current = true;
    setPending(true);
    setError("");

    try {
      await action();
    } catch {
      setError("Không lưu được thay đổi. Bạn thử lại nhé.");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function replaceRow(saved: PlanItem) {
    setRows((previous) =>
      previous.map((row) => (row.id === saved.id ? saved : row)),
    );
  }

  function itemName(itemId: string) {
    return (
      items.find((item) => item.id === itemId)?.name ?? "Món đồ không khả dụng"
    );
  }

  // Only offer items not already in this checklist.
  const availableItems = items.filter(
    (item) => !rows.some((row) => row.itemId === item.id),
  );

  if (loading) {
    return <p role="status">Đang tải checklist…</p>;
  }

  return (
    <section>
      <h2>Checklist chuyến đi</h2>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {/* CREATE */}
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          const form = event.currentTarget;
          const values = new FormData(form);
          const itemId = String(values.get("itemId") ?? "");

          if (!itemId) return;

          void run(async () => {
            const created = await createPlanItem({
              planId,
              itemId,
              quantity: 1,
              groupId: null,
              sortOrder: rows.length
                ? Math.max(...rows.map((row) => row.sortOrder)) + 1
                : 0,
            });

            setRows((previous) => [...previous, created]);
            form.reset();
          });
        }}
      >
        <label>
          Đồ dùng trong danh mục
          <select
            name="itemId"
            required
            defaultValue=""
            disabled={pending || availableItems.length === 0}
          >
            <option value="" disabled>
              Chọn đồ dùng…
            </option>

            {availableItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="button primary"
          type="submit"
          disabled={pending || availableItems.length === 0}
        >
          Thêm vào checklist
        </button>
      </form>

      {items.length === 0 && <p>Hãy tạo đồ dùng trong trang Danh mục trước.</p>}

      {rows.length === 0 && <p>Checklist chưa có món nào.</p>}

      {/* READ / UPDATE / DELETE */}
      {rows.map((row) => (
        <form
          key={row.id}
          className="form"
          onSubmit={(event) => {
            event.preventDefault();

            const values = new FormData(event.currentTarget);
            const quantity = Number(values.get("quantity"));
            const note = String(values.get("note") ?? "").trim();

            void run(async () => {
              const saved = await updatePlanItem(row.id, {
                quantity,
                note: note || null,

                // More items to pack means this entry needs checking again.
                isChecked: quantity > row.quantity ? false : row.isChecked,
              });

              replaceRow(saved);
            });
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={row.isChecked}
              disabled={pending}
              onChange={(event) => {
                const checked = event.currentTarget.checked;

                void run(async () => {
                  const saved = await updatePlanItem(row.id, {
                    isChecked: checked,
                  });

                  replaceRow(saved);
                });
              }}
            />

            {itemName(row.itemId)}
          </label>

          <label>
            Số lượng
            <input
              name="quantity"
              type="number"
              min={1}
              max={999}
              step={1}
              required
              defaultValue={row.quantity}
              disabled={pending}
            />
          </label>

          <label>
            Ghi chú
            <input
              name="note"
              maxLength={240}
              defaultValue={row.note ?? ""}
              disabled={pending}
            />
          </label>

          <div className="dialog-actions">
            <button
              type="submit"
              className="button secondary"
              disabled={pending}
            >
              Lưu thay đổi
            </button>

            <button
              type="button"
              className="button destructive"
              disabled={pending}
              onClick={() => {
                void run(async () => {
                  await deletePlanItem(row.id);

                  setRows((previous) =>
                    previous.filter((entry) => entry.id !== row.id),
                  );
                });
              }}
            >
              Bỏ khỏi chuyến đi
            </button>
          </div>
        </form>
      ))}
    </section>
  );
}
