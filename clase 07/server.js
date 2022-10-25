const express = require('express')
const { restart } = require('nodemon')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/sumar/:num1/:num2', (req, res) =>{
        const num1 = parseInt(req.params.num1)
        const num2 = parseInt(req.params.num2)
        const message = `El resultado es ${(num1 + num2)}`
        res.status(200).send(message)
})

const PORT = procces.env.PORT 

app.listen(PORT, () => console.info(`Server up and running on port ${PORT}`))