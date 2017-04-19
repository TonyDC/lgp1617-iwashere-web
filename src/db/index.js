/* global root_require */

'use strict';

const config = require('../../config').POSTGRESQL_CONFIG;

const Sequelize = require('sequelize');
module.exports = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, config.CONN_CONFIG);
