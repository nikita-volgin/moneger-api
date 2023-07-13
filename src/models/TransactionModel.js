const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const transaction = database.define('transactions', {
    accountId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER
})

module.exports = transaction