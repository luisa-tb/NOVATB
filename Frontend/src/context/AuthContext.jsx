import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loginUser,
  registerUser,
  fetchProfile,
} from "../services/authService.js";
import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { decodeJwt } from "../utils/decodeJwt.js";
import { ROLES } from "../constants/roles.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getItem(STORAGE_KEYS.TOKEN));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(getItem(STORAGE_KEYS.TOKEN)));

  const syncProfile = useCallback(async () => {
    if (!getItem(STORAGE_KEYS.TOKEN)) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch {
      const decoded = decodeJwt(getItem(STORAGE_KEYS.TOKEN));
      if (decoded) {
        setUser({ id_usuario: decoded.id_usuario, rol: decoded.rol });
      } else {
        removeItem(STORAGE_KEYS.TOKEN);
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncProfile();
  }, [syncProfile, token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setItem(STORAGE_KEYS.TOKEN, data.token);
    setToken(data.token);
    setUser(data.usuario ?? null);
    await syncProfile();
    return data;
  };

  const register = async (payload) => {
    const created = await registerUser(payload);
    return created;
  };

  const logout = () => {
    removeItem(STORAGE_KEYS.TOKEN);
    removeItem(STORAGE_KEYS.CART_ID);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      isProvider: user?.rol === ROLES.PROVIDER,
      isCustomer: user?.rol === ROLES.USER,
      login,
      register,
      logout,
      refreshProfile: syncProfile,
    }),
    [token, user, loading, syncProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return ctx;
}
