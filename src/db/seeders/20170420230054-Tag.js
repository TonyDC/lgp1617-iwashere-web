'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('tags', null, {});
    },
    up: (queryInterface) => {

        return queryInterface.bulkInsert('tags', [
            { name: 'feup' },
            { name: 'uporto' }
        ], {});
    }
};
