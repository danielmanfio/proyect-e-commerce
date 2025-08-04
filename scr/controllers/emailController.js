// controllers/emailController.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const enviarCorreo = async (req, res) => {
  const { to, subject, message, name } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const htmlContent = `
      <p>Hola <strong>${name}</strong>, muchas gracias.</p>
      <p>Hemos recibido tu correo.</p>
      <p>En la brevedad nos pondremos en contacto contigo.</p>
      <br />
      <p>Saludos,<br />Equipo</p>
    `;

    const info = await transporter.sendMail({
      from: `"Daniel" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    res.json({ success: true, info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { enviarCorreo }; // ✅ exportar la función con nombre
