'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('route_pois', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('route_pois', [
            {
                poi_id: 1,
                route_id: 1
            },
            {
                poi_id: 2,
                route_id: 1
            },
            {
                poi_id: 3,
                route_id: 1
            }
        ], {});
    }
};
