const router = require('express').Router(),
    CategoryService = require('../services/CategoryService'),
    catchError = require('../middleware/catch-error')

router.post('/category', catchError(async (req, res) => {
    await CategoryService.createCategory(req.session.userId, req.body.icon, req.body.description)
    res.sendStatus(200)
}))

router.get('/categories', catchError(async (req, res) => {
    const categories = await CategoryService.getCategories(req.session.userId)
    res.send(categories)
}))

router.delete('/category', catchError(async (req, res) => {
    await CategoryService.deleteCategory(req.session.userId, req.body.id)
    res.sendStatus(200)
}))

module.exports = router