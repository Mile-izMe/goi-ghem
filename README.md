# Gói ghém

Ứng dụng checklist chuyến đi bằng Next.js App Router, React và TypeScript. Hiện là bản demo giao diện: không gọi API, không xác thực tài khoản thật và chưa nối Supabase.

## Chạy local

```sh
pnpm install
pnpm dev
```

Mở địa chỉ Local trong terminal. Kiểm tra bằng `pnpm lint` và `pnpm build`.

## Các trang

| URL                   | Nội dung                                           |
| --------------------- | -------------------------------------------------- |
| `/`                   | Landing giới thiệu và checklist minh họa tương tác |
| `/register`           | Đăng ký demo, kiểm tra tên/email/mật khẩu xác nhận |
| `/login`              | Đăng nhập demo                                     |
| `/app`                | Chuyển đến `/app/plans`                            |
| `/app/plans`          | Tìm kiếm, lọc và tạo kế hoạch                      |
| `/app/plans/[planId]` | Checklist, thông tin và tiến độ của một kế hoạch   |
| `/app/items`          | Danh mục đồ dùng tái sử dụng                       |
| `/app/templates`      | Chọn mẫu để tạo kế hoạch                           |

Trang bên trong yêu cầu phiên demo. Mở đường dẫn trực tiếp khi chưa có phiên sẽ chuyển đến đăng nhập, rồi quay lại trang cần mở. Đăng xuất quay về landing. URL không có kế hoạch tương ứng hiển thị trạng thái trống và đường về danh sách.

## Phạm vi demo

- Đăng nhập chấp nhận email hợp lệ và mật khẩu từ 8 ký tự; đăng ký thêm tên và xác nhận mật khẩu. Không gửi, lưu hay kiểm tra mật khẩu với dịch vụ nào.
- `sessionStorage` chỉ giữ tên/email của phiên demo trong tab. Đây là điều hướng giao diện, **không phải bảo vệ dữ liệu hoặc xác thực thật**. Nếu trình duyệt chặn storage, phiên chỉ tồn tại trong bộ nhớ.
- Các phiên demo cùng trình duyệt dùng chung bộ dữ liệu mẫu, không phân tách dữ liệu theo tài khoản.
- Dữ liệu kế hoạch vẫn lưu ở `localStorage`, khóa `goi-ghem:planner:v1`. Đăng xuất không xóa checklist. Thay đổi đồng bộ giữa các tab qua sự kiện storage.
- Giữ nguyên tiện ích Supabase sẵn có trong `utils/supabase`, chưa sử dụng trong luồng mới.
- Model hiện tại vẫn là model mock gồm Plan, Item, PlanItem với `group` dạng chuỗi. Chưa chuyển sang schema database có PlanGroup/PlanVisited.

## Cấu trúc

```text
app/
  page.tsx                    # Landing
  (auth)/                     # Layout chung + login/register
  app/                        # Layout workspace + các route chức năng
components/
  marketing/                  # Header, hero, preview, features, CTA
  auth/                       # Form, phiên demo, chặn truy cập giao diện
  workspace/                  # Provider, sidebar, shell, chọn dialog
  plans/                      # Danh sách, card và hero kế hoạch
  checklist/                  # Chi tiết, nhóm đồ, tổng hợp tiến độ
  items/                      # Danh mục
  templates/                  # Mẫu
  forms/                      # Form nhập/sửa từng loại dữ liệu
  dialogs/                    # Ghép form với thao tác lưu dữ liệu
  ui/                         # Dialog, progress, empty, loading
lib/
  planner-data.ts             # Kiểu dữ liệu, seed, template
  use-planner-store.ts        # Adapter dữ liệu localStorage
  planner/                   # Helper và thao tác hợp nhất đồ dùng
```

Các page chỉ ghép component. Layout dùng chung giữ điều hướng và trạng thái dữ liệu qua các route. Form quản lý nhập liệu/validation; dialog nối form với store. Thêm đồ trùng tên cộng số lượng; chỉnh món đã tick thành món khác hoặc tăng số lượng sẽ bỏ tick. Nhân bản kế hoạch bỏ tick và đặt chi phí về 0.

## Khi nối backend

Thay provider phiên demo bằng xác thực thật và adapter localStorage bằng dữ liệu backend. Kiểm tra phiên/quyền ở server và RLS; client gate không thay thế kiểm soát quyền. Đặt các thao tác tạo kế hoạch kèm nhóm, nhân bản và thêm nhiều món trong giao dịch phù hợp. Không đưa khóa bí mật vào client.

## Ảnh minh họa

Ảnh phong cảnh mang tính gợi cảm hứng, được giữ tại `public/images`:

- Forest: https://images.unsplash.com/photo-1448375240586-882707db888b
- Coast: https://images.unsplash.com/photo-1507525428034-b723cf961d3e
- City: https://images.unsplash.com/photo-1555921015-5532091f6026
