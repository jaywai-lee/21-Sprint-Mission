import { Link } from "react-router-dom";
import styles from "./MainHeader.module.css";
import mobileLogo from "../../assets/logo/panda-market-logo-mobile.png";
import logo from "../../assets/logo/panda-market-logo.png";
import { useAuth } from "../../context/AuthContext";

function MainHeader() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header>
      <Link to="/">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileLogo} />
          <img className={styles.pandaLogo} alt="판다마켓 로고" src={logo} />
        </picture>
      </Link>
      {isAuthenticated ? (
        <button className={styles.loginButton} onClick={logout}>
          로그아웃
        </button>
      ) : (
        <Link className={styles.loginButton} to="/login">
          로그인
        </Link>
      )}
    </header>
  );
}

export default MainHeader;
