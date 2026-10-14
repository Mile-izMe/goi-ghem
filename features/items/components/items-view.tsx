"use client";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { Empty } from "@/components/ui/empty";
import { normalized } from "@/lib/planner/helpers";

export function ItemsView() {
  const { catalogItems, itemsLoading, itemsError, setModal } = useWorkspace();
  const [query, setQuery] = useState("");

  if (itemsLoading) {
    return <p role="status">Đang tải đồ dùng...</p>;
  }

  if (itemsError) {
    return <p role="alert">{itemsError}</p>;
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <div className="eyebrow">ĐỒ QUEN, CHUYẾN ĐI MỚI</div>
          <h1>
            Danh mục đồ dùng<span className="accent">.</span>
          </h1>
          <p>Lưu một lần, dùng lại trong những hành trình sau.</p>
        </div>
        <button
          className="button primary"
          onClick={() => setModal({ kind: "catalog" })}
        >
          <Icon name="plus" size={18} />
          Thêm đồ dùng
        </button>
      </section>
      <div className="toolbar">
        <span className="muted">{catalogItems.length} món trong danh mục</span>
        <label className="search-field">
          <Icon name="search" size={18} />
          <input
            aria-label="Tìm trong danh mục"
            placeholder="Tìm đồ dùng…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="catalog-list">
        <div className="catalog-header">
          <span>ĐỒ DÙNG</span>
          <span>ĐANG DÙNG TRONG</span>
          <span />
        </div>
        {catalogItems
          .filter((item) => normalized(item.name).includes(normalized(query)))
          .map((item) => {
            const used = catalogItems.filter(
              (row) => row.itemId === item.id,
            ).length;
            return (
              <div className="catalog-row" key={item.id}>
                <span>
                  <span className="catalog-icon">
                    <Icon name="bag" size={17} />
                  </span>
                  <strong>{item.name}</strong>
                </span>
                <span className="muted">{used} kế hoạch</span>
                <button
                  className="icon-button"
                  aria-label={`Đổi tên ${item.name}`}
                  onClick={() => setModal({ kind: "catalog", id: item.id })}
                >
                  <Icon name="edit" size={17} />
                </button>
              </div>
            );
          })}
      </div>
      {!catalogItems.some((item) =>
        normalized(item.name).includes(normalized(query)),
      ) && (
        <Empty
          icon="search"
          title="Chưa tìm thấy món đồ"
          text="Thêm món mới để sử dụng cho các chuyến đi."
        />
      )}
    </>
  );
}
