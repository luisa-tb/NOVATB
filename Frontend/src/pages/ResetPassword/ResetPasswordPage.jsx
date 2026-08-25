import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/Card/Card.jsx";
import Input from "../../components/Input/Input.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import Button from "../../components/Button/Button.jsx";
import { resetPasswordSchema } from "../../schemas/authSchemas.js";
import { resetPassword } from "../../services/authService.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ResetPasswordPage.module.css";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      resetToken: searchParams.get("token") || "",
    },
  });

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await resetPassword({
        email: values.email,
        resetToken: values.resetToken,
        password: values.password,
      });
      navigate(ROUTES.LOGIN, {
        state: { message: "Contraseña actualizada. Inicia sesión." },
      });
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.body}>
        <h1>Restablecer contraseña</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Correo electrónico"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Token de recuperación"
            error={errors.resetToken?.message}
            {...register("resetToken")}
          />
          <PasswordInput
            label="Nueva contraseña"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordInput
            label="Confirmar contraseña"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          {serverError ? <p className={styles.error}>{serverError}</p> : null}
          <Button type="submit" className={styles.full} disabled={isSubmitting}>
            Guardar contraseña
          </Button>
        </form>
        <p className={styles.footer}>
          <Link to={ROUTES.LOGIN}>Volver al login</Link>
        </p>
      </div>
    </Card>
  );
}
