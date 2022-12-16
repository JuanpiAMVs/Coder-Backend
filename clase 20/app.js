import express from 'express'
const productsRouter = await import ('./src/routes/products.routes.js')
const cartsRouter = require("./src/routes/carts.routes");
const errorHandler = require("./src/middlewares/errorHandler");
import productService from './src/daos/index.js'
import * as dotenv from 'dotenv'
dotenv.config({path:'./src/daos/.env'})

productService()

const app = express();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('public'));

app.get('/', (_req, res) => {
    res.render('index',{})
})
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

app.use(errorHandler);

export default app
