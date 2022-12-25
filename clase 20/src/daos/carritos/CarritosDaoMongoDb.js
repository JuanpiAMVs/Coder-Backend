import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import ContenedorMongoDB from '../../contenedores/ContenedorMongoDb.js'
import CartsModel from '../../DB/Models&Connect/cart.model.js'
import { ProductosDaoMongoDb } from '../productos/ProductosDaoMongoDb.js'


const productosDao = new ProductosDaoMongoDb


class CarritoMongoDB extends ContenedorMongoDB{
    constructor(){
        super(CartsModel)
        this.initialize()
        console.log('CarritoMongoDb constructor called');
    }
    initialize = async () => {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('cart db connected')
    }

    createCart = async () => {
        try {
            await this.create()
            console.log('Cart created')

        } catch (error) {
            console.log(`Error al crear el carrito: ${error}`)
        }
    }

    getAllCarts = async () => {
        try{
            const read = await CartsModel.find({});
            return read
        }catch(err){
            throw new Error(`Error reading data: ${err}`)
        }
    }

    updateCart = async(_id, data) => {
        try{
            const cart = await CartsModel.updateOne({_id}, data)
            return cart
        }catch(err){
            throw new Error(err)
        }
    }

    saveCartItem = async (id, product) => {
        try{
            //encuentra el carrito
            const cart = await CartsModel.findById(id)
            if (cart) {
                // busca el id de "product" para asignarlo dentro del carrito
                console.log(product.id)
                const producto = await productosDao.getById((product.id))

                    cart.products.push({...producto})
                    const data = cart.products
                    console.log(data)

                    const newCart= await CartsModel.findByIdAndUpdate({_id: id},{products:data})
                    return newCart
            } else {
                return 'Cart not found'
            }
        }catch (err) {
            throw new Error(`Error saving item in cart ${err}`)
        }
    }

    getCartById = async (id) => {
        try{
            const cart = await this.getById(id)
            return cart
        }catch(err){
            throw new Error(err)
        }
    }

    deleteCartItem = async (id, product) => {
        try {
            const cart = await this.getById(id)
            if (cart) {
                const found = cart.products.find(element => element.id == product.id)
                if (found) {
                    const deleteProduct = cart.products.filter(element => element.id != product.id)
                    cart.products = deleteProduct
                    this.save(cart)
                    return cart
                } else {
                    return 'Producto no encontrado'
                }
            } else {
                return 'Carrito no encontrado'
            }
        } catch (err) {
            throw new Error(`Error al eliminar la información: ${err}`)
        }
    }

    deleteById = async (_id) => {
        try {
            await CartsModel.deleteOne({_id})
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            await CartsModel.deleteMany({})
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default CarritoMongoDB