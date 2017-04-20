'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

const tag = require('./tag'),
    user = require('./user');

const post = sequelize.define('post', {
    description: Sequelize.TEXT,
    likes: Sequelize.INTEGER,
    publicationDate: Sequelize.DATE
});

post.belongsTo(user, { as: 'creator' });
post.hasMany(user, { as: 'likes' });
post.hasMany(tag, { as: 'tags' });

module.exports = post;
