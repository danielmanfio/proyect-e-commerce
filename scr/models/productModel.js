const db = require("../db/db");

async function findAllProductModel() {
  const [rows] = await db.execute(`
    SELECT 
      producto.idproducto, 
      producto.nombre, 
      producto.codigo, 
      producto.precio, 
      producto.categoriaid, 
      categoria.nombre AS nombre_categoria
    FROM producto
    JOIN categoria ON producto.categoriaid = categoria.idcategoria
    ORDER BY producto.nombre
  `);
  return rows;
}

async function findProductByNameModel(nameOrCode) {
  const [rows] = await db.execute(`
    SELECT 
      producto.idproducto, 
      producto.nombre, 
      producto.codigo, 
      producto.precio, 
      producto.categoriaid, 
      categoria.nombre AS nombre_categoria
    FROM producto
    JOIN categoria ON producto.categoriaid = categoria.idcategoria
    WHERE UPPER(producto.nombre) LIKE UPPER(?) 
       OR producto.codigo = ?
  `, [`%${nameOrCode}%`, nameOrCode]);

  return rows;
}



async function findProductByIdModel(id) {
  const [rows] = await db.execute("SELECT * FROM producto WHERE idproducto = ?", [
    id,
  ]);
  return rows;
}
 
async function findProductByCodigoModel(codigo,id) {
  const [rows] = await db.execute("SELECT * FROM producto WHERE codigo = ? AND idproducto <> ?", [
    codigo, id
  ]);
  return rows;
}
async function insertProductModel(categoriaid, codigo, nombre, precio) {
  const [result] = await db.execute(
    `INSERT INTO producto (categoriaid, codigo, nombre, precio) VALUES (?, ?, ?, ?)`,
    [categoriaid, codigo, nombre, precio]
  );

  // Devuelve el ID insertado
  return {
    id: result.insertId,
    nombre, codigo, precio
  };
}
async function updateProductModel(id, nombre, precio, codigo,categoriaid) {
  const [result] = await db.execute(
    `UPDATE producto SET nombre = ?, precio = ?, codigo = ?, categoriaid = ? WHERE idproducto = ?`,
    [nombre, precio, codigo, categoriaid, id]
  );
  return { id, nombre, codigo, categoriaid, precio };
  //   return result.affectedRows > 0;
}
async function deleteProductModel(id) {
  const [result] = await db.execute(`DELETE FROM producto WHERE idproducto = ?`, [
    id,
  ]);

  return result.affectedRows > 0;
}
module.exports = {
  findAllProductModel,
  findProductByNameModel,
  findProductByIdModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel, 
  findProductByCodigoModel  
};
