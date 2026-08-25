import pool from "../config/conexion-bd.js";

const crearProducto = async (
  nombre,
  descripcion,
  precio,
  stock,
  imagen,
  estado,
  id_categoria,
  id_proveedor,
) => {
  const query = `
    INSERT INTO Productos (nombre, descripcion, precio, stock, imagen, estado, id_categoria, id_proveedor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [resultado] = await pool.execute(query, [
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    estado,
    id_categoria,
    id_proveedor,
  ]);

  return resultado.insertId;
};

const buscarproductoid = async (id_producto) => {
  const query = `
    SELECT id_producto, nombre, descripcion, precio, stock, imagen, estado, id_categoria, id_proveedor
    FROM Productos
    WHERE id_producto = ?
  `;

  const [filas] = await pool.execute(query, [id_producto]);
  return filas[0];
};

const listarProductos = async () => {
  const [filas] = await pool.query(
    "SELECT id_producto, nombre, descripcion, precio, stock, imagen, estado FROM Productos",
  );
  return filas;
};

const actualizarProducto = async (id_producto, datos) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    id_categoria,
    id_proveedor,
  } = datos;

  const [resultado] = await pool.query(
    "UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, id_categoria = ?, id_proveedor = ? WHERE id_producto = ?",
    [
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      id_categoria,
      id_proveedor,
      id_producto,
    ],
  );

  return resultado;
};

const cambiarEstadoProducto = async (id_producto, estado) => {
  const [resultado] = await pool.query(
    "UPDATE Productos SET estado = ? WHERE id_producto = ?",
    [estado, id_producto],
  );

  return resultado;
};

const eliminarProducto = async (id_producto) => {
  const [resultado] = await pool.query(
    "DELETE FROM Productos WHERE id_producto = ?",
    [id_producto],
  );

  return resultado;
};

const buscarPorCategoria = async (id_categoria) => {
  const [filas] = await pool.query(
    "SELECT * FROM Productos WHERE id_categoria = ?",
    [id_categoria],
  );
  return filas;
};

const buscarPorNombre = async (nombre) => {
  const [filas] = await pool.query(
    "SELECT * FROM Productos WHERE nombre LIKE ?",
    [`%${nombre}%`],
  );
  return filas;
};

const listarPorProveedor = async (id_proveedor) => {
  const [filas] = await pool.query(
    "SELECT id_producto, nombre, descripcion, precio, stock, imagen, estado, id_categoria FROM Productos WHERE id_proveedor = ?",
    [id_proveedor],
  );
  return filas;
};

const decrementarStock = async (id_producto, cantidad) => {
  const query = `
    UPDATE Productos
    SET stock = stock - ?
    WHERE id_producto = ? AND stock >= ?
  `;
  const [resultado] = await pool.execute(query, [
    cantidad,
    id_producto,
    cantidad,
  ]);
  return resultado;
};

const productoModel = {
  crearProducto,
  buscarproductoid,
  listarProductos,
  listarPorProveedor,
  actualizarProducto,
  cambiarEstadoProducto,
  eliminarProducto,
  buscarPorCategoria,
  buscarPorNombre,
  decrementarStock,
};

export default productoModel;
