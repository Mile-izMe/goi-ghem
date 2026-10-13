"use client";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { Empty } from "@/components/ui/empty";
import { normalized } from "@/lib/planner/helpers";
import Link from "next/link";
import { getPlanProgress } from "@/lib/planner-data";
import { PlanHero } from "@/components/plans/plan-hero";
import { ChecklistGroup } from "./checklist-group";
import { PackingSummary } from "./packing-summary";
export function PlanDetail({ planId }: { planId: string }) {
  const { data, storageError, setModal, navigate, duplicate, itemName } =
    useWorkspace();
  const [query, setQuery] = useState("");
  const [checkFilter, setCheckFilter] = useState("Tất cả");
  const selected = data.plans.find((plan) => plan.id === planId);
  const rows = data.planItems
    .filter((row) => row.planId === planId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const progress = getPlanProgress(planId, data.planItems);
  const categories = [...new Set(rows.map((row) => row.group))];
  const filteredRows = rows.filter(
    (row) =>
      normalized(itemName(row.itemId) + " " + row.note).includes(
        normalized(query),
      ) &&
      (checkFilter === "Tất cả" ||
        (checkFilter === "Đã xong" ? row.isChecked : !row.isChecked)),
  );
  if (!selected)
    return (
      <>
        <Empty
          icon="pin"
          title="Không tìm thấy kế hoạch"
          text="Kế hoạch có thể đã bị xóa hoặc không có trên trình duyệt này."
        />
        <Link className="button primary" href="/app/plans">
          Về danh sách kế hoạch
        </Link>
      </>
    );
  return (
    <>
      <div className="detail-back">
        <button className="text-button" onClick={() => navigate("plans")}>
          <Icon name="arrow-left" size={16} />
          Tất cả kế hoạch
        </button>
        <div className="detail-actions">
          <button className="button subtle" onClick={() => duplicate(selected)}>
            <Icon name="copy" size={16} />
            Nhân bản
          </button>
          <button
            className="button subtle"
            onClick={() => setModal({ kind: "plan", plan: selected })}
          >
            <Icon name="edit" size={16} />
            Chỉnh sửa
          </button>
          <button
            className="icon-button danger"
            aria-label="Xóa kế hoạch"
            onClick={() => setModal({ kind: "delete-plan", plan: selected })}
          >
            <Icon name="trash" size={18} />
          </button>
        </div>
      </div>
      <PlanHero selected={selected} />
      <div className="checklist-layout">
        <section className="checklist-main">
          <div className="section-heading">
            <div>
              <h2>Gói ghém cho chuyến đi</h2>
              <p className="muted small">Tick một món, nhẹ thêm một nỗi lo.</p>
            </div>
            <button
              className="button primary"
              onClick={() => setModal({ kind: "item" })}
            >
              <Icon name="plus" size={17} />
              Thêm món
            </button>
          </div>
          <div className="toolbar checklist-toolbar">
            <div className="tabs" aria-label="Lọc checklist">
              {["Tất cả", "Chưa xong", "Đã xong"].map((value) => (
                <button
                  key={value}
                  aria-pressed={checkFilter === value}
                  className={checkFilter === value ? "active" : ""}
                  onClick={() => setCheckFilter(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <button
              className="text-button"
              onClick={() => setModal({ kind: "bulk" })}
            >
              <Icon name="list" size={16} />
              Dán danh sách
            </button>
          </div>
          <label className="search-field checklist-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Tìm món đồ"
              placeholder="Tìm món đồ trong chuyến đi…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          {categories.map((group) => {
            const members = filteredRows.filter((row) => row.group === group);
            return members.length ? (
              <ChecklistGroup
                key={group}
                group={group}
                members={members}
                all={rows.filter((row) => row.group === group)}
              />
            ) : null;
          })}{" "}
          {filteredRows.length === 0 && (
            <Empty
              icon={progress.total ? "check-circle" : "bag"}
              title={
                progress.total
                  ? "Không có món nào trong bộ lọc này"
                  : "Vali còn trống, thêm vài món nhé!"
              }
              text={
                progress.total
                  ? "Thử bộ lọc khác để xem các món còn lại."
                  : "Thêm từng món hoặc dán cả danh sách để bắt đầu."
              }
            />
          )}
        </section>
        <PackingSummary progress={progress} storageError={storageError} />
      </div>
    </>
  );
}
