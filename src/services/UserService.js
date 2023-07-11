const UserModel = require('../models/UserModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createUser(login, password) {
        if (!login || !password) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const isUserCreated = await UserModel.findOne({
            where: {
                login
            }
        })

        if (isUserCreated) {
            throw new ServiceError(400, 'Пользователь с таким именем существует')
        }

        const user = await UserModel.create({
            login,
            password
        })

        return user.id
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

        return user.id
    }
}