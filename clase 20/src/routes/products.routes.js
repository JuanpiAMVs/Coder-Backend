import express from 'express'
const router = express.Router();

import * as controller from '../controllers/products.controller.js'



router.get('/', controller.getProducts)
router.get('/:id', controller.getProductById)

router.post('/', controller.postProduct)

router.put('/:id', controller.putProduct)

router.delete('/:id',controller.deleteProduct)

export default router