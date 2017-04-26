'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('route_ratings', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('route_ratings', [
            {
                rating: 4,
                route_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
