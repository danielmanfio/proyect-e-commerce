const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouters = require('./routers/userRouters');
const productRouters = require('./routers/productRouters');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRouters);
app.use('/product', productRouters);

module.exports=app;