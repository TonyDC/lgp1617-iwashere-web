'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('poi_ratings', [
            {
                rating: 2,
                user_id: '1234567890',
                poi_id: 1
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('poi_ratings', null, {});
    }
};
