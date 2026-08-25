import pool from "../config/conexion-bd.js";

async function obtenerPorCarrito(id_carrito) {
  const query = `
    SELECT dc.id_detalle_carrito,
           dc.cantidad,
           dc.id_carrito,
           dc.id_producto,
           p.nombre,
           p.imagen,
           p.precio AS precio_unitario,
           p.stock
    FROM Detalle_Carrito dc
    INNER JOIN Productos p ON dc.id_producto = p.id_producto
    WHERE dc.id_carrito = ?
  `;
  const [resultado] = await pool.execute(query, [id_carrito]);
  return resultado;
}

async function obtenerProductosCarrito(id_carrito, id_producto) {
  const query = `
    SELECT dc.id_detalle_carrito,
           dc.cantidad,
           dc.id_carrito,
           dc.id_producto,
           p.nombre,
           p.imagen,
           p.precio AS precio_unitario,
           p.stock
    FROM Detalle_Carrito dc
    INNER JOIN Productos p ON dc.id_producto = p.id_producto
    WHERE dc.id_carrito = ? AND dc.id_producto = ?
  `;
  const [resultado] = await pool.execute(query, [id_carrito, id_producto]);
  return resultado[0];
}

async function agregarProductoCarrito({ id_carrito, id_producto, cantidad }) {
  const existente = await obtenerProductosCarrito(id_carrito, id_producto);
  if (existente) {
    const nuevaCantidad = existente.cantidad + cantidad;
    await actualizarCantidad(id_carrito, id_producto, nuevaCantidad);
    return obtenerProductosCarrito(id_carrito, id_producto);
  }

  const query = `
    INSERT INTO Detalle_Carrito (cantidad, id_carrito, id_producto)
    VALUES (?, ?, ?)
  `;
  await pool.execute(query, [cantidad, id_carrito, id_producto]);
  return obtenerProductosCarrito(id_carrito, id_producto);
}

async function actualizarCantidad(id_carrito, id_producto, cantidad) {
  const query = `
    UPDATE Detalle_Carrito
    SET cantidad = ?
    WHERE id_carrito = ? AND id_producto = ?
  `;
  await pool.execute(query, [cantidad, id_carrito, id_producto]);
  return obtenerProductosCarrito(id_carrito, id_producto);
}

async function eliminar(id_carrito, id_producto) {
  const query = `
    DELETE FROM Detalle_Carrito
    WHERE id_carrito = ? AND id_producto = ?
  `;
  await pool.execute(query, [id_carrito, id_producto]);
}

async function vaciarCarrito(id_carrito) {
  const query = `DELETE FROM Detalle_Carrito WHERE id_carrito = ?`;
  await pool.execute(query, [id_carrito]);
}

const detalleCarritoModel = {
  obtenerPorCarrito,
  obtenerProductosCarrito,
  agregarProductoCarrito,
  actualizarCantidad,
  eliminar,
  vaciarCarrito,
};

export default detalleCarritoModel;
