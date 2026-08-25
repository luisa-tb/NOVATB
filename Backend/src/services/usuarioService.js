import usuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const crearUsuario = async (
  nombre,
  apellido,
  telefono,
  email,
  password,
  direccion,
  rol,
) => {
  if (
    !nombre ||
    !apellido ||
    !telefono ||
    !email ||
    !password ||
    !direccion ||
    !rol
  ) {
    throw new Error("Campos obligatorios");
  }

  if (!email.includes("@")) {
    throw new Error("Email inválido");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const emailExistente = await usuarioModel.buscarEmail(email);

  if (emailExistente) {
    throw new Error("El email ya existe");
  }

  if (rol !== "usuario" && rol !== "proveedor") {
    throw new Error("Rol invalido");
  }

  const saltRounds = 10;
  const passwordEncriptada = await bcrypt.hash(password, saltRounds);
  const estadoInicial = true;

  const id_usuario = await usuarioModel.crearUsuario(
    nombre,
    apellido,
    telefono,
    email,
    passwordEncriptada,
    direccion,
    rol,
    estadoInicial,
  );

  return await usuarioModel.buscarId(id_usuario);
};

const validarCredenciales = async (email, password) => {
  const usuario = await usuarioModel.buscarEmail(email);
  if (!usuario) {
    throw new Error("Credenciales invalidas");
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    throw new Error("Credenciales invalidas");
  }

  if (!usuario.estado) {
    throw new Error("Usuario inactivo");
  }

  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  return { token, usuario: sanitizeUsuario(usuario) };
};

const obtenerPerfil = async (id_usuario) => {
  const usuario = await usuarioModel.buscarId(id_usuario);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  return usuario;
};

const actualizarPerfil = async (id_usuario, datos) => {
  const { nombre, apellido, telefono, email, direccion } = datos;
  await usuarioModel.actualizarUsuario(
    id_usuario,
    nombre,
    apellido,
    telefono,
    email,
    direccion,
  );
  return obtenerPerfil(id_usuario);
};

const solicitarRecuperacion = async (email) => {
  const usuario = await usuarioModel.buscarEmail(email);
  if (!usuario) {
    throw new Error("No existe una cuenta con ese correo");
  }

  const resetToken = jwt.sign(
    { email, tipo: "reset_password" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return {
    mensaje:
      "Si el correo existe, recibirás instrucciones para restablecer tu contraseña",
    resetToken,
  };
};

const restablecerPassword = async (email, resetToken, password) => {
  if (!password || password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  let payload;
  try {
    payload = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch {
    throw new Error("Token de recuperación inválido o expirado");
  }

  if (payload.tipo !== "reset_password" || payload.email !== email) {
    throw new Error("Token de recuperación inválido");
  }

  const usuario = await usuarioModel.buscarEmail(email);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const passwordEncriptada = await bcrypt.hash(password, 10);
  await usuarioModel.actualizarPassword(usuario.id_usuario, passwordEncriptada);

  return { mensaje: "Contraseña actualizada correctamente" };
};

function sanitizeUsuario(usuario) {
  const { password: _p, ...rest } = usuario;
  return rest;
}

export const usuarioService = {
  crearUsuario,
  validarCredenciales,
  obtenerPerfil,
  actualizarPerfil,
  solicitarRecuperacion,
  restablecerPassword,
};
