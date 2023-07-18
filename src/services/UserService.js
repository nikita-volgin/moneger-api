const UserModel = require('../models/UserModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createUser(login, password) {
        if (!login || !password) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const [user, created] = await UserModel.findOrCreate({
            where: {
                login
            },
            defaults: {
                password
            }
        })

        if (!created) {
            throw new ServiceError(400, 'Пользователь с таким именем существует')
        }

        return {
            id: user.dataValues.id,
            login: user.dataValues.login
        }
    },
    async loginUser(login, password) {
        const user = await UserModel.findOne({
            where: {
                login,
                password
            }
        })

        if (!user) {
            throw new ServiceError(404, 'Пользователь не найден')
        }

        return {
            id: user.id,
            login: user.login
        }
    }
}