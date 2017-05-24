'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            {
                uid: '2PR6AlwJNsR24FqVXx8HKIivpwY2',
                name: 'Utilizador 1',
                email: 'a@c.com'

            },
            {
                uid: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2',
                name: 'Utilizador 2',
                email: 'a@c.com'
            },
            {
                uid: 'lCieV79gyOMYfyqrg93jnEBIC5S2',
                name: 'Utilizador 3',
                email: 'a@c.com'
            }
        ], {});
    }
};
