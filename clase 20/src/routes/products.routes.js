import express from 'express'
const router = express.Router();
const products = require("../../services/products/products.js");



const productsService = new products();

router.get("/", async (_req, res, next) => {
  try {
    const data = await productsService.getAllProducts();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // const id = req.params.id
    const data = await productsService.getAllProducts();
    const selected = data.filter((i) => i.id == id);
    if (!selected) {
      res.status(500).json({
        error: "producto no encontrado",
      });
    } else {
      res.status(200).json({
        succes: true,
        data: selected,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, _res, next) => {
  try {
    const { body } = req;
    if (!body.id) {
      let NewId = +new Date() + "-" + Math.floor(Math.random() * 1000);
      body["id"] = NewId;
    }
    body["timestamp"] = Date.now();
    body["nombre"] = body.nombre;
    body["descripcion"] = body.descripcion;
    body["foto"] = body.foto;
    body["precio"] = body.precio;
    body["stock"] = body.stock;
    const data = await productsService.postProducts(body);
    console.log(body);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const findUpdate = await productsService.updateProduct(id, body);
    if (!findUpdate) {
        res.status(500).json({
          error: "producto no encontrado",
          data: findUpdate
        });
      } else {
        res.status(200).json({
          succes: true,
          data: findUpdate,
        })
      }
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const deleteThis = await productsService.deleteById(id)
       res.status(200).json({
        succes:true,
        data: `id ${id} deleted`
       })
    }catch(err){
        throw new Error(err);
    }
})

module.exports = router;
