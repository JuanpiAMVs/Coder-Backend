const express = require("express");
const Products = require("../../services/database/products/products.knex");
const _ = require("lodash");

const router = express.Router();

const productService = new Products('products')

router.post("/", async (req, res, next) => {
  const { body } = req;
    if(_.isNil(body)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await productService.createProduct(body)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
      }catch(err){
    next(err)
  }
})

router.get('/:productCode', async (req, res, next) => {
    const {productCode} = req.params;
    if(_.isNil(productCode)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        })
    }
    try{
        const data = await productService.getProduct(productCode)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

router.get("/", async (_req, res, next) => {
      try{
          const data = await productService.getAllProducts()
          if(!data.success){
              return res.status(400).json(data)
          }
          res.status(200).json(data)
        }catch(err){
      next(err)
    }
  })

router.put('/:productCode', async (req, res, next) => {
    const {productCode} = req.params;
    const { newProductCode } = req.body;
    if(_.isNil(newProductCode)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await productService.updateProduct(productCode, newProductCode)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)

    }catch(err){
        next(err)
      }
})

router.delete('/:productCode', async (req, res, next) => {
    const { productCode } = req.params
    if(_.isNil(productCode)){
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }
    try{
        const data = await productService.delete_where(productCode)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)

    }catch(err){
        next(err)
      }
})

module.exports = router