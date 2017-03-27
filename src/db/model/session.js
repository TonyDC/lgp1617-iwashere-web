'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

let session = sequelize.define('session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    sess: {
        type: Sequelize.JSON,
        allowNull: false
    },
    expire: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = session;
