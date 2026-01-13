import styles from "./MainFooter.module.css";
import facebook from "../../assets/social/facebook-logo.svg";
import twitter from "../../assets/social/twitter-logo.svg";
import youtube from "../../assets/social/youtube-logo.svg";
import instagram from "../../assets/social/instagram-logo.svg";

function MainFooter() {
  return (
    <div className={styles.footer}>
      <div>@codeit - 2024</div>
      <div className={styles.footerMenu}>
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div className={styles.socialMedia}>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.social} src={facebook} alt="페이스북" />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.social} src={twitter} alt="트위터" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.social} src={youtube} alt="유투브" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.social} src={instagram} alt="인스타그램" />
        </a>
      </div>
    </div>
  );
}

export default MainFooter;
