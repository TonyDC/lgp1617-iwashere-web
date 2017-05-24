'use strict';

module.exports = {
    down: (queryInterface) => {
        return queryInterface.bulkDelete('contexts', null, {});
    },

    up: (queryInterface) => {
        return queryInterface.bulkInsert('contexts', [
            {
                name: 'root',
                parent_id: null
            },
            {
                name: 'su',
                parent_id: 1
            },
            {
                name: 'UP',
                parent_id: 1
            },
            {
                name: 'FEUP',
                parent_id: 3
            }
        ], {});
    }
};
