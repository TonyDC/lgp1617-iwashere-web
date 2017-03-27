'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

let Route = sequelize.define('route', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    rating: Sequelize.FLOAT
});

Route.hasMany(Tag, {as: 'tags'});

let RouteRating = sequelize.define('route_rating', {
    rating: Sequelize.INTEGER
});
User.belongsToMany(Route, { through: RouteRating});
Route.belongsToMany(User, { through: RouteRating});

module.exports = Route;
