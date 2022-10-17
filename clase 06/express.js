const express = require ('express')

const app = express();
const contenedor = require('../clase 04/desafio')
/* const PORT = require('./generico') */


app.get('/productos', async (_req, res) => {
    try{
       const data = await contenedor.getAll();
        res.status(200);
        res.send.json(data);
    }
    catch(error){
        throw new Error (error)
    }

})

app.listen(3000, () => {
    console.log(`Servidor Http escuchando en el puerto 3000`)
})
