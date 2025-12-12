import { useNavigate } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import Pagination from "../components/layout/Pagination";
import SearchBar from "../components/product/SearchBar";
import SortFilter from "../components/product/SortFilter";
import { fetchProducts, fetchBestProducts } from "../api/productAPI";
import { useEffect, useState } from "react";
import styles from "./Marketplace.module.css";
import Nav from "../components/layout/Nav";
import Button from "../components/common/Button";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [limits, setLimits] = useState({ best: 4, all: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(page, limits.all, search, orderBy);
        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / limits.all));
      } catch (err) {
        console.log(err);
      }
    }
    loadProducts();
  }, [page, search, orderBy, limits.all]);

  useEffect(() => {
    async function loadBest() {
      const data = await fetchBestProducts();
      setBestProducts(data.list);
    }
    loadBest();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setLimits({ best: 1, all: 4 });
      } else if (width <= 1200) {
        setLimits({ best: 2, all: 6 });
      } else {
        setLimits({ best: 4, all: 10 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.marketPage}>
      <Nav />
      <section className={styles.bestProducts}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <ProductList
          products={bestProducts}
          limit={limits.best}
          gridCols={4}
          variant="best"
        />
      </section>

      <section className={styles.allProducts}>
        <div className={styles.toolbar}>
          <h2 className={styles.sectionTitle}>전체 상품</h2>
          <div className={styles.toolbarRight}>
            <SearchBar onSearch={setSearch} />
            <Button
              text="상품 등록하기"
              variant="marketAdd"
              onClick={() => navigate("/additem")}
              className={styles.addButtonPosition}
            ></Button>
            <SortFilter orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
        </div>

        <ProductList
          products={products}
          limit={limits.all}
          gridCols={5}
          variant="all"
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}

export default Marketplace;
