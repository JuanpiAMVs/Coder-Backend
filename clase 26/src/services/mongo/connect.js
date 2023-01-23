const mongoose = require("mongoose");
const { getMongoConfig } = require("../session/session.config");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL

const mongooseConnect = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
    console.info('MONGOOSE CONNECTION OK')
  }).catch(err => {
    console.error(err)
    process.exit()
  })
};


module.exports = mongooseConnect