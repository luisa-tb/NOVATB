import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/Card/Card.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import { forgotPasswordSchema } from "../../schemas/authSchemas.js";
import { requestPasswordReset } from "../../services/authService.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [emailUsed, setEmailUsed] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values) => {
    setServerError("");
    setSuccess("");
    try {
      const data = await requestPasswordReset(values.email);
      setSuccess(data.mensaje);
      setEmailUsed(values.email);
      if (data.resetToken) setResetToken(data.resetToken);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.body}>
        <h1>Recuperar contraseña</h1>
        <p className={styles.sub}>
          Ingresa tu correo y te enviaremos instrucciones.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Correo electrónico"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          {serverError ? <p className={styles.error}>{serverError}</p> : null}
          {success ? <p className={styles.success}>{success}</p> : null}
          {resetToken ? (
            <div className={styles.token}>
              <p>Token de recuperación (desarrollo):</p>
              <code>{resetToken}</code>
              <Button
                type="button"
                className={styles.full}
                onClick={() =>
                  navigate(
                    `${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(emailUsed)}&token=${encodeURIComponent(resetToken)}`,
                  )
                }
              >
                Ir a restablecer contraseña
              </Button>
            </div>
          ) : null}
          <Button type="submit" className={styles.full} disabled={isSubmitting}>
            Enviar instrucciones
          </Button>
        </form>

        <p className={styles.footer}>
          <Link to={ROUTES.LOGIN}>Volver al login</Link>
        </p>
      </div>
    </Card>
  );
}
