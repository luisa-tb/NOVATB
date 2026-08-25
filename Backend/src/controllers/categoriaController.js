import categoriaModel from "../models/categoriaModel.js";

async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaModel.listarCategoria();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function obtenerCategoria(req, res) {
  try {
    const { id_categoria } = req.params;
    const categoria = await categoriaModel.buscarPorId(id_categoria);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

export { listarCategorias, obtenerCategoria };
