const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const account = database.define('accounts', {
    uid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER
})

module.exports = account