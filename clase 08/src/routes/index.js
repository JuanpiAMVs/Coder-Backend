const express = require("express");

const router = express.Router();

let products = [];

router.get("/", (_req, res, next) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { body } = req;
    if (!body.id) {
      let NewId = +new Date() + "-" + Math.floor(Math.random() * 1000);
      body["id"] = NewId;
    }
    products.push(body);
    console.log(body);
    res.redirect("/public/index.html");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params; // const id = req.params.id
    const selected = products.filter((i) => i.id == id);
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

router.put("/:id", (req, res, next) => {
  try {
    const body = req.body;
    let id = req.params.id;
    let selected = products.find((i) => i.id == id);
    selected['id'] = req.body.id;
    console.info(selected);
    res.status(200).json(selected);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
    try{
        const body = req.body;
        let id = req.params.id;
        let selected = products.findIndex((i) => i.id == id);
        if(selected > -1){
            products.splice(selected, 1)
        }else{
            res.status(500).json({
                succes: false,
                data: "not found"
            })
        }
        res.status(200).json({
            response: 'product deleted'
        });
    }catch(err){
        next(err)
    }
})
module.exports = router;

