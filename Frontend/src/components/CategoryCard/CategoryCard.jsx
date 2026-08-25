import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ category, imageUrl }) {
  const categoryImagenes = {
    1: "/imagenCategorias/CategoriaTecnologia.png",
    2: "/imagenCategorias/CategoriaDeporte.png",
    7: "/imagenCategorias/CategoriaJueguete.png",
    11: "/imagenCategorias/CategoriaBelleza.png",
    12: "/imagenCategorias/CategoriaMecanica.png",
    78: "/imagenCategorias/CategoriaHogar.png",
  };

  const img =
    imageUrl ||
    categoryImagenes[category.id_categoria] ||
    "/imagenCategorias/default.png";

  return (
    <Link
      to={`${ROUTES.PRODUCTS}?categoria=${category.id_categoria}`}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img src={img} alt={category.nombre} className={styles.image} />
      </div>
      <h3 className={styles.title}>{category.nombre}</h3>
    </Link>
  );
}
