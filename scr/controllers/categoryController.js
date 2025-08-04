const {
  findAllCategoryModel,
  findCategoryByNameModel,
  findCategoryByIdModel,
  insertCategoryModel,
  updateCategoryModel,
  deleteCategoryModel,
} = require("../models/categoryModel");

async function getAllCategoryController() {
  const rows = await findAllCategoryModel();
  if (rows.length === 0) {
    throw new Error("Categorias no encontradas");
  }
  return rows;
}

async function getCategoryByNameController(categoryName) {
  const [rows] = await findCategoryByNameModel(categoryName);
  if (rows.length === 0) {
    throw new Error("Categoryo no encontrado");
  }
  return rows;
}

async function getCategoryByIdController(id) {
  const rows = await findCategoryByIdModel(id);
  if (rows.length === 0) {
    throw new Error("Categoria no encontrada");
  }
  return rows;
}

async function createCategoryController(nombre, descripcion) {
  const existingCategory = await findCategoryByNameModel(nombre);
  if (existingCategory.length > 0) {
    throw new Error("Existe un categoria con ese nombre");
  }
  const result = await insertCategoryModel(nombre,descripcion);

  if (result.affectedRows === 0) {
    throw new Error("Error al crear el Categoria");
  }
  // Devuelve el ID insertado
  return result;
}

async function updateCategoryController({ id, nombre, descripcion }) {
      
  return await updateCategoryModel(id, nombre, descripcion);
}

async function deleteCategoryController(id) {
  const existingCategory = await findCategoryByIdModel(id);
  if (existingCategory.length === 0) {
    throw new Error("Categoria no encontrada");
  }
  const result = await deleteCategoryModel(id);
  if (result.affectedRows === 0) {
    throw new Error("Error al eliminar el Categoryo");
  }
  // Devuelve el ID eliminado
  return {
    id: existingCategory[0].codigo,
    nombre: existingCategory[0].nombre,
    descripcion: existingCategory[0].descripcion,
  };
}
module.exports = {
  getAllCategoryController,
  getCategoryByNameController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
};
