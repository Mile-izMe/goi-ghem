// A checklist entry linking one catalog item to one plan.
export type PlanItem = {
  id: string;
  planId: string;
  itemId: string;
  quantity: number;
  isChecked: boolean;
  note: string | null;
  sortOrder: number;
  groupId: string | null;
};

export type CreatePlanItemInput = Pick<PlanItem, "planId" | "itemId"> &
  Partial<
    Pick<PlanItem, "quantity" | "isChecked" | "note" | "sortOrder" | "groupId">
  >;

// Update only the fields supplied. Reassigning the plan/item is intentionally excluded.
export type UpdatePlanItemInput = Partial<
  Pick<PlanItem, "quantity" | "isChecked" | "note" | "sortOrder" | "groupId">
>;

export type PlanItemRow = {
  id: string;
  plan_id: string;
  item_id: string;
  quantity: number;
  is_checked: boolean;
  note: string | null;
  sort_order: number;
  group_id: string | null;
};
