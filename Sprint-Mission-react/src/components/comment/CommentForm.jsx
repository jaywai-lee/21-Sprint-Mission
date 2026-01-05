import { useState } from "react";
import styles from "./CommentForm.module.css";

function CommentForm() {
  const [content, setContent] = useState("");
  const isActive = content.trim().length > 0;

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <>
      <div className={styles.question}>
        <p className={styles.questionTitle}>문의하기</p>
      </div>
      <div className={styles.questionInputWrapper}>
        <textarea
          className={styles.questionInput}
          value={content}
          onChange={handleChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
      </div>
      <div className={styles.questionButtonWrapper}>
        <button
          className={`${styles.questionButton} ${
            isActive ? styles.active : styles.disabled
          }`}
          disabled={!isActive}
        >
          등록
        </button>
      </div>
    </>
  );
}

export default CommentForm;
