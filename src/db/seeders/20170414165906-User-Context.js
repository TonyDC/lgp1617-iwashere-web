'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('user_contexts', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('user_contexts', [
            { user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2', context_id: 2 }
        ], {});
    }
};
