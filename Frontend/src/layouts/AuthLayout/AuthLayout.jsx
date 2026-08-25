import { Outlet, useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { ROUTES } from "../../constants/routes.js";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isWide = pathname === ROUTES.REGISTER;

  return (
    <div className={styles.wrap}>
      <div className={`${styles.panel} ${isWide ? styles.panelWide : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}
