import Button from "../common/Button";
import styles from "./ProductHeader.module.css";

function ProductHeader({ isActive }) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>상품 등록하기</h2>
      <Button
        type="submit"
        text="등록"
        variant={isActive ? "primary" : "disabled"}
        disabled={!isActive}
      />
    </div>
  );
}

export default ProductHeader;
