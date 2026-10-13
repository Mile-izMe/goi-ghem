"use client";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
export function CatalogForm({
  existingName,
  onClose,
  onSave,
}: {
  existingName: string;
  onClose: () => void;
  onSave: (name: string) => string | null;
}) {
  const [error, setError] = useState("");
  return (
    <Dialog
      title={existingName ? "Đổi tên đồ dùng" : "Thêm đồ dùng mới"}
      description={
        existingName
          ? "Tên mới sẽ áp dụng cho mọi kế hoạch đang dùng món này."
          : "Món đồ được lưu để dùng lại trong nhiều kế hoạch."
      }
      onClose={onClose}
    >
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const name = String(
            new FormData(event.currentTarget).get("name"),
          ).trim();
          if (!name) return setError("Tên món đồ không được để trống.");
          const error = onSave(name);
          if (error) setError(error);
        }}
      >
        <label>
          Tên đồ dùng
          <input
            name="name"
            autoFocus
            required
            maxLength={100}
            defaultValue={existingName}
            placeholder="Ví dụ: Sạc dự phòng"
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button className="button secondary" type="button" onClick={onClose}>
            Hủy
          </button>
          <button className="button primary" type="submit">
            Lưu đồ dùng
          </button>
        </div>
      </form>
    </Dialog>
  );
}
