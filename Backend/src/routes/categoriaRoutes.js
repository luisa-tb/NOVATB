import { Router } from "express";
import {
  listarCategorias,
  obtenerCategoria,
} from "../controllers/categoriaController.js";

const router = Router();

router.get("/", listarCategorias);
router.get("/:id_categoria", obtenerCategoria);

export default router;
