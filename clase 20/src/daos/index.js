import mongoose from 'mongoose';
import ProductClass from './productos/ProductosDaoArchivo.js';
import ContenedorMongoDb from '../contenedores/ContenedorMongoDb.js';
import dotenv from 'dotenv';
dotenv.config()

const newContenedorMongodb = new ContenedorMongoDb()

const getProductModule = async () => {
    const dataFrom = process.env.DATAFROM;
    if(dataFrom == "FS"){
        const moduleSource = await import ('./productos/ProductosDaoArchivo.js')
        return moduleSource.default;
    } else if (dataFrom == 'MONGODB'){
        const moduleSource = await import ('./productos/ProductosDaoMongoDb.js')
        console.log(dataFrom)
        return moduleSource.default;
    }
}

const ProductService = async () => {
    const ProductClass0 = await getProductModule();
    const productService = new ProductClass()
    console.log(productService.getAllProducts())
}

export default ProductService