# Đăng nhập và đăng ký

Luồng xử lý: **page → component → hook → service → Supabase Auth**.

```text
components/
  login-form.tsx          Form đăng nhập
  register-form.tsx       Form đăng ký và thông báo kiểm tra email
  auth-form-shell.tsx     Tiêu đề, bố cục, link đổi giữa hai form
  auth-provider.tsx       Theo dõi phiên Supabase trong trình duyệt
  account-menu.tsx        Tên tài khoản và đăng xuất
hooks/
  use-login.ts           Submit, loading, lỗi đăng nhập
  use-register.ts        Submit, loading, xác nhận email
  use-auth-destination.ts Điều hướng khi đã đăng nhập
services/
  auth-service.ts        signInWithPassword, signUp, signOut
lib/
  validation.ts          Kiểm tra dữ liệu form
  errors.ts              Thông báo lỗi tiếng Việt
  redirects.ts           Chỉ cho phép chuyển đến route nội bộ hợp lệ
server/
  require-user.ts        Kiểm tra token trước khi render workspace
  complete-auth.ts       Đổi code/token xác nhận thành phiên cookie
auth-gate.tsx            Trạng thái chờ phiên ở giao diện
```

## Cấu hình để chạy

1. Trong `.env.local` (hoặc `.env` hiện có), đặt hai biến dưới đây bằng giá trị của project Supabase. Không đưa khóa `service_role`/secret key vào frontend.

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```

2. Trong Supabase Dashboard → Authentication, bật provider **Email** và cho phép đăng ký mới. Bật **Confirm email** nếu muốn yêu cầu xác nhận email.
3. Trong **URL Configuration**, đặt **Site URL** là `http://localhost:3000`, thêm **Redirect URLs**: `http://localhost:3000/auth/callback`. Đổi port cho khớp server đang chạy. Khi deploy, thêm URL HTTPS tương ứng.
4. Giữ link `{{ .ConfirmationURL }}` trong email template **Confirm signup** để dùng luồng PKCE tại `/auth/callback`. Link phải được mở ở cùng trình duyệt đã đăng ký. Nếu trước đó đã tùy chỉnh template theo token hash, `/auth/confirm?token_hash={{ .TokenHash }}&type=email` cũng được hỗ trợ (thêm domain của ứng dụng phía trước đường dẫn).
5. Khởi động lại `pnpm dev` sau khi đổi biến môi trường.

## Tự kiểm tra bằng tài khoản của bạn

- Mở `/app/plans` khi chưa đăng nhập: phải chuyển đến `/login?next=...`.
- Đăng ký bằng email bạn sở hữu; hai mật khẩu khác nhau phải báo lỗi trước khi gửi.
- Nếu bật Confirm email: form chuyển sang thông báo kiểm tra email. Mở link email cùng trình duyệt để vào workspace.
- Nếu tắt Confirm email: đăng ký thành công vào workspace ngay.
- Đăng xuất, đăng nhập lại bằng mật khẩu đã đăng ký, refresh trang, rồi mở thêm tab.
- Email/mật khẩu sai không được tạo phiên; link xác nhận thiếu/hết hạn hiển thị lỗi ở trang đăng nhập.

Test logic cục bộ (Node 22.18+): `node --test tests/auth.test.mjs`. Build: `pnpm build`.

## Phạm vi

- Đây là xác thực thật bằng Supabase. Mật khẩu được gửi trực tiếp đến Supabase qua SDK; code ứng dụng không lưu mật khẩu vào storage.
- `full_name` được lưu trong `auth.users.raw_user_meta_data`. Code này chưa insert vào `public.profiles`; nếu cần đồng bộ bảng đó, dùng trigger đã kiểm tra đúng schema/RLS của bạn.
- Dữ liệu kế hoạch/checklist vẫn là mock trong `localStorage`, dùng chung giữa tài khoản trên cùng trình duyệt. Chưa đọc/ghi các bảng `plans`, `items`, `plan_items`, `plan_groups`.
- Proxy và server layout kiểm tra phiên. Khi thêm API/Server Actions, từng thao tác cần kiểm tra quyền và RLS riêng; layout không thay thế việc đó.
- Không có quên mật khẩu, đăng nhập mạng xã hội hay gửi lại email xác nhận trong lần triển khai này.
