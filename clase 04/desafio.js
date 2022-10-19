const fs = require("fs");

const products = [
  { title: "asdadasd", price: 21312, id: 0 },
  { title: "asdsada", price: 2139, id: 1 },
];

secondObj = {
  title: "asdjkah",
  price: 21321,
  id: 2,
};

class Contenedor {
  constructor(name) {
    this.fileName = name;
  }

  async crear() {
    try {
      if (fs.existsSync(`./${this.fileName}.txt`) === true) {
        console.log("El archivo EXISTE!");
      } else {
        await fs.promises.writeFile(`./${this.fileName}.txt`, "");
        console.log(this.fileName + ".txt creado");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async save(object) {
    try {
      products.push(object);
      console.log(products)
      fs.promises.writeFile("productos.txt", JSON.stringify(products))
      console.log("Ultimo id agregado: " + object.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(number) {
    try {
      const data = await fs.promises.readFile(
        `./${this.fileName}.txt`,
        "utf-8"
      );
      let jsonData = JSON.parse(data);
      const findId = jsonData.find((e) => e.id === number);
      return findId;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(
        `./${this.fileName}.txt`,
        "utf-8"
      );
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(number) {
    try {
      const filter = products.filter((e) => e.id !== number);
      const newJson = await fs.promises.writeFile(
        `./${this.fileName}.txt`,
        JSON.stringify(filter, null, 2)
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.fileName}.txt`, "");
    } catch (error) {}
  }
}
async function ejecucion(name) {
  try {
    let contenedor = new Contenedor(name);
    await contenedor.crear();
    await contenedor.save(secondObj);
    await contenedor.getById(0);
    await contenedor.getAll();
    /*     await contenedor.deleteById(2) */
    /* await contenedor.deleteAll() */ // descomentar para aplicar la funcion
  } catch (error) {
    throw new Error(error);
  }
}
ejecucion("productos")

module.exports = Contenedor;
