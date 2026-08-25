import { usuarioService } from "../services/usuarioService.js";

async function crearUsuario(req, res) {
  try {
    const { nombre, apellido, telefono, email, password, direccion, rol } =
      req.body;
    const nuevoUsuario = await usuarioService.crearUsuario(
      nombre,
      apellido,
      telefono,
      email,
      password,
      direccion,
      rol,
    );
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function inicioSesion(req, res) {
  try {
    const { email, password } = req.body;
    const resultado = await usuarioService.validarCredenciales(email, password);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
}

async function obtenerPerfil(req, res) {
  try {
    const perfil = await usuarioService.obtenerPerfil(req.usuario.id_usuario);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function actualizarPerfil(req, res) {
  try {
    const perfil = await usuarioService.actualizarPerfil(
      req.usuario.id_usuario,
      req.body,
    );
    res.status(200).json(perfil);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function olvidarPassword(req, res) {
  try {
    const { email } = req.body;
    const resultado = await usuarioService.solicitarRecuperacion(email);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { email, resetToken, password } = req.body;
    const resultado = await usuarioService.restablecerPassword(
      email,
      resetToken,
      password,
    );
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

export {
  crearUsuario,
  inicioSesion,
  obtenerPerfil,
  actualizarPerfil,
  olvidarPassword,
  resetPassword,
};
