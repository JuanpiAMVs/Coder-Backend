const fs = require ('fs')

fs.appendFileSync('./fyh.txt', `${new Date().toString()}:\n`)

// try catch para evitar que la ejecucion del codigo se detenga si encuentra un error
try{
    const data = fs.readFileSync('./fyh.txt', 'utf-8')
    console.log(data)
} catch (err){
    console.error(err) // err.message para resumir el error
}


