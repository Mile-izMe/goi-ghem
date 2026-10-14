export type Item = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

// Dữ liệu gửi từ form tạo/sửa.
export type ItemInput = Pick<Item, "name">;

// Dữ liệu nhận từ bảng Supabase.
export type ItemRow = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
