import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/Card/Card.jsx";
import Input from "../../components/Input/Input.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import Button from "../../components/Button/Button.jsx";
import { loginSchema } from "../../schemas/authSchemas.js";
import { useAuth } from "../../hooks/useAuth.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");
  const from = location.state?.from || ROUTES.HOME;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    setServerError("");
    try {
      const data = await login(values);
      if (data.usuario?.rol === "proveedor") {
        navigate(ROUTES.PROVIDER);
      } else {
        navigate(from);
      }
    } catch (err) {
      setServerError(getErrorMessage(err, "No se pudo iniciar sesión"));
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.body}>
        <h1>Iniciar Sesión</h1>
        <p className={styles.sub}>Bienvenido de nuevo a NOVA TB</p>
        {location.state?.message ? (
          <p className={styles.notice}>{location.state.message}</p>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Correo electrónico"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <PasswordInput
            error={errors.password?.message}
            {...register("password")}
          />

          <div className={styles.row}>
            <label className={styles.check}>
              <input type="checkbox" /> Recordarme
            </label>
          </div>

          {serverError ? <p className={styles.error}>{serverError}</p> : null}

          <Button
            type="submit"
            variant="primary"
            className={styles.full}
            disabled={isSubmitting}
          >
            Iniciar sesión
          </Button>
        </form>

        <p className={styles.footer}>
          <Link to={ROUTES.REGISTER}>Crear una cuenta</Link>
        </p>
        <div className={styles.forgotContainer}>
          <Link to={ROUTES.FORGOT_PASSWORD} className={styles.forgot}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </Card>
  );
}
