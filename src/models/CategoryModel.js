const { DataTypes } = require('sequelize'),
    database = require('../utils/db')

const category = database.define('categories', {
    userId: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    description: DataTypes.STRING
})

module.exports = category