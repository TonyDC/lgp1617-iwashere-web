'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('likes', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('likes', [
            {
                post_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
