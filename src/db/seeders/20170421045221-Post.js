'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('posts', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('posts', [
            {
                content_id: 1,
                description: 'some desription',
                poi_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            },
            {
                content_id: 2,
                description: 'some desription',
                poi_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
