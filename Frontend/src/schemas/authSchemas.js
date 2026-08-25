import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const registerSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  apellido: z.string().min(2, "Apellido requerido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  direccion: z.string().min(5, "Dirección requerida"),
  rol: z.enum(["usuario", "proveedor"], { message: "Selecciona un rol" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Correo inválido"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email("Correo inválido"),
    resetToken: z.string().min(10, "Token requerido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  telefono: z.string().min(7),
  email: z.string().email(),
  direccion: z.string().min(5),
});

export const productFormSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  descripcion: z.string().min(5, "Descripción requerida"),
  precio: z.coerce.number().positive("Precio inválido"),
  stock: z.coerce.number().int().min(0, "Stock inválido"),
  imagen: z.string().url("URL pública inválida"),
  id_categoria: z.coerce.number().positive("Selecciona categoría"),
});
