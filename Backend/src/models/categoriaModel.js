import pool from "../config/conexion-bd.js";

const listarCategoria = async () => {
  const query = `
    SELECT
      id_categoria,
      nombre,
      descripcion
    FROM categoria
  `;

  const [filas] = await pool.execute(query);

  return filas;
};

const buscarPorId = async (id_categoria) => {
  const query = `SELECT id_categoria, nombre, descripcion FROM categoria WHERE id_categoria = ?`;
  const [filas] = await pool.execute(query, [id_categoria]);

  return filas[0];
};

const buscarPorNombre = async (nombre) => {
  const query = `SELECT id_categoria, nombre, descripcion FROM categoria WHERE nombre = ?`;
  const [filas] = await pool.execute(query, [nombre]);

  return filas[0];
};

const agregar = async ({ nombre, descripcion }) => {
  const query = `INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)`;
  const [resultado] = await pool.execute(query, [nombre, descripcion]);

  return resultado.insertId;
};

const eliminar = async (id_categoria) => {
  const query = `DELETE FROM categoria WHERE id_categoria = ?`;
  const [resultado] = await pool.execute(query, [id_categoria]);

  return resultado.affectedRows;
};

const contarProductosPorCategoria = async (id_categoria) => {
  const query = `SELECT COUNT(*) AS total FROM producto WHERE id_categoria = ?`;
  const [filas] = await pool.execute(query, [id_categoria]);

  return filas[0].total;
};

export default {
  listarCategoria,
  buscarPorId,
  buscarPorNombre,
  agregar,
  eliminar,
  contarProductosPorCategoria,
};
