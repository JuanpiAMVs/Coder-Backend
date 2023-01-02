import {Router} from 'express'
import ApiProductsFaker from '../api/products.js'

const ApiProducts = new ApiProductsFaker()

const router = Router()

router.get('/', async (req,res, next) => {
    try{
        const {id} = req.params
        res.json(ApiProducts._getProducts(id)) 
    }catch(err){
        next(err)
    }
})

export default router