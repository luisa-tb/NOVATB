import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useCart } from "../../hooks/useCart.js";
import { createOrder } from "../../services/orderService.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { items, total, loading, updateQuantity, removeFromCart, refreshCart } =
    useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setMessage("");
    try {
      await createOrder(true);
      setMessage("Pedido creado exitosamente.");
      await refreshCart();
    } catch (err) {
      setMessage(getErrorMessage(err));
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`container ${styles.page}`}>
      <h1>Carrito</h1>
      {!items.length ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <article key={item.id_producto} className={styles.item}>
                <img
                  src={
                    item.imagen ||
                    "https://placehold.co/120x120/f5f5f5/888?text=+"
                  }
                  alt={item.nombre}
                />
                <div className={styles.info}>
                  <h3>{item.nombre}</h3>
                  <p>{formatCurrency(item.precio_unitario)}</p>
                  <div className={styles.actions}>
                    <label>
                      Cant.
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) =>
                          updateQuantity(
                            item.id_producto,
                            Number(e.target.value),
                          )
                        }
                      />
                    </label>
                    <Button
                      variant="ghost"
                      onClick={() => removeFromCart(item.id_producto)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.summary}>
            <p>Total: {formatCurrency(total)}</p>
            <Button onClick={handleCheckout} disabled={checkoutLoading}>
              Finalizar compra
            </Button>
          </div>
        </>
      )}
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  );
}
