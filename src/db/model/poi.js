'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

const { route } = require('./route'),
    tag = require('./tag'),
    user = require('./user');

const poi = sequelize.define('POI', {
    description: Sequelize.TEXT,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    name: Sequelize.STRING,
    rating: Sequelize.FLOAT
});

poi.belongsToMany(route, { through: 'POIs' });
poi.hasMany(tag);
poi.belongsToMany(user, { through: 'POIRating' });

module.exports = poi;
