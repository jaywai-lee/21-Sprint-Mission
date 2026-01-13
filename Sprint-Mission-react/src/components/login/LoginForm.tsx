import styles from "./LoginForm.module.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    showPassword,
    setShowPassword,
    touched,
    setTouched,
    isFormValid,
    emailErrorMessage,
    passwordErrorMessage,
    applyServerErrors,
  } = useAuthForm("login");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    const res = await loginApi({ email, password });
    login(res.user, res.accessToken);
    navigate("/items");
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
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

      <div className={styles.loginButtonWrap}>
        <button
          type="submit"
          className={`${styles.loginButton} ${
            isFormValid ? styles.active : ""
          }`}
          disabled={!isFormValid}
        >
          로그인
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
