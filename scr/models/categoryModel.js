const db = require("../db/db");

async function findAllCategoryModel() {
  const [rows] = await db.execute("SELECT * FROM categoria");
  return rows;
}

async function findCategoryByNameModel(name) {
  const [rows] = await db.execute("SELECT * FROM categoria WHERE nombre = ?", [
    name,
  ]);
  return rows;
}

async function findCategoryByIdModel(id) {
  const [rows] = await db.execute("SELECT * FROM categoria WHERE idcategoria = ?", [
    id,
  ]);
  return rows;
}
 

async function insertCategoryModel(nombre, descripcion) {
  const [result] = await db.execute(
    `INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)`,
    [nombre, descripcion]
  );

  // Devuelve el ID insertado
  return {
    id: result.insertId,
    nombre, descripcion
  };
}
async function updateCategoryModel(id, nombre, descripcion) {
  const [result] = await db.execute(
    `UPDATE categoria SET nombre = ?, descripcion = ? WHERE idcategoria = ?`,
    [nombre, descripcion, id]
  );
  return { id, nombre, descripcion };

}
async function deleteCategoryModel(id) {
  const [result] = await db.execute(`DELETE FROM categoria WHERE idcategoria = ?`, [
    id,
  ]);

  return result.affectedRows > 0;
}
module.exports = {
  findAllCategoryModel,
  findCategoryByNameModel,
  findCategoryByIdModel,
  insertCategoryModel,
  updateCategoryModel,
  deleteCategoryModel
};
