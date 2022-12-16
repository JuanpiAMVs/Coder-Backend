import mongoose from 'mongoose'
import productSchema from '../models/mongoose.model.js'
import * as dotenv from 'dotenv' 
dotenv.config({ path: "../../.env"})



class ContenedorMongoDb{
    constructor(){
        this.mongodbs = process.env.MONGO_URL
    }
async connect(){
    console.info('mongourl ' + this.mongodbs)
    const URL = this.mongodbs;
    await mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('mongourl ' + this.mongodbs)
}
async create(data){
    try{
        this.connect()
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });  
        console.info(`Mongoose connected`)
        const newProduct = new productSchema(data)
        const product = await newProduct.save()
        console.log(product)

    }catch(err){
        throw new Error(err)
    }

}

async read(){
    try{
        this.connect()
        console.info(`Mongoose connected`)
        const read = await productSchema.find()
        console.log(read)
        return read
    }catch(err){
        throw new Error(err)
    }
}

async update(id, changes){
    try{
        const updated = await productSchema.updateOne({_id:id}, {$set: {name: changes.name, price: changes.price, stock:changes.stock}})
        console.log(updated)
    }catch(err){
        throw new Error(err)
    }

}

async delete(id){
    try{
        const deleted = await productSchema.deleteOne({_id:id})
        console.info(`Item with id ${id} has been deleted`)
    }catch(err){
        throw new Error(err)
    }
}

}


export default ContenedorMongoDb


