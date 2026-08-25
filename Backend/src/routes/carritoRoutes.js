import { Router } from "express";
import carritoController from "../controllers/carritoController.js";
import verificarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/activo", verificarToken, carritoController.obtenerCarritoActivo);
router.post("/", verificarToken, carritoController.crearCarro);
router.get("/:id_carrito", verificarToken, carritoController.obtenerCarro);
router.post("/:id_carrito", verificarToken, carritoController.agregarProducto);
router.put(
  "/:id_carrito/producto",
  verificarToken,
  carritoController.actualizarCantidad,
);
router.delete(
  "/:id_carrito/producto/:id_producto",
  verificarToken,
  carritoController.eliminarProducto,
);
router.delete("/:id_carrito", verificarToken, carritoController.vaciarCarrito);

export default router;
