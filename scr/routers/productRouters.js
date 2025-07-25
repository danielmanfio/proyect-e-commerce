const { Router } = require('express');
const { getProductHandler, getProductByIdHandler, createProductHandler, updateProductHandler, deleteProductHandler } = require('../handlers/productHandlers');

const productRouters = Router();

productRouters.get('/', getProductHandler);
productRouters.get('/:id', getProductByIdHandler);
productRouters.post('/', createProductHandler);
productRouters.put('/', updateProductHandler);
productRouters.delete('/:id', deleteProductHandler);

module.exports = productRouters;