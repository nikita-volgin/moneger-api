const CategoryModel = require('../models/CategoryModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createCategory(userId, icon, description) {
        if (!userId || !icon || !description) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const [category, created] = await CategoryModel.findOrCreate({
            where: {
                userId,
                description
            },
            defaults: {
                icon
            }
        })

        if (!created) {
            throw new ServiceError(400, `Категория с наименование "${category.dataValues.description}" уже существует`)
        }
    },
}