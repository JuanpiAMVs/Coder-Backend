const express = require("express");
const _ = require("lodash");
const ejs = require('ejs');
require("dotenv").config();
const errorHandler = require('../clase 08/middlewares/errorHandler.js')
const app = require('../clase 08/app');
/* const products = require('../clase 08/src/routes/index') */
import{products} from '../clase 08/src/routes/index.js'


app.set("views", "./views");
app.set("view engine", "ejs"); //motor a usar  = ejs, pug, etc

app.get("/", (_req, res) => {
  res.render("pages/index");
});

app.get("/products", (_req, res) => {
    res.render("pages/products", {products:products})
})

module.exports = app;
