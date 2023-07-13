const router = require('express').Router(),
    CategoryService = require('../services/CategoryService'),
    catchError = require('../middleware/catch-error')

router.post('/category', catchError(async (req, res) => {
    await CategoryService.createCategory(req.session.userId, req.body.icon, req.body.description)
    res.sendStatus(200)
}))

module.exports = router