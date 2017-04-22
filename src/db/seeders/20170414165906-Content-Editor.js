'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('content_editors', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('content_editors', [
            { uid: '2PR6AlwJNsR24FqVXx8HKIivpwY2' }
        ], {});
    }
};
