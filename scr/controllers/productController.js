const {
  findAllProductModel,
  findProductByNameModel,
  findProductByIdModel,
  findProductByCodigoModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
} = require("../models/productModel");

async function getAllProductController() {
  const rows = await findAllProductModel();
  if (rows.length === 0) {
    throw new Error("Productos no encontrados");
  }

  return rows;
}

async function getProductByNameController(productName) {
  const rows = await findProductByNameModel(productName);  
  if (!rows || rows.length === 0) {
    throw new Error("Producto no encontrado");
  }
  return rows;
}

async function getProductByIdController(id) {
  const rows = await findProductByIdModel(id);
  if (rows.length === 0) {
    throw new Error("Producto no encontrado");
  }
  return rows;
}

async function createProductController(categoriaid, codigo, nombre, precio) {
  
  const existingProduct = await findProductByCodigoModel(codigo,0);

  if (existingProduct.length > 0) {
    throw new Error("Existe un producto con ese Codigo");
  }
   
  const result = await insertProductModel(categoriaid, codigo, nombre, precio);

  if (result.affectedRows === 0) {
    throw new Error("Error al crear el producto");
  }
  // Devuelve el ID insertado
  return result;
}

async function updateProductController({ id, nombre, precio, codigo,categoriaid }) {
  const existingProduct = await findProductByIdModel(id);
  if (existingProduct.length === 0) throw new Error("Producto no encontrado");
  
  const existingProductCode = await findProductByCodigoModel(codigo, id);
    
  if (existingProductCode.length > 0)
    throw new Error("Existe un producto con el mismo codigo, id:"+id);

  return await updateProductModel(id, nombre, precio, codigo, categoriaid);
}

async function deleteProductController(id) {
  const existingProduct = await findProductByIdModel(id);
  if (existingProduct.length === 0) {
    throw new Error("Producto no encontrado");
  }
  const result = await deleteProductModel(id);
  if (result.affectedRows === 0) {
    throw new Error("Error al eliminar el Producto");
  }
  // Devuelve el ID eliminado
  return {
    id: existingProduct[0].codigo,
    nombre: existingProduct[0].nombre,
    email: existingProduct[0].precio,
  };
}
module.exports = {
  createProductController,
  getAllProductController,
  getProductByNameController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
