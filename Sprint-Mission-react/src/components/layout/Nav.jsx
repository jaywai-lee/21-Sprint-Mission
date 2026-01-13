import { useState } from "react";
import logoImg from "../../assets/logo.png";
import logoMobile from "../../assets/logo_mobile.png";
import userImg from "../../assets/user.png";
import styles from "./Nav.module.css";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [active, setActive] = useState("market");

  const handleNavigateToBoard = () => {
    setActive("board");
    navigate("/");
  };

  const handleNavigateToMarket = () => {
    setActive("market");
    navigate("/items");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/">
          <picture className={styles.logoWrap}>
            <source media="(max-width: 743px)" srcSet={logoMobile} />
            <img className={styles.logo} src={logoImg} alt="logo" />
          </picture>
        </Link>
        <div className={styles.menu}>
          <Button
            text="자유게시판"
            onClick={handleNavigateToBoard}
            variant={active === "board" ? "navActive" : "nav"}
          ></Button>
          <Button
            text="중고마켓"
            onClick={handleNavigateToMarket}
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
