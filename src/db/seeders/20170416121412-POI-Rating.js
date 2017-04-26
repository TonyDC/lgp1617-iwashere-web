'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('poi_ratings', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('poi_ratings', [
            {
                poi_id: 1,
                rating: 2,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
