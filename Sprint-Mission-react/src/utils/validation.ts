// 유효성 검사 함수
export type ValidationResult = string;

export function validateEmail(value: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) return "이메일을 입력해주세요.";
  if (!emailRegex.test(value)) return "잘못된 이메일 형식입니다.";
  return "";
}

export function validatePassword(value: string): ValidationResult {
  if (!value) return "비밀번호를 입력해주세요.";
  if (value.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
}

export function validatePasswordRepeat(
  password: string,
  repeat: string
): ValidationResult {
  if (!repeat) return "비밀번호를 입력해주세요.";
  if (password !== repeat) return "비밀번호가 일치하지 않습니다.";
}

export function validateNickname(value: string): ValidationResult {
  if (!value) return "닉네임을 입력해주세요.";
  return "";
}
