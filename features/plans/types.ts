export type PlanCover = "dalat" | "danang" | "hanoi" | "custom";

export type Plan = {
  id: string;
  userId: string;
  name: string;
  category: string;
  destination: string;
  fee?: number;
  coverUrl?: PlanCover;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type PlanWithProgress = Plan & {
  progress: {
    checked: number;
    target: number;
    percent: number;
  };
};

// Dữ liệu gửi từ form tạo/sửa.
export type PlanInput = Pick<
  Plan,
  | "name"
  | "category"
  | "destination"
  | "fee"
  | "coverUrl"
  | "startDate"
  | "endDate"
>;

// Dữ liệu nhận từ bảng Supabase.
export type PlanRow = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  destination: string;
  fee: number | null;
  cover_url: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};
