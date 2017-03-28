'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

const tag = require('./tag'),
    user = require('./user');

const route = sequelize.define('route', {
    description: Sequelize.TEXT,
    name: Sequelize.STRING,
    rating: Sequelize.FLOAT
});

route.hasMany(tag, { as: 'tags' });

const routeRating = sequelize.define('route_rating', { rating: Sequelize.INTEGER });
user.belongsToMany(route, { through: routeRating });
route.belongsToMany(user, { through: routeRating });

module.exports.route = route;
module.exports.routeRating = routeRating;