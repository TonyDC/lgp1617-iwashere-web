'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('contents', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('contents', [
            { type: 'IMG' }
        ], {});
    }
};
