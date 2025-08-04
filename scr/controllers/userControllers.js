
const { findUserByIdModel, updateUserModel, findUserByEmailModel, findUserByNameModel, findAllUserModel, insertUserModel, deleteUserModel } = require("../models/userModels");

async function getAllUserController() {
  const rows = await findAllUserModel();
  if (rows.length === 0) {  
    throw new Error("Usuarios no encontrados");
  }
  
  return rows;
}

async function getUserByNameController(userName) {
  const [rows] = await findUserByNameModel(userName);
  if (rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }
  return rows;
}

async function getUserByIdController(id) {   
  
  const [rows] = await findUserByIdModel(id);
   if (rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }
  return rows;
}

async function createUserController(nombre, email, rolid, localidadid) {
  const existingUser = await findUserByEmailModel(email);
  if (existingUser.length > 0) {
    throw new Error("Email ya existe");
  }
  const result = await insertUserModel(nombre, email, rolid, localidadid);

  if (result.affectedRows === 0) {
    throw new Error("Error al crear el usuario");
  } else {
    // Devuelve el ID insertado
    return {
      id: result.insertId,
      nombre,
      email,
    };
  }
}

async function updateUserController({ id, nombre, email }) {
  const existingUser = await findUserByIdModel(id);
  if (existingUser.length === 0) throw new Error("Usuario no encontrado");

  return await updateUserModel( id, nombre, email );
}

async function deleteUserController(id) {
  const existingUser = await findUserByIdModel(id);
  if (existingUser.length === 0) {  
    throw new Error("Usuario no encontrado");
  }
  const result = await deleteUserModel(id); 
  if (result.affectedRows === 0) {
    throw new Error("Error al eliminar el usuario");
  }else{
    // Devuelve el ID eliminado
    return {
      id: result.insertId,
      nombre: existingUser[0].nombres,
      email: existingUser[0].email_user,
    };
  }


}
module.exports = {
  createUserController,
  getAllUserController,
  getUserByNameController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
