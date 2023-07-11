const router = require('express').Router(),
    UserService = require('../services/UserService'),
    catchError = require('../middleware/catch-error')

function sendCookie(req, userId) {
    req.session.userId = userId
}

router.post('/user', catchError(async (req, res) => {
    const userId = await UserService.createUser(req.body.login, req.body.password)
    sendCookie(req, userId)
    res.sendStatus(200)
}))

router.get('/user', catchError(async (req, res) => {
    const userId = await UserService.loginUser(req.body.login, req.body.password)
    sendCookie(req, userId)
    res.sendStatus(200)
}))

module.exports = router