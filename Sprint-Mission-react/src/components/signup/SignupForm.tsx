import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";
import { useAuthForm } from "../../hooks/useAuthForm";
import styles from "./SignupForm.module.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

function SignupForm() {
  const {
    email,
    password,
    passwordRepeat,
    nickname,
    setEmail,
    setPassword,
    setPasswordRepeat,
    setNickname,
    showPassword,
    setShowPassword,
    showPasswordRepeat,
    setShowPasswordRepeat,
    touched,
    setTouched,
    isFormValid,
    emailErrorMessage,
    passwordErrorMessage,
    passwordRepeatErrorMessage,
    nicknameErrorMessage,
    applyServerErrors,
  } = useAuthForm("signup");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
      passwordRepeat: true,
      nickname: true,
    });
    if (!isFormValid) return;
    try {
      await signup({
        email,
        password,
        nickname,
        passwordConfirmation: passwordRepeat,
      });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const details = err.response?.data?.details;
        if (details) {
          applyServerErrors(details);
        }
      }
    }
  };

  return (
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      <div className={styles.inputEmail}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          className={`${styles.input} ${
            emailErrorMessage && touched.email ? styles.errorBorder : ""
          }`}
          value={email}
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
        />
        {touched.email && emailErrorMessage && (
          <strong className={styles.errorMsg}>{emailErrorMessage}</strong>
        )}
      </div>

      <div className="input-nickname">
        <label className={styles.label} htmlFor="nickname">
          닉네임
        </label>
        <input
          className={`${styles.input} ${
            nicknameErrorMessage && touched.nickname ? styles.errorBorder : ""
          }`}
          value={nickname}
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, nickname: true }))}
        />
        {touched.nickname && nicknameErrorMessage && (
          <strong className={styles.errorMsg}>{nicknameErrorMessage}</strong>
        )}
      </div>

      <div className={styles.inputPassword}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          className={`${styles.input} ${
            passwordErrorMessage && touched.password ? styles.errorBorder : ""
          }`}
          value={password}
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
        />
        <button
          type="button"
          className={styles.eyes}
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
        </button>
        {touched.password && passwordErrorMessage && (
          <strong className={styles.errorMsg}>{passwordErrorMessage}</strong>
        )}
      </div>

      <div className={styles.inputPasswordRepeat}>
        <label className={styles.label} htmlFor="passwordConfirm">
          비밀번호 확인
        </label>
        <input
          className={`${styles.input} ${
            passwordRepeatErrorMessage && touched.passwordRepeat
              ? styles.errorBorder
              : ""
          }`}
          value={passwordRepeat}
          type={showPasswordRepeat ? "text" : "password"}
          id="passwordConfirm"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          onChange={(e) => setPasswordRepeat(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, passwordRepeat: true }))}
        />
        <button
          type="button"
          className={styles.eyes}
          onClick={() => setShowPasswordRepeat((p) => !p)}
        >
          {showPasswordRepeat ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
        </button>
        {touched.passwordRepeat && passwordRepeatErrorMessage && (
          <strong className={styles.errorMsg}>
            {passwordRepeatErrorMessage}
          </strong>
        )}
      </div>

      <div className="signup-button-wrap">
        <button
          type="submit"
          className={`${styles.signupButton} ${
            isFormValid ? styles.active : ""
          }`}
          disabled={!isFormValid}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
