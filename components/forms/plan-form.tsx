"use client";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { type Plan, type ChecklistTemplate } from "@/lib/planner-data";
import { today } from "@/lib/planner/helpers";
import { Dialog } from "@/components/ui/dialog";
export function PlanForm({
  plan,
  template,
  onClose,
  onSave,
}: {
  plan?: Plan;
  template?: ChecklistTemplate;
  onClose: () => void;
  onSave: (
    values: Omit<Plan, "id" | "userId" | "createdAt">,
    template?: ChecklistTemplate,
  ) => void;
}) {
  const [start, setStart] = useState(plan?.startDate ?? today());
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const destination = String(form.get("destination")).trim();
    const startDate = String(form.get("start"));
    const endDate = String(form.get("end"));
    const fee = Number(form.get("fee"));
    if (!name || !destination)
      return setError("Nhập tên kế hoạch và điểm đến nhé.");
    if (!startDate || !endDate || endDate < startDate)
      return setError("Ngày về cần bằng hoặc sau ngày đi.");
    if (!Number.isFinite(fee) || fee < 0)
      return setError("Chi phí cần là một số không âm.");
    onSave(
      {
        name,
        destination,
        startDate,
        endDate,
        fee,
        category: String(form.get("category")),
        cover: String(form.get("cover")) as Plan["cover"],
      },
      template,
    );
  };
  return (
    <Dialog
      title={plan ? "Chỉnh sửa kế hoạch" : "Đi đâu cùng gói ghém?"}
      description={
        template
          ? `Bắt đầu với mẫu “${template.name}”.`
          : "Một vài thông tin cho hành trình sắp tới."
      }
      onClose={onClose}
    >
      <form onSubmit={submit} className="form">
        <label>
          Tên kế hoạch
          <input
            name="name"
            autoFocus
            required
            maxLength={80}
            defaultValue={plan?.name}
            placeholder="Ví dụ: Cuối tuần ở Đà Lạt"
          />
        </label>
        <div className="form-grid">
          <label>
            Điểm đến
            <input
              name="destination"
              required
              maxLength={60}
              defaultValue={plan?.destination}
              placeholder="Đà Lạt"
            />
          </label>
          <label>
            Loại chuyến đi
            <select name="category" defaultValue={plan?.category ?? "Du lịch"}>
              {["Du lịch", "Tham quan", "Công tác", "Hoạt động", "Khác"].map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
          </label>
        </div>
        <div className="form-grid">
          <label>
            Ngày đi
            <input
              type="date"
              name="start"
              required
              defaultValue={start}
              onChange={(event) => setStart(event.target.value)}
            />
          </label>
          <label>
            Ngày về
            <input
              type="date"
              name="end"
              required
              min={start}
              defaultValue={plan?.endDate ?? start}
            />
          </label>
        </div>
        <label>
          Chi phí đã chi (VNĐ)
          <input
            name="fee"
            type="number"
            min="0"
            max="1000000000000"
            step="1"
            defaultValue={plan?.fee ?? 0}
          />
        </label>
        <fieldset className="cover-picker">
          <legend>Ảnh bìa</legend>
          {(["dalat", "danang", "hanoi", "custom"] as const).map((cover, i) => (
            <label key={cover}>
              <input
                type="radio"
                name="cover"
                value={cover}
                defaultChecked={cover === (plan?.cover ?? "dalat")}
              />
              <span className={`cover-${cover}`}>
                {["Rừng xanh", "Biển xanh", "Phố cũ", "Tối giản"][i]}
              </span>
            </label>
          ))}
        </fieldset>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Để sau
          </button>
          <button type="submit" className="button primary">
            {plan ? "Lưu thay đổi" : "Tạo kế hoạch"}
            <Icon name="arrow-right" size={17} />
          </button>
        </div>
      </form>
    </Dialog>
  );
}
