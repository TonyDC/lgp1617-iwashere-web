'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_tags', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_tags', [
            {
                poi_id: 1,
                tag_id: 1
            },
            {
                poi_id: 1,
                tag_id: 2
            }
        ], {});
    }
};
