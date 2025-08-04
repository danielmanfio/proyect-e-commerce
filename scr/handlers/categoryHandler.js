const {
  createCategoryController,
  getAllCategoryController,
  getCategoryByNameController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

async function getCategoryHandler(req, res) {
  const { name } = req.query;
  if (name) {
    try {
      const categoryByName = await getCategoryByNameController(name);
      if (!categoryByName || categoryByName.length === 0) {
        return res.status(404).send({ error: "Categoria no se encontro" });
      }
      return res.status(200).send(categoryByName);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  } else {
    try {
      const allCategory = await getAllCategoryController();

      if (!allCategory || allCategory.length === 0) {
        return res.status(404).send({ error: "No hay Categorias registradas" });
      }

      return res.status(200).send(allCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  }
}

async function getCategoryByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdController(id);

    if (!category || category.length === 0) {
      return res.status(404).send({ error: "Categoria no encontrada" });
    }

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function createCategoryHandler(req, res) {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion ) {
      return res.status(400).send({ error: "Faltan campos obligatorios" });
    }

    const nuevoCategory = await createCategoryController(
      nombre,
      descripcion
    );

    return res.status(201).send({
      mensaje: "Categoria creada exitosamente",
      Data: nuevoCategory,
    });
  } catch (error) {
    return res.status(301).send({ message: error.message });
  }
}

async function updateCategoryHandler(req, res) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion ) {
    return res.status(400).send({ message: "Faltan campos obligatorios" });
  }

  try {
    const result = await updateCategoryController({
      id,
      nombre,
      descripcion,
    });
    return res.status(200).send({ message: "Categoria actualizado", data: result });
  } catch (error) {
    return res.status(301).send({ message: error.message, data: id });
  }
}

async function deleteCategoryHandler(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const eliminado = await deleteCategoryController(id);

    if (!eliminado) {
      return res.status(404).json({ error: "Categoria no encontrada" });
    }

    return res
      .status(200)
      .json({ mensaje: "Categoria eliminada correctamente", data: eliminado });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCategoryHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
