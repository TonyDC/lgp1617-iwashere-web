'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_content', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_content', [
            {
                content_id: 1,
                poi_id: 1
            },
            {
                content_id: 2,
                poi_id: 1
            }
        ], {});
    }
};
