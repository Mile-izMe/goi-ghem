import { createClient } from "@/utils/supabase/client";
import type {
  CreatePlanItemInput,
  PlanItem,
  PlanItemRow,
  UpdatePlanItemInput,
} from "./types";

const PLAN_ITEM_COLUMNS =
  "id, plan_id, item_id, quantity, is_checked, note, sort_order, group_id";

function toPlanItem(row: PlanItemRow): PlanItem {
  return {
    id: row.id,
    planId: row.plan_id,
    itemId: row.item_id,
    quantity: row.quantity,
    isChecked: row.is_checked,
    note: row.note,
    sortOrder: row.sort_order,
    groupId: row.group_id,
  };
}

function validateId(id: string) {
  if (
    typeof id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
  ) {
    throw new Error("ID không hợp lệ. Hãy dùng UUID từ Supabase.");
  }
}

// Never send omitted fields: ticking a row must not reset quantity, note or group.
function toUpdatePayload(input: UpdatePlanItemInput) {
  const payload: Partial<
    Pick<
      PlanItemRow,
      "quantity" | "is_checked" | "note" | "sort_order" | "group_id"
    >
  > = {};

  if (input.quantity !== undefined) {
    if (
      !Number.isInteger(input.quantity) ||
      input.quantity < 1 ||
      input.quantity > 2147483647
    ) {
      throw new Error("Số lượng phải là số nguyên dương, tối đa 2147483647.");
    }
    payload.quantity = input.quantity;
  }

  if (input.isChecked !== undefined) {
    if (typeof input.isChecked !== "boolean")
      throw new Error("Trạng thái đã chuẩn bị phải là true hoặc false.");
    payload.is_checked = input.isChecked;
  }

  if (input.note !== undefined) {
    if (input.note !== null && typeof input.note !== "string")
      throw new Error("Ghi chú phải là chuỗi hoặc null.");
    payload.note = input.note === null ? null : input.note.trim() || null;
  }

  if (input.sortOrder !== undefined) {
    if (
      !Number.isInteger(input.sortOrder) ||
      input.sortOrder < 0 ||
      input.sortOrder > 2147483647
    ) {
      throw new Error("Thứ tự phải là số nguyên không âm, tối đa 2147483647.");
    }
    payload.sort_order = input.sortOrder;
  }

  if (input.groupId !== undefined) {
    if (input.groupId !== null) validateId(input.groupId);
    payload.group_id = input.groupId;
  }

  if (Object.keys(payload).length === 0)
    throw new Error("Chưa có thông tin để cập nhật.");
  return payload;
}

async function getAuthenticatedClient() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user)
    throw new Error("Phiên đăng nhập hết hạn. Bạn đăng nhập lại nhé.");
  // RLS enforces plan/item ownership and that the group belongs to this plan.
  return supabase;
}

// READ: checklist for one plan, with a stable order when sort_order ties.
export async function getPlanItems(planId: string): Promise<PlanItem[]> {
  validateId(planId);
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("plan_items")
    .select(PLAN_ITEM_COLUMNS)
    .eq("plan_id", planId)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true })
    .returns<PlanItemRow[]>();
  if (error) throw error;
  return data.map(toPlanItem);
}

// READ: null means the row is missing or not visible to this user.
export async function getPlanItem(id: string): Promise<PlanItem | null> {
  validateId(id);
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("plan_items")
    .select(PLAN_ITEM_COLUMNS)
    .eq("id", id)
    .maybeSingle<PlanItemRow>();
  if (error) throw error;
  return data ? toPlanItem(data) : null;
}

// CREATE: reference an existing catalog item. Does not create an item or a group.
export async function createPlanItem(
  input: CreatePlanItemInput,
): Promise<PlanItem> {
  validateId(input.planId);
  validateId(input.itemId);
  const payload = toUpdatePayload({
    quantity: input.quantity === undefined ? 1 : input.quantity,
    isChecked: input.isChecked === undefined ? false : input.isChecked,
    note: input.note === undefined ? null : input.note,
    sortOrder: input.sortOrder === undefined ? 0 : input.sortOrder,
    groupId: input.groupId === undefined ? null : input.groupId,
  });
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("plan_items")
    .insert({ plan_id: input.planId, item_id: input.itemId, ...payload })
    .select(PLAN_ITEM_COLUMNS)
    .single<PlanItemRow>();
  if (error) throw error;
  return toPlanItem(data);
}

// UPDATE: use this for quantity, ticking, note, order and group changes.
export async function updatePlanItem(
  id: string,
  input: UpdatePlanItemInput,
): Promise<PlanItem> {
  validateId(id);
  const payload = toUpdatePayload(input);
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("plan_items")
    .update(payload)
    .eq("id", id)
    .select(PLAN_ITEM_COLUMNS)
    .single<PlanItemRow>();
  if (error) throw error;
  return toPlanItem(data);
}

// DELETE: remove only the checklist entry, leaving its catalog item intact.
export async function deletePlanItem(id: string): Promise<void> {
  validateId(id);
  const supabase = await getAuthenticatedClient();
  const { error } = await supabase
    .from("plan_items")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  // single() surfaces zero deleted rows as an error instead of false success.
  if (error) throw error;
}
