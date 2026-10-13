"use client";
import { Icon } from "@/components/icon";
import { templates } from "@/lib/planner-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export function TemplatesView() {
  const { setModal } = useWorkspace();
  return (
    <>
      <section className="page-heading">
        <div>
          <div className="eyebrow">BẮT ĐẦU NHANH HƠN MỘT CHÚT</div>
          <h1>
            Một mẫu cho mỗi chuyến đi<span className="accent">.</span>
          </h1>
          <p>Chọn checklist phù hợp, rồi thêm dấu ấn riêng của bạn.</p>
        </div>
      </section>
      <div className="templates-grid">
        {templates.map((template, index) => (
          <article className="template-card" key={template.id}>
            <div className={`template-art art-${index % 3}`}>
              <Icon
                name={index === 0 ? "mountain" : index === 1 ? "wave" : "bag"}
                size={64}
              />
              <span className="template-number">0{index + 1}</span>
            </div>
            <div className="template-content">
              <span className="eyebrow">
                {template.items.length} MÓN ĐƯỢC GỢI Ý
              </span>
              <h2>{template.name}</h2>
              <p>{template.description}</p>
              <button
                className="button secondary"
                onClick={() => setModal({ kind: "plan", template })}
              >
                Dùng mẫu này
                <Icon name="arrow-right" size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
