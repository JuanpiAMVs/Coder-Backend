const express = require('express');
const app = require('./app')
const {Server: HttpServer} = require('http');
require('dotenv').config();

const http = new HttpServer(app)

const PORT = process.env.PORT

http.listen(PORT, () => console.info(`Server up and running on PORT ${PORT}`))