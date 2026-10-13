"use client";
import { useState } from "react";
import { Icon } from "@/components/icon";
const items = [
  { name: "Áo khoác ấm", quantity: 1 },
  { name: "Máy ảnh & pin dự phòng", quantity: 1 },
  { name: "Đôi giày thật thoải mái", quantity: 1 },
  { name: "Một tâm hồn sẵn sàng đi", quantity: 1 },
];
export function ChecklistPreview() {
  const [checked, setChecked] = useState([true, true, false, false]);
  const count = checked.filter(Boolean).length;
  return (
    <div className="landing-checklist">
      <div className="preview-top">
        <span>
          <Icon name="bag" size={16} /> HÀNH LÝ CỦA MÌNH
        </span>
        <span>02N / 01Đ</span>
      </div>
      <h3>Cuối tuần, lên Đà Lạt.</h3>
      <p>Mang theo một chút, tận hưởng thật nhiều.</p>
      <div className="preview-items">
        {items.map((item, index) => (
          <label
            key={item.name}
            className={checked[index] ? "preview-checked" : ""}
          >
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() =>
                setChecked((values) =>
                  values.map((v, i) => (i === index ? !v : v)),
                )
              }
            />
            <span className="preview-tick">
              <Icon name="check" size={12} />
            </span>
            <span>{item.name}</span>
            <small>×{item.quantity}</small>
          </label>
        ))}
      </div>
      <div className="preview-progress">
        <span>{count === 4 ? "Sẵn sàng lên đường!" : "Đang gói ghém…"}</span>
        <strong>{count}/4 món</strong>
      </div>
      <div className="preview-track">
        <span style={{ width: `${count * 25}%` }} />
      </div>
      <span className="preview-hint">
        Checklist minh họa · thử tick một món nhé
      </span>
    </div>
  );
}
