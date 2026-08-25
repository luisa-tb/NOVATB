import pool from "../config/conexion-bd.js";

const crearNotificacion = async (mensaje, id_proveedor, id_pedido) => {
  const query = `INSERT INTO Notificacion(mensaje, id_proveedor, id_pedido) VALUES(?,?,?)`;

  const [resultado] = await pool.execute(query, [
    mensaje,
    id_proveedor,
    id_pedido,
  ]);
  return resultado.insertId;
};

const obtenerNotificaciones = async (id_proveedor) => {
  const query = `SELECT id_notificacion, mensaje, leida, fecha, id_proveedor, id_pedido FROM Notificacion WHERE id_proveedor = ?`;

  const [resultado] = await pool.execute(query, [id_proveedor]);
  return resultado;
};

const marcarLeida = async (id_notificacion) => {
  const query = `UPDATE Notificacion SET leida = TRUE WHERE id_notificacion = ?`;

  const [resultado] = await pool.execute(query, [id_notificacion]);
  return resultado.affectedRows;
};

export default { crearNotificacion, obtenerNotificaciones, marcarLeida };
