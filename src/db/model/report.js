'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../index');

const post = require('./post'),
    user = require('./user');

const report = sequelize.define('report', {
    isResolved: Sequelize.STRING,
    reportDate: Sequelize.DATE
});

report.hasOne(post, { as: 'post' });
report.hasOne(user, { as: 'reporter' });

module.exports = report;
