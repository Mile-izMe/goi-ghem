export function getAuthErrorMessage(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error ? error.code : "";
  switch (code) {
    case "invalid_credentials":
      return "Email hoặc mật khẩu chưa đúng. Bạn kiểm tra lại nhé.";
    case "email_not_confirmed":
      return "Bạn cần xác nhận email trước khi đăng nhập. Hãy kiểm tra cả thư mục spam nhé.";
    case "weak_password":
      return "Mật khẩu chưa đủ mạnh. Hãy dùng mật khẩu dài hơn, có chữ hoa, chữ thường, số và ký tự đặc biệt.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Bạn thao tác hơi nhanh. Vui lòng chờ một lát rồi thử lại.";
    case "signup_disabled":
      return "Đăng ký đang tạm đóng. Bạn thử lại sau nhé.";
    case "email_address_invalid":
      return "Địa chỉ email chưa hợp lệ. Bạn kiểm tra lại nhé.";
    case "user_already_exists":
      return "Không thể đăng ký bằng thông tin này. Nếu đã có tài khoản, hãy đăng nhập.";
    case "auth_not_configured":
      return "Chưa cấu hình kết nối Supabase. Hãy kiểm tra biến môi trường của project.";
    default:
      return "Chưa thể kết nối để hoàn tất. Bạn kiểm tra mạng và thử lại nhé.";
  }
}
