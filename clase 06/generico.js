/* Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y
    responda un mensaje de acuerdo a la hora actual:
Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
Entre las 13 y las 19 hs será 'Buenas tardes!'.
De 20 a 5 hs será 'Buenas noches!'.
Se mostrará por consola cuando el servidor esté listo para operar y en qué puerto
lo está haciendo. */
const http = require('http');
require('dotenv').config();

const saludo = (_req, res) =>{
    const hora = new Date().getHours()
    if(hora > 5 && hora < 13){
        res.end("<h1>Buenas tardes!</h1>")
    }else if (hora > 12 && hora < 20){
        res.end("<h1>Buenas tardes!</h1>")
    }else if (hora > 19 && hora < 6){
        res.end("<h1>Buenas noches!</h1>")
    }

}

const server = http.createServer((_req, res) => {
    saludo(_req, res)
    res.end()
})

const PORT = process.env.PORT
const connectedServer = server.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

module.exports = PORT;