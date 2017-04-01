'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

const route = require('./route'),
    tag = require('./tag'),
    user = require('./user');

const poi = sequelize.define('POI', {
    description: Sequelize.TEXT,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    name: Sequelize.STRING,
    rating: Sequelize.FLOAT
});

poi.belongsToMany(route, { as: 'POIs' });
poi.hasMany(tag, { as: 'tags' });
poi.belongsToMany(user, { as: 'likes' });

module.exports = poi;