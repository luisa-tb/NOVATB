import api from "./api.js";
import { API_PATHS } from "../constants/apiPaths.js";

export async function fetchCategories() {
  const { data } = await api.get(API_PATHS.CATEGORIES);
  return data;
}

export async function fetchCategoryById(id) {
  const { data } = await api.get(`${API_PATHS.CATEGORIES}/${id}`);
  return data;
}
