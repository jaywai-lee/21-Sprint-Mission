import { useState } from "react";
import styles from "./ProductTagInput.module.css";
import X from "../../assets/symbol_x.png";

function ProductTagInput({ tags, setTags }) {
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.tags}>
      <label>태그</label>
      <input
        className={styles.tagInput}
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
        placeholder="태그를 입력해주세요"
      />
      <div className={styles.tagList}>
        {tags.map((tag, i) => (
          <span key={`${tag}-${i}`} className={styles.tag}>
            #{tag}
            <img src={X} alt="remove" onClick={() => handleRemoveTag(i)} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProductTagInput;
