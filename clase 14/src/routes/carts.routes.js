const express = require("express");
const router = express.Router();
const cart = require("../../services/cart/cart");

const carrito = new cart();

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const data = await carrito.createCart(body.id);
    console.log(body);
    res.status(200).json({
      success: true,
      data: body,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carrito.deleteCart(id);
    res.status(200).json({
      success: true,
      data: `id ${id} deleted`,
    });
  } catch (err) {
    next(err)
  }
});

router.get('/:id/productos', async (req, res, next) => {
    try{
        const { id } = req.params;
        const data = await carrito.getProducts(id)
        res.status(200).json({
            success: true,
            products: data
        })
        return
    }catch(err){
        next(err)
    }
})

router.post('/:id/productos', async (req, res, next) => {
    try{
        const { id } = req.params
        const { body } = req;
        const data = await carrito.addProduct(id, body)
        res.status(200).json({
            succes: true,
            newsProducts: data 
        })
    }catch(err){
        next(err)
    }
})

router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    try{
        const { id } = req.params
        const { id_prod } = req.params
        const data = await carrito.deleteProductById(id, id_prod)
        res.status(200).json({
            succes: true,
            productDeleted: data  
        })
    }catch(err){
        next(err)
    }
})

module.exports = router;
