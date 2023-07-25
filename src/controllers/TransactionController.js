const router = require('express').Router(),
    TransactionService = require('../services/TransactionService'),
    catchError = require('../middleware/catch-error')

router.post('/transaction', catchError(async (req, res) => {
    await TransactionService.createTransaction(req.session.userId, req.body.accountId, req.body.amount, req.body.description, req.body.type, req.body.categoryId)
    res.sendStatus(200)
}))

router.get('/transactions', catchError(async (req, res) => {
    const data = await TransactionService.getTransactions(req.session.userId, req.query.accountId, +req.query.skip, +req.query.take)
    res.send({
        items: data.rows,
        totalCount: data.count
    })
}))

router.put('/transaction', catchError(async (req, res) => {
    const transaction = await TransactionService.updateTransaction(req.session.userId,req.body.id, req.body.categoryId, req.body.description, req.body.type)
    res.send(transaction)
}))

router.delete('/transaction', catchError(async (req,res) => {
    await TransactionService.deleteTransaction(req.session.userId, req.body.id)
    res.sendStatus(200)
}))

module.exports = router