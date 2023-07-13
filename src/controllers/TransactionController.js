const router = require('express').Router(),
    TransactionService = require('../services/TransactionService'),
    catchError = require('../middleware/catch-error')

router.post('/transaction', catchError(async (req, res) => {
    await TransactionService.createTransaction(req.session.userId, req.body.accountId, req.body.amount, req.body.description, req.body.type, req.body.categoryId)
    res.sendStatus(200)
}))

module.exports = router