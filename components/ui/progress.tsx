export function Progress({
  checked,
  total,
}: {
  checked: number;
  total: number;
}) {
  const percent = total ? Math.round((checked / total) * 100) : 0;
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Đồ đã chuẩn bị"
      aria-valuenow={checked}
      aria-valuemin={0}
      aria-valuemax={Math.max(total, 1)}
    >
      <span style={{ width: `${percent}%` }} />
    </div>
  );
}
