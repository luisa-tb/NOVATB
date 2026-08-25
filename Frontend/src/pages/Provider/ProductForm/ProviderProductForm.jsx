import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import { productFormSchema } from "../../../schemas/authSchemas.js";
import { fetchCategories } from "../../../services/categoryService.js";
import {
  createProduct,
  fetchProductById,
  updateProduct,
} from "../../../services/providerService.js";
import { getErrorMessage } from "../../../utils/getErrorMessage.js";
import { ROUTES } from "../../../constants/routes.js";
import styles from "./ProviderProductForm.module.css";

export default function ProviderProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(productFormSchema) });

  useEffect(() => {
    fetchCategories().then((data) =>
      setCategories(Array.isArray(data) ? data : []),
    );
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchProductById(id)
      .then((product) =>
        reset({
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio,
          stock: product.stock,
          imagen: product.imagen || "",
          id_categoria: product.id_categoria,
        }),
      )
      .catch((err) => setServerError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (values) => {
    setServerError("");
    try {
      if (isEdit) {
        await updateProduct(id, values);
      } else {
        await createProduct(values);
      }
      navigate(ROUTES.PROVIDER_PRODUCTS);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.page}>
      <h1>{isEdit ? "Editar producto" : "Nuevo producto"}</h1>
      <p className={styles.hint}>
        La imagen debe ser una URL pública accesible desde internet.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input label="Nombre" error={errors.nombre?.message} {...register("nombre")} />
        <div className={styles.field}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" rows="4" {...register("descripcion")} />
          {errors.descripcion ? (
            <span className={styles.error}>{errors.descripcion.message}</span>
          ) : null}
        </div>
        <div className={styles.grid}>
          <Input label="Precio" type="number" error={errors.precio?.message} {...register("precio")} />
          <Input label="Stock" type="number" error={errors.stock?.message} {...register("stock")} />
        </div>
        <Input
          label="URL de imagen pública"
          placeholder="https://..."
          error={errors.imagen?.message}
          {...register("imagen")}
        />
        <div className={styles.field}>
          <label htmlFor="id_categoria">Categoría</label>
          <select id="id_categoria" {...register("id_categoria")}>
            <option value="">Seleccionar</option>
            {categories.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errors.id_categoria ? (
            <span className={styles.error}>{errors.id_categoria.message}</span>
          ) : null}
        </div>

        {serverError ? <p className={styles.error}>{serverError}</p> : null}

        <div className={styles.actions}>
          <Button type="submit" disabled={isSubmitting}>
            {isEdit ? "Guardar cambios" : "Crear producto"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(ROUTES.PROVIDER_PRODUCTS)}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
