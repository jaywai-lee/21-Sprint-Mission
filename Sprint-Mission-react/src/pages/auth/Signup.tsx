import { Link } from "react-router-dom";
import AuthHeader from "../../components/common/AuthHeader";
import QuickLogin from "../../components/common/QuickLogin";
import SignupForm from "../../components/signup/SignupForm";
import styles from "./Signup.module.css";

function Signup() {
  return (
    <section className={styles.loginPage}>
      <AuthHeader />
      <SignupForm />
      <QuickLogin />
      <div className={styles.footer}>
        <p className={styles.signupRequestDescription}>이미 회원이신가요?</p>
        <Link to="/login" className={styles.signupRequest}>
          로그인
        </Link>
      </div>
    </section>
  );
}

export default Signup;
