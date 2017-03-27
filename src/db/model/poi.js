'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

let POI = sequelize.define('POI', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    rating: Sequelize.FLOAT,
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT
});

POI.belongsToMany(Route, {as: 'POIs'});
POI.hasMany(Tag, {as: 'tags'});
POI.belongsToMany(User, {as: 'likes'});

module.exports = POI;
