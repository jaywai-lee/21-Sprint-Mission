import {
  validateEmail,
  validatePassword,
  validateNickname,
} from "./validation.js";

// DOM 요소 선택
const idInput = document.querySelector(".input-email input");
const pwInput = document.querySelector(".input-password input");
const pwReInput = document.querySelector(".input-password-repeat input");
const nnInput = document.querySelector(".input-nickname input");
const loginBtn = document.querySelector(".login-button");
const signUpBtn = document.querySelector(".signup-button");

// 에러 메시지 표시 함수
export function showEmailError() {
  const idValue = idInput.value.trim();
  const wrapper = document.querySelector(".id-error-wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";
  const msg = validateEmail(idValue);

  if (msg) {
    const errorMsg = document.createElement("strong");
    errorMsg.classList.add("id-error-msg");
    errorMsg.innerText = msg;
    wrapper.appendChild(errorMsg);
    idInput.classList.add("error-border");
  } else {
    idInput.classList.remove("error-border");
  }
}

export function showPasswordError() {
  const pwValue = pwInput.value.trim();
  const pwReValue = pwReInput ? pwReInput.value.trim() : "";

  const pwWrapper = pwInput.parentElement.querySelector(".pw-error-wrapper");
  const pwReWrapper = pwReInput
    ? pwReInput.parentElement.querySelector(".pw-error-wrapper")
    : null;

  pwWrapper.innerHTML = "";
  if (pwReWrapper) pwReWrapper.innerHTML = "";

  const msg = validatePassword(pwValue, pwReValue);

  if (msg) {
    const errorMsg = document.createElement("strong");
    errorMsg.classList.add("pw-error-msg");
    errorMsg.innerText = msg;
    pwWrapper.appendChild(errorMsg);

    if (msg.includes("일치")) {
      pwReWrapper?.appendChild(errorMsg);
      pwReInput.classList.add("error-border");
      pwInput.classList.remove("error-border");
    } else {
      pwWrapper?.appendChild(errorMsg);
      pwInput.classList.add("error-border");
      pwReInput.classList.remove("error-border");
    }
  } else {
    pwInput.classList.remove("error-border");
    pwReInput?.classList.remove("error-border");
  }
}

export function showNicknameError() {
  const nnValue = nnInput.value.trim();
  const wrapper = document.querySelector(".nn-error-wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";
  const msg = validateNickname(nnValue);

  if (msg) {
    const errorMsg = document.createElement("strong");
    errorMsg.classList.add("nn-error-msg");
    errorMsg.innerText = msg;
    wrapper.appendChild(errorMsg);
    nnInput.classList.add("error-border");
  } else {
    nnInput.classList.remove("error-border");
  }
}

//버튼 활성화
export function updateLoginButtonState() {
  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();

  const emailValid = !validateEmail(idValue);
  const pwValid = pwValue.length >= 8;

  if (emailValid && pwValid) {
    loginBtn.disabled = false;
    loginBtn.classList.add("active");
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove("active");
  }
}

export function updateSignUpButtonState() {
  if (!signUpBtn || !nnInput || !pwReInput) return;

  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();
  const pwReValue = pwReInput.value.trim();
  const nnValue = nnInput.value.trim();

  const emailValid = !validateEmail(idValue);
  const pwValid = !validatePassword(pwValue, pwReValue);
  const nnValid = !validateNickname(nnValue);

  if (emailValid && pwValid && nnValid) {
    signUpBtn.disabled = false;
    signUpBtn.classList.add("active");
  } else {
    signUpBtn.disabled = true;
    signUpBtn.classList.remove("active");
  }
}

// 폼 제출 관련
export function handleLoginSubmit(event) {
  event.preventDefault();

  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();

  if (validateEmail(idValue) || validatePassword(pwValue)) return;

  window.location.href = "./item.html";
}

export function handleSignUpSubmit(event) {
  event.preventDefault();

  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();
  const nnValue = nnInput.value.trim();
  const pwReValue = pwReInput.value.trim();

  if (
    validateEmail(idValue) ||
    validatePassword(pwValue, pwReValue) ||
    validateNickname(nnValue)
  )
    return;

  window.location.href = "./login.html";
}

// 비밀번호 표시 / 숨기기
export const togglePasswordVisibility = (inputSelector, buttonSelector) => {
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(buttonSelector);
  const icon = button ? button.querySelector("i") : null;

  if (!input || !button || !icon) return;

  if (!button.type || button.type.toLowerCase() === "submit") {
    button.type = "button";
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
};
