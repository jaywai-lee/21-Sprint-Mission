const idInput = document.querySelector('.input-email input');
const pwInput = document.querySelector('.input-password input');
const loginBtn = document.querySelector('.login-button');
const nnInput = document.querySelector('.input-nickname input');
const signUpBtn = document.querySelector('.signup-button');
const pwReInput = document.querySelector('.input-password-repeat input');

const isActiveLogin = () => {
  let idValue = idInput.value.trim();
  let pwValue = pwInput.value.trim();

  if (idValue && pwValue && pwValue.length >= 8 && idValue.includes('@')) {
    loginBtn.disabled = false;
    loginBtn.classList.add('active');
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove('active');
  }
};

function isActiveLoginBtn(event) {
  event.preventDefault();

  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();

  if (!idValue || !pwValue) return;
  if (!idValue.includes('@')) return;
  if (pwValue.length < 8) return;

  window.location.href = './item.html';
}

const isActiveSignUp = () => {
  if (!signUpBtn || !nnInput || !pwReInput) return;

  let idValue = idInput.value.trim();
  let pwValue = pwInput.value.trim();
  let nnValue = nnInput.value.trim();
  let pwReValue = pwReInput.value.trim();

  if (
    idValue &&
    pwValue &&
    pwReValue &&
    nnValue &&
    pwValue === pwReValue &&
    pwValue.length >= 8 &&
    idValue.includes('@')
  ) {
    signUpBtn.disabled = false;
    signUpBtn.classList.add('active');
  } else {
    signUpBtn.disabled = true;
    signUpBtn.classList.remove('active');
  }
};

function isActiveSignUpBtn(event) {
  event.preventDefault();

  const idValue = idInput.value.trim();
  const pwValue = pwInput.value.trim();
  const nnValue = nnInput.value.trim();
  const pwReValue = pwReInput.value.trim();

  if (!idValue || !pwValue || !nnValue || !pwReValue) return;
  if (!idValue.includes('@')) return;
  if (pwValue.length < 8) return;

  window.location.href = './login.html';
}

const emailErrorMessage = () => {
  const idValue = idInput.value.trim();
  const existingMsg = document.querySelector('.id-error-msg');
  if (existingMsg) existingMsg.remove();

  const errorMsg = document.createElement('strong');
  errorMsg.classList.add('id-error-msg');

  if (idValue === '') {
    errorMsg.innerText = '이메일을 입력해주세요.';
    idInput.classList.add('error-border');
    idInput.insertAdjacentElement('afterend', errorMsg);
  } else if (!idValue.includes('@')) {
    errorMsg.innerText = '잘못된 이메일 형식입니다.';
    idInput.classList.add('error-border');
    idInput.insertAdjacentElement('afterend', errorMsg);
  } else {
    idInput.classList.remove('error-border');
  }
};

const pwErrorMessage = () => {
  if (!pwInput) return;

  const pwValue = pwInput.value.trim();
  const pwReValue = pwReInput ? pwReInput.value.trim() : '';

  const pwWrapper = pwInput.parentElement.querySelector('.error-wrapper');
  const pwReWrapper = pwReInput
    ? pwReInput.parentElement.querySelector('.error-wrapper')
    : null;

  pwWrapper.innerHTML = '';
  if (pwReWrapper) pwReWrapper.innerHTML = '';

  const errorMsg = document.createElement('strong');
  errorMsg.classList.add('pw-error-msg');

  pwInput.parentElement.style.position = 'relative';
  if (pwReInput) {
    pwReInput.parentElement.style.position = 'relative';
  }

  if (pwValue === '') {
    errorMsg.innerText = '비밀번호를 입력해주세요.';
    pwInput.classList.add('error-border');
    if (pwWrapper) pwWrapper.appendChild(errorMsg);
    if (pwReInput) {
      pwReInput.classList.remove('error-border');
    }
    return;
  }

  if (pwValue.length < 8) {
    errorMsg.innerText = '비밀번호를 8자 이상 입력해주세요.';
    pwInput.classList.add('error-border');
    if (pwWrapper) pwWrapper.appendChild(errorMsg);
    if (pwReInput) {
      pwReInput.classList.remove('error-border');
    }
    return;
  }

  if (pwReInput && pwReValue !== pwValue) {
    errorMsg.innerText = '비밀번호가 일치하지 않습니다.';
    pwReInput.classList.add('error-border');
    if (pwReWrapper) pwReWrapper.appendChild(errorMsg);
    pwInput.classList.remove('error-border');
    return;
  }

  pwInput.classList.remove('error-border');
  if (pwReInput) {
    pwReInput.classList.remove('error-border');
  }
};

const nnErrorMessage = () => {
  if (!nnInput) return;

  const nnValue = nnInput.value.trim();
  const existingMsg = document.querySelector('.nn-error-msg');
  if (existingMsg) existingMsg.remove();

  const errorMsg = document.createElement('strong');
  errorMsg.classList.add('nn-error-msg');

  if (nnValue === '') {
    errorMsg.innerText = '닉네임을 입력해주세요.';
    nnInput.classList.add('error-border');
    nnInput.insertAdjacentElement('afterend', errorMsg);
  } else {
    nnInput.classList.remove('error-border');
  }
};

const togglePasswordVisibility = (inputSelector, buttonSelector) => {
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(buttonSelector);
  const icon = button ? button.querySelector('i') : null;

  if (!input || !button || !icon) return;

  if (!button.type || button.type.toLowerCase() === 'submit') {
    button.type = 'button';
  }

  button.addEventListener('click', (event) => {
    event.preventDefault();

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';

    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
};

const init = () => {
  // 로그인 관련
  if (idInput) idInput.addEventListener('keyup', isActiveLogin);
  if (pwInput) pwInput.addEventListener('keyup', isActiveLogin);

  // 버튼 관련
  if (loginBtn) loginBtn.addEventListener('click', isActiveLoginBtn);
  if (signUpBtn) signUpBtn.addEventListener('click', isActiveSignUpBtn);

  // 회원가입 관련
  if (signUpBtn && nnInput && pwReInput) {
    idInput.addEventListener('keyup', isActiveSignUp);
    pwInput.addEventListener('keyup', isActiveSignUp);
    nnInput.addEventListener('keyup', isActiveSignUp);
    pwReInput.addEventListener('keyup', isActiveSignUp);
  }

  // 에러 메시지
  if (idInput) idInput.addEventListener('focusout', emailErrorMessage);
  if (pwInput) pwInput.addEventListener('focusout', pwErrorMessage);
  if (pwReInput) pwReInput.addEventListener('focusout', pwErrorMessage);
  if (nnInput) nnInput.addEventListener('focusout', nnErrorMessage);

  // 눈 아이콘
  togglePasswordVisibility('.input-password input', '.input-password .eyes');
  togglePasswordVisibility(
    '.input-password-repeat input',
    '.input-password-repeat .eyes'
  );
};

init();
