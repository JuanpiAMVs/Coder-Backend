const express = require("express");
const app = express();

require("dotenv").config();
const parseArgs = require("minimist");
const {fork} = require('child_process')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let argv = parseArgs(process.argv.slice(2));



console.log(process.cwd());

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
  console.log(number)
});


const PORT = argv.p || 8080;
app.listen(PORT, () => console.info(`Server up and running on PORT ${PORT}`));