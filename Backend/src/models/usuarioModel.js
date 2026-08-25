import pool from "../config/conexion-bd.js";

const crearUsuario = async (
  nombre,
  apellido,
  telefono,
  email,
  password,
  direccion,
  rol,
  estado,
) => {
  const query = `
    INSERT INTO Usuario (
      nombre,
      apellido,
      telefono,
      email,
      password,
      direccion,
      rol,
      estado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [resultado] = await pool.execute(query, [
    nombre,
    apellido,
    telefono,
    email,
    password,
    direccion,
    rol,
    estado,
  ]);

  return resultado.insertId;
};

const buscarId = async (id_usuario) => {
  const query = `
    SELECT
      id_usuario,
      nombre,
      apellido,
      telefono,
      email,
      direccion,
      rol,
      fecha_registro,
      estado
    FROM Usuario
    WHERE id_usuario = ?
  `;

  const [filas] = await pool.execute(query, [id_usuario]);

  return filas[0];
};

const buscarEmail = async (email) => {
  const query = `
    SELECT
      id_usuario,
      nombre,
      apellido,
      telefono,
      email,
      password,
      direccion,
      rol,
      fecha_registro,
      estado
    FROM Usuario
    WHERE email = ?
  `;

  const [filas] = await pool.execute(query, [email]);

  return filas[0];
};

const actualizarUsuario = async (
  id_usuario,
  nombre,
  apellido,
  telefono,
  email,
  direccion,
) => {
  const query = `
    UPDATE Usuario
    SET
      nombre = ?,
      apellido = ?,
      telefono = ?,
      email = ?,
      direccion = ?
    WHERE id_usuario = ?
  `;

  const [resultado] = await pool.execute(query, [
    nombre,
    apellido,
    telefono,
    email,
    direccion,
    id_usuario,
  ]);

  return resultado.affectedRows;
};

const actualizarPassword = async (id_usuario, passwordHash) => {
  const query = `UPDATE Usuario SET password = ? WHERE id_usuario = ?`;
  const [resultado] = await pool.execute(query, [passwordHash, id_usuario]);
  return resultado.affectedRows;
};

const usuarioModel = {
  crearUsuario,
  buscarId,
  buscarEmail,
  actualizarUsuario,
  actualizarPassword,
};

export default usuarioModel;
