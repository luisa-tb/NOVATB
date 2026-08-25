import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { ROUTES } from "../constants/routes.js";

export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (roles?.length && !roles.includes(user?.rol)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
