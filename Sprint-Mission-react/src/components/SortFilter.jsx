import { useEffect, useRef, useState } from "react";
import styles from "./SortFilter.module.css";
import arrowDownImg from "../assets/arrow_down.png";
import sortImg from "../assets/sort.png";

function SortFilter({ orderBy, setOrderBy }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  const handleSelect = (value) => {
    setOrderBy(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    options.find((opt) => opt.value === orderBy)?.label || "정렬";

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.toggleBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentLabel}
        <img
          src={arrowDownImg}
          alt="arrowDown"
          className={`${styles.arrow} ${open ? styles.rotate : ""}`}
        />
      </button>
      <button
        className={styles.mobileBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={sortImg} alt="sort" className={styles.sortIcon} />
      </button>
      {open && (
        <div className={styles.menu}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`${styles.option} ${
                orderBy === opt.value ? styles.active : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortFilter;
