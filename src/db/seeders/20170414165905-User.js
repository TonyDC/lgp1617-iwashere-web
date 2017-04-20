'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            { uid: '2PR6AlwJNsR24FqVXx8HKIivpwY2' }
        ], {});
    }
};
