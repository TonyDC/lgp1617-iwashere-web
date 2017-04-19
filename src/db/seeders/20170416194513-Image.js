'use strict';

const moment = require('moment');

const TODAY = moment().format();

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('images', [
            {
                content_id: 1,
                url: 'http://lorempixel.com/400/200',
                createdAt: TODAY,
                updatedAt: TODAY
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('images', null, {});
    }
};
