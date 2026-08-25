import api from "./api.js";
import { API_PATHS } from "../constants/apiPaths.js";

export async function fetchProducts(params = {}) {
  const { data } = await api.get(API_PATHS.PRODUCTS, { params });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await api.get(`${API_PATHS.PRODUCTS}/${id}`);
  return data;
}

export async function fetchProviderProducts() {
  const { data } = await api.get(`${API_PATHS.PRODUCTS}/proveedor/mios`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post(API_PATHS.PRODUCTS, payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`${API_PATHS.PRODUCTS}/${id}`, payload);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`${API_PATHS.PRODUCTS}/${id}`);
  return data;
}
