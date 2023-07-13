const router = require('express').Router(),
    AccountService = require('../services/AccountService'),
    catchError = require('../middleware/catch-error')

router.post('/account', catchError(async (req, res) => {
    const account = await AccountService.createAccount(req.session.userId, req.body.name, req.body.balance, req.body.showInTotal)
    res.send(account)
}))

router.get('/accounts', catchError(async (req, res) => {
    const accounts = await AccountService.getAllAccounts(req.session.userId)
    res.send(accounts)
}))

router.get('/accounts/balance', catchError(async (req, res) => {
    const balance = await AccountService.getTotalBalance(req.session.userId)
    res.send({balance})
}))

router.put('/account/update', catchError(async (req, res) => {
    await AccountService.updateAccount(req.session.userId, req.body.id, req.body.balance, req.body.showInTotal)
    res.sendStatus(200)
}))

router.delete('/account', catchError(async (req,res) => {
    await AccountService.deleteAccount(req.session.id, req.body.id)
    res.sendStatus(200)
}))

module.exports = router