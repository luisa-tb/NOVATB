import { Router } from "express";
import {
  listarMisProductos,
  listarProductos,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  consultarProducto,
} from "../controllers/productoController.js";
import verificarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/proveedor/mios", verificarToken, listarMisProductos);
router.get("/", listarProductos);
router.post("/", verificarToken, agregarProducto);
router.get("/:id_producto", consultarProducto);
router.put("/:id_producto", verificarToken, actualizarProducto);
router.delete("/:id_producto", verificarToken, eliminarProducto);

export default router;
