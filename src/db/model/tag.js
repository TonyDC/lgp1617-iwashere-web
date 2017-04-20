'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

const tag = sequelize.define('tag', { name: Sequelize.STRING });

module.exports = tag;
