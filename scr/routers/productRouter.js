const { Router } = require('express');
const { getProductHandler, getProductByIdHandler, createProductHandler, updateProductHandler, deleteProductHandler } = require('../handlers/productHandler');

const productRouters = Router();

productRouters.get('/', getProductHandler);
productRouters.get('/:id', getProductByIdHandler);
productRouters.post('/', createProductHandler);
productRouters.put('/:id', updateProductHandler);
productRouters.delete('/:id', deleteProductHandler);

module.exports = productRouters;