import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth.js";
import { ROUTES } from "../constants/routes.js";

export function useRequireAuth(options = {}) {
  const { redirectTo = ROUTES.LOGIN } = options;
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = (callback) => {
    if (loading) return false;
    if (!isAuthenticated) {
      navigate(redirectTo, {
        state: { from: location.pathname, message: options.message },
      });
      return false;
    }
    return callback?.() ?? true;
  };

  return { requireAuth, isAuthenticated, loading };
}
