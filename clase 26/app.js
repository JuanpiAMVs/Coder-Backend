const express = require("express");
const session = require('express-session')
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const mongooseConnect = require('./src/services/mongo/connect')
const logger = require('morgan')
const userModel = require('./src/services/mongo/models/user.model')
require("dotenv").config();

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy=require('passport-twitter').Strategy


const md5 = require('md5')

const {getStoreConfig} = require('./src/services/session/session.config')
const indexRouter = require('./src/routes/index');
const { Strategy } = require("passport-local");

const app = express();

const COOKIE_SECRET= process.env.COOKIE_SECRET

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('tiny'))

mongooseConnect()

app.use(cookieParser(COOKIE_SECRET));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}))
 
 //configuracion ejs
app.set('view engine', 'ejs');
app.set('views', './views')


//config passport
passport.use('twitter', new TwitterStrategy({
    consumerKey: "pcv7IC4zbjL3xaXUbhYsWR9ry",
    consumerSecret: "JEFETLXO9zmOBoxcSTPOi3wxoKBbbJ7TxFqCvMMhy5Am0nOmhR",
    callbackURL: "http://localhost:3005/auth/twitter/callback"
}, (accesToken, refreshToken, profile, done) => {
    console.log(profile)
    done(null, profile)
}))
passport.use('login', new LocalStrategy(async (username, password, done) => {
    const userData = await userModel.findOne({username, password: md5(password)})
    if(!userData){
        return done(null, false)
    }
    done(null, userData)
}))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const userData = await userModel.findOne({username, password: md5(password)})
    if(userData){
        return done(null, false)
    }
    const stageUser = new userModel({
        username,
        password: md5(password),
        fullName: req.body.fullName
    })
    const newUser = await stageUser.save()
    done(null, newUser)
}))

passport.serializeUser((user,done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    const useData = await userModel.findById(id)
    done(null, userData)
})

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter)


module.exports = app;
