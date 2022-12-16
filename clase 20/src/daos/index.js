import * as dotenv from 'dotenv'
dotenv.config({path:"./.env"})

const getProductModule = async () => {
    const dataFrom = process.env.DATAFROM;
    if(dataFrom == "FS"){
        const moduleSource = await import ('./productos/ProductosDaoArchivo.js')
        return moduleSource.default;
    } else if (dataFrom == 'MongoDb'){
        const moduleSource = await import ('./productos/ProductosDaoMongoDb.js')
        console.log('data from ' + dataFrom)
        return moduleSource.default;
    } else{
        console.log(dataFrom)
        return
    }
}

const ProductService = async () => {
    try{
        const productClass = await getProductModule();
        const productService = new productClass()
        console.log(productService.read())
        return productService
    }catch(err){
        throw new Error(err)
    }

}
export default ProductService()
