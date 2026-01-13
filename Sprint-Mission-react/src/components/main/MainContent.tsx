import styles from "./MainContent.module.css";
import bestProduct from "../../assets/main/feature1-image.png";
import searchProduct from "../../assets/main/feature2-image.png";
import registerProduct from "../../assets/main/feature3-image.png";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const navigate = useNavigate();
  return (
    <main>
      <section className={styles.heroBanner}>
        <div className={styles.wrapper}>
          <h1 className={styles.bannerTitle}>
            일상의 모든 물건을
            <br className={styles.break} /> 거래해 보세요
          </h1>
          <button
            onClick={() => navigate("/items")}
            className={styles.pillButton}
          >
            구경하러 가기
          </button>
        </div>
      </section>

      <section className={styles.contentWrapper}>
        <div className={styles.feature}>
          <img className={styles.img} src={bestProduct} alt="인기 상품" />
          <div className={styles.featureContent}>
            <h2 className={styles.featureTags}>Hot item</h2>
            <h1 className={styles.contentTitle}>
              인기 상품을
              <br className={styles.onlyPC} />
              확인해 보세요
            </h1>
            <p className={styles.featureDescription}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTags}>Search</h2>
            <h1 className={styles.contentTitle}>
              구매를 원하는
              <br className={styles.onlyPC} />
              상품을 검색하세요
            </h1>
            <p className={styles.featureDescription}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img className={styles.img} src={searchProduct} alt="상품 검색" />
        </div>

        <div className={styles.feature}>
          <img className={styles.img} src={registerProduct} alt="상품 등록" />
          <div className={styles.featureContent}>
            <h2 className={styles.featureTags}>Register</h2>
            <h1 className={styles.contentTitle}>
              판매를 원하는
              <br className={styles.onlyPC} />
              상품을 등록하세요
            </h1>
            <p className={styles.featureDescription}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles.bottomBanner}>
        <div className={styles.wrapper}>
          <h1 className={styles.bannerTitle}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h1>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
