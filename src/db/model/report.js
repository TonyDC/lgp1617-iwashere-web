const Sequelize = require('Sequelize');

let Report = sequelize.define('report', {
    isResolved: Sequelize.STRING,
    reportDate: Sequelize.DATE
});

Report.hasOne(Post, {as: 'post'});
Report.hasOne(User, {as: 'reporter'});

module.exports = Report;
