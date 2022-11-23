const knexConfig = require("../config");
const knexDb = require("knex");
const { v4: uuidv4 } = require("uuid");

class Products{
    constructor(TablaName){
        this.knexConfig = knexConfig
        this.TablaName = TablaName
    }

    async createProduct(product){
        const knex = knexDb(this.knexConfig);
        try{
            Object.assign(product, {
                code: uuidv4()
            })
            const data = await knex(this.TablaName).insert(product)
            knex.destroy()
            return {
                success: true,
                data: product
            }
        }catch(err){
            knex.destroy()
            console.error(err)
            return{
                success: false,
                message: err.message
            }
        }
        
         
    }

    async getProduct(productCode){
        const knex = knexDb(this.knexConfig);
        try{
            const data = await knex(this.TablaName).where('code', '=', productCode).select('*')
            if(data.length == 0){
                return{
                    success: false,
                    message: 'Product not found'
                }
            }
            const productFormatted = JSON.parse(JSON.stringify(data[0]))
            knex.destroy();
            return{
                success: true,
                data: productFormatted
            }
        }catch(err){
            console.error(err)
            knex.destroy()
            return{
                success: false,
                message: err.message
            }
        }
    }

    async getAllProducts(){
        const knex = knexDb(this.knexConfig)
        try{
            const data = await knex(this.TablaName).select('*')
            if(data.length == 0){
                return{
                    success: false,
                    message: 'Products not found'
                }
            }
            const productFormatted = JSON.parse(JSON.stringify(data))
            knex.destroy();
            return{
                success: true,
                data: productFormatted
            }
        }catch(err){
            console.error(err)
            knex.destroy()
            return{
                success: false,
                message: err.message
            }
        }
    }

    async updateProduct(productCode, newProductCode){
        const knex = knexDb(this.knexConfig)
        try{
            const data = await knex(this.TablaName).where('code', '=', productCode).update({code:newProductCode})
            const newProductCod = await knex(this.TablaName).where('code', '=', newProductCode).select('*')
            if(data == null){
                return{
                    success: false,
                    message: 'Body.product is null'
                }
            }
            const productFormatted = JSON.parse(JSON.stringify(newProductCod[0]))
            knex.destroy();
            return{
                success: true,
                data: productFormatted
            }
        }catch(err){
            console.error(err)
            knex.destroy()
            return{
                success: false,
                message: err.message
            }
        }
    }

    async delete_where(productCode){
        const knex = knexDb(this.knexConfig)
        const data = await knex(this.TablaName).where('code', '=', productCode).del()
        if(!data){
            return{
                success: false,
                message: 'Product not found'
            }
        }
        knex.destroy();
        return{
            success: true,
            data: 'has deleted '+ productCode
        }
    }
}

module.exports = Products