import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { ROUTES } from "../../constants/routes.js";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <div className={styles.brand}>NOVA TB</div>
          <p className={styles.text}>
            Moda minimalista y funcional para tu día a día.
          </p>
          <div className={styles.social}>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://www.facebook.com" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="http://www.tiktok.com" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="http://www.youtube.com" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>

        <div>
          <h3 className={styles.title}>Categorías</h3>
          <ul className={styles.list}>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=1`}>Tecnología</Link>
            </li>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=2`}>Deporte</Link>
            </li>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=3`}>Juguetes</Link>
            </li>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=4`}>Belleza</Link>
            </li>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=5`}>Mecanica</Link>
            </li>
            <li>
              <Link to={`${ROUTES.PRODUCTS}?categoria=6`}>Hogar</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Ayuda</h3>
          <ul className={styles.list}>
            <li>Centro de ayuda</li>
            <li>Envíos</li>
            <li>Devoluciones</li>
            <li>Términos y condiciones</li>
            <li>Privacidad</li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Suscríbete</h3>
          <p className={styles.text}>Recibe novedades y ofertas exclusivas</p>
          <form
            className={styles.newsletter}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Tu correo" aria-label="Email" />
            <button type="submit" aria-label="Suscribirse">
              →
            </button>
          </form>
        </div>
      </div>
      <div className={styles.copy}>
        © NOVATB. Todos los derechos reservados.
      </div>
    </footer>
  );
}
