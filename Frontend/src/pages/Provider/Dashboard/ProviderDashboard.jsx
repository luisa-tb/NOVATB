import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader.jsx";
import { fetchProviderProducts } from "../../../services/providerService.js";
import { ROUTES } from "../../../constants/routes.js";
import styles from "./ProviderDashboard.module.css";

export default function ProviderDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Cargando panel..." />;

  return (
    <div className={styles.page}>
      <h1>Panel del proveedor</h1>
      <p className={styles.sub}>Gestiona tu catálogo de productos.</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>Productos</span>
          <strong>{products.length}</strong>
        </div>
      </div>
      <Link to={ROUTES.PROVIDER_NEW} className={styles.cta}>
        + Agregar producto
      </Link>
    </div>
  );
}
