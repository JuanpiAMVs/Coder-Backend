import ProductService from '../../daos/index.js'

export default class productsService{
  constructor(){
    this.dataBase = ProductService
  }
  async getAllProducts() {
    try{
      return await this.dataBase.read()
    }catch(err){
      throw new Error(err)
    }
  }

  async postProducts(data) {
    try {
      return await this.dataBase.create(data)
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProduct(id, changes){
    try{
       return await this.dataBase.update(id, changes)
      }catch(err){
        throw new Error(err);
      }
  }

 async deleteById(id){
    try{
        return await this.dataBase.delete(id)
    }catch(err){
        throw new Error(err);
    }
 }
}

const servicios = new productsService()
servicios.getAllProducts()