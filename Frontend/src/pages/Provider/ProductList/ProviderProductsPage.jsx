import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import {
  deleteProduct,
  fetchProviderProducts,
} from "../../../services/providerService.js";
import { formatCurrency } from "../../../utils/formatCurrency.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";
import { ROUTES } from "../../../constants/routes.js";
import styles from "./ProviderProductsPage.module.css";

export default function ProviderProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProviderProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      await load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1>Mis productos</h1>
        <Link to={ROUTES.PROVIDER_NEW}>
          <Button>Nuevo producto</Button>
        </Link>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id_producto}>
                <td>
                  <img
                    src={
                      p.imagen ||
                      "https://placehold.co/64x64/f5f5f5/888?text=+"
                    }
                    alt={p.nombre}
                  />
                </td>
                <td>{p.nombre}</td>
                <td>{formatCurrency(p.precio)}</td>
                <td>{p.stock}</td>
                <td className={styles.actions}>
                  <Link to={`/proveedor/productos/${p.id_producto}/editar`}>
                    Editar
                  </Link>
                  <button type="button" onClick={() => handleDelete(p.id_producto)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
