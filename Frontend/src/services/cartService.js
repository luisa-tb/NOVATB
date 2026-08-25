import api from "./api.js";
import { API_PATHS } from "../constants/apiPaths.js";

export async function getOrCreateActiveCart() {
  const { data } = await api.get(`${API_PATHS.CART}/activo`);
  return data;
}

export async function createCart() {
  const { data } = await api.post(API_PATHS.CART);
  return data;
}

export async function fetchCart(idCarrito) {
  const { data } = await api.get(`${API_PATHS.CART}/${idCarrito}`);
  return data;
}

export async function addToCart(idCarrito, idProducto, cantidad = 1) {
  const { data } = await api.post(`${API_PATHS.CART}/${idCarrito}`, {
    id_producto: idProducto,
    cantidad,
  });
  return data;
}

export async function updateCartItem(idCarrito, idProducto, cantidad) {
  const { data } = await api.put(`${API_PATHS.CART}/${idCarrito}/producto`, {
    id_producto: idProducto,
    cantidad,
  });
  return data;
}

export async function removeFromCart(idCarrito, idProducto) {
  const { data } = await api.delete(
    `${API_PATHS.CART}/${idCarrito}/producto/${idProducto}`,
  );
  return data;
}

export async function clearCart(idCarrito) {
  const { data } = await api.delete(`${API_PATHS.CART}/${idCarrito}`);
  return data;
}
