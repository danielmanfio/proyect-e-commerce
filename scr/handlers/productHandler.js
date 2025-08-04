const {
  createProductController,
  getAllProductController,
  getProductByNameController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

async function getProductHandler(req, res) {
  const { name } = req.query;
  if (name) {
    try {
      const ProductByName = await getProductByNameController(name);
      if (!ProductByName || ProductByName.length === 0) {
        return res.status(404).send({ error: "Producto no se encontro" });
      }
      return res.status(200).json(ProductByName);
    } catch (error) {
      
      return res.status(300).send({ error: error.message });
    }
  } else {
    try {
      const allProduct = await getAllProductController();

      if (!allProduct || allProduct.length === 0) {
        return res.status(404).send({ error: "No hay Productos registrados" });
      }

      return res.status(200).send(allProduct);
    } catch (error) {
      
      return res.status(500).send({ error: error.message });
    }
  }
}

async function getProductByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductByIdController(id);

    if (!product || product.length === 0) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function createProductHandler(req, res) {
  try {
    const { codigo, nombre, precio, categoriaid } = req.body;

    if (!nombre || !codigo || !categoriaid || !precio) {
      return res.status(400).send({ error: "Faltan campos obligatorios" });
    }

    const nuevoProduct = await createProductController(
      categoriaid,
      codigo,
      nombre,
      precio
    );

    return res.status(201).send({
      mensaje: "Producto creado exitosamente",
      Data: nuevoProduct,
    });
  } catch (error) {
    return res.status(301).send({ message: error.message });
  }
}

async function updateProductHandler(req, res) {
  const { id } = req.params;
  const { nombre, precio, codigo, categoriaid } = req.body;

  if (!nombre || !codigo || !categoriaid || !precio) {
    return res.status(400).send({ message: "Faltan campos obligatorios" });
  }

  try {
    const result = await updateProductController({
      id,
      nombre,
      precio,
      codigo,
      categoriaid
    });
    return res
      .status(200)
      .send({ message: "Product actualizado", data: result });
  } catch (error) {
    return res.status(301).send({ message: error.message, data: id });
  }
}

async function deleteProductHandler(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const eliminado = await deleteProductController(id);

    if (!eliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res
      .status(200)
      .json({ mensaje: "Producto eliminado correctamente", data: eliminado });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getProductHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
