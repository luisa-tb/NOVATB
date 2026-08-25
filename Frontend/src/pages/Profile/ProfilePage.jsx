import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { profileSchema } from "../../schemas/authSchemas.js";
import { updateProfile } from "../../services/authService.js";
import { fetchMyOrders } from "../../services/orderService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { getErrorMessage } from "../../utils/getErrorMessage.js";
import { ROUTES } from "../../constants/routes.js";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user, refreshProfile, isProvider, isCustomer } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    async function load() {
      try {
        await refreshProfile();
        if (isCustomer) {
          const pedidos = await fetchMyOrders();
          setOrders(Array.isArray(pedidos) ? pedidos : []);
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshProfile, isCustomer]);

  useEffect(() => {
    if (user) {
      reset({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        telefono: user.telefono || "",
        email: user.email || "",
        direccion: user.direccion || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    setMessage("");
    setError("");
    try {
      await updateProfile(values);
      await refreshProfile();
      setMessage("Perfil actualizado.");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>Mi perfil</h1>
        {isProvider ? (
          <Link to={ROUTES.PROVIDER} className={styles.link}>
            Ir al panel proveedor
          </Link>
        ) : null}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.grid}>
          <Input label="Nombre" error={errors.nombre?.message} {...register("nombre")} />
          <Input label="Apellido" error={errors.apellido?.message} {...register("apellido")} />
          <Input label="Teléfono" error={errors.telefono?.message} {...register("telefono")} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input label="Dirección" error={errors.direccion?.message} {...register("direccion")} />
        </div>
        {message ? <p className={styles.ok}>{message}</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        <Button type="submit" disabled={isSubmitting}>
          Guardar cambios
        </Button>
      </form>

      <section className={styles.orders}>
        <h2>{isCustomer ? "Mis pedidos" : "Actividad"}</h2>
        {isCustomer ? (
          !orders.length ? (
            <p>No tienes pedidos aún.</p>
          ) : (
            <ul className={styles.orderList}>
              {orders.map((order) => (
                <li key={order.id_pedido}>
                  <span>#{order.id_pedido}</span>
                  <span>{order.estado}</span>
                  <span>{formatCurrency(order.total)}</span>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p>Gestiona tus productos desde el panel de proveedor.</p>
        )}
      </section>
    </div>
  );
}
