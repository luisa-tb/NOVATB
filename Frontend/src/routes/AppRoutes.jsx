import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout.jsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.jsx";
import ProviderLayout from "../layouts/ProviderLayout/ProviderLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProviderRoute from "./ProviderRoute.jsx";
import { ROLES } from "../constants/roles.js";
import { ROUTES } from "../constants/routes.js";

import HomePage from "../pages/Home/HomePage.jsx";
import ProductsPage from "../pages/Products/ProductsPage.jsx";
import ProductPage from "../pages/Product/ProductPage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/ResetPassword/ResetPasswordPage.jsx";
import CartPage from "../pages/Cart/CartPage.jsx";
import ProfilePage from "../pages/Profile/ProfilePage.jsx";
import ProviderDashboard from "../pages/Provider/Dashboard/ProviderDashboard.jsx";
import ProviderProductsPage from "../pages/Provider/ProductList/ProviderProductsPage.jsx";
import ProviderProductForm from "../pages/Provider/ProductForm/ProviderProductForm.jsx";
import NotFoundPage from "../pages/NotFound/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductPage />} />

          <Route element={<ProtectedRoute roles={[ROLES.USER]} />}>
            <Route path={ROUTES.CART} element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProviderRoute />}>
          <Route element={<ProviderLayout />}>
            <Route path={ROUTES.PROVIDER} element={<ProviderDashboard />} />
            <Route
              path={ROUTES.PROVIDER_PRODUCTS}
              element={<ProviderProductsPage />}
            />
            <Route path={ROUTES.PROVIDER_NEW} element={<ProviderProductForm />} />
            <Route
              path="/proveedor/productos/:id/editar"
              element={<ProviderProductForm />}
            />
          </Route>
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
