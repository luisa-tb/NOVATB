import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import { ROUTES } from "../../constants/routes.js";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <span className={styles.tag}>Nueva colección</span>
          <h1 className={styles.title}>Estilo que te representa</h1>
          <p className={styles.text}>
            Descubre piezas esenciales con diseño minimalista y calidad pensada
            para acompañarte todos los días.
          </p>
          <Link to={ROUTES.PRODUCTS} className={styles.ctaLink}>
            <Button>Ver colección →</Button>
          </Link>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <img
            src="/imagenCategorias/logo1.png"
            alt=""
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
