'use strict';

const sequelizeOptions = {
    define: {
        // Prevent sequelize from pluralizing table names
        freezeTableName: true
    }
};

/* global root_require */
const Sequelize = require('sequelize');
module.exports = new Sequelize(root_require('config/my-config').POSTGRESQL_CONN_STRING, sequelizeOptions);