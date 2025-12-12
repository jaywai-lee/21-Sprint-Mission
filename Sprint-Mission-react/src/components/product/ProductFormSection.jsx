import { useEffect, useState } from "react";
import styles from "./ProductFormSection.module.css";
import Input from "../common/Input";
import ProductHeader from "./ProductHeader";
import ProductImageUploader from "./ProductImageUploader";
import ProductTagInput from "./ProductTagInput";

function ProductFormSection({ onFormChange, isActive }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const isValid = name && desc && price && tags.length > 0;
    onFormChange(isValid);
  }, [name, desc, price, tags, onFormChange]);

  return (
    <div className={styles.section}>
      <ProductHeader isActive={isActive} />
      <ProductImageUploader image={image} setImage={setImage} />
      <Input
        label="상품명"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="상품명을 입력해주세요"
      />
      <Input
        label="상품 소개"
        type="textarea"
        className={styles.textarea}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="상품 소개를 입력해주세요"
      />
      <Input
        label="판매가격"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="판매 가격을 입력해주세요"
      />
      <ProductTagInput tags={tags} setTags={setTags} />
    </div>
  );
}

export default ProductFormSection;
