const { Router } = require('express');
const { getUserHandler, getUserByIdHandler, createUserHandler, editUserHandler, deleteUserHandler } = require('../handlers/userHandlers');

const userRouters = Router();

userRouters.get('/', getUserHandler);
userRouters.get('/:id', getUserByIdHandler);
userRouters.post('/', createUserHandler);
userRouters.put('/', editUserHandler);
userRouters.delete('/:id', deleteUserHandler);

module.exports = userRouters;