const router = require('express').Router(),
    AccountService = require('../services/AccountService'),
    catchError = require('../middleware/catch-error')

router.post('/account', catchError(async (req, res) => {
    const account = await AccountService.createAccount(req.body.name, req.body.balance, req.session.userId)
    res.status(200).send(account)
}))

router.get('/accounts', catchError(async (req, res) => {
    const accounts = await AccountService.getAllAccounts(req.session.userId)
    res.status(200).send(accounts)
}))

module.exports = router