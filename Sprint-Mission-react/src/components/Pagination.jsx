import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pagesPerGroup = 5;
  const [pageGroup, setPageGroup] = useState(0);

  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  useEffect(() => {
    const newGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    if (newGroup !== pageGroup) setPageGroup(newGroup);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
