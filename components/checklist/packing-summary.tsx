import type { CSSProperties } from "react";
import { Icon } from "@/components/icon";
import { getPlanProgress } from "@/lib/planner-data";
export function PackingSummary({
  progress,
  storageError,
}: {
  progress: ReturnType<typeof getPlanProgress>;
  storageError: boolean;
}) {
  return (
    <aside className="packing-aside">
      <div className="packing-summary">
        <span className="eyebrow">SẮP XẾP MỘT CHÚT</span>
        <h3>
          {progress.percent === 100
            ? "Sẵn sàng lên đường!"
            : "Vali của bạn đến đâu rồi?"}
        </h3>
        <div
          className="progress-ring"
          style={
            {
              "--progress": `${progress.percent * 3.6}deg`,
            } as CSSProperties
          }
        >
          <div>
            <strong>
              {progress.percent}
              <span>%</span>
            </strong>
            <span>đã chuẩn bị</span>
          </div>
        </div>
        <p>
          <strong>
            {progress.checked}/{progress.total}
          </strong>{" "}
          món đã nằm trong hành lý
        </p>
        <div className="summary-divider" />
        <div className="remaining">
          <span>Còn cần chuẩn bị</span>
          <strong>{progress.remaining} món</strong>
        </div>
      </div>
      <div className="packing-tip">
        <span className="tip-icon">
          <Icon name="sun" size={20} />
        </span>
        <h3>Một mẹo nhỏ</h3>
        <p>
          Để giấy tờ và đồ dùng cần lấy ngay vào một ngăn riêng. Những thứ quan
          trọng luôn ở trong tầm tay.
        </p>
      </div>
      <div className="saved-note">
        <Icon name="check-circle" size={15} />
        {storageError
          ? "Chưa lưu được trên máy"
          : "Tự động lưu trên trình duyệt này"}
      </div>
    </aside>
  );
}
