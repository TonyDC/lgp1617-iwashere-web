'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('route_tags', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('route_tags', [
            {
                route_id: 1,
                tag_id: 1
            },
            {
                route_id: 1,
                tag_id: 2
            }
        ], {});
    }
};
