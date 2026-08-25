import carritoService from "../services/carritoService.js";

async function crearCarro(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const carrito = await carritoService.crearCarrito(id_usuario);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function obtenerCarro(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_carrito } = req.params;
    const carrito = await carritoService.obtenerCarrito(id_carrito, id_usuario);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function agregarProducto(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_carrito } = req.params;
    const { id_producto, cantidad } = req.body;
    const item = await carritoService.agregarProducto(
      id_usuario,
      id_carrito,
      id_producto,
      cantidad ?? 1,
    );
    res.status(200).json({ mensaje: "Producto agregado exitosamente", item });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function actualizarCantidad(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_carrito } = req.params;
    const { id_producto, cantidad } = req.body;
    const itemActualizado = await carritoService.actualizarCantidad(
      id_usuario,
      id_carrito,
      id_producto,
      cantidad,
    );
    res.status(200).json({
      mensaje: "Cantidad actualizada exitosamente",
      item: itemActualizado,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function eliminarProducto(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_carrito, id_producto } = req.params;
    const resultado = await carritoService.eliminarProducto(
      id_usuario,
      id_carrito,
      id_producto,
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function vaciarCarrito(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_carrito } = req.params;
    const resultado = await carritoService.vaciarCarrito(
      id_usuario,
      id_carrito,
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function obtenerCarritoActivo(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const carrito = await carritoService.crearCarrito(id_usuario);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

const carritoController = {
  crearCarro,
  obtenerCarritoActivo,
  obtenerCarro,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
  vaciarCarrito,
};

export default carritoController;
