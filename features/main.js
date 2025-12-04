import {
  showEmailError,
  showPasswordError,
  showNicknameError,
  updateLoginButtonState,
  updateSignUpButtonState,
  handleLoginSubmit,
  handleSignUpSubmit,
  togglePasswordVisibility,
} from "./auth.js";

const idInput = document.querySelector(".input-email input");
const pwInput = document.querySelector(".input-password input");
const pwReInput = document.querySelector(".input-password-repeat input");
const nnInput = document.querySelector(".input-nickname input");
const loginBtn = document.querySelector(".login-button");
const signUpBtn = document.querySelector(".signup-button");

// 초기화
function init() {
  // 로그인 관련
  if (idInput) idInput.addEventListener("keyup", updateLoginButtonState);
  if (pwInput) pwInput.addEventListener("keyup", updateLoginButtonState);

  // 회원가입 관련
  if (signUpBtn && nnInput && pwReInput) {
    idInput.addEventListener("keyup", updateSignUpButtonState);
    pwInput.addEventListener("keyup", updateSignUpButtonState);
    nnInput.addEventListener("keyup", updateSignUpButtonState);
    pwReInput.addEventListener("keyup", updateSignUpButtonState);
  }

  // 회원가입 관련
  if (loginBtn) loginBtn.addEventListener("click", handleLoginSubmit);
  if (signUpBtn) signUpBtn.addEventListener("click", handleSignUpSubmit);

  // 에러 메시지
  if (idInput) idInput.addEventListener("focusout", showEmailError);
  if (pwInput) pwInput.addEventListener("focusout", showPasswordError);
  if (pwReInput) pwReInput.addEventListener("focusout", showPasswordError);
  if (nnInput) nnInput.addEventListener("focusout", showNicknameError);

  // 눈 아이콘
  togglePasswordVisibility(".input-password input", ".input-password .eyes");
  togglePasswordVisibility(
    ".input-password-repeat input",
    ".input-password-repeat .eyes"
  );
}

init();
