// routers/emailRouter.js

const express = require("express");
const router = express.Router();
const { enviarCorreo } = require("../controllers/emailController"); // ✅ destructuring

router.post("/", enviarCorreo); 

module.exports = router;
