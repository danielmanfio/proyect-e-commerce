const db = require("../db/db");

async function findAllUserModel() {
  const [rows] = await db.execute("SELECT * FROM persona");

  return rows;
}

async function findUserByNameModel(userName) {
  const [rows] = await db.execute("SELECT * FROM persona WHERE nombres = ?", [
    userName,
  ]);
  return rows;
}
async function findUserByEmailModel(email) {
  const [rows] = await db.execute(
    "SELECT * FROM persona WHERE email_user = ?",
    [email]
  );
  return rows;
}
async function findUserByIdModel(id) {
  const [rows] = await db.execute("SELECT * FROM persona WHERE idpersona = ?", [
    id,
  ]);
  return rows;
}
async function insertUserModel(nombre, email, rolid, localidadid) {
  const [result] = await db.execute(
    `INSERT INTO persona (nombres, email_user,rolid,localidadid) VALUES (?, ?, ?, ?)`,
    [nombre, email, rolid, localidadid]
  );

  // Devuelve el ID insertado
  return {
    id: result.insertId,
    nombre,
    email,
  };
}
async function updateUserModel(id, nombre, email) {
  const [result] = await db.execute(
    `UPDATE persona SET nombres = ?, email_user = ? WHERE idpersona = ?`,
    [nombre, email, id]
  );
  return { id, nombre, email };
  //   return result.affectedRows > 0;
}
async function deleteUserModel(id) {
  const [result] = await db.execute(`DELETE FROM persona WHERE idpersona = ?`, [
    id,
  ]);

  return result.affectedRows > 0;
}
module.exports = {
  findAllUserModel,
  findUserByNameModel,
  findUserByIdModel,
  insertUserModel,
  updateUserModel,
  deleteUserModel,
  findUserByEmailModel,
  // Aquí puedes agregar más funciones de modelo según sea necesario
};
