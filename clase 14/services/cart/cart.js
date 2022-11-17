const { json } = require("body-parser");
const fs = require("fs/promises");

class Carts {
  async createCart(id) {
    try {
      const read = await fs.readFile(__dirname + "/cart.json");
      const newData = JSON.parse(read);
      const products = await fs.readFile(
        "F:/clases/Coder-Backend/clase 14/services/products/products.json"
      );
      const parseProducts = JSON.parse(products);
      newData.push({
        id: parseInt(id),
        timestamp: Date.now(),
        products: parseProducts,
      });
      const pushData = await fs.writeFile(
        __dirname + "/cart.json",
        JSON.stringify(newData)
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteCart(id) {
    try {
      const read = await fs.readFile(__dirname + "/cart.json");
      const findIndex = JSON.parse(read).findIndex((i) => i.id == id);
      if (findIndex > -1) {
        console.log(`carrito encontrado ${findIndex}`);
        const readParse = JSON.parse(read);
        const deleteThis = readParse.splice(findIndex, 1);
        const pushData = await fs.writeFile(
          __dirname + "/cart.json",
          JSON.stringify(readParse)
        );
      } else {
        console.log("no encontrado");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProducts(id) {
    const read = await fs.readFile(__dirname + "/cart.json");
    const find = JSON.parse(read).filter((i) => i.id == id);
    console.log(find[0].products);
    return find[0].products;
  }

  async addProduct(id, body) {
    const read = await fs.readFile(__dirname + "/cart.json");
    const newData = JSON.parse(read);
    const findIndex = newData.findIndex((i) => i.id == id);
    const products = newData[findIndex].products;
    products.push({
      "id": body.id,
      "timestamp": Date.now(),
      "nombre": body.nombre,
      "descripcion": body.descripcion,
      "foto": body.foto,
      "precio": body.precio,
      "stock": body.stock,
    });
    const pushData = await fs.writeFile(__dirname + "/cart.json",JSON.stringify(newData));
    return products;
  }

  async deleteProductById(idCart, idProduct){
    const read = await fs.readFile(__dirname + "/cart.json");
    const newData = JSON.parse(read);
    const findIndex = newData.findIndex((i) => i.id == idCart);
    const findProduct = newData[findIndex].products.findIndex((i) => i.id == idProduct)
    const deleteThis = newData[findIndex].products.splice(findProduct, 1);
    const pushData = await fs.writeFile(__dirname + "/cart.json",JSON.stringify(newData));
    return `Product ${idProduct} from ${idCart} Cart has deleted`

  }
}

module.exports = Carts;
