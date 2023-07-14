const TransactionModel = require('../models/TransactionModel'),
    AccountModel = require('../models/AccountModel'),
    CategoryModel = require('../models/CategoryModel')
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

async function isCategoryOwner(categoryId, userId) {
    const category = await CategoryModel.findOne({
        where: {
            id: categoryId,
            userId
        }
    })

    if (category === null) {
        throw new ServiceError(400, 'Категория не найдена или не принадлежит Вам')
    }

    return category
}

module.exports = {
    async createTransaction(userId, accountId, amount, description, type, categoryId) {
        if (!accountId || !amount || !description || type === undefined || !categoryId) {
            throw new ServiceError(400, 'Неполные данные')
        }

        await isCategoryOwner(categoryId, userId)

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
    async updateTransaction(userId, id, categoryId, description, type) {
        if (!(id && (categoryId || description || type !== undefined))) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const transaction = await TransactionModel.findOne({
            where: {
                id
            }
        })

        if (transaction === null) {
            throw new ServiceError(400, 'Транзакция не найдена')
        }

        const accountId = transaction.dataValues.accountId

        const account = await getAccount(accountId, userId)
        if (type !== undefined && transaction.dataValues.type !== type) {
            const amountDouble = transaction.dataValues.amount * 2
            const balance = account.dataValues.balance + (type ? amountDouble : -amountDouble)

            account.update({balance})
        }

        if (categoryId !== undefined && transaction.dataValues.categoryId !== categoryId) {
            await isCategoryOwner(categoryId, userId)
        }

        return await transaction.update({
            categoryId,
            description,
            type
        })
    },
    async deleteTransaction(userId, id) {
        if (!id) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const transaction = await TransactionModel.findOne({
            where: {
                id
            }
        })

        if (transaction === null) {
            throw new ServiceError(400, 'Транзакция не найдена')
        }

        const accountId = transaction.dataValues.accountId
        const account = await getAccount(accountId, userId)

        const currentBalance =  account.dataValues.balance
        const type = transaction.dataValues.type
        const amount = transaction.dataValues.amount
        account.update({balance: currentBalance + (type ? -amount : amount)})

        transaction.destroy()
    }
}