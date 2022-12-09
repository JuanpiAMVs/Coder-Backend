import mongoose from 'mongoose'
const { Schema } = mongoose;


export const productSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    price: {
        type: Number,
        require: true
    },
    stock:{
        type: Number,
        require: true
    }
})
export default mongoose.model('productos', productSchema)
