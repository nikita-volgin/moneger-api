const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('moneger', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize