import pedidoModel from "../models/pedidoModel.js";
import carritoModel from "../models/carritoModel.js";
import detalleCarritoModel from "../models/detallecarritoModel.js";
import permisoService from "./permisoService.js";
import productoModel from "../models/productoModel.js";

const ESTADOS_VALIDOS = ["pendiente", "procesando", "finalizado", "cancelado"];

async function verificarPropietarioPedido(id_pedido, id_usuario) {
  const pedido = await pedidoModel.buscarPedidoPorId(id_pedido);

  if (!pedido) {
    throw new Error("Pedido no encontrado");
  }

  if (pedido.id_usuario !== id_usuario) {
    throw new Error("No tienes permiso para operar sobre este pedido");
  }

  return pedido;
}

async function crearPedido(id_usuario, datosPedido) {
  const { confirmacion } = datosPedido;

  await permisoService.validarPermiso(id_usuario, "comprarProducto");

  const carrito = await carritoModel.obtenerCarritoPorUsuario(id_usuario);
  if (!carrito) {
    throw new Error("No tienes un carrito activo");
  }

  const itemsCarrito = await detalleCarritoModel.obtenerPorCarrito(
    carrito.id_carrito,
  );
  if (!itemsCarrito || itemsCarrito.length === 0) {
    throw new Error("El carrito está vacío, no se puede crear el pedido");
  }

  if (!confirmacion) {
    throw new Error("Debe confirmar la compra antes de continuar");
  }

  const total = itemsCarrito.reduce(
    (acumulado, item) =>
      acumulado + Number(item.precio_unitario) * item.cantidad,
    0,
  );

  const nuevoPedido = await pedidoModel.crearPedido({ id_usuario, total });

  for (const item of itemsCarrito) {
    await pedidoModel.agregarDetallePedido({
      id_pedido: nuevoPedido.id_pedido,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
    });

    await productoModel.decrementarStock(item.id_producto, item.cantidad);
  }

  await detalleCarritoModel.vaciarCarrito(carrito.id_carrito);

  return nuevoPedido;
}

async function listarPedidosUsuario(id_usuario) {
  return pedidoModel.obtenerPedidosUsuario(id_usuario);
}

async function consultarPedido(id_usuario, id_pedido) {
  await verificarPropietarioPedido(id_pedido, id_usuario);
  const pedido = await pedidoModel.buscarPedidoPorId(id_pedido);
  const productos = await pedidoModel.obtenerDetallePedido(id_pedido);

  return {
    id_pedido: pedido.id_pedido,
    estado: pedido.estado,
    fecha: pedido.fecha_pedido,
    productos,
    total: pedido.total,
  };
}

async function cambiarEstado(id_pedido, id_usuario, nuevoEstado) {
  await verificarPropietarioPedido(id_pedido, id_usuario);

  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    throw new Error(
      `Estado inválido. Estados permitidos: ${ESTADOS_VALIDOS.join(", ")}`,
    );
  }

  return pedidoModel.actualizarEstadoPedido(id_pedido, nuevoEstado);
}

async function cancelarPedido(id_pedido, id_usuario) {
  await verificarPropietarioPedido(id_pedido, id_usuario);
  return pedidoModel.actualizarEstadoPedido(id_pedido, "cancelado");
}

const pedidoService = {
  crearPedido,
  listarPedidosUsuario,
  consultarPedido,
  cambiarEstado,
  cancelarPedido,
};

export default pedidoService;
