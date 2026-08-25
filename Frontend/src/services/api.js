import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { getItem, removeItem } from "../utils/storage.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeItem(STORAGE_KEYS.TOKEN);
    }
    return Promise.reject(error);
  },
);

export default api;
