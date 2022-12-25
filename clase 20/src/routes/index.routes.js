import express from 'express'
const router = express.Router();

import productsRouter from './products.routes.js'
import cartsRouter from './carts.routes.js'


router.get("/health", async (_req, res) => {
    res.status(200).json({
        success: true,
        health: "up",
        enviroment: process.env.ENVIROMENT || "not found"
    });
})

router.get("/", async (_req, res, next) => {
    try {
        const path3 = path.join(__dirname, "../../");
        res.status(200).sendFile(path.join(path3, "/public/index.html"));
    } catch (err) {
        next(err);
    }
})

router.use('/productos', productsRouter)
router.use('/carritos', cartsRouter)

export default router