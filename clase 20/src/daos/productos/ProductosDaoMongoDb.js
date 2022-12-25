import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import ProductSchema from '../../DB/Models&Connect/product.model.js'

export class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super(ProductSchema);
    console.log('ProductosDaoMongoDb constructor called');
  }

  async read() {
    return super.read();
  }

}

