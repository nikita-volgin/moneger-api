const TransactionModel = require('../models/TransactionModel'),
    AccountModel = require('../models/AccountModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createTransaction(userId, accountId, amount, description, type, categoryId) {
        if (!accountId || !amount || !description || type === undefined || !categoryId) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const account = await AccountModel.findOne({
             where: {
                 id: accountId,
                 userId
             }
        })

        if (account === null) {
            throw new ServiceError(404, 'Счёт не найден или не принадлежит Вам')
        }

        await TransactionModel.create({
            accountId,
            description,
            type,
            categoryId
        })

        await account.update({balance: account.dataValues.balance + (type ? amount : -amount)})
    }
}