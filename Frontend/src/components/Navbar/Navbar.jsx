import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate(ROUTES.LOGIN, {
        state: {
          from: ROUTES.CART,
          message: "Inicia sesión para ver tu carrito",
        },
      });
    }
  };

  return (
    <header>
      <div className={`container ${styles.inner}`}>
        <Link to={ROUTES.HOME} className={styles.brand}>
          <span className={styles.logoMark}>N</span>
          <span className={styles.logoText}>NOVATB</span>
        </Link>

        <div className={styles.search}>
          <SearchBar />
        </div>

        <nav className={styles.actions} aria-label="Acciones de cuenta">
          {!isAuthenticated ? (
            <>
              <Link to={ROUTES.HOME} className={styles.link}>
                Inicio
              </Link>

              <Link to={ROUTES.REGISTER} className={styles.link}>
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <span className={styles.userName}>
                {user?.nombre ? `Hola, ${user.nombre}` : "Mi cuenta"}
              </span>

              {user?.rol === "proveedor" ? (
                <Link to={ROUTES.PROVIDER} className={styles.link}>
                  Panel
                </Link>
              ) : null}

              <button type="button" className={styles.linkBtn} onClick={logout}>
                Cerrar sesion
              </button>
            </>
          )}

          <Link
            to={ROUTES.CART}
            className={styles.iconBtn}
            onClick={handleCartClick}
            aria-label="Carrito"
          >
            <FiShoppingCart />
            {itemCount > 0 ? (
              <span className={styles.badge}>{itemCount}</span>
            ) : null}
          </Link>

          <Link
            to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}
            className={styles.iconBtn}
            aria-label="Perfil"
          >
            <FiUser />
          </Link>
        </nav>
      </div>
    </header>
  );
}
