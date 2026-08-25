import { Router } from "express";
import {
  crearUsuario,
  inicioSesion,
  obtenerPerfil,
  actualizarPerfil,
  olvidarPassword,
  resetPassword,
} from "../controllers/usuarioController.js";
import verificarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", crearUsuario);
router.post("/login", inicioSesion);
router.post("/forgot-password", olvidarPassword);
router.post("/reset-password", resetPassword);
router.get("/perfil", verificarToken, obtenerPerfil);
router.put("/perfil", verificarToken, actualizarPerfil);

export default router;
