const express = require('express');
const indexRouter = require('./src/routes/index')
const errorHandler =  require('./middlewares/errorHandler')
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'))

app.use('/api/productos', indexRouter);

app.use(errorHandler)


module.exports = app;