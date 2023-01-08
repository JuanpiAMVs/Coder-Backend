const express = require('express')

const router = express.Router()

router.get('/', (_req, res) => {
    return res.cookie('name', 'rupert', {maxAge: 25000, signed: true}).send('Cookie set')
})

router.get('/get', (req, res) => {
    return res.status(200).send(req.signedCookies)
})

router.get('/clear/:name', (req, res) => {
    const {name} = req.params
    return res.clearCookie(name).send('cookie deleted')
})


module.exports = router