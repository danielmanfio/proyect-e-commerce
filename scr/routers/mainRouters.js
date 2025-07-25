const express = require("express");

const userRoutes = require("./userRouters");
const productRoutes = require("./productRouters");

const router = express.Router();


router.use("/user", userRoutes);  
router.use("/product", productRoutes);

module.exports = router;