const { Router } = require('express');
const { getCategoryHandler, 
        getCategoryByIdHandler,
        createCategoryHandler, 
        updateCategoryHandler, 
        deleteCategoryHandler } = require('../handlers/categoryHandler');

const categoryRouters = Router();

categoryRouters.get('/',  getCategoryHandler);
categoryRouters.get('/:id',  getCategoryByIdHandler);
categoryRouters.post('/',   createCategoryHandler);
categoryRouters.put('/:id',  updateCategoryHandler);
categoryRouters.delete('/:id', deleteCategoryHandler);

module.exports = categoryRouters;