import styles from "./ProductCard.module.css";
import placeholderImg from "../../assets/placeholder.png";
import likeImg from "../../assets/likes.png";
import { Link } from "react-router-dom";

function ProductCard({ product, wrapperStyle, imageClassName }) {
  const { id, name, price, favoriteCount, images } = product;
  const displayImage = images || placeholderImg;

  return (
    <Link
      to={`/items/${id}`}
      className={`${styles.card} ${wrapperStyle || ""}`}
    >
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
    </Link>
  );
}

export default ProductCard;
