const mysql = require('mysql2/promise');

const connection = mysql.createPool({

  host: '66.97.42.81',
  user: 'danielec_cossani',
  password: 'Nalas0833*',
  database: 'danielec_cossani',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
