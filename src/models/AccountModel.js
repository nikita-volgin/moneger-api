const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const account = database.define('accounts', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    showInTotal: DataTypes.BOOLEAN
})

module.exports = account