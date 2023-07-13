const AccountModel = require('../models/AccountModel')
const ServiceError = require('../utils/Exception')

module.exports = {
    async createAccount(userId, name, balance, showInTotal) {
        if (!name || !balance) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const isAccountCreated = await AccountModel.findOne({
            where: {
                userId,
                name
            }
        })

        if (isAccountCreated) {
            throw new ServiceError(400, 'Счёт с таким именем уже существует')
        }

        return await AccountModel.create({
            userId: +userId,
            name,
            balance: +balance,
            showInTotal
        })
    },
    async getAllAccounts(userId) {
        return await AccountModel.findAll({
            where: {
                userId
            }
        })
    },
    async getTotalBalance(userId) {
        const accounts = await AccountModel.findAll({
            where: {
                userId,
                showInTotal: true
            }
        })

        const balanceArray = accounts.map(item => item.balance)

        return balanceArray.reduce((sum, current) => sum + current, 0)
    },
    async updateAccount(userId, accountId, balance, showInTotal) {
        if (!(typeof balance === 'number' || typeof showInTotal === 'boolean')) {
            throw new ServiceError(400, 'Отсутствуют данные для обновления')
        }

        const account = await AccountModel.findOne({
            where: {
                userId,
                id: accountId
            }
        })

        if (account === null) {
            throw new ServiceError(400, 'Счёт не найден')
        }

        await account.update({ balance, showInTotal })
    },
    async deleteAccount(userId, accountId) {
        if (!accountId) {
            throw new ServiceError(400, 'Неполные данные')
        }

        const account = await AccountModel.findOne({
            where: {
                id: accountId,
                userId
            }
        })

        if (account === null) {
            throw new ServiceError(400, 'Счёт не найден')
        }

        account.destroy()
    }
}