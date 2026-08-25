import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { fetchProductById } from "../../services/productService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";
import { useRequireAuth } from "../../hooks/useRequireAuth.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authModal, setAuthModal] = useState(false);
  const { isCustomer } = useAuth();
  const { addToCart } = useCart();
  const { requireAuth } = useRequireAuth({
    message: "Debes iniciar sesión para agregar al carrito",
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!requireAuth()) return;
    if (!isCustomer) {
      setAuthModal(true);
      return;
    }
    try {
      await addToCart(product.id_producto, 1);
    } catch (err) {
      if (err.code === "AUTH_REQUIRED") {
        setAuthModal(true);
      } else {
        setError(getErrorMessage(err));
      }
    }
  };

  if (loading) return <Loader />;
  if (error && !product) {
    return <div className={`container ${styles.page}`}>{error}</div>;
  }

  const image =
    product?.imagen ||
    "https://placehold.co/800x800/f5f5f5/888888?text=Producto";

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.grid}>
        <img src={image} alt={product.nombre} className={styles.image} />
        <div>
          <h1>{product.nombre}</h1>
          <p className={styles.price}>{formatCurrency(product.precio)}</p>
          <p className={styles.desc}>{product.descripcion}</p>
          <p className={styles.meta}>Stock: {product.stock}</p>
          <Button onClick={handleAddToCart}>Agregar al carrito</Button>
        </div>
      </div>

      <Modal
        open={authModal}
        title="Inicia sesión"
        onClose={() => setAuthModal(false)}
      >
        <p>Debes iniciar sesión como cliente para comprar.</p>
        <Button
          className={styles.modalBtn}
          onClick={() => navigate(ROUTES.LOGIN, { state: { from: `/productos/${id}` } })}
        >
          Ir a login
        </Button>
      </Modal>
    </div>
  );
}
