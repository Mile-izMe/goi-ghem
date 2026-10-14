"use client";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
export function CatalogForm({
  existingName,
  onClose,
  onSave,
}: {
  existingName: string | null;
  onClose: () => void;
  onSave: (name: string) => Promise<string | null>;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

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
        onSubmit={async (event) => {
          event.preventDefault();
          if (pending) return;

          const name = String(
            new FormData(event.currentTarget).get("name"),
          ).trim();

          if (!name) {
            setError("Tên món đồ không được để trống.");
            return;
          }

          setError("");
          setPending(true);

          try {
            const message = await onSave(name);
            if (message) setError(message);
          } catch {
            setError("Không thể tạo đồ dùng mới. Thử lại sau!");
          } finally {
            setPending(false);
          }
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
          <button className="button primary" type="submit" disabled={pending}>
            {pending ? "Đang lưu..." : "Lưu đồ dùng"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
