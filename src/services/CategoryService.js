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

        return category
    },
    async getCategories(userId) {
        return await CategoryModel.findAll({
            where: {
                userId
            }
        })
    },
    async updateCategory(userId, id, icon, description) {
        if (!id || (!icon && !description)) {
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

        await category.update({icon, description})

        return category
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

        await category.destroy()
    }
}