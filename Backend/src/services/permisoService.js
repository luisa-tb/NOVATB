import usuarioModel from "../models/usuarioModel.js";

const permisosPorAccion = {
  agregarProducto: ["proveedor"],
  editarProducto: ["proveedor"],
  eliminarProducto: ["proveedor"],
  comprarProducto: ["usuario"],
  agregarProductoCarrito: ["usuario"],
  eliminarProductoCarrito: ["usuario"],
  vaciarCarrito: ["usuario"],
};

async function validarPermiso(id_usuario, accion) {
  const usuario = await usuarioModel.buscarId(id_usuario);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const rolesPermitidos = permisosPorAccion[accion];

  if (!rolesPermitidos) {
    throw new Error(`Acción "${accion}" no está registrada en permisos`);
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    throw new Error("No tienes permiso para realizar esta acción");
  }

  return true;
}

const permisoService = {
  validarPermiso,
};

export default permisoService;
