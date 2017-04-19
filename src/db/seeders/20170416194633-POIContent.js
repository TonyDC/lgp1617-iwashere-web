'use strict';

const moment = require('moment');

const TODAY = moment().format();

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('poi_content', [
            {
                poi_id: 1,
                content_id: 1,
                createdAt: TODAY,
                updatedAt: TODAY
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('poi_content', null, {});
    }
};
