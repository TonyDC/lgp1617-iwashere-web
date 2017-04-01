'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

const session = sequelize.define('session', {
    expire: {
        allowNull: false,
        type: Sequelize.DATE
    },
    sess: {
        allowNull: false,
        type: Sequelize.JSON
    },
    sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
    }
});

module.exports = session;
