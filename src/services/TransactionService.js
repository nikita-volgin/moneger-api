const TransactionModel = require('../models/TransactionModel'),
    AccountModel = require('../models/AccountModel')
const ServiceError = require('../utils/Exception')

async function getAccount(id, userId) {
    const account = await AccountModel.findOne({
        where: {
            id,
            userId
        }
    })

    if (account === null) {
        throw new ServiceError(404, 'Счёт не найден или не принадлежит Вам')
    }

    return account
}

module.exports = {
    async createTransaction(userId, accountId, amount, description, type, categoryId) {
        if (!accountId || !amount || !description || type === undefined || !categoryId) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const account = await getAccount(accountId, userId)

        await TransactionModel.create({
            accountId,
            amount,
            description,
            type,
            categoryId
        })

        await account.update({balance: account.dataValues.balance + (type ? amount : -amount)})
    },
    async getTransactions(userId, accountId, offset, limit) {
        await getAccount(accountId, userId)

        return TransactionModel.findAll({
            where: {
                accountId
            },
            offset,
            limit
        })
    },
    async deleteTransaction(userId, accountId, categoryId) {
        if (!accountId || !categoryId) {
            throw new ServiceError(400, 'Неполные данные')
        }

        await getAccount(accountId, userId)

        const transaction = await TransactionModel.findOne({
            where: {
                id: categoryId,
                accountId
            }
        })
        console.log(transaction, accountId, categoryId)

        if (transaction === null) {
            throw new ServiceError(400, 'Транзакция не найдена')
        }

        transaction.destroy()
    }
}