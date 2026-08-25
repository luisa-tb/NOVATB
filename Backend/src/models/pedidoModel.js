import pool from "../config/conexion-bd.js";
import detallePedidoModel from "../models/detallePedido.js";

const crearPedido = async ({ id_usuario, total }) => {
  const query = `
    INSERT INTO Pedido (estado, total, id_usuario)
    VALUES ('pendiente', ?, ?)
  `;
  const [resultado] = await pool.execute(query, [total, id_usuario]);
  const id_pedido = resultado.insertId;
  return buscarPedidoPorId(id_pedido);
};

const agregarDetallePedido = async ({
  id_pedido,
  id_producto,
  cantidad,
  precio_unitario,
}) => {
  return detallePedidoModel.agregarProductoPedido(
    cantidad,
    precio_unitario,
    id_pedido,
    id_producto,
  );
};

const buscarPedidoPorId = async (id_pedido) => {
  const query = `
    SELECT id_pedido, fecha_pedido, estado, total, id_usuario
    FROM Pedido
    WHERE id_pedido = ?
  `;
  const [resultado] = await pool.execute(query, [id_pedido]);
  return resultado[0];
};

const obtenerPedidosUsuario = async (id_usuario) => {
  const query = `
    SELECT id_pedido, fecha_pedido, estado, total, id_usuario
    FROM Pedido
    WHERE id_usuario = ?
    ORDER BY fecha_pedido DESC
  `;
  const [resultado] = await pool.execute(query, [id_usuario]);
  return resultado;
};

const actualizarEstadoPedido = async (id_pedido, estado) => {
  const query = `UPDATE Pedido SET estado = ? WHERE id_pedido = ?`;
  await pool.execute(query, [estado, id_pedido]);
  return buscarPedidoPorId(id_pedido);
};

const obtenerDetallePedido = async (id_pedido) => {
  return detallePedidoModel.obtenerDetallePedido(id_pedido);
};

export default {
  crearPedido,
  agregarDetallePedido,
  buscarPedidoPorId,
  obtenerPedidosUsuario,
  actualizarEstadoPedido,
  obtenerDetallePedido,
};
