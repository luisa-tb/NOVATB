import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../components/Card/Card.jsx";
import Input from "../../components/Input/Input.jsx";
import PasswordInput from "../../components/PasswordInput/PasswordInput.jsx";
import Button from "../../components/Button/Button.jsx";
import { registerSchema } from "../../schemas/authSchemas.js";
import { useAuth } from "../../hooks/useAuth.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { rol: "usuario" },
  });

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await registerUser(values);
      navigate(ROUTES.LOGIN, {
        state: { message: "Cuenta creada. Inicia sesión." },
      });
    } catch (err) {
      setServerError(getErrorMessage(err, "No se pudo crear la cuenta"));
    }
  };

  return (
    <Card className={styles.card} data-wide="true">
      <div className={styles.body}>
        <h1>Crear Cuenta</h1>
        <p className={styles.sub}>
          Únete a NOVA TB y disfruta de una mejor experiencia
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.grid}>
            <Input
              label="Nombre"
              error={errors.nombre?.message}
              {...register("nombre")}
            />
            <Input
              label="Apellido"
              error={errors.apellido?.message}
              {...register("apellido")}
            />
            <Input
              label="Teléfono"
              error={errors.telefono?.message}
              {...register("telefono")}
            />
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
            <Input
              label="Dirección"
              error={errors.direccion?.message}
              {...register("direccion")}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="rol" className={styles.label}>
              Rol
            </label>
            <select id="rol" className={styles.select} {...register("rol")}>
              <option value="usuario">Cliente</option>
              <option value="proveedor">Proveedor</option>
            </select>
            {errors.rol ? (
              <span className={styles.error}>{errors.rol.message}</span>
            ) : null}
          </div>

          {serverError ? <p className={styles.error}>{serverError}</p> : null}

          <Button type="submit" className={styles.full} disabled={isSubmitting}>
            Crear Cuenta
          </Button>
        </form>

        <p className={styles.footer}>
          <Link to={ROUTES.LOGIN}>Iniciar sesión</Link>
        </p>
      </div>
    </Card>
  );
}
