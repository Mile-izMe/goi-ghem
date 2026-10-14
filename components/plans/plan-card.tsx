"use client";
import { Icon } from "@/components/icon";
import { Progress } from "@/components/ui/progress";
import { useWorkspace } from "@/components/workspace/workspace-provider";
import { PlanWithProgress } from "@/features/plans/types";
import {
  formatCurrency,
  formatDateRange,
  getDuration,
  type Plan,
} from "@/lib/planner-data";
import { tripState } from "@/lib/planner/helpers";

export function PlanCard({ plan }: { plan: PlanWithProgress }) {
  const { initialDate, openPlan, plans, setPlans } = useWorkspace();
  const count = plan.progress;
  const duration = getDuration(plan.startDate, plan.endDate);

  return (
    <article className="plan-card" key={plan.id}>
      <button
        className={`plan-cover cover-${plan.coverUrl}`}
        onClick={() => openPlan(plan.id)}
        aria-label={`Mở ${plan.name}`}
      >
        <span className="trip-state">
          <span />
          {tripState(plan.coverUrl, initialDate)}
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
            <span> / {count.target}</span>
          </strong>
        </div>
        <Progress checked={count.checked} total={count.target} />
        <div className="card-footer">
          <span>
            <Icon name="wallet" size={15} />
            {formatCurrency(plan.fee) || 0}
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
