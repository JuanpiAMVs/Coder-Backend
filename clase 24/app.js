const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const indexRouter = require('./src/routes/index')
require('dotenv').config()

const MongoStore = require('connect-mongo')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const secret = process.env.SECRET

app.use(cookieParser(secret))

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const storeConfig= {
    mongoUrl: 'mongodb+srv://Juanpi:123@cluster0.akpxvbj.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: mongoConfig
}
app.use(session({
    store: MongoStore.create(storeConfig),
    secret: secret,
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/api', indexRouter)

module.exports = app;