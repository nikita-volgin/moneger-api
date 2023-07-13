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
    async getCategories(userId) {
        return await CategoryModel.findAll({
            where: {
                userId
            }
        })
    },
    async deleteCategory(userId, id) {
        if (!id) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const category = await CategoryModel.findOne({
            where: {
                id,
                userId
            }
        })

        if (category === null) {
            throw new ServiceError(400, 'Категория не найдена')
        }

        category.destroy()
    }
}