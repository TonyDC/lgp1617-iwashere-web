'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            { uid: '1234567890' }
        ], {});
    }
};
