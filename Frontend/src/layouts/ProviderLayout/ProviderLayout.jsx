import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ProviderLayout.module.css";

export default function ProviderLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link to={ROUTES.HOME} className={styles.brand}>
          NOVA TB · Proveedor
        </Link>
        <nav className={styles.nav}>
          <Link to={ROUTES.PROVIDER}>Dashboard</Link>
          <Link to={ROUTES.PROVIDER_PRODUCTS}>Mis productos</Link>
          <Link to={ROUTES.PROVIDER_NEW}>Nuevo producto</Link>
          <Link to={ROUTES.HOME}>Inicio</Link>
        </nav>
      </aside>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
