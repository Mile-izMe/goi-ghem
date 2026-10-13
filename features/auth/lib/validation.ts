export type LoginInput = { email: string; password: string };
export type RegisterInput = LoginInput & {
  fullName: string;
  confirmPassword: string;
};

export function validateLogin(input: LoginInput): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()))
    return "Nhập địa chỉ email hợp lệ nhé.";
  if (!input.password) return "Bạn chưa nhập mật khẩu.";
  return null;
}

export function validateRegister(input: RegisterInput): string | null {
  if (!input.fullName.trim() || input.fullName.trim().length > 60)
    return "Tên của bạn cần từ 1 đến 60 ký tự.";
  const loginError = validateLogin(input);
  if (loginError) return loginError;
  if (input.password.length < 8) return "Mật khẩu cần ít nhất 8 ký tự.";
  if (input.password.length > 128) return "Mật khẩu không vượt quá 128 ký tự.";
  if (input.password !== input.confirmPassword)
    return "Hai mật khẩu chưa khớp nhau.";
  return null;
}
