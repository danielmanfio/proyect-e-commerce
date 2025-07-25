const { Router } = require('express');
const { getUserHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require('../handlers/userHandlers');

const userRouters = Router();

userRouters.get('/', getUserHandler);
userRouters.get('/:id', getUserByIdHandler);
userRouters.post('/', createUserHandler);
userRouters.put('/:id', updateUserHandler);
userRouters.delete('/:id', deleteUserHandler); 

module.exports = userRouters;