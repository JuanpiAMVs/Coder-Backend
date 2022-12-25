import express from 'express'
import errorHandler from "./src/middlewares/errorHandler.js";
import indexRouter from './src/routes/index.routes.js'
import * as dotenv from 'dotenv'
dotenv.config()


const app = express();
app.set('view engine','html')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('public'));

app.use("/api", indexRouter);

app.use(errorHandler);

export default app
