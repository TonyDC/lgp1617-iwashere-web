'use strict';

const Sequelize = require('Sequelize');
const sequelize = require('../main');

const post = require('./post'),
    user = require('./user');

const report = sequelize.define('report', {
    isResolved: Sequelize.STRING,
    reportDate: Sequelize.DATE
});

report.hasOne(post, {as: 'post'});
report.hasOne(user, {as: 'reporter'});

module.exports = report;
