'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('roles', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('roles', [
            { name: 'user' }
        ], {});
    }
};
