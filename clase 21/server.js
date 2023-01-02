import express from 'express' 

import { json } from 'express'
import router from './src/routes/router.js'


const app = express()
app.use(json())

app.use('/api/products/:id', router)

const PORT = process.env.PORT||4000

app.listen(PORT,()=>{
    console.log(`Escuchando en puerto ${PORT}`)})