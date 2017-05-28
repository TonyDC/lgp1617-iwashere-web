'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            {
                email: 'admin@iwashere.fe.up.pt',
                name: 'admin',
                uid: '8zWmscUg5LYSluQlQteYfweIkyw1'
            },
            {
                email: 'a1@c.com',
                name: 'Utilizador 1',
                uid: '2PR6AlwJNsR24FqVXx8HKIivpwY2'
            },
            {
                email: 'a2@c.com',
                name: 'Utilizador 2',
                uid: 'HnOTfIIX4LbhzZNwKW9fwXOqJvc2'
            },
            {
                email: 'a3@c.com',
                name: 'Utilizador 3',
                uid: 'lCieV79gyOMYfyqrg93jnEBIC5S2'
            }
        ], {});
    }
};
