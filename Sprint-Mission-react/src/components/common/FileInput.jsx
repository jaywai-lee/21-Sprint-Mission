import styles from "./FileInput.module.css";
import placeholderImg from "../../assets/fileinput_placeholder.png";

function FileInput({ onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    onChange({ file, imageUrl });
    e.target.value = "";
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>상품 이미지</label>
      <div className={styles.imageBox}>
        <label className={styles.uploadBox}>
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <img
            className={styles.placeholder}
            src={placeholderImg}
            alt="placeholder"
          />
        </label>
      </div>
    </div>
  );
}

export default FileInput;
