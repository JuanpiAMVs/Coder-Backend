const express = require('express')

const router = express.Router()

const authMiddleware = require('../../middlewares/auth.middleware')

router.get('/', authMiddleware,(req, res) => {
    if(!req.session.contador){
        req.session.contador = 0
    }
    req.session.contador = req.session.contador + 1;
    return res.status(200).send(`Usted ingresó al servidor ${req.session.contador} veces`)
})

router.get('/logout', authMiddleware,(req, res) => {
    res.render('logout', {name: req.session.username})
    
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

    })

})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/signin', (req, res) => {
    const USERNAME = 'rupert'
    const PASSWORD = '123'
    let {usernameInput, passwordInput} = req.body
    if(!usernameInput || !passwordInput){
        return res.status(400).json({
            success: false,
            message: "Username or password missing"
        })
    }
    if(usernameInput != USERNAME  || passwordInput != PASSWORD){
        return res.status(403).json({
            success: false,
            message: "Bad username or password"
        })
    }
    req.session.username = usernameInput;
    req.session.password = passwordInput;
/*     res.status(200).json({
        success: true,
        message: `Welcome ${req.session.username}`
    }) */res.redirect('/api/session/home')

})

router.get('/home', authMiddleware,(req, res) => {
    res.render('home', {name: req.session.username})
})


module.exports = router