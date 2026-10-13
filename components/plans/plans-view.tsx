"use client";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { Empty } from "@/components/ui/empty";
import { normalized, tripState } from "@/lib/planner/helpers";
import { PlanCard } from "./plan-card";
export function PlansView() {
  const { data, initialDate, setModal, openPlan } = useWorkspace();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tất cả");
  const filteredPlans = data.plans.filter(
    (plan) =>
      (status === "Tất cả" || tripState(plan, initialDate) === status) &&
      normalized(plan.name + " " + plan.destination).includes(
        normalized(query),
      ),
  );
  const nextPlan = [...data.plans]
    .filter((plan) => plan.endDate >= initialDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  return (
    <>
      <section className="page-heading">
        <div>
          <div className="eyebrow">CHUẨN BỊ NHẸ NHÀNG, ĐI CHƠI THẢNH THƠI</div>
          <h1>
            Đi đâu tiếp theo<span className="accent">?</span>
          </h1>
          <p>Những chuyến đi đáng nhớ bắt đầu từ một kế hoạch nhỏ.</p>
        </div>
        <button
          className="button primary"
          onClick={() => setModal({ kind: "plan" })}
        >
          <Icon name="plus" size={18} />
          Tạo kế hoạch
        </button>
      </section>
      <section className="welcome-banner">
        <div className="banner-copy">
          <span className="banner-eyebrow">
            <span />
            SẴN SÀNG CHO NHỮNG HÀNH TRÌNH MỚI
          </span>
          <h2>
            Mang theo đủ đồ.
            <br />
            Để dành chỗ cho niềm vui.
          </h2>
          <p>
            Gom mọi thứ cần chuẩn bị vào một nơi.
            <br className="desktop-break" /> Tick từng món, rồi yên tâm lên
            đường.
          </p>
          <button
            className="banner-link"
            onClick={() =>
              nextPlan ? openPlan(nextPlan.id) : setModal({ kind: "plan" })
            }
          >
            {nextPlan
              ? `Chuẩn bị cho ${nextPlan.destination}`
              : "Lên kế hoạch đầu tiên"}
            <Icon name="arrow-right" size={17} />
          </button>
        </div>
        <div
          className="banner-photo"
          role="img"
          aria-label="Rừng thông xanh yên bình"
        >
          <div className="photo-label">
            <Icon name="pin" size={14} />
            <span>MỘT CHÚT CẢM HỨNG LÊN ĐƯỜNG</span>
          </div>
          <div className="travel-stamp">
            <Icon name="mountain" size={23} />
            <span>
              LET’S
              <br />
              <strong>GO SOMEWHERE</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="plans-section">
        <div className="section-heading">
          <h2>
            Kế hoạch của tôi <span>{data.plans.length}</span>
          </h2>
          <span className="muted small">
            Mỗi hành trình, một checklist riêng
          </span>
        </div>
        <div className="toolbar">
          <div className="tabs" aria-label="Lọc kế hoạch">
            {["Tất cả", "Sắp đi", "Đang đi", "Đã đi"].map((value) => (
              <button
                key={value}
                aria-pressed={status === value}
                className={status === value ? "active" : ""}
                onClick={() => setStatus(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Icon name="search" size={18} />
            <input
              aria-label="Tìm kế hoạch"
              placeholder="Tìm chuyến đi của bạn…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="plan-grid">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
          {status === "Tất cả" && !query && (
            <button
              className="new-plan-card"
              onClick={() => setModal({ kind: "plan" })}
            >
              <span className="new-plan-icon">
                <Icon name="plus" size={25} />
              </span>
              <strong>Một chuyến đi mới?</strong>
              <span>Bắt đầu bằng một kế hoạch nhỏ.</span>
              <span className="new-plan-action">
                Tạo kế hoạch
                <Icon name="arrow-right" size={15} />
              </span>
            </button>
          )}
        </div>
        {filteredPlans.length === 0 && (
          <Empty
            icon="search"
            title="Chưa có chuyến đi phù hợp"
            text="Thử tên khác hoặc tạo một kế hoạch mới."
          />
        )}
      </section>
      <div className="bottom-caption">
        <Icon name="logo" size={15} />
        <span>Gói ghém vừa đủ. Tận hưởng thật nhiều.</span>
      </div>
    </>
  );
}
