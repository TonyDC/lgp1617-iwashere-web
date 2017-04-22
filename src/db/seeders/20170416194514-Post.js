'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('posts', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('posts', [
            {
                description: 'This is a post',
                poi_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
