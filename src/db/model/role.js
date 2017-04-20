'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

module.exports = sequelize.define('Role', {
    name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    }
});
