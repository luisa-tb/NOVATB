import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getOrCreateActiveCart,
  fetchCart,
  addToCart as addToCartApi,
  updateCartItem,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "../services/cartService.js";
import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { getItem, setItem, removeItem } from "../utils/storage.js";
import { useAuthContext } from "./AuthContext.jsx";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated, isCustomer } = useAuthContext();
  const [cartId, setCartId] = useState(() => getItem(STORAGE_KEYS.CART_ID));
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const loadCart = useCallback(async () => {
    if (!isAuthenticated || !isCustomer) {
      setItems([]);
      setTotal(0);
      setInitialized(true);
      return;
    }
    if (!initialized) {
      setLoading(true);
    }
    try {
      const active = await getOrCreateActiveCart();
      const id = String(active.id_carrito);
      setCartId(id);
      setItem(STORAGE_KEYS.CART_ID, id);
      const cart = await fetchCart(id);
      setItems(cart.productos ?? []);
      setTotal(cart.total ?? 0);
    } catch {
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [isAuthenticated, isCustomer, initialized]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (idProducto, cantidad = 1) => {
    if (!isAuthenticated || !isCustomer) {
      const error = new Error("AUTH_REQUIRED");
      error.code = "AUTH_REQUIRED";
      throw error;
    }
    const active = await getOrCreateActiveCart();
    const id = String(active.id_carrito);
    setCartId(id);
    setItem(STORAGE_KEYS.CART_ID, id);
    await addToCartApi(id, idProducto, cantidad);
    await loadCart();
  };

  const updateQuantity = async (idProducto, cantidad) => {
    if (!cartId) return;
    await updateCartItem(cartId, idProducto, cantidad);
    await loadCart();
  };

  const removeFromCart = async (idProducto) => {
    if (!cartId) return;
    await removeFromCartApi(cartId, idProducto);
    await loadCart();
  };

  const clearCart = async () => {
    if (!cartId) return;
    await clearCartApi(cartId);
    await loadCart();
  };

  const logoutReset = () => {
    removeItem(STORAGE_KEYS.CART_ID);
    setCartId(null);
    setItems([]);
    setTotal(0);
  };

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.cantidad, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      cartId,
      items,
      total,
      itemCount,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      refreshCart: loadCart,
      logoutReset,
    }),
    [cartId, items, total, itemCount, loading, loadCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return ctx;
}
