import generateProduct from "../services/fakerProducts.js"

class ApiProductsFaker {
    constructor(){}

    _getProducts(cant = 10){
        const products = []
        for(let i = 0; i < cant; i++){
            const fakeProduct = generateProduct()
            const push = products.push(fakeProduct)
        }
        return products
    }
}

export default ApiProductsFaker