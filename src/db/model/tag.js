'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

const tag = sequelize.define('tag', { name: Sequelize.STRING });

module.exports = tag;
