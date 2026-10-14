import { createClient } from "@/utils/supabase/client";
import { Item, ItemInput, ItemRow } from "./type";

const ITEM_COLUMNS = `
  id,
  user_id,
  name,
  created_at,
  updated_at
`;

// Database → giao diện.
function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Form → database.
// Chọn rõ từng trường, không gửi nguyên object từ form.
function toPayload(input: ItemInput) {
  if (!input.name.trim()) {
    throw new Error("Bạn cần nhập tên đồ dùng.");
  }

  return {
    name: input.name.trim(),
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
export async function getItems(): Promise<Item[]> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("items")
    .select(ITEM_COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<ItemRow[]>();

  if (error) throw error;

  return data.map(toItem);
}

// CREATE.
export async function createItem(input: ItemInput): Promise<Item> {
  const payload = toPayload(input);
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("items")
    .insert({
      ...payload,
      user_id: userId,
    })
    .select(ITEM_COLUMNS)
    .single<ItemRow>();

  if (error) throw error;

  return toItem(data);
}

// UPDATE: nhận đầy đủ dữ liệu của form chỉnh sửa.
export async function updateItem(id: string, input: ItemInput): Promise<Item> {
  const payload = toPayload(input);
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("items")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select(ITEM_COLUMNS)
    .single<ItemRow>();

  if (error) throw error;

  return toItem(data);
}

// DELETE: kiểm tra có dòng thực sự bị xóa.
export async function deleteItem(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select("id")
    .single();

  if (error) throw error;
}
