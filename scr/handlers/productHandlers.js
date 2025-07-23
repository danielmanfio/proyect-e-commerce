const getProductHandler = (req,res) => {
    res.status(200).send('Reporte de todos los productos');
};

const getProductByIdHandler = (req,res) => {
    const {id} = req.params;
    res.status(200).send(`Reporte produto por id ${id}`);
};

const createProductHandler = (req, res) =>{
    const {name, description, price, category_id, image_url,created_at, updated_at} = req.body;
    res.send(`Creando un producto, nombre ${name} ${description} $${price}`);
};

const editProductHandler = (req,res) => {
    const {name} = req.query;
    res.send(`Modificando un producto, nombre ${name}`);
}

const deleteProductHandler = (req,res) => {
    const {id} = req.params;
    res.send(`Eliminando un producto, id: ${id}`);
}

module.exports = {
    getProductHandler, 
    getProductByIdHandler,
    createProductHandler, 
    editProductHandler,
    deleteProductHandler};
