const { json } = require("body-parser");
const fs = require("fs/promises");

class Products {
  async getAllProducts() {
    const data = await fs.readFile(__dirname + "/products.json");
    return JSON.parse(data);
  }

  async postProducts(data) {
    try {
      const readData = await fs.readFile(__dirname + "/products.json");
      const newData = JSON.parse(readData)
      newData.push(data)
      const pushData = await fs.writeFile(__dirname + "/products.json",JSON.stringify(newData));
      console.log("Ultimo id agregado: " + data.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProduct(id, body){
    try{
        const paramsBody = body
        const read = await fs.readFile(__dirname + "/products.json");
        const find = JSON.parse(read).filter((i) => i.id == id);
        const newData = JSON.parse(read)
        const findIndex = JSON.parse(read).findIndex((i) => i.id == id);
        newData.splice(findIndex, 1)
        find[0].id = paramsBody.id
        paramsBody.nombre ? (find[0].nombre = paramsBody.nombre) : null;
        paramsBody.precio ? (find[0].precio = paramsBody.precio) : null;
        paramsBody.descripcion ? (find[0].descripcion = paramsBody.descripcion) : null;
        paramsBody.foto ? (find[0].foto = paramsBody.foto) : null;
        paramsBody.stock ? (find[0].stock = paramsBody.stock) : null;
        newData.push(find[0])
        console.log(newData) 
        const pushData = await fs.writeFile(__dirname + "/products.json",JSON.stringify(newData));
        return find
      }catch(err){
        throw new Error(err);
      }
  }

 async deleteById(id){
    try{
        const read = await fs.readFile(__dirname + "/products.json");
        const newData = JSON.parse(read)
        const findIndex = JSON.parse(read).findIndex((i) => i.id == id);
        newData.splice(findIndex, 1)
        const pushData = await fs.writeFile(__dirname + "/products.json",JSON.stringify(newData));
        return id + 'deleted'

    }catch(err){
        throw new Error(err);
    }
 }
}

module.exports = Products;
