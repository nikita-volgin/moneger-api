const router = require('express').Router(),
    TransactionService = require('../services/TransactionService'),
    catchError = require('../middleware/catch-error')

router.post('/transaction', catchError(async (req, res) => {
    await TransactionService.createTransaction(req.session.userId, req.body.accountId, req.body.amount, req.body.description, req.body.type, req.body.categoryId)
    res.sendStatus(200)
}))

router.get('/transactions', catchError(async (req, res) => {
    const data = await TransactionService.getTransactions(req.session.userId, req.body.accountId, req.body.skip, req.body.take)
    res.send(data)
}))

router.delete('/transaction', catchError(async (req,res) => {
    await TransactionService.deleteTransaction(req.session.userId, req.body.accountId, req.body.id)
    res.send(200)
}))

module.exports = router