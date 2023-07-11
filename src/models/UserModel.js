const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const user = database.define('users', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
})

module.exports = user