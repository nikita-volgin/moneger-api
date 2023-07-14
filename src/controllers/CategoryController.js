const router = require('express').Router(),
    CategoryService = require('../services/CategoryService'),
    catchError = require('../middleware/catch-error')

router.post('/category', catchError(async (req, res) => {
    const category = await CategoryService.createCategory(req.session.userId, req.body.icon, req.body.description)
    res.send(category)
}))

router.get('/categories', catchError(async (req, res) => {
    const categories = await CategoryService.getCategories(req.session.userId)
    res.send(categories)
}))

router.put('/category', catchError(async (req, res) => {
    const category = await CategoryService.updateCategory(req.session.userId, req.body.id, req.body.icon, req.body.description)
    res.send(category)
}))

router.delete('/category', catchError(async (req, res) => {
    await CategoryService.deleteCategory(req.session.userId, req.body.id)
    res.sendStatus(200)
}))

module.exports = router