const express = require("express");
const app = express();
const compression = require('compression')
require("dotenv").config();
const {fork} = require('child_process')
const parseArgs = require ("minimist");
const notfound = require('./src/middlewares/404')
const infoLogger = require('./Pino/Logger')
const mongodb = require('./src/containers/MongodbContainer')

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(infoLogger)

app.set('view engine', 'ejs');
app.set('views', './views')


let argv = parseArgs(process.argv.slice(2));

app.get("/info", (_req, res) => {
  const data = {
    "Argumentos de entrada": argv,
    "Sistema operativo": process.platform,
    "Version de Nodejs": process.version,
    "Memoria reservada": process.memoryUsage().rss,
    "Path de ejecucion": process.execPath,
    "Process id": process.pid,
    "Carpeta del proyecto": process.cwd(),
  };
  res.send(data).status(200);
});

app.get("/api/randoms/:number", (req, res) => {
  const { number } = req.params  || 100000000
  const math = fork('./math.js')
  math.send(number)
  math.on("message", function(sum){
    res.send(sum)
  })
/*   console.log(number) */
});

//provocando error para el log
app.get("/user", async (req, res) => {      
  const user = await mongodb.save("sadas")
})

app.use(notfound)

module.exports = app