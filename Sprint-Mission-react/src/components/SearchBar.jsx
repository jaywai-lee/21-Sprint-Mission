import { useState } from "react";
import styles from "./SearchBar.module.css";
import searchImg from "../assets/vector.png";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => setKeyword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <img className={styles.searchIcon} src={searchImg} alt="검색" />
        <input
          className={styles.input}
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          onChange={handleChange}
          value={keyword}
        />
      </div>
    </form>
  );
}

export default SearchBar;
