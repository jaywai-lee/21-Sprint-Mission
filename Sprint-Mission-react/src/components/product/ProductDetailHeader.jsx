import styles from "./ProductDetailHeader.module.css";
import heart from "../../assets/heart.png";
import user from "../../assets/user.png";
import { formatDate } from "../../utils/formatDate";

function ProductDetailHeader({ product, onLike }) {
  return (
    <>
      <div className={styles.productWrapper}>
        <img
          className={styles.productImage}
          src={product.images}
          alt="product image"
        />

        <div className={styles.product}>
          <div className={styles.productTop}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price}원</p>
            <div className={styles.horizon}></div>
          </div>

          <div className={styles.productMiddle}>
            <p className={styles.descriptionTitle}>상품 소개</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.productTags}>
              <p className={styles.tagTitle}>상품 태그</p>
              <ul className={styles.tags}>
                {product.tags.map((tag, i) => (
                  <li key={`tag-${tag}-${i}`}>#{tag}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.user}>
            <div className={styles.userLeft}>
              <img src={user} alt="user" />
              <div className={styles.userInfo}>
                <p className={styles.userName}>{product.ownerNickname}</p>
                <p className={styles.userCreatedAt}>
                  {formatDate(product.createdAt)}
                </p>
              </div>
            </div>

            <div className={styles.favorite}>
              <button className={styles.likeButton}>
                <img src={heart} alt="heart" />
                {product.favoriteCount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailHeader;
