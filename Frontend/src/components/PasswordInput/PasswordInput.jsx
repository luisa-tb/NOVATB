import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../Input/Input.jsx";
import styles from "./PasswordInput.module.css";

export default function PasswordInput({ label = "Contraseña", ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.wrap}>
      <Input
        label={label}
        type={visible ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {visible ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
