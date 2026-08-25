import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ROUTES } from "../../constants/routes.js";
import styles from "./SearchBar.module.css";

export default function SearchBar({ defaultValue = "" }) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(
      trimmed
        ? `${ROUTES.PRODUCTS}?nombre=${encodeURIComponent(trimmed)}`
        : ROUTES.PRODUCTS,
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} role="search">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className={styles.input}
        aria-label="Buscar productos"
      />
      <button type="submit" className={styles.button} aria-label="Buscar">
        <FiSearch />
      </button>
    </form>
  );
}
