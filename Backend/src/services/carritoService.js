import carritoModel from "../models/carritoModel.js";
import detalleCarritoModel from "../models/detallecarritoModel.js";
import productoModel from "../models/productoModel.js";
import usuarioModel from "../models/usuarioModel.js";
import permisoService from "./permisoService.js";

async function verificarPropietario(id_carrito, id_usuario) {
  const carrito = await carritoModel.obtenerCarritoPorid(id_carrito);

  if (!carrito) {
    throw new Error("Carrito no encontrado");
  }

  if (carrito.id_usuario !== id_usuario) {
    throw new Error("No tienes permiso para operar sobre este carrito");
  }

  return carrito;
}

async function crearCarrito(id_usuario) {
  const usuario = await usuarioModel.buscarId(id_usuario);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const carritoActivo = await carritoModel.obtenerCarritoPorUsuario(id_usuario);
  if (carritoActivo) {
    return carritoActivo;
  }

  const id_carrito = await carritoModel.crearCarrito(id_usuario);
  return carritoModel.obtenerCarritoPorid(id_carrito);
}

async function obtenerCarrito(id_carrito, id_usuario) {
  await verificarPropietario(id_carrito, id_usuario);

  const productos = await detalleCarritoModel.obtenerPorCarrito(id_carrito);

  const total = productos.reduce(
    (acumulado, item) =>
      acumulado + Number(item.precio_unitario) * item.cantidad,
    0,
  );

  return { id_carrito, productos, total };
}

async function agregarProducto(id_usuario, id_carrito, id_producto, cantidad) {
  await permisoService.validarPermiso(id_usuario, "agregarProductoCarrito");

  const producto = await productoModel.buscarproductoid(id_producto);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  await verificarPropietario(id_carrito, id_usuario);

  if (cantidad <= 0) {
    throw new Error("La cantidad debe ser mayor a 0");
  }

  if (cantidad > producto.stock) {
    throw new Error("La cantidad solicitada supera el stock disponible");
  }

  const item = await detalleCarritoModel.agregarProductoCarrito({
    id_carrito,
    id_producto,
    cantidad,
  });

  return item;
}

async function actualizarCantidad(
  id_usuario,
  id_carrito,
  id_producto,
  cantidad,
) {
  await verificarPropietario(id_carrito, id_usuario);

  const itemCarrito = await detalleCarritoModel.obtenerProductosCarrito(
    id_carrito,
    id_producto,
  );
  if (!itemCarrito) {
    throw new Error("El producto no está en el carrito");
  }

  if (cantidad <= 0) {
    throw new Error("La cantidad debe ser mayor a 0");
  }

  const producto = await productoModel.buscarproductoid(id_producto);
  if (cantidad > producto.stock) {
    throw new Error("La cantidad solicitada supera el stock disponible");
  }

  return detalleCarritoModel.actualizarCantidad(
    id_carrito,
    id_producto,
    cantidad,
  );
}

async function eliminarProducto(id_usuario, id_carrito, id_producto) {
  await verificarPropietario(id_carrito, id_usuario);

  const itemCarrito = await detalleCarritoModel.obtenerProductosCarrito(
    id_carrito,
    id_producto,
  );
  if (!itemCarrito) {
    throw new Error("El producto no está en el carrito");
  }

  await permisoService.validarPermiso(id_usuario, "eliminarProductoCarrito");
  await detalleCarritoModel.eliminar(id_carrito, id_producto);

  return { mensaje: "Producto eliminado del carrito" };
}

async function vaciarCarrito(id_usuario, id_carrito) {
  await permisoService.validarPermiso(id_usuario, "vaciarCarrito");
  await verificarPropietario(id_carrito, id_usuario);

  const productos = await detalleCarritoModel.obtenerPorCarrito(id_carrito);
  if (!productos || productos.length === 0) {
    throw new Error("El carrito ya está vacío");
  }

  await detalleCarritoModel.vaciarCarrito(id_carrito);

  return { mensaje: "Carrito vaciado correctamente" };
}

const carritoService = {
  crearCarrito,
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
  vaciarCarrito,
};

export default carritoService;
