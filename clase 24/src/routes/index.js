const express = require('express')
const router = express.Router();
const CookiesRouter = require('./cookies/cookies.routes')
const sessionRouter = require('./session/session.routes')

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        health: 'up'
    })
})
.use('/cookies', CookiesRouter)
.use('/session', sessionRouter)

module.exports = router