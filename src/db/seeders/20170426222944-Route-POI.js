'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('route_pois', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('route_pois', [
            {
                poi_id: 132,
                route_id: 1
            },
            {
                poi_id: 133,
                route_id: 1
            },
            {
                poi_id: 134,
                route_id: 1
            },
            {
                poi_id: 135,
                route_id: 1
            },
            {
                poi_id: 136,
                route_id: 1
            },
            {
                poi_id: 137,
                route_id: 1
            },
            {
                poi_id: 138,
                route_id: 1
            },
            {
                poi_id: 139,
                route_id: 1
            },
            {
                poi_id: 140,
                route_id: 1
            },
            {
                poi_id: 141,
                route_id: 1
            },
            {
                poi_id: 142,
                route_id: 2
            },
            {
                poi_id: 132,
                route_id: 2
            },
            {
                poi_id: 144,
                route_id: 2
            },
            {
                poi_id: 145,
                route_id: 2
            },
            {
                poi_id: 146,
                route_id: 2
            },
            {
                poi_id: 147,
                route_id: 2
            },
            {
                poi_id: 145,
                route_id: 3
            },
            {
                poi_id: 137,
                route_id: 3
            },
            {
                poi_id: 148,
                route_id: 3
            },
            {
                poi_id: 149,
                route_id: 3
            },
            {
                poi_id: 128,
                route_id: 3
            }
        ], {});
    }
};
