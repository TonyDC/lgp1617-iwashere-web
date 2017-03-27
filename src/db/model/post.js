'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../main');

let Post = sequelize.define('post', {
    publicationDate: Sequelize.DATE,
    description: Sequelize.TEXT,
    likes: Sequelize.INTEGER
});

Post.belongsTo(User, {as: 'creator'});
Post.hasMany(User, {as: 'likes'});
Post.hasMany(Tag, {as: 'tags'});

module.exports = Route;
