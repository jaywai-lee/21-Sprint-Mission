import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products, limit, gridCols = 4, variant = "all" }) {
  if (!products || products.length === 0) {
    return <p className={styles.empty}>상품이 없습니다.</p>;
  }

  const displayed = limit ? products.slice(0, limit) : products;
  const gridClass =
    gridCols === 5 ? styles.grid5 : gridCols === 4 ? styles.grid4 : "";

  return (
    <section className={`${styles.list} ${gridClass}`}>
      {displayed.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </section>
  );
}

export default ProductList;
