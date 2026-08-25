import api from "./api.js";
import { API_PATHS } from "../constants/apiPaths.js";

export async function registerUser(payload) {
  const { data } = await api.post(API_PATHS.USERS, payload);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await api.post(`${API_PATHS.USERS}/login`, credentials);
  return data;
}

export async function fetchProfile() {
  const { data } = await api.get(`${API_PATHS.USERS}/perfil`);
  return data;
}

export async function updateProfile(payload) {
  const { data } = await api.put(`${API_PATHS.USERS}/perfil`, payload);
  return data;
}

export async function requestPasswordReset(email) {
  const { data } = await api.post(`${API_PATHS.USERS}/forgot-password`, {
    email,
  });
  return data;
}

export async function resetPassword(payload) {
  const { data } = await api.post(`${API_PATHS.USERS}/reset-password`, payload);
  return data;
}
