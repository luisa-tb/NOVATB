import productoModel from "../models/productoModel.js";
import permisoService from "./permisoService.js";

async function agregarProducto(id_usuario, datosProducto) {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    estado = true,
    id_categoria,
    categoria,
  } = datosProducto;
  const categoriaId = id_categoria ?? categoria;

  await permisoService.validarPermiso(id_usuario, "agregarProducto");

  if (!nombre || nombre.trim() === "") {
    throw new Error("El nombre del producto no puede estar vacío");
  }

  if (precio === undefined || precio <= 0) {
    throw new Error("El precio debe ser mayor que 0");
  }

  if (stock === undefined || stock < 0) {
    throw new Error("El stock debe ser mayor o igual a 0");
  }

  const id_producto = await productoModel.crearProducto(
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    estado,
    id_categoria,
    id_usuario,
  );

  return await productoModel.buscarproductoid(id_producto);
}

async function eliminarProducto(id_usuario, id_producto) {
  const producto = await productoModel.buscarproductoid(id_producto);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  await permisoService.validarPermiso(id_usuario, "eliminarProducto");

  await productoModel.eliminarProducto(id_producto);

  return { mensaje: "Producto eliminado correctamente" };
}

async function actualizarProducto(
  id_usuario,
  id_proveedor,
  id_producto,
  datosNuevos,
) {
  const producto = await productoModel.buscarproductoid(id_producto);
  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  await permisoService.validarPermiso(id_proveedor, "editarProducto");

  const { precio, stock } = datosNuevos;

  if (precio !== undefined && precio <= 0) {
    throw new Error("El precio debe ser mayor que 0");
  }

  if (stock !== undefined && stock < 0) {
    throw new Error("El stock debe ser mayor o igual a 0");
  }

  await productoModel.actualizarProducto(id_producto, datosNuevos);
  return await productoModel.buscarproductoid(id_producto);
}

async function consultarProducto(filtros) {
  const { id_producto, nombre, categoria } = filtros;

  if (id_producto) {
    const producto = await productoModel.buscarproductoid(id_producto);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    return producto;
  }

  if (nombre) {
    return await productoModel.buscarPorNombre(nombre);
  }

  if (categoria) {
    return await productoModel.buscarPorCategoria(categoria);
  }

  return await productoModel.listarProductos();
}

async function listarProductosProveedor(id_proveedor) {
  return await productoModel.listarPorProveedor(id_proveedor);
}

export const productoService = {
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  consultarProducto,
  listarProductosProveedor,
};
