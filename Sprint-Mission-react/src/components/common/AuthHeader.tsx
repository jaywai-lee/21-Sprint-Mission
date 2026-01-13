import { Link } from "react-router-dom";
import styles from "./AuthHeader.module.css";
import pandaLogo from "../../assets/logo/panda-market-logo.png";

function AuthHeader() {
  return (
    <div className={styles.loginLogo}>
      <Link to="/">
        <img className={styles.pandaLogo} src={pandaLogo} alt="판다로고" />
      </Link>
    </div>
  );
}

export default AuthHeader;
