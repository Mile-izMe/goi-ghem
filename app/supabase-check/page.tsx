"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function SupabaseCheckPage() {
  const [message, setMessage] = useState("Chưa kiểm tra.");
  const [loading, setLoading] = useState(false);

  async function checkConnection() {
    setLoading(true);
    setMessage("Đang kiểm tra…");

    try {
      const supabase = createClient();

      // Chỉ kiểm tra truy vấn, không tải nội dung các kế hoạch.
      const { error } = await supabase
        .from("plans")
        .select("*", { head: true });

      if (error) {
        setMessage(`Supabase trả về lỗi: ${error.message}`);
        return;
      }

      setMessage("Kết nối thành công! Truy vấn bảng plans không báo lỗi.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Không thể kết nối Supabase.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Kiểm tra Supabase</h1>

      <button
        className="button primary"
        style={{ marginTop: 20 }}
        onClick={checkConnection}
        disabled={loading}
      >
        {loading ? "Đang kiểm tra…" : "Kiểm tra kết nối"}
      </button>

      <p role="status" style={{ marginTop: 16 }}>
        {message}
      </p>
    </main>
  );
}
