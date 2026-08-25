import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import carritoRoutes from "./src/routes/carritoRoutes.js";
import pedidoRoutes from "./src/routes/pedidoRoutes.js";
import productoRoutes from "./src/routes/productoRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/carrito", carritoRoutes);
app.use("/api/pedido", pedidoRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/categoria", categoriaRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    mensaje: err.message || "Error interno del servidor",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
