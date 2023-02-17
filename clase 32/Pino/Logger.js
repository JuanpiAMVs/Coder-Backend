const logger = require('pino')()


const infoLogger = (req, res, next) =>{
    logger.info(`Peticion a ruta ${req.path} con metodo ${req.method}`)
    next()
}

module.exports = infoLogger;