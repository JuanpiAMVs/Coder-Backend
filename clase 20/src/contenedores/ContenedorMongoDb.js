import mongoose from 'mongoose'
import connectDB from '../DB/Models&Connect/connect.js';
connectDB()

class ContenedorMongoDb{
    constructor(model){
        this.model = model
    }

async create(data){
    try{
        const newItem = new this.model(data)
        await newItem.save()
        console.log(newItem)
        return newItem

    }catch(err){
        throw new Error(`error saving item in MongoDb ${err}`)
    }

}

async read(){
    try{
        const read = await this.model.find()
        console.log(read)
        return read
    }catch(err){
        throw new Error(`error reading data from mongodb: ${err}`)
    }
}

async update(id, changes){
    try{
        const updated = await this.model.updateOne({_id:id}, {$set: {name: changes.name, price: changes.price, stock:changes.stock}})
        console.log(updated)
    }catch(err){
        throw new Error(err)
    }

}

async getById(id){
    if(!id) throw new Error('ID PARAM MISSING')
    try{
        const data = await this.model.findOne({_id: id})
        if(!data){
            return {
                success: false,
                data: 'Item not found'
            }
        }
        return data
    }catch(err){
        throw new Error(err)
    }
}

async delete(id){
    try{
        const deleted = await this.model.deleteOne({_id:id})
        if(!deleted){
            return {
                success: false,
                data: 'Item not found'
            }
        }
    }catch(err){
        throw new Error(err)
    }
}

}


export default ContenedorMongoDb


