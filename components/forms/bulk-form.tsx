"use client";
import { useState } from "react";
import { groups } from "@/lib/planner-data";
import { Dialog } from "@/components/ui/dialog";
export function BulkForm({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (names: string[], group: string) => void;
}) {
  const [error, setError] = useState("");
  return (
    <Dialog
      title="Thêm cả danh sách"
      description="Mỗi dòng là một món, số lượng mặc định là 1. Bạn có thể chỉnh lại sau."
      onClose={onClose}
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const names = String(form.get("names"))
            .split(/\r?\n/)
            .map((value) =>
              value
                .replace(/^\s*([-*•]|\d+[.)])?\s*(\[[ xX]\])?\s*/, "")
                .trim(),
            )
            .filter(Boolean);
          if (!names.length) return setError("Thêm ít nhất một món đồ nhé.");
          if (names.length > 100 || names.some((name) => name.length > 100))
            return setError("Tối đa 100 món, mỗi tên không quá 100 ký tự.");
          onSave(names, String(form.get("group")));
        }}
      >
        <label>
          Danh sách đồ dùng
          <textarea
            autoFocus
            name="names"
            required
            rows={7}
            placeholder={"Áo thun trắng\nQuần dài\nÁo khoác kem\nGiày sneaker"}
          />
        </label>
        <label>
          Thêm vào nhóm
          <select name="group">
            {groups.map((group) => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button className="button secondary" type="button" onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" type="submit">
            Thêm danh sách
          </button>
        </div>
      </form>
    </Dialog>
  );
}
