import { useState } from "react";
import Nav from "../components/layout/Nav";
import styles from "./AddItem.module.css";
import ProductFormSection from "../components/product/ProductFormSection";

function AddItem() {
  const [isActive, setIsActive] = useState(false);

  const handleFormChange = (isFormValid) => {
    setIsActive(isFormValid);
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    if (!isActive) return;
    console.log("상품 등록 완료");
  };

  return (
    <div className={styles.page}>
      <Nav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <ProductFormSection
          onFormChange={handleFormChange}
          isActive={isActive}
        />
      </form>
    </div>
  );
}

export default AddItem;
