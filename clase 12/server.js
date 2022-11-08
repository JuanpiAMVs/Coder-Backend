const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
require('dotenv').config();

const messages = []
const products = []

const app = express();

const http = new HttpServer(app)

const io = new IoServer(http)

app.use(express.static('public'));

app.get('/', (_req, res) => {
    res.sendFile('index', {root:__dirname})
})

const PORT = process.env.PORT

http.listen(PORT, () => console.info(`Server up and running on PORT ${PORT}`))

io.on('connection', (socket) => {
    console.info('Nuevo cliente conectado')    
    socket.emit('UPDATE_DATA_MSG', messages);
    socket.emit('UPDATE_DATA_PROD', products);
    socket.on('NEW_MEESAGE_TO_SERVER', data => {
        messages.push(data)
        console.info(messages)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', (data))
    })
    socket.on('NEW_PRODUCT_TO_SERVER', data => {
        products.push(data)
        console.info(products)
        io.sockets.emit('NEW_PRODUCT_FROM_SERVER', (data))
    })
})
