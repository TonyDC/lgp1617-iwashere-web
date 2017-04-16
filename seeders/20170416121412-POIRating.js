'use strict';

const moment = require('moment');

const TODAY = moment().format();

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('poi_ratings', [
            {
                rating: 2,
                userId: '123ujhjhaosiu1287',
                poiId: 1,
                createdAt: TODAY,
                updatedAt: TODAY
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */
        return queryInterface.bulkDelete('poi_ratings', null, {});
    }
};
