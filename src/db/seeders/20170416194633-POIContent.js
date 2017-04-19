'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('poi_content', [
            {
                poi_id: 1,
                content_id: 1
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('poi_content', null, {});
    }
};
