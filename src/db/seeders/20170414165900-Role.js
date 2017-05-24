'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('roles', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('roles', [
            { name: 'su', rank: 0 },
            { name: 'admin', rank: 1 },
            { name: 'content-editor', rank: 2 }
        ], {});
    }
};
