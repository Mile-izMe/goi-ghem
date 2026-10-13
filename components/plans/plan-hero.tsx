import { Icon } from "@/components/icon";
import { coverLabels } from "@/lib/planner/helpers";
import {
  getDuration,
  formatCurrency,
  formatDateRange,
  type Plan,
} from "@/lib/planner-data";
export function PlanHero({ selected }: { selected: Plan }) {
  return (
    <section className={`detail-hero cover-${selected.cover}`}>
      <div className="detail-hero-inner">
        <span className="detail-category">
          {selected.category} <span>·</span>{" "}
          {getDuration(selected.startDate, selected.endDate).days} ngày{" "}
          {getDuration(selected.startDate, selected.endDate).nights} đêm
        </span>
        <h1>{selected.name}</h1>
        <p>{coverLabels[selected.cover]}</p>
        <div className="detail-meta">
          <span>
            <Icon name="pin" size={16} />
            {selected.destination}
          </span>
          <span>
            <Icon name="calendar" size={16} />
            {formatDateRange(selected.startDate, selected.endDate)}
          </span>
          <span>
            <Icon name="wallet" size={16} />
            Đã chi {formatCurrency(selected.fee)}
          </span>
        </div>
      </div>
      <span className="hero-marker">
        <Icon name="logo" size={46} />
      </span>
    </section>
  );
}
