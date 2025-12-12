import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products, limit, gridCols = 4, variant = "default" }) {
  const variantClassMap = {
    best: styles.bestCard,
    all: styles.allCard,
  };

  const imageClassMap = {
    best: styles.bestImage,
    all: styles.allImage,
  };

  const wrapperStyle = variantClassMap[variant] || "";
  const imageClassName = imageClassMap[variant] || "";
  const displayed = limit ? products.slice(0, limit) : products;
  const gridClass =
    gridCols === 5 ? styles.grid5 : gridCols === 4 ? styles.grid4 : "";

  return (
    <section className={`${styles.list} ${gridClass}`}>
      {displayed.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wrapperStyle={wrapperStyle}
          imageClassName={imageClassName}
        />
      ))}
    </section>
  );
}

export default ProductList;
