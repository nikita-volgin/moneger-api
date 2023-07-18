const router = require('express').Router(),
    UserService = require('../services/UserService'),
    catchError = require('../middleware/catch-error')

function sendCookie(req, userId) {
    req.session.userId = userId
}

router.post('/user', catchError(async (req, res) => {
    const user = await UserService.createUser(req.body.login, req.body.password)
    sendCookie(req, user.id)
    res.send(user.login)
}))

router.get('/user', catchError(async (req, res) => {
    const user = await UserService.loginUser(req.headers.login, req.headers.password)
    sendCookie(req, user.id)
    res.send(user.login)
}))

module.exports = router