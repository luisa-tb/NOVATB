import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useProducts } from "../../hooks/useProducts.js";
import { useWishlist } from "../../hooks/useWishlist.js";
import styles from "./ProductsPage.module.css";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre") || undefined;
  const categoria = searchParams.get("categoria") || undefined;
  const [page, setPage] = useState(1);
  const params = useMemo(() => ({ nombre, categoria }), [nombre, categoria]);
  const { products, loading, error } = useProducts(params);
  const { has, toggle } = useWishlist();

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const current = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1>Productos</h1>
        <p className={styles.sub}>
          {nombre
            ? `Resultados para "${nombre}"`
            : categoria
              ? `Categoría #${categoria}`
              : "Catálogo completo"}
        </p>
      </header>

      {loading ? <Loader /> : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      {!loading && !products.length ? (
        <p>No hay productos para mostrar.</p>
      ) : null}

      <div className={styles.grid}>
        {current.map((product) => (
          <ProductCard
            key={product.id_producto}
            product={product}
            isWishlisted={has(product.id_producto)}
            onToggleWishlist={toggle}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
