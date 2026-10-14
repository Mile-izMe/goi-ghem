# Đồng bộ tài khoản sang profiles

Schema được cung cấp: `profiles(id, username, created_at)`. Migration sử dụng `id` kiểu UUID làm khóa chính (cùng giá trị `auth.users.id`), `username` kiểu text và `created_at` kiểu timestamp. Không tạo lại bảng hoặc thay đổi các policy RLS hiện có.

## Áp dụng

1. Mở `supabase/migrations/202610130001_create_auth_profiles.sql`.
2. Trong Supabase Dashboard của project → **SQL Editor**, tạo query mới, dán toàn bộ nội dung và chạy bằng role `postgres`.
3. Sau khi SQL chạy thành công, đăng ký trên ứng dụng bằng email của bạn. Kiểm tra **Table Editor → profiles**: phải có dòng với `id` bằng UID trong **Authentication → Users**.

File SQL được lưu trong project, **không tự chạy khi khởi động Next.js**. Nếu project đã dùng Supabase CLI migrations, áp dụng qua quy trình migration hiện có thay cho SQL Editor.

## Luồng hoạt động

```text
Form đăng ký
  → auth.signUp({ options: { data: { username, full_name } } })
  → INSERT auth.users
  → trigger tạo public.profiles trong cùng transaction
```

- Tên nhập ở form hiện được dùng cho cả `username` và `full_name`. Đăng nhập vẫn dùng email và mật khẩu.
- Profile được tạo ngay khi tài khoản được tạo, kể cả khi chưa xác nhận email. Không cần session ở frontend để insert vào profiles.
- Trigger dùng `username` trong metadata; tài khoản cũ dùng `full_name`. Nếu cả hai trống, dùng `user_` kèm UUID, không lấy email để làm tên hiển thị.
- SQL bổ sung các profile còn thiếu và có thể chạy lại mà không tạo trùng theo `id`; profile đã tồn tại giữ nguyên dữ liệu.
- Đây là khởi tạo profile khi đăng ký, không phải đồng bộ hai chiều khi chỉnh sửa tên về sau.
- Nếu bảng thực tế có thêm ràng buộc, ví dụ `username UNIQUE`, các tên trùng có thể khiến transaction thất bại. Giữ nguyên ràng buộc đó và xử lý tên trùng theo yêu cầu của sản phẩm; migration không tự xóa ràng buộc hoặc thay tên người dùng.
- Trigger lỗi sẽ rollback cả lần tạo tài khoản. Không thêm insert phía frontend hoặc dùng service-role key trong trình duyệt để khắc phục.

## Kiểm tra dữ liệu cũ

Chạy query dưới đây trong SQL Editor; kết quả `0` nghĩa là không còn tài khoản thiếu profile:

```sql
select count(*) as users_without_profile
from auth.users as users
left join public.profiles as profiles on profiles.id = users.id
where profiles.id is null;
```

Tham khảo: [Supabase — Managing user data](https://supabase.com/docs/guides/auth/managing-user-data).
