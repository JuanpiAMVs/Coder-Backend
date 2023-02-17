const express = require("express");
const os = require("os");
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const parseArgs = require ("minimist");
const app = require('./app');

const options= {default:{port:8080},alias:{p:"port", m:"modo"}};
const PORT =  parseArgs(process.argv,options).port;
const MODO = parseArgs(process.argv,options).modo;


if (MODO == "cluster") {
  if(cluster.isPrimary){
    for(let i=0; i < numCPUs; i++){
      cluster.fork()
    }
  
    cluster.on("exit", function(){
      console.log("process ", process.pid, " died")
    })
  }else{
    const app = express()
    app.get("/", (_rreq, res) => {
        res.send("Hello World! " + process.pid +" CPUs: " + numCPUs);
    });
    app.listen(PORT, () => console.info(`Server up and running on PORT ${PORT}, PID ${process.pid}`));
  }
}else{
  console.log(`Exec fork`)
  app.listen(PORT, () => console.log(`running on port ${PORT} + ${MODO} `));
}




