import LoginForm from "../../components/login/LoginForm";
import QuickLogin from "../../components/common/QuickLogin";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/common/AuthHeader";

function Login() {
  return (
    <section className={styles.loginPage}>
      <AuthHeader />
      <LoginForm />
      <QuickLogin />
      <div className={styles.footer}>
        <p className={styles.loginRequestDescription}>
          판다마켓이 처음이신가요?
        </p>
        <Link to="/signup" className={styles.loginRequest}>
          회원가입
        </Link>
      </div>
    </section>
  );
}

export default Login;
