import express from 'express'
const router = express.Router();

import * as controller from '../controllers/carts.controller.js'



router.get('/', controller.getCarts)
router.get('/:id', controller.getCartById)

router.post('/', controller.postCart)
router.post('/:id', controller.postProductToCart)

router.delete('/:id',controller.deleteCartById)
router.delete('/:id/productos', controller.deleteProductCart)

export default router