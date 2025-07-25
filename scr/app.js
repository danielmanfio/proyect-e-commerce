const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mainRouters = require("./routers/mainRouters");
const app = express();

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

app.use("/", mainRouters);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});
 


module.exports=app;