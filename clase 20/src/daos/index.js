import * as dotenv from 'dotenv'
dotenv.config({path:"./.env"})
import { ProductosDaoMongoDb } from './productos/ProductosDaoMongoDb.js'

const getProductModule = async () => {
    /* const dataFrom = process.env.DATAFROM; */
    const dataFrom = 'MongoDb'
    if(dataFrom == "FS"){
        const moduleSource = import ('./productos/ProductosDaoArchivo.js')
        return moduleSource
    } else if (dataFrom == 'MongoDb'){
        const moduleSource = ProductosDaoMongoDb
        console.log('data from ' + dataFrom)
        return moduleSource
    } else{
        console.log(dataFrom)
        return
    }
}

const ProductService = async () => {
    try{
        const productClass = await getProductModule();
        return productClass
    }catch(err){
        throw new Error(err)
    }

}
export default ProductService
