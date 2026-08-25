import pool from "../config/conexion-bd.js";

const crearCarrito = async (id_usuario) => {
  const query = `INSERT INTO Carrito(id_usuario) VALUES(?)`;

  const [resultado] = await pool.execute(query, [id_usuario]);
  return resultado.insertId;
};

const obtenerCarritoPorUsuario = async (id_usuario) => {
  const query = `SELECT id_carrito, fecha_creacion, id_usuario FROM Carrito WHERE id_usuario = ?`;

  const [resultado] = await pool.execute(query, [id_usuario]);
  return resultado[0];
};

const obtenerCarritoPorid = async (id_carrito) => {
  const query = `SELECT id_carrito, fecha_creacion, id_usuario FROM Carrito WHERE id_carrito = ?`;

  const [resultado] = await pool.execute(query, [id_carrito]);
  return resultado[0];
};

export default { crearCarrito, obtenerCarritoPorUsuario, obtenerCarritoPorid };
