import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import TrustBar from "../../components/TrustBar/TrustBar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { fetchCategories } from "../../services/categoryService.js";
import { fetchProducts } from "../../services/productService.js";
import { useWishlist } from "../../hooks/useWishlist.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./Home.module.css";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { has, toggle } = useWishlist();

  useEffect(() => {
    async function load() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(Array.isArray(cats) ? cats.slice(0, 6) : []);
        setProducts(Array.isArray(prods) ? prods.slice(0, 4) : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <HeroSection />

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>Productos destacados</h2>
          <Link to={ROUTES.PRODUCTS} className={styles.link}>
            Ver todos
          </Link>
        </div>
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.id_producto}
              product={product}
              isWishlisted={has(product.id_producto)}
              onToggleWishlist={toggle}
            />
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <h2>Explorar por categorias</h2>
        </div>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id_categoria} category={cat} />
          ))}
        </div>
      </section>

      <TrustBar />
    </>
  );
}
