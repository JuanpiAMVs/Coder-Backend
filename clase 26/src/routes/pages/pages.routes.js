const app = require('../../../app')
const authMiddleware = require('../../middlewares/authMiddleware')

const router = require('express').Router()

router.get('/signin', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signin')
})

router.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
       return res.redirect('/home')
    }
    res.render('signup')
})

router.get('/home', authMiddleware, (_req, res) => {
    res.render('home')
})

router.get('/error', (_req, res) => {
    res.render('error')
})

module.exports = router