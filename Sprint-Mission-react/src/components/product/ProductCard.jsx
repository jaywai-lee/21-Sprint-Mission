import styles from "./ProductCard.module.css";
import placeholderImg from "../../assets/placeholder.png";
import likeImg from "../../assets/likes.png";

function ProductCard({ product, wrapperStyle, imageClassName }) {
  const { name, price, favoriteCount, images } = product;
  const displayImage = images || placeholderImg;

  return (
    <div className={`${styles.card} ${wrapperStyle || ""}`}>
      <img
        className={`${styles.image} ${imageClassName || ""}`}
        src={displayImage}
        alt={name}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price.toLocaleString()}원</p>
        <div className={styles.likes}>
          <img className={styles.likeIcon} src={likeImg} alt="like" />
          <span className={styles.like}>{favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
