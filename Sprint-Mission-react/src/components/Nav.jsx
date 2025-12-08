import { useState } from "react";
import logoImg from "../assets/logo.png";
import logoMobile from "../assets/logo_mobile.png";
import userImg from "../assets/user.png";
import styles from "./Nav.module.css";

function Nav() {
  const [active, setActive] = useState("market");

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <picture className={styles.logoWrap}>
          <source media="(max-width: 743px)" srcSet={logoMobile} />
          <img className={styles.logo} src={logoImg} alt="logo" />
        </picture>
        <div className={styles.menu}>
          <button
            className={`${styles.btn} ${
              active === "board" ? styles.active : ""
            }`}
            onClick={() => setActive("board")}
          >
            자유게시판
          </button>
          <button
            className={`${styles.btn} ${
              active === "market" ? styles.active : ""
            }`}
            onClick={() => setActive("market")}
          >
            중고마켓
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.user} src={userImg} alt="사용자" />
      </div>
    </nav>
  );
}

export default Nav;
