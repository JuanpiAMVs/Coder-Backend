const http = require ('http')

const server = http.createServer((_req, res) =>{           // creacion del server
    res.end('hola mund0')
})

const connectedServer = server.listen(8080, () => {        // declaracion del puerto a usar
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`)
})

