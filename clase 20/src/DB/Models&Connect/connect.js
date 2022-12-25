import mongoose from 'mongoose'


const connectDB= async ()=>{
    try {
        const url= 'mongodb://localhost:27017/2da_entrega'
          
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('mongodb connected')

    } catch (error) {
        console.error(error)
    }
}

export default connectDB;