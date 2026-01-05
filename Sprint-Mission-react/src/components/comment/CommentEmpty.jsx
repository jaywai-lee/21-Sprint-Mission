import styles from "./CommentEmpty.module.css";
import empty from "../../assets/empty.png";

function CommentEmpty() {
  return (
    <div className={styles.emptyWrapper}>
      <img src={empty} alt="empty" />
      <p className={styles.emptyComment}>아직 문의가 없어요</p>
    </div>
  );
}

export default CommentEmpty;
