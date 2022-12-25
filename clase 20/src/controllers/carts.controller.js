import CarritoMongoDB from "../daos/carritos/CarritosDaoMongoDb.js"
const CartsDao = new CarritoMongoDB

export const getCarts = async (req,res, next) => {
    try{
        const data = await CartsDao.getAllCarts()
        return res.json({data: data})
    }catch(err){
        next(err)
    }

}

export const getCartById = async (req,res, next) => {
    const { id } = req.params
    try{
        const cart = await CartsDao.getCartById(id)
        return res.json({data: cart})
    }catch(err){
        next(err)
    }
}

export const postCart = async (req, res, next) => {
    try{
        const data = await CartsDao.createCart()
        return res.json({data: 'Cart created'})
    }catch(err){
        next(err)
    }


}

export const postProductToCart = async (req, res, next) => {
    try{
        const {id} = req.params
        const product = req.body
        await CartsDao.saveCartItem(id, product)
        return res.sendStatus(200)
    }catch(err){
        next(err)
    }
}

export const deleteCartById = async (req, res, next) => {
    const { id } = req.params
    try{
        await CartsDao.deleteById(id)   
        res.send(200).json({data: `deleted Cart ${id}`})   
    }catch(err){
        next(err)
    }
}

export const deleteProductCart = async (req, res, next) => {
    try{
        const { id } = req.params
        const product = req.body
        await CartsDao.deleteCartItem(id, product)
    }catch(err){
        next(err)
    }
}