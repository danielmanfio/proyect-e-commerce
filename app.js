const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();

const mainRouters = require("./routers/mainRouters");
const app = express();

// Usa Morgan en modo 'dev' para mostrar logs en consola
//combined salida más detallada, similar a los logs de Apache.,tinymuy breve, solo lo esencial.
app.use(morgan('dev'));

// Middleware para eliminar espacios en blanco al inicio y fin de la URL
app.use((req, res, next) => {
  if (req.url) {
    try {
      const decodedUrl = decodeURIComponent(req.url);
      req.url = decodedUrl.trim();
    } catch (err) {
      // Si falla la decodificación, dejamos la url como está
    }
  }
  next();
});

app.use(cors());
app.use(express.json());

const pool = require("./db/db");

app.get("/status", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT 1 AS estado");
    connection.release();

    res.status(200).json({
      success: true,
      message: "Servidor y base de datos OK",
      dbStatus: "Conectado",
      resultado: rows[0].estado,
      timestamp: new Date().toISOString(),      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      dbStatus: "Error",
      error: error.message,
    });
  }
});


app.use("/", mainRouters);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});
 


module.exports=app;