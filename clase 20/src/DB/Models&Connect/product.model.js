import mongoose from 'mongoose'
const { Schema } = mongoose;


const productSchema = new mongoose.Schema({
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
