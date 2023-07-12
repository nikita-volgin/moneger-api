const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const transaction = database.define('transactions', {
    accountId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
})

module.exports = transaction