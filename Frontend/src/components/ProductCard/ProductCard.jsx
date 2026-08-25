import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ProductCard.module.css";

const PLACEHOLDER = "https://placehold.co/600x600/f5f5f5/999999?text=Producto";

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}) {
  const image = product.imagen || PLACEHOLDER;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Link to={`${ROUTES.PRODUCTS}/${product.id_producto}`}>
          <img src={image} alt={product.nombre} className={styles.image} />
        </Link>
      </div>
      <div className={styles.body}>
        <Link
          to={`${ROUTES.PRODUCTS}/${product.id_producto}`}
          className={styles.name}
        >
          {product.nombre}
        </Link>
        <p className={styles.price}>{formatCurrency(product.precio)}</p>
      </div>
    </article>
  );
}
