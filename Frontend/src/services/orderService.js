import api from "./api.js";
import { API_PATHS } from "../constants/apiPaths.js";

export async function createOrder(confirmacion = true) {
  const { data } = await api.post(API_PATHS.ORDERS, { confirmacion });
  return data;
}

export async function fetchMyOrders() {
  const { data } = await api.get(`${API_PATHS.ORDERS}/mis-pedidos`);
  return data;
}

export async function fetchOrderById(id) {
  const { data } = await api.get(`${API_PATHS.ORDERS}/${id}`);
  return data;
}

export async function cancelOrder(id) {
  const { data } = await api.delete(`${API_PATHS.ORDERS}/${id}`);
  return data;
}
