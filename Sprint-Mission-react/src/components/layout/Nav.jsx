import { useState } from "react";
import logoImg from "../../assets/logo.png";
import logoMobile from "../../assets/logo_mobile.png";
import userImg from "../../assets/user.png";
import styles from "./Nav.module.css";
import Button from "../common/Button";

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
          <Button
            text="자유게시판"
            onClick={() => setActive("board")}
            variant={active === "board" ? "navActive" : "nav"}
          ></Button>
          <Button
            text="중고마켓"
            onClick={() => setActive("market")}
            variant={active === "market" ? "navActive" : "nav"}
          ></Button>
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.user} src={userImg} alt="사용자" />
      </div>
    </nav>
  );
}

export default Nav;
