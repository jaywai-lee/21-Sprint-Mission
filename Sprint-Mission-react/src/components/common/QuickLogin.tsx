import styles from "./QuickLogin.module.css";
import google from "../../assets/social/google.png";
import kakao from "../../assets/social/kakao.png";

function QuickLogin() {
  return (
    <div className={styles.quickLogin}>
      <p className={styles.quickLoginContent}>간편 로그인하기</p>
      <div className={styles.social}>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.img} src={google} alt="구글" />
        </a>
        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.img} src={kakao} alt="카카오" />
        </a>
      </div>
    </div>
  );
}

export default QuickLogin;
