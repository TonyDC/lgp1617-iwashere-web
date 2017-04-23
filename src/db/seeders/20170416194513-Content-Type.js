'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('content_types', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('content_types', [
            { name: 'image' }
        ], {});
    }
};
