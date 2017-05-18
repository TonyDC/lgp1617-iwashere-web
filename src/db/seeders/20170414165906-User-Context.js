'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('user_contexts', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('user_contexts', [
            { user_id: '2PR6AlwJNsR24FqVXx8HKIivpwY2', context_id: 1, role_id: 1 },
            { user_id: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2', context_id: 1, role_id: 1 },
            { user_id: 'lCieV79gyOMYfyqrg93jnEBIC5S2', context_id: 1, role_id: 1 }
        ], {});
    }
};
