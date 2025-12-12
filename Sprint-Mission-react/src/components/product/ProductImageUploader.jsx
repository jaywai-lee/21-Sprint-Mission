import styles from "./ProductImageUploader.module.css";
import X from "../../assets/symbol_x.png";
import FileInput from "../common/FileInput";
import { useEffect } from "react";

function ProductImageUploader({ image, setImage }) {
  const handleChange = ({ imageUrl }) => {
    setImage(imageUrl);
  };

  const handleRemove = () => {
    setImage(null);
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageBox}>
        <FileInput onChange={handleChange} />
        {image && (
          <div className={styles.preview}>
            <img src={image} alt="preview" />
            <button
              className={styles.removeBtn}
              onClick={handleRemove}
              type="button"
            >
              <img src={X} alt="remove" />
            </button>
          </div>
        )}
      </div>
      {image && (
        <p className={styles.imageNotice}>
          *이미지 등록은 최대 1개까지 가능합니다.
        </p>
      )}
    </div>
  );
}

export default ProductImageUploader;
