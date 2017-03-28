'use strict';

const Sequelize = require('Sequelize');
const sequelize = require('../main');

const user = sequelize.define('user', {
    email: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = user;
