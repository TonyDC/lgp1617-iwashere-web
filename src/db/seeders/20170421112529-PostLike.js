'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('post_likes', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('post_likes', [
            {
                post_id: 1,
                user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            }
        ], {});
    }
};
