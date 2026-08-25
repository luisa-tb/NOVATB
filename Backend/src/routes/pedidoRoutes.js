import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";
import verificarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/mis-pedidos", verificarToken, pedidoController.listarMisPedidos);
router.post("/", verificarToken, pedidoController.crearPedido);
router.get("/:id_pedido", verificarToken, pedidoController.consultarPedido);
router.put("/:id_pedido", verificarToken, pedidoController.cambiarEstado);
router.delete("/:id_pedido", verificarToken, pedidoController.cancelarPedido);

export default router;
