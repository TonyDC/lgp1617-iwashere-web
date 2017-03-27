'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

let Tag = sequelize.define('tag', {
    name: Sequelize.STRING
});

module.exports = Tag;
