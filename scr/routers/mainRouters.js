const express = require("express");

const userRoutes = require("./userRouter");
const productRoutes = require("./productRouter");
const categoryRoutes = require("./categoryRouter");
const emailRoutes = require("./emailRouter");
const e = require("cors");
const router = express.Router();


router.use("/user", userRoutes);  
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/email", emailRoutes);

module.exports = router;