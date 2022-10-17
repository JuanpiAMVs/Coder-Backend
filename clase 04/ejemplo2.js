const fs = require ('fs')

let info ={}

fs.readFile('./package.json', 'utf-8', (error, data) => {
    if(error){
        throw new Error(error)
    }else{
        let jsonData = JSON.parse(data)     //obtener contenido del JSON en obj
        info['contenidoStr'] = JSON.stringify(jsonData, null, 2)   //enviar contenido a JSON en string
        info['contenidoObj'] = jsonData
        fs.stat('./package.json', (error, data) => {   // obtiene los stats del package.json
            if(error){
                throw new Error(error)
            }else{
                info['size'] = `${data.size} bytes`
                fs.writeFile('./info.txt', JSON.stringify(info, null, 2), error => {
                    if(error){
                        throw new Error(error)
                    }else{
                        console.log('Listo')
                    }
                })
            }
        })
    }
})