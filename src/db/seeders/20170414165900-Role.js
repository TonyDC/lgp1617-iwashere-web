'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('roles', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('roles', [
            {
                rank: 0,
                name: 'su'
            },
            {
                rank: 1,
                name: 'admin'
            },
            {
                rank: 2,
                name: 'content-editor'
            }
        ], {});
    }
};
