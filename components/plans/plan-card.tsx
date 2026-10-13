"use client";
import { Icon } from "@/components/icon";
import { Progress } from "@/components/ui/progress";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { tripState } from "@/lib/planner/helpers";
import {
  getPlanProgress,
  getDuration,
  formatCurrency,
  formatDateRange,
  type Plan,
} from "@/lib/planner-data";
export function PlanCard({ plan }: { plan: Plan }) {
  const { data, initialDate, openPlan } = useWorkspace();
  const count = getPlanProgress(plan.id, data.planItems);
  const duration = getDuration(plan.startDate, plan.endDate);
  return (
    <article className="plan-card" key={plan.id}>
      <button
        className={`plan-cover cover-${plan.cover}`}
        onClick={() => openPlan(plan.id)}
        aria-label={`Mở ${plan.name}`}
      >
        <span className="trip-state">
          <span />
          {tripState(plan, initialDate)}
        </span>
        <span className="cover-location">
          <Icon name="pin" size={15} />
          {plan.destination}
        </span>
      </button>
      <div className="plan-card-body">
        <div className="card-category">
          {plan.category} <span>·</span> {duration.days} ngày {duration.nights}{" "}
          đêm
        </div>
        <button className="card-title" onClick={() => openPlan(plan.id)}>
          {plan.name}
          <Icon name="arrow-right" size={19} />
        </button>
        <div className="card-date">
          <Icon name="calendar" size={15} />
          {formatDateRange(plan.startDate, plan.endDate)}
        </div>
        <div className="card-progress-label">
          <span>Hành lý đã sẵn sàng</span>
          <strong>
            {count.checked}
            <span> / {count.total}</span>
          </strong>
        </div>
        <Progress checked={count.checked} total={count.total} />
        <div className="card-footer">
          <span>
            <Icon name="wallet" size={15} />
            {formatCurrency(plan.fee)}
          </span>
          <button className="text-button" onClick={() => openPlan(plan.id)}>
            Mở checklist
            <Icon name="chevron-right" size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
