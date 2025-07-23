const getUserHandler = (req,res) => {
    res.status(200).send('Reporte de todos los usuarios 2');
};

const getUserByIdHandler = (req,res) => {
    const {id} = req.params;
    res.status(200).send(`Reporte usuario por id ${id}`);
};

const createUserHandler = (req, res) =>{
    const {name, lastname, age, mail} = req.body;
    res.send(`Modificando un usuario, nombre ${name} ${lastname}`);
};

const editUserHandler = (req,res) => {
    const {name} = req.query;
    res.send(`Modificando un usuario, nombre ${name}`);
}

const deleteUserHandler = (req,res) => {
    const {id} = req.params;
    res.send(`Eliminando un usuario, id: ${id}`);
}

module.exports = {getUserHandler, getUserByIdHandler,createUserHandler, editUserHandler,deleteUserHandler};
