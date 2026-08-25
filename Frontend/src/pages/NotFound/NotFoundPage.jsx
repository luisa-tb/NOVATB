import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { ROUTES } from "../../constants/routes.js";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={`container ${styles.page}`}>
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <Link to={ROUTES.HOME}>
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
