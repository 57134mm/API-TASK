const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize);

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false, alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();

module.exports = {
    User,
    sequelize
};
