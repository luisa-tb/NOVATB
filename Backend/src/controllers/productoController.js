import { productoService } from "../services/productoService.js";

async function listarMisProductos(req, res) {
  try {
    if (req.usuario.rol !== "proveedor") {
      return res.status(403).json({ mensaje: "Acceso solo para proveedores" });
    }
    const productos = await productoService.listarProductosProveedor(
      req.usuario.id_usuario,
    );
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function listarProductos(req, res) {
  try {
    const { nombre, categoria } = req.query;
    const filtros = {};
    if (nombre) filtros.nombre = nombre;
    if (categoria) filtros.categoria = categoria;
    const productos = await productoService.consultarProducto(filtros);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function agregarProducto(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const nuevoProducto = await productoService.agregarProducto(
      id_usuario,
      req.body,
    );
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(error.message.includes("permiso") ? 403 : 400).json({
      mensaje: error.message,
    });
  }
}

async function eliminarProducto(req, res) {
  try {
    const { id_producto } = req.params;
    const id_usuario = req.usuario.id_usuario;
    const resultado = await productoService.eliminarProducto(
      id_usuario,
      id_producto,
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(error.message.includes("permiso") ? 403 : 400).json({
      mensaje: error.message,
    });
  }
}

async function actualizarProducto(req, res) {
  try {
    const { id_producto } = req.params;
    const id_usuario = req.usuario.id_usuario;
    const id_proveedor = req.usuario.id_usuario;
    const actualizado = await productoService.actualizarProducto(
      id_usuario,
      id_proveedor,
      id_producto,
      req.body,
    );
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(error.message.includes("permiso") ? 403 : 400).json({
      mensaje: error.message,
    });
  }
}

async function consultarProducto(req, res) {
  try {
    const { id_producto } = req.params;
    const producto = await productoService.consultarProducto({ id_producto });
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
}

export {
  listarMisProductos,
  listarProductos,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  consultarProducto,
};
