'use strict';

const moment = require('moment');

const TODAY = moment().format();

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('content', [
            {
                type: 'IMG',
                createdAt: TODAY,
                updatedAt: TODAY
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('content', null, {});
    }
};
