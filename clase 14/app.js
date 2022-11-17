const express = require("express");
const productsRouter = require("./src/routes/products.routes");
const cartsRouter = require("./src/routes/carts.routes");
const errorHandler = require("./src/middlewares/errorHandler");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

app.use(errorHandler);

module.exports = app;
