import { createClient } from "@/utils/supabase/client";
import type {
  Plan,
  PlanCover,
  PlanInput,
  PlanRow,
  PlanWithProgress,
} from "./types";

const PLAN_COLUMNS = `
  id,
  user_id,
  name,
  category,
  destination,
  fee,
  cover_url,
  start_date,
  end_date,
  created_at,
  updated_at
`;

// Chỉ nhận những mã ảnh giao diện đang hỗ trợ.
function parseCover(value: string | null): PlanCover {
  switch (value) {
    case "dalat":
    case "danang":
    case "hanoi":
      return value;
    default:
      return "custom";
  }
}

// Database → giao diện.
function toPlan(row: PlanRow): Plan {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    category: row.category,
    destination: row.destination,
    fee: row.fee ?? 0,
    coverUrl: parseCover(row.cover_url),
    startDate: row.start_date,
    endDate: row.end_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Form → database.
// Chọn rõ từng trường, không gửi nguyên object từ form.
function toPayload(input: PlanInput) {
  if (!input.name.trim() || !input.destination.trim()) {
    throw new Error("Bạn cần nhập tên kế hoạch và điểm đến.");
  }

  if (!input.category.trim()) {
    throw new Error("Bạn cần chọn loại chuyến đi.");
  }

  if (!input.startDate || !input.endDate || input.endDate < input.startDate) {
    throw new Error("Ngày về cần bằng hoặc sau ngày đi.");
  }

  const fee = input.fee ?? 0;

  if (!Number.isFinite(fee) || fee < 0) {
    throw new Error("Chi phí phải là số không âm.");
  }

  return {
    name: input.name.trim(),
    category: input.category.trim(),
    destination: input.destination.trim(),
    fee,
    cover_url: input.coverUrl ?? "custom",
    start_date: input.startDate,
    end_date: input.endDate,
  };
}

async function getCurrentUserId() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error("Phiên đăng nhập hết hạn. Bạn đăng nhập lại nhé.");
  }

  return data.user.id;
}

// READ: lấy danh sách.
export async function getPlans(): Promise<Plan[]> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plans")
    .select(PLAN_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<PlanRow[]>();

  if (error) throw error;

  return data.map(toPlan);
}

// READ: Lấy danh sách plans với quy trình chuẩn bị
type PlanWithChecklistRow = PlanRow & {
  plan_items: {
    is_checked: boolean;
  }[];
};

export async function getPlansWithProgress(): Promise<PlanWithProgress[]> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plans")
    .select(
      `
      ${PLAN_COLUMNS},
      plan_items (
        is_checked
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<PlanWithChecklistRow[]>();

  if (error) throw error;

  return data.map((row) => {
    const total = row.plan_items.length;

    const checked = row.plan_items.filter((entry) => entry.is_checked).length;

    return {
      ...toPlan(row),
      progress: {
        checked,
        total,
        percent: total ? Math.round((checked / total) * 100) : 0,
      },
    };
  });
}

// READ: lấy một kế hoạch.
export async function getPlan(id: string): Promise<Plan | null> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plans")
    .select(PLAN_COLUMNS)
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle<PlanRow>();

  if (error) throw error;

  return data ? toPlan(data) : null;
}

// CREATE.
export async function createPlan(input: PlanInput): Promise<Plan> {
  const payload = toPayload(input);
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plans")
    .insert({
      ...payload,
      user_id: userId,
    })
    .select(PLAN_COLUMNS)
    .single<PlanRow>();

  if (error) throw error;

  return toPlan(data);
}

// UPDATE: nhận đầy đủ dữ liệu của form chỉnh sửa.
export async function updatePlan(id: string, input: PlanInput): Promise<Plan> {
  const payload = toPayload(input);
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("plans")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select(PLAN_COLUMNS)
    .single<PlanRow>();

  if (error) throw error;

  return toPlan(data);
}

// DELETE: kiểm tra có dòng thực sự bị xóa.
export async function deletePlan(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from("plans")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select("id")
    .single();

  if (error) throw error;
}

//
