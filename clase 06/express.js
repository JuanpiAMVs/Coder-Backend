const express = require ('express')
const app = express();
const container = require('../clase 04/desafio.js')
const contenedor = new container("productos")
/* const PORT = require('./generico') */


app.get('/productos', async (_req, res) => {
    try{
       const data = await contenedor.getAll();
        res.status(200);
        res.json(data);
    }
    catch(error){
        throw new Error (error)
    }

})
app.get('/productoRandom', async (_req, res) => {
    try{
        const data = await contenedor.getAll();
        res.status(200);
        const random = Math.floor(Math.random() * data.length)
        const getID = await contenedor.getById(random)
        res.json(getID)
    }catch(error){
        throw new Error (error)
    }
})

app.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto 8080`)
})
