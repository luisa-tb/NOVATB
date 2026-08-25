import pedidoService from "../services/pedidoServices.js";

async function crearPedido(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const pedido = await pedidoService.crearPedido(id_usuario, req.body);
    return res.status(201).json(pedido);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
}

async function listarMisPedidos(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const pedidos = await pedidoService.listarPedidosUsuario(id_usuario);
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
}

async function consultarPedido(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_pedido } = req.params;
    const infoPedido = await pedidoService.consultarPedido(
      id_usuario,
      id_pedido,
    );
    return res.status(200).json(infoPedido);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
}

async function cambiarEstado(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_pedido } = req.params;
    const { estado } = req.body;
    const pedidoActualizado = await pedidoService.cambiarEstado(
      id_pedido,
      id_usuario,
      estado,
    );
    return res.status(200).json(pedidoActualizado);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
}

async function cancelarPedido(req, res) {
  try {
    const id_usuario = req.usuario.id_usuario;
    const { id_pedido } = req.params;
    await pedidoService.cancelarPedido(id_pedido, id_usuario);
    return res.status(200).json({ mensaje: "Pedido cancelado exitosamente" });
  } catch (error) {
    return res.status(400).json({ mensaje: error.message });
  }
}

const pedidoController = {
  crearPedido,
  listarMisPedidos,
  consultarPedido,
  cambiarEstado,
  cancelarPedido,
};

export default pedidoController;
