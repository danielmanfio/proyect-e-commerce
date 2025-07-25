const {
  createUserController,
  getAllUserController,
  getUserByNameController,
  getUserByIdController,
  updateUserController,
  deleteUserController
} = require("../controllers/userControllers");

async function getUserHandler(req, res) {
    const { name } = req.query;
    if (name) {
        try {
            const userByName = await getUserByNameController(name); 
            if (!userByName || userByName.length === 0) {
            return res.status(404).send({ error: "Usuario no se encontro" });
            }
            return res.status(200).send(userByName);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: "Error interno del servidor", message: error.message  });
        }
    }else{

        try {
          const allUser = await getAllUserController(); 
      
          if (!allUser || allUser.length === 0) {
            return res.status(404).send({ error: "No hay usuarios registrados" });
          }
      
          return res.status(200).send(allUser);
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: "Error del servidor", message: error.message });
        }
    }
}

async function getUserByIdHandler(req, res) {
  try {
    
    const { id } = req.params;
    const usuarios = await getUserByIdController(id);

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    
    return res.status(200).send(usuarios); 
  } catch (error) {
    
    return res.status(500).send({ error: "Error del servidor", message: error.message});
  }
}

async function createUserHandler(req, res) {
  try {
    const { nombre, email, rolid, localidadid } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoUsuario = await createUserController(nombre, email,rolid, localidadid);

    return res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: nuevoUsuario
    });

  } catch (error) {
    console.error("Error en createUserHandler:", error);
    return res.status(500).json({ error: "Error interno del servidor",message: error.message });
  }
}

async function updateUserHandler(req, res) {
 const { id } = req.params;
  const { nombre, email } = req.body;

  if (!nombre || !email) return res.status(400).json({ error: "Faltan datos" });

  try {
    const result = await updateUserController({ id, nombre, email });
    return res.status(200).json({ message: "Usuario actualizado", data: result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const eliminado = await deleteUserController(id);

    if (!eliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({ mensaje: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error("Error en deleteUserHandler:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getUserHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
};
