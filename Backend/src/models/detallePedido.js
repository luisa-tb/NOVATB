import pool from "../config/conexion-bd.js";

const agregarProductoPedido = async (
  cantidad,
  precio_unitario,
  id_pedido,
  id_producto,
) => {
  const query = `INSERT INTO Detalle_Pedido(cantidad, precio_unitario, id_pedido, id_producto) VALUES(?,?,?,?)`;

  const [resultado] = await pool.execute(query, [
    cantidad,
    precio_unitario,
    id_pedido,
    id_producto,
  ]);
  return resultado.insertId;
};

const obtenerDetallePedido = async (id_pedido) => {
  const query = `SELECT id_detalle_pedido, cantidad, precio_unitario, id_pedido, id_producto FROM Detalle_Pedido WHERE id_pedido = ?`;

  const [resultado] = await pool.execute(query, [id_pedido]);
  return resultado;
};

export default { agregarProductoPedido, obtenerDetallePedido };
